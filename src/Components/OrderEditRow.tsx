import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_ORDER } from "../Graphql/mutation";
import { GET_ALL_CUSTOMERS, GET_CUSTOMERS_BY_AGENT } from "../Graphql/query";
import { Customer, Order } from "../types";

function AgentDetailsRow(props: {
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

  const [order, setOrder] = useState<any>({
    ...props.order,
    agentCode: props.order.agentCode.agentCode,
    custCode: props.order.custCode.custCode,
  });

  useEffect(() => {
    setOrder({
      ...props.order,
      agentCode: props.order.agentCode.agentCode,
      custCode: props.order.custCode.custCode,
    });
  }, [props.order]);

  /**
   * Save the order with modified data and refetch all the data
   * @param event Event that invoked the function
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let orderInput = {
      ordAmount: order.ordAmount,
      advanceAmount: order.advanceAmount,
      ordDate: order.ordDate,
      custCode: order.custCode,
      agentCode: order.agentCode,
      ordDescription: order.ordDescription,
    };
    updateOrder({
      variables: { ordNum: order.ordNum, order: orderInput },
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
            <input
              id="inputOrdNum"
              value={order.ordNum}
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
              value={order.ordAmount}
              tabIndex={0}
              onChange={(event) => {
                setOrder({ ...order, ordAmount: parseInt(event.target.value) });
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
                setOrder({
                  ...order,
                  advanceAmount: parseInt(event.target.value),
                });
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
                setOrder({ ...order, ordDate: event.target.value });
              }}
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
                className="elementHoverFocus"
                tabIndex={0}
                required
                defaultValue={order.custCode}
                onChange={(event) => {
                  setOrder({ ...order, custCode: event.target.value });
                }}
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
                className="elementHoverFocus"
                tabIndex={0}
                required
                defaultValue={order.custCode}
                onChange={(event) => {
                  let newCustCode = event.target.value;
                  let newAgentCode = data.getAllCustomers.find(
                    (c: { custCode: string }) => c.custCode === newCustCode
                  ).agentCode.agentCode;
                  setOrder({
                    ...order,
                    custCode: newCustCode,
                    agentCode: newAgentCode,
                  });
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
              value={order.agentCode}
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
                setOrder({ ...order, ordDescription: event.target.value });
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
