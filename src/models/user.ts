import bookshelf from '../config/db';
import Todo from './todo';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'users';

/**
 * Users model.
 */
class User extends bookshelf.Model<User> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  todo():Bookshelf.Collection<Todo> {
    return this.hasMany(Todo);
  }
}

export default User;

