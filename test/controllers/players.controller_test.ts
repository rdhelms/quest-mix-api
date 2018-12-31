import { expect } from 'chai';
import axios from 'axios';
import Player from '../../src/sequelize/models/player.model';
import Avatar from '../../src/sequelize/models/avatar.model';

describe('controllers | players', function() {
    describe('GET to /players', function() {
        let response: Player[];
        before(async function() {
            await Avatar.create({
                name: 'avatar1',
                frames: [],
            });
            await Avatar.create({
                name: 'avatar2',
                frames: [],
            });
            await Player.create({
                avatarId: 1,
            });
            await Player.create({
                avatarId: 2,
            });
            response = (await axios.get<Player[]>('http://localhost:3000/players')).data;
        });

        it('returns array of players', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first player has avatar 1', function() {
            expect(response[0].avatarId).to.equal(1);
        });
        it('returns array where the second player has avatar 2', function() {
            expect(response[1].avatarId).to.equal(2);
        });
    });

    describe('POST to /players', function() {
        let response: Player;
        before(async function() {
            await Avatar.create({
                name: 'avatar1',
                frames: [],
            });
            response = (await axios.post<Player>('http://localhost:3000/players', {
                id: 12345,
                avatarId: 1,
            })).data;
        });
        it('returns new player with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new player with avatar 1', function() {
            expect(response.avatarId).to.equal(1);
        });
    });

    describe('GET to /players/:id', function() {
        let response: Player;
        before(async function() {
            await Avatar.create({
                name: 'avatar1',
                frames: [],
            });
            await Player.create({
                avatarId: 1,
            });
            response = (await axios.get<Player>('http://localhost:3000/players/1')).data;
        });
        it('returns player with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns player with avatar 1', function() {
            expect(response.avatarId).to.equal(1);
        });
    });

    describe('PATCH to /players/:id', function() {
        let response: Player;
        before(async function() {
            await Avatar.create({
                name: 'avatar1',
                frames: [],
            });
            await Avatar.create({
                name: 'avatar2',
                frames: [],
            });
            await Player.create({
                avatarId: 1,
            });
            response = (await axios.patch<Player>('http://localhost:3000/players/1', {
                avatarId: 2,
            })).data;
        });
        it('returns modified player with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns modified player with avatar 2', function() {
            expect(response.avatarId).to.equal(2);
        });
    });

    describe('DELETE to /players/:id', function() {
        let deleteResponse: number;
        let getResponse: Player[];
        before(async function() {
            await Avatar.create({
                name: 'avatar1',
                frames: [],
            });
            await Player.create({
                avatarId: 1,
            });
            deleteResponse = (await axios.delete('http://localhost:3000/players/1')).data as number;
            getResponse = (await axios.get<Player[]>('http://localhost:3000/players')).data;
        });
        it('returns 1, the number of deleted items', function() {
            expect(deleteResponse).to.equal(1);
        });
        it('follow up GET to /players returns empty array', function() {
            expect(getResponse).to.be.an('array').with.lengthOf(0);
        });
    });
});