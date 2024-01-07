import express from 'express';
import ApparelController from '../../../controllers/ApparelController';

const router = express.Router();

router.put('/:code/update-stock', ApparelController.updateApparelStock);
router.put('/update-multiple-stock', ApparelController.updateMultipleApparelStock);

export default router;
