import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, _) => {
    res.redirect('/inventory');
});

export default router;
