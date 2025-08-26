import {Component, inject} from '@angular/core';
import {ClassSelectorService} from '../../../core/services/class-selector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: []
})
export class Home {
  protected classSelectorService: ClassSelectorService = inject(ClassSelectorService);
}
