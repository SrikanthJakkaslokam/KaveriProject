import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NavbarsComponent } from './views/base/navbars/navbars.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { ApplicationTypeComponent } from './views/application-type/application-type.component';
import { UserTypeComponent } from './views/user-type/user-type.component';
import { MovableImmovableComponent } from './views/movable-immovable/movable-immovable.component';
import { AgriculturalNonAgriculturalComponent } from './views/agricultural-non-agricultural/agricultural-non-agricultural.component';
import { BhoomiSearchComponent } from './views/bhoomi-search/bhoomi-search.component';
import { NonAgriculturalSearchComponent } from './views/non-agricultural-search/non-agricultural-search.component';
import { EAasthiComponent } from './views/e-aasthi/e-aasthi.component';
import { ESwathuComponent } from './views/e-swathu/e-swathu.component';
import { ViewPropertyComponent } from './views/view-property/view-property.component';
import { BhoomiSearchResultComponent } from './views/bhoomi-search-result/bhoomi-search-result.component';
import { ViewEAasthiComponent } from './views/view-e-aasthi/view-e-aasthi.component';
import { BhoomiHissaComponent } from './views/bhoomi-hissa/bhoomi-hissa.component';
import { KaveriResultComponent } from './views/kaveri-result/kaveri-result.component';
import { SearchOnKaveriComponent } from './views/search-on-kaveri/search-on-kaveri.component';
import { KaveriDocDetailsComponent } from './views/kaveri-doc-details/kaveri-doc-details.component';
import { KaveriDocNumberComponent } from './views/kaveri-doc-number/kaveri-doc-number.component';
import { KaveriBlockchainKeyComponent } from './views/kaveri-blockchain-key/kaveri-blockchain-key.component';
import { KaveriDocNumberResultsComponent } from './views/kaveri-doc-number-results/kaveri-doc-number-results.component';
import { KaveriDocDetailsResultsComponent } from './views/kaveri-doc-details-results/kaveri-doc-details-results.component';
import { KaveriBlockchainKeyResultsComponent } from './views/kaveri-blockchain-key-results/kaveri-blockchain-key-results.component';
import { PropertyFetchUsingCardComponent } from './views/property-fetch-using-card/property-fetch-using-card.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { KaveriDashboardComponent } from './views/kaveri-dashboard/kaveri-dashboard.component';
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
import { FeeCalculationComponent } from './views/fee-calculation/fee-calculation.component';
import { PartyDetailsExecutantComponent } from './views/party-details-executant/party-details-executant.component';
import { PartyDetailsWitnessComponent } from './views/party-details-witness/party-details-witness.component';
import { DocumentForApprovalComponent } from './views/document-for-approval/document-for-approval.component';
// import { PaymentPageComponent } from './views/payment-page/payment-page.component';
import { ScheduleAppointmentComponent } from './views/schedule-appointment/schedule-appointment.component';
// import { ScheduleappointmentwithdateComponent } from './views/scheduleappointmentwithdate/scheduleappointmentwithdate.component';
import { DepartmentalLoginComponent } from './views/departmental-login/departmental-login.component';
import { PendingApplicationComponent } from './views/pending-application/pending-application.component';
import { ChartJSComponent } from './views/chartjs/chartjs.component';
import { SubregistrarDashboardComponent } from './views/subregistrar-dashboard/subregistrar-dashboard.component';
import { ApplicationAllocationComponent } from './views/application-allocation/application-allocation.component';
import { ApplicationDetailsComponent } from './views/application-details/application-details.component'
import { DocumentForApprovalPreviewComponent } from './views/document-for-approval-preview/document-for-approval-preview.component';
import { PaymentPageComponent } from './views/payment-page/payment-page.component';
import { DeoPortalAllocatedApplicationComponent } from './views/deo-portal-allocated-application/deo-portal-allocated-application.component';
import { ViewDetailEAasthiComponent } from './views/view-detail-e-aasthi/view-detail-e-aasthi.component';
import { DocumentdetailsBlockchainkeyComponent } from './views/documentdetails-blockchainkey/documentdetails-blockchainkey.component';
import { EcSearchComponent } from './views/ec-search/ec-search.component';
import { EcSearchResultComponent } from './views/ec-search-result/ec-search-result.component';
import { EcSearchMakePaymentComponent } from './views/ec-search-make-payment/ec-search-make-payment.component';
import { CcDocumentDetailsBlockchainKeyComponent } from './views/cc-document-details-blockchain-key/cc-document-details-blockchain-key.component';
import { CcSearchComponent } from './views/cc-search/cc-search.component';
import { CcSearchResultComponent } from './views/cc-search-result/cc-search-result.component';
import { CcSearchMakePaymentComponent } from './views/cc-search-make-payment/cc-search-make-payment.component';
import { EcApplicationForSubmitComponent } from './views/ec-application-for-submit/ec-application-for-submit.component';
import { ViewDocumentForApprovalComponent } from './views/view-document-for-approval/view-document-for-approval.component';
import { PaymentGatewayResponceComponent } from './views/payment-gateway-responce/payment-gateway-responce.component';
import { PaymentResultComponent } from './views/payment-result/payment-result.component';
import { TypeOfPropertyComponent } from './views/type-of-property/type-of-property.component';
import { MiscellaneousPropertiesDetailsComponent } from './views/miscellaneous-properties-details/miscellaneous-properties-details.component';
import { MiscellaneousFeeCalculationComponent } from './views/miscellaneous-fee-calculation/miscellaneous-fee-calculation.component';
import { SdaFdaLandingPageComponent } from './views/sda-fda-landing-page/sda-fda-landing-page.component';
import { PartyEkycComponent } from './views/party-ekyc/party-ekyc.component';
import { MiscellaneousPartyExecutantComponent } from './views/miscellaneous-party-executant/miscellaneous-party-executant.component';
import { EsignresponseComponent } from './views/esignresponse/esignresponse.component';
import { LiabilityDetailComponent } from './views/liability-detail/liability-detail.component';
import { ReturnedApplicationsComponent } from './views/returned-applications/returned-applications.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'departmental-login',
    component: DepartmentalLoginComponent,
    data: {
      title: ''
    }
  },

  {
    path: 'landing-page',
    component: LandingPageComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'document-for-approval-preview',
    component: DocumentForApprovalPreviewComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'document-for-approval',
    component: DocumentForApprovalComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'miscellaneous-party-executant',
    component: MiscellaneousPartyExecutantComponent,
   
  },
  {
    path: 'view-document-for-approval',
    component: ViewDocumentForApprovalComponent,
    data: {
      title: ''
    }
  },
  {

    path: 'account-creation',

    component: AccountCreationComponent,

    data: {

      title: ''

    }

  },
  {
    path: 'dashboard-component',
    component: DashboardComponent,
    data: {
      title: ''
    }
  },
  
  {
    path: 'dashboard',
    component: KaveriDashboardComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'application-details',
    component: ApplicationDetailsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'fee-calculation',
    component: FeeCalculationComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'application-type',
    component: ApplicationTypeComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'willproceedings',
    component: WillProceedingsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'power-of-attorney',
    component: PowerOfAttorneyComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'natureof-document',
    component: NatureOfDocumentComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'party-details',
    component: PartyDetailsComponent,
    data: {
      title: ''
    }
  },

  {
    path: 'user-type',
    component: UserTypeComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'movable-immovable',
    component: MovableImmovableComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'type-of-property',
    component: TypeOfPropertyComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'miscellaneous-properties-details',
    component: MiscellaneousPropertiesDetailsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'miscellaneous-fee-calculation',
    component: MiscellaneousFeeCalculationComponent,
    data: {
      title: ''
    }
  },

  {
    path: 'agricultural/non-agricultural',
    component: AgriculturalNonAgriculturalComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'bhoomi-search',
    component: BhoomiSearchComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'schedule-appointment',
    component: ScheduleAppointmentComponent,
    data: {
      title: ''
    }
  },
  //  {
  //    path:'schedule-appointment-with-date',
  //    component: ScheduleappointmentwithdateComponent,
  //    data:
  //    {
  //      title:''
  //    }
  //  },

  {
    path: 'payment-page',
    component: PaymentPageComponent,
    data: {
      title: ''
    }

  },


  {
    path: 'bhoomi-search-result',
    component: BhoomiSearchResultComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'bhoomi-hissa',
    component: BhoomiHissaComponent,
    data: {
      title: ''
    }
  },

  {
    path: 'non-agricultural-search',
    component: NonAgriculturalSearchComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'e-aasthi',
    component: EAasthiComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'e-swathu',
    component: ESwathuComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'view-e-swathu',
    component: ViewPropertyComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'view-property-non-agricultural',
    component: ViewDetailEAasthiComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'view-e-aasthi',
    component: ViewEAasthiComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-result',
    component: KaveriResultComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'search-on-kaveri',
    component: SearchOnKaveriComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'search-result-without-kaveri',
    component: SearchResultWithoutKaveriComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'mojini-esketch',
    component: MojiniEsketchComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'party-details-executant',
    component: PartyDetailsExecutantComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'party-details-witness',
    component: PartyDetailsWitnessComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kind-of-property-registration',
    component: KindOfPropertyRegistrationComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kind-of-sale',
    component: KindOfSaleComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kind-of-mortgage',
    component: KindOfMortgageComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-doc-number',
    component: KaveriDocNumberComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-doc-details',
    component: KaveriDocDetailsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-blockchain-key',
    component: KaveriBlockchainKeyComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-doc-number-results',
    component: KaveriDocNumberResultsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-doc-details-results',
    component: KaveriDocDetailsResultsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'kaveri-blockchain-key-results',
    component: KaveriBlockchainKeyResultsComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'property-fetch-using-card',
    component: PropertyFetchUsingCardComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'property-schedule-component',
    component: PropertyScheduleComponentComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'master-valuation', 
    loadChildren: () => import('./views/master-valuation/master-valuation.module').then(m => m.MasterValuationModule)
  },


  // {
  //   path: 'property-schedule-comp',
  //   component: PropertyScheduleComponent,
  //   data: {
  //     title: ''
  //   }
  // },
  {
    path: 'kind-of-registration',
    component: KindOfRegistrationComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'market-valuation',
    component: MarketvaluationNonAgriculturalComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'market-valuation-NonAgri',
    component: MarketvaluationNonAgriculturalComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'ec-search',
    component: EcSearchComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'ec-search-result',
    component: EcSearchResultComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'ec-search-make-payment',
    component: EcSearchMakePaymentComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'ec-application-for-submit',
    component: EcApplicationForSubmitComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'cc-document-details-blockchain-key',
    component: CcDocumentDetailsBlockchainKeyComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'cc-search',
    component: CcSearchComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'cc-search-result',
    component: CcSearchResultComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'cc-search-make-payment',
    component: CcSearchMakePaymentComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'document-details-blockchain-key',
    component: DocumentdetailsBlockchainkeyComponent,
    data: {
      title: ''
    }
  },

  {
    path: 'kaveri-payment-result',
    component: PaymentResultComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'party-ekyc',
    component:PartyEkycComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'esignresponse',
    component:EsignresponseComponent,
    data: {
      title: ''
    }
  },

  // ---------------------------Couurt------Order--------------------------------
  {
    path: 'document',
    loadChildren: () => import('./views/document-details/document-details.module').then(m => m.DocumentDetailsModule)
  },
  {
    path: 'court',
    loadChildren: () => import('./views/court/court.module').then(m => m.CourtModule)
  },
  {
    path: 'master-valuation',
    loadChildren: () => import('./views/master-valuation/master-valuation.module').then(m => m.MasterValuationModule)
  },
  {
    path: 'dfa',
    loadChildren: () => import('./views/dfa/dfa.module').then(m => m.DFAModule)
  },
 
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      // {
      //   path: 'liability-detail',
      //   loadChildren: () => import('./views/liability-detail/liability-detail.module').then(m => m.LiabilityDetailModule)
      // },
      {
        path: 'pending-application',
        component: PendingApplicationComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'liability-detail',
        component: LiabilityDetailComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'subregistrar-dashboard',
        component: SubregistrarDashboardComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'application-allocation',
        component: ApplicationAllocationComponent,
        data: {
          title: ''
        }
      },
      
      {
        path: 'sda-fda-landing-page',
        component: SdaFdaLandingPageComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'returned-applications',
        component: ReturnedApplicationsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'deo-portal',
        component: DeoPortalAllocatedApplicationComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'pgresponse',
        component: PaymentGatewayResponceComponent,
        data: {
          title: ''
        },
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
