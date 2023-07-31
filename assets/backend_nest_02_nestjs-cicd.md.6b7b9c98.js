import{_ as s,o as n,c as a,M as l}from"./chunks/framework.de00ba72.js";const b=JSON.parse('{"title":"Nestjs 项目 CI/CD","description":"","frontmatter":{},"headers":[],"relativePath":"backend/nest/02_nestjs-cicd.md","filePath":"backend/nest/02_nestjs-cicd.md","lastUpdated":1690822633000}'),p={name:"backend/nest/02_nestjs-cicd.md"},e=l(`<h1 id="nestjs-项目-ci-cd" tabindex="-1">Nestjs 项目 CI/CD <a class="header-anchor" href="#nestjs-项目-ci-cd" aria-label="Permalink to &quot;Nestjs 项目 CI/CD&quot;">​</a></h1><blockquote><p>采用Github Actions + Docker + pm2 实现Nestjs项目在AWS服务器上的CI/CD</p></blockquote><h2 id="_1-连接云服务器" tabindex="-1">1. 连接云服务器 <a class="header-anchor" href="#_1-连接云服务器" aria-label="Permalink to &quot;1. 连接云服务器&quot;">​</a></h2><h3 id="_1-1-根据aws文档-连接服务器" tabindex="-1">1.1 根据AWS文档，连接服务器 <a class="header-anchor" href="#_1-1-根据aws文档-连接服务器" aria-label="Permalink to &quot;1.1 根据AWS文档，连接服务器&quot;">​</a></h3><ul><li><a href="https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html" target="_blank" rel="noreferrer">AWS文档</a></li></ul><ol><li>下载服务器私钥</li><li>chmod 400 xxx.pem</li><li>xxx.pem 放在 ~/.ssh/ 下</li><li>.ssh/config 文件中新增下面字段</li></ol><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ec2</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Hostname</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxxxx.amazonaws.com</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">user</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ec2-xxx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">IdentityFile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/xxx.pem</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Port</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">22</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="5"><li>执行 ssh ec2 连接正式环境服务器</li></ol><h2 id="_2-docker" tabindex="-1">2. Docker <a class="header-anchor" href="#_2-docker" aria-label="Permalink to &quot;2. Docker&quot;">​</a></h2><h3 id="_2-1-安装docker" tabindex="-1">2.1 安装Docker <a class="header-anchor" href="#_2-1-安装docker" aria-label="Permalink to &quot;2.1 安装Docker&quot;">​</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-y</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 更新实例上已安装的程序包和程序包缓存</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-y</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装最新的 Docker Community Edition 程序包</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#启动 Docker 服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">usermod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-G</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ec2-user</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 将 ec2-user 添加到 docker 组，以便您能够执行 Docker 命令，而无需使用 sudo。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">newgrp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#更新用户组</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">info</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 验证 ec2-user 是否能在没有 sudo 的情况下运行 Docker 命令。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_2-2-创建dockerfile" tabindex="-1">2.2 创建Dockerfile <a class="header-anchor" href="#_2-2-创建dockerfile" aria-label="Permalink to &quot;2.2 创建Dockerfile&quot;">​</a></h3><ul><li>根据自己的项目创建Dockerfile, 这里是个例子🌰</li></ul><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">FROM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">node:18.0-alpine3.14</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build-stage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 创建工作目录</span></span>
<span class="line"><span style="color:#FFCB6B;">WORKDIR</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">COPY</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package.json</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.</span></span>
<span class="line"><span style="color:#FFCB6B;">COPY</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm-lock.yaml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将 NestJS 代码拷贝到工作目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">COPY</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># production stage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">FROM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">node:18.0-alpine3.14</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">production-stage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">COPY</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--from=build-stage</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/app/dist</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/app</span></span>
<span class="line"><span style="color:#FFCB6B;">COPY</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--from=build-stage</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/app/package.json</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/app/package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">WORKDIR</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pm2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">EXPOSE</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 在容器启动时运行 NestJS 项目</span></span>
<span class="line"><span style="color:#FFCB6B;">CMD</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pm2-runtime</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/app/main.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="_2-3-登录docker-hub" tabindex="-1">2.3 登录Docker-hub <a class="header-anchor" href="#_2-3-登录docker-hub" aria-label="Permalink to &quot;2.3 登录Docker-hub&quot;">​</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">login</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 输入用户名和密码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 登录成功</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><a href="https://hub.docker.com/repositories/codehzy" target="_blank" rel="noreferrer">创建存储镜像地方</a></p><p><img src="https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202308010045522.png" alt=""></p><h2 id="_3-github-actions" tabindex="-1">3. Github Actions <a class="header-anchor" href="#_3-github-actions" aria-label="Permalink to &quot;3. Github Actions&quot;">​</a></h2><h3 id="_3-1-创建github-actions" tabindex="-1">3.1 创建Github Actions <a class="header-anchor" href="#_3-1-创建github-actions" aria-label="Permalink to &quot;3.1 创建Github Actions&quot;">​</a></h3><ul><li><p>在项目根目录下创建 .github/workflows/deploy.yml 文件</p></li><li><p>DOCKER_USERNAME: Docker Hub 用户名</p></li><li><p>DOCKER_PASSWORD: Docker Hub 密码</p></li><li><p>EC2_HOST: 云服务器公网IP</p></li><li><p>EC2_USERNAME: 云服务器用户名</p></li><li><p>EC2_PRIVATE_KEY: 云服务器私钥(<strong>需要手动创建- 一定要跟着下方做,这是个坑点</strong>)</p></li></ul><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Simple way just:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ed25519</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">your@email.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># enter name of ssh-key for example: thorn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">thorn.pub</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/authorized_keys</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">finally</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">copy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">key:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">thorn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Copy value between \` -----BEGIN OPENSSH PRIVATE KEY----- some value of ssh-key -----END OPENSSH PRIVATE KEY-----</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>SSH_PORT: 云服务器SSH端口</li></ul><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CI/CD</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Nest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">push:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">branches:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">jobs</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">build-test-deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">runs-on:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">self-hosted</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">code</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">uses:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/checkout@v2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Login</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Hub</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">uses:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker/login-action@v1</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">username:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DOCKER_USERNAME </span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">password:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DOCKER_PASSWORD </span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Build</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Push</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Image</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">uses:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker/build-push-action@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">context:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">push:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">tags:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">codehzy/hello-world:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Deploy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Ec2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">instance</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">uses:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">appleboy/ssh-action@v0.1.4</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">host:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.EC2_HOST </span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">username:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.EC2_USERNAME </span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">key:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.EC2_PRIVATE_KEY </span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">port:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.SSH_PORT </span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">script:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">script:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">whoami</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-world</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-world</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">codehzy/hello-world:latest</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span><span style="color:#C3E88D;">:3000</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-world:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h3 id="_3-2-点击仓库" tabindex="-1">3.2 点击仓库 <a class="header-anchor" href="#_3-2-点击仓库" aria-label="Permalink to &quot;3.2 点击仓库&quot;">​</a></h3><blockquote><p>setting -&gt; secrets -&gt; new repository secret 添加对应秘钥 注意: 秘钥名称要跟上面的一致</p><p>setting -&gt; Code and automation -&gt; Actions -&gt; Runners -&gt; Add runner -&gt; Linux -&gt; 选择自己的系统 -&gt; 下载对应的runner -&gt; 解压 -&gt; 运行 注意: 这一步跟着github的步骤走,名字要起的与github actions中的一致, 这样当你提交代码的时候(main分支), github actions就会自动运行了, 并将任务托管给runner, 从而完成服务器上的配置</p></blockquote><h2 id="x-注意点" tabindex="-1">X: 注意点 <a class="header-anchor" href="#x-注意点" aria-label="Permalink to &quot;X: 注意点&quot;">​</a></h2><h3 id="_1-how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket" tabindex="-1">1. How to fix docker: Got permission denied while trying to connect to the Docker daemon socket <a class="header-anchor" href="#_1-how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket" aria-label="Permalink to &quot;1. How to fix docker: Got permission denied while trying to connect to the Docker daemon socket&quot;">​</a></h3><p><a href="https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket" target="_blank" rel="noreferrer">解决办法</a></p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">666</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/var/run/docker.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-ssh-handshake-failed-ssh-unable-to-authenticate-attempted-methods-none-publickey-no-supported-methods-remain" tabindex="-1">2. ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain <a class="header-anchor" href="#_2-ssh-handshake-failed-ssh-unable-to-authenticate-attempted-methods-none-publickey-no-supported-methods-remain" aria-label="Permalink to &quot;2. ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain&quot;">​</a></h3><p><img src="https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202308010051216.png" alt=""></p><p>参考<a href="https://github.com/appleboy/ssh-action/issues/80" target="_blank" rel="noreferrer">解决办法</a></p>`,33),o=[e];function r(c,t,C,i,y,A){return n(),a("div",null,o)}const u=s(p,[["render",r]]);export{b as __pageData,u as default};
