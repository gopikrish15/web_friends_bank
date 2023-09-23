import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DebitService {
    resourceUrl: string = `${environment.rootUrl}`;

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    public createDebit(obj: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/debits`, obj)
    }
    public getAllDebits(obj: any,): Observable<any> {
        return this.http.get(`${this.resourceUrl}/debits`, { params: obj })
    }
    public getDebitById(id?: any): Observable<any> {
        return this.http.get(`${this.resourceUrl}/debits/${id}`)
    }
    public updateDebit(id: any, obj: any): Observable<any> {
		return this.http.put(`${this.resourceUrl}/debits/${id}`, obj)
	}
    public deleteDebits(id: any): Observable<any> {
		return this.http.delete(`${this.resourceUrl}/debits/${id}`)
	}

}
