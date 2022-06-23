import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth";
import OrderTable from "../Components/OrderTable";

function Home() {
  const navigate = useNavigate();
  let auth = useAuth();
  
  return (
    <div className="containerPageHome">
      <header className="homeHeader">
        <h2 id="homeTitle">Welcome {auth.user?.username}</h2>
        <button
          id="logoutButton"
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          <strong>
            Log out
          </strong>
        </button>
      </header>

      <div className="homeContainer">
        <div className="keyColumn">
          <h2 id="keyColumnTitle" className="columnTitle">Instructions:</h2>
          <ul>
            <li>On the right side of the page you can see your list of orders in a table</li>
            <li>You can sort the rows of the table by clicking on the name of the column you want to sort by</li>
            <li>Each agent and customer can be clicked to see his details</li>
            <li>Click the "Log out" button to exit from this page</li>
          </ul>  
        </div>

        <div className="tableColumn">
          <h2 id="tableColumnTitle" className="columnTitle">List of orders:</h2>
          {auth.user && <OrderTable username={auth.user.username} role={auth.user.role}/>}
        </div>
      </div>
    </div>
  );
}

export default Home;
