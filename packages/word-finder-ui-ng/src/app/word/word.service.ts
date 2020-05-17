import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Word} from './word.dto';
import {DictionaryLanguage} from './dictionary-language.dto';
import {EnvironmentService} from '../environment.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient, private env: EnvironmentService) { }

  getWord(language: DictionaryLanguage, textString: string): Observable<Word> {
    console.log(this.env.apiUrl);
    return this.http.get<Word>(`${this.env.apiUrl}/words/${language.code}:${textString}`);
  }
}
