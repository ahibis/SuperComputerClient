import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { SolveEquationService } from '../servises/solve-equation.service';
import { EChartsOption } from 'echarts';
import { MyButtonComponent } from '../my-button/my-button.component';
import { MyInputComponent } from '../my-input/my-input.component';

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
    return this.resultSolving.length > 0;
  }
  get h() {
    const { L, N } = this.equationParams;
    if (!(L && N)) return 0;
    return L / (N - 1);
  }
  get tau() {
    const { l, p, c } = this.equationParams;
    if (!(l && p && c)) return 0;
    const a = l / (p * c);
    return this.h ** 2 / (4 * a);
  }
  get time() {
    // console.log("get time")
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
    return Math.ceil(this.time / this.tau);
  }
  get equationParams() {
    return this.SolveEquationService.equationParams;
  }
  get resultSolving() {
    return this.SolveEquationService.resultSolving;
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
    // console.log(this.equationParams.L, this.h)
    const data = this.resultSolving[this.timeStep];
    const xAxis = Array.from(new Array(N), (e, i) => this.h * i);
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
