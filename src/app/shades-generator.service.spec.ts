import { TestBed } from '@angular/core/testing';
import Color from 'color';

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

      expect(result.length).toEqual(15)
      expect(first.hex).toEqual('#000000')
      expect(last.hex).toEqual('#FFFFFF')
    })

    it('should return a list of shades for a bright colour', () => {
      const input = '#ff3399' // tinacious pink
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)
      console.log(JSON.stringify(result, null, 2))

      expect(result.length).toEqual(15)
    })

    it('should return a list of shades for a dark colour', () => {
      const input = '#1d1d26' // night-time camping sky
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)
      console.log(JSON.stringify(result, null, 2))

      expect(result.length).toEqual(15)
    })

    it('should return a list of shades for a light colour', () => {
      const input = '#c8c8d5' // rainy day grey
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)

      expect(result.length).toEqual(15)
    })

    it('should return a list of shades for a medium colour', () => {
      const input = '#b3b3d4' // cool grey
      const prefix = 'grey'

      const result = service.shadesFromColour(input, prefix, 12)

      expect(result.length).toEqual(15)
    })
  })

  describe('_requiresTargetSwatch', () => {
    it('should return true', () => {
      const swatches = [
        Color('hsl(50,50%,90%)'),
        Color('hsl(50,50%,100%)'),
      ]

      const result = service._requiresTargetSwatch(swatches, 95, [90,100])

      expect(result).toBe(true)
    })

    it('should return false', () => {
      const swatches = [
        Color('hsl(50,50%,90%)'),
        Color('hsl(50,50%,95%)'),
        Color('hsl(50,50%,100%)'),
      ]

      const result = service._requiresTargetSwatch(swatches, 95, [90,100])

      expect(result).toBe(false)
    })
  })
});
