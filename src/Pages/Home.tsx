import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import OrderTable from "../Components/OrderTable";

function Home() {
  const navigate = useNavigate();
  let auth = useAuth();
  
  return (
    <div className="contanier">
      <div className="homeHeader">
        <h2 id="homeTitle">WELCOME {auth.user?.username}</h2>
        <button
          id="logoutButton"
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Log out
        </button>
      </div>

      <label>List of orders</label>
      <div>
        {auth.user && <OrderTable username={auth.user.username} role={auth.user.role}/>}
      </div>
    </div>
  );
}

export default Home;
