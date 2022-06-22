export type Agent = {
  agentCode: String;
  agentName: String;
  workingArea: String;
  commission: Number;
  phoneNo: String;
  country: String;
};

export type Customer = {
  custCode: String;
  custName: String;
  custCity: String;
  workingArea: String;
  custCountry: String;
  grade: Number;
  openingAmt: Number;
  receiveAmt: Number;
  paymentAmt: Number;
  outstandingAmt: Number;
  phoneNo: String;
  agentCode: Agent;
};

export type Order = {
  ordNum: Number;
  ordAmount: Number;
  advanceAmount: Number;
  ordDate: String;
  custCode: Customer;
  agentCode: Agent;
  ordDescription: String;
};

export type Role = "manager" | "agent" | "customer";
