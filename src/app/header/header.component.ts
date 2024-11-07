import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private authService: AuthService, private router: Router) {}


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
