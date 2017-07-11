import _ from 'lodash';
import { Task } from '../models';
import Responder from '../../lib/expressResponder';
import { BadRequestError } from '../errors';

export default class TaskController {
  static page(req, res) {
    const page = Math.abs(_.parseInt(req.query.page)) || 1;
    const limit = Math.abs(_.parseInt(req.query.page_size)) || 10;
    const offset = (page - 1) * limit;

    Task
      .findAll({ where: { userId: req.user.get('userId') }, offset, limit, attributes: ['id', 'title', 'description', 'time', 'createdAt'], order: [ ["createdAt", "DESC"] ] })
      .then(tasks => Responder.success(res, { tasks }))
      .catch(errorOnDBOp => Responder.operationFailed(res, errorOnDBOp));
  }

  static create(req, res) {
    const requiredPresent = _.every(['title', 'description', 'time'], elem => _.has(req.body, elem))
    if(!requiredPresent)
      throw new BadRequestError(`title, description and time are required`);
    if(!_.isString(req.body.title))
      throw new BadRequestError(`title should be a string`);
    if(!_.isString(req.body.description))
      throw new BadRequestError(`description should be a string`);
    TaskController._checkTime(req.body.time);
    const task = _.extend({ userId: req.user.get('userId') }, _.pick(req.body, 'title', 'description', 'time'));
    Task
      .create(task)
      .then(task => Responder.created(res, task))
      .catch(errorOnDBOp => Responder.operationFailed(res, errorOnDBOp));
  }

  static update(req, res) {
    const task = _.pick(req.body, 'title', 'description', 'time');
    if(req.body.title && !_.isString(req.body.title))
      throw new BadRequestError(`title should be a string`);
    if(req.body.description && !_.isString(req.body.description))
      throw new BadRequestError(`description should be a string`);
    if(req.body.time) {
      TaskController._checkTime(req.body.time);
    }
    Task
      .find({ where: { id: req.params.taskId } })
      .then(dbtask => {
        if(dbtask.userId !== req.user.get('userId'))
          throw new BadRequestError(`You are not allowed to access this resource.`);
        if(new Date(dbtask.createdAt).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0))
          throw new BadRequestError(`Only Today's can be updated`);
        return Task.update(task, { where: { id: req.params.taskId } })
      })
      .then(task => Responder.success(res, task))
      .catch(errorOnDBOp => Responder.operationFailed(res, errorOnDBOp));
  }

  static remove(req, res) {
    Task
      .find({ where: { id: req.params.taskId } })
      .then(task => {
        if(task.userId !== req.user.get('userId'))
          throw new BadRequestError(`You are not allowed to access this resource.`);
        if(new Date(task.createdAt).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0))
          throw new BadRequestError(`Only today's can be deleted`);
        return Task.destroy({ where: { id: req.params.taskId } });
      })
      .then(task => Responder.deleted(res))
      .catch(errorOnDBOp => Responder.operationFailed(res, errorOnDBOp));
  }

  static _checkTime(time) {
    if(!_.isString(time))
      throw new BadRequestError(`time should be a string`);
    let splits = time.split(":");
    let hours = !splits[0] || parseInt(splits[0]);
    let minutes = !splits[1] || parseInt(splits[1]);
    if((!_.isNumber(hours) || _.isNaN(hours)) || (!_.isNumber(minutes) || _.isNaN(minutes)))
      throw new BadRequestError(`time should be a valid HH:MM`);
    if(hours < 0 && hours > 23)
      throw new BadRequestError(`Hours should be between 0-23`);
    if(minutes < 0 && minutes > 23)
      throw new BadRequestError(`Minutes should be between 0-59`);
  }
}
