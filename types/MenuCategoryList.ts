import { Category } from "./Category";
import { MenuItem } from "./MenuItem";

/*
{
  "status": 1,
  "message": "",
  "response": {
    "CateData": [
      {
        "maincateid": 104,
        "maincatename": "Burgers"
      },
      {
        "maincateid": 114,
        "maincatename": "Specialty Pizzas"
      },
      {
        "maincateid": 113,
        "maincatename": "Pizza Mania Combos"
      },
      {
        "maincateid": 327,
        "maincatename": "pizza"
      },
      {
        "maincateid": 328,
        "maincatename": "Drinks"
      },
      {
        "maincateid": 344,
        "maincatename": "Specials"
      }
    ],
    "MenuData": [
      {
        "maincateid": 328,
        "maincatename": "Drinks",
        "restaurant_id": 171,
        "menu_price": 7.89,
        "menu_name": "Fourteen Drink",
        "menu_description": "Foundain drink 23",
        "menu_photo": "",
        "menu_addons": "No",
        "sizeoption": "fixed",
        "id": 2857,
        "menu_type": "none",
        "tax_able": "Yes",
        "addons": [],
        "menu_photo_thumb": "..\/..\/assets\/uploaded_image\/menu\/thumbs\/20170910110125_menu_photo.jpg",
        "sizes": [],
        "show_item_price": 7.89
      },
      {
        "maincateid": 328,
        "maincatename": "Drinks",
        "restaurant_id": 171,
        "menu_price": 5,
        "menu_name": "2 LITER POP",
        "menu_description": null,
        "menu_photo": "",
        "menu_addons": "No",
        "sizeoption": "fixed",
        "id": 2950,
        "menu_type": "none",
        "tax_able": "Yes",
        "addons": [],
        "menu_photo_thumb": "..\/..\/assets\/uploaded_image\/menu\/thumbs\/20190424043604_menu_photo.jpg",
        "sizes": [],
        "show_item_price": 5
      },
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
    ]
  }
}
*/
export type MenuCategoryList = {
    status: number;
    message: string;
    response: {
        CateData: Category[];
        MenuData: MenuItem[];
    }
}