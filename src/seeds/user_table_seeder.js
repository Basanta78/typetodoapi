/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert([
          {
            name: 'user1',
            email: 'user1@gmail.com',
            password: 'user1pass'
          }
        ])
      ]);
    });
}