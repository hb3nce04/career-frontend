import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService} from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('career-frontend');
  private themeService: ThemeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.onInit()
  }
}
