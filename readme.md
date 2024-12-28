# Sorteios API

Bem-vindo à documentação do sistema de sorteios! Este projeto é um sistema completo para criar e gerenciar sorteios de forma segura e eficiente, oferecendo funcionalidades para diferentes perfis de usuários: administradores, entidades e participantes. Este repositório está aberto à colaboração de desenvolvedores para expandir suas funcionalidades. Contribua e ajude-nos a melhorar!

## Visão Geral do Sistema
Este sistema foi projetado para permitir que entidades criem sorteios e que usuários participem deles de forma justa, com funcionalidades robustas para segurança, relatórios e notificações automáticas.

### Principais Características
1. **Cadastro e autenticação segura de usuários**.
2. **Gerenciamento de perfis**: diferentes permissões para participantes, entidades e administradores.
3. **Criação e gestão de sorteios**: inclusão de itens, categorias e políticas de participação.
4. **Participação controlada**: cada participante pode concorrer a um único item por sorteio.
5. **Condução de sorteios e notificações automáticas aos vencedores**.
6. **Histórico e relatórios em PDF**.
7. **Sistema de reclamações**: com gerenciamento por administradores.
8. **Segurança aprimorada**: criptografia de senhas, validação de documentos e controle de acesso.

---

## Tecnologias Utilizadas
- **Node.js** com Express.js para o backend.
- **MySQL** como banco de dados.
- **JWT** para autenticação e segurança.
- **Bibliotecas auxiliares**: bcrypt para criptografia de senhas, nodemailer para envio de emails e cron para agendamento de tarefas.
- **Gerador de PDFs**: para relatórios e listas de vencedores.
- **TypeScript**: para tipagem e manutenção do código.

---

## Instalação e Configuração
### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/sorteios-api.git
cd sorteios-api
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente
Crie um arquivo `.env` com as seguintes variáveis:
```env
DATABASE_URL=
PORT=
MAIL_MAILER=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=
JWT_SECRET= 
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGEIN_SENDER_ID=
APP_ID=
MEASUREMENT_ID=

```

### Passo 4: Migrar o Banco de Dados
Execute as migrações para configurar o banco de dados:
```bash
npm run vercel-build
```

### Passo 5: Iniciar o Servidor
```bash
npm start
```
A API estará disponível em `http://localhost:3000`.

---


## Exemplos de Uso
### 1. Registro de Novo Usuário
**Requisição:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senhaSegura123"
}
```
**Resposta:**
```json
{
  "message": "Usuário registrado com sucesso!"
}
```

### 2. Criação de Sorteio
**Requisição:**
```json
{
  "name": "Sorteio de Natal",
  "date": "2024-12-25",
  "policy": "Um item por participante"
}
```
**Resposta:**
```json
{
  "message": "Sorteio criado com sucesso!",
  "raffleId": "12345"
}
```

### 3. Participação em Sorteio
**Requisição:**
```json
{
  "raffleId": "12345",
  "itemId": "67890"
}
```
**Resposta:**
```json
{
  "message": "Inscrição realizada com sucesso!"
}
```

---

## Contribuição
Contribuições são bem-vindas! Aqui estão algumas maneiras de ajudar:
1. **Relatar bugs**: Abra uma issue descrevendo o problema encontrado.
2. **Adicionar funcionalidades**: Proponha melhorias através de pull requests.
3. **Melhorar a documentação**: Sugerir ajustes ou exemplos mais claros.

Siga as boas práticas de desenvolvimento e garanta que seus commits sejam descritivos e organizados.
