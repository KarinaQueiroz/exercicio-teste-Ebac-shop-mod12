/// <reference types="cypress" />
const dadosLogin = require('../fixtures/perfil.json')
import faturamentoPage from '../support/page_objects/faturamento.page';
const dadosFaturamento = require('../fixtures/faturamento.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
        cy.get('#primary-menu > .menu-item-629 > a').click()

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
       
        cy.get('.product-block')
        cy.addProdutos('Aero Daily Fitness Tee', 'XL', 'Yellow', 2)

        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt', 'L', 'Green', 2)

        cy.get('.woocommerce-message > .button').click()

        faturamentoPage.editarFaturamento(
            dadosFaturamento[0].nome,
            dadosFaturamento[0].sobrenome,
            dadosFaturamento[0].empresa,
            dadosFaturamento[0].pais,
            dadosFaturamento[0].endereco,
            dadosFaturamento[0].complemento,
            dadosFaturamento[0].cidade,
            dadosFaturamento[0].estado,
            dadosFaturamento[0].cep,
            dadosFaturamento[0].telefone,
            dadosFaturamento[0].email
        )

        cy.get('.wc_payment_method.payment_method_bacs > label').click()
        cy.get('#terms').check()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

   


})