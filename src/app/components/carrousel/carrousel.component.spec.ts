import { TestBed } from '@angular/core/testing';
import { CarrouselComponent } from './carrousel.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CarrouselComponent', () => {
  let component: CarrouselComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getComic']);
      await TestBed.configureTestingModule({
        imports: [CarrouselComponent],
        providers: [
          { provide: ApiRequestService, useValue: apiServiceSpy },
          { provide: ActivatedRoute, useValue: {} }
        ]
      }).compileComponents();
    component = TestBed.createComponent(CarrouselComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCharacters and update signals', () => {
    const mockCharacter = { id: 1, name: 'Hero', comics: { items: [] }, series: { items: [] } };
    apiServiceSpy.getComic.and.returnValue(of({ data: { results: [mockCharacter] } }));
    // Simula chamada para todos os heróis
    component['heroes'].forEach((id: number) => {
      component['getCharacters'](id);
    });
    expect(apiServiceSpy.getComic).toHaveBeenCalled();
    expect(component.characters().length).toBe(component['heroes'].length);
  });
});
