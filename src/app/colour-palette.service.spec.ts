import { TestBed } from '@angular/core/testing';

import { ColourPaletteService } from './colour-palette.service';

describe('ColourPaletteService', () => {
  let service: ColourPaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColourPaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
