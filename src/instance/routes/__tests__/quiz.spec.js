import request from 'supertest';

import app from '../../app';
import { fixtures, resetDb } from './fixtures';


describe.skip('Quiz router', () => {
  beforeEach(resetDb(fixtures));

  describe('GET /api/quiz', () => {

  });

  describe('POST /api/quiz', () => {
    it('should be protected', done => {
      request(app)
        .post('/api/quiz')
        .send({ foo: 'bar' })
        .expect(403)
        .end(done);
    });
  });
});
