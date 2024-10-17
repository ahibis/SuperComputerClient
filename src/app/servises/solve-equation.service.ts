import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquationParams, EquationResult } from '../types';
import {tap} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SolveEquationService {
  resultSolving:EquationResult = [];
  equationParams:EquationParams = {}

  constructor(private http:HttpClient) {}

  solveEquation(params:EquationParams){
    this.equationParams = params;
    return this.http.get<EquationResult>("http://localhost:8080/wave",{
      params:params as {[key:string]:number}
    }).pipe(
      tap(value=>this.resultSolving = value)
    )
  }
}
