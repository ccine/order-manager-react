import { Customer } from "../types";

function CustomerDetailsRow(props: { customer: Customer }) {
    return (
      <>
        <h2>Customer Details</h2>
        <ul>
          <li>Code: {props.customer.custCode}</li>
          <li>Name: {props.customer.custName}</li>
          <li>City: {props.customer.custCity}</li>
          <li>Working Area: {props.customer.workingArea}</li>
          <li>Country: {props.customer.custCountry}</li>
          <li>Grade: {String(props.customer.grade)}</li>
          <li>Opening Amount: {String(props.customer.openingAmt)}</li>
          <li>Receive Amount: {String(props.customer.receiveAmt)}</li>
          <li>Payment Amount: {String(props.customer.paymentAmt)}</li>
          <li>
            Outstanding Amount: {String(props.customer.outstandingAmt)}
          </li>
          <li>Phone Number: {props.customer.phoneNo}</li>
        </ul>
      </>
    );
  }
  

export default  CustomerDetailsRow;