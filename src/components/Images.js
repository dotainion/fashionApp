import shoppingBags from './../images/shopping-bags.jpg';

class Images{
    constructor(){
        this.base64 = "data:image;base64,";
        this.noItemImg = shoppingBags;
    }
}


var image = new Images();
export default image;