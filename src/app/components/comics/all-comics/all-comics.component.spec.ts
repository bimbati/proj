import { TestBed } from '@angular/core/testing';
import { AllComicsComponent } from './all-comics.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AllComicsComponent', () => {
  let component: AllComicsComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getAllComics']);
    await TestBed.configureTestingModule({
      imports: [AllComicsComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
    component = TestBed.createComponent(AllComicsComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchComics and set comics', () => {
    const mockComics = [{
      id: 1,
      title: 'Comic',
      thumbnail: { extension: '', path: '' },
      modified: new Date(),
      prices: [],
      description: '',
      creators: { available: 0, items: [] },
      characters: { available: 0, items: [] }
    }];
    apiServiceSpy.getAllComics.and.returnValue(of({ data: { results: mockComics } }));
    component.ngOnInit();
    expect(apiServiceSpy.getAllComics).toHaveBeenCalledWith(0);
    expect(component.comics()).toEqual(mockComics);
    expect(component.loading()).toBe(false);
    expect(component.error()).toBeNull();
  });
});
