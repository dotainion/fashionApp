class Cart{
    ref = "cart-item-storage";
    add(item){
        let record = [];
        const data = this.get();
        if (data){
            record.push(item);
            for (let value of data) record.push(value);
            window.localStorage.setItem(this.ref,JSON.stringify(record));
        }else{
            window.localStorage.setItem(this.ref,JSON.stringify([item]));
        }
    }
    get(){
        const data = window.localStorage.getItem(this.ref);
        if (data) return JSON.parse(data);
        else return [];
    }
    updateQty(id,value){
        let index = 0;
        let data = this.get();
        for (let item of data){
            if (item.id === id){
                data[index]["qty"] = value;
                window.localStorage.setItem(this.ref,JSON.stringify(data));
                break;
            }
            index ++;
        }
    }
    delete(id){
        let index = 0;
        let data = this.get();
        for (let item of data){
            if (item.id === id){
                //data[index].splice(index,1);
                data.splice(index,1)
                window.localStorage.setItem(this.ref,JSON.stringify(data));
                break;
            }
            index ++;
        }
    }
}

const cart = new Cart();
export { cart };