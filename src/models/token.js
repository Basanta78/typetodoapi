import bookshelf from '../db';
const TABLE_NAME = 'tokens';

/**
 * Tokens model.
 */
class Tokens extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  user() {
    return this.belongsTo(user);
  }
}

export default Tokens;