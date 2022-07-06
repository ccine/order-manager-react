import { Agent } from "../types";

function AgentDetailsRow(props: { agent: Agent }) {
    return (
        <>
            <h2 className="tdTitle elementHoverFocus" tabIndex={0}>
                Agent Details
            </h2>
            {/*
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
      */}

            <div className="detailsDiv">
                <label tabIndex={0} className="detailsLabel elementHoverFocus">
                    <span className="detailsLabelContainer">
                        <span className="detailsNameSpan">Code: </span>
                        <span className="detailsDataSpan">
                            {props.agent.agentCode}
                        </span>
                    </span>
                </label>
                <label tabIndex={0} className="detailsLabel elementHoverFocus">
                    <span className="detailsLabelContainer">
                        <span className="detailsNameSpan">Name: </span>
                        <span className="detailsDataSpan">
                            {props.agent.agentName}
                        </span>
                    </span>
                </label>
                <label tabIndex={0} className="detailsLabel elementHoverFocus">
                    <span className="detailsLabelContainer">
                        <span className="detailsNameSpan">Commission: </span>
                        <span className="detailsDataSpan">
                            {props.agent.commission}
                        </span>
                    </span>
                </label>
                <label tabIndex={0} className="detailsLabel elementHoverFocus">
                    <span className="detailsLabelContainer">
                        <span className="detailsNameSpan">Country: </span>
                        <span className="detailsDataSpan">
                            {props.agent.country}
                        </span>
                    </span>
                </label>
                <label tabIndex={0} className="detailsLabel elementHoverFocus">
                    <span className="detailsLabelContainer">
                        <span className="detailsNameSpan">Phone number: </span>
                        <span className="detailsDataSpan">
                            {props.agent.phoneNo}
                        </span>
                    </span>
                </label>
                <label tabIndex={0} className="detailsLabel elementHoverFocus">
                    <span className="detailsLabelContainer">
                        <span className="detailsNameSpan">Working Area: </span>
                        <span className="detailsDataSpan">
                            {props.agent.workingArea}
                        </span>
                    </span>
                </label>
            </div>
        </>
    );
}

export default AgentDetailsRow;
