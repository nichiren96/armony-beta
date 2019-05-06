import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSaveProduct() {
    const reference = this.productForm.get('reference').value;
    const designation = this.productForm.get('designation').value;
    const price = this.productForm.get('price').value;

    const newProduct = new Product(reference, designation, price);
    if (this.fileUrl && this.fileUrl !== '') {
      newProduct.cover_image = this.fileUrl;
    }
    this.productService.createNewProduct(newProduct);
    this.router.navigate(['/products'])
  }

  onBack() {
    this.router.navigate(['/products']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.productService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;

        console.log("*************** " + this.fileUrl);
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
