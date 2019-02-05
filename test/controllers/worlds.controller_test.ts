import { expect } from 'chai';
import World from '../../src/sequelize/models/world.model';
import axios, { AxiosError, AxiosResponse } from 'axios';
import bcrypt from 'bcryptjs';
import User from '../../src/sequelize/models/user.model';

describe('controllers | worlds', function() {
    describe('GET to /worlds', function() {
        let response: World[];
        before(async function () {
            await World.create({
                name: 'First World',
            });
            await World.create({
                name: 'Second World',
            });
            response = (await axios.get<World[]>('http://localhost:3000/worlds')).data;
        });
        it('returns array of 2 worlds', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first world is "First World"', function() {
            expect(response[0].name).to.equal('First World');
        });
        it('returns array where the second world is "Second World"', function() {
            expect(response[1].name).to.equal('Second World');
        });
    });
    describe('Unauthorized POST to /worlds', function() {
        let errorMessage: string;
        async function createWorld() {
            return (await axios.post<World>('http://localhost:3000/worlds', {
                name: 'New World',
            })).data;
        }
        before(async function() {
            try {
                await createWorld();
            } catch (err) {
                errorMessage = (err as Error).message;
            }
        });
        it('returns an error', function() {
            expect(errorMessage).to.equal('Request failed with status code 401');
        });
    });
    describe('POST to /worlds', function() {
        let response: World;
        before(async function() {
            // Login as test user (create session)
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            await User.create({
                username,
                password,
            });
            const session = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }));
            const cookie = (session.headers as {'set-cookie': string[]})['set-cookie'][0].split(';')[0];

            response = (await axios.post<World>('http://localhost:3000/worlds', {
                id: 12345,
                name: 'New World',
            }, {
                headers: {
                    Cookie: cookie,
                },
            })).data;
        });
        it('returns new world with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new world with name "New World"', function () {
            expect(response.name).to.equal('New World');
        });
        it('returns new world with ownerId 1', function() {
            expect(response.ownerId).to.equal(1);
        });
    });
    describe('GET to /worlds/:id', function() {
        let response: World;
        before(async function() {
            await World.create({
                name: 'World 1',
            });
            response = (await axios.get<World>('http://localhost:3000/worlds/1')).data;
        });
        it('returns world with id of 1', function () {
            expect(response.id).to.equal(1);
        });
    });
    describe('Unauthorized PATCH to /worlds/:id', function() {
        let response: AxiosResponse<unknown>;
        before(async function() {
            await World.create({
                name: 'World 1',
            });
            try {
                (await axios.patch<World>('http://localhost:3000/worlds/1', {
                    name: 'New World Awesomeness',
                })).data;
            } catch (err) {
                response = (<AxiosError>err).response!;
            }
        });
        it('returns 401', function() {
            expect(response.status).to.equal(401);
        });
    });
    describe('PATCH to /worlds/:id', function() {
        let response: AxiosResponse<World>;
        before(async function() {
            // Login as test user (create session)
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            await User.create({
                username,
                password,
            });
            const session = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }));
            const cookie = (session.headers as {'set-cookie': string[]})['set-cookie'][0].split(';')[0];

            await World.create({
                name: 'World 1',
            });

            response = (await axios.patch<World>('http://localhost:3000/worlds/1', {
                name: 'New World Awesomeness',
            }, {
                headers: {
                    Cookie: cookie,
                },
            }));
        });
        it('returns 200', function() {
            expect(response.status).to.equal(200);
        });
        it('returns updated world', function() {
            expect(response.data.name).to.equal('New World Awesomeness');
        });
    });
});