import React, { useState } from "react";
import "../Assets/Home.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { gql, useQuery } from "@apollo/client";

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
  const [order, setOrder] = useState({ key: "ordNum", asc: true });
  const { loading, error, data } = useQuery(GET_ORDERS);

  const sortedItems = React.useMemo(() => {
    if (!data) return [];
    let sortableItems = [...data.getAllOrders];
    let elementKey = (element: any) =>
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

  function changeOrder(key: string) {
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
          {sortedItems.map((element: any) => (
            <tr key={element.ordNum}>
              <td>{element.ordNum}</td>
              <td>{element.ordAmount}</td>
              <td>{element.ordDate}</td>
              <td>{element.custCode.custCode}</td>
              <td>{element.agentCode.agentCode}</td>
              <td>{element.ordDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManagerTable;
