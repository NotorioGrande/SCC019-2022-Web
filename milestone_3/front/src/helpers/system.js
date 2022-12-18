export function delay() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 100);
  });
}

// funcão (adaptada) de jonathangoncalves (github)
export function telefone_validation(telefone) {
  //retira todos os caracteres menos os numeros
  telefone = telefone.replace(/\D/g, '');

  //verifica se tem a qtde de numero correto
  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  //Se tiver 11 caracteres, verificar se começa com 9 o celular
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

  //verifica se não é nenhum numero digitado errado (propositalmente)
  for (var n = 0; n < 10; n++) {
    //um for de 0 a 9.
    //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
    //caractere a ser repetido
    if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
  }
  //DDDs validos
  var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28, 31, 32, 33, 34,
    35, 37, 38, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 51, 53, 54, 55, 61, 62,
    64, 63, 65, 66, 67, 68, 69, 71, 73,
    74, 75, 77, 79, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 91, 92, 93, 94, 95,
    96, 97, 98, 99];
  //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

  if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

  //se passar por todas as validações acima, então está tudo certo
  return true;
}

export function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  // Elimina CPFs invalidos conhecidos	
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;
  // Valida 1o digito	
  let add = 0;
  for (let i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
    return false;
  // Valida 2o digito	
  add = 0;
  for (let i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
    return false;
  return true;
}

export function cartaoVencido(mesAno) {
  let ma = mesAno.split('-');
  let today = new Date();

  if (ma[0] < today.getFullYear()) {
    return true;
  }

  if (ma[0] == today.getFullYear() && ma[1] < today.getMonth() + 1) {
    return true;
  }

  return false;
}