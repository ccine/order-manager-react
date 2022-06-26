import { Agent } from "../types";

function AgentDetailsRow(props: { agent: Agent }) {
  return (
    <>
      <h2 className="padding_left divTitle">Agent Details</h2>
              <ul>
                <li>Code: {props.agent.agentCode}</li>
                <li>Name: {props.agent.agentName}</li>
                <li>
                  Commission: {props.agent.commission}
                </li>
                <li>Country: {props.agent.country}</li>
                <li>Phone Number: {props.agent.phoneNo}</li>
                <li>Working Area: {props.agent.workingArea}</li>
              </ul>
    </>
  );
}

export default AgentDetailsRow;
