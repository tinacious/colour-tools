import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import Color from 'color';

@Injectable({
  providedIn: 'root'
})
export class ColourPaletteService {

  constructor(
    private storageService: StorageService,
  ) { }

  addPalette(palette: ColourPalette) {
    const palettes = this.getPalettes()
    palettes.push({
      name: palette.name,
      colours: palette.colours.map(c => Color(c))
    })
    this.setEnhancedPalettes(palettes)
  }

  setEnhancedPalettes(enhancedPalettes: EnhancedColourPalette[]) {
    const palettes = enhancedPalettes.map(({ name, colours }) => ({
      name,
      colours: colours.map(c => c.hex())
    }))

    this.setPalettes(palettes)
  }

  setPalettes(palettes: ColourPalette[]) {
    this.storageService.setItem('colour-palettes', palettes)
  }

  getPalettes(): EnhancedColourPalette[] {
    let storedPalettes = this.storageService.getItem<ColourPalette[] | null>('colour-palettes')
    if (!storedPalettes || !storedPalettes.length) {
      storedPalettes = [
        {
          name: 'Tinacious Design',
          colours: [
            '#ff3399',
            '#33d5ff',
            '#b3b3d4',
            '#00d364',
            '#cc66ff',
            '#ffcc66',
            '#00ced1',
            '#1d1d26',
            '#c8c8d5',
            '#ffaa00',
            // '#ff8936',
            '#ff365f',
            // '#ff5b36',
            // '#f1400f',
            '#f10f69',
          ]
        }
      ]
      this.storageService.setItem('colour-palettes', storedPalettes)
    }

    return (storedPalettes || []).map(({ name, colours }) => {
      return {
        name,
        colours: colours.map(c => Color(c))
      }
    })
  }
}

export type ColourPalette = {
  name: string
  colours: string[]
}

export type EnhancedColourPalette = {
  name: string
  colours: Color[]
}
