import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LoadingService} from './core/services/loading.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressBar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('career-frontend');
  protected loadingService: LoadingService = inject(LoadingService);
}
