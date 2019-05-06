import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.product = new Product('','', 0);
    const id = this.route.snapshot.params['id'];
    this.productsService.getSingleProduct(+id).then(
      (product: Product) => {
        this.product = product;
      }
    );
  }

  onBack() {
    this.router.navigate(['/products']);
  }

}
