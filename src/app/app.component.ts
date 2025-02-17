import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Final170225';
  
  authService = inject(AuthService);
  singOut(){
    this.authService.logout();
  }

  isAdmin()
  {
    return this.authService.isAdmin();
  }

  getUserUserName(){
    this.authService.getUserUserName();
  }

}
