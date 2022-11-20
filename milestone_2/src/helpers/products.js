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
}