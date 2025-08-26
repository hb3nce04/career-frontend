import {Component, inject} from '@angular/core';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [
    RouterLink,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader
  ]
})
export class Home {
  protected classSelectorService: ClassSelectorService = inject(ClassSelectorService);
  selectedClass = this.classSelectorService.selectedClassSubject.value
}
