import React, { useState } from "react";
import "../Assets/Home.css";
import { IoCaretUp, IoCaretDown, IoCloseSharp } from "react-icons/io5";
import { useQuery } from "@apollo/client";
import { Order, Role } from "../types";
import AgentDetailsRow from "./AgentDetailsRow";
import CustomerDetailsRow from "./CustomerDetailsRow";
import OrderEditRow from "./OrderEditRow";
import {
  GET_ALL_ORDERS,
  GET_ORDERS_BY_AGENT,
  GET_ORDERS_BY_CUSTOMER,
} from "../Graphql/query";

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
    edit?: boolean;
  }>({ id: -1 });

  /** Fetch data from server depending on the role of the user */
  const { loading, error, data, refetch } = useQuery(
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
        <IoCaretUp aria-label="ascending order" />
      ) : (
        <IoCaretDown aria-label="descending order" />
      )
    ) : null;
  }

  /**
   * If the user press the spacebar on a Element it invokes the click on the same element
   * @param event Event that store the Element on which the user pressed the spacebar
   */
  function handleSpacePressed(event: React.KeyboardEvent) {
    if (event.code === "Space" && event.target instanceof HTMLElement) {
      event.preventDefault(); // Prevent default event of spacebar go down into the page
      event.target.click();
    }
  }

  function TableRow(props: { element: Order; role: Role }) {
    let closeIconSize = "50px";

    return (
      <>
        <tr>
          <td tabIndex={0}>{props.element.ordNum}</td>
          <td tabIndex={0}>{props.element.ordAmount}</td>
          <td tabIndex={0}>{props.element.advanceAmount}</td>
          <td tabIndex={0}>{props.element.ordDate}</td>
          {props.role !== "customer" && (
            <td
              tabIndex={0}
              className="handPointer"
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, customer: true })
              }
              onKeyDown={handleSpacePressed}
            >
              {props.element.custCode.custCode}
            </td>
          )}
          {props.role !== "agent" && (
            <td
              tabIndex={0}
              className="handPointer"
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, agent: true })
              }
              onKeyDown={handleSpacePressed}
            >
              {props.element.agentCode.agentCode}
            </td>
          )}
          <td tabIndex={0}>{props.element.ordDescription}</td>
          {props.role === "manager" && (
            <td
              tabIndex={0}
              className="handPointer"
              onClick={() =>
                setViewDetails({ id: props.element.ordNum, edit: true })
              }
              onKeyDown={handleSpacePressed}
            >
              Edit
            </td>
          )}
        </tr>
        {/** View Agent Details in the next row */}
        {viewDetails.id === props.element.ordNum && viewDetails.agent && (
          <tr>
            <td colSpan={nCol} className="interactableTd">
              <IoCloseSharp
                aria-label="close icon"
                className="closeIcon"
                size={closeIconSize}
                tabIndex={0}
                onClick={() => setViewDetails({ id: viewDetails.id })}
                onKeyDown={(e) => {
                  if (e.code === "Space") {
                    e.preventDefault();
                    setViewDetails({ id: viewDetails.id });
                  }
                }}
              />
              <AgentDetailsRow agent={props.element.agentCode} />
            </td>
          </tr>
        )}
        {/** View Customer Details in the next row */}
        {viewDetails.id === props.element.ordNum && viewDetails.customer && (
          <tr>
            <td colSpan={nCol} className="interactableTd">
              <IoCloseSharp
                aria-label="close icon"
                className="closeIcon"
                size={closeIconSize}
                tabIndex={0}
                onClick={() => setViewDetails({ id: viewDetails.id })}
                onKeyDown={(e) => {
                  if (e.code === "Space") {
                    e.preventDefault();
                    setViewDetails({ id: viewDetails.id });
                  }
                }}
              />
              <CustomerDetailsRow customer={props.element.custCode} />
            </td>
          </tr>
        )}
        {/** View and modify Order Details in the next row */}
        {viewDetails.id === props.element.ordNum &&
          viewDetails.edit &&
          props.role === "manager" && (
            <tr>
              <td colSpan={nCol} className="interactableTd">
                <IoCloseSharp
                  className="closeIcon"
                  size={closeIconSize}
                  tabIndex={0}
                  onClick={() => setViewDetails({ id: viewDetails.id })}
                  onKeyDown={(e) => {
                    if (e.code === "Space") {
                      e.preventDefault();
                      setViewDetails({ id: viewDetails.id });
                    }
                  }}
                />
                <OrderEditRow order={props.element} reloadData={refetch} />
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
            <th
              id="orderNumberId"
              tabIndex={0}
              onClick={() => changeOrder("ordNum")}
              onKeyDown={handleSpacePressed}
            >
              Order number {showArrow("ordNum")}
            </th>
            <th
              tabIndex={0}
              onClick={() => changeOrder("ordAmount")}
              onKeyDown={handleSpacePressed}
            >
              Order amount {showArrow("ordAmount")}
            </th>
            <th
              tabIndex={0}
              onClick={() => changeOrder("advanceAmount")}
              onKeyDown={handleSpacePressed}
            >
              Advance amount {showArrow("advanceAmount")}
            </th>
            <th
              tabIndex={0}
              onClick={() => changeOrder("ordDate")}
              onKeyDown={handleSpacePressed}
            >
              Order date {showArrow("ordDate")}
            </th>
            {props.role !== "customer" && (
              <th
                tabIndex={0}
                onClick={() => changeOrder("custCode")}
                onKeyDown={handleSpacePressed}
              >
                Customer {showArrow("custCode")}
              </th>
            )}
            {props.role !== "agent" && (
              <th
                tabIndex={0}
                onClick={() => changeOrder("agentCode")}
                onKeyDown={handleSpacePressed}
              >
                Agent {showArrow("agentCode")}
              </th>
            )}
            <th
              tabIndex={0}
              onClick={() => changeOrder("ordDescription")}
              onKeyDown={handleSpacePressed}
            >
              Order description {showArrow("ordDescription")}
            </th>
            {props.role === "manager" && (
              <th tabIndex={0} className="modifyColumnHeader">
                Edit
              </th>
            )}
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
