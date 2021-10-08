import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  /*function for calling get Apis's*/
  get(url) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json')
    headers = headers.append('content-type', 'application/x-www-form-urlencoded')
    const finalUrl = 'https://corona.lmao.ninja/v2/countries/India, Nepal, Bangladesh, Pakistan, Bhutan, Sri Lanka,Maldives?yesterday';
    return this.http.get<any[]>(finalUrl, { 'headers': headers }).pipe(
      map((data) => {
        //You can perform some transformation here
        return data;
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )
  }

}
