import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class ProductsService {

  products: Product[] = [];
  productsSubject = new Subject<Product[]>();



  constructor() { }

  emitProducts() {
    this.productsSubject.next(this.products);
  }

  saveProducts() {
    firebase.database().ref('/products').set(this.products);
  }

  getProducts() {
    firebase.database().ref('/products')
      .on('value', (data) => {
        this.products = data.val() ? data.val() : [];
        this.emitProducts();
      })
  }

  getSingleProduct(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/products/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewProduct(newProduct: Product) {
    this.products.push(newProduct);
    this.saveProducts();
    this.emitProducts();
  }

  removeProduct(product: Product) {

    if(product.cover_image) {
      const storageRef = firebase.storage().refFromURL(product.cover_image);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée!')
        }
      ).catch(
        (error) => {
          console.log("Fichier non trouvé: " + error);
        }
      );
    }

    const productIndexToRemove = this.products.findIndex(
      (productEl) => {
        if (productEl === product) {
          return true;
        }
      }
    );
    this.products.splice(productIndexToRemove, 1);
    this.saveProducts();
    this.emitProducts();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('/images' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement....');
          }, 
          (error) => {
            console.log('Erreur de chargement: ' + error.message);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
            console.log("##################" + upload.snapshot.downloadURL);
          });
      }
    );
  }

}
