

# Iconst

Repositório da API do Iconst
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

#### Login de usuário
```http
POST /login
```

#### Logout de usuário
```http
POST /logout
```

### Criar conta de usuário
```http
POST /usuario/create
```

### Atualizar cadastro do usuario
```http
PATCH /usuario/update/cadastro/:id
```

### Remover foto de perfil
```http
PATCH /usuario/update/removerfoto/:id
```

### Retornar dados pessoais do usuario
```http
GET /usuario/info/usuario/:id
```

### Retornar todos dados do usuario
Dados pessoais, endereços e formas de pagamento
```http
GET /usuario/info/allInfo/:id
```

### Criar endereço do usuário
Dados pessoais, endereços e formas de pagamento
```http
POST /usuario/create/endereco/:id
```

### Atualizar endereço do usuario
```http
PATCH /usuario/update/endereco/:enderecoId
```

### Retornar todos endereços do usuario
```http
GET /usuario/info/endereco/:id
```

### Retornar endereço específico do usuario 
```http
GET /usuario/info/enderecobyid/:enderecoId
```

### Criar forma de pagamento do usuário
```http
POST /usuario/create/formaPagamento/:id
```

### Atualizar forma de pagemento do usuario
```http
PATCH /usuario/update/formaPagamento/:fpId
```

### Retornar todas formas de pagamento do usuario
```http
GET /usuario/info/formaPagamento/:id
```

### Retornar forma de pagamento específica do usuario 
```http
GET /usuario/info/formaPagamentobyid/:formaId
```

### Solicitar cadastro como vendedor
```http
POST /vendedor/create/solicitacaoVendedor/:id
```

### Atualizar perfil da loja
```http
PATCH /vendedor/update/perfilLoja/:vendedorId
```

### Remover foto de perfil da loja
```http
PATCH /vendedor/update/removerfoto/:id
```

### Retornar dados da loja com base no id do vendedor
```http
GET /vendedor/info/byIdVendedor/:vendedorId
```

### Retornar dados da loja com base no id do usuario
```http
GET /vendedor/info/byIdUsuario/:usuarioId
```

### Cadastrar produto
```http
POST /vendedor/create/produto/:vendedorId
```

### Inativar produto
```http
PATCH /vendedor/update/inativarProduto/:produtoId
```

### Ativar produto
```http
PATCH /vendedor/update/ativarProduto/:produtoId
```

### Editar produto
```http
PATCH /vendedor/update/editarProduto/:produtoId
```

### Informações do produto pelo id do vendedor
```http
GET /vendedor/info/produtoVendedor/:vendedorId
```

### Adicionar item ao carrinho
```http
POST /carrinho/create/adicionarItem/
```

### Remover item do carrinho
```http
DELETE /carrinho/delete/removerItem/:produtoId
```

### Atualizar quantidade do item no carrinho
```http
PATCH /carrinho/update/editarQuantidade/:produtoId
```

### Retornar itens do carrinho
```http
GET /carrinho/info/itensCarrinho
```

### Retornar itens do carrinho e todas suas informações relacionadas
```http
GET /carrinho/info/allItensCarrinho
```

### Criar pedido
```http
POST /pedido/create/criarPedido/
```

### Selecionar endereço e forma de pagamento para o pedido
```http
PATCH /pedido/create/selecionarEnderecoPagamento
```

### Criar pedido
```http
POST /pedido/create/finalizarPedido/
```

### Informações do carrinho temporário
```http
GET /pedido/info/carrinhoTemp/
```

### Retorna itens do pedido
```http
GET /pedido/info/itensPedido/
```

### Retorna itens do pedido a partir do status
```http
GET /pedido/info/itensPedidoByStatus/:statusId
```

### Retorna categorias ativas
```http
GET /administrador/info/categoriaAtiva/
```

### Retorna categorias pela URL
```http
GET /administrador/info/categoriabyUrl/:categoriaUrl
```

### Retorna produtos ativos
```http
GET /vendedor/info/produtoAtivo
```

### Retorna produtos ativos através do id do vendedor
```http
GET /vendedor/info/produtoAtivoVendedor/:vendedorId
```

### Retorna produtos através do id da categoria
```http
GET /vendedor/info/produtoCategoria/:categoriaId
```

### Retorna produtos com base no filtro dos atributos
```http
POST /vendedor/info/produtoByAtributo/
```






## Rotas para administradores 
### Aprovar solicitação do usuário para ser vendedor
```http
POST /administrador/aprovar/vendedor/:solicId
```

### Rejeitar solicitação do usuário para ser vendedor
```http
POST /administrador/rejeitar/vendedor/:solicId
```

### Retornar todas solicitações de vendedores
```http
GET /administrador/info/allSolicVend
```

### Retornar todas solicitações de vendedores por status
```http
GET /administrador/info/solicVendbystatus/:statusId
```

### Criar categoria de produtos
```http
POST /administrador/create/categoria
```

### Editar categoria de produtos
```http
PATCH /administrador/update/categoria/:categoriaId
```

### Ativar categoria de produtos
```http
PATCH /administrador/ativar/categoria/:categoriaId
```

### Inativar categoria de produtos
```http
PATCH /administrador/inativar/categoria/:categoriaId
```

### Retornar todas categorias cadastradas
```http
GET /administrador/info/categoria
```

### Retornar categoria especifica
```http
GET /administrador/info/categoriabyid/:categoriaId
```




## Parâmetos
    | Parâmetro   | Tipo     | Descrição |
    | :---------- | :---     | :-------- |
    | `cpf`       | `string` | **Obrigatório**. Cadastro de pessoa física |
    | `password`       | `string` | **Obrigatório**. Senha do usuário |
    | `first_name`| `string` | **Obrigatório**. Primeiro nome do usuário |
    | `last_name`| `string` | **Obrigatório**. Sobrenome do usuário|
    | `date_birth`| `string` | **Obrigatório**. Data de nascimento do usuário no formato _YYYY-MM-DD_|
    | `photo_url`| `string` | Link para a foto de perfil do usuário|
    | `phone`| `string` | **Obrigatório**. Número de telefone do usuário|
    | `email`| `string` | **Obrigatório**. E-mail de contato do usuário|
    | `home_city`| `number` | **Obrigatório**. Código da cidade de residência do usuário|
    | `institution_id`| `number` | **Obrigatório**. Código da institutição do usuário|
    | `registration`| `string` | **Obrigatório**. Matrícula/SIAPE profissional do usuário|
    | `office_career`| `number` | **Obrigatório**. Código do ofício/cargo do usuário|
    | `office_specialization`| `number` | **Obrigatório**. Código do conhecimento específico do usuário|
    | `cbo`| `string` | ID de CBO do usuário|