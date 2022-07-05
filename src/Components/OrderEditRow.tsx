import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { UPDATE_ORDER } from "../Graphql/mutation";
import { GET_CUSTOMERS_BY_AGENT } from "../Graphql/query";
import { Order } from "../types";

function AgentDetailsRow(props: { order: Order; reloadData: VoidFunction }) {
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const { loading, error, data } = useQuery(
    GET_CUSTOMERS_BY_AGENT,
    {
      variables: { agent: props.order.agentCode.agentCode },
    }
  );
  const [order, setOrder] = useState<Order>(props.order);
  let tempOrder = { ...order };
  
  if (data) console.log(data)

  /**
   * Save the order with modified data and refetch all the data
   * @param event Event that invoked the function
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let orderInput = {
      ordAmount: tempOrder.ordAmount,
      advanceAmount: tempOrder.advanceAmount,
      ordDate: tempOrder.ordDate,
      custCode: tempOrder.custCode.custCode,
      agentCode: tempOrder.agentCode.agentCode,
      ordDescription: tempOrder.ordDescription,
    };
    updateOrder({
      variables: { ordNum: tempOrder.ordNum, order: orderInput },
    }).then(() => props.reloadData());
  }

  return (
    <>
      <h2 id="editHeader" className="divTitle elementHoverFocus" tabIndex={0}>
        Editor order
      </h2>
      <form onSubmit={handleSubmit} className="homeForm">
        
        <div>
          <div className="formLabels">
            <label htmlFor="inputOrdNum">Order number:</label>
          </div>
          <div className="formInputs">
            <input id="inputOrdNum" value={order.ordNum} tabIndex={0} disabled />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputOrdAmount">Order amount:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputOrdAmount"
              value={order.ordAmount}
              tabIndex={0}
              onChange={(event) => {
                tempOrder.ordAmount = parseInt(event.target.value);
                setOrder(tempOrder);
              }}
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
              value={order.advanceAmount}
              tabIndex={0}
              onChange={(event) => {
                tempOrder.advanceAmount = parseInt(event.target.value);
                setOrder(tempOrder);
              }}
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
              value={order.ordDate}
              tabIndex={0}
              onChange={(event) => {
                tempOrder.ordDate = event.target.value;
                setOrder(tempOrder);
              }}
            />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputCustCode">Customer:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputCustCode"
              value={order.custCode.custCode}
              tabIndex={0}
              disabled
            />
          </div>
        </div>

        <div>
          <div className="formLabels">
            <label htmlFor="inputAgentCode">Agent:</label>
          </div>
          <div className="formInputs">
            <input
              id="inputAgentCode"
              value={order.agentCode.agentCode}
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
              value={order.ordDescription}
              tabIndex={0}
              onChange={(event) => {
                tempOrder.ordDescription = event.target.value;
                setOrder(tempOrder);
              }}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="submitHomeButton"
          title="submit button"
          className="logButton"
          tabIndex={0}
        >
          <strong>Save</strong>
        </button>
      </form>
    </>
  );
}

export default AgentDetailsRow;
