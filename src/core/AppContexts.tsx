import React from "react";
import { NotifsProvider } from "~/contexts/NotifsContext";
import { OrdersProvider } from "~/contexts/OrdersContext";
import { TasksProvider } from "~/contexts/TasksContext";
import { MyProvider as CommonProvider } from "./context";

export const AppContexts = ({ children }: any) =>
  nestComponents(children, [
    CommonProvider,
    NotifsProvider,
    OrdersProvider,
    TasksProvider,
  ]);

const nestComponents = (children: JSX.Element, components: React.FC<any>[]) =>
  components.reduceRight(
    (previous, Component) => <Component>{previous}</Component>,
    children,
  );
