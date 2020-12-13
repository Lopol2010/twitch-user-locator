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

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);


// nikaypypy unuasha arrowwoods praden untovvn furbylol flexxxid MerrychXmas vashue u_r_0_d Slexboy
// honeymad ountti xuylo_obgashenoe 
// findUserInFollowedChats("ountti").then((result: any) => {
// 	progressBar.stop()

// 	console.log(`\n${result.chatter} is chatting in:`)
// 	result.chats.forEach(data => {
// 		console.log(`${data.chat}`)
// 	})
// 	console.log('\n')
// }).catch(console.log)

export function getProgress() {
    return progressBar.value / progressBar.total
}
export async function findUserInFollowedChats(userName: string)//: Promise<false | {chatter: string; chats: string[]}>
{
	const user = await apiClient.helix.users.getUserByName(userName)
	if (!user) {
		return false
	}

	const followsReq = await apiClient.helix.users.getFollowsPaginated({user: user})
	const followsList = await followsReq.getAll()

    progressBar.start(followsList.length, 0)

	let found = await Promise.all(followsList.map(
		async follow => {
			let found = await IsUserInChat(userName, follow.followedUserDisplayName.toLowerCase())
			progressBar.increment()
			if(found) {
				return follow.followedUserDisplayName
			} 
		}
	))
	
	progressBar.stop()
	return { chatter: userName, chats: found.filter(value => value !== undefined) }
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
