import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  dropdowns:any = {
    notifications: false,
    shortcuts: false,
    profile: false
  };

  toggleDropdown(dropdown: string) {
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
  }
}
