import { afterEach, beforeEach, describe, expect, jest } from '@jest/globals';
import app from '../../../src/app.js';
import request from 'supertest';

let server;

beforeEach(() => {
    const port = 3005;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('Get em /editoras', () => {
    it('Deve retornar lista de editoras', async () => {
        const resposta = await request(app)
            .get('/editoras')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
        
        expect(resposta.body[0].id).toBe(1);
        expect(resposta.body[0].nome).toBe('Europa-América');
        expect(resposta.body[0].cidade).toBe('Lisboa');
        expect(resposta.body[0].email).toBe('e@e.com');
        expect(resposta.body[0].created_at).toBe('2022-07-01 19:49:06');
        expect(resposta.body[0].updated_at).toBe('2022-07-01 19:49:06');
    });
});

let idResposta;
describe('Post em /editoras', () => {
    it('Deve adicionar nova editora', async () => {
        const resposta = await request(app)
            .post('/editoras')
            .send({
                nome: 'NTT Edit',
                cidade: 'Sao Paulo',
                email: 'owat@nttdata.com'
            })
            .expect(201);

        idResposta = resposta.body.content.id;
    });

    it('Deve falhar com body não preenchido', async () => {
        const resposta = await request(app)
            .post('/editoras')
            .send({})
            .expect(400);
    });
});

describe('Put em /editoras por ID', () => {
    it.each([
        ['nome', {nome: 'Teste renomear'}],
        ['estado', {estado: 'Sampa'}],
        ['email', {email: 'renomeia@ntt.com'}],
    ])('Deve alterar campo %s', async (chave, param) => {
        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request');
        await requisicao.request(app)
            .put(`/editoras/${idResposta}`)
            .send(param)
            .expect(204);
        
        expect(spy).toHaveBeenCalled();
    })
});

describe('Get em /editoras por ID', () => {
    it('Deve buscar editora por ID', async () => {
        await request(app)
        .get(`/editoras/${idResposta}`)
        .expect(200);
    })
});

describe('Delete em /editoras por ID', () => {
    it('Deve deletar editora por ID', async () => {
        await request(app)
        .delete(`/editoras/${idResposta}`)
        .expect(200);
    })
});
