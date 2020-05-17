import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should render the page template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent.trim()).toEqual('Word finder');
    expect(compiled.querySelector('.subtitle').textContent.trim()).toEqual('Find your string in selected dictionary');
    expect(compiled.querySelector('footer').textContent.trim()).toEqual('© Pakisoft 2020');
  });
});
