import { NextFunction, Request, Response } from 'express';
import  { BAD_REQUEST } from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')?.[1];
    if (!token) {
      return ('You are not authorize');
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
    throw new ApiError(BAD_REQUEST, 'In valid token');
  }
};

export default verifyToken;
