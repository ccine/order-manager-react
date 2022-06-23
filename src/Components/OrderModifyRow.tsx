import { useState } from "react";
import { Order } from "../types";

function AgentDetailsRow(props: { order: Order }) {
    const [order, setOrder] = useState<Order>(props.order);

  return (
    <form onSubmit={() => {}}>
      <input value={order.ordNum} disabled />
      <input value={order.ordAmount} onChange={(event) => console.log(event.target.value)}/>
      <input value={order.advanceAmount} />
      <input value={order.ordDate} />
      <input value={order.custCode.custCode} disabled />
      <input value={order.agentCode.agentCode} disabled />
      <input value={order.ordDescription} />
      {/* Submit button */}
      <button
        type="submit"
        id="submitButton"
        tabIndex={6}
        aria-label="submit button"
        title="submit button"
      >
        <strong>Log in</strong>
      </button>
    </form>
  );
}

export default AgentDetailsRow;
