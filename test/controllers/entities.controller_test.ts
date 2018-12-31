import { expect } from 'chai';
import axios from 'axios';
import Entity from '../../src/sequelize/models/entity.model';

describe('controllers | entities', function() {
    describe('GET to /entities', function() {
        let response: Entity[];
        before(async function() {
            await Entity.create({
                name: 'entity1',
                frames: [],
            });
            await Entity.create({
                name: 'entity2',
                frames: [],
            });
            response = (await axios.get<Entity[]>('http://localhost:3000/entities')).data;
        });

        it('returns array of entities', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first entity is "entity1"', function() {
            expect(response[0].name).to.equal('entity1');
        });
        it('returns array where the second entity is "entity2"', function() {
            expect(response[1].name).to.equal('entity2');
        });
    });

    describe('POST to /entities', function() {
        let response: Entity;
        before(async function() {
            response = (await axios.post<Entity>('http://localhost:3000/entities', {
                id: '1234567890',
                name: 'New Entity',
                frames: [],
            })).data;
        });
        it('returns new entity with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new entity with name "New Entity"', function() {
            expect(response.name).to.equal('New Entity');
        });
        it('returns new entity with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('GET to /entities/:id', function() {
        let response: Entity;
        before(async function() {
            await Entity.create({
                name: 'Single Entity',
                frames: [],
            });
            response = (await axios.get<Entity>('http://localhost:3000/entities/1')).data;
        });
        it('returns entity with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns entity with name of "Single Entity"', function() {
            expect(response.name).to.equal('Single Entity');
        });
    });

    describe('PATCH to /entities/:id', function() {
        let response: Entity;
        before(async function() {
            await Entity.create({
                name: 'Original Name',
                frames: [],
            });
            response = (await axios.patch<Entity>('http://localhost:3000/entities/1', {
                name: 'Modified Name',
            })).data;
        });
        it('returns modified entity with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns modified entity with name "Modified Name"', function() {
            expect(response.name).to.equal('Modified Name');
        });
        it('returns modified entity with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('DELETE to /entities/:id', function() {
        let deleteResponse: number;
        let getResponse: Entity[];
        before(async function() {
            await Entity.create({
                name: 'Test Entity',
                frames: [],
            });
            deleteResponse = (await axios.delete('http://localhost:3000/entities/1')).data as number;
            getResponse = (await axios.get<Entity[]>('http://localhost:3000/entities')).data;
        });
        it('returns 1, the number of deleted items', function() {
            expect(deleteResponse).to.equal(1);
        });
        it('follow up GET to /entities returns empty array', function() {
            expect(getResponse).to.be.an('array').with.lengthOf(0);
        });
    });
});