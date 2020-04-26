import { NgModule } from '@angular/core';
import {WordComponent} from './word.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {WordFormComponent} from './form/word-form.component';
import {WordResultComponent} from './result/word-result.component';


@NgModule({
  declarations: [
    WordComponent,
    WordFormComponent,
    WordResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    WordComponent
  ]
})
export class WordModule { }
