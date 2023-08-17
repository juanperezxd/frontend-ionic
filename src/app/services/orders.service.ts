import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }
  
  saveOrder(data:any){
    return this.httpClient.post(environment.url + 'saveOrders', data ).pipe(map(res =>{
      return res;
    }))
  }

}