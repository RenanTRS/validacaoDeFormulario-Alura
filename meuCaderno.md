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