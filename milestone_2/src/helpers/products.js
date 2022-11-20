//funcao que retorna um array de produtos cadastrados
//sem produtos retorna NULL
export function getProductsArray(){
    let productUuidList = localStorage.getItem("productList");
    //vazio é quando tinha e nao tem mais, nulo é pq nunca teve
    if(productUuidList === null || productUuidList === ""){
        return null;
    
    };
    
    productUuidList= productUuidList.split(" ");
    let productList = [];
    for(let productUuid of productUuidList){
        //precisa parsear pq localStorage só guarda em string
        let product = JSON.parse(localStorage.getItem(productUuid));
        productList.push(product);
    }
    return productList;
}