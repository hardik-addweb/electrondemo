import {OnInit, ViewChild, ViewChildren, Component, QueryList, ElementRef} from '@angular/core';

//services
import { RequestProviderService } from '../../app/request-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RequestProviderService]
})
export class RegisterComponent implements OnInit {

  public register:any=[];

  constructor(private requestProviderService:RequestProviderService) {
    console.log('inside of register constructor');
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
        console.log('alldata',alldata);
      },function(e){
        var errorData  = JSON.parse(JSON.stringify(e));
        console.log('error data',errorData);
      })
    })
  }

}
