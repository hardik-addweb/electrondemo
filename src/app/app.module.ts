import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routes} from './app.routes';
import { RouterModule } from '@angular/router';
// import { MaterialModule } from '@angular/material';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

//pipes
import { ByteFormatPipe } from './pipes/byte-format.pipe';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/home/home.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
// import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ByteFormatPipe,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    // LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    // MaterialModule
    SlimLoadingBarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
