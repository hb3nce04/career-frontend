import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  imports: [
  ]
})
export class Footer {
  protected readonly year: number = new Date().getFullYear();
  protected readonly version: string = '0.0.1';
}
