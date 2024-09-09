import { Injectable } from '@angular/core';
import Color from 'color'

@Injectable({
  providedIn: 'root'
})
export class ShadesGeneratorService {

  constructor() { }

  shadesFromColour(colour: string, prefix: string, count: number): ColourResult[] {
    const darkest = 0
    const lightest = 100
    const diff = (lightest - darkest) / (count+1)

    let currentLightness = darkest

    const base = Color(colour).hsl()
    const swatches: Color[] = []

    swatches.push(Color({
      ...base.object(),
      l: 0,
    }))

    for (let i = darkest; i <= Math.ceil(count); i++) {
      currentLightness += diff

      const swatch = Color(
        {
          ...base.object(),
          l: currentLightness,
        }
      )

      swatches.push(swatch)
    }


    return swatches.map((swatch, idx) => {
      console.log('lightness', swatch.hsl().lightness())
      const name = swatch.hsl().lightness() === 0 ? 'black' :
        Math.ceil(swatch.hsl().lightness()) >= 100 ? 'white' :
        `${prefix}_${Math.floor((idx) * 100)}`;

      return {
        name,
        androidCompose: this.androidColourCompose(swatch.string()),
        hex: swatch.hex(),
        hsl: swatch.hsl().string(),
        rgb: swatch.rgb().string(),
      }
    })
  }

  private androidColourCompose(colour: string): string {
    const hex = Color(colour).hex().replace('#', '')

    return `Color(0xFF${hex})`
  }
}

export type ColourResult = {
  name: string
  androidCompose: string
  hex: string
  rgb: string
  hsl: string
}
