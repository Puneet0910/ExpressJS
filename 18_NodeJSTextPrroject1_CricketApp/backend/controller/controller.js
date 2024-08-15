const Player = require('../model/players');

exports.addPlayer = async (req, res, next) => {
    const player = req.body;
    try {
        const newPlayer = await Player.create(player);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


exports.getPlayer = async (req, res, next) => {
    try {
        const players = await Player.findAll();
        res.send({ allPlayerDetails: players });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

  
exports.findPlayer = async (req, res, next) => {
    const name = req.params.playerName;
    try {
        const player = await Player.findOne({ where: { name: name } });

        if (!player) {
            return res.status(404).json({ message: 'Player Not Found' });
        }

        return res.status(200).json({ playerDetails: player });
    } catch (error) {
        console.error('Error finding player:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


  
  exports.deletePlayer = async (req, res, next) => {
    try {
      const id = req.params.playerId;
      await Player.destroy({ where: { id: id } });
      res.send({ message: 'Player deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };