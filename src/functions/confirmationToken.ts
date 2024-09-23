import { Buffer } from "buffer";
import { fail } from "./fail";

export const isTokenValid = (token: string) => {
  try {
    const [encodedHeader] = token.split(".");
    const header = JSON.parse(
      Buffer.from(encodedHeader ?? fail(), "base64").toString(),
    );

    return header.typ === "JWT";
  } catch {
    return false;
  }
};

export const decodeConfirmationToken = (token: string) => {
  const [, encodedPayload] = token.split(".");
  const payload = JSON.parse(
    Buffer.from(encodedPayload ?? fail(), "base64").toString(),
  );

  return {
    order_id: payload.sub as string,
    market_order_id: payload.market_order_id as string,
    items: payload.items as {
      order_item_id: string;
      quantity: string;
    }[],
  };
};
