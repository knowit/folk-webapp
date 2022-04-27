import { Request, Response, NextFunction } from 'express'

const dataplattform = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.sendStatus(403)
    }

    req.accessToken = req.headers.authorization
      .split(/bearer/i)
      .pop()
      .trim()

    next()
  }
}

export default dataplattform
