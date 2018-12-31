import { expect } from 'chai';
import axios from 'axios';
import SceneObject from '../../src/sequelize/models/object.model';

describe('controllers | objects', function() {
    describe('GET to /objects', function() {
        let response: SceneObject[];
        before(async function() {
            await SceneObject.create({
                name: 'object1',
                frames: [],
            });
            await SceneObject.create({
                name: 'object2',
                frames: [],
            });
            response = (await axios.get<SceneObject[]>('http://localhost:3000/objects')).data;
        });

        it('returns array of objects', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
        it('returns array where the first object is "object1"', function() {
            expect(response[0].name).to.equal('object1');
        });
        it('returns array where the second object is "object2"', function() {
            expect(response[1].name).to.equal('object2');
        });
    });

    describe('POST to /objects', function() {
        let response: SceneObject;
        before(async function() {
            response = (await axios.post<SceneObject>('http://localhost:3000/objects', {
                id: '1234567890',
                name: 'New SceneObject',
                frames: [],
            })).data;
        });
        it('returns new object with id 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns new object with name "New SceneObject"', function() {
            expect(response.name).to.equal('New SceneObject');
        });
        it('returns new object with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('GET to /objects/:id', function() {
        let response: SceneObject;
        before(async function() {
            await SceneObject.create({
                name: 'Single SceneObject',
                frames: [],
            });
            response = (await axios.get<SceneObject>('http://localhost:3000/objects/1')).data;
        });
        it('returns object with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns object with name of "Single SceneObject"', function() {
            expect(response.name).to.equal('Single SceneObject');
        });
    });

    describe('PATCH to /objects/:id', function() {
        let response: SceneObject;
        before(async function() {
            await SceneObject.create({
                name: 'Original Name',
                frames: [],
            });
            response = (await axios.patch<SceneObject>('http://localhost:3000/objects/1', {
                name: 'Modified Name',
            })).data;
        });
        it('returns modified object with id of 1', function() {
            expect(response.id).to.equal(1);
        });
        it('returns modified object with name "Modified Name"', function() {
            expect(response.name).to.equal('Modified Name');
        });
        it('returns modified object with frames array', function() {
            expect(response.frames).to.be.an('array').with.lengthOf(0);
        });
    });

    describe('DELETE to /objects/:id', function() {
        let deleteResponse: number;
        let getResponse: SceneObject[];
        before(async function() {
            await SceneObject.create({
                name: 'Test SceneObject',
                frames: [],
            });
            deleteResponse = (await axios.delete('http://localhost:3000/objects/1')).data as number;
            getResponse = (await axios.get<SceneObject[]>('http://localhost:3000/objects')).data;
        });
        it('returns 1, the number of deleted items', function() {
            expect(deleteResponse).to.equal(1);
        });
        it('follow up GET to /objects returns empty array', function() {
            expect(getResponse).to.be.an('array').with.lengthOf(0);
        });
    });
});