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
      colours: palette.colours.map(c => ({
        name: c.name,
        colour: c.colour,
        colourObject: Color(c.colour),
      }))
    })
    this.setEnhancedPalettes(palettes)
  }

  setEnhancedPalettes(enhancedPalettes: EnhancedColourPalette[]) {
    const palettes: ColourPalette[] = enhancedPalettes.map(({ name, colours }) => ({
      name,
      colours: colours.map(c => ({
        name: c.name,
        colour: c.colour,
      }))
    }))

    this.setPalettes(palettes)
  }

  setPalettes(palettes: ColourPalette[]) {
    this.storageService.setItem('colour-palettes.v2', palettes)
  }

  getPalettes(): EnhancedColourPalette[] {
    let storedPalettes = this.storageService.getItem<ColourPalette[] | null>('colour-palettes.v2')
    if (!storedPalettes || !storedPalettes.length) {
      storedPalettes = [
        {
          name: 'Tinacious Design',
          colours: [
            { name: 'pink', colour: '#ff3399' },
            { name: 'blue', colour: '#33d5ff' },
            { name: 'grey', colour: '#b3b3d4' },
            { name: 'green', colour: '#00d364' },
            { name: 'purple', colour: '#cc66ff' },
            { name: 'yellow', colour: '#ffcc66' },
            { name: 'blue', colour: '#00ced1' },
            { name: 'midnight-sky', colour: '#1d1d26' },
            { name: 'overcast-sky', colour: '#c8c8d5' },
            { name: 'tangerine', colour: '#ffaa00' },
            { name: 'red', colour: '#f10f69' },
          ]
        }
      ]
      this.storageService.setItem('colour-palettes.v2', storedPalettes)
    }

    return (storedPalettes || []).map(({ name, colours }) => {
      return {
        name,
        colours: colours.map(c => ({
          name: c.name,
          colour: c.colour,
          colourObject: Color(c.colour)
        }))
      }
    })
  }
}

export type ColourDefinition = {
  name: string
  colour: string
}

export type EnhancedColourDefinition = ColourDefinition & {
  colourObject: Color
}

export type ColourPalette = {
  name: string
  colours: ColourDefinition[]
}

export type EnhancedColourPalette = {
  name: string
  colours: EnhancedColourDefinition[]
}
