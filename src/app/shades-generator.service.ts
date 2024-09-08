import { Injectable } from '@angular/core';
import Color from 'color'

@Injectable({
  providedIn: 'root'
})
export class ShadesGeneratorService {

  constructor() { }

  shadesFromColour(colour: string, count: number): ColourResult[] {
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

    const padCount = Math.ceil((count / 100) * count) + 1

    console.log('pad count', padCount)

    return swatches.map((swatch, idx) => {
      return {
        name: `grey_${Math.floor((idx+1) * 100)}`,
        androidCompose: this.androidColourCompose(swatch.string()),
        hex: swatch.hex(),
        hsl: swatch.hsl().string(),
        rgb: swatch.rgb().string(),
      }
    })
  }

  androidColourCompose(colour: string): string {
    const hex = Color(colour).hex().replace('#', '')

    return `Color(0xFF${hex})`
  }
}

type ColourResult = {
  name: string
  androidCompose: string
  hex: string, rgb: string
  hsl: string
}



// var x = 0
// var y = 100
// var n = 18
// var diff = (y-x)/n

// var d = x
// for (var i=x; i < n; i++) {
//   d += diff;
//   console.log(d);
// }

/*
5.555555555555555
11.11111111111111
16.666666666666664
22.22222222222222
27.77777777777778
33.333333333333336
38.88888888888889
44.44444444444445
50.00000000000001
55.555555555555564
61.11111111111112
66.66666666666667
72.22222222222223
77.77777777777779
83.33333333333334
88.8888888888889
94.44444444444446
100.00000000000001
*/
