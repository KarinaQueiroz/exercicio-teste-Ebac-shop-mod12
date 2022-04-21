/// <reference types="cypress" />
import faturamentoPage from '../support/page_objects/faturamento.page';
const dadosFaturamento = require('../fixtures/faturamento.json')

describe('Funcionalidade Página de Checkout', () => {

    beforeEach(() => {
        cy.visit('/checkout/')
    });

    it('Deve cadastrar detalhes do Faturamento', () => {
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
    
});