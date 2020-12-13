import react from 'react';
import './App.css';

export default class App extends react.Component {

	constructor(props) {
		super(props)

		this.state = {
			result: {
				chatter: "",
				chats: []
			},
			progressValue: 0,
			isLocatingNow: false,
			history: [],
			userlist: ["nikaypypy", "unuasha", "arrowwoods", "praden",
				"untovvn", "furbylol", "flexxxid", "MerrychXmas",
				"vashue", "u_r_0_d", "Slexboy", "honeymad", "ountti",
				"xuylo_obgashenoe", "moliichan"]
		}

		let userlist = JSON.parse(localStorage.getItem("userlist"))
		if (userlist) {
			userlist = userlist.filter((val, i, s) => s.indexOf(val) === i)
			this.state.userlist = this.state.userlist.concat(userlist)
		}
	}

	render() {
		let userNameElement = (name, isOnline) => {
			
			if(isOnline)
				return name ? <div><b>{name}</b> isn't chatting anywhere.</div> : null
			return name ? <div><b>{name}</b> is chatting in:</div> : null
		}
		return (
			<div className="App">
				<div className="input-wrapper">
					<input onKeyDown={e => this.handleInputEnter(e)}></input>
				</div>
				<div>
					{
						this.state.userlist.filter(e => e && e.length > 0).map((user, i) => {
							return (
								<button key={i} onClick={e => this.handleLocateButtonClick(e, user)}>
									{user}</button>
							)
						})
					}
				</div>
				<div>
					{this.state.isLocatingNow ?
						<progress max="1.0" value={this.state.progressValue}></progress>
						: ""
					}
				</div>
				<div className="history">
					{
						this.state.history.map((e, i) => {
							return (
								<div  key={i}>
									{userNameElement(e.chatter, e.chats.length <= 0)}
									{e.chats.map((e, i) => {
												return (
													<div key={i}>
														<a href={"https://www.twitch.tv/" + e}>{e}</a>
													</div>
												)
									})}
								</div>

							)
						})
					}

				</div>
			</div>
		);
	}

	async handleLocateButtonClick(e, user) {
		this.findUserInFollowedChats(user)
		.then(() => {

			let history = this.state.history
			history.unshift(this.state.result)
			this.setState({ history: history })
		})

	}

	handleInputEnter(e) {

		if (e.keyCode === 13) {
			// Cancel the default action, if needed
			// e.preventDefault();
			// Trigger the button element with a click
			console.log(e.target.value)
			this.saveUserName(e.target.value)
		}
	}

	saveUserName(nickname) {
		let cur = JSON.parse(localStorage.getItem("userlist")) || []

		cur.push(nickname)
		localStorage.setItem("userlist", JSON.stringify(cur))
		// console.log(localStorage.getItem("userlist"))
	}

	async findUserInFollowedChats(userName) {

		this.setState({ isLocatingNow: true })	

		this.intervalId = setInterval(() => {
			this.getProgress()
		}, 500)

		console.log("Sending request: /find?user=" + userName)
		await fetch("/find?user=" + userName)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				let result = {
					chatter: data.chatter,
					chats: data.chats
				}
				this.setState({ result: result })
			})
			.catch(console.log)
			.finally(e => {
				clearInterval(this.intervalId)
				this.setState({ progressValue: 0 })
				this.setState({ isLocatingNow: false })	
			})


	}

	getProgress() {
		console.log("Sending request: /getProgress")
		fetch("/getProgress")
			.then(res => res.json())
			.then(data => {
				this.setState({ progressValue: data.progress })
			})
			.catch(console.log)
	}

}

