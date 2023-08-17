import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }
  
  getProducts(page:string, category:string){
    return this.httpClient.get(environment.url + 'products?page=' + page + '&category=' + category ).pipe(map(res =>{
      return res;
    }))
  }

}
