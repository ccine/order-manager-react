import { gql } from "@apollo/client";

export const CUSTOMER_FIELDS = gql`
  fragment CustomerFields on Customer {
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
`;

export const AGENT_FIELDS = gql`
  fragment AgentFields on Agent {
    agentCode
    agentName
    workingArea
    commission
    phoneNo
    country
  }
`;

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    ordAmount
    advanceAmount
    ordDate
    ordDescription
  }
`;
