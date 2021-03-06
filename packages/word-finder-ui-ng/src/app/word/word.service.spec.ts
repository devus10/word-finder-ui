import {TestBed} from '@angular/core/testing';
import { WordService } from './word.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DictionaryLanguage} from './dictionary-language.dto';
import {EnvironmentService} from '../environment.service';

describe('WordService', () => {
  let service: WordService;
  let envService: EnvironmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordService, {provide: EnvironmentService, useClass: EnvironmentServiceStub}]
    });

    service = TestBed.inject(WordService);
    httpMock = TestBed.inject(HttpTestingController);
    envService = TestBed.inject(EnvironmentService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return word', () => {
    const response = {
      textString: 'word',
      existsInDictionary: true,
      dictionaryAnagrams: ['word']
    };

    service.getWord({code: 'en'} as DictionaryLanguage, 'word').subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://url/words/en:word');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  class EnvironmentServiceStub {

    _apiUrl = 'http://url';

    get apiUrl() {
      return this._apiUrl;
    }
  }
});
