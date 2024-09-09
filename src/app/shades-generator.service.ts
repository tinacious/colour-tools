import { Injectable } from '@angular/core';
import Color from 'color'

@Injectable({
  providedIn: 'root'
})
export class ShadesGeneratorService {

  constructor() { }

  colourToHsl(colour: string): string {
    return Color(colour).hsl().string()
  }

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

    const transformedSwatches = swatches.map((swatch, idx) => {
      const name = swatch.hsl().lightness() === 0 ? 'black' :
        Math.ceil(swatch.hsl().lightness()) >= 100 ? 'white' :
        `${prefix}_${Math.floor((idx) * 100)}`;

      return {
        name,
        swatch,
        androidCompose: this.androidColourCompose(swatch.string()),
        hex: swatch.hex(),
        hsl: swatch.hsl().string(),
        rgb: swatch.rgb().string(),
      }
    })

    // Add a 95% lightness swatch if it doesn't exist
    if (this._requiresTargetSwatch(swatches, 95, [95, 100])) {
      const lastIndex = swatches.length - 1
      const secondLastIndex = lastIndex-1
      const secondLastItem = swatches[secondLastIndex]

      if (secondLastItem) {
        const newSwatch = Color({
          ...base.object(),
          l: 95,
        })

        transformedSwatches.splice(-1, 0, {
          name: `${prefix}_${(secondLastIndex * 100) + 50}`,
          swatch: newSwatch,
          androidCompose: this.androidColourCompose(newSwatch.string()),
          hex: newSwatch.hex(),
          hsl: newSwatch.hsl().string(),
          rgb: newSwatch.rgb().string(),
        })
      }
    }

    // Add a 5% lightness swatch if it doesn't exist
    if (this._requiresTargetSwatch(swatches, 5, [5, 10])) {
      const secondItem = swatches[1]

      if (secondItem) {
        const newSwatch = Color({
          ...base.object(),
          l: 5,
        })

        transformedSwatches.splice(1, 0, {
          name: `${prefix}_50`,
          swatch: newSwatch,
          androidCompose: this.androidColourCompose(newSwatch.string()),
          hex: newSwatch.hex(),
          hsl: newSwatch.hsl().string(),
          rgb: newSwatch.rgb().string(),
        })
      }
    }

    return transformedSwatches
  }

  private androidColourCompose(colour: string): string {
    const hex = Color(colour).hex().replace('#', '')

    return `Color(0xFF${hex})`
  }

  _requiresTargetSwatch(
    swatches: Color[],
    target: number,
    range: [number, number]
  ): boolean {
    const [start, end] = range

    const targetSwatch = swatches.find((swatch) => {
      const lightness = Math.ceil(swatch.lightness())

      if (lightness === target) return true

      if (!lightness || lightness >= 100) return false

      // For the light end
      if (lightness > target && lightness < end) {
        return true
      }

      // For the dark end
      if (lightness < target && lightness > start) {
        return true
      }

      return false
    })

    return !(!!targetSwatch)
  }
}

export type ColourResult = {
  name: string
  androidCompose: string
  hex: string
  rgb: string
  hsl: string
}
