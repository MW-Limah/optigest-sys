### FACULDADE GRAN (https://faculdade.grancursosonline.com.br/)

#### Projeto na Disciplina Projeto Integrador - Gestão de Estoque

### InvsysCo

- Frontend baseado em React.js no framework Next.js
- Backend baseado em Nest.js
- Banco de dados pelo Supabase (PostgreSQL)

Controladores

1. Controlador de produtos
   Esse controller é responsável por gerenciar as operações relacionadas aos produtos, como criar, ler, atualizar e deletar (CRUD). Ele vai interagir com o banco de dados para armazenar informações sobre cada produto: nome, descrição e código de barras.

2. Controlador de fornecedores
   Similiar ao de produtos, esse deverá gerenciar as operações relacionadas aos fornecedores. ele cuida dos detalhes como nome, CNPJ, endereço e contato.

3. Controlador de Associação Produto/Fornecedor:
   Este é um controlador especializado que lida com a relação entre produtos e fornecedores.
   O controlador de associação permite associar um produto a um fornecedor, desassociá-los e consultar quais produtos são fornecidos por um determinado fornecedor (e vice-versa).

Link do app no Replit.com - [Visite o Projeto](http://localhost:3000)

Banco de dados

#### 1. Tabela 'products'

| Column          | Type                                |
| --------------- | ----------------------------------- |
| id              | INTEGER (PK) AUTOINCREMENT          |
| name            | TEXT NOT NULL                       |
| cod_bar         | TEXT UNIQUE NOT NULL                |
| description     | TEXT NOT NULL                       |
| quantity        | INTEGER                             |
| category        | TEXT NOT NULL                       |
| expiration_date | DATE                                |
| image           | BLOB                                |
| created_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
| updated_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

#### 2. Tabela 'suppliers'

| Column          | Type                                |
| --------------- | ----------------------------------- |
| id              | INTEGER (PK) AUTOINCREMENT          |
| name_enterprise | TEXT NOT NULL                       |
| cnpj            | TEXT UNIQUE NOT NULL                |
| address         | TEXT NOT NULL                       |
| phone           | TEXT NOT NULL                       |
| email           | TEXT NOT NULL                       |
| main_contact    | TEXT NOT NULL                       |
| created_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
| updated_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

#### 3. Tabela 'product_suppliers'

| Column      | Type                                  |
| ----------- | ------------------------------------- |
| id          | INTEGER (PK) AUTOINCREMENT            |
| product_id  | INTEGER NOT NULL (FK -> products.id)  |
| supplier_id | INTEGER NOT NULL (FK -> suppliers.id) |

UNIQUE (product_id, supplier_id)

| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
