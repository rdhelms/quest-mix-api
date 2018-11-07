import { expect } from 'chai';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Background from '../../src/sequelize/models/background.model';

describe('controllers | backgrounds', function() {
    describe('GET to /backgrounds', function() {
        let response: Background[];
        before(async function() {
            await Background.create({
                name: 'background1',
                frames: []
            });
            await Background.create({
                name: 'background2',
                frames: []
            });
            response = (await axios.get<Background[]>('http://localhost:3000/backgrounds')).data;
        });

        it('returns array of backgrounds', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first background is "background1"', function() {
            expect(response[0].name).to.equal('background1');
        });
        it('returns array where the second background is "background2"', function() {
            expect(response[1].name).to.equal('background2');
        });
    });

    describe('POST to /backgrounds', function() {
        let response: Background;
        before(async function() {
            response = (await axios.post<Background>('http://localhost:3000/backgrounds', {
                id: '1234567890',
                name: 'New Background',
                frames: []
            })).data;
        });
        it('returns new background with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new background with name "New Background"', function() {
            expect(response.name).to.equal('New Background');
        });
        it('returns new background with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('GET to /backgrounds/:id', function() {
        let response: Background;
        before(async function() {
            await Background.create({
                name: 'Single Background',
                frames: []
            });
            response = (await axios.get<Background>('http://localhost:3000/backgrounds/1')).data;
        });
        it('returns background with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns background with name of "Single Background"', function() {
            expect(response.name).to.equal('Single Background');
        });
    });

    describe('PATCH to /backgrounds/:id', function() {
        let response: Background;
        before(async function() {
            await Background.create({
                name: 'Original Name',
                frames: []
            });
            response = (await axios.patch<Background>('http://localhost:3000/backgrounds/1', {
                name: 'Modified Name'
            })).data;
        });
        it('returns modified background with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns modified background with name "Modified Name"', function() {
            expect(response.name).to.equal('Modified Name');
        });
        it('returns modified background with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('DELETE to /backgrounds/:id', function() {
        let deleteResponse: number;
        let getResponse: Background[];
        before(async function() {
            await Background.create({
                name: 'Test Background',
                frames: []
            });
            deleteResponse = (await axios.delete('http://localhost:3000/backgrounds/1')).data as number;
            getResponse = (await axios.get<Background[]>('http://localhost:3000/backgrounds')).data;
        });
        it('returns 1, the number of deleted items', function() {
            expect(deleteResponse).to.equal(1);
        });
        it('follow up GET to /backgrounds returns empty array', function() {
            expect(getResponse).to.be.an('array').with.lengthOf(0);
        });
    });
});