import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiRequestService } from './api-request.service';



describe('ApiRequestService', () => {
  let service: ApiRequestService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      TestBed.configureTestingModule({
        providers: [
          ApiRequestService,
          { provide: HttpClient, useValue: httpClientSpy },
        ],
      });
      service = TestBed.inject(ApiRequestService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('should call getAllCharacters', () => {
      service.getAllCharacters(0);
      expect(httpClientSpy.get).toHaveBeenCalled();
    });

    it('should call getCharacterById', () => {
      service.getCharacterById('123');
      expect(httpClientSpy.get).toHaveBeenCalled();
    });

    it('should call getComicsByCharacter', () => {
      service.getComicsByCharacter('123');
      expect(httpClientSpy.get).toHaveBeenCalled();
    });

    it('should call getSeriesByCharacter', () => {
      service.getSeriesByCharacter('123');
      expect(httpClientSpy.get).toHaveBeenCalled();
    });
});
