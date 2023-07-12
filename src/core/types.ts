export type RootParamList = {
  Confirmation: undefined;
  Orders: undefined;
  OrderDetails: { order_id: string };
  Profile: undefined;
  Tasks: undefined;
  Notifications: undefined;
  Devices: undefined;
};

export type ScreenName = keyof RootParamList;

export type SubPermission = 'STOCK' | 'DELIVERY';

export type Profile = {
  id: string;
  created_at: Date;
  name: string;
  permissions: SubPermission[];
};

export type OrderStatus =
  | 'PAYMENT_PROCESSING'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_REQUIRE_ACTION'
  | 'APPROVAL_PENDING'
  | 'PROCESSING'
  | 'DELIVERY_PENDING'
  | 'COMPLETING'
  | 'COMPLETED'
  | 'CANCELING'
  | 'CANCELED';

export type Order = {
  order_id: string;
  market_order_id: string;
  customer_name: string;
  status: OrderStatus;
  created_at: Date;
  finished_at?: Date;
  delivery_max_time: Date;
  delivery_min_time: Date;
  address_street: string;
  address_number: string;
  address_district: string;
  address_complement?: string;
  paid_in_app: boolean;
  payment_description: string;
  payment_change?: string;
  delivery_fee: string;
  total: string;
  items: Product[];
};

export type Product = {
  code: string;
  price: string;
  quantity: string;
  description: string;
  is_kit?: boolean;
  unit_weight?: string;
  details?: { quantity: string; product: { name: string } };
  missing?: { quantity: string };
};

export type Task = {
  name: 'confirmation';
  data: {
    token: string;
  };
};

export type Notif = {
  title: string;
  created_at: Date;
};
