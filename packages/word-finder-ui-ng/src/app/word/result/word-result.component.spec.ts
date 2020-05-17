import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WordResultComponent} from './word-result.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('WordResultComponent', () => {
  let component: WordResultComponent;
  let fixture: ComponentFixture<WordResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordResultComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordResultComponent);
    component = fixture.componentInstance;
  });

  it('should display the result when the word exists in dictionary and has anagrams', () => {
    component.formResult = {
      word: {
        textString: 'word',
        existsInDictionary: true,
        dictionaryAnagrams: ['word']
      },
      selectedLanguage: 'Polish'
    };
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toEqual(`String 'word' exists in Polish dictionary. Anagrams: word`);
  });

  it('should display the result when the word does not exist in dictionary and has no anagrams', () => {
    component.formResult = {
      word: {
        textString: 'word',
        existsInDictionary: false,
        dictionaryAnagrams: []
      },
      selectedLanguage: 'Polish'
    };
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toEqual(`String 'word' does not exist in Polish dictionary. No anagrams found.`);
  });
});
