const pgPool = require('./pg_connection');

async function getAllFavorites() {
    const queryText = 'SELECT * FROM favorites';
    try {
      const { rows } = await pgPool.query(queryText);
      return rows;
    } catch (error) {
      console.error('Error getting all favorites:', error);
      throw error;
    }
  }

async function createFavorite(favorite) {
    const { iduser, movieid, serieid, shareable_link } = favorite;
    const queryText = 'INSERT INTO favorites (iduser, movieid, serieid, shareable_link) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [iduser, movieid, serieid, shareable_link];
    try {
      const { rows } = await pgPool.query(queryText, values);
      return rows[0];
    } catch (error) {
      console.error('Error creating favorite:', error);
      throw error;
    }
  }
  
  async function getFavoriteById(favoriteId) {
    const queryText = 'SELECT * FROM favorites WHERE favoriteid = $1';
    try {
      const { rows } = await pgPool.query(queryText, [favoriteId]);
      return rows[0];
    } catch (error) {
      console.error('Error getting favorite by ID:', error);
      throw error;
    }
  }
  
  async function updateFavorite(favoriteId, updates) {
    const queryText = 'UPDATE favorites SET iduser = $1, movieid = $2, serieid = $3, shareable_link = $4 WHERE favoriteid = $5 RETURNING *';
    const values = [updates.iduser, updates.movieid, updates.serieid, updates.shareable_link, favoriteId];
    try {
      const { rows } = await pgPool.query(queryText, values);
      return rows[0];
    } catch (error) {
      console.error('Error updating favorite:', error);
      throw error;
    }
  }
  
  async function deleteFavorite(favoriteId) {
    const queryText = 'DELETE FROM favorites WHERE favoriteid = $1';
    try {
      await pgPool.query(queryText, [favoriteId]);
    } catch (error) {
      console.error('Error deleting favorite:', error);
      throw error;
    }
  }
  
  module.exports = {
    getAllFavorites,
    createFavorite,
    getFavoriteById,
    updateFavorite,
    deleteFavorite,
  };