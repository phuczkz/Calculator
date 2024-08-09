import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Calculator] Add',props<{ firstNumber: number; secondNumber: number }>()
);

export const subtract = createAction(
  '[Calculator] Subtract',props<{ firstNumber: number; secondNumber: number }>()
);

export const multiply = createAction(
  '[Calculator] Multiply',props<{ firstNumber: number; secondNumber: number }>()
);

export const divide = createAction(
  '[Calculator] Divide',props<{ firstNumber: number; secondNumber: number }>()
);

export const appendToInput = createAction(
  '[Calculator] Append To Input',props<{ value: string }>()
);

export const resetInput = createAction('[Calculator] reset');
