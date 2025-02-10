import { Product } from "../product";

export type ProductResponse = {
  data: Product[];
  total_pages: number;
  current_page: number;
};
