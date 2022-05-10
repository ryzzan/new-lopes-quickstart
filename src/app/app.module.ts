import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { RemoveConfirmationDialogComponent } from './components/remove-confirmation-dialog/remove-confirmation-dialog.component';
import { MyErrorHandler } from './utils/error-handler';
import { LoginComponent } from './components/login/login.component';
import { GenericAnalyticReportComponent } from './components/generic-analytic-report/generic-analytic-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutConfirmationDialogComponent,
    RemoveConfirmationDialogComponent,
    GenericAnalyticReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    MyErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
