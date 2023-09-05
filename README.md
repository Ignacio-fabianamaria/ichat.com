# IChat.com 💬

## Comandos de pacotes instalados n projeto:

<details>

- npm install socket.io
- npm install express
- npm install typescript --save-dev
- npm install tsx --save-dev
- npm install @types/express --save-dev
- npx tsc --init
- npm install bcrypt
- npm install @types/bcrypt --save-dev
- npm install jsonwebtoken
- npm install jsonwebtoken @types/jsonwebtoken



</details>

## Requisitos:

<details>

### Registro de usuário:

- [x] O sistema deve permitir que novos usuários se cadastrem fornecendo nome, email e senha.
- [x] O sistema deve verificar se o email fornecido pelo usuário é válido e único.

### Autenticação e Login:

- [x] Os usuários registrados devem poder fazer login no sistema fornecendo seu email e senha.
- [x] O sistema deve autenticar as credenciais fornecidas e conceder acesso apenas aos usuários váidos.

### Listagem de Pessoas:

- O sistema deve fornecer uma lista de pessoas disponíveis para iniciar uma conversa.
- A lista de pessoas fornecida não precisa de filtros adicionais.

### Iniciar conversa:

- Os usuários devem poder iniciar uma conversa com outra pessoa selecionada na lista.
- O sistema deve fornecer uma interface para enviar mensagens em tempo real entre os usuários envolvidos na conversa.

</details>

## Regras de negócio

<details>
  
### Autenticação:
  
- [x] Apenas usuários registrados podem acessar o sistema.
- As credenciais de login devem ser autenticadas antes de permitir o acesso.

### Registro:

- [x] O email fornecido durante o registro deve ser válido e único para cada usuário.
- [x] O sistema não deve permitir registros duplicados com o mesmo email.

</details>

## Diagrama de classes:

[Diagrama](https://drive.google.com/file/d/189dpiozRSNUfhFY9DFrT3Y5aVfJsYGs7/view?usp=sharing)
