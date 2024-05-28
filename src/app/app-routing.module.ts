import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import { UsercreationComponent } from './usercreation/usercreation.component';
import { PiechartsComponent } from './piecharts/piecharts.component';
import { TrackingComponent } from './tracking/tracking.component';
import { CustomerComponent } from './customer/customer.component';
import { VenderDetailsComponent } from './vender-details/vender-details.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerReportsComponent } from './reports/customer-reports/customer-reports.component';
import { VendorReportsComponent } from './reports/vendor-reports/vendor-reports.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { TrackingDetailsComponent } from './tracking-details/tracking-details.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: "", redirectTo: "/login", pathMatch: "full" },
                    {path: 'user', component: UsercreationComponent},
                    {path: 'piechart', component: PiechartsComponent},
                    {path: 'tracking', component: TrackingComponent},
                    {path: 'customer', component: CustomerComponent},
                    {path: 'vendor', component: VenderDetailsComponent},
                    {path: 'add-customer', component: AddCustomerComponent},
                    {path: 'edit', component: EditCustomerComponent},
                    {path: 'customer-reports', component: CustomerReportsComponent},
                    {path: 'vendor-reports', component: VendorReportsComponent},
                    {path: 'customer-details', component: CustomerDetailsComponent},
                    {path: 'tracking-details', component: TrackingDetailsComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},

            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
