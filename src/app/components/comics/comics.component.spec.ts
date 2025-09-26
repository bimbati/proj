import { TestBed } from '@angular/core/testing';
import { ComicsComponent } from './comics.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComicsComponent', () => {
  let component: ComicsComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getComic']);
    await TestBed.configureTestingModule({
      imports: [ComicsComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
    component = TestBed.createComponent(ComicsComponent).componentInstance;
    component.comicId.set('1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchComic and set comic', () => {
    const mockComic = {
      id: 1,
      title: 'Comic',
      thumbnail: { extension: '', path: '' },
      modified: new Date(),
      prices: [],
      description: '',
      creators: { available: 0, items: [] },
      characters: { available: 0, items: [] }
    };
  apiServiceSpy.getComic.and.returnValue(of({ data: { results: [mockComic] } }));
  component.fetchComic();
  expect(apiServiceSpy.getComic).toHaveBeenCalledWith('1');
  expect(component.comic()).toEqual(mockComic);
  expect(component.loading()).toBe(false);
  expect(component.error()).toBeNull();
  });
});
