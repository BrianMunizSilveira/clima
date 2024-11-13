# 🌦️ Web Site Clima & Imagens

Este repositório contém uma página web simples que exibe informações climáticas e imagens de fundo personalizadas. A aplicação utiliza a [API de Clima](https://openweathermap.org/api) para obter dados meteorológicos e a [API da Unsplash](https://unsplash.com/developers) para carregar imagens de fundo relacionadas ao clima da cidade selecionada.

## 🚀 Funcionalidades

- **Clima em Tempo Real**: Mostra a temperatura atual, umidade, velocidade do vento e descrição do clima para uma cidade escolhida.
- **Imagem de Fundo Dinâmica**: Carrega imagens de alta qualidade do Unsplash, para uma experiência visual mais imersiva.
- **Interface Simples**: Projeto minimalista, responsivo e fácil de usar.

## 📋 Pré-requisitos

Para rodar o projeto localmente, você precisará de:

- Navegador moderno compatível com HTML5, CSS3 e JavaScript
- Uma chave de API para a [API de Clima](https://openweathermap.org/api)
- Uma chave de API para a [API da Unsplash](https://unsplash.com/developers)

## 🔧 Configuração do Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/clima.git
   cd clima
   ```
2. **Configure as variáveis de ambiente**:
   As tres primeiras linhas do arquivo ´script.js´ são responsaveis pela chave de API. Adicione a sua chave de acesso:

```JavaScript
// Chaves de API
const apikey = ""; // Adicione sua Chave da API da OpenWeatherMap nesta linha.
const accessKeyUnsplash = ""; // Adicione sua da Chave de API da Unsplash nesta linha.
```

## 🔑 Como Obter as Chaves de API

Para configurar o projeto corretamente, você precisará de chaves de API da [API de Clima](https://openweathermap.org/api) e da [API da Unsplash](https://unsplash.com/developers). Siga os passos abaixo para adquiri-las:

### 1. Chave de API da OpenWeatherMap

1. Acesse o site da [OpenWeatherMap](https://openweathermap.org/) e crie uma conta, caso ainda não tenha uma.
2. Após o login, vá para o painel da sua conta e selecione "API keys".
3. Clique em "Create Key" para gerar uma nova chave de API.
4. Copie a chave gerada e substitua no arquivo `script.js`, na linha indicada:
   ```javascript
   const apikey = "SUA_CHAVE_AQUI";
   ```

### 2. Chave de API da Unsplash

1. Acesse o site da [Unsplash](https://unsplash.com/developers) e faça login ou crie uma conta, se necessário.
2. Após o login, vá até o Painel de Desenvolvedor e crie um novo aplicativo.
3. Preencha as informações do aplicativo e aceite os Termos de Uso.
4. Após criar o aplicativo, você verá a chave de acesso (Access Key).
5. Copie essa chave e substitua no arquivo `script.js` na linha indicada:

```JavaScript
const accessKeyUnsplash = "SUA_CHAVE_AQUI";
```

1. **Abra o arquivo** `index.html` no navegador para visualizar a aplicação.

## 🗂️ Estrutura do Projeto

```plaintext
clima/
├── css/
│   └── styles.css        # Arquivo de estilo principal
│   └── responsive.css    # Arquivo para configurações de responsividade
├── js/
│   └── script.js         # Lógica JavaScript para a aplicação
└── index.html            # Página HTML principal
```

## 🚀 **Como Usar**

1. Insira o nome de uma cidade no campo de busca.
2. Pressione o botão de busca.
3. A página exibirá as condições climáticas atuais e atualizará a imagem de fundo.

## 🛠️ **Tecnologias Utilizadas**

- **HTML5** para estrutura da página
- **CSS3** para estilização responsiva
- **JavaScript** para lógica da aplicação e consumo das APIs
- **API** de Clima para dados meteorológicos
- **API** da Unsplash para imagens de fundo

## 🎨 **Captura de Tela**

![Captura de tela](https://i.imgur.com/I1WzunA.png)

## 📜 Licença

Este projeto é licenciado sob a [Licença MIT](./LICENSE).

## Desenvolvido por Brian Muniz Silveira - Um projeto de aprendizado para consumir APIs e criar interfaces web dinâmicas.
