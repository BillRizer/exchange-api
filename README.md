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



