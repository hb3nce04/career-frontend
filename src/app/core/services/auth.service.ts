import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {BaseResponseDto} from '../dto/base-response.dto';
import {UserModel} from '../../shared/models/user.model';
import {ENVIRONMENT} from '../../../environments/environment';
import {AuthModel} from '../models/auth.model';

interface LoginResponse extends BaseResponseDto {
  user: UserModel;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = ENVIRONMENT.API_URL + "/auth";

  private userSubject = new BehaviorSubject<UserModel | null>(null);

  login(body: AuthModel) {
    return this.http.post<LoginResponse>(this.apiUrl + "/login", body, {withCredentials: true}).pipe(
      tap(response => {
        this.userSubject.next(response.user);
      })
    )
  }

  logout() {
    return this.http.post<LoginResponse>(this.apiUrl + "/logout", {}, {withCredentials: true}).pipe(
      tap(() => {
        this.userSubject.next(null);
      })
    )
  }

  getProfile(): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + '/profile', {withCredentials: true}).pipe(
      tap(user => this.userSubject.next(user)),
    );
  }

  getId(): string | undefined {
    return this.userSubject.value?.id;
  }

  getIsAdmin(): boolean {
    return !!this.userSubject.value?.isAdmin;
  }

  getRole(): string {
    return this.getIsAdmin() ? "Admin" : "Felhasználó";
  }
}
