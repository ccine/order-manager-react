import { Customer } from "../types";

function CustomerDetailsRow(props: { customer: Customer }) {
  return (
    <>
      <h2 className="tdTitle elementHoverFocus" tabIndex={0}>
        Customer Details
      </h2>

      <div className="detailsDiv">
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Code: </span>
              <span className="detailsDataSpan">
                {props.customer.custCode}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Name: </span>
              <span className="detailsDataSpan">
                {props.customer.custName}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">City: </span>
              <span className="detailsDataSpan">
                {props.customer.custCity}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Working Area: </span>
              <span className="detailsDataSpan">
                {props.customer.workingArea}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Country: </span>
              <span className="detailsDataSpan">
                {props.customer.custCountry}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Grade: </span>
              <span className="detailsDataSpan">
                {props.customer.grade}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Opening Amount: </span>
              <span className="detailsDataSpan">
                {props.customer.openingAmt}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Receive Amount: </span>
              <span className="detailsDataSpan">
                {props.customer.receiveAmt}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Payment Amount: </span>
              <span className="detailsDataSpan">
                {props.customer.paymentAmt}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Outstanding Amount: </span>
              <span className="detailsDataSpan">
                {props.customer.outstandingAmt}
              </span>
          </span>
        </label>
        <label tabIndex={0} className="detailsLabel elementHoverFocus">
          <span className="detailsLabelContainer">
              <span className="detailsNameSpan">Phone number: </span>
              <span className="detailsDataSpan">
                {props.customer.phoneNo}
              </span>
          </span>
        </label>
      </div>
    </>
  );
}

export default CustomerDetailsRow;
