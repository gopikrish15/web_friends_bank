import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootURL = environment.rootUrl;

  private currentUserSubject: BehaviorSubject<any>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient,
    private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')))
  }

  login(credObj: any) {
    const credentials = { "username": credObj.username, "password": credObj.password };
    return this.http.post(this.rootURL + '/user/login', credentials , this.httpOptions)
      .pipe(map(data => {        
        if (data && data['status'] == 200) {
          // let respData = JSON.parse(JSON.stringify(data));
          // console.log('-----------------loginnnnnnnn', respData.data.access_token);
          
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        } else {
          this.toastr.error('Login Failed')
        }
        this.currentUserSubject.next(null);
        return null;
      }));
  }

  public sendForgotPassword(paramsObj:any): Observable<any> {
    return this.http.get(environment.rootUrl + '/send-mail-resetpassword', { params: paramsObj });
  }

  /**
       * current user
       */
  public get currentUser() {
    return this.currentUserSubject.value;
  }

  updateUser(currentUser: any) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }
  /**
      * Logout the user
      */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    return this.http.post(this.rootURL + '/refreshToken', { "refresh_token": this.currentUser['refreshToken'] })
      .pipe(map(data => {
        if (data) {
          let currentUser = this.currentUser;
          currentUser.accessToken = data['accessToken'];
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          return data;
        }
        return null;
      }));
  }

  parseJwt(token: any) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

}
