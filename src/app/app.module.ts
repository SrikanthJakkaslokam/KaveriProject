import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsideToggleDirective } from './shared/aside.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DocumentdetailsBlockchainkeyComponent } from './views/documentdetails-blockchainkey/documentdetails-blockchainkey.component';
import { LiabilityDetailComponent } from './views/liability-detail/liability-detail.component';
import { EcSearchComponent } from './views/ec-search/ec-search.component';
import { EcSearchResultComponent } from './views/ec-search-result/ec-search-result.component';
import { EcSearchMakePaymentComponent } from './views/ec-search-make-payment/ec-search-make-payment.component';
import { CcDocumentDetailsBlockchainKeyComponent } from './views/cc-document-details-blockchain-key/cc-document-details-blockchain-key.component';
import { CcSearchComponent } from './views/cc-search/cc-search.component';
import { CcSearchResultComponent } from './views/cc-search-result/cc-search-result.component';
import { CcSearchMakePaymentComponent } from './views/cc-search-make-payment/cc-search-make-payment.component';
import { EcApplicationForSubmitComponent } from './views/ec-application-for-submit/ec-application-for-submit.component';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { MatDatepickerModule } from '@angular/material/datepicker';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarColor } from './views/application-allocation/progress-bar-color';
import { MatStepperModule } from '@angular/material/stepper';


import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxCheckBoxModule,
  DxButtonModule,
  DxSchedulerModule,
  DxPieChartModule,
  DxListModule,
  DxTabsModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxFormModule,
  DxToastModule

} from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { UserTypeComponent } from './views/user-type/user-type.component';
import { ApplicationTypeComponent } from './views/application-type/application-type.component';
import { MovableImmovableComponent } from './views/movable-immovable/movable-immovable.component';
import { AgriculturalNonAgriculturalComponent } from './views/agricultural-non-agricultural/agricultural-non-agricultural.component';
import { BhoomiSearchComponent } from './views/bhoomi-search/bhoomi-search.component';
import { NonAgriculturalSearchComponent } from './views/non-agricultural-search/non-agricultural-search.component';
import { BhoomiSearchResultComponent } from './views/bhoomi-search-result/bhoomi-search-result.component';
import { ESwathuComponent } from './views/e-swathu/e-swathu.component';
import { EAasthiComponent } from './views/e-aasthi/e-aasthi.component';
import { ViewPropertyComponent } from './views/view-property/view-property.component';
import { ViewEAasthiComponent } from './views/view-e-aasthi/view-e-aasthi.component';
import { BhoomiHissaComponent } from './views/bhoomi-hissa/bhoomi-hissa.component';
import { KaveriResultComponent } from './views/kaveri-result/kaveri-result.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { SearchOnKaveriComponent } from './views/search-on-kaveri/search-on-kaveri.component';
import { KaveriDocNumberComponent } from './views/kaveri-doc-number/kaveri-doc-number.component';
import { KaveriDocDetailsComponent } from './views/kaveri-doc-details/kaveri-doc-details.component';
import { KaveriBlockchainKeyComponent } from './views/kaveri-blockchain-key/kaveri-blockchain-key.component';
import { KaveriDocNumberResultsComponent } from './views/kaveri-doc-number-results/kaveri-doc-number-results.component';
import { KaveriDocDetailsResultsComponent } from './views/kaveri-doc-details-results/kaveri-doc-details-results.component';
import { KaveriBlockchainKeyResultsComponent } from './views/kaveri-blockchain-key-results/kaveri-blockchain-key-results.component';
import { PropertyFetchUsingCardComponent } from './views/property-fetch-using-card/property-fetch-using-card.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { KaveriDashboardComponent } from './views/kaveri-dashboard/kaveri-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { WillProceedingsComponent } from './views/will-proceedings/will-proceedings.component';
import { PowerOfAttorneyComponent } from './views/power-of-attorney/power-of-attorney.component';
import { NatureOfDocumentComponent } from './views/nature-of-document/nature-of-document.component';
import { PartyDetailsComponent } from './views/party-details/party-details.component';
import { SearchResultWithoutKaveriComponent } from './views/search-result-without-kaveri/search-result-without-kaveri.component';
import { KindOfPropertyRegistrationComponent } from './views/kind-of-property-registration/kind-of-property-registration.component';
import { KindOfSaleComponent } from './views/kind-of-sale/kind-of-sale.component';
import { KindOfMortgageComponent } from './views/kind-of-mortgage/kind-of-mortgage.component';
import { KindOfRegistrationComponent } from './views/kind-of-registration/kind-of-registration.component';
import { AccountCreationComponent } from './views/account-creation/account-creation.component';
import { MojiniEsketchComponent } from './views/mojini-esketch/mojini-esketch.component';
import { MarketvaluationComponent } from './views/marketvaluation/marketvaluation.component';
import { MarketvaluationNonAgriculturalComponent } from './views/marketvaluation-non-agricultural/marketvaluation-non-agricultural.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { PropertyScheduleComponentComponent } from './views/property-schedule-component/property-schedule-component.component';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { FeeCalculationComponent } from './views/fee-calculation/fee-calculation.component';
import { PartyDetailsExecutantComponent } from './views/party-details-executant/party-details-executant.component';
import { PartyDetailsWitnessComponent } from './views/party-details-witness/party-details-witness.component';
import { DocumentForApprovalComponent } from './views/document-for-approval/document-for-approval.component';
import { PaymentPageComponent } from './views/payment-page/payment-page.component';
import { ScheduleAppointmentComponent } from './views/schedule-appointment/schedule-appointment.component';
import { DepartmentalLoginComponent } from './views/departmental-login/departmental-login.component';
import { DeoPortalAllocatedApplicationComponent } from './views/deo-portal-allocated-application/deo-portal-allocated-application.component';
import { PendingApplicationComponent } from './views/pending-application/pending-application.component';
import { ApplicationAllocationComponent } from './views/application-allocation/application-allocation.component';
import { SubregistrarDashboardComponent } from './views/subregistrar-dashboard/subregistrar-dashboard.component';
import { ApplicationDetailsComponent } from './views/application-details/application-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DocumentForApprovalPreviewComponent } from './views/document-for-approval-preview/document-for-approval-preview.component';

import { ViewPropertyNonAgriculturalComponent } from './views/view-property-non-agricultural/view-property-non-agricultural.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsComponent } from './views/dialogs/dialogs.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ViewDetailEAasthiComponent } from './views/view-detail-e-aasthi/view-detail-e-aasthi.component';
import { PartyEkycComponent } from './views/party-ekyc/party-ekyc.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { IvyCarouselModule } from 'angular-responsive-carousel';

//import { ScheduleappointmentwithdateComponent } from './views/scheduleappointmentwithdate/scheduleappointmentwithdate.component';


import { SharedModule } from './shared/shared.module'; import { ViewDocumentForApprovalComponent } from './views/view-document-for-approval/view-document-for-approval.component';
import { PaymentGatewayResponceComponent } from './views/payment-gateway-responce/payment-gateway-responce.component';
import { PaymentResultComponent } from './views/payment-result/payment-result.component';
import { TypeOfPropertyComponent } from './views/type-of-property/type-of-property.component';
import { MiscellaneousPropertiesDetailsComponent } from './views/miscellaneous-properties-details/miscellaneous-properties-details.component';
import { MiscellaneousFeeCalculationComponent } from './views/miscellaneous-fee-calculation/miscellaneous-fee-calculation.component';
import { SdaFdaLandingPageComponent } from './views/sda-fda-landing-page/sda-fda-landing-page.component';
import { MiscellaneousPartyExecutantComponent } from './views/miscellaneous-party-executant/miscellaneous-party-executant.component';
import { EsignresponseComponent } from './views/esignresponse/esignresponse.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReturnedApplicationsComponent } from './views/returned-applications/returned-applications.component';
import { SroDocSummaryComponent } from './views/returned-applications/sro-doc-summary/sro-doc-summary.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxCheckBoxModule,
    DxButtonModule,
    DxPieChartModule,
    DxSchedulerModule,
    DxListModule,
    DxTabsModule,
    DxSelectBoxModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    CarouselModule,
    DxPopupModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    BotDetectCaptchaModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxToastModule,
    MatDatepickerModule,
    MatDialogModule,
    MatStepperModule,
    SharedModule,
    PdfViewerModule,
    NgMultiSelectDropDownModule.forRoot()
    // IvyCarouselModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    LiabilityDetailComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    AsideToggleDirective,
    UserTypeComponent,
    ApplicationTypeComponent,
    MovableImmovableComponent,
    AgriculturalNonAgriculturalComponent,
    BhoomiSearchComponent,
    NonAgriculturalSearchComponent,
    BhoomiSearchResultComponent,
    ESwathuComponent,
    EAasthiComponent,
    ViewPropertyComponent,
    ViewEAasthiComponent,
    BhoomiHissaComponent,
    KaveriResultComponent,
    LandingPageComponent,
    SearchOnKaveriComponent,
    KaveriDocNumberComponent,
    KaveriDocDetailsComponent,
    KaveriBlockchainKeyComponent,
    KaveriDocNumberResultsComponent,
    KaveriDocDetailsResultsComponent,
    KaveriBlockchainKeyResultsComponent,
    PropertyFetchUsingCardComponent,
    DashboardComponent,
    KaveriDashboardComponent,
    WillProceedingsComponent,
    PowerOfAttorneyComponent,
    NatureOfDocumentComponent,
    PartyDetailsComponent,
    SearchResultWithoutKaveriComponent,
    KindOfPropertyRegistrationComponent,
    KindOfSaleComponent,
    KindOfMortgageComponent,
    KindOfRegistrationComponent,
    AccountCreationComponent,
    MojiniEsketchComponent,
    MarketvaluationComponent,
    MarketvaluationNonAgriculturalComponent,
    ChangePasswordComponent,
    PropertyScheduleComponentComponent,
    FeeCalculationComponent,
    PartyDetailsExecutantComponent,
    PartyDetailsWitnessComponent,
    DocumentForApprovalComponent,
    ScheduleAppointmentComponent,
    PaymentPageComponent,
    ScheduleAppointmentComponent,

    DepartmentalLoginComponent,
    DeoPortalAllocatedApplicationComponent,
    PendingApplicationComponent,
    SubregistrarDashboardComponent,
    ApplicationAllocationComponent,
    ApplicationDetailsComponent,
    ProgressBarColor,
    DocumentForApprovalPreviewComponent,
    ViewPropertyNonAgriculturalComponent,
    DialogsComponent,
    ViewDetailEAasthiComponent,
    DocumentdetailsBlockchainkeyComponent,
    EcSearchComponent,
    EcSearchResultComponent,
    EcSearchMakePaymentComponent,
    CcDocumentDetailsBlockchainKeyComponent,
    CcSearchComponent,
    CcSearchResultComponent,
    CcSearchMakePaymentComponent,
    EcApplicationForSubmitComponent,
    ViewDocumentForApprovalComponent,
    PaymentGatewayResponceComponent,
    PaymentResultComponent,
    TypeOfPropertyComponent,
    MiscellaneousPropertiesDetailsComponent,
    MiscellaneousFeeCalculationComponent,
    SdaFdaLandingPageComponent,
    PartyEkycComponent,
    MiscellaneousPartyExecutantComponent,
    EsignresponseComponent,
    ReturnedApplicationsComponent,
    SroDocSummaryComponent,
  
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        displayDefaultIndicatorType: false
      }
    },
    IconSetService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);
