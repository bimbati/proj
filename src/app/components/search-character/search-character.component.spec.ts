import { TestBed } from '@angular/core/testing';
import { SearchCharacterComponent } from './search-character.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchCharacterComponent', () => {
  let component: SearchCharacterComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getCharacterByName']);
    await TestBed.configureTestingModule({
      imports: [SearchCharacterComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
    component = TestBed.createComponent(SearchCharacterComponent).componentInstance;
    component.searchTerm.set('Hero');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search and set character', () => {
    const mockCharacter = {
      id: 1,
      name: 'Hero',
      thumbnail: { extension: '', path: '' },
      modified: new Date(),
      description: ''
    };
  apiServiceSpy.getCharacterByName.and.returnValue(of({ data: { results: [mockCharacter] } }));
  component.search();
  expect(apiServiceSpy.getCharacterByName).toHaveBeenCalledWith('Hero');
  expect(component.character()).toEqual(mockCharacter);
  expect(component.loading()).toBe(false);
  expect(component.error()).toBeNull();
  });
});
