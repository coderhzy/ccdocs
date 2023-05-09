import{_ as a,o as s,c as n,O as l}from"./chunks/framework.1f79dc3f.js";const u=JSON.parse('{"title":"Linux使用clash","description":"快速上手使用Linux科学上网","frontmatter":{"title":"Linux使用clash","description":"快速上手使用Linux科学上网","publishedAt":"2022-11-30","lastUpdated":"2022-11-30","tags":"management"},"headers":[],"relativePath":"frontend/program-management/03_Linux使用Clash科学上网.md","filePath":"frontend/program-management/03_Linux使用Clash科学上网.md","lastUpdated":1683646215000}'),e={name:"frontend/program-management/03_Linux使用Clash科学上网.md"},o=l(`<h2 id="_1-下载-linux-amd64" tabindex="-1">1. 下载 <code>linux-amd64</code> <a class="header-anchor" href="#_1-下载-linux-amd64" aria-label="Permalink to &quot;1. 下载 \`linux-amd64\`&quot;">​</a></h2><p><a href="https://github.com/Dreamacro/clash/releases" target="_blank" rel="noreferrer">clash下载地址</a></p><h2 id="_2-安装" tabindex="-1">2. 安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;2. 安装&quot;">​</a></h2><ol><li>下载对应的二进制，比如默认放到 <code>~/Downloads</code> 目录，在终端进入该目录。</li></ol><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">gunzip</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clash-linux-amd64-v0.18.0.gz</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mv</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clash-linux-amd64-v1.4.2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/bin/clash</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/bin/clash</span></span>
<span class="line"><span style="color:#FFCB6B;">./clash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>clash 启动后会在 <code>~/.config/clash</code> 目录生成配置文件。</li></ol><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ls</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-al</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.config/clash</span></span>
<span class="line"><span style="color:#FFCB6B;">.rw-r--r--</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">einverne</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">23</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Mar</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">19</span><span style="color:#C3E88D;">:30</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config.yaml</span></span>
<span class="line"><span style="color:#FFCB6B;">.rw-r--r--</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4.0</span><span style="color:#C3E88D;">M</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">einverne</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">23</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Mar</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">19</span><span style="color:#C3E88D;">:30</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Country.mmdb</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_3-下载配置文件" tabindex="-1">3. 下载配置文件 <a class="header-anchor" href="#_3-下载配置文件" aria-label="Permalink to &quot;3.  下载配置文件&quot;">​</a></h2><p>下载你的VPN对应文件覆盖原有的<code>config.yaml</code></p><h2 id="_4-重新执行clash" tabindex="-1">4. 重新执行clash <a class="header-anchor" href="#_4-重新执行clash" aria-label="Permalink to &quot;4.  重新执行clash&quot;">​</a></h2><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./clash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_5-新开终端配置vpn" tabindex="-1">5. 新开终端配置vpn <a class="header-anchor" href="#_5-新开终端配置vpn" aria-label="Permalink to &quot;5.  新开终端配置vpn&quot;">​</a></h2><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> https_proxy</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">http://127.0.0.1:7890</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="x-clash-error-warn-0000-mmdb-invalid-remove-and-download" tabindex="-1">X. # clash error &quot;WARN[0000] MMDB invalid, remove and download <a class="header-anchor" href="#x-clash-error-warn-0000-mmdb-invalid-remove-and-download" aria-label="Permalink to &quot;X. # clash error &quot;WARN[0000] MMDB invalid, remove and download&quot;">​</a></h2><p>wrong command</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">./clash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>WARN[0000] MMDB invalid, remove and download</p><p>using this command will fix</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">wget -O Country.mmdb https://www.sub-speeder.com/client-download/Country.mmdb</span></span>
<span class="line"><span style="color:#A6ACCD;">./clash -d .</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,19),p=[o];function r(t,c,i,d,C,h){return s(),n("div",null,p)}const y=a(e,[["render",r]]);export{u as __pageData,y as default};
