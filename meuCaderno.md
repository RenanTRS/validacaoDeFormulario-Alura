# Aula 1  - Validação com HTML
## Atributos de validação:  
- Uso do atributo **Required** para o input;  
- Uso do **type="email"**;  
- Uso do **type="password"**;  
- Uso do atributo **minlength="6"** Mínimo de caracteres;  
## Regex para senhas:  
Regex usada ```^(?=.*[a-z])(?=.*[A-Z])(?.=*[0-9])(?!.*[!@#$%^&*_=+-]).{6,12}$```  
## ```?=.*[a-z]```:  
- ```?=``` Permite a presença de certos caracteres;  
- ```.``` Impede a quebra de linha;  
- ```*[a-z]``` Permite apenas o que está dentro dos colchetes;  
---
## ```?!.*[!*&%*=+-_$]``` 
- ```?!``` Não permite a presença de certos caracteres;  
- Uso do atributo **pattern=" "** para colocar uma regex;  
- Uso do atributo **title=" "**;  
---

# Aula02 - Validações customizadas
## Lógica para validar data de nascimento:  
- Uso do atributo **type="date"**
- Para pegar a data de hoje basta criar um objeto sem parâmetro:  
```
const data = new Date();
```
- Para colocar um valor no formato de data:  
```
const data = new Date(input.value);
```
- Mudar posições da data (formato americano):  
```
(data)=>{
		const data = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate());

}
```
- Evento **blur** para quando perde o foco;
- Colocar mensagem de validação de input:  
```
input.setCustomValidity(mensagem);
```
## Melhorando o código:  
- Uso do data-atributes;  
- Criar uma função genérica para pegar todos os inputs:  
- Criar um objeto de funções anônimas que chamam o tratamento para o input;

# Aula 03 - Mensagens customizadas  
## Mostrando mensagem de erro:  
- **API**
- Selecionar o input com o devtools e no console digitar:  
```$0.validity```  
	Irá mostrar um objeto com propriedades de validação para inputs, podem ser usados para fazer a validação, usando apenas o ```$0``` mostra a tag selecionada;  
- valid "Deve ter conteúdo para ser true";  
- valueMissing "Ainda não sei o que é";  
- typeMismatch "Ainda não sei o que é";  
- patternMismatch "Trabalha junto com o atributo pattern do html";  
# Aula 04 - Validando CPF
## Calculando a soma dos dígitos:  
```const cpfSemDigitos = cpf.substr(0, 6).split(''); ``` Fatia a string da posição 0 até antes de chegar no 6, split serve para separar os itens em um array;  
```const digitoVerificador = cpf.charAt(multiplicador - 1);``` .charAt serve para pegar apenas um char do array na posição específica;  

# Aula 05 - Conectando com a API ViaCEP
## Validando CEP com regex:  
**regex:**  [\d]{5}-?[\d]{3}  
- Adiciona a regex no atributo pattern no input para cep;

## Buscando endereço pela API:  
- Cria variavel para pegar a url: https://viacep.com.br/ws/${cep}/json

## Preenchendo os campos de endereço:
- Com o uso da DOM para pegar os campos e passar para eles os valores do objeto.  

```
const cep = input.value.replace(/\D/g, '');
const url = `https://viacep.com.br/ws/${cep}/json`;

const options = {
	method: 'GET',
	mode: 'cors',
	headers: {
		'content-type': 'aplication/jason;charset=utf-8'
	}
}

if(!input.validity.patternMismatch && !input.validity.valueMissing){
	fetch(url, options).then(response => response.json()).then(data => {
		if(data.erro){
			input.setCustomValidity('Não foi possível buscar o CEP.');
			return;
		}
		input.setCustomValidity('');
		preencheCamposComCEP(data);
		return;
	});
}

function preencheCamposComCEP(data){
	const logradouro = document.querySelector('input[data-tipo="logradouro"]');
	const cidade = document.querySelector('input[data-tipo="cidade"]');
	const estado = document.querySelector('input[data-tipo="estado"]');

	logradouro.value = data.logradouro;
	cidade.value = data.localidade;
	estado.value = data.uf;
}
```