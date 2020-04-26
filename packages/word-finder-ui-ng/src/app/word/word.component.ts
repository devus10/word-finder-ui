import {Component} from '@angular/core';
import {Result} from './form/word-form.component';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html'
})
export class WordComponent {

  result: Result;

  getFormResult(result: Result) {
    console.log(result);
    this.result = result;
  }
}


