import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './core/services/auth/auth.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(readonly authService: AuthService) {
    }
  title = 'encyclopedia-web';
}
