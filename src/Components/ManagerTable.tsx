import React, { useState } from "react";
import "../Assets/Home.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { gql, useQuery } from "@apollo/client";
import { Order } from "../types";

const GET_ORDERS = gql`
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

function ManagerTable() {
  const [order, setOrder] = useState<{ key: keyof Order; asc: boolean }>({
    key: "ordNum",
    asc: true,
  });
  const [viewDetails, setViewDetails] = useState<{
    id: Number;
    agent?: boolean;
    customer?: boolean;
  }>({ id: -1 });
  const { loading, error, data } = useQuery(GET_ORDERS);

  const sortedItems = React.useMemo(() => {
    if (!data) return [];
    let sortableItems = [...data.getAllOrders];
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

  function TableRow(props: { element: Order }) {
    return (
      <>
        <tr>
          <td>{String(props.element.ordNum)}</td>
          <td>{String(props.element.ordAmount)}</td>
          <td>{props.element.ordDate}</td>
          <td
            onClick={() =>
              setViewDetails({ id: props.element.ordNum, customer: true })
            }
          >
            {props.element.custCode.custCode}
          </td>
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
            <td colSpan={6}>
              <h2>Agent Details</h2>
              <ul>
                <li>Code: {props.element.agentCode.agentCode}</li>
                <li>Name: {props.element.agentCode.agentName}</li>
                <li>
                  Commission: {String(props.element.agentCode.commission)}
                </li>
                <li>Country: {props.element.agentCode.country}</li>
                <li>Phone Number: {props.element.agentCode.phoneNo}</li>
                <li>Working Area: {props.element.agentCode.workingArea}</li>
              </ul>
            </td>
          </tr>
        )}
        {viewDetails.id === props.element.ordNum && viewDetails.customer && (
          <tr>
            <td colSpan={6}>
              <h2>Customer Details</h2>
              <ul>
                <li>Code: {props.element.custCode.custCode}</li>
                <li>Name: {props.element.custCode.custName}</li>
                <li>City: {props.element.custCode.custCity}</li>
                <li>Working Area: {props.element.custCode.workingArea}</li>
                <li>Country: {props.element.custCode.custCountry}</li>
                <li>Grade: {String(props.element.custCode.grade)}</li>
                <li>Opening Amount: {String(props.element.custCode.openingAmt)}</li>
                <li>Receive Amount: {String(props.element.custCode.receiveAmt)}</li>
                <li>Payment Amount: {String(props.element.custCode.paymentAmt)}</li>
                <li>Outstanding Amount: {String(props.element.custCode.outstandingAmt)}</li>
                <li>Phone Number: {props.element.custCode.phoneNo}</li>
              </ul>
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
            <th onClick={() => changeOrder("custCode")}>
              Customer {showArrow("custCode")}
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

export default ManagerTable;
