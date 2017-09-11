import {OnInit, ViewChild, ViewChildren, Component, QueryList, ElementRef} from '@angular/core';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Component({
  selector: 'dashboard',
  template: require('./dashboard.component.html')
})
export class DashboardComponent  {
  images:Array<Object> = [];
  public instance:any;
  public api_endpoint:any;

  constructor(public router : Router,public http: Http) {
    this.instance='http://hkdemo.addwebprojects.com/';
    //this.instance='http://localhost/orderPointAdmin/public/index.php/';
  	  this.api_endpoint="api/hkapi/";
  }

  handleDrop(e) {
    var files:File = e.dataTransfer.files;
    var self = this;
    Object.keys(files).forEach((key) => {
      if(files[key].type === "image/png" || files[key].type === "image/jpeg") {
        self.images.push(files[key]);
      }
      else {
        alert("File must be a PNG or JPEG!");
      }
    });

    return false;
  }

  imageStats() {

    let sizes:Array<number> = [];
    let totalSize:number = 0;

    this
      .images
      .forEach((image:File) => sizes.push(image.size));

    sizes
      .forEach((size:number) => totalSize += size);

    return {
      size: totalSize,
      count: this.images.length
    }

  }

  logout(){
    return new Promise((resolve, reject) => {
      console.log(localStorage.getItem('token'));
      let url= this.instance+this.api_endpoint;
        //let headers = new Headers();
        //headers.append('X-CSRF-TOKEN', localStorage.getItem('token'));

        this.http.post(url+'user/logout', {}, {withCredentials: true})
          .subscribe(res => {
            localStorage.clear();
           // alert('sucess...');
            resolve(res.json());
          }, (err) => {
           // alert('error...'+err);
            reject(err);
          });
    });
  }
}
