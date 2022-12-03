//funcao que retorna um array de produtos cadastrados
//sem produtos retorna NULL
export function getProductsArray(){
    let productIdList = localStorage.getItem("productList");
    //vazio é quando tinha e nao tem mais, nulo é pq nunca teve
    if(productIdList === null || productIdList === ""){
        return null;
    };
    
    productIdList= productIdList.split(" ");
    let productList = [];
    for(let productId of productIdList){
        //precisa parsear pq localStorage só guarda em string
        let product = JSON.parse(localStorage.getItem(productId));
        productList.push(product);
    }
    return productList;
}

export function removeProduct(id){
    localStorage.removeItem(id);
    var products = localStorage.getItem('productList');
    var ids = products.split(' ');

    var index = 0;

    for (let i of ids){
        if (i == id){
            ids.splice(index, 1);
        }

        index++;
    }

    localStorage.setItem('productList', ids.join(' '));
}

export function getProduct(id){
    let product = localStorage.getItem(id);
    //vazio é quando tinha e nao tem mais, nulo é pq nunca teve
    if(product === null || product === ""){
        return null;
    };
    
    //precisa parsear pq localStorage só guarda em string
    product = JSON.parse(localStorage.getItem(id));

    return product;
}