import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickRideComponent } from './rides/pick-ride/pick-ride.component';
import { RideListComponent } from './rides/ride-list/ride-list.component';
import { AddRideComponent } from './rides/add-ride/add-ride.component';

const routes: Routes = [
  { path: 'add-ride', component: AddRideComponent },
  { path: 'pick-ride', component: PickRideComponent },
  { path: 'ride-list', component: RideListComponent },
  { path: '', redirectTo: '/ride-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/ride-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }