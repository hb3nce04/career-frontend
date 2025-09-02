import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// TODO: ExpressionChangedAfterItHasBeenCheckedError
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSubject = new BehaviorSubject<boolean>(false);

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
