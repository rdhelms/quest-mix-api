import { expect } from 'chai';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Foreground from '../../src/sequelize/models/foreground.model';

describe('controllers | foregrounds', function() {
    describe('GET to /foregrounds', function() {
        let response: Foreground[];
        before(async function() {
            await Foreground.create({
                name: 'foreground1',
                frames: []
            });
            await Foreground.create({
                name: 'foreground2',
                frames: []
            });
            response = (await axios.get<Foreground[]>('http://localhost:3000/foregrounds')).data;
        });

        it('returns array of foregrounds', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first foreground is "foreground1"', function() {
            expect(response[0].name).to.equal('foreground1');
        });
        it('returns array where the second foreground is "foreground2"', function() {
            expect(response[1].name).to.equal('foreground2');
        });
    });

    describe('POST to /foregrounds', function() {
        let response: Foreground;
        before(async function() {
            response = (await axios.post<Foreground>('http://localhost:3000/foregrounds', {
                id: '1234567890',
                name: 'New Foreground',
                frames: []
            })).data;
        });
        it('returns new foreground with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new foreground with name "New Foreground"', function() {
            expect(response.name).to.equal('New Foreground');
        });
        it('returns new foreground with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('GET to /foregrounds/:id', function() {
        let response: Foreground;
        before(async function() {
            await Foreground.create({
                name: 'Single Foreground',
                frames: []
            });
            response = (await axios.get<Foreground>('http://localhost:3000/foregrounds/1')).data;
        });
        it('returns foreground with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns foreground with name of "Single Foreground"', function() {
            expect(response.name).to.equal('Single Foreground');
        });
    });

    describe('PATCH to /foregrounds/:id', function() {
        let response: Foreground;
        before(async function() {
            await Foreground.create({
                name: 'Original Name',
                frames: []
            });
            response = (await axios.patch<Foreground>('http://localhost:3000/foregrounds/1', {
                name: 'Modified Name'
            })).data;
        });
        it('returns modified foreground with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns modified foreground with name "Modified Name"', function() {
            expect(response.name).to.equal('Modified Name');
        });
        it('returns modified foreground with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('DELETE to /foregrounds/:id', function() {
        let deleteResponse: number;
        let getResponse: Foreground[];
        before(async function() {
            await Foreground.create({
                name: 'Test Foreground',
                frames: []
            });
            deleteResponse = (await axios.delete('http://localhost:3000/foregrounds/1')).data as number;
            getResponse = (await axios.get<Foreground[]>('http://localhost:3000/foregrounds')).data;
        });
        it('returns 1, the number of deleted items', function() {
            expect(deleteResponse).to.equal(1);
        });
        it('follow up GET to /foregrounds returns empty array', function() {
            expect(getResponse).to.be.an('array').with.lengthOf(0);
        });
    });
});