import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WordComponent} from './word.component';
import {By} from '@angular/platform-browser';
import {Result} from './form/word-form.component';
import {Component, DebugElement, EventEmitter, Input, Output} from '@angular/core';

describe('WordComponent', () => {
  let component: WordComponent;
  let fixture: ComponentFixture<WordComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordComponent, MockWordForm, MockWordResult],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should get the result from the word form component and propagate it to the word result component', () => {
    spyOn(component, 'getFormResult').and.callThrough();
    const wordFormComponent: MockWordForm = de.query(By.directive(MockWordForm)).componentInstance;
    wordFormComponent.resultEmitter.emit(formResult);
    fixture.detectChanges();
    const wordResultComponent: MockWordResult = de.query(By.directive(MockWordResult)).componentInstance;

    expect(component.getFormResult).toHaveBeenCalledWith(formResult);
    expect(wordResultComponent.formResult).toEqual(formResult);
  });

  const formResult = new Result({
      textString: 'word',
      existsInDictionary: true,
      dictionaryAnagrams: ['word']
    }, 'Polish'
  );

  @Component({
    selector: 'app-word-form',
    template: '<p>Mock word form</p>'
  })
  class MockWordForm {
    @Output()
    resultEmitter = new EventEmitter<Result>();
  }

  @Component({
    selector: 'app-word-result',
    template: '<p>Mock word result</p>'
  })
  class MockWordResult {
    @Input()
    formResult: Result;
  }
});
