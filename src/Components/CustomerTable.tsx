import React, { useState } from "react";
import "../Assets/Home.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { gql, useQuery } from "@apollo/client";
import { Order } from "../types";
import AgentDetailsRow from "./AgentDetailsRow";

const GET_ORDERS = gql`
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

function CustomerTable(props: { custCode: String }) {
  const [order, setOrder] = useState<{ key: keyof Order; asc: boolean }>({
    key: "ordNum",
    asc: true,
  });
  const [viewDetails, setViewDetails] = useState<{
    id: Number;
    agent: boolean;
  }>({ id: -1, agent: false });
  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { customer: props.custCode },
  });

  const sortedItems = React.useMemo(() => {
    if (!data || !data.getCustomerOrders) return [];
    let sortableItems = [...data.getCustomerOrders];
    let elementKey = (element: Order) =>
      order.key === "agentCode"
        ? element.agentCode.agentCode
        : element[order.key];
    sortableItems.sort((a, b) => {
      if (elementKey(a) < elementKey(b)) {
        return order.asc ? -1 : 1;
      }
      if (elementKey(a) > elementKey(b)) {
        return order.asc ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [data, order]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  function changeOrder(key: keyof Order) {
    setOrder({ key: key, asc: order.key === key ? !order.asc : true });
  }

  function showArrow(key: string) {
    return order?.key === key ? (
      order.asc ? (
        <IoCaretUp />
      ) : (
        <IoCaretDown />
      )
    ) : null;
  }

  function TableRow(props: { element: Order }) {
    return (
      <>
        <tr>
          <td>{String(props.element.ordNum)}</td>
          <td>{String(props.element.ordAmount)}</td>
          <td>{props.element.ordDate}</td>
          <td
            onClick={() =>
              setViewDetails({ id: props.element.ordNum, agent: true })
            }
          >
            {props.element.agentCode.agentCode}
          </td>
          <td>{props.element.ordDescription}</td>
        </tr>
        {viewDetails.id === props.element.ordNum && viewDetails.agent && (
          <tr>
            <td colSpan={5}>
              <AgentDetailsRow agent={props.element.agentCode} />
            </td>
          </tr>
        )}
      </>
    );
  }

  return (
    <>
      <table id="orderList" border={2} align="center">
        <thead>
          <tr>
            <th onClick={() => changeOrder("ordNum")}>
              Order number {showArrow("ordNum")}
            </th>
            <th onClick={() => changeOrder("ordAmount")}>
              Order amount {showArrow("ordAmount")}
            </th>
            <th onClick={() => changeOrder("ordDate")}>
              Order date {showArrow("ordDate")}
            </th>
            <th onClick={() => changeOrder("agentCode")}>
              Agent {showArrow("agentCode")}
            </th>
            <th onClick={() => changeOrder("ordDescription")}>
              Order description {showArrow("ordDescription")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((element: Order) => (
            <TableRow key={String(element.ordNum)} element={element} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CustomerTable;
