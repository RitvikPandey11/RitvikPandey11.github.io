import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RideService } from '../ride.service';
import { Ride } from '../ride.model';


@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {
  rideForm!: FormGroup;

  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.rideForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      vehicleType: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('', Validators.required),
      vacantSeats: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      pickUpPoint: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.rideForm.valid) {
      const ride: Ride = this.rideForm.value;
      this.rideService.addRide(ride).subscribe(response => {
        console.log(response);
        this.rideForm.reset();
      });
    }
  }
}