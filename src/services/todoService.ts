import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import * as bcrypt from 'bcrypt';
import Todo from '../models/todo';
import { Model } from 'bookshelf';
import * as Bluebird from 'bluebird';
import * as Bookshelf from 'bookshelf';
import TodoBody from '../domain/TodoBody';

/**
 * Create Todo
 * 
 * @export
 * @param {number} userId 
 * @param {TodoBody} todo 
 * @returns {Bluebird<{}>} 
 */
export function createTodo(userId:number,todo: TodoBody): Bluebird<{}> {
  let tags = [...todo.tags];
  return new Todo({
    task: todo.task,
    details: todo.details,
    user_id: userId
  })
    .save()   
    .then((toDo: any) => {
      toDo.tags().attach(tags)
      console.log(toDo);
      return toDo;
    })
    .catch((err:any) => err);
}
/**
 * Get User Todo
 * 
 * @export
 * @param {number} id 
 * @returns {Bluebird<{}>} 
 */
export function getUserTodo(id:number): Bluebird<{}> {
  const model:Bookshelf.Model<Todo> = new Todo();
  return model.query({ where: { user_id: id} })
  .fetchPage({ pageSize: 5, withRelated: ['tags'] })  // fetchPage not declared
  .then((todos: any) =>{ 
  return {
    Todos: todos.models,
    metadata: {
      pageCount: todos.pagination.pageCount,
      currentpage: todos.pagination.page
    }
  };
  })
};
/**
 * Get User Paginate Todo
 * 
 * @export
 * @param {number} id 
 * @param {number} pageNo 
 * @returns {Bluebird<{}>} 
 */
export function getUserPageTodo(id: number, pageNo: number): Bluebird<{}> {
  const model:Bookshelf.Model<Todo> = new Todo();
  return model.query({ where: { user_id: id} })
  .fetchPage({ pageSize: 5,page:pageNo, withRelated: ['tags'] }) // fetchPage not declared
  .then((todos: any) =>{ 
  return {
    Todos: todos.models,
    metadata: {
      pageCount: todos.pagination.pageCount,
      currentpage: todos.pagination.page
    }
  };
  })
};
/**
 * Update Todo
 * 
 * @export
 * @param {number} id 
 * @param {TodoBody} todos 
 * @returns {Bluebird<{}>} 
 */
export function updateTodo(id: number, todos:TodoBody): Bluebird<{}> {
  return new Todo({ id })
    .save({ task: todos.task, details: todos.details })
    .then((todos:{}) => todos);
}
/**
 * Search Todo and Details
 * 
 * @export
 * @param {number} id 
 * @param {string} search 
 * @returns {Bluebird<{}>} 
 */
export function searchText(id:number, search:string): Bluebird<{}> {
  const model:Bookshelf.Model<Todo> = new Todo();
  return (
    model.query(qb => {
        qb
          .where({ user_id: id })
          .andWhere('details', 'like', '%' + search + '%')
          .orWhere('task', 'like', '%' + search + '%');
      })
      .fetchPage({ pageSize: 5, withRelated: ['tags'] })
      .then((todos:any) => {
        return {
          Todos: todos.models,
          metadata: {
            pageCount: todos.pagination.pageCount,
            currentpage: todos.pagination.page
          }
        };
      })
  );
}
/**
 * Delete Dodo
 * 
 * @export
 * @param {number} id 
 * @returns Bluebird
 */
export function deleteTodo(id:number):Bluebird<any> {
  return new Todo({ id }).fetch().then((todos:{}) => todos.destroy());
}

