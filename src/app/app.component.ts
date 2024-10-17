import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiagramComponent } from './diagram/diagram.component';
import { ParamsComponent } from './params/params.component';
import { SolveEquationService } from './servises/solve-equation.service';
import { EquationResult } from './types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DiagramComponent, ParamsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'SuperComputerClient';
  resultSolving$!: Observable<EquationResult>;

  constructor(private solveEquation:SolveEquationService){

  }
  ngOnInit(): void {
  }

}
