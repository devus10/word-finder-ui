import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Word} from './word.dto';
import {DictionaryLanguage} from './dictionary-language.dto';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWord(language: DictionaryLanguage, textString: string): Observable<Word> {
    return this.http.get<Word>(`${this.url}/words/${language.code}:${textString}`);
  }
}
