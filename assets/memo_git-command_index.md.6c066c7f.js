import{_ as e,o as l,c as t,G as o,B as p,z as s,a,O as r,D as c}from"./chunks/framework.1f79dc3f.js";const u=JSON.parse('{"title":"常用一些 Git 命令","description":"","frontmatter":{},"headers":[],"relativePath":"memo/git-command/index.md","filePath":"memo/git-command/index.md","lastUpdated":1683560449000}'),i={name:"memo/git-command/index.md"},C=s("h1",{id:"常用一些-git-命令",tabindex:"-1"},[a("常用一些 Git 命令 "),s("a",{class:"header-anchor",href:"#常用一些-git-命令","aria-label":'Permalink to "常用一些 Git 命令"'},"​")],-1),y=r(`<p>推荐 mac 用户安装 oh-my-zsh，在这备忘一些常用的命令，以及一些简写方式。</p><blockquote><p>以下参考自 <a href="https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git" target="_blank" rel="noreferrer">ohmyzsh git</a></p></blockquote><table><thead><tr><th style="text-align:center;">简写（Alias）</th><th style="text-align:center;">对应命令</th><th style="text-align:center;">详情</th></tr></thead><tbody><tr><td style="text-align:center;">gaa</td><td style="text-align:center;">git add --all</td><td style="text-align:center;">添加当前项目所有文件修改、增删的文件到缓存区</td></tr><tr><td style="text-align:center;">gb</td><td style="text-align:center;">git branch</td><td style="text-align:center;">查看分支列表</td></tr><tr><td style="text-align:center;">gc!</td><td style="text-align:center;">git commit -v --amend</td><td style="text-align:center;">修正上次提交，像 reabase 一样操作，每次提交执行一次，覆盖上一次提交，即可保证只有一个 commit</td></tr><tr><td style="text-align:center;">gcb</td><td style="text-align:center;">git checkout -b</td><td style="text-align:center;">基于当前分支切换新的分支</td></tr><tr><td style="text-align:center;">gcp</td><td style="text-align:center;">git cherry-pick</td><td style="text-align:center;">根据 commitId 拿某一次的提交</td></tr><tr><td style="text-align:center;">gbD</td><td style="text-align:center;">git branch -D</td><td style="text-align:center;">删除分支</td></tr><tr><td style="text-align:center;">glods</td><td style="text-align:center;">git log --graph --date=short</td><td style="text-align:center;">查看提交记录</td></tr><tr><td style="text-align:center;">gpf</td><td style="text-align:center;">git push --force</td><td style="text-align:center;">强制推送，一般用于 reabase 之后</td></tr></tbody></table><h2 id="删除其它分支" tabindex="-1">删除其它分支 <a class="header-anchor" href="#删除其它分支" aria-label="Permalink to &quot;删除其它分支&quot;">​</a></h2><p>这个是我经常会用到的，因为本地开发多次之后，使用 <code>git branch</code> 之后会发现有很多分支还在，为了保证「干净卫生」，所以就了解一下，可以执行如下命令。</p><ul><li>增强命令（master）</li></ul><blockquote><p>可以删除除开 master 以外的分支，但类似 <code>mr/master/xxx</code> 这样的带有 master 的删除不了。</p></blockquote><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stash</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">master</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">grep</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">master</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">xargs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>增强命令（main）</li></ul><blockquote><p>同上。</p></blockquote><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stash</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">grep</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">main</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">xargs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>增强命令（release）</li></ul><blockquote><p>同上。</p></blockquote><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stash</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">release</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">grep</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">release</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">xargs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="rebase" tabindex="-1">rebase <a class="header-anchor" href="#rebase" aria-label="Permalink to &quot;rebase&quot;">​</a></h2><p>rebase 命令很强大，<code>git rebase -i HEAD~[num]</code> 和 <code>git pull --rebase</code> 等。</p><blockquote><p>推荐阅读 <a href="http://jartto.wang/2018/12/11/git-rebase/" target="_blank" rel="noreferrer">彻底搞懂 Git-Rebase</a></p></blockquote><h2 id="查看完整信息" tabindex="-1">查看完整信息 <a class="header-anchor" href="#查看完整信息" aria-label="Permalink to &quot;查看完整信息&quot;">​</a></h2><p>谁用谁知道！</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reflog</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="git-commit-提交规范" tabindex="-1">git commit 提交规范 <a class="header-anchor" href="#git-commit-提交规范" aria-label="Permalink to &quot;git commit 提交规范&quot;">​</a></h2><p>这里以 coding 工作台为例子，其它代码托管平台可能需要修改一下正则。</p><p><img src="https://img-blog.csdnimg.cn/7f8aa3f2487244efb7fa9177a7cb739e.png" alt=""></p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">^(feat</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">fix</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">docs</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">style</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">refactor</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">perf</span><span style="color:#89DDFF;">|</span><span style="color:#82AAFF;">test</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">build</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">revert</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">merge</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">chore</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">\\(.+\\</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">)?</span><span style="color:#A6ACCD;">:\\s</span><span style="color:#89DDFF;">+(</span><span style="color:#82AAFF;">.</span><span style="color:#A6ACCD;">*</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">#</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">-9</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">+\\s+</span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">^(Accept</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Merge</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Request</span><span style="color:#A6ACCD;">)\\s+#</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">-9</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">+:\\s</span><span style="color:#89DDFF;">+(</span><span style="color:#FFCB6B;">\\(.+\\s+-&gt;\\s+.+\\</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="书写工具辅助" tabindex="-1">书写工具辅助 <a class="header-anchor" href="#书写工具辅助" aria-label="Permalink to &quot;书写工具辅助&quot;">​</a></h3><p>第一种：</p><p>全局安装 <code>commitizen</code>，即可使用 <code>git cz</code> 命令取代 <code>git commit</code>，提供交互式选择界面，协助书写。</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">commitizen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cz-conventional-changelog</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{ &quot;path&quot;: &quot;cz-conventional-changelog&quot; }</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.czrc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote><p>参考阅读 <a href="https://coding.net/help/docs/ci/practice/lint/git-commit.html#install" target="_blank" rel="noreferrer">Commit Message</a></p></blockquote><p>第二种：</p><p>更花哨一点，使用 <a href="https://github.com/streamich/git-cz" target="_blank" rel="noreferrer">git-cz</a></p><p><img src="https://img-blog.csdnimg.cn/68a9c68bfdb04852aab5263a0030e536.png" alt=""></p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git-cz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">//</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">or</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">commitizen</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git-cz</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="git-stash" tabindex="-1">git stash <a class="header-anchor" href="#git-stash" aria-label="Permalink to &quot;git stash&quot;">​</a></h2><p>平常需要切换分支，但有时候又不想要立即 commit 上去，于是可以通过 <code>git stash</code> 备份一下，主要的一些命令如下：</p><p>备份当前改动</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看备份列表</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>恢复备份的改动</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pop</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>更多内容可参考 <a href="https://www.cnblogs.com/tocy/p/git-stash-reference.html" target="_blank" rel="noreferrer">git-stash 用法小结</a></p></blockquote>`,42);function d(D,A,m,g,h,F){const n=c("VideoLink");return l(),t("div",null,[C,o(n,{bvId:"BV1ZP4y1Q76V"},{default:p(()=>[a("程序员进厂前必知必会 Git 技巧 | commit 提交规范 | rebase、amend 操作 B 站视频传送门")]),_:1}),y])}const B=e(i,[["render",d]]);export{u as __pageData,B as default};