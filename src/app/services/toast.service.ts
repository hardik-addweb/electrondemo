import { Injectable } from '@angular/core';
// import { Subject }    from 'rxjs/Subject';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import {Subject, Observable, Subscription} from 'rxjs/Rx';

/**
 * Service helps communicate between the ToastComponent and AppComponent.
 */
@Injectable()
export class ToastCommunicationService {
    // Observable string sources
    private positionSource = new Subject<string>();

    // Observable string streams
    position$ = this.positionSource.asObservable();

  //   getTitle(num: number): string {
  //      return 'Countdown: ' + num;
  //  }
   //
  //  getMessage(num: number): string {
  //      return 'Seconds left: ' + num;
  //  }

    constructor(
      private toastyService:ToastyService,
      private toastyConfig: ToastyConfig
    ) {
     }

    setPosition(position) {
        this.positionSource.next(position);
    }

    addToast(title,msg,type) {
      let interval = 1000;
      let subscription: Subscription;
      var toastOptions:ToastOptions = {
          title: title,
          msg: msg,
          showClose: false,
          timeout: 2000,
          theme: 'default',
          onAdd: (toast:ToastData) => {
              console.log('Toast ' + toast.id + ' has been added!');
              console.log('Toast ' + toast.id + ' has been added!');
               // Run the timer with 1 second iterval
               let observable = Observable.interval(interval);
               // Start listen seconds beat
               subscription = observable.subscribe((count: number) => {
                   if (count > 2) {
                       // We use toast id to identify and hide it
                       this.toastyService.clear(toast.id);
                   }
               });
          },
          onRemove: function(toast:ToastData) {
              console.log('Toast ' + toast.id + ' has been removed!');
              // Stop listenning
              subscription.unsubscribe();
              // this.toastyService.clear(toast.id);
          }
      };
      switch (type) {
       case 'default': this.toastyService.default(toastOptions); break;
       case 'info': this.toastyService.info(toastOptions); break;
       case 'success': this.toastyService.success(toastOptions); break;
       case 'wait': this.toastyService.wait(toastOptions); break;
       case 'error': this.toastyService.error(toastOptions); break;
       case 'warning': this.toastyService.warning(toastOptions); break;
      }
    }
}
