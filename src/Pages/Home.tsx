import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import ManagerTable from "../Components/ManagerTable";
import { useAuth } from "../Auth";

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
        {auth.user?.role === 'manager' && <ManagerTable />}
      </div>
    </div>
  );
}

export default Home;
