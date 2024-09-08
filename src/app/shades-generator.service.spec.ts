import { TestBed } from '@angular/core/testing';

import { ShadesGeneratorService } from './shades-generator.service';

describe('ShadesGeneratorService', () => {
  let service: ShadesGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadesGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shadesFromColour', () => {
    it('should return a list of shades for a dark colour', () => {
      const input = '#1d1d26' // night-time camping sky

      const result = service.shadesFromColour(input, 12)
      console.log(JSON.stringify(result, null, 2))

      expect(result.length).toEqual(12)
    })

    it('should return a list of shades for a light colour', () => {
      const input = '#c8c8d5' // rainy day grey

      const result = service.shadesFromColour(input, 12)

      expect(result.length).toEqual(12)
    })

    it('should return a list of shades for a medium colour', () => {
      const input = '#b3b3d4' // cool grey

      const result = service.shadesFromColour(input, 12)

      expect(result.length).toEqual(12)
    })
  })
});
