import { Component } from '@angular/core';
import { ColourPalette, ColourPaletteService, EnhancedColourPalette } from '../colour-palette.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-palettes',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './palettes.component.html',
  styleUrl: './palettes.component.css'
})
export class PalettesComponent {
  constructor(
    private colourPaletteService: ColourPaletteService
  ) {
    this.loadPalettes()
  }

  palettes: EnhancedColourPalette[] = []

  private loadPalettes() {
    this.palettes = this.colourPaletteService.getPalettes()
  }
}
