import React from 'react';
import {
  Camera,
  PermissionStatus,
  BarCodeScanningResult as ScanningResult,
} from 'expo-camera';
import Loading from '~/components/Loading';
import { api } from '~/services/api';
import { useLoading } from '~/hooks/useLoading';
import { useMyContext } from '~/core/context';
import { errMsg } from '~/constants/errorMessages';
import {
  decodeConfirmationToken,
  isTokenValid,
} from '~/functions/confirmationToken';
import MyHeader from '~/components/MyHeader';
import { formatOrderId } from '~/functions/format';
import { getHasConnection } from '~/functions/connection';
import { useTasksContext } from '~/contexts/TasksContext';
import ScannerMask from '~/components/ScannerMask';

const Confirmation = () => {
  const { alert } = useMyContext();
  const { addTask } = useTasksContext();
  const [isLoading, , withLoading] = useLoading();
  const [permission] = Camera.useCameraPermissions({ request: true });

  if (isLoading || permission?.status !== PermissionStatus.GRANTED)
    return <Loading />;

  const handleQRCode = withLoading(async ({ data: token }: ScanningResult) => {
    if (!isTokenValid(token))
      return new Promise<void>((resolve) => {
        alert('QR Code inválido', 'Esse não é o código de confirmação', {
          onConfirm: resolve,
        });
      });

    try {
      const { order_id, market_order_id } = decodeConfirmationToken(token);

      await new Promise<void>((resolve) => {
        const addConfirmToTasks = () =>
          addTask({ name: 'confirmation', data: { token } });

        const confirm = async () => {
          const hasConnection = await getHasConnection();

          !hasConnection
            ? addConfirmToTasks()
            : await api.orders.confirm(order_id, token);

          resolve();
        };

        alert(`Confirmar pedido ${formatOrderId(market_order_id)}`, '', {
          onConfirm: confirm,
          onCancel: resolve,
        });
      });
    } catch {
      alert(errMsg.server());
    }
  });

  return (
    <>
      <MyHeader title='QR Code de confirmação' goBackLess dividerLess />
      <Camera
        onBarCodeScanned={handleQRCode}
        barCodeScannerSettings={{ barCodeTypes: ['qr'] }}
        style={{ height: '100%', width: '100%' }}
      />
      <ScannerMask />
    </>
  );
};

export default Confirmation;
