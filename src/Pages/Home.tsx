import React, { useState } from "react";
import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { gql, useLazyQuery } from "@apollo/client";

function Home() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({ column: 0, asc: true });

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

    const OrderList = dataExample.map((element) => (
        <tr key={element.ord_num}>
            <td>{element.ord_num}</td>
            <td>{element.ord_amount}</td>
            <td>{element.ord_date}</td>
            <td>{element.ord_description}</td>
        </tr>
    ));

    function showArrow(col : number) {
        if (order) {
            if (col === order.column)
                if (order.asc) return <p>asc</p>;
                else return <p>desc</p>;
        }
    }

    /*
    async function fetchOrders(){
        //const res = await fetch("http://localhost:7000/graphql", {method: 'post'});
        //return res.json();
        
    }

    function Orders() {
        //const useQueryClient = useQueryClient();
        const {status, data} = useQuery('getAgents', fetchOrders)
        console.log(data);
    }
    */

    // Sort the table
    // n: wich column to sort by
    // dir: sorting direction
    function sortTable(n : number, dir: Boolean) {
        var table, // table to sort
            rows, // rows of the table
            switching, // flag to continue or not with the cycle
            i, // iterator
            x,
            y;
        table = document.getElementById("orderList") as HTMLTableElement;
        if(!table) return;
        switching = true;
        rows = table.rows;
        while (switching) {
            switching = false;
            for (i = 1; i < rows.length - 1; i++) {
                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];
                if (
                    (dir &&
                        x.innerHTML.toLowerCase() >
                            y.innerHTML.toLowerCase()) ||
                    (!dir &&
                        x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                ) {
                    rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    return (
        <div className="contanier">
            <div className="homeHeader">
                <h2 id="homeTitle">WELCOME</h2>
                <button id="logoutButton" onClick={() => navigate("/Login")}>
                    Log out
                </button>
            </div>

            <label>List of orders</label>
            <div>
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
                    <tbody>{OrderList}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
