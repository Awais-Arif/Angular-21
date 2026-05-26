import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private atuhService: NbAuthService, private router: Router){}
  canActivate(){
    return this.atuhService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      }),
    );
  }
}
