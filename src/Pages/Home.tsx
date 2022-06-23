import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import OrderTable from "../Components/OrderTable";

function Home() {
  const navigate = useNavigate();
  let auth = useAuth();
  
  return (
    <div className="containerHomeLogin">
      <div className="homeHeader">
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
      </div>

      <div className="homeContainer">
        <div className="keyColumn">
          <h2>Key list:</h2>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>  
        </div>

        <div className="tableColumn">
          <h2>List of orders:</h2>
          {auth.user && <OrderTable username={auth.user.username} role={auth.user.role}/>}
        </div>
      </div>
    </div>
  );
}

export default Home;
