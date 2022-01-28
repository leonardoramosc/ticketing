import express, { Request, Response } from 'express';
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };