import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/Product.model';
import { Subscription } from 'rxjs/Subscription';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  productsSubscription: Subscription;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productsSubscription = this.productService.productsSubject.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.productService.getProducts();
    this.productService.emitProducts();
  }

  onNewProduct() {
    this.router.navigate(['/products', 'new']);
  }

  onDeleteProduct(product: Product) {
    this.productService.removeProduct(product);
  }

  onViewProduct(id: number) {
    this.router.navigate(['/products', 'view', id]);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
