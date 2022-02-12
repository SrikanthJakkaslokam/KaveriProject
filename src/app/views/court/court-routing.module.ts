
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelCourtOrderComponent } from './cancel-court-order/cancel-court-order.component';
import { CourtOrderComponent } from './court-order/court-order.component';
import { CourtComponent } from './court/court.component';
import { EditCourtOrderComponent } from './edit-court-order/edit-court-order.component';

const routes: Routes = [
  {
    path: '',
    component: CourtComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'court-order' },
      {
        path: 'court-order',
        component: CourtOrderComponent,
        data: {
          title: ''
        }
      },

      {
        path: 'edit-court-order',
        component: EditCourtOrderComponent,
        data: {
          title: ''
        },
      },
      {
        path: 'cancel-court-order',
        component: CancelCourtOrderComponent,
        data: {
          title: ''
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtRoutingModule { }
