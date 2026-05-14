const request = require('supertest');
const { resetTasks } = require("../data/tasksData");
const { resetUsers } = require("../data/usersData");
const app = require("../app");

describe('Testes de integração na API /tasks', () => {
    beforeEach(() => {
        resetUsers();
        resetTasks();
    });

    it('GET /tasks deve retornar lista de tarefas', async () => {
        const res = await request(app).get('/tasks');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(2);
    });

    it('POST /tasks deve criar tarefa para usuário existente', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Nova tarefa',
                userId: 1
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Nova tarefa');
        expect(res.body.completed).toBe(false);
        expect(res.body.userId).toBe(1);
    });

    it('POST /tasks deve retornar erro se o usuário não existir', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Tarefa inválida',
                userId: 999
            });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Usuário não encontrado.');
    });

    it('GET /users/:id/tasks deve retornar tarefas do usuário', async () => {
        const res = await request(app).get('/users/1/tasks');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);

        res.body.forEach(task => {
            expect(task.userId).toBe(1);
        });
    });

    it('GET /users/:id/tasks deve retornar tarefas do usuário', async () => {
        const res = await request(app).get('/users/1/tasks');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);

        res.body.forEach(task => {
            expect(task.userId).toBe(1);
        });
    });
});