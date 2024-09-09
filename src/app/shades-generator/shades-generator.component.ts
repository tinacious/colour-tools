import { Component } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColourResult, ShadesGeneratorService } from '../shades-generator.service';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColourPaletteService, EnhancedColourPalette } from '../colour-palette.service';

@Component({
  selector: 'app-shades-generator',
  standalone: true,
  imports: [NgFor, NgClass, NgStyle, FormsModule, ColorPickerModule],
  templateUrl: './shades-generator.component.html',
  styleUrl: './shades-generator.component.css'
})
export class ShadesGeneratorComponent {
  constructor(
    private shadesGeneratorService: ShadesGeneratorService,
    private colourPaletteService: ColourPaletteService,
  ) {
    this.recalculateShades()
    this.palettes = this.colourPaletteService.getPalettes()
  }

  colorName: string = 'grey'
  color: string = '#1d1d26'
  colorAsHsl: string = ''
  count: string = '9'
  swatches: ColourResult[] = []
  palettes: EnhancedColourPalette[] = []
  codez: {
    name: string
    code: string
  }[] = []

  setColor(color: string) {
    this.color = color
    this.recalculateShades()
  }

  setColorName(evt: Event) {
    const newValue = (evt?.target as HTMLInputElement)?.value as string | null

    if (newValue) {
      this.colorName = newValue
      this.recalculateShades()
    }
  }

  setCount(evt: Event) {
    const newValue = (evt?.target as HTMLInputElement)?.value as string | null

    if (newValue) {
      this.count = newValue
      this.recalculateShades()
    }
  }

  recalculateShades() {
    const result = this.shadesGeneratorService.shadesFromColour(
      this.color,
      this.colorName,
      parseInt(this.count),
    )

    this.colorAsHsl = this.shadesGeneratorService.colourToHsl(this.color)
    this.swatches = result

    // todo: generate code samples for android xml, android compose, css rgb,hsl,hex
    this.codez = []

    // Generate CSS code (hex)
    const cssCodeHex = [':root {']
    this.swatches.forEach((swatch) => {
      cssCodeHex.push(`  --${swatch.name}: ${swatch.hex};`)
    })
    cssCodeHex.push('}')

    this.codez.push({
      name: 'CSS (hex)',
      code: cssCodeHex.join('\n'),
    })

    // Generate CSS code (hsl)
    const cssCodeHsl = [':root {']
    this.swatches.forEach((swatch) => {
      cssCodeHsl.push(`  --${swatch.name}: ${swatch.hsl};`)
    })
    cssCodeHsl.push('}')

    this.codez.push({
      name: 'CSS (HSL)',
      code: cssCodeHsl.join('\n'),
    })

    // Generate CSS code for SASS (SCSS)
    const scssCode: string[] = []
    this.swatches.forEach((swatch) => {
      scssCode.push('$' + swatch.name + `: ${swatch.hex};`)
    })
    this.codez.push({
      name: 'Sass (SCSS)',
      code: scssCode.join('\n'),
    })

    // Generate code for Android (XML)
    const androidXmlCode: string[] = []
    this.swatches.forEach((swatch) => {
      androidXmlCode.push(`<color name="${swatch.name}">${swatch.hex}</color>`)
    })
    this.codez.push({
      name: 'Android (XML)',
      code: androidXmlCode.join('\n'),
    })

    // Generate code for Android (Jetpack Compose)
    const androidComposeCode: string[] = [
      'object Shades {'
    ]
    this.swatches.forEach((swatch) => {
      androidComposeCode.push(`    val ${swatch.name} = Color(0xFF${swatch.hex.toUpperCase().replace('#', '')})`)
    })
    androidComposeCode.push('}')
    this.codez.push({
      name: 'Android (Jetpack Compose)',
      code: androidComposeCode.join('\n'),
    })

  }
}
