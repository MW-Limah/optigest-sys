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
| id              | SERIAL (PK)                         |
| name            | VARCHAR(150) NOT NULL               |
| cod_ean         | VARCHAR(20) UNIQUE                  |
| description     | TEXT                                |
| category        | TEXT                                |
| expiration_date | DATE                                |
| active          | BOOLEAN DEFAULT TRUE                |
| created_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
| updated_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

#### 2. Tabela 'suppliers'

| Column          | Type                                |
| --------------- | ----------------------------------- |
| id              | SERIAL (PK)                         |
| name_enterprise | VARCHAR(150) NOT NULL               |
| cnpj            | VARCHAR(18) UNIQUE                  |
| email           | VARCHAR(150)                        |
| phone           | VARCHAR(30)                         |
| active          | BOOLEAN DEFAULT TRUE                |
| created_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
| updated_at      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

#### 3. Tabela 'product_suppliers'

| Column            | Type                    |
| ----------------- | ----------------------- |
| product_id        | INT (FK → product.id)   |
| supplier_id       | INT (FK → suppliers.id) |
| purchase_price    | DECIMAL(10,2)           |
| lead_time_days    | INT                     |
| minimum_order_qty | INT                     |
