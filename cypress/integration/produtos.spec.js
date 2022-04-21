/// <reference types="cypress" />
import faturamentoPage from '../support/page_objects/faturamento.page';
const dadosFaturamento = require('../fixtures/faturamento.json')

describe('Funcionalidade Página de Produtos', () => {

    beforeEach(() => {
        cy.visit('/produtos/')
    });

    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 4
        cy.get('.product-block')
        .contains('Aero Daily Fitness Tee').click()
        cy.wait(500)
        cy.get('.button-variable-item-XL').click()
        cy.get('.button-variable-item-Yellow').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade +' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')

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

   // it('Deve realizar checkout da página', () => {
  
   // });
    
});