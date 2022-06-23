import { gql } from "@apollo/client";
import { ORDER_FIELDS } from "./fragments";

export const UPDATE_ORDER = gql`
  ${ORDER_FIELDS}
  mutation updateOrder($ordNum: ID!, $order: orderInput!) {
    updateOrder(ordNum: $ordNum, order: $order) {
      ordNum
      ...OrderFields
    }
  }
`;
