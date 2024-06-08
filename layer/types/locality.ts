type Locality = {
    id: number;
    name: string;
    email?: string;
    phone: string;
    latitude?: number;
    longitude?: number;
    city_id: number;
    type: {
        id: number;
        name: string;
    };
    address?: string;
}