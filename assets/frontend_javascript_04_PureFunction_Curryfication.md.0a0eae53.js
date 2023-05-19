import{_ as s,o as a,c as n,O as l}from"./chunks/framework.1f79dc3f.js";const d=JSON.parse('{"title":"纯函数和柯里化","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/javascript/04_PureFunction&Curryfication.md","filePath":"frontend/javascript/04_PureFunction&Curryfication.md","lastUpdated":1684490773000}'),e={name:"frontend/javascript/04_PureFunction&Curryfication.md"},o=l(`<h1 id="纯函数和柯里化" tabindex="-1">纯函数和柯里化 <a class="header-anchor" href="#纯函数和柯里化" aria-label="Permalink to &quot;纯函数和柯里化&quot;">​</a></h1><h2 id="_1-纯函数" tabindex="-1">1. 纯函数 <a class="header-anchor" href="#_1-纯函数" aria-label="Permalink to &quot;1. 纯函数&quot;">​</a></h2><ul><li>无副作用的函数</li><li>不可以修改外部变量,不可修改传入的参数</li><li>如: react 组件接受的 props, 不能修改 props 的值.</li><li>除了返回值以后,不能有任何输出</li></ul><h3 id="_1-1-reducer-纯函数实现原理" tabindex="-1">1.1 reducer 纯函数实现原理 <a class="header-anchor" href="#_1-1-reducer-纯函数实现原理" aria-label="Permalink to &quot;1.1 reducer 纯函数实现原理&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> info </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">info </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">(info)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,5),p=[o];function r(t,c,i,u,F,y){return a(),n("div",null,p)}const _=s(e,[["render",r]]);export{d as __pageData,_ as default};
