import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
  res.send("SIGNOUT")
});

export { router as signOutRouter };