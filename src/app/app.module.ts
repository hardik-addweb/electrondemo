import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ToastyModule } from 'ng2-toasty';
import { ToastCommunicationService } from './services/toast.service';
import { SwiperModule } from 'angular2-useful-swiper';
import { TooltipModule } from 'ngx-tooltip';


//pipes
import { ByteFormatPipe } from './pipes/byte-format.pipe';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/home/home.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ConfirmComponent } from './common/confirm/confirm.component';



@NgModule({
  declarations: [
    AppComponent,
    ByteFormatPipe,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    SwiperModule,
    TooltipModule

  ],
  providers: [ToastCommunicationService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmComponent],
})
export class AppModule { }
