# Documentação de Implantação: PortfolioHUB

**Aluno:** João Pedro (GitHub: [@joaopssx](https://github.com/joaopssx))  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** CEUB, Brasília  
**Disciplina:** Projeto Prático de Bootcamp, entrega final
**Data de Entrega:** 14/06/2026  

---

## Introdução

O **PortfolioHUB** é uma plataforma desenvolvida para centralizar e exibir projetos de portfólio digital, utilizando o GitHub como fonte primária de armazenamento e versionamento. Este documento detalha todo o processo de implantação da aplicação, desde o planejamento inicial até a configuração de segurança, gestão de versionamento e testes finais. 

Durante toda a trilha de desenvolvimento e implantação, utilizei o **Agy** (assistente Antigravity, baseado na tecnologia Google Gemini) como mentor e guia técnico.

---

## 1. Planejamento da Implantação

O planejamento da implantação do PortfolioHUB foi estruturado em fases incrementais, visando entregas contínuas e seguras. Para organizar as ideias, solicitei ao Agy que me ajudasse a montar um cronograma viável.

### Fases e Cronograma Estimado

| Fase | Título | Objetivo | Duração Estimada |
| :--- | :--- | :--- | :--- |
| **Fase 1** | Planejamento e Estruturação | Definir escopo, tecnologias e preparar o repositório base.
| **Fase 2** | Configuração do GitHub | Criar repositório, definir branch padrão, README e estrutura de pastas.
| **Fase 3** | Segurança e Permissões | Implementar 2FA, proteção de branches e chaves SSH.
| **Fase 4** | Gitflow e Colaboração | Configurar fluxo de branches e regras de Pull Requests.
| **Fase 5** | Testes e Homologação | Validar segurança, integrações e realizar testes de acesso.
| **Fase 6** | Apresentação | Gravar vídeo explicativo e documentar resultados.

### Uso do Agy (Google Gemini) no Planejamento

O Agy atuou como um arquiteto de software. Antes de iniciar qualquer configuração manual, validei a arquitetura de implantação com o assistente.

---

## 2. Configuração Inicial e Integração com GitHub

A configuração base do repositório é o alicerce do projeto. Optei por hospedar o código-fonte principal no GitHub, garantindo alta disponibilidade e fácil integração com outras ferramentas.

### Criação do Repositório
- **Nome:** `PortfolioHUB`
- **Visibilidade:** Público (para servir como vitrine do próprio portfólio)
- **Branch Padrão:** `main` (seguindo as convenções atuais em substituição à antiga 'master')

### Estrutura Inicial e Integração
A integração das funcionalidades do GitHub ao projeto começou com uma estrutura de diretórios limpa. Criei um README.md detalhado contendo badges de status e instruções de instalação. 

A estrutura de pastas inicial foi definida da seguinte maneira:
```text
PortfolioHUB/
├── .github/
│   └── workflows/      # Ações de CI/CD (GitHub Actions)
├── src/                # Código fonte da aplicação
│   ├── components/     # Componentes da interface
│   ├── services/       # Integração com GitHub API
│   └── assets/         # Imagens e estilos
├── .gitignore          # Ignorar node_modules, .env, etc.
├── package.json        # Dependências do projeto
└── README.md           # Documentação principal
```

Fiz o commit inicial (`Init: Setup project structure and README`) garantindo que o `.gitignore` estava devidamente configurado para evitar o envio de arquivos temporários ou sensíveis à nuvem.

---

## 3. Gestão de Usuários e Segurança

A segurança foi um dos pilares exigidos pela disciplina. Mesmo sendo um projeto majoritariamente individual, apliquei práticas de segurança voltadas para equipes.

### Permissões e Gestão de Usuários
- Configurei meu usuário do GitHub (`joaopssx`) como Owner do repositório.
- Adicionei um usuário de testes e o professor da disciplina como *Collaborators* com permissão de *Read* para avaliações e *Review* de Pull Requests.

### Políticas de Segurança Implementadas

Consultei o Agy sobre as melhores práticas de segurança atuais no GitHub. Ele me instruiu a configurar as seguintes camadas:

1. **Autenticação em Dois Fatores (2FA):** Ativei o 2FA obrigatório na minha conta GitHub para prevenir acessos indevidos que pudessem comprometer o código.
2. **Chaves SSH:** Toda comunicação do meu terminal local com o GitHub passou a ser feita via chaves SSH assimétricas (Ed25519), abandonando o uso de senhas HTTPS.
3. **Gerenciamento de Segredos:** Tokens de acesso do GitHub (PAT) usados pelo frontend para buscar os repositórios foram armazenados no `.env` localmente e gerenciados via **GitHub Secrets** no ambiente remoto.
4. **Dependabot:** Ativei os alertas do Dependabot para monitorar vulnerabilidades em pacotes npm (Node.js).

**Branch Protection Rules (Regras de Proteção de Branch):**
Travei a branch `main`. A configuração aplicada impede commits diretos:
- Exige aprovação de Pull Request antes do merge.
- Exige que o status de *checks* (como lint e builds) passem antes do merge.

---

## 4. Compartilhamento e Controle de Acesso com GitHub

Para simular um ambiente de desenvolvimento profissional de software, implementei o modelo **Gitflow** adaptado.

### Estratégia de Branches
- `main`: Código em produção, estável e testado.

## 5. Finalização da Integração e Testes

A etapa final antes do lançamento da primeira versão consistiu na validação geral do ambiente. 

### Finalização guiada pelo Agy
Pedi ao Agy para atuar como um engenheiro de QA (Quality Assurance) revisando minha arquitetura.

Ele sugeriu rodar ferramentas de verificação de segredos e realizar testes de integração via GitHub Actions, além de simular um ataque forçando um push direto para a `main` (o que foi bloqueado com sucesso pelo GitHub).

### Bateria de Testes

1. **Testes de Acesso e Permissões:** Tentei fazer um `git push origin main` do meu terminal local. Como esperado, o GitHub rejeitou a ação (`protected branch hook declined`), comprovando que a proteção estava ativa.
2. **Teste de Secret Leak:** Verifiquei o histórico do Git para garantir que o arquivo `.env` nunca havia sido "commitado".
3. **Validação da Aplicação:** Acessei a aplicação servida no GitHub Pages localmente para checar se a integração com a API do GitHub retornava os repositórios corretamente usando o Token gerado. Tudo funcionou perfeitamente.

O estado final do projeto ficou configurado como **Pronto para Produção (Ready for Production)**, com um repositório limpo, documentado, seguro e padronizado.

---

## 6. Revisão Final e Apresentação

### Preparação da Apresentação
Para finalizar a entrega da disciplina, gravei um vídeo demonstrativo e o publiquei no YouTube. No vídeo, utilizo a técnica de *screencast* para:
- Mostrar a estrutura do repositório no GitHub.
- Evidenciar as configurações de Branch Protection.
- Demonstrar um fluxo real de criação de branch, commit, PR e merge.
- Explicar como a arquitetura do PortfolioHUB foi pensada.

### Reflexão: Desafios e Soluções
O maior desafio deste projeto foi entender a fundo o ecossistema de permissões e segurança do GitHub. Inicialmente, tentei fazer *commits* usando a autenticação HTTPS padrão, o que me rendeu erros de autenticação. A transição para chaves SSH, recomendada pelo Agy, resolveu a questão e otimizou muito meu fluxo de trabalho. Outro obstáculo foi configurar corretamente as regras do *Branch Protection* de forma a não travar meu próprio desenvolvimento, mas garantir o rigor técnico.

### Conclusão e Aprendizados
O desenvolvimento e a implantação do PortfolioHUB foram marcos importantes na minha jornada em Análise e Desenvolvimento de Sistemas no CEUB. A disciplina provou que saber codificar é apenas uma parte do trabalho; gerenciar o código, assegurar sua integridade, protegê-lo contra falhas (e acessos indevidos) e manter um fluxo de trabalho colaborativo são habilidades fundamentais para um Engenheiro de Software moderno. 

O uso do Agy (Gemini) como assistente virtual elevou o nível do projeto, atuando não apenas como um solucionador de bugs, mas como um tutor de boas práticas de DevOps e controle de versão. Sinto-me hoje muito mais preparado para ingressar em equipes de desenvolvimento profissionais.
