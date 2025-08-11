import { TestBed } from '@angular/core/testing';
import { PickRideComponent } from './pick-ride.component';
import { RideService } from '../ride.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('PickRideComponent', () => {
  let component: PickRideComponent;
  let fixture: any;
  let rideServiceSpy: any;

  beforeEach(async () => {
    rideServiceSpy = jasmine.createSpyObj('RideService', ['bookRide', 'getRides']);
    rideServiceSpy.bookRide.and.returnValue(of(true));
    rideServiceSpy.getRides.and.returnValue(of([
      { id: 1, employeeId: '123', vehicleType: 'Car', vehicleNumber: 'ABC123', vacantSeats: 4, time: new Date(), pickUpPoint: 'Point A', destination: 'Point B' },
      { id: 2, employeeId: '456', vehicleType: 'Bike', vehicleNumber: 'DEF456', vacantSeats: 2, time: new Date(), pickUpPoint: 'Point C', destination: 'Point D' }
    ]));

    await TestBed.configureTestingModule({
      declarations: [PickRideComponent],
      imports: [FormsModule],
      providers: [{ provide: RideService, useValue: rideServiceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRides method on component initialization', () => {
    expect(rideServiceSpy.getRides).toHaveBeenCalledTimes(1);
  });

  it('should display rides', () => {
    expect(component.rides.length).toBe(2);
  });

  it('should call bookRide method on ride selection', () => {
    const ride = component.rides[0];
    component.employeeId = '789';
    component.pickRide(ride);
    expect(rideServiceSpy.bookRide).toHaveBeenCalledTimes(1);
    expect(rideServiceSpy.bookRide).toHaveBeenCalledWith(ride.id, component.employeeId);
  });

  it('should show alert on successful ride booking', () => {
    spyOn(window, 'alert');
    const ride = component.rides[0];
    component.employeeId = '789';
    component.pickRide(ride);
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Ride booked successfully!');
  });

  it('should show alert on failed ride booking', () => {
    rideServiceSpy.bookRide.and.returnValue(of(false));
    spyOn(window, 'alert');
    const ride = component.rides[0];
    component.employeeId = '789';
    component.pickRide(ride);
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Failed to book ride.');
  });
});