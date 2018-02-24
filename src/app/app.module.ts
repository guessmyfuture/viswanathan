import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { IntroPage } from '../pages/intro/intro';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { NewsPage } from '../pages/news/news';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase-credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuthModule  } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	IntroPage,
	LoginPage,
	NewsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot(),
	AngularFireModule.initializeApp(FIREBASE_CONFIG),
	AngularFireDatabaseModule,
	AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	IntroPage,
	LoginPage,
	NewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Facebook,
	GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
