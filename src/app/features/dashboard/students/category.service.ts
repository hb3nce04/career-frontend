import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {CategoryDto} from '../../../shared/dtos/category.dto';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/categories";

  getAll(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(this.apiUrl, {withCredentials: true});
  }
}
