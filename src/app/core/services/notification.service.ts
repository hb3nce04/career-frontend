import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  open(message: string) {
    const duration = Math.min(Math.max(message.length * 100, 2000), 5000);
    this.snackBar.open(message, undefined, {
      horizontalPosition: "right",
      duration: duration
    })
  }
}
