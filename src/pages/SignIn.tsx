import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  PermissionStatus,
  BarcodeScanningResult as ScanningResult,
} from 'expo-camera';
import Loading from '~/components/Loading';
import { api } from '~/services/api';
import { useLoading } from '~/hooks/useLoading';
import { useMyContext } from '~/core/context';
import { errMsg } from '~/constants/errorMessages';
import MyText from '~/components/MyText';
import { myFonts } from '~/constants/myFonts';
import ScannerMask from '~/components/ScannerMask';
import { notchHeight } from '~/constants/device';
import { myColors } from '~/constants/myColors';

const SignIn = () => {
  const { setAccessToken, alert } = useMyContext();
  const [isLoading, , withLoading] = useLoading();
  const [permission] = useCameraPermissions({ request: true });

  if (isLoading || permission?.status !== PermissionStatus.GRANTED)
    return <Loading />;

  const handleQRCode = withLoading(async (e: ScanningResult) => {
    try {
      const { access_token } = await api.auth.connect(e.data);

      setAccessToken(access_token);
    } catch {
      alert(errMsg.server());
    }
  });

  return (
    <>
      <MyText style={styles.title}>
        Escane o QR Code de conexão{'\n'}para entrar
      </MyText>
      <CameraView
        onBarcodeScanned={handleQRCode}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        style={{ height: '100%', width: '100%' }}
      />
      <ScannerMask />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: notchHeight + 16,
    marginBottom: 16,
    fontSize: 20,
    fontFamily: myFonts.Medium,
    color: myColors.primaryColor,
  },
});

export default SignIn;
