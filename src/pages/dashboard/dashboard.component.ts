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

import { ConfirmComponent } from '../../app/common/confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

//service
import { ToastCommunicationService } from '../../app/services/toast.service';

@Component({
  selector: 'dashboard',
  template: require('./dashboard.component.html')
})
export class DashboardComponent  {
  images:Array<Object> = [];
  public instance:any;
  public api_endpoint:any;
  public isLoggedin:boolean;

  configs: Object = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        };

  constructor(
    public router : Router,
    public http: Http,
    private dialogService:DialogService,
    private toastCommunicationService: ToastCommunicationService
  ) {
    this.instance='http://hkdemo.addwebprojects.com/';
    //this.instance='http://localhost/orderPointAdmin/public/index.php/';
  	  this.api_endpoint="api/hkapi/";

      if(localStorage.getItem('userData') != null) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
      console.log('this.isLoggedin',this.isLoggedin);
      console.log('localStorage.getItem(userData)',localStorage.getItem('userData'));
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

    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirm',
      message:'Are you sure you want to logout?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
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
                    this.router.navigate(['login']);
                  }, (err) => {
                   // alert('error...'+err);
                    reject(err);
                    console.log('error...',err);
                    this.toastCommunicationService.addToast('Error',err.statusText,'error');
                  });
            });
          }
          else {
              alert('declined');
          }
      });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
  }
}
