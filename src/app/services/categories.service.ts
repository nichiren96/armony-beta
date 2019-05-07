import { Injectable } from '@angular/core';
import { Category } from '../models/Category.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Injectable()
export class CategoriesService {

  categories: Category[] = [];
  categoriesSubject = new Subject<Category[]>();

  constructor() { }

  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }

  saveCategories() {
    firebase.database().ref('/categories').set(this.categories);
  }

  getCategories() {
    firebase.database().ref('/categories')
      .on('value', (data) => {
        this.categories = data.val() ? data.val() : [];
        this.emitCategories();
      })
  }


  getSingleCategory(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/categories/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewCategory(newCategory: Category) {

    this.categories.push(newCategory);
    this.saveCategories();
    this.emitCategories();

  }

  updateCategory(category: Category, id: number) {
    firebase.database().ref('categories/' + id).update(category);
    this.emitCategories();
  }


  removeCategory(Category: Category) {

    const CategoryIndexToRemove = this.categories.findIndex(
      (CategoryEl) => {
        if (CategoryEl === Category) {
          return true;
        }
      }
    );
    this.categories.splice(CategoryIndexToRemove, 1);
    this.saveCategories();
    this.emitCategories();
  }

}
