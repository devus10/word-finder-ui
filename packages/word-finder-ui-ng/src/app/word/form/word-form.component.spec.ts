import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Result, WordFormComponent} from './word-form.component';
import {Word} from '../word.dto';
import {Observable} from 'rxjs';
import {DictionaryLanguage} from '../dictionary-language.dto';
import {WordService} from '../word.service';
import {DictionaryLanguageService} from '../dictionary-language.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('WordFormComponent', () => {
  let component: WordFormComponent;
  let fixture: ComponentFixture<WordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [WordFormComponent],
      providers: [
        {provide: WordService, useClass: WordServiceStub},
        {provide: DictionaryLanguageService, useClass: DictionaryLanguageServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve dictionary languages and set first element as selected in the form', () => {
    expect(component.dictionaryLanguages).toEqual([
      {name: 'Polish', code: 'pl'},
      {name: 'English', code: 'en'}
    ]);
    expect(component.wordForm.value.dictionaryLanguage).toEqual({name: 'Polish', code: 'pl'});
  });

  it('should test word form validity', () => {
    const form = component.wordForm;
    const textStringInput = form.controls.textString;
    const languageInput = form.controls.dictionaryLanguage;
    // empty textString, dictionaryLanguage default from ngOnInit
    expect(form.valid).toBeFalsy();

    // textString with white-spaces, dictionaryLanguage default from ngOnInit
    textStringInput.setValue('   ');
    expect(form.valid).toBeFalsy();

    // textString with text, dictionaryLanguage default from ngOnInit
    textStringInput.setValue('word');
    expect(form.valid).toBeTruthy();

    // textString with text, dictionaryLanguage set to null
    textStringInput.setValue('word');
    languageInput.setValue(null);
    expect(form.valid).toBeFalsy();
  });

  it('formHasEmptyStringError test', () => {
    component.wordForm.markAsDirty();
    expect(component.formHasEmptyStringError()).toBeTruthy();
  });

  it('onSubmit test', () => {
    component.wordForm.controls.dictionaryLanguage.setValue({name: 'English', code: 'en'});
    spyOn(component.resultEmitter, 'emit').and.callThrough();

    component.onSubmit();

    expect(component.resultEmitter.emit).toHaveBeenCalledWith(new Result({
        textString: 'word',
        existsInDictionary: true,
        dictionaryAnagrams: ['word']
      }, 'English'
    ));
  });

  class WordServiceStub {
    getWord(): Observable<Word> {
      return new Observable<Word>(subscriber => {
        subscriber.next({
          textString: 'word',
          existsInDictionary: true,
          dictionaryAnagrams: ['word']
        });
        subscriber.complete();
      });
    }
  }

  class DictionaryLanguageServiceStub {
    getLanguages(): Observable<DictionaryLanguage[]> {
      return new Observable<DictionaryLanguage[]>(subscriber => {
          subscriber.next([
              {name: 'Polish', code: 'pl'},
              {name: 'English', code: 'en'}
            ]
          );
          subscriber.complete();
        }
      );
    }
  }
});
