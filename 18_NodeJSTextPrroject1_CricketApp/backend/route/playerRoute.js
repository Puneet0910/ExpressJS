const playerController = require('../controller/controller');

const express = require('express');

const router = express.Router();

router.post('/player-info', playerController.addPlayer);
router.get('/player-info', playerController.getPlayer);
router.get('/player-info/:playerName', playerController.findPlayer);
router.delete('/player-info/:playerId', playerController.deletePlayer);



module.exports = router;