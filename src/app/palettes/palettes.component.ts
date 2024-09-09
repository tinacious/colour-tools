import { Component } from '@angular/core';
import { ColourPalette, ColourPaletteService, EnhancedColourPalette } from '../colour-palette.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { IconTrashComponent } from '../icon-trash/icon-trash.component';
import { ClipboardService } from '../clipboard.service';
import Color from 'color';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-palettes',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, FormsModule, IconTrashComponent],
  templateUrl: './palettes.component.html',
  styleUrl: './palettes.component.css'
})
export class PalettesComponent {
  constructor(
    private colourPaletteService: ColourPaletteService,
    private clipboardService: ClipboardService,
    private storageService: StorageService,
  ) {
    this.loadPalettes()
    this.copyMode = this.storageService.getItem('copy-mode') || 'hex'
  }

  copyMode: CopyMode = 'hex'
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

  changeMode(mode: CopyMode) {
    this.copyMode = mode
    this.storageService.setItem('copy-mode', mode)
  }

  deletePaletteAtIndex(idx: number) {
    this.palettes.splice(idx, 1)
    this.colourPaletteService.setEnhancedPalettes(this.palettes)
  }

  copyColour(swatch: Color) {
    switch (this.copyMode) {
      case 'hex':
        return this.clipboardService.copyText(swatch.hex(), () => { })
      case 'hsl':
        return this.clipboardService.copyText(swatch.hsl().round().string(), () => { })
      case 'rgb':
        return this.clipboardService.copyText(swatch.rgb().string(), () => { })
      case 'android_compose':
        return this.clipboardService.copyText(`Color(0xFF${swatch.hex().replace('#', '')})`, () => { })
    }
  }

  private loadPalettes() {
    this.palettes = this.colourPaletteService.getPalettes()
  }
}

type CopyMode = 'hex' | 'hsl' | 'rgb' | 'android_compose'
