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
import { IoCloseSharp } from "react-icons/io5";
import OrderModifyRow from "./OrderModifyRow";

function OrderTable(props: { username: string; role: Role }) {
  /** Number of column in the table  */
  const nCol = props.role === "manager" ? 8 : 6;

  /** Contains the key used to order the table and if it is ascendent or descendet order */
  const [order, setOrder] = useState<{ key: keyof Order; asc: boolean }>({
    key: "ordNum",
    asc: true,
  });

  /** It is used to view the details row, it can display agent, customer or order(editable) details. */
  const [viewDetails, setViewDetails] = useState<{
    id: Number;
    agent?: boolean;
    customer?: boolean;
    modify?: boolean;
  }>({ id: -1 });

  /** Fetch data from server depending on the role of the user */
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

  /** When data or order is modified this function is called. Sort the table by the specified order. */
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

  /**
   * Change the order state.
   * @param key One of the key of Order used to sort the table
   */
  function changeOrder(key: keyof Order) {
    setOrder({ key: key, asc: order.key === key ? !order.asc : true });
  }

  /**
   * Show the arrow icon on the focused column
   * @param key The key that represent the column data
   * @returns Return the icon element if the passed column is focused (the icon depends if is ascendent or descender order), null if it is not.
   */
  function showArrow(key: string) {
    return order?.key === key ? (
      order.asc ? (
        <IoCaretUp />
      ) : (
        <IoCaretDown />
      )
    ) : null;
  }

  function TableRow(props: { element: Order; role: Role }) {
    return (
      <>
        <tr>
          <td>{props.element.ordNum}</td>
          <td>{props.element.ordAmount}</td>
          <td>{props.element.advanceAmount}</td>
          <td>{props.element.ordDate}</td>
          {props.role !== "customer" && (
            <td
              className="handPointer"
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, customer: true })
              }
            >
              {props.element.custCode.custCode}
            </td>
          )}
          {props.role !== "agent" && (
            <td
              className="handPointer"
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, agent: true })
              }
            >
              {props.element.agentCode.agentCode}
            </td>
          )}
          <td>{props.element.ordDescription}</td>
          {props.role === "manager" && (
            <td
              className="handPointer"
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, modify: true })
              }
            >
              Modify
            </td>
          )}
        </tr>
        {/** View Agent Details in the next row */}
        {viewDetails.id === props.element.ordNum && viewDetails.agent && (
          <tr>
            <td colSpan={nCol}>
              <IoCloseSharp
                className="closeIcon"
                size="50px"
                onClick={() => setViewDetails({ id: viewDetails.id })}
              />
              <AgentDetailsRow agent={props.element.agentCode} />
            </td>
          </tr>
        )}
        {/** View Customer Details in the next row */}
        {viewDetails.id === props.element.ordNum && viewDetails.customer && (
          <tr>
            <td colSpan={nCol}>
              <IoCloseSharp
                className="closeIcon"
                size="50px"
                onClick={() => setViewDetails({ id: viewDetails.id })}
              />
              <CustomerDetailsRow customer={props.element.custCode} />
            </td>
          </tr>
        )}
        {/** View and modify Order Details in the next row */}
        {viewDetails.id === props.element.ordNum &&
          viewDetails.modify &&
          props.role === "manager" && (
            <tr>
              <td colSpan={nCol}>
                <IoCloseSharp
                  className="closeIcon"
                  size="50px"
                  onClick={() => setViewDetails({ id: viewDetails.id })}
                />
                <OrderModifyRow order={props.element} />
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
            <th onClick={() => changeOrder("advanceAmount")}>
              Advance amount {showArrow("advanceAmount")}
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
            {props.role === "manager" && <th>Modify</th>}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((element: Order) => (
            <TableRow
              key={element.ordNum}
              element={element}
              role={props.role}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default OrderTable;
