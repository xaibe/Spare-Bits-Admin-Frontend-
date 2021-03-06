import { CanActivate, Router } from '@angular/router';

import { AuthService } from 'src/sdk/core/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate() { 
    const atoken='token';
    const token = await this.authService.getTokenFromStorage(atoken);
    if (token) {
     // this.router.navigateByUrl('/books');
    return false;
    } else {
      return true;
    }
  }
}
