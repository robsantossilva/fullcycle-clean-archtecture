# <p style="text-align: center;">Clean Archtecture</p>

## <p style="text-align: center;">Conceitos Básicos</p>

### Origem
- Termo criado por Robert C. Martin (Uncle Bob) em 2012
- Tornou-se um livro
- Buzz word
- **Proteção do domínio** da aplicação
- **Baixo acoplamento** entre as camadas
- **Orientada a casos de uso**, que mostram de forma escancarada a intenção do sistema. **Screaming Architecture** (Arquitetura Gritando). 

#### Curiosidades sobre o Livro
- Ele fala especificamente sobre "Clean Archtecture somente em 7 páginas do livro"
- Tudo que ele fala sobre Clean Arch está literalmente em um artigo em seu blog


#### Por que devo ler o Livro
- Reforçar conhecimento e remover gaps básicos que muitas vezes nem percebemos que temos
- Componentes
- Arquitetura
- Limites arquiteturais
- Percepção sobre regras de negócios
- Beber água direto da fonte sempre importa

### Pontos importantes sobre arquitetura
- Arquitetura nos ajuda no Formato que o software terá
- Divisão de componentes
- Comunicação entre componentes
- Uma boa arquitetura vai facilitar o processo de desenvolvimento, deploy, operação e manutenção

"The strategy behind tha facilitation is to leave as many options open as possible, for as long as possible."
C. Martin Robert. Clean Archtecture (p. 136)

### Objetivos de uma boa arquitetura
O objetivo principal da arquitetura é dar suporte ao ciclo de vida do sistema. Uma boa arquitetura torna o sistema fácil de entender, fácil de desenvolver, fácil de manter e fácil de implantar. O objetivo final pe minimizar o custo de vida útil do sistema e maximizar a produtividade do programador.
C. Martin Robert. Clean Archtecture (p. 137)

### Regras vs Detalhes
- Regras de negócio trazem o real valor para o software
- Detalhes ajudam a suportar as regras
- Detalhes não devem impactar nas regras de negócio
- Frameworks, banco de dados, apis, não devem impactar as regras
  
**Lembra-se do DDD? Atacar a complexidade no coração do software**

### Use Cases
- Representam intenções que devem ser claras, sem muito esforço
- Clareza de cada comportamento do software
- Detalhes não devem impactar nas regras de negócios
- Frameworks, banco de dados, apis, não devem impactar as regras

### Use Cases - SRP
- Temos a tendencia de "reaproveitar" use cases por serem muito parecidos
- Ex: Alterar vs Inserir. Ambos consultam se o registro existe, persistem dados. Mas, são Use Cases diferentes. Porque?
- SRP (Single Responsability Principle) => Mudam por razões diferentes

**Duplicação Real vs Acidental**
**Use Cases contam uma história**

### Limites arquiteturais
Tudo que não impacta diretamente nas regras de negócio deve estar em um limite arquitetural diferente. Ex: Não será o frontend ou o banco de dados que mudarão as regras de negócio da aplicação.

**Exemplo:**
O Banco de Dados conhece as Regras de Negócio. As Regras de Negócio não conhecem o Banco de Dados.

[IMAGEM THE CLEAN ARCHTECTURE]

### Input vs Output
- No final do sia, tudo se resume a um Input que retorna um Output
- Ex: Criar um pedido (dados do pedido = input) Pedido criado (dados de retorno do pedido = Output)
- Simplifique seu raciocónio ao criar um software sempre pensando em Input e Output

![](./.github/clean-arch-model.jpg)


### DTO (Data Transfer Object)
- Trafegar dados entre os imites arquiteturais
- Objeto anêmico, sem comportamento
- Contém dados (Input ou Output)
- NÃO possui regras de negócio
- NÃO possui comportamento
- NÃO faz nada!
  
[API] ---> [CONTROLLER] ---> [USE CASE] ---> [ENTITY]
- Controller cria um DTO com os dados recebidos e envia para o Use Case
- Use Case executa seu fluxo, pega o resultado, cria um DTO para output e retorna para o Controller

### Presenters
- Objetos de transformação
- Adequa o DTO de output no formato correto para entregar o resultado
- Lembrando: Um sistema por ter diversos formatos de ntrega: ex: XML, JSON, Protobuf, GraphQL, CLI, etc.

``` javascript
const input = new CategoryInputDTO("name")
output = (new CreateCategoryUseCase()).createCategory(input)
presenter = new CategoryPresenter(output)
jsonResult = presenter.toJson()
xmlResult = presenter.toXML()
```

### Entities
- Entities da Clean Arch <> Entities do DDD
- Clean Architecture define entity como camada de regras de negócio
- Elas se aplicam em qualquer situação
- Não há definição explicita de como criar as entities
- **Normalmente utilizamos táticas do DDD**
- Entities = Agregados + Domain Services