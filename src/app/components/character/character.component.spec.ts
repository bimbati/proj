import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;
  let routeSpy: any;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', [
      'getCharacterById', 'getComicsByCharacter', 'getSeriesByCharacter'
    ]);
    routeSpy = { paramMap: of({ get: () => '123' }) };
    await TestBed.configureTestingModule({
      imports: [CharacterComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchCharacterById without error', () => {
    apiServiceSpy.getCharacterById.and.returnValue(of({ data: { results: [{}] } }));
    apiServiceSpy.getComicsByCharacter.and.returnValue(of({ data: { results: [] } }));
    apiServiceSpy.getSeriesByCharacter.and.returnValue(of({ data: { results: [] } }));
    expect(() => component.fetchCharacterById('123')).not.toThrow();
  });
});
