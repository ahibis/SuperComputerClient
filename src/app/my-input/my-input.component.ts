import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {tap} from "rxjs"

@Component({
  selector: 'app-my-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-input.component.html',
  // styleUrl: './my-input.component.scss'
})
export class MyInputComponent {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  @Input() placeholder:string = "";
  @Input() name:string = "";
  @Input() type:string = "number"
  onValueChange(newValue: string) {
    const parsedValue = Number.parseFloat(newValue);
    if (parsedValue !== this.value) {
      this.value = parsedValue;
      this.valueChange.emit(parsedValue);
    }
  }
}
