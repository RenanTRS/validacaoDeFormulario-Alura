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