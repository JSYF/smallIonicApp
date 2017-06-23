
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { ImagePage } from './../pages/image/image';
import { TimelinePage } from './../pages/timeline/timeline';
import { YouPage } from './../pages/you/you';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JsonDataProvider } from '../providers/json-data/json-data';
import { AddTimeLineComponent } from '../components/add-time-line/add-time-line';
import { AutoRiseDirective } from '../directives/auto-rise/auto-rise';

@NgModule({
  declarations: [
    MyApp,
    YouPage,
    TimelinePage,
    ImagePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    AddTimeLineComponent,
    AutoRiseDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    YouPage,
    TimelinePage,
    ImagePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    AddTimeLineComponent,
    // AutoRiseDirective
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JsonDataProvider
  ]
})
export class AppModule {}
