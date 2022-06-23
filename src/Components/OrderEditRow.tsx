import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_ORDER } from "../Graphql/mutation";
import { Order } from "../types";

function AgentDetailsRow(props: { order: Order, reloadData: VoidFunction}) {
  const [updateOrder, { data, loading, error }] = useMutation(UPDATE_ORDER);
  const [order, setOrder] = useState<Order>(props.order);
  let tempOrder = { ...order };

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
    <form onSubmit={handleSubmit}>
      <input value={order.ordNum} disabled />
      <input
        value={order.ordAmount}
        onChange={(event) => {
          tempOrder.ordAmount = parseInt(event.target.value);
          setOrder(tempOrder);
        }}
      />
      <input
        value={order.advanceAmount}
        onChange={(event) => {
          tempOrder.advanceAmount = parseInt(event.target.value);
          setOrder(tempOrder);
        }}
      />
      <input
        value={order.ordDate}
        onChange={(event) => {
          tempOrder.ordDate = event.target.value;
          setOrder(tempOrder);
        }}
      />
      <input value={order.custCode.custCode} disabled />
      <input value={order.agentCode.agentCode} disabled />
      <input
        value={order.ordDescription}
        onChange={(event) => {
          tempOrder.ordDescription = event.target.value;
          setOrder(tempOrder);
        }}
      />
      {/* Submit button */}
      <button
        type="submit"
        id="submitButton"
        tabIndex={6}
        aria-label="submit button"
        title="submit button"
      >
        <strong>Save</strong>
      </button>
    </form>
  );
}

export default AgentDetailsRow;
