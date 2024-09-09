import { Component } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColourResult, ShadesGeneratorService } from '../shades-generator.service';
import { NgFor, NgStyle } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-shades-generator',
  standalone: true,
  imports: [NgFor, NgStyle, FormsModule, ColorPickerModule],
  templateUrl: './shades-generator.component.html',
  styleUrl: './shades-generator.component.css'
})
export class ShadesGeneratorComponent {
  constructor(
    private shadesGeneratorService: ShadesGeneratorService,
  ) {
    this.swatches = this.shadesGeneratorService.shadesFromColour(
      this.color,
      this.colorName,
      parseInt(this.count),
    )
  }

  colorName: string = 'grey'
  color: string = '#1d1d26'
  count: string = '9'
  swatches: ColourResult[] = []

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

    this.swatches = result

    // todo: generate code samples for android xml, android compose, css rgb,hsl,hex
  }
}
