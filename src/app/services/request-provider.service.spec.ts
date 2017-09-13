import { TestBed, inject } from '@angular/core/testing';
import { RequestProviderService } from './request-provider.service';

describe('RequestProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestProviderService]
    });
  });

  it('should ...', inject([RequestProviderService], (service: RequestProviderService) => {
    expect(service).toBeTruthy();
  }));
});
