import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './core/services/auth/auth.service';
import {AsyncPipe} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(readonly authService: AuthService) {
    }
  title = 'encyclopedia-web';
}
