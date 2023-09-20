import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    resourceUrl: string = `${environment.rootUrl}`;

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    public createMembers(obj: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/members`, obj)
    }
    public getMembers(obj: any,): Observable<any> {
        return this.http.get(`${this.resourceUrl}/members`, { params: obj })
    }
    public getMembersById(id?: any): Observable<any> {
        return this.http.get(`${this.resourceUrl}/members/${id}`)
    }
    public updateMembers(id: any, obj: any): Observable<any> {
		return this.http.put(`${this.resourceUrl}/members/${id}`, obj)
	}

}
