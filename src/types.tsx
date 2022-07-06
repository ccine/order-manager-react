export type Agent = {
  agentCode: string;
  agentName: string;
  workingArea: string;
  commission: number;
  phoneNo: string;
  country: string;
};

export type Customer = {
  custCode: string;
  custName: string;
  custCity: string;
  workingArea: string;
  custCountry: string;
  grade: number;
  openingAmt: number;
  receiveAmt: number;
  paymentAmt: number;
  outstandingAmt: number;
  phoneNo: string;
  agentCode: Agent;
};

export type Order = {
  ordNum: number;
  ordAmount: number;
  advanceAmount: number;
  ordDate: string;
  custCode: Customer;
  agentCode: Agent;
  ordDescription: string;
};

export type OrderInput = {
  ordNum: number;
  ordAmount: number;
  advanceAmount: number;
  ordDate: string;
  custCode: string;
  agentCode: string;
  ordDescription: string;
};

export type Role = "manager" | "agent" | "customer";
