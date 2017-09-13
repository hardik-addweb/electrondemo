import { Injectable } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
// import { LoaderService } from "./loader/loader.service";
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';


@Injectable()
export class RequestProviderService {

  public instance:any;
  public api_endpoint:any;
  constructor(public http: Http,private slimLoadingBarService: SlimLoadingBarService) {
    this.instance='http://hkdemo.addwebprojects.com/';
    //this.instance='http://localhost/orderPointAdmin/public/index.php/';
  	  this.api_endpoint="api/hkapi/";
   }

   /*Function for actually fetching records from API using GET method*/
  get(api){
    // this.loaderService.show();
    this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    let url= this.instance+this.api_endpoint+api;
    //let body = JSON.stringify(data);
    //let headers = new Headers({ "Content-Type": "application/json"});
    //let options = new RequestOptions({ headers: headers });

    return new Promise((resolve,reject) => {
      //this.http.get(url,data,options)
      this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        resolve(data);
        // this.loaderService.hide();
        this.slimLoadingBarService.complete();
      },function(error) {
        console.log("Error happened" + error);
        resolve(error);
        // this.loaderService.hide();
        this.slimLoadingBarService.complete();
      });
    });
  }

  /*Function for actually submitting records to API using POST method*/
  set(api,data){
    this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
   let url= this.instance+this.api_endpoint+api;
   let headers = new Headers({ "Content-Type": "application/json"});
   let options = new RequestOptions({ headers: headers });

   console.log('url',url);
   console.log('data',data);

   return new Promise((resolve,reject) => {
    this.http.post(url,data,options)
    .map(res => res.json())
    .subscribe(data=>{
      this.slimLoadingBarService.complete();
      console.log(data);
      resolve(data);

    },function(error) {
      this.slimLoadingBarService.complete();
       console.log("Error happened" + error);
       reject(error);
     });
   });
  }

}
