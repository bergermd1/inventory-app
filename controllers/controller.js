const db = require('../db/queries')

exports.listGet = async (req, res) => {
    const results = await db.getAllTvShows();
    const showIds = results.map(result => result.id);
    console.log(showIds);
    const genres = {};
    await Promise.all(showIds.map(async id => {
        genres[id] = await db.getGenresFromShowId(id)
    }));
    
    res.render('list', {results: results, genres: genres});
}

exports.itemGet = (req, res) => {
    res.render('item', req.params)
}

exports.newGet = async (req, res) => {
    let genres = await db.getGenres();
    let channels = await db.getChannels();
    channels = channels.map(channel => channel.channel_name);
    res.render('new',{genres: genres, channels: channels,});
}

exports.newShowPost = async (req, res) => {
    await db.addTvShow(req.body.name, req.body.genre_ids, req.body.channel);
    res.redirect('/');
}