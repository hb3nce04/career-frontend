import {Component, computed, inject, OnInit} from '@angular/core';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ClassService} from '../selector/class.service';

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
export class Home implements OnInit {
  protected classSelectorService: ClassSelectorService = inject(ClassSelectorService);
  protected classService: ClassService = inject(ClassService);
  selectedClass = computed(() => this.classSelectorService.selectedClassSubject.value);

  studentsInClass!: number;

  ngOnInit(): void {
    if (this.selectedClass()) {
      this.classService.getStatistics(this.selectedClass()!.id).subscribe({
        next: (val) => {
          this.studentsInClass = val.countStudentsInClass;
        }
      });
    }
  }
}
