import { expect } from 'chai';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Avatar from '../../src/sequelize/models/avatar.model';

describe('controllers | avatars', function() {
    describe('GET to /avatars', function() {
        let response: Avatar[];
        before(async function() {
            await Avatar.create({
                name: 'avatar1',
                frames: []
            });
            await Avatar.create({
                name: 'avatar2',
                frames: []
            });
            response = (await axios.get<Avatar[]>('http://localhost:3000/avatars')).data;
        });

        it('returns array of avatars', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first avatar is "avatar1"', function() {
            expect(response[0].name).to.equal('avatar1');
        });
        it('returns array where the second avatar is "avatar2"', function() {
            expect(response[1].name).to.equal('avatar2');
        });
    });

    describe('POST to /avatars', function() {
        let response: Avatar;
        before(async function() {
            response = (await axios.post<Avatar>('http://localhost:3000/avatars', {
                id: '1234567890',
                name: 'New Avatar',
                frames: []
            })).data;
        });
        it('returns new avatar with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new avatar with name "New Avatar"', function() {
            expect(response.name).to.equal('New Avatar');
        });
        it('returns new avatar with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('GET to /avatars/:id', function() {
        let response: Avatar;
        before(async function() {
            await Avatar.create({
                name: 'Single Avatar',
                frames: []
            });
            response = (await axios.get<Avatar>('http://localhost:3000/avatars/1')).data;
        });
        it('returns avatar with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns avatar with name of "Single Avatar"', function() {
            expect(response.name).to.equal('Single Avatar');
        });
    });

    describe('PATCH to /avatars/:id', function() {
        let response: Avatar;
        before(async function() {
            await Avatar.create({
                name: 'Original Name',
                frames: []
            });
            response = (await axios.patch<Avatar>('http://localhost:3000/avatars/1', {
                name: 'Modified Name'
            })).data;
        });
        it('returns modified avatar with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns modified avatar with name "Modified Name"', function() {
            expect(response.name).to.equal('Modified Name');
        });
        it('returns modified avatar with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('DELETE to /avatars/:id', function() {
        let deleteResponse: number;
        let getResponse: Avatar[];
        before(async function() {
            await Avatar.create({
                name: 'Test Avatar',
                frames: []
            });
            deleteResponse = (await axios.delete('http://localhost:3000/avatars/1')).data as number;
            getResponse = (await axios.get<Avatar[]>('http://localhost:3000/avatars')).data;
        });
        it('returns 1, the number of deleted items', function() {
            expect(deleteResponse).to.equal(1);
        });
        it('follow up GET to /avatars returns empty array', function() {
            expect(getResponse).to.be.an('array').with.lengthOf(0);
        });
    });
});