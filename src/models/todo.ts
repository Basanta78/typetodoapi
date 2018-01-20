import Tags from './tags';
import User from './user';
import bookshelf from '../config/db';
import * as Bookshelf from 'bookshelf';

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
  public user(): Bookshelf.Model<User> {
    return this.belongsTo(User);
  }
  public tags(): Bookshelf.Collection<Tags> {
    return this.belongsToMany(Tags);
  }
}

export default Todo;
