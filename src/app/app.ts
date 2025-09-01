import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService} from './core/services/theme.service';
import {ClassSelectorService} from './core/services/class-selector.service';

// TODO: frissítés csak akkor, ha tényleges módosítás történt
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('career-frontend');
  private themeService: ThemeService = inject(ThemeService);
  private classSelectorService: ClassSelectorService = inject(ClassSelectorService);

  // TODO: remove this
  ngOnInit(): void {
    this.themeService.onInit()
    this.classSelectorService.onInit();
  }
}
