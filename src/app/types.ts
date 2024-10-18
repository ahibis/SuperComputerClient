export interface EquationParams{
  T?:number,
  p?:number,
  c?:number,
  l?:number,
  L?:number,
  N?:number,
  Tend?:number
}

export type EquationResult = {
  data:number[][],
  a:number,
  h:number,
  tau:number,
  time:number
}
