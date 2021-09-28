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
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio',
        patternMismatch: 'O CEP digitado não é válido'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio'
    }
}

const validadores = {
    //Objeto contendo funçoes anônimas para validar inputs
    dataNascimento: (input)=>{validaDataNascimento(input)},
    cpf: (input)=>{validaCPF(input)},
    cep: (input)=>{recuperarCEP(input)}
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
    
    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)){
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

function checaEstruturaCPF(cpf){
    const multiplicador = 10;
    return checaDigitoVerificador(cpf, multiplicador);
}

function confirmaDigito(soma){
    return 11 - (soma % 11);
}

function checaDigitoVerificador(cpf, multiplicador){
    if (multiplicador >= 12){
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split(''); //.substr fatia a string, .split('') vai colocar cada número como um elemento de vetor
    const digitoVerificador = cpf.charAt(multiplicador - 1); //.charAt vai pegar a string na posição indicada;
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma += cpfSemDigitos[contador] * multiplicadorInicial;
        contador++;
    }

    if(digitoVerificador == confirmaDigito(soma)){
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }
    
    return false;
}

function recuperarCEP(input){
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json`;
    
    /*Ainda não sei o motivo do options*/
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'aplication/jason;charset=utf-8'
        }

    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing){//Impede qeu faça a requisição caso contenha esses erros
        //Usa url da API transforma o retorno em .json e passa para um data (objeto)
        fetch(url, options).then(response => response.json()).then(data => console.log(data));
    }
}