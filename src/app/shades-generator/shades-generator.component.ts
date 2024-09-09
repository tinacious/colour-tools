import { Component } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColourResult, ShadesGeneratorService } from '../shades-generator.service';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  ) {
    this.recalculateShades()
  }

  colorName: string = 'grey'
  color: string = '#1d1d26'
  colorAsHsl: string = ''
  count: string = '9'
  swatches: ColourResult[] = []
  defaultColorPalette: string[] = [
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
  }
}
