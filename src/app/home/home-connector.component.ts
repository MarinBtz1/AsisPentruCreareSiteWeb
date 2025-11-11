import { Component } from '@angular/core';
import { ContentComponent } from '../home/content/content';
import { HeaderComponent } from '../home/header/header';
import { FooterComponent } from '../home/footer/footer';

@Component({
  selector: 'app-home-connector',
  standalone: true,
    imports: [ContentComponent, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
    `,
})
export class HomeConnectorComponent { } 
