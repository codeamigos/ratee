import mongoose from 'mongoose';

export const fixtures = {
  Company: [
    {
      _id: '5705fd30e28605a7840931cf',
      title: 'Перчини',
      alias: 'perchini',
      logoLink: 'http://perchinivtomske.ru/images/logo_index_header.png',
    },
  ],
  User: [
    {
      _id: '5703615c3abe84f5473424e2',
      email: 'test@test.ru',
      password: '123qwe',
      companies: ['5705fd30e28605a7840931cf'],
    },
  ],
  Quiz: [
    {
      _id: '5705fe98e28605a7840931d0',
      company: '5705fd30e28605a7840931cf',
      title: 'Тестовый квиз',
      questions: [
        {
          kind: 'singular',
          title: 'Skolko?',
          options: ['raz', 'dva', 'tri', 'chetire'],
        },
        {
          kind: 'input',
          title: 'Napiwi kakuyunibud ebalu',
        },
      ],
    },
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
  };
}
