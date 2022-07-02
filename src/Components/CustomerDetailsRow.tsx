import { Customer } from "../types";

function CustomerDetailsRow(props: { customer: Customer }) {
  return (
    <>
      <h2 className="padding_left divTitle" tabIndex={0}>
        Customer Details
      </h2>
      <ul>
        <li tabIndex={0}>Code: {props.customer.custCode}</li>
        <li tabIndex={0}>Name: {props.customer.custName}</li>
        <li tabIndex={0}>City: {props.customer.custCity}</li>
        <li tabIndex={0}>Working Area: {props.customer.workingArea}</li>
        <li tabIndex={0}>Country: {props.customer.custCountry}</li>
        <li tabIndex={0}>Grade: {props.customer.grade}</li>
        <li tabIndex={0}>Opening Amount: {props.customer.openingAmt}</li>
        <li tabIndex={0}>Receive Amount: {props.customer.receiveAmt}</li>
        <li tabIndex={0}>Payment Amount: {props.customer.paymentAmt}</li>
        <li tabIndex={0}>
          Outstanding Amount: {props.customer.outstandingAmt}
        </li>
        <li tabIndex={0}>Phone Number: {props.customer.phoneNo}</li>
      </ul>
    </>
  );
}

export default CustomerDetailsRow;
