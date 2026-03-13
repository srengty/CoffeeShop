import { MenuSize } from "./MenuSize";

/*
{
    "maincateid": 328,
    "maincatename": "Drinks",
    "restaurant_id": 171,
    "menu_price": 0,
    "menu_name": "cup",
    "menu_description": "cup",
    "menu_photo": "",
    "menu_addons": "No",
    "sizeoption": "size",
    "id": 7275,
    "menu_type": "none",
    "tax_able": "Yes",
    "addons": [],
    "menu_photo_thumb": "..\/..\/assets\/uploaded_image\/menu\/thumbs\/",
    "sizes": [
        {
            "menu_slice_id": 3605,
            "menu_slice_restaurantid": 171,
            "menu_slice_categoryid": 328,
            "menu_slice_menuid": 7275,
            "menu_slice_name": "Small",
            "menu_slice_price": 1
        },
        {
            "menu_slice_id": 3606,
            "menu_slice_restaurantid": 171,
            "menu_slice_categoryid": 328,
            "menu_slice_menuid": 7275,
            "menu_slice_name": "Medium",
            "menu_slice_price": 2
        }
    ],
    "show_item_price": 1
}
*/
export type MenuItem = {
    maincateid: number;
    maincatename: string;
    restaurant_id: number;
    menu_price: number;
    menu_name: string;
    menu_description: string;
    menu_photo: string;
    menu_addons: string;
    sizeoption: string;
    id: number;
    menu_type: string;
    tax_able: string;
    addons: any[];
    menu_photo_thumb: string;
    sizes: MenuSize[];
    show_item_price: number;
}