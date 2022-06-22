import React, { useState } from "react";
import "../Assets/Home.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { useQuery } from "@apollo/client";
import { Order, Role } from "../types";
import AgentDetailsRow from "./AgentDetailsRow";
import CustomerDetailsRow from "./CustomerDetailsRow";
import {
  GET_ALL_ORDERS,
  GET_ORDERS_BY_AGENT,
  GET_ORDERS_BY_CUSTOMER,
} from "../query";

function OrderTable(props: { username: string; role: Role }) {
  const [order, setOrder] = useState<{ key: keyof Order; asc: boolean }>({
    key: "ordNum",
    asc: true,
  });
  const [viewDetails, setViewDetails] = useState<{
    id: Number;
    agent?: boolean;
    customer?: boolean;
  }>({ id: -1 });
  const { loading, error, data } = useQuery(
    props.role === "manager"
      ? GET_ALL_ORDERS
      : props.role === "agent"
      ? GET_ORDERS_BY_AGENT
      : GET_ORDERS_BY_CUSTOMER,
    {
      variables: { customer: props.username, agent: props.username },
    }
  );

  const sortedItems = React.useMemo(() => {
    if (
      !data ||
      (!data.getAllOrders && !data.getCustomerOrders && !data.getAgentOrders)
    )
      return [];
    let listItem =
      data.getAllOrders || data.getCustomerOrders || data.getAgentOrders;
    let sortableItems = [...listItem];
    let elementKey = (element: Order) =>
      order.key === "custCode"
        ? element.custCode.custCode
        : order.key === "agentCode"
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

  function TableRow(props: { element: Order, role: Role }) {
    return (
      <>
        <tr>
          <td>{String(props.element.ordNum)}</td>
          <td>{String(props.element.ordAmount)}</td>
          <td>{props.element.ordDate}</td>
          {props.role !== "customer" && (
            <td
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, customer: true })
              }
            >
              {props.element.custCode.custCode}
            </td>
          )}
          {props.role !== "agent" && (
            <td
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, agent: true })
              }
            >
              {props.element.agentCode.agentCode}
            </td>
          )}
          <td>{props.element.ordDescription}</td>
        </tr>
        {viewDetails.id === props.element.ordNum && viewDetails.agent && (
          <tr>
            <td colSpan={6}>
              <AgentDetailsRow agent={props.element.agentCode} />
            </td>
          </tr>
        )}
        {viewDetails.id === props.element.ordNum && viewDetails.customer && (
          <tr>
            <td colSpan={6}>
              <CustomerDetailsRow customer={props.element.custCode} />
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
            {props.role !== "customer" && (
              <th onClick={() => changeOrder("custCode")}>
                Customer {showArrow("custCode")}
              </th>
            )}
            {props.role !== "agent" && (
              <th onClick={() => changeOrder("agentCode")}>
                Agent {showArrow("agentCode")}
              </th>
            )}
            <th onClick={() => changeOrder("ordDescription")}>
              Order description {showArrow("ordDescription")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((element: Order) => (
            <TableRow key={String(element.ordNum)} element={element}  role={props.role}/>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default OrderTable;
