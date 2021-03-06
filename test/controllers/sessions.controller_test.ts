import { expect } from 'chai';
import axios, { AxiosResponse, AxiosError } from 'axios';
import bcrypt from 'bcryptjs';
import User from '../../src/sequelize/models/user.model';
import Session from '../../src/sequelize/models/session.model';

describe('controllers | sessions', function() {
    describe('GET to /sessions without cookie', function() {
        let response: AxiosResponse<unknown>;
        before(async function() {
            try {
                (await axios.get<unknown>('http://localhost:3000/sessions'));
            } catch (err) {
                response = (<AxiosError>err).response!;
            }
        });
        it('returns 401 Unauthorized', function() {
            expect(response.status).to.equal(401);
        });
    });
    describe('GET to /sessions with cookie', function() {
        let cookie: string;
        let bobross: User;
        let response: AxiosResponse<unknown>;
        before(async function() {
            // Setup test user
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            bobross = await User.create({
                username,
                password,
            });

            // Login as test user (create session)
            response = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }));

            cookie = (response.headers as {'set-cookie': string[]})['set-cookie'][0].split(';')[0];

            // Use session's cookie to retrieve logged-in user
            response = (await axios.get<unknown>('http://localhost:3000/sessions', {
                headers: {
                    Cookie: cookie,
                },
            }));
        });
        it('returns user object', function() {
            bobross = JSON.parse(JSON.stringify(bobross)) as User;
            expect(response.data).to.deep.equal(bobross);
        });
    });
    describe('POST to /sessions', function() {
        let bobross: User;
        let response: AxiosResponse<unknown>;
        let cookie: string;
        before(async function() {
            // Setup test user
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            bobross = await User.create({
                username,
                password,
            });

            // Login as test user (create session)
            response = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }));

            cookie = (response.headers as {'set-cookie': string[]})['set-cookie'][0].split(';')[0];
        });
        it('returns user object', function() {
            bobross = JSON.parse(JSON.stringify(bobross)) as User;
            expect(response.data).to.deep.equal(bobross);
        });
        it('returns cookie', function() {
            expect(cookie).to.exist;
        });
    });
    describe('POST to /sessions with cookie', function() {
        let cookie: string;
        let bobross: User;
        let response: AxiosResponse<unknown>;
        before(async function() {
            // Setup test user
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            bobross = await User.create({
                username,
                password,
            });

            // Login as test user (create session)
            response = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }));

            cookie = (response.headers as {'set-cookie': string[]})['set-cookie'][0].split(';')[0];

            // Login again, with cookie
            response = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }, {
                headers: {
                    Cookie: cookie,
                },
            }));
        });
        it('returns user object', function() {
            bobross = JSON.parse(JSON.stringify(bobross)) as User;
            expect(response.data).to.deep.equal(bobross);
        });
    });
    describe('POST to /sessions with invalid username', function() {
        let response: AxiosResponse<unknown>;
        before(async function() {
            try {
                await axios.post<unknown>('http://localhost:3000/sessions', {
                    username: 'notreal',
                    password: 'notreal',
                });
            } catch (e) {
                response = (<AxiosError>e).response!;
            }
        });
        it('returns 401', function() {
            expect(response.status).to.equal(401);
        });
    });
    describe('POST to /sessions with invalid password', function() {
        let response: AxiosResponse<unknown>;
        before(async function() {
            // Setup test user
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            await User.create({
                username,
                password,
            });

            try {
                await axios.post<unknown>('http://localhost:3000/sessions', {
                    username,
                    password: 'badpassword',
                });
            } catch (e) {
                response = (<AxiosError>e).response!;
            }
        });
        it('returns 401', function() {
            expect(response.status).to.equal(401);
        });
    });
    describe('DELETE to /sessions without a cookie', function() {
        let response: AxiosResponse<unknown>;
        before(async function() {
            try {
                response = (await axios.delete('http://localhost:3000/sessions'));
            } catch (err) {
                response = (<AxiosError>err).response!;
            }
        });
        it ('returns 401', function() {
            expect(response.status).to.equal(401);
        });
    });
    describe('DELETE to /sessions with cookie', function() {
        let cookie: string;
        let response: AxiosResponse<unknown>;
        let sessions: Session[];
        before(async function() {
            // Setup test user
            const username = 'bobross';
            const password = await bcrypt.hash('paints', 10);
            await User.create({
                username,
                password,
            });

            // Login as test user (create session)
            response = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints',
            }));

            cookie = (response.headers as {'set-cookie': string[]})['set-cookie'][0].split(';')[0];

            // Delete the session that matches the cookie
            response = (await axios.delete('http://localhost:3000/sessions', {
                headers: {
                    Cookie: cookie,
                },
            }));

            sessions = await Session.findAll();
        });
        it('returns 200', function() {
            expect(response.status).to.equal(200);
        });
        it('returns "Session successfully deleted" message', function() {
            expect(response.data).to.deep.equal({
                message: 'Session successfully deleted',
            });
        });
        it('deletes session from Sessions table', function() {
            expect(sessions.length).to.equal(0);
        });
    });
});