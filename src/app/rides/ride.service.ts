import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Ride } from './ride.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private rides: Ride[] = [];

  constructor() {}

  addRide(ride: Ride) {
     this.rides.push(ride);
     return of(ride)
    
  }
  getRides() {
    return of(this.rides);
  }

  bookRide(rideId: number, employeeId: string) {
    const ride = this.rides.find(r => r.id === rideId);
    if (ride && ride.vacantSeats > 0 && !ride.bookedBy?.includes(employeeId) && ride.employeeId !== employeeId) {
      ride.vacantSeats--;
      if (!ride.bookedBy) {
        ride.bookedBy = [];
      }
      ride.bookedBy.push(employeeId);
      return of(true);
    }
    return of(false);
  }



}