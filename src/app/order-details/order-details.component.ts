import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { Customer } from '../models/customer';
import orders from '../data/orders.json';
import customers from '../data/users.json';
import products from '../data/products.json';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderId: any;
  order: any;
  allOrders = orders;
  customer: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'price', 'availablePieces'];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setOrderId();
    this.getOrderById();
  }

  private setOrderId(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  private getOrderById(): void {
    this.order = this.allOrders.find(
      (order: Order) => order.id === +this.orderId
    );
    this.setCustomer(this.order);
    this.setProductsInOrder(this.order);
  }

  private setCustomer(order: any): void {
    this.customer = customers.find(
      (cust: Customer) => cust.id === order.userId
    );
  }

  setProductsInOrder(order: Order): void {
    let matchedProducts: any[] = [];
    if (!order.products || !Array.isArray(order.products)) return;
    for (let product of order.products) {
      const matchedProduct = products.find(
        (prod: Product) => prod.id === product.productId
      );
      matchedProducts.push(matchedProduct);
    }
    this.dataSource = new MatTableDataSource(matchedProducts);
  }
}
