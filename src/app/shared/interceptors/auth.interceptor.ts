import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		let currentUser = this.authService.currentUser
		if(currentUser){
			const token = currentUser.data.access_token;
			if (token) {
				request = request.clone({
					setHeaders: {
						Authorization: `Bearer ${token}`
					}
				});
			}
		}
		return next.handle(request)
	}
}
