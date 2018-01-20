import User from './user';
import bookshelf from '../config/db';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'tokens';

/**
 * Tokens model.
 */
class Tokens extends bookshelf.Model<Tokens> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  public user(): Bookshelf.Model<User> {
    return this.belongsTo(User);
  }
}

export default Tokens;
