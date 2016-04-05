import mongoose from 'mongoose';

export const fixtures = {
  User: [
    { _id: '5703615c3abe84f5473424e2', email: 'test@test.ru', password: '123qwe' },
  ],
};

export function resetDb(fixtures) {
  return (done) => {
    const clear = Object
      .keys(fixtures)
      .map(key => mongoose.model(key).remove().exec());

    const load = Object
      .keys(fixtures)
      .map(key => mongoose.model(key).create(fixtures[key]));

    Promise.all(clear)
      .then(() => Promise.all(load))
      .then(() => done())
      .catch(done);
  }
}
