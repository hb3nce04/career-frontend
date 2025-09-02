import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = ENVIRONMENT.API_URL + "/categories";

  getAll(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.apiUrl, {withCredentials: true});
  }
}
