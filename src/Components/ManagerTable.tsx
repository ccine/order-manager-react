import React, { useState } from "react";
import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders($breed: String!) {
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

/** */
var dataExample = [
  {
    ord_num: "1",
    ord_amount: "2",
    ord_date: "1/1/2020",
    ord_description: "aaaaa",
  },
  {
    ord_num: "2",
    ord_amount: "6",
    ord_date: "2/2/2020",
    ord_description: "bbbb",
  },
];
/** */

function ManagerTable() {
  const [order, setOrder] = useState({ column: 0, asc: true });
  const { loading, error, data } = useQuery(GET_ORDERS);

  function showArrow(col: number) {
    if (order) {
      if (col === order.column)
        if (order.asc) return <p>asc</p>;
        else return <p>desc</p>;
    }
  }

  // Sort the table
  // n: wich column to sort by
  // dir: sorting direction
  function sortTable(n: number, dir: Boolean) {
    var table, // table to sort
      rows, // rows of the table
      switching, // flag to continue or not with the cycle
      i, // iterator
      x,
      y;
    table = document.getElementById("orderList") as HTMLTableElement;
    if (!table) return;
    switching = true;
    rows = table.rows;
    while (switching) {
      switching = false;
      for (i = 1; i < rows.length - 1; i++) {
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (
          (dir && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
          (!dir && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
        ) {
          rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }
  }

  function OrderList() {
    if (loading) return null;
    if (error) return <tr><p>{`Error! ${error}`}</p></tr>;
    return (
      <>
        {dataExample.map((element) => (
          <tr key={element.ord_num}>
            <td>{element.ord_num}</td>
            <td>{element.ord_amount}</td>
            <td>{element.ord_date}</td>
            <td>{element.ord_description}</td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <table id="orderList" border={2} align="center">
      <thead>
        <tr>
          <th
            onClick={() =>
              setOrder({
                column: 0,
                asc: false,
              })
            }
          >
            Order number{showArrow(0)}
          </th>
          <th>Order amount</th>
          <th>Order date</th>
          <th>Order description</th>
        </tr>
      </thead>
      <tbody>
        <OrderList />
      </tbody>
    </table>
  );
}

export default ManagerTable;
