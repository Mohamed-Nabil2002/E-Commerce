export interface Order {
  id: number;
  orderDate?: string;
  userId?: string;
  products?: { productId: number; quantity: number }[];
  paymentType?: string;
}
