var Items = require("./items");

var store = [];
for(i = 0; i < 5; i++){
    item = Items.generateItem();
    store.push(item);
}

exports.showStore = function (){
    var result = "";
    var idx = 1;
    store.forEach(function(it){
        result += idx +". .:: "+ it.name +" ::.<br>&nbsp&nbsp&nbsp"+ it.description+"<br>&nbsp&nbsp&nbsp+"+ it.value +" "+ it.attribute +"<br>&nbsp&nbsp&nbspPrice: "+ it.price+"<br>";
        idx++;
    });
    return result;
}

exports.buy = function (hero, idx){
    var msg = "";
    idx--;
    if (hero.gold >= store[idx].price){
        hero.items.push(store[idx]);
        hero.gold -= store[idx].price;
        msg = "Purchased the item: "+ store[idx].name;
        store.splice(idx, 1);
        store.push(Items.generateItem());
    }else{
        msg = "You don't have enough gold!";
    }
    return msg;
}

function isStoreField(field) {
    console.log(field);
    return field && field.type === FieldType.STORE;
}
