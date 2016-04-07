import request from 'supertest';
import expect from 'expect';

import app from '../../app';
import { fixtures, resetDb } from './fixtures';


describe('Feedback router', () => {
  beforeEach(resetDb(fixtures));

  describe('GET /api/feedback', () => {
    it('should return 400 if no quiz specified', done => {
      request(app)
        .get('/api/feedback')
        .expect(400)
        .end(done);
    });

    it('should return empty array with fixtures', done => {
      request(app)
        .get('/api/feedback?quiz=' + fixtures.Quiz[0]._id)
        .expect(200)
        .expect(res => {
          expect(res.body).toEqual([]); // @TODO: fix to compare with fixtures feedbacks
        })
        .end(done);
    });
  });

  describe('POST /api/feedback', () => {
    const feedback = {
      quiz: fixtures.Quiz[0]._id,
      answers: [
        { question: 'hello', result: 'world' },
        { question: 'foo', result: 'bar' },
      ],
    };

    it('should not save feedback without quiz ref', done => {
      request(app)
        .post('/api/feedback')
        .send({
          ...feedback,
          quiz: undefined,
        })
        .expect(500)
        .end(done);
    });

    it('should save feedback', done => {
      request(app)
        .post('/api/feedback')
        .send(feedback)
        .expect(200)
        .end(done);
    });
  });
});
