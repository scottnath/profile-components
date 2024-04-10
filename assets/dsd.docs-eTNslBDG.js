import{j as e}from"./jsx-runtime-BZ6YesIO.js";import{u as r}from"./index-BuzH4Goy.js";import{M as i,T as d,d as n}from"./index-B3l-yTl-.js";import"./iframe-Tnc8fvlD.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-B_J8iUie.js";import"./index-Dz0H3_yG.js";import"./index-DrFu-skq.js";function s(o){const t={code:"code",h2:"h2",p:"p",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{isTemplate:!0}),`
`,e.jsx(d,{}),`
`,e.jsxs(t.p,{children:["Both GitHub components can be implemented via Declarative Shadow DOM using methods exported from the ",e.jsx(t.code,{children:"github-utils.js"})," file."]}),`
`,e.jsx(t.h2,{id:"server-side-rendering-html-in-nodejs",children:"Server Side Rendering HTML in Node.js"}),`
`,e.jsx(n,{code:`
// import from npm module
import { dsd } from 'profile-components/github-utils';

const repos = JSON.stringify([
  'scottnath/profile-components',
  'storydocker/storydocker'
]);

const generatedTemplate = await dsd({
  login: 'scottnath',
  avatar_url: profilePic.src,
  repos
},true);

/**
generatedTemplate contains:
<template shadowrootmode="open">
  <styles>(...css styles for GitHub component)</styles>
  <section (...rest of generated HTML)</section>
</template>
*/

const componentHTML = \`<github-user>\${generatedTemplate}</github-user>\`;
`,language:"js"}),`
`,e.jsx(t.h2,{id:"server-side-render-in-an-astro-component",children:"Server side render in an Astro component"}),`
`,e.jsx(n,{code:`
---
import {dsd} from 'profile-components/github-utils';

const repos = JSON.stringify(['scottnath/profile-components', 'storydocker/storydocker']);
const declaredDOM = await dsd({
  login: 'scottnath',
  repos
},true)
---

<github-user
  data-theme="light_high_contrast"
  set:html={declaredDOM}>
</github-user>
`,language:"jsx"}),`
`,e.jsx(t.h2,{id:"client-side-rendering-via-unpkg",children:"Client side rendering via unpkg"}),`
`,e.jsx(n,{code:`

<!-- add empty elements to HTML -->
<github-repository></github-repository>
<hr />
<github-user></github-user>

<script type="module">
  // import from unpkg
  import {
    user,
    repo,
  } from 'https://unpkg.com/profile-components/dist/github-utils.js';

  // repo has it's own DSD method:
  const dsdRepo = repo.dsd;

  /**
    * Polyfill for Declarative Shadow DOM which, when triggered, converts
    *  the template element into actual shadow DOM.
    * This is only needed when injecting _after_ page is loaded
    * @see https://developer.chrome.com/docs/css-ui/declarative-shadow-dom#polyfill
    */
  const triggerAttachShadowRoots = () => {
    (function attachShadowRoots(root) {
      root
        .querySelectorAll('template[shadowrootmode]')
        .forEach((template) => {
          const mode = template.getAttribute('shadowrootmode');
          const shadowRoot = template.parentNode.attachShadow({ mode });
          shadowRoot.appendChild(template.content);
          template.remove();
          attachShadowRoots(shadowRoot);
        });
    })(document);
  };

  /**
    * Uses the "dsd" method to generate DSD, add the string of DSD content
    *  to the element, then trigger the polyfill to convert the template
    */
  const injectDSD = async () => {
    const dsdHTML = await dsd({ username: 'scottnath' }, true);
    document.querySelector('github-user').innerHTML = dsdHTML;
    // now that the HTML is async-created, the polyfill can convert it
    triggerAttachShadowRoots();
  };
  injectDSD();

  /**
    * Uses the "dsdRepo" method to generate DSD, add the string of DSD content
    *  to the element, then trigger the polyfill to convert the template
    */
  const injectRepoDSD = async () => {
    const dsdHTML = await dsdRepo(
      { full_name: 'scottnath/profile-components' },
      true
    );
    document.querySelector('github-repository').innerHTML = dsdHTML;
    // now that the HTML is async-created, the polyfill can convert it
    triggerAttachShadowRoots();
  };
  injectRepoDSD();
<\/script>
`,language:"html"})]})}function y(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(s,{...o})}):s(o)}export{y as default};
//# sourceMappingURL=dsd.docs-eTNslBDG.js.map
