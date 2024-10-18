import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [],
  template:'<button (click)="click" class="rounded-md p-1 mr-2 my-1 bg-green-900 mt-2"><ng-content></ng-content></button>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyButtonComponent {
  @Output() click = new EventEmitter();

}
