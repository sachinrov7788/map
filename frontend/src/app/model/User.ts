export class User {
    id?: string;
    name: string;
    email: string;
    registration_date: Date;
    district: string;
    latitude: number;
    longitude: number;

    constructor(
        id: string,
        name: string,
        email: string,
        registration_date: Date,
        district: string,
        latitude: number,
        longitude: number
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.registration_date = registration_date;
        this.district = district;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}