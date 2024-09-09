import { TestBed } from '@angular/core/testing';

import { ShadesGeneratorService } from './shades-generator.service';

describe('ShadesGeneratorService', () => {
  let service: ShadesGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(ShadesGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shadesFromColour', () => {
    it('should return a list of shades where the first colour is black and the last colour is white', () => {
      const input = '#1d1d26' // night-time camping sky
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)
      const first = result[0]
      const last = result[result.length-1]

      expect(result.length).toEqual(14)
      expect(first.hex).toEqual('#000000')
      expect(last.hex).toEqual('#FFFFFF')
    })

    it('should return a list of shades for a dark colour', () => {
      const input = '#1d1d26' // night-time camping sky
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)
      console.log(JSON.stringify(result, null, 2))

      expect(result.length).toEqual(14)
    })

    it('should return a list of shades for a light colour', () => {
      const input = '#c8c8d5' // rainy day grey
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)

      expect(result.length).toEqual(14)
    })

    it('should return a list of shades for a medium colour', () => {
      const input = '#b3b3d4' // cool grey
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)

      expect(result.length).toEqual(14)
    })
  })
});
