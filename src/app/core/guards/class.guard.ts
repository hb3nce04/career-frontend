import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ClassService} from '../services/class.service';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClassGuard implements CanActivate {
  protected classService = inject(ClassService);
  protected router: Router = inject(Router);

  canActivate() {
    const selectedClass = this.classService.selectedClassSubject.value;
    if (selectedClass === null) {
      this.router.navigate(['/dashboard/selector']);
    }
    return of(selectedClass != null);
  }
}
