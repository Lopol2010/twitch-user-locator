(this["webpackJsonplocator-web"]=this["webpackJsonplocator-web"]||[]).push([[0],{15:function(t,e,n){},17:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var s=n(0),r=n(1),a=n.n(r),i=n(5),c=n.n(i),o=(n(15),n(2)),u=n.n(o),l=n(4),h=n(6),d=n(7),f=n(9),v=n(8),j=(n(17),function(t){Object(f.a)(n,t);var e=Object(v.a)(n);function n(t){var s;Object(h.a)(this,n),(s=e.call(this,t)).state={result:{chatter:"",chats:[]},progressValue:0,isLocatingNow:!1,history:[],userlist:["nikaypypy","unuasha","arrowwoods","praden","untovvn","furbylol","flexxxid","MerrychXmas","vashue","u_r_0_d","Slexboy","honeymad","ountti","xuylo_obgashenoe","moliichan"]};var r=JSON.parse(localStorage.getItem("userlist"));return r&&(r=r.filter((function(t,e,n){return n.indexOf(t)===e})),s.state.userlist=s.state.userlist.concat(r)),s}return Object(d.a)(n,[{key:"render",value:function(){var t=this;return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)("div",{className:"input-wrapper",children:Object(s.jsx)("input",{onKeyDown:function(e){return t.handleInputEnter(e)}})}),Object(s.jsx)("div",{children:this.state.userlist.filter((function(t){return t&&t.length>0})).map((function(e,n){return Object(s.jsx)("button",{onClick:function(n){return t.handleLocateButtonClick(n,e)},children:e},n)}))}),Object(s.jsx)("div",{children:this.state.isLocatingNow?Object(s.jsx)("progress",{max:"1.0",value:this.state.progressValue}):""}),Object(s.jsx)("div",{className:"history",children:this.state.history.map((function(t,e){return Object(s.jsxs)("div",{children:[(n=t.chatter,r=t.chats.length<=0,r?n?Object(s.jsxs)("div",{children:[Object(s.jsx)("b",{children:n})," isn't chatting anywhere."]}):null:n?Object(s.jsxs)("div",{children:[Object(s.jsx)("b",{children:n})," is chatting in:"]}):null),t.chats.map((function(t,e){return Object(s.jsx)("div",{children:Object(s.jsx)("a",{href:"https://www.twitch.tv/"+t,children:t})},e)}))]},e);var n,r}))})]})}},{key:"handleLocateButtonClick",value:function(){var t=Object(l.a)(u.a.mark((function t(e,n){var s=this;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.findUserInFollowedChats(n).then((function(){var t=s.state.history;t.unshift(s.state.result),s.setState({history:t})}));case 1:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"handleInputEnter",value:function(t){13===t.keyCode&&this.saveUserName(t.target.value)}},{key:"saveUserName",value:function(t){var e=this.state.userlist||[];(e=e.concat(JSON.parse(localStorage.getItem("userlist"))||[])).push(t),localStorage.setItem("userlist",JSON.stringify(e)),this.setState({userlist:e})}},{key:"findUserInFollowedChats",value:function(){var t=Object(l.a)(u.a.mark((function t(e){var n=this;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.setState({isLocatingNow:!0}),this.intervalId=setInterval((function(){n.getProgress()}),500),console.log("Sending request: /find?user="+e),t.next=5,fetch("/find?user="+e).then((function(t){return t.json()})).then((function(t){console.log(t);var e={chatter:t.chatter,chats:t.chats};n.setState({result:e})})).catch(console.log).finally((function(t){clearInterval(n.intervalId),n.setState({progressValue:0}),n.setState({isLocatingNow:!1})}));case 5:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"getProgress",value:function(){var t=this;console.log("Sending request: /getProgress"),fetch("/getProgress").then((function(t){return t.json()})).then((function(e){t.setState({progressValue:e.progress})})).catch(console.log)}}]),n}(a.a.Component));c.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(j,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.8edb922e.chunk.js.map