import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import {UserDto} from '../../shared/dtos/user.dto';
import {BaseResponseDto} from '../dto/base-response.dto';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  private apiUrl: string = environment.apiUrl + "/users";

  getAll(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.apiUrl, {withCredentials: true});
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
}
