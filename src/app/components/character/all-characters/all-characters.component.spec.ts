import { TestBed } from '@angular/core/testing';
import { AllCharactersComponent } from './all-characters.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AllCharactersComponent', () => {
  let component: AllCharactersComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getAllCharacters']);
    await TestBed.configureTestingModule({
      imports: [AllCharactersComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
    component = TestBed.createComponent(AllCharactersComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchCharacters and set characters', () => {
    const mockCharacters = [{
      id: 1,
      name: 'Hero',
      thumbnail: { extension: '', path: '' },
      modified: new Date(),
      description: ''
    }];
    apiServiceSpy.getAllCharacters.and.returnValue(of({ data: { results: mockCharacters } }));
    component.ngOnInit();
    expect(apiServiceSpy.getAllCharacters).toHaveBeenCalledWith(0);
    expect(component.characters()).toEqual(mockCharacters);
    expect(component.loading()).toBe(false);
    expect(component.error()).toBeNull();
  });
});
