const pool = require('./pool');

async function getAllTvShows() {
    const { rows } = await pool.query('SELECT tv_shows.id, show_name, channel_name FROM tv_shows ' + 
                                      'JOIN channels ON tv_shows.channel_id = channels.id');
    console.log(rows);
    return rows;
}

async function addTvShow(name, genre_ids, channel) {
    await pool.query('INSERT INTO tv_shows (show_name, channel_id) VALUES ($1, $2);', [name, channel])
    const { rows } = await pool.query('SELECT MAX(id) from tv_shows');
    const show_id = rows[0].max;
    console.log(genre_ids);

    if (Array.isArray(genre_ids)) {
        genre_ids.forEach(async genre_id => {
            await pool.query('INSERT INTO tv_shows_genres (show_id, genre_id) VALUES ($1,$2);', [show_id, genre_id]);
        });
    } else {
        await pool.query('INSERT INTO tv_shows_genres (show_id, genre_id) VALUES ($1,$2);', [show_id, genre_ids]);
    }
}

async function getChannels() {
    const { rows } = await pool.query('SELECT channel_name FROM channels');
    return rows;
}

async function getGenresFromShowId(id) {
    const { rows } = await pool.query('SELECT genre_name FROM tv_shows_genres ' + 
                                      'JOIN genres ON tv_shows_genres.genre_id = genres.id WHERE show_id = $1;', [id]);
    return rows;
}

async function getGenres() {
    const { rows } = await pool.query('SELECT * FROM genres;');
    return rows;
}

module.exports = {
    getAllTvShows,
    addTvShow,
    getGenres,
    getChannels,
    getGenresFromShowId,
}