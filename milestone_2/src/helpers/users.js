//funcao que retorna um array de usuarios cadastrados
//sem usuarios retorna NULL
export function getUsersArray(){
    let userEmailList = localStorage.getItem("userList");
    //vazio é quando tinha e nao tem mais, nulo é pq nunca teve
    if(userEmailList === "" || userEmailList === null){
        return null;
    
    };
    
    userEmailList= userEmailList.split(" ");
    let userList = [];
    for(let userEmail of userEmailList){
        //precisa parsear pq localStorage só guarda em string
        let user = JSON.parse(localStorage.getItem(userEmail));
        userList.push(user);
    }
    return userList;
}