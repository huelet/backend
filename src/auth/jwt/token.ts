import jwt from 'jsonwebtoken';
import express from 'express';

const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const authenticateTokenRoute = async (req: express.Request, res: express.Response) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    res.json({ response: "Success!" })
  })
}

export { authenticateToken, authenticateTokenRoute };