import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CustomerData } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  customerData:BehaviorSubject<any> = new BehaviorSubject('');

  public Data(): Observable<any>{
    return this.customerData.asObservable();
  }
  
  constructor(private http: HttpClient) {}

  public getCustomerData():Observable<any>{
    return this.http.get<any>('assets/customerData.json')
  }
}
