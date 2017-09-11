import {OnInit, ViewChild, ViewChildren, Component, QueryList, ElementRef} from '@angular/core';

//services
import { RequestProviderService } from '../../app/request-provider.service';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  providers: [RequestProviderService]
})
export class HomeComponent  {
  constructor(private requestProviderService:RequestProviderService,

  ) {
    console.log('inside home constructor');
  }

  ngOnInit () {
   console.log('inside home ngOnInit');

   return new Promise(resolve => {
     this.requestProviderService.get('views/apartment_listing?display_id=apartment_listing')
     .then(data => {
       console.log('data after submit listing step 1',data);
       var alldata  = JSON.parse(JSON.stringify(data));
       if(alldata.status == 1){
         if(alldata.data.paypal_url != null || alldata.data.paypal_url != undefined)
          window.open(alldata.data.paypal_url);
        else
          console.log('Successfully integrated user')
       } else {
         window.scrollTo(0,0);
       }
     },function(e){
       var errorData  = JSON.parse(JSON.stringify(e));
       console.log('error data',errorData);
     })
   })
  }
}
