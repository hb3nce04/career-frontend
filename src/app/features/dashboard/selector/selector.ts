import {Component, inject, OnInit} from '@angular/core';
import {ClassService} from './class.service';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {IClass} from '../../../shared/models/class.model';
import {ClassSelectorService} from '../../../core/services/class-selector.service';

// Kiválasztott osztály jelölése valahogy és felbontani ClassSelectorService-re
@Component({
  selector: 'app-selector',
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton
  ]
})
export class Selector implements OnInit{
  protected classService = inject(ClassService);
  protected classSelectorService = inject(ClassSelectorService);

  classes: IClass[] = [];

  ngOnInit(): void {
    this.classService.getAll().subscribe(classes => {
      this.classes = classes;
    });
  }
}
