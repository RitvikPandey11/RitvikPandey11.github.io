import { TestBed } from '@angular/core/testing';
import { RideListComponent } from './ride-list.component';
import { RideService } from '../ride.service';
import { of } from 'rxjs';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: any;
  let rideServiceSpy: any;

  beforeEach(async () => {
    rideServiceSpy = jasmine.createSpyObj('RideService', ['getRides']);
    rideServiceSpy.getRides.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [RideListComponent],
      providers: [{ provide: RideService, useValue: rideServiceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideListComponent);
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
    const rides = [
      { id: 1, employeeId: '123', vehicleType: 'Car', vehicleNumber: 'ABC123', vacantSeats: 4, time: new Date(), pickUpPoint: 'Point A', destination: 'Point B' }
    ];

    rideServiceSpy.getRides.and.returnValue(of(rides));

    component.ngOnInit();

    expect(component.rides).toEqual(rides);
  });
});