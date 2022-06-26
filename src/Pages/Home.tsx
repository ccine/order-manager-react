import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth";
import OrderTable from "../Components/OrderTable";
import { useRef, useState } from "react";

function Home() {
    document.querySelector("title")!.textContent = "HomePage"; // Change the page's title
    const navigate = useNavigate();
    let auth = useAuth();
    const [highConstrastMode, setHighContrastMode] = useState<boolean>(false);
    const tableRef = useRef();
    const head = document.head; // Returns the <head> element of the current document
    var css; // Variable to insert css rules
    var windowHeight = window.innerHeight; // TODO

    /**
     * Function that changes all the colors of the page by cheching the state of highContrastMode and then changes its value
     * highConstrastMode: false --> highContrastMode ON, !highConstrastMode
     * highConstrastMode: true --> highContrastMode OFF, !highConstrastMode
     */
    function changeContrast() {
        if (!highConstrastMode) {
            css = `html {filter: invert(100%);}`;
        } else {
            css = `html {filter: invert(0%);}`;
        }

        const style = document.createElement("style");
        style.type = "text/css";
        if (style.sheet) {
            style.sheet.insertRule(css, 0);
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        setHighContrastMode(!highConstrastMode);
    }

    /* TODO */
    /*
    function calcWindowHeihgt(){
      var tableHeight = document.getElementsByTagName("OrderTable");
      if(windowHeight > tableHeight[0].offsetH)
    }
    */

    return (
        <div className="containerPageHome">
            <header className="homeHeader">
                <h2 id="homeTitle" className="divTitle">Welcome {auth.user?.username}</h2>

                {/* highContrastMode button */}
                <button id="styleSwitcherHome" onClick={changeContrast}><strong>
                    High Contrast Mode: {highConstrastMode ? "ON" : "OFF"}
                    </strong>
                </button>

                <button
                    id="logoutButton"
                    onClick={() => {
                        auth.signout(() => navigate("/"));
                    }}
                >
                    <strong>Log out</strong>
                </button>
            </header>

            <div className="homeContainer">
                <div className="keyColumn">
                    <h2 id="keyColumnTitle" className="padding_left divTitle">
                        Instructions:
                    </h2>
                    <ul>
                        <li>
                            On the right side of the page you can see your list
                            of orders in a table
                        </li>
                        <li>
                            You can sort the rows of the table by clicking on
                            the name of the column you want to sort by
                        </li>
                        <li>
                            Each agent and customer can be clicked to see his
                            details
                        </li>
                        <li>
                            Click the "Log out" button to exit from this page
                        </li>
                        <li>
                            In small width screen the function of the table
                            headers to follow the scrolling of the page is
                            disabled
                        </li>
                    </ul>
                </div>

                <div className="tableColumn">
                    <h2 id="tableColumnTitle" className="padding_left divTitle">
                        List of orders:
                    </h2>
                    {auth.user && (
                        <OrderTable
                            username={auth.user.username}
                            role={auth.user.role}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
