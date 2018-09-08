import { expect } from 'chai';
import axios from 'axios';
import User from '../../src/sequelize/models/user.model';

describe('controllers | users', function() {
    describe('POST to /users', function() {
        let response: User;
        before(async function() {
            response = (await axios.post<User>('http://localhost:3000/users', {
                username: 'bobross',
                password: 'paints'
            })).data;
        });
        it('returns user object with username', function() {
            expect(response.username).to.equal('bobross');
        });
        it('returns user object with encrypted password', function() {
            expect(response.password).to.be.a('string');
            expect(response.password).to.not.equal('paints');
        });
    });
});