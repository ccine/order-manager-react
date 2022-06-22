import { Agent } from "../types";

function AgentDetailsRow(props: { agent: Agent }) {
  return (
    <>
      <h2>Agent Details</h2>
              <ul>
                <li>Code: {props.agent.agentCode}</li>
                <li>Name: {props.agent.agentName}</li>
                <li>
                  Commission: {String(props.agent.commission)}
                </li>
                <li>Country: {props.agent.country}</li>
                <li>Phone Number: {props.agent.phoneNo}</li>
                <li>Working Area: {props.agent.workingArea}</li>
              </ul>
    </>
  );
}

export default AgentDetailsRow;
