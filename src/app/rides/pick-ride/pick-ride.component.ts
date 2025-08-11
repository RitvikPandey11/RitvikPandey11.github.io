import { Component, OnInit } from '@angular/core';
import { RideService } from '../ride.service';
import { Ride } from '../ride.model';


@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
  styleUrls: ['./pick-ride.component.css']
})
export class PickRideComponent implements OnInit {
  rides: Ride[] = [];
  employeeId: string = '';

  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.rideService.getRides().subscribe((rides: Ride[]) => {
      this.rides = rides;
    });
  }

  pickRide(ride: Ride): void {
    this.rideService.bookRide(ride.id!, this.employeeId).subscribe(success => {
      if (success) {
        alert('Ride booked successfully!');
      } else {
        alert('Failed to book ride.');
      }
    });
  }
}