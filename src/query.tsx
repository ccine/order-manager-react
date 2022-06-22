import { gql } from "@apollo/client";

export const CHECK_USER = gql`
query userLogin($username: String!, $password: String!) {
  checkUser(username: $username, password: $password) {
    authentication
    role
  }
}
`;

export const GET_ALL_ORDERS = gql`
query getOrders {
  getAllOrders {
    ordNum
    ordAmount
    advanceAmount
    ordDate
    custCode {
      custCode
      custName
      custCity
      workingArea
      custCountry
      grade
      openingAmt
      receiveAmt
      paymentAmt
      outstandingAmt
      phoneNo
    }
    agentCode {
      agentCode
      agentName
      workingArea
      commission
      phoneNo
      country
    }
    ordDescription
  }
}
`;

export const GET_ORDERS_BY_AGENT = gql`
  query getOrders($agent: String) {
    getAgentOrders(agent: $agent) {
      ordNum
      ordAmount
      advanceAmount
      ordDate
      custCode {
        custCode
        custName
        custCity
        workingArea
        custCountry
        grade
        openingAmt
        receiveAmt
        paymentAmt
        outstandingAmt
        phoneNo
      }
      ordDescription
    }
  }
`;

export const GET_ORDERS_BY_CUSTOMER = gql`
  query getOrders($customer: String) {
    getCustomerOrders(customer: $customer) {
      ordNum
      ordAmount
      advanceAmount
      ordDate
      agentCode {
        agentCode
        agentName
        workingArea
        commission
        phoneNo
        country
      }
      ordDescription
    }
  }
`;