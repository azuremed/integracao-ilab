# INTEGRAÇÃO-ILAB

## Introdução

Componente para ser executado no ambiente local do cliente, para recebimentos dos arquivos XML e gravação desses arquivos na pasta configurada no arquivo .env.

Os arquivos XML são gerados quando é realizada Integracão/Etiquetas no klingo.

## Sobre

Integração entre o Klingo e o Ilab.

## Requisitos

1. NodeJS

## Instalação

Fazer o download do NodeJS (https://nodejs.org/) e instalar.

## Download do projeto e das dependências

Deve ser criado um diretório aonde ficará armazenada a aplicação. De dentro do diretório, via linha de comando deve ser executado o comando abaixo para baixar o projeto.

    git clone https://github.com/azuremed/integracao-ilab
    cd integracao-pacs
    cp .env.exemplo .env
    npm install

## Configurar a aplicação

Entre em contato com o suporte do Klingo para configurar as variáveis de ambiente no arquivo ".env"

## Rodando a aplicação

Executar o comando abaixo:

    node index.js

### Pronto!
