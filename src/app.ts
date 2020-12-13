require('dotenv').config()

import {findUserInFollowedChats, getProgress} from './twitch-helpers'
import express = require('express')
const app = express()
const port = 80

app.use(express.static('../website/build/'))

app.get('/', (req, res) => {
	res.sendFile("index.html")
})

app.get('/find', async (req, res) => {

	console.log("Locating user: "+req.query.user.toString())
	findUserInFollowedChats(req.query.user.toString())
	.then(data => {
		if(!data) return;

		console.log(`\n${data.chatter} is chatting in:`)
		data.chats.forEach(chat => {
			console.log(`${chat}`)
		})

		res.send(data)
	})

	
})

app.get('/getProgress', async (req, res) => {
	res.send({progress: getProgress()})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})