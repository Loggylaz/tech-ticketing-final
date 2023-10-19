import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PlanningComponent } from './planning/planning.component';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
import { InterventionDetailsComponent } from './intervention-details/intervention-details.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ServiceReportComponent } from './service-report/service-report.component';
import { CheckServiceTagComponent } from './check-service-tag/check-service-tag.component';
import { SelectPartUsageComponent } from './select-part-usage/select-part-usage.component';
import { ManualEntryModalComponent } from './manual-entry-modal/manual-entry-modal.component';
import { ScannerModalComponent } from './scanner-modal/scanner-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnterClosureCommentComponent } from './enter-closure-comment/enter-closure-comment.component';
import { SignatureClosureComponent } from './signature-closure/signature-closure.component';
import { ClosureRecapComponent } from './closure-recap/closure-recap.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotAuthorizedComponent,
    PlanningComponent,
    NavbarComponent,
    SubscribeComponent,
    InterventionListComponent,
    InterventionDetailsComponent,
    ServiceReportComponent,
    CheckServiceTagComponent,
    SelectPartUsageComponent,
    ManualEntryModalComponent,
    ScannerModalComponent,
    EnterClosureCommentComponent,
    SignatureClosureComponent,
    ClosureRecapComponent,
    ChangePasswordComponent,
    BurgerMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxScannerQrcodeModule,
    NgbModule,
    AngularSignaturePadModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  providers: [
    AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  

})
export class AppModule { }