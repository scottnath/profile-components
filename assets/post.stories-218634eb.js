import{s as m,g as b,p as f,a as v}from"./index-3126e7a2.js";const y="article",w=1568661,_="A crazy-simple way to bulk-update NPM dependencies with GitHub's Dependabot",k="This is the simplest way I've found to keep your NPM dependencies up-to-date. This will update all...",D="Aug 15",x="a-crazy-simple-way-to-bulk-update-npm-dependencies-with-githubs-dependabot-3e2o",z="/scottnath/a-crazy-simple-way-to-bulk-update-npm-dependencies-with-githubs-dependabot-3e2o",T="https://dev.to/scottnath/a-crazy-simple-way-to-bulk-update-npm-dependencies-with-githubs-dependabot-3e2o",H=0,S=0,P=null,M="2023-08-15T18:00:37Z",E=0,j="https://res.cloudinary.com/practicaldev/image/fetch/s--DfcEJZWu--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d9sds37k57qzn6j5nbxp.png",q="https://res.cloudinary.com/practicaldev/image/fetch/s--XDW1Jh5r--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d9sds37k57qzn6j5nbxp.png",V="https://dev.to/scottnath/a-crazy-simple-way-to-bulk-update-npm-dependencies-with-githubs-dependabot-3e2o",R="2023-08-15T00:55:09Z",I=null,N=null,G="2023-08-15T18:00:37Z",B="2023-08-15T18:00:37Z",O=4,L="github, npm, devops, dependabot",Z=["github","npm","devops","dependabot"],F=`<p>This is the simplest way I've found to keep your NPM dependencies up-to-date. This will update all dependencies and devDependencies via automatically-generated pull requests AND you don't have to push files or leave the GitHub.com website. This works for monorepos too!</p>

<h2>
  <a name="tldr" href="#tldr">
  </a>
  tl;dr
</h2>

<ol>
<li>Go to <em>your repo</em> -&gt; <em>Insights</em> -&gt; <em>Dependency graph</em> -&gt; <em>Dependabot</em> -&gt; <em>Enable Dependabot</em>
</li>
<li>Create a config file and add a group to it</li>
<li>Copy your GitHub Action secrets to Dependabot secrets</li>
</ol>

<h2>
  <a name="prerequisites" href="#prerequisites">
  </a>
  Prerequisites
</h2>

<ul>
<li>Your repo's dependencies managed by NPM</li>
<li>Write permissions to your repository</li>
<li>No fear of beta-features</li>
</ul>

<h2>
  <a name="what-is-this" href="#what-is-this">
  </a>
  What is this?
</h2>

<p>I was stumped on how to enable Dependabot in Github after reading lots of docs and blogs about adding Dependabot to a repo. Each article detailed how to create the dependabot.yml file and the breakdown of it's data structure, but not the basics of <em>turning it on</em>. Then, I stumbled across the <code>Enable Dependabot</code> button. 🤦 So I figured I'd help someone else save some time.</p>

<p>The ability to create a single pull request containing <em>all</em> dependency updates is made possible by GitHub's newly implemented <a href="https://github.blog/changelog/2023-06-30-grouped-version-updates-for-dependabot-public-beta/"><em>grouped version updates</em></a>, which is a beta feature as of this writing. Normally Dependabot creates one PR for <em>each</em> dependency being updated.</p>

<h3>
  <a name="expected-outcome" href="#expected-outcome">
  </a>
  Expected outcome:
</h3>

<ul>
<li>Once-daily, Dependabot will check your repo's dependencies to see if newer versions exist</li>
<li>If new versions exist, Dependabot will create a pull request, updating <em>every</em> dependency which has a new version</li>
<li>The pull request will change relevant <code>package.json</code> and <code>package-lock.json</code> files</li>
<li>If you use GitHub actions, Dependabot's PR will run the same checks as other PRs</li>
</ul>

<p><strong>Note</strong>: Dependabot does a whole lot of other stuff and these instructions are <em>specifically</em> for the task of having Dependabot create one pull request whenever it finds one or more dependencies in your <strong>NPM</strong> repo which have an newer version.</p>

<h2>
  <a name="step-1-enable-dependabot" href="#step-1-enable-dependabot">
  </a>
  Step 1: Enable Dependabot
</h2>

<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--VnZVd_E5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vkxduhw4c5bj6w5mn5he.png" class="article-body-image-wrapper"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--VnZVd_E5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vkxduhw4c5bj6w5mn5he.png" alt="Shows GitHub UI with circles around where-to-click to enable Dependabot" loading="lazy" width="800" height="336"></a></p>

<p>Navigate to your repository on GitHub.com and then...</p>

<ol>
<li>Trigger "Insights" link in the repo navigation</li>
<li>Trigger "Dependency graph" in the page menu</li>
<li>Trigger "Dependabot" in the <em>Dependency graph</em> page's tabs</li>
<li>Trigger the "Enable Dependabot" button</li>
</ol>

<h2>
  <a name="step-2-create-dependabotyml-config-file" href="#step-2-create-dependabotyml-config-file">
  </a>
  Step 2: Create dependabot.yml config file
</h2>

<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--h3K7fs_m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4wrz6q3heksybog1ymid.png" class="article-body-image-wrapper"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--h3K7fs_m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4wrz6q3heksybog1ymid.png" alt='Shows the UI after enabling Dependabot, highlights the "create config file" button' loading="lazy" width="800" height="337"></a></p>

<p>The next page kinda looks the same as the last one! But now the "Enable Dependabot" button is replaced with a "Create config file" button</p>

<ol>
<li>Trigger the "Create config file" button</li>
</ol>

<h2>
  <a name="step-3-edit-the-dependabotyml-file" href="#step-3-edit-the-dependabotyml-file">
  </a>
  Step 3: Edit the dependabot.yml file
</h2>

<p>Triggering "Create config file" brings you to the GitHub file editing interface. You will be adding the file at <code>&lt;repo-root&gt;/.github/dependabot.yml</code>. Setting up bulk management of your NPM dependencies requires three changes to the default dependabot.yml file, changing the <code>package-ecosystem</code>, the <code>interval</code>, and adding the <code>group</code></p>

<p><strong>Default content of the dependabot.yml file</strong><br>
</p>

<div class="highlight js-code-highlight">
<pre class="highlight yaml"><code><span class="c1"># To get started with Dependabot version updates, you'll need to specify which</span>
<span class="c1"># package ecosystems to update and where the package manifests are located.</span>
<span class="c1"># Please see the documentation for all configuration options:</span>
<span class="c1"># https://docs.github.com/github/administering-a-repository/configuration-options-for-dependency-updates</span>

<span class="na">version</span><span class="pi">:</span> <span class="m">2</span>
<span class="na">updates</span><span class="pi">:</span>
  <span class="pi">-</span> <span class="na">package-ecosystem</span><span class="pi">:</span> <span class="s2">"</span><span class="s">"</span> <span class="c1"># See documentation for possible values</span>
    <span class="na">directory</span><span class="pi">:</span> <span class="s2">"</span><span class="s">/"</span> <span class="c1"># Location of package manifests</span>
    <span class="na">schedule</span><span class="pi">:</span>
      <span class="na">interval</span><span class="pi">:</span> <span class="s2">"</span><span class="s">weekly"</span>
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
  <a name="step-3a-change-the-ecosystem-to-raw-npm-endraw-" href="#step-3a-change-the-ecosystem-to-raw-npm-endraw-">
  </a>
  Step 3.A Change the ecosystem to <code>npm</code>
</h3>



<div class="highlight js-code-highlight">
<pre class="highlight yaml"><code><span class="na">updates</span><span class="pi">:</span>
  <span class="pi">-</span> <span class="na">package-ecosystem</span><span class="pi">:</span> <span class="s2">"</span><span class="s">npm"</span>
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
  <a name="step-3b-change-the-interval-to-daily" href="#step-3b-change-the-interval-to-daily">
  </a>
  Step 3.B Change the interval to "daily"
</h3>



<div class="highlight js-code-highlight">
<pre class="highlight yaml"><code>    <span class="na">schedule</span><span class="pi">:</span>
      <span class="na">interval</span><span class="pi">:</span> <span class="s2">"</span><span class="s">daily"</span>
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
  <a name="step-3c-add-the-raw-groups-endraw-content" href="#step-3c-add-the-raw-groups-endraw-content">
  </a>
  Step 3.C Add the <code>groups</code> content
</h3>

<p>The <a href="https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups"><code>groups</code> configuration documentation is here</a>. The StoryDocker repo has examples of <a href="https://github.com/storydocker/storydocker/blob/main/.github/dependabot.yml">a groups-enabled dependabot.yml file</a> and <a href="https://github.com/storydocker/storydocker/pull/15">a Dependabot-created PR</a></p>

<ul>
<li>add <code>groups</code> right after the <code>interval</code> section from above</li>
<li>the group name is <code>dev-dependencies</code>, but the naming is flexible</li>
<li>the group name is used to create the PR title ("<em>⬆️ Bump the <code>dev-dependencies</code> group with 32 updates</em>" and the PR's branch from the Dependabot fork (<em>dependabot/npm_and_yarn/<code>dev-dependencies</code>-b6aa4603c8</em>)</li>
<li>this example uses a <code>wildcard</code> pattern so it will update all dependencies, but it's possible to narrow it to a subset of your deps
</li>
</ul>

<div class="highlight js-code-highlight">
<pre class="highlight yaml"><code>    <span class="na">schedule</span><span class="pi">:</span>
      <span class="na">interval</span><span class="pi">:</span> <span class="s2">"</span><span class="s">daily"</span>
    <span class="c1"># Create a group of dependencies to be updated together</span>
    <span class="c1"># in one pull request</span>
    <span class="na">groups</span><span class="pi">:</span>
       <span class="c1"># Specify a name for the group, which will be used </span>
       <span class="c1"># in pull request titles and branch names</span>
       <span class="na">dev-dependencies</span><span class="pi">:</span>
        <span class="c1"># Define patterns to include dependencies in the group </span>
        <span class="na">patterns</span><span class="pi">:</span> 
          <span class="c1"># Wildcard matches all dependencies </span>
          <span class="c1"># across the package ecosystem.</span>
          <span class="pi">-</span> <span class="s2">"</span><span class="s">*"</span>
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
  <a name="the-final-files-contents" href="#the-final-files-contents">
  </a>
  The final file's contents
</h3>



<div class="highlight js-code-highlight">
<pre class="highlight yaml"><code><span class="c1"># (adjust comment to your liking)</span>

<span class="na">version</span><span class="pi">:</span> <span class="m">2</span>
<span class="na">updates</span><span class="pi">:</span>
  <span class="pi">-</span> <span class="na">package-ecosystem</span><span class="pi">:</span> <span class="s2">"</span><span class="s">npm"</span>
    <span class="na">directory</span><span class="pi">:</span> <span class="s2">"</span><span class="s">/"</span>
    <span class="na">schedule</span><span class="pi">:</span>
      <span class="na">interval</span><span class="pi">:</span> <span class="s2">"</span><span class="s">daily"</span>
    <span class="na">groups</span><span class="pi">:</span>
      <span class="na">dev-dependencies</span><span class="pi">:</span>
        <span class="na">patterns</span><span class="pi">:</span> 
          <span class="pi">-</span> <span class="s2">"</span><span class="s">*"</span>
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
  <a name="step-4-copypasta-your-secrets-to-allow-actions" href="#step-4-copypasta-your-secrets-to-allow-actions">
  </a>
  Step 4 - Copypasta your secrets to allow actions
</h2>

<p><strong>Fun fact:</strong> Dependabot does not have access to any secrets you created for GitHub Actions.</p>

<p>The StoryDocker repo has a <a href="https://github.com/storydocker/storydocker/blob/main/.github/workflows/chromatic.yml">GitHub action which releases a PR-based deployment to Chromatic</a> and that action requires a secret named <code>CHROMATIC_PROJECT_TOKEN</code>. This token is already configured at Settings -&gt; Secrets and Variables -&gt; Actions. To make this action work when Dependabot adds a PR from a fork of the repo, <em>you need to have a <strong>duplicate token</strong> in the secrets for Dependabot</em>.</p>

<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--sycmJejo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t29pqxx0u6mz5ribm2vo.png" class="article-body-image-wrapper"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--sycmJejo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t29pqxx0u6mz5ribm2vo.png" alt="Shows the navigation triggers to get to Dependabot secrets settings" loading="lazy" width="800" height="528"></a></p>

<ol>
<li>Trigger "Settings" tab in repo navigation</li>
<li>Trigger "Secrets and variables" in the <em>Settings</em> page nav</li>
<li>Trigger "Dependabot" nav item to get the Dependabot's secrets page</li>
<li>Trigger "New repository secret" button to add a secret</li>
<li>Add your secret there, using <strong>the same secret name you used for the Actions secret</strong>
</li>
</ol>

<h2>
  <a name="step-5-read-and-merge-prs" href="#step-5-read-and-merge-prs">
  </a>
  Step 5 - Read and merge PRs
</h2>

<p>There are ways to automate merging the PRs created by Dependabot, but I have trust issues, so I prefer to review the PRs and merge them myself. </p>

<h2>
  <a name="step-6-profit" href="#step-6-profit">
  </a>
  Step 6 - PROFIT
</h2>

<p>Dependency management just got a whole lot easier. Go outside and touch grass!</p>

`,W=`This is the simplest way I've found to keep your NPM dependencies up-to-date. This will update all dependencies and devDependencies via automatically-generated pull requests AND you don't have to push files or leave the GitHub.com website. This works for monorepos too!

## tl;dr

1. Go to _your repo_ -> _Insights_ -> _Dependency graph_ -> _Dependabot_ -> _Enable Dependabot_
2. Create a config file and add a group to it
3. Copy your GitHub Action secrets to Dependabot secrets

## Prerequisites 

* Your repo's dependencies managed by NPM
* Write permissions to your repository
* No fear of beta-features

## What is this?

I was stumped on how to enable Dependabot in Github after reading lots of docs and blogs about adding Dependabot to a repo. Each article detailed how to create the dependabot.yml file and the breakdown of it's data structure, but not the basics of _turning it on_. Then, I stumbled across the \`Enable Dependabot\` button. 🤦 So I figured I'd help someone else save some time.

The ability to create a single pull request containing _all_ dependency updates is made possible by GitHub's newly implemented [_grouped version updates_](https://github.blog/changelog/2023-06-30-grouped-version-updates-for-dependabot-public-beta/), which is a beta feature as of this writing. Normally Dependabot creates one PR for _each_ dependency being updated.

### Expected outcome:

* Once-daily, Dependabot will check your repo's dependencies to see if newer versions exist
* If new versions exist, Dependabot will create a pull request, updating _every_ dependency which has a new version
* The pull request will change relevant \`package.json\` and \`package-lock.json\` files
* If you use GitHub actions, Dependabot's PR will run the same checks as other PRs

**Note**: Dependabot does a whole lot of other stuff and these instructions are _specifically_ for the task of having Dependabot create one pull request whenever it finds one or more dependencies in your **NPM** repo which have an newer version.

## Step 1: Enable Dependabot

![Shows GitHub UI with circles around where-to-click to enable Dependabot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vkxduhw4c5bj6w5mn5he.png)

Navigate to your repository on GitHub.com and then...

1. Trigger "Insights" link in the repo navigation
1. Trigger "Dependency graph" in the page menu
1. Trigger "Dependabot" in the _Dependency graph_ page's tabs
1. Trigger the "Enable Dependabot" button

## Step 2: Create dependabot.yml config file

![Shows the UI after enabling Dependabot, highlights the "create config file" button](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4wrz6q3heksybog1ymid.png)

The next page kinda looks the same as the last one! But now the "Enable Dependabot" button is replaced with a "Create config file" button

1. Trigger the "Create config file" button

## Step 3: Edit the dependabot.yml file

Triggering "Create config file" brings you to the GitHub file editing interface. You will be adding the file at \`<repo-root>/.github/dependabot.yml\`. Setting up bulk management of your NPM dependencies requires three changes to the default dependabot.yml file, changing the \`package-ecosystem\`, the \`interval\`, and adding the \`group\`

**Default content of the dependabot.yml file**

\`\`\`yaml
# To get started with Dependabot version updates, you'll need to specify which
# package ecosystems to update and where the package manifests are located.
# Please see the documentation for all configuration options:
# https://docs.github.com/github/administering-a-repository/configuration-options-for-dependency-updates

version: 2
updates:
  - package-ecosystem: "" # See documentation for possible values
    directory: "/" # Location of package manifests
    schedule:
      interval: "weekly"
\`\`\`

### Step 3.A Change the ecosystem to \`npm\`

\`\`\`yaml
updates:
  - package-ecosystem: "npm"
\`\`\`

### Step 3.B Change the interval to "daily"

\`\`\`yaml
    schedule:
      interval: "daily"
\`\`\`

### Step 3.C Add the \`groups\` content

The [\`groups\` configuration documentation is here](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups). The StoryDocker repo has examples of [a groups-enabled dependabot.yml file](https://github.com/storydocker/storydocker/blob/main/.github/dependabot.yml) and [a Dependabot-created PR](https://github.com/storydocker/storydocker/pull/15)

* add \`groups\` right after the \`interval\` section from above
* the group name is \`dev-dependencies\`, but the naming is flexible
* the group name is used to create the PR title ("_⬆️ Bump the \`dev-dependencies\` group with 32 updates_" and the PR's branch from the Dependabot fork (_dependabot/npm_and_yarn/\`dev-dependencies\`-b6aa4603c8_)
* this example uses a \`wildcard\` pattern so it will update all dependencies, but it's possible to narrow it to a subset of your deps

\`\`\`yaml
    schedule:
      interval: "daily"
    # Create a group of dependencies to be updated together
    # in one pull request
    groups:
       # Specify a name for the group, which will be used 
       # in pull request titles and branch names
       dev-dependencies:
        # Define patterns to include dependencies in the group 
        patterns: 
          # Wildcard matches all dependencies 
          # across the package ecosystem.
          - "*"
\`\`\`

### The final file's contents

\`\`\`yaml
# (adjust comment to your liking)

version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    groups:
      dev-dependencies:
        patterns: 
          - "*"
\`\`\`

## Step 4 - Copypasta your secrets to allow actions

**Fun fact:** Dependabot does not have access to any secrets you created for GitHub Actions.

The StoryDocker repo has a [GitHub action which releases a PR-based deployment to Chromatic](https://github.com/storydocker/storydocker/blob/main/.github/workflows/chromatic.yml) and that action requires a secret named \`CHROMATIC_PROJECT_TOKEN\`. This token is already configured at Settings -> Secrets and Variables -> Actions. To make this action work when Dependabot adds a PR from a fork of the repo, _you need to have a **duplicate token** in the secrets for Dependabot_.


![Shows the navigation triggers to get to Dependabot secrets settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t29pqxx0u6mz5ribm2vo.png)


1. Trigger "Settings" tab in repo navigation
1. Trigger "Secrets and variables" in the _Settings_ page nav
1. Trigger "Dependabot" nav item to get the Dependabot's secrets page
1. Trigger "New repository secret" button to add a secret
1. Add your secret there, using **the same secret name you used for the Actions secret**

## Step 5 - Read and merge PRs

There are ways to automate merging the PRs created by Dependabot, but I have trust issues, so I prefer to review the PRs and merge them myself. 

## Step 6 - PROFIT

Dependency management just got a whole lot easier. Go outside and touch grass!







`,J={name:"Scott Nath",username:"scottnath",twitter_username:null,github_username:"scottnath",user_id:1055555,website_url:"https://scottnath.com",profile_image:"https://res.cloudinary.com/practicaldev/image/fetch/s--k0ZYTR18--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1055555/99c3a97d-b160-4d6d-96c1-1007d266c024.jpeg",profile_image_90:"https://res.cloudinary.com/practicaldev/image/fetch/s--K8yLyVye--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1055555/99c3a97d-b160-4d6d-96c1-1007d266c024.jpeg"},u={type_of:y,id:w,title:_,description:k,readable_publish_date:D,slug:x,path:z,url:T,comments_count:H,public_reactions_count:S,collection_id:P,published_timestamp:M,positive_reactions_count:E,cover_image:j,social_image:q,canonical_url:V,created_at:R,edited_at:I,crossposted_at:N,published_at:G,last_comment_at:B,reading_time_minutes:O,tag_list:L,tags:Z,body_html:F,body_markdown:W,user:J};function A(){var e="/home/runner/work/profile-components/profile-components/src/devto/post/index.js",C="2ade09b167ce1ec9857435ff60e6fb888bea265e",t=window,n="__coverage__",g={path:"/home/runner/work/profile-components/profile-components/src/devto/post/index.js",statementMap:{0:{start:{line:27,column:4},end:{line:27,column:12}},1:{start:{line:28,column:4},end:{line:28,column:20}},2:{start:{line:29,column:4},end:{line:29,column:40}},3:{start:{line:30,column:4},end:{line:30,column:26}},4:{start:{line:38,column:4},end:{line:42,column:5}},5:{start:{line:39,column:6},end:{line:41,column:7}},6:{start:{line:40,column:8},end:{line:40,column:51}},7:{start:{line:46,column:15},end:{line:46,column:41}},8:{start:{line:47,column:4},end:{line:47,column:72}},9:{start:{line:48,column:4},end:{line:48,column:32}},10:{start:{line:49,column:4},end:{line:49,column:37}},11:{start:{line:50,column:4},end:{line:52,column:5}},12:{start:{line:51,column:6},end:{line:51,column:57}},13:{start:{line:55,column:0},end:{line:55,column:47}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:26,column:2},end:{line:26,column:3}},loc:{start:{line:26,column:16},end:{line:31,column:3}},line:26},1:{name:"(anonymous_1)",decl:{start:{line:37,column:2},end:{line:37,column:3}},loc:{start:{line:37,column:19},end:{line:43,column:3}},line:37},2:{name:"(anonymous_2)",decl:{start:{line:45,column:2},end:{line:45,column:3}},loc:{start:{line:45,column:28},end:{line:53,column:3}},line:45}},branchMap:{0:{loc:{start:{line:39,column:6},end:{line:41,column:7}},type:"if",locations:[{start:{line:39,column:6},end:{line:41,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:39},1:{loc:{start:{line:50,column:4},end:{line:52,column:5}},type:"if",locations:[{start:{line:50,column:4},end:{line:52,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:50}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0},f:{0:0,1:0,2:0},b:{0:[0,0],1:[0,0]},inputSourceMap:{version:3,sources:["/home/runner/work/profile-components/profile-components/src/devto/post/index.js"],names:[],mappings:"AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC5C;AACA,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC3C,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC9F,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACtB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAClB,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAClC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACxC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACxD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC1D,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjE,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACX,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACrD,CAAC,CAAC,CAAC;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC5C,CAAC,CAAC,CAAC,CAAC,CAAC;AACL,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACZ,CAAC,CAAC,CAAC,CAAC,CAAC;AACL,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACZ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACxC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC1B,CAAC,CAAC,CAAC;AACH;AACA,CAAC,CAAC,CAAC,CAAC,CAAC;AACL,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpF,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACZ,CAAC,CAAC,CAAC,CAAC,CAAC;AACL,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAChD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACpC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACP,CAAC,CAAC,CAAC,CAAC,CAAC;AACL,CAAC,CAAC,CAAC;AACH;AACA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC7B,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC1C,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACxE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAChC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACrC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC9B,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACzD,CAAC,CAAC,CAAC,CAAC,CAAC;AACL,CAAC,CAAC,CAAC;AACH,CAAC;AACD,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"2ade09b167ce1ec9857435ff60e6fb888bea265e"},s=t[n]||(t[n]={});(!s[e]||s[e].hash!==C)&&(s[e]=g);var i=s[e];return A=function(){return i},i}A();class K extends HTMLElement{constructor(){A().f[0]++,A().s[0]++,super(),A().s[1]++,this.attrs={},A().s[2]++,this.attachShadow({mode:"open"}),A().s[3]++,this._getAttributes()}_getAttributes(){A().f[1]++,A().s[4]++;for(let C of this.getAttributeNames())A().s[5]++,this.getAttribute(C)?(A().b[0][0]++,A().s[6]++,this.attrs[C]=this.getAttribute(C)):A().b[0][1]++}async connectedCallback(){A().f[2]++;let C=(A().s[7]++,`<style>${m}</style>`);A().s[8]++,this.post=await b(this.attrs,this.attrs.fetch),A().s[9]++,C+=f(this.post),A().s[10]++,this.shadowRoot.innerHTML=C,A().s[11]++,this.attrs.itemprop?(A().b[1][0]++,A().s[12]++,this.setAttribute("itemprop",this.attrs.itemprop)):A().b[1][1]++}}A().s[13]++;customElements.define("devto-post",K);const U={title:"DevTo/devto-post",component:"devto-post",tags:["autodocs"],render:e=>`
      <devto-post ${Object.entries(e).filter(([t,n])=>n).map(([t,n])=>`${t}="${n}"`).join(" ")}></devto-post>
    `},a={args:{...v(u)}},o={args:{id:u.id,fetch:!0}};var l,p,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    ...parseFetchedPost(postDependabot)
  }
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   await ensureElements(elements, args);
  // }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var r,d,h;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    id: postDependabot.id,
    fetch: true
  }
}`,...(h=(d=o.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};const $=["Post","PostFetch"];export{a as Post,o as PostFetch,$ as __namedExportsOrder,U as default};
//# sourceMappingURL=post.stories-218634eb.js.map
