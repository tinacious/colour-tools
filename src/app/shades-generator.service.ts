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
    const diff = (lightest - darkest) / count

    let currentLightness = darkest

    const base = Color(colour).hsl()
    const lightness = base.lightness()

    const swatches: Color[] = []

    for (let i = darkest; i < Math.ceil(count); i++) {
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
      return {
        name: `${prefix}_${Math.floor((idx+1) * 100)}`,
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
