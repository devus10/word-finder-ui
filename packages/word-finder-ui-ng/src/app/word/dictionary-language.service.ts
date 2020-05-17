import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DictionaryLanguage} from './dictionary-language.dto';
import {EnvironmentService} from '../environment.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryLanguageService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient, private envService: EnvironmentService) { }

  getLanguages(): Observable<DictionaryLanguage[]> {
    return this.http.get<DictionaryLanguage[]>(`${this.envService.apiUrl}/dictionary-languages`);
  }
}
