

# Pra onde foi

Repositório da API do Pra onde foi
## Deploy

Primeiramente, instalar os pacotes necessários
```bash
npm install
```

Para executar as migrations
```bash
node ace migration:run
```

Para executar os seeders
```bash
node ace db:seed --files="database/seeders/main_seeder.ts"
```

Para executar o servidor em modo de desenvolvimento
```bash
node ace serve --watch
```

## Documentação da API
