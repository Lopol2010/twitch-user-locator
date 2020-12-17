import { ApiClient, HelixFollow, HelixPaginatedRequest } from 'twitch';
import { StaticAuthProvider, ClientCredentialsAuthProvider } from 'twitch-auth';
import { HelixPaginatedRequestWithTotal } from 'twitch/lib/API/Helix/HelixPaginatedRequestWithTotal';

const fetch = require('node-fetch')
const cliProgress = require('cli-progress')

const clientId = process.env.clientId
const clientSecret = process.env.clientSecret

// const authProvider = new StaticAuthProvider(clientId, accessToken)
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider })

let progress = { 
	value: 0,
	total: 0,
}

const REQUEST_INTERVAL = 10

export function getProgress() {
    return progress.value / progress.total
}

export async function findUserInFollowedChats(userName: string)
{
	const user = await apiClient.helix.users.getUserByName(userName)
	if (!user) {
		return false
	}

	const followsReq = await apiClient.helix.users.getFollowsPaginated({user: user})
	const followsList = await followsReq.getAll()

    progress.total = followsList.length

	// let found = await Promise.all(followsList.map(
	// 	async follow => {
	// 		let found = await IsUserInChat(userName, follow.followedUserDisplayName.toLowerCase())
	// 		progress.value ++
	// 		if(found) {
	// 			return follow.followedUserDisplayName
	// 		} 
	// 	}
	// ))
	let found = await promiseAllInterval(followsList.map(
			async follow => {
				let found = await IsUserInChat(userName, follow.followedUserDisplayName.toLowerCase())
				progress.value ++
				return found ? follow.followedUserDisplayName : undefined
			}
		), REQUEST_INTERVAL)
	
	return { chatter: userName, chats: found.filter(value => value !== undefined) }
}

async function promiseAllInterval(promiseArray: any[], interval) {


	return new Promise<any[]>((resolve, reject) => {

		if(!promiseArray || promiseArray.length <= 0) resolve(promiseArray)

		let i = 0
		let resolvedArray = []
		let intervalId = setInterval(async () => {
			let promise = promiseArray[i]
			promise.then(result => resolvedArray.push(result))
			
			if (i === promiseArray.length-1) {
				clearInterval(intervalId)
				resolve(resolvedArray)
			}
			i ++
		}, interval)

	})
}

async function IsUserInChat(userName: string, chatName:string) {

	return await fetch(encodeURI(`https://tmi.twitch.tv/group/user/${chatName}/chatters`))
	.then(res => res.json())
	.then(data => {

		var chattersArray = []
		for(const category in data.chatters) {
			chattersArray = chattersArray.concat(data.chatters[category])
		}

		for (let i = 0; i < chattersArray.length; i++) {
			const chatterName = chattersArray[i];
			if(chatterName.toLowerCase() === userName.toLowerCase()){

				return true
			}
		}
		return false
	}).catch(console.log)
}
