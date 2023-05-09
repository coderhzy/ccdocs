---
title:  Linux使用clash
description: 快速上手使用Linux科学上网
publishedAt: '2022-11-30'
lastUpdated: '2022-11-30'
tags: 'management'
---

## 1. 下载 `linux-amd64`
[clash下载地址](https://github.com/Dreamacro/clash/releases)
## 2. 安装
1. 下载对应的二进制，比如默认放到 `~/Downloads` 目录，在终端进入该目录。
```shell
gunzip clash-linux-amd64-v0.18.0.gz
sudo mv clash-linux-amd64-v1.4.2 /usr/local/bin/clash
sudo chmod +x /usr/local/bin/clash
./clash
```
2. clash 启动后会在 `~/.config/clash` 目录生成配置文件。
```shell
ls -al ~/.config/clash
.rw-r--r--   10 einverne 23 Mar 19:30 config.yaml
.rw-r--r-- 4.0M einverne 23 Mar 19:30 Country.mmdb
```
## 3.  下载配置文件
下载你的VPN对应文件覆盖原有的`config.yaml`
## 4.  重新执行clash
```shell
./clash
```
## 5.  新开终端配置vpn
```shell
export https_proxy=http://127.0.0.1:7890
```

## X. # clash error "WARN[0000] MMDB invalid, remove and download
wrong command

```
./clash
```

WARN[0000] MMDB invalid, remove and download

using this command will fix

```
wget -O Country.mmdb https://www.sub-speeder.com/client-download/Country.mmdb
./clash -d .
```



