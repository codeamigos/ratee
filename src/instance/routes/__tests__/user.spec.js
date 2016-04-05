import request from 'supertest';
import expect from 'expect';

import app from '../../app';
import { fixtures, resetDb } from './fixtures';

describe('User router', () => {
  beforeEach(resetDb(fixtures));

  describe('POST /api/authenticate', () => {
    it('should return 404 for invalid credentioals', done => {
      request(app)
        .post('/api/authenticate')
        .expect(404)
        .end(done);
    });

    it('should return token for valid user', done => {
      request(app)
        .post('/api/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: fixtures.User[0].email, password: fixtures.User[0].password })
        .expect(200)
        .expect(res => {
          expect(res.body.token).toExist();
        })
        .end(done);
    });
  });

  describe('GET /api/user', () => {
    it('should be protected', done => {
      request(app)
        .get('/api/user')
        .expect(403)
        .end(done);
    });

    it('should return current user', done => {
      const agent = request(app);

      agent.post('/api/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: fixtures.User[0].email, password: fixtures.User[0].password })
        .end((err, res) => {
          if (err) return done(err);

          agent.get('/api/user')
          .set('X-Auth', res.body.token)
          .expect(200)
          .expect(res => {
            expect(res.body.email).toEqual(fixtures.User[0].email);
          })
          .end(done);
        });
    });
  });
});
