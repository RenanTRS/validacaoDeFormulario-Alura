export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
    } else{
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemErro(tipoInput, input);
    }
}

const tipoErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é valido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve pelo menos conter uma letra minúscula e uma maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio',
        customError: 'O CPF digitado não é válido'
    }
}

const validadores = {
    //Objeto contendo funçoes anônimas para validar inputs
    dataNascimento: (input)=>{validaDataNascimento(input)},
    cpf: (input)=>{validaCPF(input)}
}

function mostraMensagemErro(tipoInput, input){
    let mensagem = '';
    tipoErro.forEach((erro)=>{
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoInput][erro];
        }
    })
    return mensagem;
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

function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, ''); //Regex que pega valores que não sejam números
    console.log(cpfFormatado);

    let mensagem = '';
    
    if(!checaCPFRepetido(cpfFormatado)){
        //Enquando a mensagem não for vazia, o atributo required não deixará passar
        mensagem = 'O CPF não é válido';
    }

    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    let cpfValido = true;
    
    valoresRepetidos.forEach(valor=>{
        if(valor == cpf){
            cpfValido = false;
        }
    });

    return cpfValido;
}