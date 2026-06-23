# 🏷️ Logistics Label Management System

Sistema web desenvolvido para automatizar a geração e impressão de etiquetas utilizadas em operações logísticas.

A aplicação consulta automaticamente as informações dos pedidos diretamente no banco de dados do ERP, preenchendo diferentes modelos de etiquetas sem necessidade de digitação manual, reduzindo erros operacionais e agilizando o processo de expedição.

O sistema permanece em produção e é utilizado diariamente em ambiente corporativo.

---

## 🚀 Tecnologias Utilizadas

- Angular
- TypeScript
- Node.js
- Express.js
- MySQL

---

## 🧠 Funcionalidades

- 📦 Consulta automática de pedidos no banco de dados
- 🏷️ Geração automática de etiquetas logísticas
- 🖨️ Impressão de etiquetas Zebra
- 🔍 Consulta de pedidos
- 📍 Impressão de etiquetas de localização
- 🚚 Etiquetas para volumes
- 🛞 Etiquetas para pneus
- 📦 Etiquetas de garantia
- ⚠️ Etiquetas de produto frágil
- 📋 Etiquetas de conferência
- ➕ Etiquetas de excesso
- 🔒 Etiquetas de segurança
- ⬆️ Etiquetas "Lado para Cima"
- 🔢 Impressão de etiquetas individuais ou em intervalo

---

## 📸 Demonstração

*As imagens e demonstrações serão adicionadas futuramente.*

---

## 📂 Estrutura do Projeto

```text
src
├── app
│   ├── components
│   ├── pages
│   ├── services
│   ├── models
│   └── guards
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── database
│   └── server.js
│
└── package.json
```

---

## ⚙️ Como Funciona

O sistema recebe o número do pedido informado pelo usuário e realiza uma consulta diretamente no banco de dados do ERP.

Após localizar o pedido, todas as informações necessárias são carregadas automaticamente, permitindo a geração do modelo de etiqueta correspondente.

Dependendo da necessidade operacional, o usuário pode selecionar diferentes tipos de etiquetas, imprimir uma única etiqueta ou definir um intervalo para impressão.

Esse processo elimina preenchimentos manuais e reduz significativamente erros durante a expedição.

---

## 📈 Principais Recursos

- Integração com banco de dados do ERP
- Consulta automática de informações
- Geração dinâmica de etiquetas
- Interface simples para operação diária
- Redução de erros de digitação
- Agilidade no processo de impressão
- Sistema desenvolvido para uso em ambiente corporativo

---

## 💡 Desafios do Projeto

Durante o desenvolvimento deste sistema foram aplicados conceitos como:

- Integração entre frontend e backend
- Consumo de dados provenientes do ERP
- Manipulação e tratamento de informações para impressão
- Organização da arquitetura da aplicação
- Desenvolvimento de múltiplos módulos em Angular
- Comunicação entre Node.js e MySQL
- Automação de processos internos

---

## 👨‍💻 Contexto do Projeto

Este sistema foi desenvolvido para atender uma necessidade operacional real, substituindo processos manuais na geração de etiquetas logísticas.

Além da automatização da impressão, a aplicação centralizou diferentes modelos de etiquetas em uma única interface, tornando o processo mais rápido, padronizado e confiável.

Atualmente o sistema continua sendo utilizado em ambiente de produção.

---

## 👨‍💻 Autor

Desenvolvido por **Gui Jaeke**
