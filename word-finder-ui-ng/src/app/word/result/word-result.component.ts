import {Component, Input} from '@angular/core';
import {Result} from '../form/word-form.component';

@Component({
  selector: 'app-word-result',
  templateUrl: './word-result.component.html',
  styleUrls: ['./word-result.component.scss']
})
export class WordResultComponent {

  @Input()
  formResult: Result;

  formattedAnagrams() {
    return this.formResult.word.dictionaryAnagrams
      .map(s => ' ' + s);
  }

  wordHasAnagrams(): boolean {
    return this.formResult.word.dictionaryAnagrams?.length > 0;
  }
}
