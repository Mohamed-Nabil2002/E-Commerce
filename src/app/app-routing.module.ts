import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent},
  {path: 'orders', component: OrderListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
