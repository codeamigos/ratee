import request from 'supertest';
import expect from 'expect';

import app from '../../app';
import { fixtures, resetDb } from './fixtures';


describe('Quiz router', () => {
  beforeEach(resetDb(fixtures));

  describe('GET /api/quiz/:alias', () => {
    it('should return quiz by company alias', done => {
      request(app)
        .get('/api/quiz/' + fixtures.Company[0].alias)
        .expect(200)
        .expect(res => {
          expect(res.body.title).toEqual(fixtures.Quiz[0].title);
        })
        .end(done);
    });
  });

  describe('POST /api/quiz/:id', () => {
    it('should be protected', done => {
      request(app)
        .post('/api/quiz/' + fixtures.Quiz[0]._id)
        .send({ foo: 'bar' })
        .expect(403)
        .end(done);
    });
  });
});
