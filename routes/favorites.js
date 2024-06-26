const favorites = require('../database/favorites_db');
const router = require('../server/node_modules/express').Router()

router.get('/', async (req, res) => {
    try {
        const allFavorites = await favorites.getAllFavorites();
        res.json(allFavorites);
    } catch (error) {
        console.error('Error getting all favorites:', error);
        res.status(500).json({ success: false, message: 'Error getting all favorites' });
    }
});

router.get('/favorite', async (req, res) => {
    const favoriteId = req.query.favoriteid;
    try {
        const favorite = await favorites.getFavoriteById(favoriteId);
        res.json(favorite);
    } catch (error) {
        console.error('Error getting favorite by ID:', error);
        res.status(404).json({ success: false, message: 'Favorite not found' });
    }
});

router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      if (!userId) {
          res.status(400).json({ success: false, message: 'UserId not provided' });
          return;
      }
      const userFavorites = await favorites.getFavoritesByUser(userId);
      res.json(userFavorites);
  } catch (error) {
      console.error('Error getting favorites by user:', error);
      res.status(500).json({ success: false, message: 'Error getting favorites by user' });
  }
});

router.get('/shareable', async (req, res) => {
    const shareableLink = req.query.shareableLink;
    try {
        const favoritesByLink = await favorites.getFavoritesByLink(shareableLink);
        res.json(favoritesByLink);
    } catch (error) {
        console.error('Error getting favorites by shareable link:', error);
        res.status(500).json({ success: false, message: 'Error getting favorites by shareable link' });
    }
});

router.post('/addfavorite', async (req, res) => {
    const { iduser, movieid, serieid, shareable_link } = req.body;
    try {
        const newFavorite = await favorites.createFavorite({ iduser, movieid, serieid, shareable_link });
        res.status(201).json(newFavorite);
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ success: false, message: 'Error adding favorite' });
    }
});

router.post("/generateLink", async (req, res) => {
  const { userid } = req.body;
  try {
    console.log("Received userid:", userid);
    const shareableLink = `http://localhost:3000/suosikit/${userid}`;
    console.log("Generated shareable link:", shareableLink);
    
    await favorites.storeShareableLink(userid, shareableLink);

    res.json({ shareableLink });
  } catch (error) {
    console.error("Error generating shareable link:", error);
    res.status(500).json({ success: false, message: "Error generating shareable link" });
  }
});


router.put('/updatefavorite/:favoriteid', async (req, res) => {
    const favoriteId = req.params.favoriteid;
    const { iduser, movieid, serieid, shareable_link } = req.body;
    try {
        const updatedFavorite = await favorites.updateFavorite(favoriteId, { iduser, movieid, serieid, shareable_link });
        res.json(updatedFavorite);
    } catch (error) {
        console.error('Error updating favorite:', error);
        res.status(500).json({ success: false, message: 'Error updating favorite' });
    }
});

router.delete('/deletefavorite/:favoriteid', async (req, res) => {
    const favoriteId = req.params.favoriteid;
    try {
        await favorites.deleteFavorite(favoriteId);
        res.status(200).json({ success: true, message: 'Favorite deleted' });
    } catch (error) {
        console.error('Error deleting favorite:', error);
        res.status(500).json({ success: false, message: 'Error deleting favorite' });
    }
});

module.exports = router;
