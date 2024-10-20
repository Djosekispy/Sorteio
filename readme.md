### Levantamento de Requisitos para o Sistema de Sorteios

#### 1. **Requisitos Funcionais**

1. **Cadastro e Autenticação de Usuários**:
   - O usuário deve ser capaz de criar uma conta no sistema, fornecendo dados como nome, email, senha e outros detalhes pessoais.
   - O sistema deve permitir que o usuário faça login e logout com autenticação segura.
   - Recuperação de senha via email.

2. **Solicitação de Alteração de Perfil**:
   - Usuário pode solicitar a alteração do status do perfil para se tornar uma **Entidade** (usuário que pode criar sorteios).
   - Um administrador deve aprovar ou rejeitar essa solicitação.
   - Notificação ao usuário sobre o resultado da solicitação.

3. **Perfis de Usuário**:
   - **Usuário comum**: Pode visualizar sorteios, participar de sorteios e concorrer a um item por sorteio.
   - **Entidade**: Pode criar sorteios, definir políticas de participação, gerenciar categorias e itens do sorteio, e conduzir o sorteio.
   - **Administrador**: Gerencia o sistema, aprova entidades e monitora as atividades de sorteios e usuários.

4. **Criação de Sorteios**:
   - A **Entidade** pode criar sorteios, definindo informações como:
     - Nome do sorteio.
     - Data e hora de realização.
     - Política de participação (ex.: limite de um item por sorteio).
     - Categorias de itens (móveis, imóveis, eletrônicos, etc.).
     - Descrição e propriedades dos itens.

5. **Participação em Sorteios**:
   - Usuário comum pode se inscrever em sorteios disponíveis.
   - Usuário pode concorrer a apenas **um item por sorteio**.
   - Sistema deve validar a inscrição com base na política estabelecida pela entidade.

6. **Condução do Sorteio**:
   - A **Entidade** realiza o sorteio e gera uma lista de vencedores.
   - O sorteio pode ser gerado aleatoriamente ou com base em alguma lógica definida pela entidade.
   - Sistema gera um PDF com a lista dos vencedores.

7. **Notificação de Vencedores**:
   - Após a realização do sorteio, os vencedores devem ser notificados via email.
   - O email deve conter informações sobre o item ganho e instruções para retirada ou recebimento.

8. **Reclamações**:
   - Usuários podem registrar reclamações relacionadas a um sorteio, como problemas de participação ou resultado.
   - Reclamações devem ser associadas ao sorteio e ao usuário que a realizou.
   - Administradores devem poder visualizar, responder ou resolver reclamações.

9. **Relatórios e Exportações**:
   - Entidade pode gerar relatórios em PDF sobre os sorteios, incluindo a lista de todos os participantes e vencedores.
   - Administrador pode acessar relatórios detalhados sobre o uso do sistema, incluindo estatísticas de sorteios, usuários ativos e reclamações.

10. **Gerenciamento de Documentos**:
    - Usuários podem ser obrigados a enviar documentos como NIF, BI, entre outros, para validar sua participação em sorteios.
    - Esses documentos devem ser armazenados e associados ao perfil do usuário.

11. **Histórico de Sorteios e Participações**:
    - Usuários devem poder visualizar o histórico de sorteios em que participaram.
    - Entidades devem poder acessar o histórico dos sorteios que criaram e visualizar as inscrições e resultados.

#### 2. **Requisitos Não Funcionais**

1. **Segurança**:
   - O sistema deve garantir autenticação segura (uso de HTTPS, senhas criptografadas).
   - Validação de documentos para evitar fraudes nas participações.
   - Proteção contra múltiplas inscrições para um único item por sorteio.

2. **Escalabilidade**:
   - O sistema deve ser escalável para suportar múltiplos sorteios e um grande número de usuários simultaneamente.

3. **Desempenho**:
   - O sistema deve processar sorteios e gerar relatórios (PDFs) de maneira eficiente, sem causar atrasos significativos.

4. **Usabilidade**:
   - Interface amigável e intuitiva para usuários comuns e entidades.
   - Facilidade de navegação entre sorteios, inscrições e resultados.

5. **Notificações e Comunicações**:
   - O sistema deve ser integrado com um serviço de envio de email para enviar notificações automáticas (ex.: aprovação de perfil de entidade, notificações de vencedores).
   
6. **Backup e Recuperação de Dados**:
   - O sistema deve realizar backups automáticos e permitir a recuperação de dados em caso de falhas.

#### 3. **Detalhes Adicionais para Tornar o Sistema Mais Completo e Profissional**

1. **Painel Administrativo**:
   - Um painel robusto para administradores onde podem monitorar todas as atividades, ver estatísticas de sorteios, gerenciar reclamações e aprovar solicitações de alteração de perfil.

2. **Integração com Pagamentos** (Opcional):
   - Permitir que entidades paguem uma taxa para criar sorteios ou que usuários paguem para participar de sorteios, dependendo das políticas do sistema.

3. **Auditoria e Logs**:
   - Registrar todas as ações importantes, como a criação de sorteios, inscrição de usuários e reclamações para fins de auditoria.

4. **Validação de Documentos Automática**:
   - Um sistema automatizado para validar documentos submetidos pelos usuários, como verificação de validade de NIF ou BI.

5. **Sistema de Mensagens Internas**:
   - Um sistema de mensagens ou notificações dentro da plataforma para comunicação direta entre os administradores, entidades e usuários.


## Rotas do sistema

### 1. **Rotas de Autenticação**
Estas rotas tratam do cadastro, login e gerenciamento de sessões de usuários.

- **POST `/auth/register`**  
  Registra um novo usuário.
  
- **POST `/auth/login`**  
  Autentica o usuário e gera um token de sessão.

- **POST `/auth/logout`**  
  Encerra a sessão do usuário.

- **POST `/auth/forgot-password`**  
  Envia um email para redefinição de senha.

- **POST `/auth/reset-password`**  
  Permite redefinir a senha do usuário com base no token recebido via email.

### 2. **Rotas de Usuários e Perfis**
Estas rotas permitem gerenciar as informações de perfil dos usuários e a solicitação de alteração para uma **Entidade**.

- **GET `/users/me`**  
  Retorna as informações do perfil do usuário autenticado.

- **PUT `/users/me`**  
  Atualiza as informações do perfil do usuário autenticado (nome, email, endereço, etc.).

- **POST `/users/request-entity`**  
  Usuário comum solicita a alteração de perfil para uma **Entidade**.

- **GET `/users/:id`**  
  Retorna as informações do perfil de um usuário específico (usado por administradores).

- **GET `/users/me/participations`**  
  Retorna o histórico de participações do usuário autenticado em sorteios.

### 3. **Rotas de Administração (Aprovação de Entidades)**
Estas rotas permitem que administradores aprovem ou rejeitem solicitações de alteração de perfil para **Entidade**.

- **GET `/admin/entity-requests`**  
  Retorna todas as solicitações de usuários que pediram para se tornarem **Entidades**.

- **POST `/admin/entity-requests/:id/approve`**  
  Aprova a solicitação para o usuário se tornar uma **Entidade**.

- **POST `/admin/entity-requests/:id/reject`**  
  Rejeita a solicitação para o usuário se tornar uma **Entidade**.

### 4. **Rotas de Sorteios (Entidades)**
Rotas para a **Entidade** criar, gerenciar e conduzir sorteios.

- **POST `/raffles`**  
  Cria um novo sorteio.

- **PUT `/raffles/:id`**  
  Atualiza um sorteio existente.

- **GET `/raffles`**  
  Retorna todos os sorteios criados pela **Entidade** autenticada.

- **GET `/raffles/:id`**  
  Retorna os detalhes de um sorteio específico (itens, categorias, políticas, etc.).

- **DELETE `/raffles/:id`**  
  Exclui um sorteio (somente se ainda não foi realizado).

- **POST `/raffles/:id/draw`**  
  Conduz o sorteio e gera os vencedores.

- **GET `/raffles/:id/winners/pdf`**  
  Gera um PDF com a lista de vencedores do sorteio.

### 5. **Rotas de Participação (Usuários Comuns)**
Rotas para que os usuários comuns possam visualizar e participar dos sorteios.

- **GET `/raffles/available`**  
  Retorna todos os sorteios abertos para inscrição (baseado nas políticas definidas).

- **GET `/raffles/:id`**  
  Retorna os detalhes de um sorteio específico (para visualização antes de participar).

- **POST `/raffles/:id/participate`**  
  Inscreve o usuário autenticado em um sorteio específico e em um item definido.

- **DELETE `/raffles/:id/participate`**  
  Cancela a participação do usuário em um sorteio (se permitido pelas políticas).

### 6. **Rotas de Itens e Categorias**
Essas rotas ajudam as **Entidades** a gerenciar categorias e itens associados aos sorteios.

- **POST `/categories`**  
  Cria uma nova categoria para o sorteio.

- **PUT `/categories/:id`**  
  Atualiza uma categoria.

- **DELETE `/categories/:id`**  
  Remove uma categoria (somente se não estiver vinculada a nenhum item).

- **POST `/items`**  
  Adiciona um novo item a um sorteio e a uma categoria.

- **PUT `/items/:id`**  
  Atualiza um item existente.

- **DELETE `/items/:id`**  
  Remove um item do sorteio.

### 7. **Rotas de Reclamações**
Permitem que os usuários enviem reclamações e que administradores as gerenciem.

- **POST `/complaints`**  
  Envia uma nova reclamação sobre um sorteio.

- **GET `/complaints`**  
  Retorna todas as reclamações do usuário autenticado.

- **GET `/admin/complaints`**  
  Administradores podem visualizar todas as reclamações submetidas pelos usuários.

- **POST `/admin/complaints/:id/respond`**  
  Administradores podem responder a uma reclamação específica.

### 8. **Rotas de Notificação**
Rotas para gerenciar as notificações enviadas aos vencedores dos sorteios.

- **POST `/notifications/send-winners/:raffleId`**  
  Envia um email para os vencedores do sorteio específico.

- **POST `/notifications/send`**  
  Envia uma notificação personalizada para um usuário específico.

---

### Considerações Adicionais
- **Autorização e Controle de Acesso**: As rotas devem ser protegidas por middleware de autenticação e autorização. Por exemplo, somente **Entidades** podem criar sorteios, e apenas **Administradores** podem aprovar perfis de entidades.
  
- **Validação de Dados**: Utilizar ferramentas como `class-validator` com TypeScript para garantir que os dados enviados nas requisições estejam corretos.

- **Paginação e Filtros**: Para rotas que retornam listas (como sorteios disponíveis ou reclamações), incluir suporte a paginação e filtros, facilitando a navegação dos dados.

- **Mensageria e E-mails**: Rotas relacionadas a notificações e sorteios devem se integrar com serviços de envio de email (ex.: **nodemailer** ou um serviço de terceiros como **SendGrid**).
