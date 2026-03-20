export type Restaurant = {
    useraddress: string;
    userid: number;
    useremail: string;
    userphone: string;
    usercity: string;
    userstate: string;
    userzip: string;
    logo: string;
    type: string;
    name: string;
    service_fee: number;
    service_fee_type: string;
    tax: number;
    res_review_starrating: number;
    res_sales_volume_starrating: number;
    res_complete_orders_starrating: string;
    valor: {
        is_valor_enable: number;
        valor_pin: string;
        valor_key: string;
        valor_epi: string;
        is_use_default_valor: number;
    };
    token: string;
}