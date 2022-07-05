import { Agent } from "../types";

function AgentDetailsRow(props: { agent: Agent }) {
  return (
    <>
      <h2 className="divTitle elementHoverFocus" tabIndex={0}>Agent Details</h2>
              <ul>
                <li tabIndex={0}>Code: {props.agent.agentCode}</li>
                <li tabIndex={0}>Name: {props.agent.agentName}</li>
                <li tabIndex={0}>
                  Commission: {props.agent.commission}
                </li>
                <li tabIndex={0}>Country: {props.agent.country}</li>
                <li tabIndex={0}>Phone Number: {props.agent.phoneNo}</li>
                <li tabIndex={0}>Working Area: {props.agent.workingArea}</li>
              </ul>
    </>
  );
}

export default AgentDetailsRow;
