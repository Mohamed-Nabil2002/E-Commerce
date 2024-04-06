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
  pageIndex: number = 0;
  pageSize: number = 20;

  constructor() {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.allOrders = orders;
    this.initTableData();
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

  // Pagination
  onPageChange(event: any): void {
    const pageStartElement = event.pageIndex * event.pageSize;
    const pageLastElement = (event.pageIndex + 1) * event.pageSize;
    const newData = this.allOrders.slice(pageStartElement, pageLastElement);
    this.dataSource = new MatTableDataSource(newData);
  }

  initTableData(): void {
    this.dataSource = new MatTableDataSource(this.allOrders.slice(0, 20));
  }
}
