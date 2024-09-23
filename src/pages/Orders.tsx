import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Errors from "~/components/Errors";
import Loading from "~/components/Loading";
import MyHeader from "~/components/MyHeader";
import MyText from "~/components/MyText";
import MyTouchable from "~/components/MyTouchable";
import { globalStyles } from "~/constants/globalStyles";
import { myColors } from "~/constants/myColors";
import { myFonts } from "~/constants/myFonts";
import { useOrdersContext } from "~/contexts/OrdersContext";
import { Order } from "~/core/types";
import { useConnection } from "~/functions/connection";
import { formatOrderId, formatTime } from "~/functions/format";
import { getStatusName, getStatusColor } from "~/functions/orderStatus";

const formatAddress = (o: Order) =>
  `${o.address_street}, ${o.address_number} - ${o.address_district} - ${
    o.address_complement || "Sem complemento"
  }`;

const Orders = () => {
  return (
    <>
      <MyHeader title="Pedidos" goBackLess dividerLess />
      <OrdersList />
    </>
  );
};

const OrdersList = () => {
  const { orders, hasError } = useOrdersContext();
  const hasConnection = useConnection() ?? true;

  if (!hasConnection && !orders) return <Errors error="connection" />;
  if (hasError) return <Errors error="server" />;
  if (!orders) return <Loading />;
  if (!orders.size) return <Nothing />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ordersList}
    >
      {[...orders.values()].map((order) => (
        <OrderItem key={order.order_id} order={order} />
      ))}
    </ScrollView>
  );
};

const OrderItem = ({ order }: { order: Order }) => {
  const { navigate } = useNavigation();

  const { order_id, market_order_id } = order;
  return (
    <MyTouchable
      onPress={async () => navigate("OrderDetails", { order_id })}
      style={[globalStyles.elevation3, styles.order]}
    >
      <View style={styles.row}>
        <MyText style={styles.title}>
          Pedido {formatOrderId(market_order_id)}
        </MyText>
        <MyText
          style={[styles.status, { backgroundColor: getStatusColor(order) }]}
        >
          {getStatusName(order)}
        </MyText>
      </View>
      <View style={[styles.row, { marginTop: 4 }]}>
        <MyText style={styles.text}>{order.customer_name}</MyText>
        <MyText style={styles.text}>
          Feito ás {formatTime(order.created_at)}
        </MyText>
      </View>
      <MyText style={[styles.text, { marginTop: 4 }]}>
        {formatAddress(order)}
      </MyText>
    </MyTouchable>
  );
};

const Nothing = () => (
  <View style={globalStyles.centralizer}>
    <MyText style={{ fontSize: 15, color: myColors.text2 }}>
      Nenhuma pedido ainda
    </MyText>
  </View>
);

const styles = StyleSheet.create({
  ordersList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  order: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 6,
  },
  text: {
    fontSize: 17,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: myFonts.Medium,
  },
  status: {
    paddingVertical: 3,
    paddingHorizontal: 11,
    borderRadius: 100,
    fontSize: 17,
    fontFamily: myFonts.Bold,
    color: "white",
  },
});

export default Orders;
