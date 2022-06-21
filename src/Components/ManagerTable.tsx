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
  const [order, setOrder] = useState({ column: 0, asc: true });
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  /*function sortTable() {
    if (!data || !orderList) return;
    let obj = [...orderList];
    if (order.asc)
      obj.sort((a: any, b: any) => {
        return b.ordNum - a.ordNum;
      });
    else
      obj.sort((a: any, b: any) => {
        return a.ordNum - b.ordNum;
      });
    setOrderList(obj);
  }*/

  function changeOrder(col: number) {
    setOrder({ column: col, asc: order.column === col ? !order.asc : true });
  }

  function showArrow(col: number) {
    return order?.column === col ? (
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
            <th onClick={() => changeOrder(0)}>Order number {showArrow(0)}</th>
            <th onClick={() => changeOrder(1)}>Order amount {showArrow(1)}</th>
            <th onClick={() => changeOrder(2)}>Order date {showArrow(2)}</th>
            <th onClick={() => changeOrder(3)}>
              Order description {showArrow(3)}
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.getAllOrders.map((element: any) => (
              <tr key={element.ordNum}>
                <td>{element.ordNum}</td>
                <td>{element.ordAmount}</td>
                <td>{element.ordDate}</td>
                <td>{element.ordDescription}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ManagerTable;
