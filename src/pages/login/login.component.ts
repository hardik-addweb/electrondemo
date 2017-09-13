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
//services
import { RequestProviderService } from '../../app/services/request-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RequestProviderService]
})
export class LoginComponent implements OnInit {

  public login:any=[];
  constructor(
    private requestProviderService:RequestProviderService,
    public router:Router
  ) {
    console.log('inside of login constructor');
  }

  ngOnInit() {
    console.log('inside of login OnInit');
  }

  doLogin(reqData) {
    console.log('reqData',reqData);
    return new Promise(resolve => {
      this.requestProviderService.set('user/login',reqData)
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
