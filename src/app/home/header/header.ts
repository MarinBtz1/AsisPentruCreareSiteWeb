import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  readonly navLinks = [
    { label: 'Acasă', path: '/' },
    { label: 'Catalog', path: '/list' },
    { label: 'Despre', path: '/about' }
  ];
}
