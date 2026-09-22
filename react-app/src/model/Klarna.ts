
export interface KlarnaData
{
    purchase_country : string;
    purchase_currency : string;
    order_amount : number;
    order_lines : KlarnaOrderLine[];
}

export interface KlarnaOrderLine 
{
    reference: string;
    name: string;
    quantity : 1;
    unit_price : number;
    total_amount: number;
}