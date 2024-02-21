import{s as lA,p as F,a as oA}from"./html-47749bfa.js";import{g as S}from"./testing-1af2f39f.js";import{g as cA,h as uA,p as u,u as o,r as aA}from"./html-f9d7eacd.js";import{s as pA,e as t}from"./index-0879898e.js";import{i as E}from"./index-33fe0122.js";import{p as x}from"./primer-preview-b2d08037.js";import"./_commonjsHelpers-de833af9.js";import"./uniq-8956f76d.js";import"./_getTag-7fd90005.js";import"./index-03bbf7d1.js";import"./index-d38bc732.js";const mA="sindresorhus",hA=170270,dA="MDQ6VXNlcjE3MDI3MA==",gA="https://avatars.githubusercontent.com/u/170270?v=4",fA="",wA="https://api.github.com/users/sindresorhus",yA="https://github.com/sindresorhus",bA="https://api.github.com/users/sindresorhus/followers",vA="https://api.github.com/users/sindresorhus/following{/other_user}",_A="https://api.github.com/users/sindresorhus/gists{/gist_id}",SA="https://api.github.com/users/sindresorhus/starred{/owner}{/repo}",xA="https://api.github.com/users/sindresorhus/subscriptions",FA="https://api.github.com/users/sindresorhus/orgs",EA="https://api.github.com/users/sindresorhus/repos",BA="https://api.github.com/users/sindresorhus/events{/privacy}",TA="https://api.github.com/users/sindresorhus/received_events",kA="User",DA=!1,HA="Sindre Sorhus",MA=null,RA="https://sindresorhus.com/apps",UA=null,$A=null,LA=null,qA="Full-Time Open-Sourcerer. Focuses on Swift & JavaScript. Makes macOS apps, CLI tools, npm packages. Likes unicorns.",jA="sindresorhus",OA=1100,GA=97,NA=64767,PA=37,ZA="2009-12-20T22:57:02Z",IA="2024-02-08T17:59:12Z",zA={login:mA,id:hA,node_id:dA,avatar_url:gA,gravatar_id:fA,url:wA,html_url:yA,followers_url:bA,following_url:vA,gists_url:_A,starred_url:SA,subscriptions_url:xA,organizations_url:FA,repos_url:EA,events_url:BA,received_events_url:TA,type:kA,site_admin:DA,name:HA,company:MA,blog:RA,location:UA,email:$A,hireable:LA,bio:qA,twitter_username:jA,public_repos:OA,public_gists:GA,followers:NA,following:PA,created_at:ZA,updated_at:IA},p=async C=>{const A=pA(C),e=await A.findByShadowLabelText(/GitHub user profile/i),[n]=await(e==null?void 0:e.querySelectorAll('[itemprop="alternativeName"]')),[r]=await A.queryAllByShadowRole("link"),[i]=await A.queryAllByShadowRole("img"),[h]=await(e==null?void 0:e.querySelectorAll('[itemprop="description"]'));return{screen:A,canvasElement:C,container:e,error:await(e==null?void 0:e.querySelector('[itemprop="error"]')),headerName:n,mainLink:r,avatar:i,name:await(r==null?void 0:r.querySelector('[itemprop="name"]')),login:await(r==null?void 0:r.querySelector('[itemprop="alternativeName"]')),bio:h,followers:await(e==null?void 0:e.querySelector('[itemprop="followee"]')),following:await(e==null?void 0:e.querySelector('[itemprop="follows"]')),repos:await Array.from(e==null?void 0:e.querySelectorAll("[itemscope].repo"))}},m=async(C,A)=>{if(A.error){await t(C.mainLink).toBeFalsy(),await t(C.container).toBeTruthy(),await t(C.error).toBeTruthy(),await t(C.error).toHaveTextContent(A.error);return}if(await t(C.error).toBeFalsy(),await t(C.container).toBeTruthy(),await t(C.headerName).toBeTruthy(),await t(C.headerName).toHaveTextContent(A.login),await t(C.mainLink).toBeTruthy(),await t(C.avatar).toBeTruthy(),await t(C.name).toBeTruthy(),await t(C.login).toBeTruthy(),A!=null&&A.bio?(await t(C.bio).toBeTruthy(),await t(C.bio).toHaveTextContent(A.bio)):await t(C.bio).toBeFalsy(),A!=null&&A.following?(await t(C.following).toBeTruthy(),await t(C.following).toHaveTextContent(E(A.following))):await t(C.following).toBeFalsy(),A!=null&&A.followers?(await t(C.followers).toBeTruthy(),await t(C.followers).toHaveTextContent(E(A.followers))):await t(C.followers).toBeFalsy(),A!=null&&A.repos){let e=[];try{e=parseify(A.repos),await t(C.repos).toHaveLength(e.length)}catch{await t(C.repos).toHaveLength(0)}}else await t(C.repos).toHaveLength(0)};function s(){var C="/home/runner/work/profile-components/profile-components/src/github/user/index.js",A="371f3a3eb33ff7a4dc96194b15d91bbe5147df04",e=window,n="__coverage__",r={path:"/home/runner/work/profile-components/profile-components/src/github/user/index.js",statementMap:{0:{start:{line:36,column:4},end:{line:36,column:12}},1:{start:{line:37,column:4},end:{line:37,column:20}},2:{start:{line:38,column:4},end:{line:38,column:22}},3:{start:{line:39,column:4},end:{line:39,column:40}},4:{start:{line:40,column:4},end:{line:40,column:26}},5:{start:{line:48,column:4},end:{line:52,column:5}},6:{start:{line:49,column:6},end:{line:51,column:7}},7:{start:{line:50,column:8},end:{line:50,column:51}},8:{start:{line:56,column:15},end:{line:56,column:41}},9:{start:{line:57,column:4},end:{line:57,column:75}},10:{start:{line:58,column:4},end:{line:58,column:31}},11:{start:{line:59,column:4},end:{line:59,column:37}},12:{start:{line:60,column:4},end:{line:62,column:5}},13:{start:{line:61,column:6},end:{line:61,column:56}},14:{start:{line:66,column:0},end:{line:66,column:49}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:35,column:2},end:{line:35,column:3}},loc:{start:{line:35,column:16},end:{line:41,column:3}},line:35},1:{name:"(anonymous_1)",decl:{start:{line:47,column:2},end:{line:47,column:3}},loc:{start:{line:47,column:19},end:{line:53,column:3}},line:47},2:{name:"(anonymous_2)",decl:{start:{line:55,column:2},end:{line:55,column:3}},loc:{start:{line:55,column:28},end:{line:63,column:3}},line:55}},branchMap:{0:{loc:{start:{line:49,column:6},end:{line:51,column:7}},type:"if",locations:[{start:{line:49,column:6},end:{line:51,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:49},1:{loc:{start:{line:60,column:4},end:{line:62,column:5}},type:"if",locations:[{start:{line:60,column:4},end:{line:62,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:60}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0},f:{0:0,1:0,2:0},b:{0:[0,0],1:[0,0]},inputSourceMap:{version:3,sources:["/home/runner/work/profile-components/profile-components/src/github/user/index.js"],names:[],mappings:"AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC7B,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC5C;AACA,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAClG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACV,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACxC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC7D,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACX,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,C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"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"371f3a3eb33ff7a4dc96194b15d91bbe5147df04"},i=e[n]||(e[n]={});(!i[C]||i[C].hash!==A)&&(i[C]=r);var h=i[C];return s=function(){return h},h}s();class VA extends HTMLElement{constructor(){s().f[0]++,s().s[0]++,super(),s().s[1]++,this.attrs={},s().s[2]++,this.content={},s().s[3]++,this.attachShadow({mode:"open"}),s().s[4]++,this._getAttributes()}_getAttributes(){s().f[1]++,s().s[5]++;for(let A of this.getAttributeNames())s().s[6]++,this.getAttribute(A)?(s().b[0][0]++,s().s[7]++,this.attrs[A]=this.getAttribute(A)):s().b[0][1]++}async connectedCallback(){s().f[2]++;let A=(s().s[8]++,`<style>${lA}</style>`);s().s[9]++,this.content=await cA(this.attrs,this.attrs.fetch),s().s[10]++,A+=uA(this.content),s().s[11]++,this.shadowRoot.innerHTML=A,s().s[12]++,this.attrs.theme?(s().b[1][0]++,s().s[13]++,this.setAttribute("data-theme",this.attrs.theme)):s().b[1][1]++}}s().s[14]++;customElements.define("github-user",VA);const rC={title:"GitHub/github-user",component:"github-user",tags:["autodocs"],render:C=>`
      <github-user ${attrGen(C)}></github-user>
    `},a={args:u(o),play:async({args:C,canvasElement:A,step:e})=>{const n=await p(A);await m(n,C)}},d={args:{...a.args,repos:stringify([{...F(oA),user_login:o.login},F(aA)])},play:a.play},g={args:u(zA),play:a.play},f={args:{login:o.login,name:o.name},play:a.play},w={args:{login:o.login,fetch:!0},parameters:{mockData:[S(o,"users")]},play:async({args:C,canvasElement:A,step:e})=>{const n=await p(A),r={...u(o),...C};await m(n,r)}},l={args:{login:o.login,fetch:!0,name:"Meowy McMeowerstein",bio:"Spending time purring and sleepin",avatar_url:"cat-square.jpeg",followers:"500000",following:"2980",repos:stringify([{full_name:"scottnath/profile-components",description:"Cool thing, does stuff",language:"HTML"}])},parameters:{mockData:[S(o,"users")]},play:async({args:C,canvasElement:A,step:e})=>{const n=await p(A),r={...u(o),...C};await m(n,r)}},c={args:{login:o.login,fetch:!0,repos:stringify([oA.name,aA.full_name])},parameters:{mockData:[S(o,"users")]},play:async({args:C,canvasElement:A,step:e})=>{const n=await p(A),r={...u(o),...C};await m(n,r)}},y={args:{login:"not-a-real-user",fetch:!0},parameters:{mockData:[S({login:"not-a-real-user"},"users",404)]},play:async({args:C,canvasElement:A,step:e})=>{const n=await p(A),r={...C,error:`User "${C.login}" not found`};await m(n,r)}},b={args:{...l.args,theme:"light_high_contrast"},render:C=>{const A=attrGen(C);return`
      <div style="display: flex; width: 1000px; margin: 1em;">
        <github-user ${A} style="flex: 1 1 200px;"></github-user>
        <github-user ${A} style="flex: 1 1 300px;"></github-user>
        <github-user ${A} style="flex: 1 1 400px;"></github-user>
      </div>
    `}},iA=C=>{const A=attrGen(C);return`
    <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
      ${x.map(e=>`
        <github-user ${A} theme="${e.value}" style="flex: 1 1 200px;"></github-user>
        `).join("")}
      ${x.map(e=>`
        <github-user ${A} theme="${e.value}" style="flex: 1 1 300px;"></github-user>
        `).join("")}
      ${x.map(e=>`
        <github-user ${A} theme="${e.value}" style="flex: 1 1 400px;"></github-user>
        `).join("")}
    </div>
  `},v={args:{...c.args},render:iA},_={args:{...l.args},render:iA};var B,T,k;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: parseFetchedUser(userScottnath),
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
  }
}`,...(k=(T=a.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var D,H,M;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...User.args,
    repos: stringify([{
      ...parseFetchedRepo(repoProfileComponents),
      user_login: userScottnath.login
    }, parseFetchedRepo(repoStorydocker)])
  },
  play: User.play
}`,...(M=(H=d.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var R,U,$;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: parseFetchedUser(userSindresorhus),
  play: User.play
}`,...($=(U=g.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var L,q,j;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    name: userScottnath.name
  },
  play: User.play
}`,...(j=(q=f.parameters)==null?void 0:q.docs)==null?void 0:j.source}}};var O,G,N;w.parameters={...w.parameters,docs:{...(O=w.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
      ...parseFetchedUser(userScottnath),
      ...args
    };
    await ensureElements(elements, argsAfterFetch);
  }
}`,...(N=(G=w.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var P,Z,I;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    fetch: true,
    name: "Meowy McMeowerstein",
    bio: "Spending time purring and sleepin",
    avatar_url: 'cat-square.jpeg',
    followers: "500000",
    following: "2980",
    repos: stringify([{
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
      ...parseFetchedUser(userScottnath),
      ...args
    };
    await ensureElements(elements, argsAfterFetch);
  }
}`,...(I=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:I.source}}};var z,V,W;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    login: userScottnath.login,
    fetch: true,
    repos: stringify([repoProfileComponents.name, repoStorydocker.full_name])
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
      ...parseFetchedUser(userScottnath),
      ...args
    };
    await ensureElements(elements, argsAfterFetch);
  }
}`,...(W=(V=c.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var X,J,Q;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Q=(J=y.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var K,Y,AA;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(AA=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:AA.source}}};var CA,eA,tA;v.parameters={...v.parameters,docs:{...(CA=v.parameters)==null?void 0:CA.docs,source:{originalSource:`{
  args: {
    ...ReposFetch.args
  },
  render: themesRender
}`,...(tA=(eA=v.parameters)==null?void 0:eA.docs)==null?void 0:tA.source}}};var sA,rA,nA;_.parameters={..._.parameters,docs:{...(sA=_.parameters)==null?void 0:sA.docs,source:{originalSource:`{
  args: {
    ...FetchOverides.args
  },
  render: themesRender
}`,...(nA=(rA=_.parameters)==null?void 0:rA.docs)==null?void 0:nA.source}}};const nC=["User","UserRepos","PopularUser","OnlyRequired","Fetch","FetchOverides","ReposFetch","FetchError","ContainerCheck","Themes","ThemesWithOverrides"];export{b as ContainerCheck,w as Fetch,y as FetchError,l as FetchOverides,f as OnlyRequired,g as PopularUser,c as ReposFetch,v as Themes,_ as ThemesWithOverrides,a as User,d as UserRepos,nC as __namedExportsOrder,rC as default};
//# sourceMappingURL=user.stories-635fa5de.js.map
