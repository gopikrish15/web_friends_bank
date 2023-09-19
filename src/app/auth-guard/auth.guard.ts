import { ActivatedRoute, } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        return new Promise(async (resolve, reject) => {
            try {
                const currentUser = this.authService.currentUser;
                if (currentUser) {
                    console.log('--------------userrrrrrrrrrr', currentUser);
                    
                    return resolve(true);
                } else {
                    this.router.navigate(['/login']);
                    return resolve(false);
                }
            } catch (error) {
                return reject('error' + error);
            }
        });
    }
}




