import { Component, OnInit } from '@angular/core';
import orders from '../data/orders.json';
import products from '../data/products.json';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})

export class OrderListComponent implements OnInit {
  allOrders: Order[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns = [
    'id',
    'userId',
    'orderDate',
    'productsCount',
    'paymentType',
    'totalPrice',
  ];

  constructor() {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.allOrders = orders;
    this.dataSource = new MatTableDataSource(orders);
  }

  calculateTotalPrice(order: Order): number {
    let totalPrice = 0;
    if (!order.products || !Array.isArray(order.products)) return 0;
    for (let product of order.products) {
      const matchedProduct = products.find(
        (prod: Product) => prod.id === product.productId
      );
      if (matchedProduct) {
        totalPrice += matchedProduct.price * product.quantity;
      }
    }
    return this.totalPriceRoundedValue(totalPrice);
  }

  private totalPriceRoundedValue(totalPrice: number): number {
    return Number(totalPrice.toFixed(2));
  }
}
