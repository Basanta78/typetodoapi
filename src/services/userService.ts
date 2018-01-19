import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import * as bcrypt from 'bcrypt';
import User from '../models/user';
import * as jwt from '../utils/jwt';
import Token from '../models/token';
import * as Bluebird from 'bluebird';
import Ilogin from '../domain/Ilogin';
import UpdateBody from '../domain/UpdateBody';
import RegisterBody from '../domain/RegisterBody';

/**
 * Create User
 * 
 * @export
 * @param {RegisterBody} user 
 * @returns {Bluebird<{}>} 
 */
export function createUser(user: RegisterBody): Bluebird<{}> {
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
 * Find User By Id
 * 
 * @export
 * @param {number} id 
 * @returns Bluebird
 */
export function findById(id: number): Bluebird<{}> {
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
 * Fetch All Users
 * 
 * @export
 * @returns {Bluebird<{}>} 
 */
export function fetchAll(): Bluebird<{}> {
  return User.fetchAll();
}

/**
 * Update User
 * 
 * @export
 * @param {number} id 
 * @param {string} name 
 * @returns {Bluebird<{}>} 
 */
export function update(id: number, name: string): Bluebird<{}> {
  return new User({ id })
    .save({ name })
    .then((user: {}) => user)
    .catch((err: any) => err);
}

/**
 * Delete User
 * 
 * @export
 * @param {number} id 
 * @returns {Bluebird<{}>} 
 */
export function removeUserById(id: number): Bluebird<{}> {
  return new User({ id })
    .fetch()
    .then(token => token.destroy())
    .catch ((err: any) => err); 
}

interface IloginOutput {
  user: {}
  token:{
    access:string,
    refresh:string
  }
}
/**
 * Login User
 * 
 * @export
 * @param {Ilogin} user 
 * @returns {Bluebird<IloginOutput>} 
 */
export async function loginUser(user:Ilogin): Bluebird<IloginOutput>{
  try {
    let validUser = await validateUser(user);
    let accessToken = await jwt.generateAccessToken(user);
    let refreshToken = await jwt.generateRefreshToken(user);
    validUser.token().save({
      token: refreshToken
    });

    return {
      user: validUser,
      token: {
        access: accessToken,
        refresh: refreshToken
      }
    };
  } catch (err) {
    throw err;
  }
}
/**
 * Validate User With Given User Credentials
 * 
 * @export
 * @param {Ilogin} user 
 * @returns {Bluebird<any>} 
 */
export async function validateUser(user:Ilogin): Bluebird<any> {
  try {
    let users = await getUserByEmail(user.email);
    if (bcrypt.compareSync(user.password, users.toJSON().password)) {
      return users;
    } else {
      throw Boom.notFound('Invalid password');
    }
  } catch (err) {
    throw err;
  }
}
/**
 * Get User By Given Email
 * 
 * @export
 * @param {string} email 
 * @returns {Bluebird<any>} 
 */
export function getUserByEmail(email:string): Bluebird<any> {
  let user = new User({ email }).fetch();
  return user.then((user: {}) => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user;
  });
}
/**
 * Delete User
 * 
 * @export
 * @param {string} token 
 * @returns {Bluebird<any>} 
 */
export function deleteUser(token:string):Bluebird<any> {
  try {
    jwt.verifyRefreshToken(token);
    return new Token({ token})
      .fetch()
      .then((token:{}) => token.destroy());
  } catch (error) {
    throw error;
  }
}
/**
 * Verify User
 * 
 * @export
 * @param {string} token 
 * @returns {string}
 */
export async function verifyUser(token:string) {
  return await jwt.verifyAccessToken(token);
}
/**
 * Validate Refresh Token
 * 
 * @export
 * @param {string} token 
 * @returns {Bluebird<Token>} 
 */
export function validateRefreshToken(token: string): Bluebird<Token> {
  return new Token({ token })
    .fetch()
    .then(token => {
      if (!token) {
        throw Boom.notFound('Token not found');
      }

      return token;
    });
}