export interface Ride {
    id?: number; // Optional, Unique identifier for the ride
    employeeId: string; // Mandatory, Unique
    vehicleType: string; // Values: Bike, Car
    vehicleNumber: string; // Mandatory
    vacantSeats: number; // Mandatory
    time: Date; // Mandatory
    pickUpPoint: string; // Mandatory
    destination: string; // Mandatory
    bookedBy?: string[] // Optional, Employee ID of the person who booked the ride
}