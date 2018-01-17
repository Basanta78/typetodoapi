import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import * as bcrypt from 'bcrypt';
import Todo from '../models/todo';
import TodoBody from '../domain/TodoBody';
import { Model } from 'bookshelf';
/**
 * Create user
 *
 * @param  {RegisterBody} body
 * @returns Promise
 */
export function createTodo(userId:number,todo: TodoBody): Promise<{}> {
  let tags = [...todo.tags];
  console.log(todo,userId)
  return new Todo({
    task: todo.task,
    details: todo.details,
    finish_date: todo.finish_date,
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

export function getUserTodo(id:number,todo:TodoBody): Promise<{}> {
  return Todo.query({ where: { user_id: id} })
  .fetchPage({ pageSize: 5, withRelated: ['tags'] })
  .then(todos => {
  return {
    Todos: todos.models,
    metadata: {
      pageCount: todos.pagination.pageCount,
      currentpage: todos.pagination.page
    }
  };
});
}