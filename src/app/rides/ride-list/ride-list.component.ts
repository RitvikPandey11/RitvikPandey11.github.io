import { Component, OnInit } from '@angular/core';

import { Ride } from '../ride.model';
import { RideService } from '../ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  filteredRides: Ride[] = [];
  vehicleType: string = '';
  currentTime: Date = new Date();

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.rideService.getRides().subscribe((rides: Ride[]) => {
      this.rides = rides;
      this.filterRides();
    });
  }

  filterRides(): void {
    this.filteredRides = this.rides.filter(ride => {
      const rideTime = new Date(ride.time);
 const timeDiff = Math.abs(this.currentTime.getTime() - rideTime.getTime());
      const bufferTime = 60 * 60 * 1000; // 60 minutes in milliseconds
      return timeDiff <= bufferTime && (this.vehicleType === '' || ride.vehicleType === this.vehicleType);
  });}

  bookRide(ride: Ride): void {
    const employeeId = 'your-employee-id'; // Replace with actual employee ID
    this.rideService.bookRide(ride.id!, employeeId).subscribe(success => {
      if (success) {
        alert('Ride booked successfully!');
        this.filterRides();
      } else {
        alert('Failed to book ride.');
      }
    });
  }

  onVehicleTypeChange(vehicleType: string): void {
    this.vehicleType = vehicleType;
    this.filterRides();
  }


}