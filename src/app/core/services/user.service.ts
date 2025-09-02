import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '../../../environments/ENVIRONMENT';
import {AuthService} from './auth.service';
import {BaseResponseDto} from '../dto/base-response.dto';
import {UserModel} from '../../shared/models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  private apiUrl: string = ENVIRONMENT.API_URL + "/users";

  getAll(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.apiUrl, {withCredentials: true});
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<BaseResponseDto> {
    return this.httpClient.patch<BaseResponseDto>(this.apiUrl + "/" + this.authService.getId(), {
        oldPassword,
        newPassword
      }, {
        withCredentials: true
      }
    );
  }

  delete(id: number): Observable<BaseResponseDto> {
    return this.httpClient.delete<BaseResponseDto>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  create(password: string, userDto: UserModel): Observable<BaseResponseDto> {
    const {id, isAdmin} = userDto;
    return this.httpClient.post<BaseResponseDto>(this.apiUrl, {id, password, isAdmin}, {withCredentials: true});
  }
}
