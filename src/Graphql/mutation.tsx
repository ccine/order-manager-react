import { gql } from "@apollo/client";
import { ORDER_FIELDS } from "./fragments";

export const UPDATE_ORDER = gql`
  ${ORDER_FIELDS}
  mutation updateOrder($ordNum: Int!, $order: orderInput!) {
    updateOrder(ordNum: $ordNum, order: $order) {
      ordNum
      ...OrderFields
      custCode {
        custCode
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($ordNum: Int!) {
    deleteOrder(ordNum: $ordNum)
  }
`;
