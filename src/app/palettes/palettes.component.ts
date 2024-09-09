import { Component } from '@angular/core';
import { ColourPalette, ColourPaletteService, EnhancedColourPalette } from '../colour-palette.service';
import { NgFor, NgStyle } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { IconTrashComponent } from '../icon-trash/icon-trash.component';

@Component({
  selector: 'app-palettes',
  standalone: true,
  imports: [NgFor, NgStyle, FormsModule, IconTrashComponent],
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
  defaultPalette: string = `{
  "name": "My New Colour Palette",
  "colours": [
    "#000",
    "#FFF",
    "#FF3399",
    "#33D5FF"
  ]
}
  `

  addPalette() {
    try {
      const parsedPalette = JSON.parse(this.defaultPalette)

      const paletteToAdd: ColourPalette = {
        name: parsedPalette.name,
        colours: parsedPalette.colours,
      }

      this.colourPaletteService.addPalette(paletteToAdd)
      this.loadPalettes()
    } catch (e) {
      alert('Error parsing palette definition')
    }
  }

  deletePaletteAtIndex(idx: number) {
    this.palettes.splice(idx, 1)
    this.colourPaletteService.setEnhancedPalettes(this.palettes)
  }

  private loadPalettes() {
    this.palettes = this.colourPaletteService.getPalettes()
  }
}
