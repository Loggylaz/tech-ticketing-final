import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
import { InterventionDetailsComponent } from './intervention-details/intervention-details.component';
import { ServiceReportComponent } from './service-report/service-report.component';
import { CheckServiceTagComponent } from './check-service-tag/check-service-tag.component';
import { SelectPartUsageComponent } from './select-part-usage/select-part-usage.component';
import { InterventionResolver } from './intervention.resolver';
import { EnterClosureCommentComponent } from './enter-closure-comment/enter-closure-comment.component';
import { SignatureClosureComponent } from './signature-closure/signature-closure.component';
import { ClosureRecapComponent } from './closure-recap/closure-recap.component';
import { InterventionListResolver } from './intervention-list.resolver';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], data: { role: 'Admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'intervention', component: InterventionListComponent, canActivate: [AuthGuardService], resolve: { interventions: InterventionListResolver } },
  { path: 'details/:id', component: InterventionDetailsComponent, canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver}  },
  { path: 'service-report/:id', component: ServiceReportComponent, canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver}  },
  { path: 'check-service-tag/:id', component: CheckServiceTagComponent,canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver} },
  { path: 'select-part-usage/:id', component: SelectPartUsageComponent,canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver} },
  { path: 'enter-closure-comment/:id', component: EnterClosureCommentComponent,canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver} },
  { path: 'signature-closure/:id', component: SignatureClosureComponent,canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver} },
  { path: 'closure-recap/:id', component: ClosureRecapComponent,canActivate: [AuthGuardService], resolve: { intervention: InterventionResolver} },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'subscribe', component: SubscribeComponent, canActivate: [AuthGuardService], data: { role: 'Admin'} },
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuardService] },
  { path: 'change-password', component : ChangePasswordComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
