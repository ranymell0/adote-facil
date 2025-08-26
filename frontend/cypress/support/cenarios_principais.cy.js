// Descreve o conjunto de testes para as funcionalidades principais do Adote Fácil
describe('Testes de Aceitação do Sistema Adote Fácil', () => {

  // --- HISTÓRIA 1: CADASTRO DE NOVO USUÁRIO ---
  describe('HU-01: Cadastro de Novo Usuário', () => {
    it('deve permitir que um novo usuário se cadastre com sucesso', () => {
      const emailAleatorio = `teste${Date.now()}@email.com`;

      cy.visit('/register'); // 1. Visita a página de cadastro
      cy.get('input[name="name"]').type('Usuário de Teste Automatizado');
      cy.get('input[name="email"]').type(emailAleatorio);
      cy.get('input[name="password"]').type('senha123');
      cy.get('button[type="submit"]').click();

      // 6. Verifica se foi redirecionado para a página de login
      cy.url().should('include', '/login');
    });
  });

  // --- HISTÓRIA 2: LOGIN DE USUÁRIO ---
  describe('HU-03: Login de Usuário', () => {
    it('deve permitir que um usuário cadastrado faça login', () => {
      cy.visit('/login');
      // NOTA: Para este teste funcionar, o usuário abaixo já deve existir no banco de dados.
      cy.get('input[name="email"]').type('usuario.existente@email.com');
      cy.get('input[name="password"]').type('senha123');
      cy.get('button[type="submit"]').click();

      // Verifica se o login foi bem-sucedido
      cy.url().should('not.include', '/login');
      cy.contains('Meus Pets').should('be.visible');
    });
  });

  // --- HISTÓRIA 3: CONSULTAR ANIMAIS DISPONÍVEIS ---
  describe('HU-04: Consultar Animais Disponíveis', () => {
    it('deve exibir a lista de animais na página principal', () => {
      cy.visit('/');
      cy.contains('Adote um novo amigo').should('be.visible');
      // ATENÇÃO: ajuste a classe '.card-animal' para a classe CSS real usada no seu projeto
      cy.get('.card-animal').should('exist');
    });
  });

  // --- HISTÓRIA 4: ANUNCIAR UM ANIMAL (REQUER LOGIN) ---
  describe('HU-02: Anunciar um Animal para Adoção', () => {
    beforeEach(() => {
      // Faz login programaticamente antes de cada teste deste bloco
      cy.visit('/login');
      cy.get('input[name="email"]').type('usuario.existente@email.com');
      cy.get('input[name="password"]').type('senha123');
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/login');
    });

    it('deve permitir que um usuário logado cadastre um novo animal', () => {
      cy.visit('/pets/register');
      cy.get('input[name="name"]').type('Pet Teste Cypress');
      cy.get('input[name="type"]').type('Gato');
      cy.get('input[name="gender"]').type('Macho');
      // ... continue preenchendo outros campos do seu formulário
      cy.get('button[type="submit"]').click();

      // Verifica se, após o cadastro, o usuário vê o pet que acabou de criar
      cy.contains('Pet Teste Cypress').should('be.visible');
    });
  });
});