import Todo from './todo';
import bookshelf from '../config/db';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'tags';

/**
 * User model.
 */
class Tags extends bookshelf.Model<Tags> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  public todo(): Bookshelf.Collection<Todo> {
    return this.belongsToMany(Todo);
  }
}

export default Tags;
