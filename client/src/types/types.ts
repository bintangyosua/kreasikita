export type TCreatePayout = {
  amount: number;
  card_number: string;
  bank_code: String;
  description: string;
};

export type TDonation = {
  id: number;
  order_id: string;
  gross_amount: number;
  senderUsername?: string;
  senderEmail?: string;
  senderName?: string;
  message?: string;
  receiverUsername: string;
  payment_type: string;
  transaction_status: string;
  transaction_time: Date;
  sender: any;
};
