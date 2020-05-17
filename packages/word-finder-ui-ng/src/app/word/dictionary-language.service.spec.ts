import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DictionaryLanguageService} from './dictionary-language.service';
import {EnvironmentService} from '../environment.service';

describe('DictionaryLanguageService', () => {
  let service: DictionaryLanguageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DictionaryLanguageService, {provide: EnvironmentService, useClass: EnvironmentServiceStub}]
    });

    service = TestBed.inject(DictionaryLanguageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return dictionary languages', () => {
    const response = [
      {
        name: 'Polish',
        code: 'pl'
      }
    ];

    service.getLanguages().subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://url/dictionary-languages');
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
