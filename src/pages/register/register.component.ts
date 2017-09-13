import {OnInit, ViewChild, ViewChildren, Component, QueryList, ElementRef} from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';


//services
import { RequestProviderService } from '../../app/services/request-provider.service';
import { ToastCommunicationService } from '../../app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RequestProviderService]
})
export class RegisterComponent implements OnInit {

  public register:any=[];

  constructor(
    private requestProviderService:RequestProviderService,
    private toastyService:ToastyService,
    private toastyConfig: ToastyConfig,
    public router:Router
  ) {
    console.log('inside of register constructor');
    this.toastyConfig.theme = 'material';
  }

  ngOnInit() {
    console.log('inside of register OnInit');
  }



  doRegister(reqData) {
    var reqSendData = {};
    reqSendData['mail'] = reqData.email;
    reqSendData['name'] = reqData.username;
    reqSendData['pass'] = reqData.password;

    console.log('reqData',reqData);
    console.log('reqSendData',reqSendData);
    return new Promise(resolve => {
      this.requestProviderService.set('user/register',reqSendData)
      .then(data => {
        console.log('data after submit listing step 1',data);
        var alldata  = JSON.parse(JSON.stringify(data));
        localStorage.setItem('userData',alldata);
        console.log('alldata',alldata);
        this.router.navigate(['home']);
      },function(e){
        var errorData  = JSON.parse(JSON.stringify(e));
        console.log('error data',errorData);
      })
    })
  }

}
