import { TestBed } from '@angular/core/testing';
import { AllSeriesComponent } from './all-series.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { of } from 'rxjs';

describe('AllSeriesComponent', () => {
  let component: AllSeriesComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiRequestService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiRequestService', ['getAllSeries']);
    await TestBed.configureTestingModule({
      imports: [AllSeriesComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiRequestService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
    component = TestBed.createComponent(AllSeriesComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchSeries and set series', () => {
    const mockSeries = [{
      id: 1,
      title: 'Series',
      thumbnail: { extension: '', path: '' },
      description: ''
    }];
    apiServiceSpy.getAllSeries.and.returnValue(of({ data: { results: mockSeries } }));
    component.ngOnInit();
    expect(apiServiceSpy.getAllSeries).toHaveBeenCalledWith(0);
    expect(component.series()).toEqual(mockSeries);
    expect(component.loading()).toBe(false);
    expect(component.error()).toBeNull();
  });
});
