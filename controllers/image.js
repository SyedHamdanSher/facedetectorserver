const Clarifai = require('clarifai');

const app = new Clarifai.App({
 //apiKey: 'f8dfab1853ab4cb8ae993e5f6d417ca3'
	apiKey: process.env.API_CLARIFAI
});

const handleApiCall =(req, res) => {
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('Clarifai error'))
}
 
const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entriess'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}