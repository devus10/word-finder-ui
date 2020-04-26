import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DictionaryLanguage} from './dictionary-language.dto';

@Injectable({
  providedIn: 'root'
})
export class DictionaryLanguageService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<DictionaryLanguage[]> {
    return this.http.get<DictionaryLanguage[]>(`${this.url}/dictionary-languages`);
  }
}
