import { addOutline, analyticsOutline, clipboardOutline, homeOutline, pricetagOutline, readerOutline, settingsOutline, shareSocialOutline } from "ionicons/icons";
import { routes } from "../global/routes";
import { getCountries, getStates } from 'country-state-picker';


export const pageNavigators = [
    {
        icon: pricetagOutline,
        title: "Products",
        route: routes.products
    },{
        icon: analyticsOutline,
        title: "Analytics",
        route: routes.analystics
    },{
        icon: addOutline,
        title: "Add Products",
        route: routes.addProducts
    },{
        icon: clipboardOutline,
        title: "Orders",
        route: routes.orders
    },{
        icon: readerOutline,
        title: "Inventory",
        route: routes.inventory
    },{
        icon: shareSocialOutline,
        title: "Share Store",
        route: "share"
    },{
        icon: homeOutline,
        title: "Home",
        route: routes.sales
    },{
        icon: settingsOutline,
        title: "Settings",
        route: routes.settings
    }
];

export const searchFilers = [
    "More", //this should remain in position 0
    "Most Resent",
    "Deals"
];

class Address{
    countries(){
        const COUNTRIES =  getCountries();
        if (COUNTRIES) return COUNTRIES;
        return [];
    }
    states(countryCode){
        const STATES = getStates(countryCode);
        if (STATES) return STATES;
        return [];
    }
}
export const addr = new Address();