import React from "react";
import { View, StyleSheet } from "react-native";
import MyHeader from "~/components/MyHeader";
import MyDivider from "~/components/MyDivider";
import MyIcon from "~/components/MyIcon";
import MyText from "~/components/MyText";
import { myColors } from "~/constants/myColors";
import { Task } from "~/core/types";
import Loading from "~/components/Loading";
import { decodeConfirmationToken } from "~/functions/confirmationToken";
import { formatOrderId } from "~/functions/format";
import { globalStyles } from "~/constants/globalStyles";
import { useTasksContext } from "~/contexts/TasksContext";

const TasksBody = () => {
  const { tasks } = useTasksContext();

  if (!tasks) return <Loading />;
  if (!tasks.length) return <Nothing />;

  return (
    <>
      <MyText style={styles.title}>Confirmações feitas sem internet</MyText>
      <MyText style={styles.subtitle}>
        Se conecte à internet para que as confirmação possam ser terminadas
      </MyText>
      {tasks.map((task, i) => (
        <TaskItem key={i} task={task} />
      ))}
    </>
  );
};

const TaskItem = ({ task }: { task: Task }) => {
  const token = decodeConfirmationToken(task.data.token);

  return (
    <>
      <View style={styles.taskContainer}>
        <MyIcon name="qrcode-scan" color="#636363" size={32} />
        <View style={{ marginLeft: 16, flexGrow: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <MyText style={{ color: myColors.text4, fontSize: 17 }}>
              Pedido {formatOrderId(token.market_order_id)}
            </MyText>
          </View>
        </View>
      </View>
      <MyDivider style={styles.divider} />
    </>
  );
};

const Nothing = () => (
  <View style={globalStyles.centralizer}>
    <MyText style={{ fontSize: 15, color: myColors.text2 }}>
      Nenhuma confirmação na fila
    </MyText>
  </View>
);

const Tasks = () => (
  <>
    <MyHeader title="Fila de confirmações" />
    <TasksBody />
  </>
);

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    color: myColors.text2,
    marginTop: 20,
  },
  subtitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    color: myColors.text,
    marginTop: 4,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  taskContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  divider: {
    backgroundColor: myColors.divider2,
    marginTop: 4,
    marginHorizontal: 16,
  },
});

export default Tasks;
