import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquationParams, EquationResult } from '../types';
import {BehaviorSubject, tap} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SolveEquationService {
  resultSolving = new BehaviorSubject<EquationResult|undefined>({data:[],h:0,tau:0,time:0,a:0});
  equationParams:EquationParams = {}

  constructor(private http:HttpClient) {}

  solveEquation(params:EquationParams){
    this.equationParams = params;
    return this.http.get<EquationResult>("http://localhost:8080/wave",{
      params:params as {[key:string]:number}
    }).pipe(
      tap(value=>this.resultSolving.next(value))
    )
  }
}
