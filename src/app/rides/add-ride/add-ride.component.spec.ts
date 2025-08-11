import { TestBed } from '@angular/core/testing';
import { AddRideComponent } from './add-ride.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RideService } from '../ride.service';
import { of } from 'rxjs';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: any;
  let rideServiceSpy: any;

  beforeEach(async () => {
    rideServiceSpy = jasmine.createSpyObj('RideService', ['addRide']);
    rideServiceSpy.addRide.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [AddRideComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: RideService, useValue: rideServiceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.rideForm.value).toEqual({
      employeeId: '',
      vehicleType: '',
      vehicleNumber: '',
      vacantSeats: '',
      time: '',
      pickUpPoint: '',
      destination: ''
    });
  });

  it('should call addRide method on form submission', () => {
    component.rideForm.setValue({
      employeeId: '123',
      vehicleType: 'Car',
      vehicleNumber: 'ABC123',
      vacantSeats: 4,
      time: new Date(),
      pickUpPoint: 'Point A',
      destination: 'Point B'
    });

    component.onSubmit();

    expect(rideServiceSpy.addRide).toHaveBeenCalledTimes(1);
  });
});