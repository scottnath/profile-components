var M=(A,C,e)=>{if(!C.has(A))throw TypeError("Cannot "+e)};var D=(A,C,e)=>(M(A,C,"read from private field"),e?e.call(A):C.get(A)),$=(A,C,e)=>{if(C.has(A))throw TypeError("Cannot add the same private member more than once");C instanceof WeakSet?C.add(A):C.set(A,e)},j=(A,C,e,t)=>(M(A,C,"write to private field"),t?t.call(A,e):C.set(A,e),e);var H=(A,C,e)=>(M(A,C,"access private method"),e);import{s as bA,p as R,c as x}from"./html-e5f8f1d3.js";import{g as i}from"./testing-1af2f39f.js";import{g as yA,h as wA,p as u,a as m,e as p,b as h,u as s,r as E}from"./html-ea3c5b99.js";import{p as U}from"./primer-preview-b2d08037.js";import"./testing-ee0fdbc1.js";import"./index-bc5511f7.js";import"./_commonjsHelpers-de833af9.js";import"./uniq-8956f76d.js";import"./_getTag-7fd90005.js";import"./index-03bbf7d1.js";import"./index-d38bc732.js";const vA="sindresorhus",_A=170270,SA="MDQ6VXNlcjE3MDI3MA==",FA="https://avatars.githubusercontent.com/u/170270?v=4",xA="",EA="https://api.github.com/users/sindresorhus",RA="https://github.com/sindresorhus",kA="https://api.github.com/users/sindresorhus/followers",MA="https://api.github.com/users/sindresorhus/following{/other_user}",DA="https://api.github.com/users/sindresorhus/gists{/gist_id}",$A="https://api.github.com/users/sindresorhus/starred{/owner}{/repo}",UA="https://api.github.com/users/sindresorhus/subscriptions",BA="https://api.github.com/users/sindresorhus/orgs",LA="https://api.github.com/users/sindresorhus/repos",jA="https://api.github.com/users/sindresorhus/events{/privacy}",HA="https://api.github.com/users/sindresorhus/received_events",TA="User",OA=!1,PA="Sindre Sorhus",GA=null,ZA="https://sindresorhus.com/apps",qA=null,IA=null,XA=null,zA="Full-Time Open-Sourcerer. Focuses on Swift & JavaScript. Makes macOS apps, CLI tools, npm packages. Likes unicorns.",JA="sindresorhus",NA=1100,VA=97,WA=64767,QA=37,KA="2009-12-20T22:57:02Z",YA="2024-02-08T17:59:12Z",AC={login:vA,id:_A,node_id:SA,avatar_url:FA,gravatar_id:xA,url:EA,html_url:RA,followers_url:kA,following_url:MA,gists_url:DA,starred_url:$A,subscriptions_url:UA,organizations_url:BA,repos_url:LA,events_url:jA,received_events_url:HA,type:TA,site_admin:OA,name:PA,company:GA,blog:ZA,location:qA,email:IA,hireable:XA,bio:zA,twitter_username:JA,public_repos:NA,public_gists:VA,followers:WA,following:QA,created_at:KA,updated_at:YA};function n(){var A="/home/runner/work/profile-components/profile-components/src/github/user/index.js",C="70bc3cd14c364ccff7a0868a32a8d805ed29706f",e=window,t="__coverage__",r={path:"/home/runner/work/profile-components/profile-components/src/github/user/index.js",statementMap:{0:{start:{line:32,column:18},end:{line:32,column:22}},1:{start:{line:37,column:4},end:{line:37,column:12}},2:{start:{line:38,column:4},end:{line:38,column:20}},3:{start:{line:39,column:4},end:{line:39,column:22}},4:{start:{line:40,column:4},end:{line:40,column:40}},5:{start:{line:41,column:4},end:{line:41,column:26}},6:{start:{line:49,column:4},end:{line:53,column:5}},7:{start:{line:50,column:6},end:{line:52,column:7}},8:{start:{line:51,column:8},end:{line:51,column:51}},9:{start:{line:60,column:4},end:{line:64,column:5}},10:{start:{line:61,column:20},end:{line:61,column:39}},11:{start:{line:62,column:6},end:{line:62,column:32}},12:{start:{line:63,column:6},end:{line:63,column:32}},13:{start:{line:65,column:4},end:{line:65,column:61}},14:{start:{line:69,column:4},end:{line:69,column:24}},15:{start:{line:70,column:15},end:{line:70,column:17}},16:{start:{line:71,column:4},end:{line:71,column:75}},17:{start:{line:72,column:4},end:{line:72,column:31}},18:{start:{line:73,column:4},end:{line:73,column:37}},19:{start:{line:74,column:4},end:{line:76,column:5}},20:{start:{line:75,column:6},end:{line:75,column:56}},21:{start:{line:80,column:0},end:{line:80,column:49}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:36,column:2},end:{line:36,column:3}},loc:{start:{line:36,column:16},end:{line:42,column:3}},line:36},1:{name:"(anonymous_1)",decl:{start:{line:48,column:2},end:{line:48,column:3}},loc:{start:{line:48,column:19},end:{line:54,column:3}},line:48},2:{name:"(anonymous_2)",decl:{start:{line:68,column:2},end:{line:68,column:3}},loc:{start:{line:68,column:28},end:{line:77,column:3}},line:68}},branchMap:{0:{loc:{start:{line:50,column:6},end:{line:52,column:7}},type:"if",locations:[{start:{line:50,column:6},end:{line:52,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:50},1:{loc:{start:{line:60,column:4},end:{line:64,column:5}},type:"if",locations:[{start:{line:60,column:4},end:{line:64,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:60},2:{loc:{start:{line:74,column:4},end:{line:76,column:5}},type:"if",locations:[{start:{line:74,column:4},end:{line:76,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:74}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0},f:{0:0,1:0,2:0},b:{0:[0,0],1:[0,0],2:[0,0]},inputSourceMap:{version:3,sources:["/home/runner/work/profile-components/profile-components/src/github/user/index.js"],names:[],mappings:"AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC7B,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC5C;AACA,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAClG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACV,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACxC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC7D,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACX,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,C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"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"70bc3cd14c364ccff7a0868a32a8d805ed29706f"},g=e[t]||(e[t]={});(!g[A]||g[A].hash!==C)&&(g[A]=r);var L=g[A];return n=function(){return L},L}n();var c,k,gA;const l=class l extends HTMLElement{constructor(){n().f[0]++,n().s[1]++;super();$(this,k);n().s[2]++,this.attrs={},n().s[3]++,this.content={},n().s[4]++,this.attachShadow({mode:"open"}),n().s[5]++,this._getAttributes()}_getAttributes(){n().f[1]++,n().s[6]++;for(let e of this.getAttributeNames())n().s[7]++,this.getAttribute(e)?(n().b[0][0]++,n().s[8]++,this.attrs[e]=this.getAttribute(e)):n().b[0][1]++}async connectedCallback(){n().f[2]++,n().s[14]++,H(this,k,gA).call(this);let e=(n().s[15]++,"");n().s[16]++,this.content=await yA(this.attrs,this.attrs.fetch),n().s[17]++,e+=wA(this.content),n().s[18]++,this.shadowRoot.innerHTML=e,n().s[19]++,this.attrs.theme?(n().b[2][0]++,n().s[20]++,this.setAttribute("data-theme",this.attrs.theme)):n().b[2][1]++}};c=new WeakMap,k=new WeakSet,gA=function(){if(n().s[9]++,D(l,c)===null){n().b[1][0]++;const e=(n().s[10]++,new CSSStyleSheet);n().s[11]++,e.replaceSync(bA),n().s[12]++,j(l,c,e)}else n().b[1][1]++;n().s[13]++,this.shadowRoot.adoptedStyleSheets=[D(l,c)]},$(l,c,(n().s[0]++,null));let B=l;n().s[21]++;customElements.define("github-user",B);const mC={title:"GitHub/github-user",component:"github-user",tags:["autodocs"],render:A=>`
      <github-user ${attrGen({...A})}></github-user>
    `},a={args:u(s),play:async({args:A,canvasElement:C,step:e})=>{const t=await m(C);await p(t,A),await h(t,A)}},f={args:{...u(s),repos:stringinator([R(x),R(E)])},play:async({args:A,canvasElement:C,step:e})=>{const t=await m(C);await p(t,A),await h(t,A)}},b={args:u(AC),play:a.play},y={args:{login:s.login,name:s.name},play:a.play},w={args:{login:s.login,fetch:!0},parameters:{mockData:[i(s,"users")]},play:async({args:A,canvasElement:C,step:e})=>{const t=await m(C),r={...u({...s}),...A};await p(t,r),await h(t,r)}},o={args:{login:s.login,fetch:!0,name:"Meowy McMeowerstein",bio:"Spending time purring and sleepin",avatar_url:"cat-square.jpeg",followers:"500000",following:"2980",repos:stringinator([{full_name:"scottnath/profile-components",description:"Cool thing, does stuff",language:"HTML"}])},parameters:{mockData:[i(s,"users")]},play:async({args:A,canvasElement:C,step:e})=>{const t=await m(C),r={...u({...s}),...A};await p(t,r),await h(t,r)}},d={args:{login:s.login,fetch:!0,repos:stringinator([x.name,E.full_name])},parameters:{mockData:[i(s,"users"),i(x,"repos"),i(E,"repos")]},play:async({args:A,canvasElement:C,step:e})=>{const t=await m(C),r={...u({...s}),...A,repositories:[R(x),R(E)]};await p(t,r),await h(t,r)}},v={args:{login:"not-a-real-user",fetch:!0},parameters:{mockData:[i({login:"not-a-real-user"},"users",404)]},play:async({args:A,canvasElement:C,step:e})=>{const t=await m(C),r={...A,error:`User "${A.login}" not found`};await p(t,r)}},_={args:{...o.args,theme:"light_high_contrast"},render:A=>{const C=attrGen(A);return`
      <div style="display: flex; width: 1000px; margin: 1em;">
        <github-user ${C} style="flex: 1 1 200px;"></github-user>
        <github-user ${C} style="flex: 1 1 300px;"></github-user>
        <github-user ${C} style="flex: 1 1 400px;"></github-user>
      </div>
    `}},fA=A=>{const C=attrGen(A);return`
    <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
      ${U.map(e=>`
        <github-user ${C} theme="${e.value}" style="flex: 1 1 200px;"></github-user>
        `).join("")}
      ${U.map(e=>`
        <github-user ${C} theme="${e.value}" style="flex: 1 1 300px;"></github-user>
        `).join("")}
      ${U.map(e=>`
        <github-user ${C} theme="${e.value}" style="flex: 1 1 400px;"></github-user>
        `).join("")}
    </div>
  `},S={args:{...d.args},render:fA},F={args:{...o.args},render:fA};var T,O,P;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: parseFetchedUser(userScottnath),
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}`,...(P=(O=a.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var G,Z,q;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...parseFetchedUser(userScottnath),
    repos: stringinator([parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)])
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}`,...(q=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:q.source}}};var I,X,z;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: parseFetchedUser(userSindresorhus),
  play: User.play
}`,...(z=(X=b.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var J,N,V;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    name: userScottnath.name
  },
  play: User.play
}`,...(V=(N=y.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var W,Q,K;w.parameters={...w.parameters,docs:{...(W=w.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    fetch: true
  },
  parameters: {
    mockData: [generateMockResponse(userScottnath, 'users')]
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser({
        ...userScottnath
      }),
      ...args
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}`,...(K=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:K.source}}};var Y,AA,CA;o.parameters={...o.parameters,docs:{...(Y=o.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    fetch: true,
    name: "Meowy McMeowerstein",
    bio: "Spending time purring and sleepin",
    avatar_url: 'cat-square.jpeg',
    followers: "500000",
    following: "2980",
    repos: stringinator([{
      "full_name": "scottnath/profile-components",
      "description": "Cool thing, does stuff",
      "language": "HTML"
    }])
  },
  parameters: {
    mockData: [generateMockResponse(userScottnath, 'users')]
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser({
        ...userScottnath
      }),
      ...args
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}`,...(CA=(AA=o.parameters)==null?void 0:AA.docs)==null?void 0:CA.source}}};var eA,nA,tA;d.parameters={...d.parameters,docs:{...(eA=d.parameters)==null?void 0:eA.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    fetch: true,
    repos: stringinator([repoProfileComponents.name, repoStorydocker.full_name])
  },
  parameters: {
    mockData: [generateMockResponse(userScottnath, 'users'), generateMockResponse(repoProfileComponents, 'repos'), generateMockResponse(repoStorydocker, 'repos')]
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser({
        ...userScottnath
      }),
      ...args,
      repositories: [parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}`,...(tA=(nA=d.parameters)==null?void 0:nA.docs)==null?void 0:tA.source}}};var sA,rA,aA;v.parameters={...v.parameters,docs:{...(sA=v.parameters)==null?void 0:sA.docs,source:{originalSource:`{
  args: {
    login: 'not-a-real-user',
    fetch: true
  },
  parameters: {
    mockData: [generateMockResponse({
      login: 'not-a-real-user'
    }, 'users', 404)]
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: \`User "\${args.login}" not found\`
    };
    await ensureElements(elements, argsAfterFetch);
  }
}`,...(aA=(rA=v.parameters)==null?void 0:rA.docs)==null?void 0:aA.source}}};var oA,lA,iA;_.parameters={..._.parameters,docs:{...(oA=_.parameters)==null?void 0:oA.docs,source:{originalSource:`{
  args: {
    ...FetchOverides.args,
    theme: 'light_high_contrast'
  },
  render: args => {
    const attributes = attrGen(args);
    return \`
      <div style="display: flex; width: 1000px; margin: 1em;">
        <github-user \${attributes} style="flex: 1 1 200px;"></github-user>
        <github-user \${attributes} style="flex: 1 1 300px;"></github-user>
        <github-user \${attributes} style="flex: 1 1 400px;"></github-user>
      </div>
    \`;
  }
}`,...(iA=(lA=_.parameters)==null?void 0:lA.docs)==null?void 0:iA.source}}};var cA,uA,mA;S.parameters={...S.parameters,docs:{...(cA=S.parameters)==null?void 0:cA.docs,source:{originalSource:`{
  args: {
    ...ReposFetch.args
  },
  render: themesRender
}`,...(mA=(uA=S.parameters)==null?void 0:uA.docs)==null?void 0:mA.source}}};var pA,dA,hA;F.parameters={...F.parameters,docs:{...(pA=F.parameters)==null?void 0:pA.docs,source:{originalSource:`{
  args: {
    ...FetchOverides.args
  },
  render: themesRender
}`,...(hA=(dA=F.parameters)==null?void 0:dA.docs)==null?void 0:hA.source}}};const pC=["User","UserRepos","PopularUser","OnlyRequired","Fetch","FetchOverides","ReposFetch","FetchError","ContainerCheck","Themes","ThemesWithOverrides"];export{_ as ContainerCheck,w as Fetch,v as FetchError,o as FetchOverides,y as OnlyRequired,b as PopularUser,d as ReposFetch,S as Themes,F as ThemesWithOverrides,a as User,f as UserRepos,pC as __namedExportsOrder,mC as default};
//# sourceMappingURL=user.stories-c4a9d676.js.map
