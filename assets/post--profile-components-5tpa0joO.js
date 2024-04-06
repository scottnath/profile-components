const s="article";const e="Profile Components: display social profiles in native web components",n="Profile-components are a set of web components with zero dependencies that display publicly-available profile information from various social networks. Currently two: GitHub and dev.to.",a="Oct 10 '23",t="profile-components-display-social-profiles-in-native-web-components-49b2",o="/scottnath/profile-components-display-social-profiles-in-native-web-components-49b2",i="https://dev.to/scottnath/profile-components-display-social-profiles-in-native-web-components-49b2";const l="2023-10-10T16:19:14Z";const p="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fsvvid1vh9qtimahal8c7.jpeg",r="https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fsvvid1vh9qtimahal8c7.jpeg",c="https://scottnath.com/blahg/profile-components/",h="2023-10-10T16:19:15Z",d="2023-10-11T20:26:42Z";const m="2023-10-10T16:19:14Z",u="2023-10-10T16:19:14Z";const g="webcomponents, opensource, javascript, css",f=["webcomponents","opensource","javascript","css"],v=`<p>Profile Components is a set of web components with zero dependencies that display publicly-available profile information from various social networks. Currently two: GitHub and dev.to.</p>

<p>Being native web components, these can be used in any HTML page, framework-based site, or wherever you can use HTML.  They are available via unpkg.com or you can add the NPM module to your project.</p>

<h2>
  <a name="100-all-natural-features" href="#100-all-natural-features">
  </a>
  100% All Natural Features!
</h2>

<p>🔥 <a href="#%F0%9F%94%A5">100% native web components</a></p>

<p>🚫 <a href="#%F0%9F%9A%AB">Zero dependencies</a></p>

<p>🔓 <a href="#%F0%9F%94%93">No api keys needed</a></p>

<p>🎨 <a href="#%F0%9F%8E%A8">New hotness CSS w/nesting &amp; container queries</a></p>

<p>👷 <a href="#%F0%9F%91%B7">DX: Separate files for Javascript, HTML, and CSS</a></p>

<p>✅ <a href="#%E2%9C%85">Native unit testing with node:test</a></p>

<p>♿ <a href="#%E2%99%BF">Fully accessible</a></p>

<p>🎁 <a href="#%F0%9F%8E%81">Bonus! A sneaky SSR workaround for server side rendering!</a></p>

<h2>
  <a name="tldr" href="#tldr">
  </a>
  tl;dr
</h2>

<p>use via unpkg.com:<br>
</p>

<div class="highlight js-code-highlight">
<pre class="highlight html"><code><span class="c">&lt;!-- add to HEAD --&gt;</span>
<span class="nt">&lt;script 
  </span><span class="na">type=</span><span class="s">"module"</span> 
  <span class="na">src=</span><span class="s">"https://unpkg.com/profile-components/dist/github-user.js"</span><span class="nt">&gt;&lt;/script&gt;</span>

<span class="c">&lt;!-- shows a GitHub profile with fetched content for user \`scottnath\` --&gt;</span>
<span class="nt">&lt;github-user</span> <span class="na">username=</span><span class="s">"scottnath"</span> <span class="na">fetch=</span><span class="s">"true"</span><span class="nt">&gt;&lt;/github-user&gt;</span>
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



<p>install via NPM: </p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>npm i profile-components
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>

<p>links to learn more:</p>

<ul>
<li><a href="https://github.com/scottnath/profile-components">profile-components on GitHub</a></li>
<li>play with the components in <a href="https://scottnath.github.io/profile-components">Storybook</a>
</li>
<li><a href="https://stackblitz.com/edit/profile-components">See demos on stackblitz</a></li>
</ul>

<h2>
  <a name="frameworkfree-in-2023" href="#frameworkfree-in-2023">
  </a>
  🔥 Framework-free in 2023! <a name="%F0%9F%94%A5"></a>
</h2>

<p>There have been a lot of feature drops across the major browsers this year, allowing us to more easily build shareable and reusable web components without any frameworks and without pre-or-post style-processors like Sass or PostCSS. This includes full implementation most of the original web components spec (🫗 <em>r.i.p. HTML imports</em>.) This year also includes lots of long-sought-after CSS features like container queries and nesting. </p>

<p><code>profile-components</code> contain user interfaces without interactions or changing state making them simple to build cross-browser. As web components with unique styling, the isolation of styles inside the shadow dom is a benefit because each component uses a different set of root variables and styles. The style isolation allows these old school "widgets" to visually represent the social network they are displaying without affecting the rest of your page.</p>

<h2>
  <a name="zero-dependencies" href="#zero-dependencies">
  </a>
  🚫 Zero dependencies <a name="%F0%9F%9A%AB"></a>
</h2>

<p>Any dependencies on this project are only for development. Meaning there are dependencies listed in <code>devDependencies</code>, but those are for testing and building the distributed components. The only external code which goes into the final build are the style variables and icons pulled from the social network's open source code.</p>

<h2>
  <a name="fetches-live-data-no-api-keys-needed" href="#fetches-live-data-no-api-keys-needed">
  </a>
  🔓 Fetches live data - no api keys needed! <a name="%F0%9F%94%93"></a>
</h2>

<p>There are two options for sourcing content into these web components: fetch it live from the social's rest API or feed the component static data via the HTML attributes. You may also mix in your own data to overwrite what comes from the APIs - like if you wanted to have a local avatar image instead. </p>

<p><em>note</em>: future components may need an API key(s), but for now, these use public, AUTH-free endpoints.</p>

<h3>
  <a name="fetching-live-data-raw-fetchtrue-endraw-" href="#fetching-live-data-raw-fetchtrue-endraw-">
  </a>
  Fetching live data (<code>fetch="true"</code>)
</h3>



<div class="highlight js-code-highlight">
<pre class="highlight html"><code><span class="nt">&lt;github-user</span>
  <span class="na">username=</span><span class="s">"scottnath"</span>
  <span class="na">fetch=</span><span class="s">"true"</span>
<span class="nt">&gt;&lt;/github-user&gt;</span>
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--WrulD-I7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lnrvjz1q4aoz1srs1lj7.png" class="article-body-image-wrapper"><img alt="Example of GitHub profile component with fetched data" src="https://res.cloudinary.com/practicaldev/image/fetch/s--WrulD-I7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lnrvjz1q4aoz1srs1lj7.png" loading="lazy" width="400" height="319"></a></p>

<h3>
  <a name="or-skip-fetching-and-use-static-data" href="#or-skip-fetching-and-use-static-data">
  </a>
  ...or... Skip fetching and use static data
</h3>



<div class="highlight js-code-highlight">
<pre class="highlight html"><code><span class="nt">&lt;github-user</span>
<span class="na">username=</span><span class="s">"scottnath"</span>
<span class="na">name=</span><span class="s">"Meowy McMeowerstein"</span>
<span class="na">bio=</span><span class="s">"Spending time purring and sleepin"</span>
<span class="na">followers=</span><span class="s">"500000"</span>
<span class="na">following=</span><span class="s">"2980"</span>
<span class="na">avatar_url=</span><span class="s">"/cat-avatar.png"</span>
<span class="nt">&gt;&lt;/github-user&gt;</span>
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--3zz7kpLS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d6vqasq6nuf259y2iv37.png" class="article-body-image-wrapper"><img alt="Example of GitHub profile component with local data" src="https://res.cloudinary.com/practicaldev/image/fetch/s--3zz7kpLS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d6vqasq6nuf259y2iv37.png" loading="lazy" width="399" height="292"></a></p>

<h2>
  <a name="styles" href="#styles">
  </a>
  🎨 Styles <a name="%F0%9F%8E%A8"></a>
</h2>

<p>Stylesheets are written in pure CSS and only use features which are supported in all major browsers. </p>

<h3>
  <a name="nesting" href="#nesting">
  </a>
  Nesting
</h3>

<p>Stylesheets have their styles nested to reduce adding extra classes to the HTML and to make them easier to maintain.<br>
</p>

<div class="highlight js-code-highlight">
<pre class="highlight css"><code><span class="c">/* uses \`:has\` to target the dl with a .post inside */</span>
<span class="o">&amp;</span> <span class="nt">dl</span><span class="nd">:has</span><span class="o">(</span><span class="nc">.post</span><span class="o">)</span> <span class="p">{</span>
  <span class="nl">border-bottom</span><span class="p">:</span> <span class="m">1px</span> <span class="nb">solid</span> <span class="n">var</span><span class="p">(</span><span class="n">--color-shadow</span><span class="p">);</span>
  <span class="nl">padding-bottom</span><span class="p">:</span> <span class="m">1em</span><span class="p">;</span>

  <span class="c">/* any \`dt\` inside a \`dl\` with a \`.post\` inside */</span>
  <span class="err">&amp;</span> <span class="err">dt</span> <span class="err">{</span>
    <span class="nl">color</span><span class="p">:</span> <span class="n">var</span><span class="p">(</span><span class="n">--color-light</span><span class="p">);</span>
    <span class="nl">font-size</span><span class="p">:</span> <span class="n">var</span><span class="p">(</span><span class="n">--font-size-light</span><span class="p">);</span>
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



<h3>
  <a name="container-queries" href="#container-queries">
  </a>
  Container Queries
</h3>

<p>Container queries allow the components to be responsive to their container, not the viewport - a more realistic usage scenario.</p>

<div class="table-wrapper-paragraph"><table>
<tr>
<td>
<figure><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Whjt3nmU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wfvq67xyn46i7vviwlki.png" alt="DEV web component in a 200 pixel wide container" loading="lazy" width="200" height="404"><figcaption>200px wide container</figcaption></figure>
</td>
<td>
<figure><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--qTDchJWb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b5vvp6bf951p2au7bf84.png" alt="DEV web component in a 400 pixel wide container" loading="lazy" width="400" height="288"><figcaption>400px wide container</figcaption></figure>
</td>
</tr>
</table></div>

<h3>
  <a name="colors-and-css-variables-sourced-from-the-social-network" href="#colors-and-css-variables-sourced-from-the-social-network">
  </a>
  Colors and CSS variables sourced from the social network
</h3>

<p>To make the components <em>feel</em> like the sites they represent, they need to use the same colors, icons, and fonts. So to build these components, I sourced CSS variables from their open source repositories or modules. For GitHub, this means styles from the <a href="https://primer.style/">primer design system</a> and for dev.to, which is built using the <a href="https://www.forem.com/">Forem community software</a>, I sourced styles from the <a href="https://github.com/forem/forem">forem/forem repo on GitHub</a>.<br>
</p>

<div class="highlight js-code-highlight">
<pre class="highlight css"><code><span class="c">/* from the GitHub design-system, primer */</span>
<span class="c">/* Light Theme */</span><span class="nd">:host</span><span class="o">([</span><span class="nt">data-theme</span><span class="o">=</span><span class="s1">"light"</span><span class="o">])</span> <span class="p">{</span>
  <span class="py">--color-avatar-border</span><span class="p">:</span> <span class="n">rgba</span><span class="p">(</span><span class="m">31</span><span class="p">,</span><span class="m">35</span><span class="p">,</span><span class="m">40</span><span class="p">,</span><span class="m">0.15</span><span class="p">);</span>
  <span class="py">--color-border-default</span><span class="p">:</span> <span class="m">#d0d7de</span><span class="p">;</span>
  <span class="py">--color-canvas-default</span><span class="p">:</span> <span class="m">#ffffff</span><span class="p">;</span>
  <span class="py">--color-canvas-subtle</span><span class="p">:</span> <span class="m">#f6f8fa</span><span class="p">;</span>
  <span class="py">--color-fg-default</span><span class="p">:</span> <span class="m">#1F2328</span><span class="p">;</span>
  <span class="py">--color-fg-muted</span><span class="p">:</span> <span class="m">#656d76</span><span class="p">;</span>
  <span class="py">--color-fg-subtle</span><span class="p">:</span> <span class="m">#6e7781</span><span class="p">;</span>
  <span class="py">--color-fg-onemphasis</span><span class="p">:</span> <span class="m">#ffffff</span><span class="p">;</span>
  <span class="py">--color-fg-accent</span><span class="p">:</span> <span class="m">#0969da</span><span class="p">;</span>
  <span class="py">--color-fg-danger</span><span class="p">:</span> <span class="m">#d1242f</span><span class="p">;</span>
<span class="p">}</span>
<span class="c">/* Light Protanopia &amp; Deuteranopia Theme */</span><span class="nd">:host</span><span class="o">([</span><span class="nt">data-theme</span><span class="o">=</span><span class="s1">"light_colorblind"</span><span class="o">])</span> <span class="p">{</span>
  <span class="py">--color-avatar-border</span><span class="p">:</span> <span class="n">rgba</span><span class="p">(</span><span class="m">27</span><span class="p">,</span><span class="m">31</span><span class="p">,</span><span class="m">36</span><span class="p">,</span><span class="m">0.15</span><span class="p">);</span>
  <span class="err">...</span>
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



<h2>
  <a name="dx-separate-files-for-javascript-html-and-css" href="#dx-separate-files-for-javascript-html-and-css">
  </a>
  👷 DX: Separate files for Javascript, HTML, and CSS <a name="%F0%9F%91%B7"></a>
</h2>

<p>"<em>Easy to maintain</em>" requires a good Developer Experience (DX). To make these components easier to iterate on and update, they're built like a web page. This means separate HTML, Javascript and CSS files. While the development happens in separate files, the content from the various files is compiled into a single file for distribution.</p>

<p>I was inspired by Leon Eck's post <a href="https://leoneck.de/blog/wc-split-setup/">Splitting Web Components into .ts, .html, and .scss files</a>, which detailed a similar approach, using <a href="https://esbuild.github.io/">esbuild</a> to compile the files into a single file. Esbuild is pretty simple to set up and configure, and it easily takes every <code>import</code>ed file and converts it to an in-file variable. </p>

<h3>
  <a name="html-generation-without-frameworks-or-libraries" href="#html-generation-without-frameworks-or-libraries">
  </a>
  HTML generation without frameworks or libraries
</h3>

<p>To maintain the <strong>zero dependencies</strong> goal, the HTML is living inside a Javascript file as a string returned from a method that accepts a single, JSDoc-documented parameter. This is not ideal, but allows using Javascript to generate the HTML without a framework or templating library like Lit or Handlebars. This is also what makes the SSR trick easy to pull off.</p>

<h3>
  <a name="javascript-methods-outside-of-the-customelements-class" href="#javascript-methods-outside-of-the-customelements-class">
  </a>
  Javascript methods outside of the customElements class
</h3>

<p>Testing is paramount to easy maintenance. The JS methods used by these components perform fairly simple tasks which can be unit tested without the need for a browser. These web components get data using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>, which is fully implemented in both Node and browsers, making it easy to create mock responses and unit tests. They <strong>can also be used outside of the web component</strong>, so a separate file makes sense. </p>

<h3>
  <a name="separate-stylesheets-for-styles-and-source-variables" href="#separate-stylesheets-for-styles-and-source-variables">
  </a>
  Separate stylesheets for styles and source variables.
</h3>

<p>There are separate sheets for maintainability. Generally, there is one auto-generated file with variables from the social network, one with stylesheet with global styles (since there are multiple components with unique styles combined), and one stylesheet per component. Generally the files are:</p>

<dl>
  <dt>vars-[source].css</dt>
  <dd>e.g. \`vars-devto.css\`.</dd>
  <dd>Variables from the social network's open source code</dd>
  <dt>global.css</dt>
  <dd>Global style variables</dd>
  <dd>Shared across all components</dd>
  <dt>[component].css</dt>
  <dd>e.g. \`user.css\` or \`repository.css\`</dd>
  <dd>Styles specific to the component</dd>
</dl>

<p>These are then imported by the web component and exported with the HTML inside a <code>&lt;style&gt;</code> tag.</p>

<h2>
  <a name="fully-accessible" href="#fully-accessible">
  </a>
  ♿ Fully accessible <a name="%E2%99%BF"></a>
</h2>

<p>These components are tested using screen readers and AXE via Storybook. The HTML structure focuses on semantic HTML and when read aloud via screen reader, screen-reader-only content is available to provide context to the user.</p>

<p>For example, in the GitHub component, the header looks like this:</p>

<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--aKju_g2d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x59wzhfb9fgmp9vjsl9d.png" class="article-body-image-wrapper"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--aKju_g2d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x59wzhfb9fgmp9vjsl9d.png" alt="GitHub component header shows the GitHub logo and the username" loading="lazy" width="159" height="57"></a></p>

<p>And the HTML is this:<br>
</p>

<div class="highlight js-code-highlight">
<pre class="highlight html"><code><span class="nt">&lt;section</span> <span class="na">aria-label=</span><span class="s">"GitHub user profile"</span> <span class="na">itemscope</span> <span class="na">itemtype=</span><span class="s">"http://schema.org/Person"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;header&gt;</span>
    <span class="nt">&lt;span&gt;&lt;span</span> <span class="na">itemprop=</span><span class="s">"memberOf"</span><span class="nt">&gt;</span>GitHub<span class="nt">&lt;/span&gt;</span> user<span class="nt">&lt;/span&gt;</span> 
    <span class="nt">&lt;span</span> <span class="na">itemprop=</span><span class="s">"alternativeName"</span><span class="nt">&gt;</span>scottnath<span class="nt">&lt;/span&gt;</span>
  <span class="nt">&lt;/header&gt;</span>
</code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



<p>The styles convert the first span into the GitHub logo using CSS' <code>mask-image</code> property. This visually hides the text, but it's still available to screen readers, so the screen reader reads this to the user:</p>

<p>"<em>GitHub user profile GitHub user scottnath</em>"</p>

<p><em>note</em>: The <code>itemscope</code> and other <code>item[thing]</code> attributes are from <a href="https://schema.org">schema.org</a>. These are used to structutre the data into microformats. This is more for SEO and content structure than for accessibility.</p>

<h2>
  <a name="native-unit-testing-with-node-20s-nodetest" href="#native-unit-testing-with-node-20s-nodetest">
  </a>
  ✅ Native Unit Testing with Node 20's node:test <a name="%E2%9C%85"></a>
</h2>

<p>Might as well go all in! <strong>Node 20 shipped with a native test runner</strong>, <a href="https://nodejs.org/api/test.html">node:test</a>. Fairly simple test runner, but it includes code coverage and has all the functionality needed to unit test these components.</p>

<p>The latest unit test runs are visible in the <a href="https://github.com/scottnath/profile-components/actions/workflows/unit-tests.yml">unit tests GitHub action workflow for profile-components</a></p>

<h2>
  <a name="bonus-server-side-rendering-cheatcode" href="#bonus-server-side-rendering-cheatcode">
  </a>
  🎁 bonus! Server Side Rendering cheatcode! <a name="%F0%9F%8E%81"></a>
</h2>

<p>Because these components were built with separate HTML, CSS, and JS files, you can use those pieces to generate HTML on the server. This example is what I did to make <a href="https://github.com/scottnath/scottnath.com/blob/main/workspaces/website/src/components/DevToUser.astro">an Astro component for scottnath.com</a>.<br>
</p>

<div class="highlight js-code-highlight">
<pre class="highlight javascript"><code><span class="c1">// DevToUser.astro</span>
<span class="o">---</span>
<span class="k">import</span> <span class="nx">devto</span> <span class="k">from</span> <span class="dl">'</span><span class="s1">profile-components/devto-utils.js</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">user</span> <span class="o">=</span> <span class="nx">devto</span><span class="p">.</span><span class="nx">user</span><span class="p">;</span>

<span class="kd">const</span> <span class="nx">userContent</span> <span class="o">=</span> <span class="k">await</span> <span class="nx">user</span><span class="p">.</span><span class="nx">generateContent</span><span class="p">({</span>
  <span class="na">username</span><span class="p">:</span> <span class="dl">'</span><span class="s1">scottnath</span><span class="dl">'</span><span class="p">,</span>
<span class="p">},</span><span class="kc">true</span><span class="p">);</span>
<span class="kd">let</span> <span class="nx">userHTML</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">&lt;style&gt;</span><span class="dl">'</span> <span class="o">+</span> <span class="nx">user</span><span class="p">.</span><span class="nx">styles</span> <span class="o">+</span> <span class="dl">'</span><span class="s1">&lt;/style&gt;</span><span class="dl">'</span><span class="p">;</span>
<span class="nx">userHTML</span> <span class="o">+=</span> <span class="nx">user</span><span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">userContent</span><span class="p">);</span>
<span class="o">---</span>

<span class="o">&lt;</span><span class="nx">devto</span><span class="o">-</span><span class="nx">user</span><span class="o">&gt;</span>
  <span class="o">&lt;</span><span class="nx">template</span> <span class="nx">shadowrootmode</span><span class="o">=</span><span class="dl">"</span><span class="s2">open</span><span class="dl">"</span> <span class="kd">set</span><span class="p">:</span><span class="nx">html</span><span class="o">=</span><span class="p">{</span><span class="nx">userHTML</span><span class="p">}</span><span class="o">&gt;</span>
  <span class="o">&lt;</span><span class="sr">/template</span><span class="err">&gt;
</span><span class="o">&lt;</span><span class="sr">/devto-user</span><span class="err">&gt;
</span></code></pre>
<div class="highlight__panel js-actions-panel">
<div class="highlight__panel-action js-fullscreen-code-action">
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-on"><title>Enter fullscreen mode</title>
    <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"></path>
</svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewbox="0 0 24 24" class="highlight-action crayons-icon highlight-action--fullscreen-off"><title>Exit fullscreen mode</title>
    <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"></path>
</svg>

</div>
</div>
</div>



`,w=`---
description: "Profile-components are a set of web components with zero dependencies that display publicly-available profile information from various social networks. Currently two: GitHub and dev.to."
pubDate: "2023-10-10"
series: Profile-Components
---

Profile Components is a set of web components with zero dependencies that display publicly-available profile information from various social networks. Currently two: GitHub and dev.to.

Being native web components, these can be used in any HTML page, framework-based site, or wherever you can use HTML.  They are available via unpkg.com or you can add the NPM module to your project.

## 100% All Natural Features!


🔥 [100% native web components](#🔥)

🚫 [Zero dependencies](#🚫)

🔓 [No api keys needed](#🔓)

🎨 [New hotness CSS w/nesting & container queries](#🎨)

👷 [DX: Separate files for Javascript, HTML, and CSS](#👷)

✅ [Native unit testing with node:test](#✅)

♿ [Fully accessible](#♿)

🎁 [Bonus! A sneaky SSR workaround for server side rendering!](#🎁)


## tl;dr

use via unpkg.com:

\`\`\`html
<!-- add to HEAD -->
<script 
  type="module" 
  src="https://unpkg.com/profile-components/dist/github-user.js"><\/script>

<!-- shows a GitHub profile with fetched content for user \`scottnath\` -->
<github-user username="scottnath" fetch="true"></github-user>
\`\`\`

install via NPM: 
    
    npm i profile-components

links to learn more:

* [profile-components on GitHub](https://github.com/scottnath/profile-components)
* play with the components in [Storybook](https://scottnath.github.io/profile-components)
* [See demos on stackblitz](https://stackblitz.com/edit/profile-components)

## 🔥 Framework-free in 2023! <a name="🔥"></a>

There have been a lot of feature drops across the major browsers this year, allowing us to more easily build shareable and reusable web components without any frameworks and without pre-or-post style-processors like Sass or PostCSS. This includes full implementation most of the original web components spec (🫗 _r.i.p. HTML imports_.) This year also includes lots of long-sought-after CSS features like container queries and nesting. 

\`profile-components\` contain user interfaces without interactions or changing state making them simple to build cross-browser. As web components with unique styling, the isolation of styles inside the shadow dom is a benefit because each component uses a different set of root variables and styles. The style isolation allows these old school "widgets" to visually represent the social network they are displaying without affecting the rest of your page.

## 🚫 Zero dependencies <a name="🚫"></a>

Any dependencies on this project are only for development. Meaning there are dependencies listed in \`devDependencies\`, but those are for testing and building the distributed components. The only external code which goes into the final build are the style variables and icons pulled from the social network's open source code.

## 🔓 Fetches live data - no api keys needed! <a name="🔓"></a>

There are two options for sourcing content into these web components: fetch it live from the social's rest API or feed the component static data via the HTML attributes. You may also mix in your own data to overwrite what comes from the APIs - like if you wanted to have a local avatar image instead. 

_note_: future components may need an API key(s), but for now, these use public, AUTH-free endpoints.

### Fetching live data (\`fetch="true"\`)

\`\`\`html
<github-user
  username="scottnath"
  fetch="true"
></github-user>
\`\`\`
<img alt="Example of GitHub profile component with fetched data" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lnrvjz1q4aoz1srs1lj7.png" />

### ...or... Skip fetching and use static data


\`\`\`html
<github-user
username="scottnath"
name="Meowy McMeowerstein"
bio="Spending time purring and sleepin"
followers="500000"
following="2980"
avatar_url="/cat-avatar.png"
></github-user>
\`\`\`

<img alt="Example of GitHub profile component with local data" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d6vqasq6nuf259y2iv37.png" />


## 🎨 Styles <a name="🎨"></a>

Stylesheets are written in pure CSS and only use features which are supported in all major browsers. 

### Nesting

Stylesheets have their styles nested to reduce adding extra classes to the HTML and to make them easier to maintain.

\`\`\`css
/* uses \`:has\` to target the dl with a .post inside */
& dl:has(.post) {
  border-bottom: 1px solid var(--color-shadow);
  padding-bottom: 1em;

  /* any \`dt\` inside a \`dl\` with a \`.post\` inside */
  & dt {
    color: var(--color-light);
    font-size: var(--font-size-light);
\`\`\`

### Container Queries

Container queries allow the components to be responsive to their container, not the viewport - a more realistic usage scenario.

<table>
<tr>
<td><figure><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wfvq67xyn46i7vviwlki.png" width="200" alt="DEV web component in a 200 pixel wide container" /><figcaption>200px wide container</figcaption></figure></td><td><figure>
<img width="400" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b5vvp6bf951p2au7bf84.png" alt="DEV web component in a 400 pixel wide container" /><figcaption>400px wide container</figcaption></figure></td>
</tr>
</table>

### Colors and CSS variables sourced from the social network

To make the components _feel_ like the sites they represent, they need to use the same colors, icons, and fonts. So to build these components, I sourced CSS variables from their open source repositories or modules. For GitHub, this means styles from the [primer design system](https://primer.style/) and for dev.to, which is built using the [Forem community software](https://www.forem.com/), I sourced styles from the [forem/forem repo on GitHub](https://github.com/forem/forem).

\`\`\`css
/* from the GitHub design-system, primer */
/* Light Theme */:host([data-theme="light"]) {
  --color-avatar-border: rgba(31,35,40,0.15);
  --color-border-default: #d0d7de;
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
  --color-fg-default: #1F2328;
  --color-fg-muted: #656d76;
  --color-fg-subtle: #6e7781;
  --color-fg-onemphasis: #ffffff;
  --color-fg-accent: #0969da;
  --color-fg-danger: #d1242f;
}
/* Light Protanopia & Deuteranopia Theme */:host([data-theme="light_colorblind"]) {
  --color-avatar-border: rgba(27,31,36,0.15);
  ...
\`\`\`


## 👷 DX: Separate files for Javascript, HTML, and CSS <a name="👷"></a>

"_Easy to maintain_" requires a good Developer Experience (DX). To make these components easier to iterate on and update, they're built like a web page. This means separate HTML, Javascript and CSS files. While the development happens in separate files, the content from the various files is compiled into a single file for distribution.

I was inspired by Leon Eck's post [Splitting Web Components into .ts, .html, and .scss files](https://leoneck.de/blog/wc-split-setup/), which detailed a similar approach, using [esbuild](https://esbuild.github.io/) to compile the files into a single file. Esbuild is pretty simple to set up and configure, and it easily takes every \`import\`ed file and converts it to an in-file variable. 

### HTML generation without frameworks or libraries

To maintain the **zero dependencies** goal, the HTML is living inside a Javascript file as a string returned from a method that accepts a single, JSDoc-documented parameter. This is not ideal, but allows using Javascript to generate the HTML without a framework or templating library like Lit or Handlebars. This is also what makes the SSR trick easy to pull off.

### Javascript methods outside of the customElements class

Testing is paramount to easy maintenance. The JS methods used by these components perform fairly simple tasks which can be unit tested without the need for a browser. These web components get data using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which is fully implemented in both Node and browsers, making it easy to create mock responses and unit tests. They **can also be used outside of the web component**, so a separate file makes sense. 

### Separate stylesheets for styles and source variables.

There are separate sheets for maintainability. Generally, there is one auto-generated file with variables from the social network, one with stylesheet with global styles (since there are multiple components with unique styles combined), and one stylesheet per component. Generally the files are:

<dl>
  <dt>vars-[source].css</dt>
  <dd>e.g. \`vars-devto.css\`.</dd>
  <dd>Variables from the social network's open source code</dd>
  <dt>global.css</dt>
  <dd>Global style variables</dd>
  <dd>Shared across all components</dd>
  <dt>[component].css</dt>
  <dd>e.g. \`user.css\` or \`repository.css\`</dd>
  <dd>Styles specific to the component</dd>
</dl>

These are then imported by the web component and exported with the HTML inside a \`<style>\` tag.

## ♿ Fully accessible <a name="♿"></a>

These components are tested using screen readers and AXE via Storybook. The HTML structure focuses on semantic HTML and when read aloud via screen reader, screen-reader-only content is available to provide context to the user.

For example, in the GitHub component, the header looks like this:

![GitHub component header shows the GitHub logo and the username](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x59wzhfb9fgmp9vjsl9d.png)



And the HTML is this:

\`\`\`html
<section aria-label="GitHub user profile" itemscope itemtype="http://schema.org/Person">
  <header>
    <span><span itemprop="memberOf">GitHub</span> user</span> 
    <span itemprop="alternativeName">scottnath</span>
  </header>
\`\`\`

The styles convert the first span into the GitHub logo using CSS' \`mask-image\` property. This visually hides the text, but it's still available to screen readers, so the screen reader reads this to the user:

"_GitHub user profile GitHub user scottnath_"

_note_: The \`itemscope\` and other \`item[thing]\` attributes are from [schema.org](https://schema.org). These are used to structutre the data into microformats. This is more for SEO and content structure than for accessibility.


## ✅ Native Unit Testing with Node 20's node:test <a name="✅"></a>

Might as well go all in! **Node 20 shipped with a native test runner**, [node:test](https://nodejs.org/api/test.html). Fairly simple test runner, but it includes code coverage and has all the functionality needed to unit test these components.

The latest unit test runs are visible in the [unit tests GitHub action workflow for profile-components](https://github.com/scottnath/profile-components/actions/workflows/unit-tests.yml)


## 🎁 bonus! Server Side Rendering cheatcode! <a name="🎁"></a>

Because these components were built with separate HTML, CSS, and JS files, you can use those pieces to generate HTML on the server. This example is what I did to make [an Astro component for scottnath.com](https://github.com/scottnath/scottnath.com/blob/main/workspaces/website/src/components/DevToUser.astro).

\`\`\`js
// DevToUser.astro
---
import devto from 'profile-components/devto-utils.js';
const user = devto.user;

const userContent = await user.generateContent({
  username: 'scottnath',
},true);
let userHTML = '<style>' + user.styles + '</style>';
userHTML += user.html(userContent);
---

<devto-user>
  <template shadowrootmode="open" set:html={userHTML}>
  </template>
</devto-user>
\`\`\`
`,b={name:"Scott Nath",username:"scottnath",twitter_username:null,github_username:"scottnath",user_id:1055555,website_url:"https://scottnath.com",profile_image:"https://media.dev.to/cdn-cgi/image/width=640,height=640,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1055555%2F4d0bf90a-bec7-4228-b1ca-d663fa40adeb.jpeg",profile_image_90:"https://media.dev.to/cdn-cgi/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1055555%2F4d0bf90a-bec7-4228-b1ca-d663fa40adeb.jpeg"},y={type_of:s,id:1630208,title:e,description:n,readable_publish_date:a,slug:t,path:o,url:i,comments_count:0,public_reactions_count:0,collection_id:24992,published_timestamp:l,positive_reactions_count:0,cover_image:p,social_image:r,canonical_url:c,created_at:h,edited_at:d,crossposted_at:null,published_at:m,last_comment_at:u,reading_time_minutes:7,tag_list:g,tags:f,body_html:v,body_markdown:w,user:b};export{y as p};
//# sourceMappingURL=post--profile-components-5tpa0joO.js.map
