import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="absolute bottom-0">
      <span>Pályakövető rendszer ™</span>
      <span>Verziószám: {{ version }}</span>
      <span>© Minden jog fenntartva! {{ year }}</span>
    </footer>
  `,
  styles: `
    footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: var(--mat-sys-on-primary);
      color: var(--mat-sys-primary);
      text-align: center;
      line-height: 1.5rem;
      padding: 5px;

      span {
        display: block;
      }
    }
  `,
})
export class Footer {
  protected readonly year: number = new Date().getFullYear();
  protected readonly version: string = '0.0.1';
}
