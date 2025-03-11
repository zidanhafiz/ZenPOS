import { Transaction } from "../transaction";

export type TransactionResponse = {
  data: Transaction[];
  total_pages: number;
  current_page: number;
};
