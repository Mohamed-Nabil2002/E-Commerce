import { Component, OnInit } from '@angular/core';
import products from '../data/products.json';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: Array<Product>;
  totalNumberOfProduct: number;

  constructor() {}

  ngOnInit(): void {
    this.getAllProducts();
    this.totalNumberOfProduct = products.length;
  }

  private getAllProducts(): void {
    this.allProducts = products.slice(0, 4);
  }

  loadMoreProducts() {
    this.allProducts = products.slice(0, this.allProducts.length + 4);
  }
}
