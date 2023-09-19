import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // if (!request || !request.url) {
        //     console.log('-----------tessssssssss', request.url);
            
        //     return next.handle(request);
        // }

        let authReq = request;
        let accessToken;

        let currentUser = this.authService.currentUser
		if(currentUser){
			const accessToken = currentUser.data.access_token;

			if (accessToken) {
				request = request.clone({
					setHeaders: {
						Authorization: `Bearer ${accessToken}`
					}
				});
                authReq = this.addTokenHeader(request, accessToken);
			}
		}
        

        // const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        // if (currentUser && currentUser.data.access_token) {
        //     accessToken = currentUser.data.access_token;
        // }

        // if (accessToken != null) {
        //     console.log('--------------accessToken', accessToken);
            
            
        // }

        return next.handle(authReq).pipe(catchError(error => {
			if (error instanceof HttpErrorResponse
                && !authReq.url.includes('/login') && error.status === 401) {
                return this.handle401Error(authReq, next);
            }
            return throwError(error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const user = this.authService.currentUser;
            if (user && user.data.refresh_token)
                return this.authService.refreshToken().pipe(
                    switchMap((tokenData: any) => {
                       
                        this.isRefreshing = false;
                        this.refreshTokenSubject.next(tokenData.data.access_token);

                        return next.handle(this.addTokenHeader(request, tokenData.data.access_token));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this.authService.logout();
                        return throwError(err);
                    })
                );
        }
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            withCredentials: true,
            setHeaders: {
                'Authorization': `Bearer ${token}`,
				'Cache-Control': 'no-cache',
        		'Pragma': 'no-cache',
            }
        });
    }
}
