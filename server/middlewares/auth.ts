import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' })
  }

  jwt.verify(token, process.env.JWT_SECRET ?? '', (err, _user) => {
    if (err) { return res.status(403).json({ error: 'Forbidden - Invalid token' }) }

    // req.user = user;
    next()
  })
}
