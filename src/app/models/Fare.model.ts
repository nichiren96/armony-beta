export class Fare {

    fare: string;
    description: string;

    constructor(
        public fare_number: string,
        public class_id: string, 
        public category_id: string,
        public price: number) {

        
    }
}