export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
    } else{
        input.parentElement.classList.add('input-container--invalido');
    }
}

const validadores = {
    //Objeto contendo funçoes anônimas para validar inputs
    dataNascimento: (input)=>{validaDataNascimento(input)}
}

function validaDataNascimento(input){
    const dataRecebida = new Date(input.value);
    let mensagem = '';
    if(!maiorQue18(dataRecebida)){ //Se falso
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar';
    }
    
    input.setCustomValidity(mensagem); //Mensagem de validação do input
}

function maiorQue18(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()); //Passando no formato americano ano mês dia

    return dataMais18 <= dataAtual;
}