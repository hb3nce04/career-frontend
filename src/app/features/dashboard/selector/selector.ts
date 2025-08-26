import {Component, inject, OnInit} from '@angular/core';
import {ClassService} from '../../../core/services/class.service';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {IClass} from '../../../shared/models/class.model';

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

  classes: IClass[] = [];

  ngOnInit(): void {
    this.classService.getAll().subscribe(classes => {
      this.classes = classes;
    });
  }
}
