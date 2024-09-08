import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'colour-tools';

  mobileNavOpen = false

  openNav() {
    this.mobileNavOpen = true
  }

  closeNav() {
    this.mobileNavOpen = true
  }

  toggleNav() {
    this.mobileNavOpen = !this.mobileNavOpen
  }
}
