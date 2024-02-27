import { describe, expect, it, jest } from '@jest/globals';
import Editora from '../../../src/models/editora.js';

describe('Testando modelo editora', () => {
    const objetoEditora = {
        nome: 'Editora NTT',
        cidade: 'Sao Paulo',
        email: 'owatanab@nttdata.com',
    };

    it('Deve instanciar uma nova Editora', async () => {
        const editora = new Editora(objetoEditora);

        expect(editora).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });

    it.skip('Deve salvar uma nova Editora', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('Editora NTT');
        });
    });

    it.skip('Deve salvar uma nova Editora com await', async () => {
        const editora = new Editora(objetoEditora);

        const dados = await editora.salvar();

        const retorno = await Editora.pegarPeloId(dados.id);

        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }),
        );
    });

    it.skip('Deve atualizar uma Editora', async () => {
        const editora = new Editora(objetoEditora);

        const dados = await editora.salvar();

        await dados.salvar();

        expect(dados).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }),
        );
    });

    it.skip('Deve buscar Editoras', async () => {
        const listaEditoras = await Editora.pegarEditoras();

        listaEditoras.forEach((editora) => 
            expect(editora).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    cidade: expect.any(String),
                    email: expect.any(String),
                    nome: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                }),
            ),
        );
    });

    it('Deve fazer chamada simulada ao DB', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar = jest.fn().mockReturnValue({
            id: 10,
            nome: 'Editora NTT',
            cidade: 'Sao Paulo',
            email: 'owatanab@nttdata.com',
            created_at: '2024/02/26',
            updated_at: '2024/02/26',
        });

        const retorno = editora.salvar();

        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }),
        );

    })
})