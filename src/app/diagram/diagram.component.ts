import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { SolveEquationService } from '../servises/solve-equation.service';
import { EChartsOption } from 'echarts';
import { MyButtonComponent } from '../my-button/my-button.component';
import { MyInputComponent } from '../my-input/my-input.component';
import { EquationResult } from '../types';

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [
    CommonModule,
    NgxEchartsDirective,
    MyButtonComponent,
    MyInputComponent,
  ],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEcharts()],
})
export class DiagramComponent implements OnInit{
  constructor(private SolveEquationService: SolveEquationService) {}
  ngOnInit(): void {
  }
  timeSpeed = 0.2;
  _time = 0;
  get isInit() {
    return !!this.SolveEquationService.resultSolving;
  }
  get time() {
    return this._time;
  }
  set time(value: number) {
    const Tend = this.equationParams.Tend;
    if (!Tend) return;
    const newValue = value < 0 ? Tend : value % Tend;

    if (newValue !== this._time) {
        this._time = newValue;
    }
}
  get timeStep() {
    return Math.ceil(this.time / this.resultSolving.tau);
  }
  get equationParams() {
    return this.SolveEquationService.equationParams;
  }
  get resultSolving():EquationResult {
    return this.SolveEquationService.resultSolving || {
      data:[],
      tau:0.1,
      a:0.1,
      time:0,
      h:0.1
    };
  }
  nextStep() {
    this.time += this.timeSpeed;
  }
  prevStep() {
    this.time -= this.timeSpeed;
  }

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
        areaStyle: {},
      },
    ],
  };

  get merge(): EChartsOption {
    const { N } = this.equationParams;
    if (!(this.isInit && N)) {
      return {};
    }
    // console.log(this.equationParams.L)
    const data = this.resultSolving.data[this.timeStep];
    const xAxis = Array.from(new Array(N), (e, i) => this.resultSolving.h * i);
    return {
      xAxis: {
        data: xAxis,
      },
      series: [
        {
          data: data,
        },
      ],
    };
  }
}
