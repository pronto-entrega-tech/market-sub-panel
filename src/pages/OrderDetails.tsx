import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Loading from '~/components/Loading';
import MyDivider from '~/components/MyDivider';
import MyHeader from '~/components/MyHeader';
import MyIcon from '~/components/MyIcon';
import MyText from '~/components/MyText';
import IconButton from '~/components/IconButton';
import { myColors } from '~/constants/myColors';
import { myFonts } from '~/constants/myFonts';
import { Order, Product, RootParamList } from '~/core/types';
import { formatOrderId, formatTime } from '~/functions/format';
import { moneyString } from '~/functions/money';
import { getStatusColor, getStatusName } from '~/functions/orderStatus';
import { useMyContext } from '~/core/context';
import { useOrdersContext } from '~/contexts/OrdersContext';
import Errors from '~/components/Errors';

const getOrderInfo = (o: Order) => {
  const id = formatOrderId(o.market_order_id);
  const createdAt = formatTime(o.created_at);

  return `Pedido ${id} • Feito ás ${createdAt}`;
};

const formatDeliveryTime = (o: Order) => {
  const min = formatTime(o.delivery_min_time);
  const max = formatTime(o.delivery_max_time);

  return `${min} - ${max}`;
};

const formatAddress = (o: Order) =>
  `${o.address_street}, ${o.address_number} - ${o.address_district}`;

const formatAddressWithComplement = (o: Order) => {
  const complement = o.address_complement ? ` - ${o.address_complement}` : '';

  return `${formatAddress(o)}${complement}`;
};

const formatPayment = (o: Order) => {
  const onAppOrDelivery = o.paid_in_app
    ? 'Pago no App'
    : 'Pagamento na Entrega';

  const change = o.payment_change ? ` (Troco para R$${o.payment_change})` : '';

  return `${onAppOrDelivery} - ${o.payment_description}${change}`;
};

const OrderDetailsBody = (p: {
  route: RouteProp<RootParamList, 'OrderDetails'>;
}) => {
  const { toast } = useMyContext();
  const { orders, hasError } = useOrdersContext();
  const order = orders?.get(p.route.params.order_id);

  if (hasError) return <Errors error='server' />;
  if (!order) return <Loading />;

  const copyAddress = async () => {
    await Clipboard.setStringAsync(formatAddressWithComplement(order));
    toast('Endereço copiado!');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <MyText style={styles.text}>{getOrderInfo(order)}</MyText>
        <MyText
          style={[styles.status, { backgroundColor: getStatusColor(order) }]}>
          {getStatusName(order)}
        </MyText>
      </View>
      <View style={[styles.row, { marginTop: 8 }]}>
        <MyText style={styles.title}>{order.customer_name}</MyText>
        <MyText style={styles.text}>
          Previsão {formatDeliveryTime(order)}
        </MyText>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 28 }}>
        <MyIcon name='map-marker' />
        <View style={{ flex: 1, marginLeft: 6 }}>
          <MyText style={styles.text}>{formatAddress(order)}</MyText>
          <MyText style={styles.text}>
            {order.address_complement || 'Sem complemento'}
          </MyText>
        </View>
        <IconButton icon='content-copy' type='clear' onPress={copyAddress} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {order.paid_in_app ? (
          <MyIcon name='check-circle' color='#4bb543' />
        ) : (
          <MyIcon name='alert-circle' color='#dec04c' />
        )}
        <View style={{ flex: 1, marginLeft: 6 }}>
          <MyText style={styles.text}>{formatPayment(order)}</MyText>
        </View>
      </View>
      <View style={[styles.row, { marginTop: 28 }]}>
        <MyText style={styles.title}>Subtotal</MyText>
        <MyText style={styles.text}>
          {moneyString(+order.total - +order.delivery_fee)}
        </MyText>
      </View>
      <View style={[styles.row, { marginTop: 8 }]}>
        <MyText style={styles.title}>Taxa de entrega</MyText>
        <MyText style={styles.text}>{moneyString(order.delivery_fee)}</MyText>
      </View>
      <View style={[styles.row, { marginTop: 8 }]}>
        <MyText style={styles.title}>Total</MyText>
        <MyText style={styles.text}>{moneyString(order.total)}</MyText>
      </View>
      <MyDivider
        style={{ backgroundColor: myColors.divider3, marginTop: 16 }}
      />
      {order.items.map((item, i) => (
        <Item key={item.code + i} item={item} />
      ))}
    </ScrollView>
  );
};

const Item = ({ item }: { item: Product }) => (
  <>
    <View style={styles.itemContainer}>
      <MyText style={styles.title}>{item.quantity}x</MyText>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <MyText style={styles.text}>{item.description}</MyText>
        <MyText style={styles.text}>{moneyString(item.price)}</MyText>
      </View>
    </View>
    <MyDivider style={{ backgroundColor: myColors.divider3 }} />
  </>
);

const OrderDetails = (...[props]: Parameters<typeof OrderDetailsBody>) => (
  <>
    <MyHeader title='Detalhes do pedido' />
    <OrderDetailsBody {...props} />
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 17,
  },
  title: {
    fontSize: 18,
    fontFamily: myFonts.Medium,
    color: myColors.text5,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    paddingVertical: 3,
    paddingHorizontal: 11,
    borderRadius: 100,
    fontSize: 17,
    fontFamily: myFonts.Bold,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default OrderDetails;
