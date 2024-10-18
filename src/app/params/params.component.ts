import { FormsModule } from '@angular/forms';
import { SolveEquationService } from './../servises/solve-equation.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MyButtonComponent } from '../my-button/my-button.component';
import { MyInputComponent } from '../my-input/my-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-params',
  standalone: true,
  imports: [CommonModule, FormsModule, MyButtonComponent, MyInputComponent],
  templateUrl: './params.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  // styleUrl: './params.component.scss',
})
export class ParamsComponent {
  inputParams = [
    {
      name: 'N',
      placeholder: 'Количество точек, N',
      value: 100,
    },
    {
      name: 'Tend',
      placeholder: 'Время расчета, Tend',
      value: 60,
    },
    {
      name: 'L',
      placeholder: 'Длина стержня, L',
      value: 0.1,
    },
    {
      name: 'T',
      placeholder: 'Температура на границе, T',
      value: 300,
    },
    {
      name: 'p',
      placeholder: 'Плотность тела, 𝜌',
      value: 7800,
    },
    {
      name: 'c',
      placeholder: 'Удельная теплоемкость, c',
      value: 460,
    },
    {
      name: 'l',
      placeholder: 'Теплопроводность материала, λ',
      value: 46,
    },
  ];
  get inputValues() {
    return Object.fromEntries(
      this.inputParams.map(({ name, value }) => [name, value])
    );
  }
  get count(){
    console.log("count change")
    return 0;
  }
  solve() {
    console.log(this.inputParams);
    this.SolveEquationService.solveEquation(this.inputValues).subscribe();
  }
  constructor(private SolveEquationService: SolveEquationService) {}
}
