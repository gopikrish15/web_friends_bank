import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    resourceUrl: string = `${environment.rootUrl}`;

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    public createTransaction(obj: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/transactions`, obj)
    }
    public getAllTransactions(obj: any,): Observable<any> {
        return this.http.get(`${this.resourceUrl}/transactions`, { params: obj })
    }
    public getTransactionById(id?: any): Observable<any> {
        return this.http.get(`${this.resourceUrl}/transactions/${id}`)
    }
    public updateTransaction(id: any, obj: any): Observable<any> {
		return this.http.put(`${this.resourceUrl}/transactions/${id}`, obj)
	}
    public deleteTransactions(id: any): Observable<any> {
		return this.http.delete(`${this.resourceUrl}/transactions/${id}`)
	}

}
