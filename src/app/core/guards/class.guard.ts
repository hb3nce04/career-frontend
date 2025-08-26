import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {of} from 'rxjs';
import {ClassSelectorService} from '../services/class-selector.service';

@Injectable({providedIn: 'root'})
export class ClassGuard implements CanActivate {
  protected classSelectorService: ClassSelectorService = inject(ClassSelectorService);
  protected router: Router = inject(Router);

  canActivate() {
    const selectedClass = this.classSelectorService.selectedClassSubject.value;
    if (selectedClass === null) {
      this.router.navigate(['/dashboard/selector']);
    }
    return of(selectedClass != null);
  }
}
