import { expect } from 'chai';
import axios from 'axios';

describe('app_index', function() {
    describe('GET to /', function() {
        let response: unknown;
        before(async function() {
            response = (await axios.get<unknown>('http://localhost:3000/')).data;
        });
        it('returns welcome message', function() {
            expect(response).to.equal('Welcome to the Quest Mix API');
        });
    });
});