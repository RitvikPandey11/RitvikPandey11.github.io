import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickRideComponent } from './pick-ride/pick-ride.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRideComponent } from './add-ride/add-ride.component';
import { RideService } from './ride.service';

@NgModule({
  declarations: [
    AddRideComponent,
    PickRideComponent,
    RideListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
   
  ],
  providers:[RideService]
})
export class RidesModule { }