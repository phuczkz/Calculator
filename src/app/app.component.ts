import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalculatorState } from './ngrx/store/calculator.state';
import * as CalculatorActions from './ngrx/store/calculator.actions';
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Observable} from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule

  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';
  result$!: Observable<number>;
  inputString = '';

  constructor(private store: Store<{ calculator: CalculatorState }>) {
    this.store.select('calculator').subscribe(state => {
      this.inputString = state.inputString || '';
    });
    this.result$ = this.store.select(state => state.calculator.result)
  }

  appendToInput(value: string) {
    this.store.dispatch(CalculatorActions.appendToInput({ value }));
  }

  resetInput() {
    this.store.dispatch(CalculatorActions.resetInput());
  }

  calc() {
    const operatorMatch = this.inputString.match(/[\+\-\*\/]/);

    if (!operatorMatch) {
      console.error('No operator found in the input');
      return;
    }

    const operator = operatorMatch[0];
    const [leftString, rightString] = this.inputString.split(operator);

    const firstNum = parseFloat(leftString.trim());
    const secondNum = parseFloat(rightString.trim());

    if (isNaN(firstNum) || isNaN(secondNum)) {
      console.error('Invalid numbers in the input');
      return;
    }

    switch (operator) {
      case '+':
        this.store.dispatch(CalculatorActions.add({ firstNumber: firstNum, secondNumber: secondNum }));
        break;
      case '-':
        this.store.dispatch(CalculatorActions.subtract({ firstNumber: firstNum, secondNumber: secondNum }));
        break;
      case '*':
        this.store.dispatch(CalculatorActions.multiply({ firstNumber: firstNum, secondNumber: secondNum }));
        break;
      case '/':
        this.store.dispatch(CalculatorActions.divide({ firstNumber: firstNum, secondNumber: secondNum }));
        break;
    }
  }

}
