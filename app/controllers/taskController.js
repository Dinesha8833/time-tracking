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
}
