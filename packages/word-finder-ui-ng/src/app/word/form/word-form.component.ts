import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Word} from '../word.dto';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {WordService} from '../word.service';
import {DictionaryLanguageService} from '../dictionary-language.service';
import {DictionaryLanguage} from '../dictionary-language.dto';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html'
})
export class WordFormComponent implements OnInit {

  @Output()
  resultEmitter = new EventEmitter<Result>();
  dictionaryLanguages: DictionaryLanguage[];
  wordForm = this.fb.group({
    textString: ['', [Validators.required, emptyStringValidator()]],
    dictionaryLanguage: ['', Validators.required]
  });

  constructor(private wordService: WordService, private languageService: DictionaryLanguageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe((languages: DictionaryLanguage[]) => {
      this.dictionaryLanguages = languages;
      this.setDefaultDictionaryValueInSelect(languages);
    });
  }

  onSubmit(): void {
    const selectedLanguage: DictionaryLanguage = this.wordForm.value.dictionaryLanguage;
    this.wordService.getWord(selectedLanguage, this.wordForm.value.textString).subscribe((word: Word) => {
      this.resultEmitter.emit(new Result(word, selectedLanguage.name));
    });
  }

  formHasEmptyStringError(): boolean {
    return this.wordForm.controls.textString.errors?.emptyString && this.wordForm.dirty;
  }

  private setDefaultDictionaryValueInSelect(languages: DictionaryLanguage[]): void {
    this.wordForm.patchValue({
      dictionaryLanguage: languages[0],
    });
  }
}

function emptyStringValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isEmptyString: boolean = control.value.trim().length === 0;
    return isEmptyString ? {emptyString: {value: control.value}} : null;
  };
}

export class Result {
  word: Word;
  selectedLanguage: string;

  constructor(word: Word, selectedLanguage: string) {
    this.word = word;
    this.selectedLanguage = selectedLanguage;
  }
}
