import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import * as bcrypt from 'bcrypt';
import User from '../models/user';
import UpdateBody from '../domain/UpdateBody';
import RegisterBody from '../domain/RegisterBody';

/**
 * Create user
 *
 * @param  {RegisterBody} body
 * @returns Promise
 */
export function createUser(user: RegisterBody): Promise<{}> {
  return new User({
    name: user.name,
    email: user.email,
    password: bcrypt.hashSync(user.password, 8)
  })
    .save()
    .then((user:{}) => user)
    .catch((err:any) => err);
}

/**
 * Fetch user by id
 *
 * @param  {number} id
 */
export function findById(id: number) {
  return new User({id})
  .fetch()
  .then((user: {}) => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Fetch user by email
 *
 * @param  {string} email
 */
// export function findByEmail(email: string) {
//   return knex('users')
//     .where('email', '=', email)
//     .first()
//     .then((user: {}) => {
//       if (!user) {
//         throw Boom.notFound(lang.userNotFound);
//       }

//       return { data: user };
//     });
// }

/**
 * Fetch all user
 *
 * @returns Promise
 */
export function fetchAll(): Promise<{}> {
  return User.fetchAll();
}

/**
 * Update specific user
 *
 * @param  {UpdateBody} body
 * @returns Promise
 */
export function update(id: number, name: string): Promise<{}> {
  return new User({ id })
    .save({ name })
    .then((user: {}) => user)
    .catch((err: any) => err);
}

/**
 * Remove specific user
 *
 * @param  {number} id
 * @returns Promise
 */
export function removeUserById(id: number): Promise<{}> {
  return new User({ id })
    .fetch()
    .then(token => token.destroy())
    .catch ((err: any) => err); 
}
