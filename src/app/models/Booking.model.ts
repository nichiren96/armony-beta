export class Booking {

    constructor(
        public booking_date: string,
        public check_in: string,
        public check_out: string,
        public amount: string,
        public status: string,
        public payment_status: string,
        public mean_of_payment: string,
        public client_id: string,
        public room_id: string,
        public user_id: string) {

        
    }
}