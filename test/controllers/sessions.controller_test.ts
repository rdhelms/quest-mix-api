import { expect } from 'chai';
import axios from 'axios';
import bcrypt from 'bcrypt';
import User from '../../src/sequelize/models/user.model';

describe('controllers | sessions', function() {
    let bobross: User;
    before(async function() {
        const username = 'bobross';
        const password = await bcrypt.hash('paints', 10);

        bobross = await User.create({
            username,
            password
        });
        bobross = JSON.parse(JSON.stringify(bobross)) as User;
    });
    describe('POST to /sessions', function() {
        let response: unknown;
        before(async function() {
            response = (await axios.post<unknown>('http://localhost:3000/sessions', {
                username: 'bobross',
                password: 'paints'
            })).data;
        });
        it('returns user object', function() {
            expect(response).to.deep.equal(bobross);
        });
    });
});