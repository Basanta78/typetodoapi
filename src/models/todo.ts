import bookshelf from '../config/db';
import * as Bookshelf from 'bookshelf';
import User from './user';

const TABLE_NAME = 'todo';

/**
 * Todo model.
 */
class Todo extends bookshelf.Model<Todo> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  user(): Bookshelf.Model<User> {
    return this.belongsTo(User);
  }
}

export default Todo;