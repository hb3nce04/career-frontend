import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoadingService} from '../services/loading.service';
import {finalize, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService: LoadingService = inject(LoadingService);

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.loadingOn();
    return handler.handle(req).pipe(
      finalize(() => {
        this.loadingService.loadingOff();
      })
    );
  }
}
