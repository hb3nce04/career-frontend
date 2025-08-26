import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService} from './core/services/theme.service';
import {ClassService} from './core/services/class.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('career-frontend');
  private themeService: ThemeService = inject(ThemeService);
  private classService: ClassService = inject(ClassService);

  // TODO: remove this
  ngOnInit(): void {
    this.themeService.onInit()
    this.classService.onInit();
  }
}
