# PokeApp ⚡ Ϟ(๑⚈ ․̫ ⚈๑)⋆

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de Desenvolvedor Full Stack Júnior na BSN Tecnologia. A proposta é criar uma aplicação em Ionic + Angular que consome dados da PokéAPI, com foco em uma interface funcional, responsiva e intuitiva e um toque pessoal.

A estrutura do app foi organizada com base em boas práticas de modularização, separando páginas, serviços e modelos. Estou utilizando Angular com injeção de dependência para facilitar a manutenção e reutilização do código. A comunicação com a API é feita de forma assíncrona e isolada em uma service dedicada.

Ainda estou evoluindo o layout e as funcionalidades, mas já implementei a listagem de Pokémons e estou trabalhando na tela de detalhes e no sistema de favoritos. Os commits no repositório são frequentes e refletem cada etapa do progresso.
A ideia é manter o código limpo, claro e fácil de entender, seguindo um padrão de organização que eu usaria em produção.

---

## ⚡Abordagem Estética⚡

A interface do PokeApp foi pensada para **evocar o universo visual clássico dos jogos Pokémon**, unindo nostalgia com design moderno e responsivo.

### 🕹️⚡Estilo Retrô com Fonte Temática🕹️⚡

- A fonte principal utilizada é a **Press Start 2P**, uma fonte pixelada retrô que remete diretamente aos primeiros jogos da franquia no Game Boy.
- Essa escolha dá ao app uma personalidade nostálgica e distinta, alinhando-se perfeitamente ao tema Pokémon.
- Cada Pokémon possui um estilo visual dinâmico baseado em seu **tipo elemental** (fogo, água, planta, etc.).

- O layout foi construído com **componentes modulares** do Ionic, mantendo responsividade em diferentes tamanhos de tela.
- A interface prioriza a clareza e a organização das informações, com uso consciente de **espaçamento, contraste e ícones visuais**.

- O botão de “Detalhes” é inspirado na estética do **Pokébola**
- Ícones de estrela para favoritar têm destaque visual e ficam em locais estratégicos, tanto na home quanto nos detalhes.

- Elementos como botões grandes, textos legíveis e layout em grid facilitam a navegação tanto em **mobile quanto desktop**.
- O uso de cor e forma ajuda a guiar o olhar do usuário intuitivamente, reforçando a experiência temática.


## ⚡Funcionalidades⚡

- Listagem paginada dos Pokémons (20 por vez), com botão para **carregar mais**.
- Sistema de **busca dinâmica**, que combina filtro local no que já foi carregado com busca global eficiente via cache dos nomes.
- Página de **detalhes completa**, exibindo:
  - Cadeia de evolução e navegação entre elas,
  - Descrição de cada Pokemon
  - Habilidades,
  - Estatísticas.
- Sistema de **favoritos** com persistência no `localStorage`, incluindo:
  - Botão de estrela para favoritar/desfavoritar diretamente no card.
- Estilização visual dinâmica baseada no **tipo do Pokémon**, com cores e efeitos aplicados aos cards e imagens.

## ⚙️⚡ Tecnologias Utilizadas

- [Angular](https://angular.io/) 17+
- [Ionic](https://ionicframework.com/) 7+
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [RxJS](https://rxjs.dev/)
- [PokéAPI](https://pokeapi.co)


## ⚡ Diferenciais Técnicos ⚡

- **Componentização organizada** com uso de `@Injectable` services, garantindo separação de responsabilidades e fácil manutenção.
- **Injeção de dependência** aplicada corretamente no gerenciamento de dados e comunicação com a PokéAPI.
- **Persistência local** usando `localStorage` para manter os Pokémons favoritos mesmo após recarregamento da página.
- **Busca otimizada** com sistema de cache local de nomes para evitar chamadas desnecessárias à API.
- **Paginação manual** com carregamento incremental dos Pokémons, otimizando a performance e a experiência do usuário.
- **Responsividade real** com layout adaptado para diferentes tamanhos e orientações de tela, incluindo landscape.
- **Design personalizado** inspirado na identidade visual da franquia Pokémon, com estilos dinâmicos por tipo elemental.
- **Código limpo e estruturado** com uso de boas práticas, tipagem forte com TypeScript e commits descritivos.
- **Deploy na Vercel**, pronto para produção como aplicação estática acessível diretamente via navegador.
- **README documentado** explicando as decisões técnicas, abordagem estética e funcionamento da aplicação.


## ⚡⚡Instalação e Execução Ϟ(๑⚈ ․̫ ⚈๑)⋆

```bash
# Instale as dependências
npm install

# Rode o app localmente
ionic serve


