import {OnInit, ViewChild, ViewChildren, Component, QueryList, ElementRef} from '@angular/core';


//services
import { RequestProviderService } from '../../app/services/request-provider.service';
import { ToastCommunicationService } from '../../app/services/toast.service';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  providers: [RequestProviderService]
})
export class HomeComponent  {
  // private toastyComponentPosition: string;
  public allAppartmentdata:any=[];
  constructor(
    private requestProviderService:RequestProviderService,
    private toastCommunicationService: ToastCommunicationService

  ) {
    console.log('inside home constructor');
    // this.toastCommunicationService.position$.subscribe(pos => this.toastyComponentPosition = pos);
  }

  ngOnInit () {
   console.log('inside home ngOnInit');

   return new Promise(resolve => {
     this.requestProviderService.get('views/apartment_listing?display_id=apartment_listing')
     .then(data => {

       console.log('data after submit listing step 1',data);
       this.allAppartmentdata  = JSON.parse(JSON.stringify(data));
       console.log('this.allAppartmentdata',this.allAppartmentdata);
       this.toastCommunicationService.addToast('Success','Data Received successfully','success');
     },function(e){
       var errorData  = JSON.parse(JSON.stringify(e));
       console.log('error data',errorData);
     })
   })
  }

}
