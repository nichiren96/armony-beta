export class Order {

    shipping_address: string;

    constructor(public number: string, 
                public order_date: Date,
                public confirmed: boolean,
                public client_id: number, 
                public user_id: number,
                public product_id: number) {

        
    }
}