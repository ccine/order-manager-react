import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { UPDATE_ORDER } from "../Graphql/mutation";
import { GET_ALL_CUSTOMERS, GET_CUSTOMERS_BY_AGENT } from "../Graphql/query";
import { Customer, Order } from "../types";

function OrderEditRow(props: {
  order: Order;
  reloadData: VoidFunction;
  role: string;
}) {
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const { data } = useQuery(
    props.role === "agent" ? GET_CUSTOMERS_BY_AGENT : GET_ALL_CUSTOMERS,
    {
      variables: { agent: props.order.agentCode.agentCode },
    }
  );

  const [newAgent, setNewAgent] = useState<string>();

  /**
   * Save the order with modified data and refetch all the data
   * @param event Event that invoked the function
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let orderInput = {
      ordAmount: formData.get("inputOrdAmount"),
      advanceAmount: formData.get("inputAdvanceAmount"),
      ordDate: formData.get("inputOrdDate"),
      custCode: formData.get("inputCustCode"),
      agentCode: newAgent || props.order.agentCode.agentCode,
      ordDescription: formData.get("inputOrderDescription"),
    };
    updateOrder({
      variables: { ordNum: props.order.ordNum, order: orderInput },
    }).then(() => props.reloadData());
  }

  return (
    <>
      <h2 className="tdTitle elementHoverFocus" tabIndex={0}>
        Editor order
      </h2>
      <form onSubmit={handleSubmit} className="homeForm">
        <div>
          <div className="formLabels">
            <label htmlFor="inputOrdNum">Order number:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputOrdNum"
              className="customInput"
              value={props.order.ordNum}
              tabIndex={0}
              disabled
            />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputOrdAmount">Order amount:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputOrdAmount"
              name="inputOrdAmount"
              className="customInput"
              type="number"
              step="0.01"
              defaultValue={props.order.ordAmount}
              tabIndex={0}
            />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputAdvanceAmount">Advance amount:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputAdvanceAmount"
              name="inputAdvanceAmount"
              className="customInput"
              type="number"
              step="0.01"
              defaultValue={props.order.advanceAmount}
              tabIndex={0}
            />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputOrdDate">Order date:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputOrdDate"
              name="inputOrdDate"
              className="customInput"
              type="date"
              defaultValue={props.order.ordDate}
              tabIndex={0}
            />
          </div>
        </div>

        {props.role === "agent" && data && data.getCustomersByAgent && (
          <div>
            <div className="formLabels">
              <label htmlFor="inputCustCode">Customer:</label>
            </div>
            <div className="formInputs">
              <select
                id="inputCustCode"
                name="inputCustCode"
                className="elementHoverFocus customInput"
                tabIndex={0}
                required
                defaultValue={props.order.custCode.custCode}
              >
                {data.getCustomersByAgent.map((element: Customer) => (
                  <option key={element.custCode} value={element.custCode}>
                    {element.custCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {props.role === "manager" && data && data.getAllCustomers && (
          <div>
            <div className="formLabels">
              <label htmlFor="inputCustCode">Customer:</label>
            </div>
            <div className="formInputs">
              <select
                id="inputCustCode"
                name="inputCustCode"
                className="elementHoverFocus customInput"
                tabIndex={0}
                required
                defaultValue={props.order.custCode.custCode}
                onChange={(event) => {
                  let newCustCode = event.target.value;
                  let newAgentCode = data.getAllCustomers.find(
                    (c: { custCode: string }) => c.custCode === newCustCode
                  ).agentCode.agentCode;
                  setNewAgent(newAgentCode);
                }}
              >
                {data.getAllCustomers.map((element: Customer) => (
                  <option key={element.custCode} value={element.custCode}>
                    {element.custCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <div className="formLabels">
            <label htmlFor="inputAgentCode">Agent:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputAgentCode"
              name="inputAgentCode"
              className="customInput"
              value={newAgent || props.order.agentCode.agentCode}
              tabIndex={0}
              disabled
            />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputOrderDescription">Order description:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputOrderDescription"
              name="inputOrderDescription"
              className="customInput"
              type="text"
              defaultValue={props.order.ordDescription}
              tabIndex={0}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="submitHomeButton"
          className="logButton"
          tabIndex={0}
        >
          <strong>Save</strong>
        </button>
      </form>
    </>
  );
}

export default OrderEditRow;
