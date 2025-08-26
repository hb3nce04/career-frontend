import {Component, inject} from '@angular/core';
import {ClassService} from '../../../core/services/class.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: []
})
export class Home {
  protected classService: ClassService = inject(ClassService);
}
