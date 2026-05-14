const request = require('supertest');
const app = require('../app');

const {resetUsers} = require('../data/usersData')

describe('Testes de integração na API /users', () => {
    beforeEach(() => {
        resetUsers();
    });

    it('GET /users deve retornar lista de usuários', async() => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(2);

    });

    
    it('POST /users deve criar um novo usuário', async () => {
        const res = await request(app).post('/users').send({name: 'Charlie'});

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Charlie');
    });

    
    
    it('POST /users sem name deve retornar erro 400', async () => {
        const res = await request(app).post('/users').send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'É necessário preencher o nome.');
    });
})