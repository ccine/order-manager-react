import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import ManagerTable from "../Components/ManagerTable";
import { useAuth } from "../Auth";
import AgentTable from "../Components/AgentTable";
import CustomerTable from "../Components/CustomerTable";

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
        {auth.user?.role === 'agent' && <AgentTable agentCode={auth.user.username} />}
        {auth.user?.role === 'customer' && <CustomerTable custCode={auth.user.username} />}
      </div>
    </div>
  );
}

export default Home;
