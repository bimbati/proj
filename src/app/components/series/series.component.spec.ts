import { TestBed } from '@angular/core/testing';
import { SeriesComponent } from './series.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getSerie']);
    await TestBed.configureTestingModule({
      imports: [SeriesComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
    component = TestBed.createComponent(SeriesComponent).componentInstance;
    component.serieId.set('1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchSerie and set serie', () => {
    const mockSerie = {
      id: 1,
      title: 'Serie',
      thumbnail: { extension: '', path: '' },
      description: ''
    };
  apiServiceSpy.getSerie.and.returnValue(of({ data: { results: [mockSerie] } }));
  component.fetchSerie();
  expect(apiServiceSpy.getSerie).toHaveBeenCalledWith('1');
  expect(component.serie()).toEqual(mockSerie);
  expect(component.loading()).toBe(false);
  expect(component.error()).toBeNull();
  });
});
