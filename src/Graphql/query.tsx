import { gql } from "@apollo/client";
import { AGENT_FIELDS, CUSTOMER_FIELDS, ORDER_FIELDS } from "./fragments";

export const CHECK_USER = gql`
  query userLogin($username: String!, $password: String!) {
    checkUser(username: $username, password: $password) {
      authentication
      role
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  ${ORDER_FIELDS}
  ${CUSTOMER_FIELDS}
  ${AGENT_FIELDS}
  query getOrders {
    getAllOrders {
      ordNum
      ...OrderFields
      custCode {
        ...CustomerFields
      }
      agentCode {
        ...AgentFields
      }
    }
  }
`;

export const GET_ORDERS_BY_AGENT = gql`
  ${ORDER_FIELDS}
  ${CUSTOMER_FIELDS}
  query getOrders($agent: String) {
    getAgentOrders(agent: $agent) {
      ordNum
      ...OrderFields
      custCode {
        ...CustomerFields
      }
    }
  }
`;

export const GET_ORDERS_BY_CUSTOMER = gql`
  ${ORDER_FIELDS}
  ${AGENT_FIELDS}
  query getOrders($customer: String) {
    getCustomerOrders(customer: $customer) {
      ordNum
      ...OrderFields
      agentCode {
        ...AgentFields
      }
    }
  }
`;
