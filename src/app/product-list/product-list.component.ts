import { Component, OnInit } from '@angular/core';
import products from '../data/products.json';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.allProducts = products;
  }
}
