# Backend-Clinic

Aplicação backend feito com serverless aws, nodejs e mongoose que lista pedidos de exame e registra. Acesse [Documentação](src/docs/document.yaml) com [swagger editor](https://editor.swagger.io/).

## Getting Started

Instale na sua máquina:
[NodeJS](https://nodejs.org/en/) e crie um banco de dados e usuário no [MongoDB](https://cloud.mongodb.com/).
Tenho também configurado o serverless com AWS, siga as [instruções](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

### Install

```sh
git clone https://github.com/Cesar-Filho/backend-clinic.git
cd backend-clinic
yarn install
yarn serverless offline --cfg dev
```

--cfg dev é para pegar as configurações de ambiente do arquivo '.env.dev.json'.
Para testes crie o arquivo e coloque informações do seu servidor mongodb atlas, exemplo:

```sh
{
    "host": "mongodb+srv://<username>:<password>@cluster0-kw9mx.mongodb.net/test?retryWrites=true&w=majority",
    "username": "username",
    "password": "password"
}

```

### Using in your Front End

Faça chamadas API via axios ou similares.

### Remember

Caso deploy seja efetuado na AWS e não coloca faça:

```sh
yarn deploy --cfg dev
```

Não esqueça que será consumido recursos da sua conta AWS e o acesso não será mais pelo localhost e sim por url devolvida no final do deploy.

Good studies.
