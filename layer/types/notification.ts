type Notification = {
    id: number;
    message: string;
    subtitle: string;
    title: string;
    main_text: string;
    date_start_at: string;
    date_end_at: string;
    parent_id?: number;
    type: {
        id: number;
        name: string;
    },
    city?: {
        id: number;
        name: string;
    },
    type_location_id?: number
}