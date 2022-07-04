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
  ${AGENT_FIELDS}
  query getOrders($agent: String) {
    getOrdersByAgent(agentCode: $agent) {
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

export const GET_ORDERS_BY_CUSTOMER = gql`
  ${ORDER_FIELDS}
  ${AGENT_FIELDS}
  query getOrders($customer: String) {
    getOrdersByCustomer(custCode: $customer) {
      ordNum
      ...OrderFields
      agentCode {
        ...AgentFields
      }
    }
  }
`;



export const GET_CUSTOMERS_BY_AGENT = gql`
  ${CUSTOMER_FIELDS}
  query getCustomer($agent: String!) {
    getCustomersByAgent(agentCode: $agent) {
      ...CustomerFields
    }
  }
`;
