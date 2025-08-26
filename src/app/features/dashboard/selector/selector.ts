import {Component, inject, OnInit} from '@angular/core';
import {ClassService} from './class.service';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {ClassDto} from '../../../shared/dtos/class.dto';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

// Kiválasztott osztály jelölése valahogy és felbontani ClassSelectorService-re
@Component({
  selector: 'app-selector',
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatButton
  ]
})
export class Selector implements OnInit{
  protected classService = inject(ClassService);
  protected classSelectorService = inject(ClassSelectorService);

  classes: ClassDto[] = [];

  ngOnInit(): void {
    this.classService.getAll().subscribe(classes => {
      this.classes = classes;
    });
  }
}
