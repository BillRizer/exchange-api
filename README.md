## Funcionalidades
- Cadastro de cliente.
- Login do cliente e autenticação [jwt] e rotas privadas.
- Ao fazer um depósito, o cliente recebe um e-mail. A implementação foi feita utilizando um sistema de filas com RabbitMQ e com envio de e-mail para o Mailtrap. Esta estratégia visa não perder nenhum e-mail, mesmo com volume alto.

*A funcionalidade de depósito não persiste na base de dados, apenas dispara um  evento de e-mail para o cliente.*

- Ao consultar o valor do cripto no mercado bitcoin é feito um cache de 15 minutos e é renovado após o cache expirar, outra estratégia para resolver a alta demanda de requisições no endpoint.



## tecnologias

- Typescript
- Express
- PostgreSQL
- Jest
- Typeorm
- Winston - Logs
- Migrations - Typeorm
- Validação usando DTOs
- Cache - Redis
- Filas - RabbitMQ
- Docker compose

## testes


## Como executar
Para ver os emails (fake) crie uma conta no https://mailtrap.io/
e adicione user e password no .env
![image](https://github.com/BillRizer/exchange-api/assets/5104527/9ae30eed-e7bc-49d7-bf5d-6e82696370f2)

```
# Renomeie o arquivo .env.sample para .env
mv .env.sample .env

docker-compose up --build -d

```


## Como usar

###  Cadastrar cliente
```
curl --request POST \
  --url http://0.0.0.0:3000/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "John Smith",
	"email": "email@email.com.br",
	"password": "my-pass-123456"
}'
```

### Autenticar 
```
curl --request POST \
  --url http://0.0.0.0:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "email@email.com.br",
	"password": "my-pass-123456"
}'
```

### Ver cotação do BTC
```
curl --request GET \
  --url http://0.0.0.0:3000/currency-quote \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN_HERE' \
```


### Fazer depósito - [envia email fake usando mailtrap]
```
curl --request POST \
  --url http://0.0.0.0:3000/deposit \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN_HERE' \
  --header 'Content-Type: application/json' \
  --data '{
	"amount":2545
}'
```

![image](https://github.com/BillRizer/exchange-api/assets/5104527/f305a3d9-29c4-48f1-a0a8-d041c193b5e5)

![image](https://github.com/BillRizer/exchange-api/assets/5104527/309d78f0-c305-4676-82c6-c17268031bde)

![image](https://github.com/BillRizer/exchange-api/assets/5104527/173d736d-0234-4257-8a77-6ab71adad66e)


