<h1 align="center"><img src="https://user-images.githubusercontent.com/13678919/31573203-99ae6894-b0e9-11e7-8a7e-2b26eaff58c6.png"/></h1>

[English](./README.md) | 简体中文

[![NPM Version](https://img.shields.io/npm/v/maptalks.svg)](https://github.com/maptalks/maptalks.js) [![Circle CI](https://circleci.com/gh/maptalks/maptalks.js.svg?style=shield)](https://circleci.com/gh/maptalks/maptalks.js) [![codecov](https://codecov.io/gh/maptalks/maptalks.js/branch/master/graph/badge.svg)](https://codecov.io/gh/maptalks/maptalks.js)

可以轻松创建一个集成了2D(平面)和3D(三维)地图的轻量级JavaScript库。

* **2D/3D**: 集成了2D(平面)和3D(三维)地图。
* **可插拔的开放式架构**: 您可以通过 [插件](https://maptalks.org/plugins.html) 轻松扩展您喜爱的技术。
* **性能**: 可流畅渲染数以万计的几何图形。
* **易用**: 非常容易学习和使用。
* **功能齐全**: 满足了大多数制图所需的基本功能。
* **SSR**: [服务端渲染](https://github.com/maptalks/maptalks.js/wiki/Server-Side-Rendering)

## 历程

**maptalks.js**诞生于一个以地图为中心的项目，旨在帮助 [百胜中国](http://www.yumchina.com/en/) （中国最成功的餐饮连锁企业）管理和分析全国各地的空间数据，以选择肯德基、必胜客餐厅的新门店地址。经过在许多政府部门和企业的项目中的验证，我们很高兴的将其开源，并希望它能帮助您交付更好的地图项目。
<a href="http://maptalks.org/maptalks.three/demo/bloom.html" title="maptalks.three Demo" target="_blank"><video width="820" src = "https://user-images.githubusercontent.com/25998927/149662311-4cb06c54-49ab-44b2-b019-518c0228508c.mp4" autoplay loop hspace="10"></video></a>

## 资源

* [官方网站](http://maptalks.org)
* [快速入门](http://maptalks.org/getting-started.html)
* [范例](https://maptalks.github.io/examples/en/map/load/)
* [API参考](https://maptalks.github.io/maptalks.js/api/0.x/Map.html)
* [详细文档](https://github.com/maptalks/maptalks.js/wiki)
* [样式参考](https://github.com/maptalks/maptalks.js/wiki/Symbol-Reference)
* [相关插件](http://maptalks.org/plugins.html)
   * [标记聚合插件 markercluster](https://github.com/maptalks/maptalks.markercluster)
   * [热力图插件 heatmap](https://github.com/maptalks/maptalks.heatmap)
   * [mapbox-gl-js](https://github.com/maptalks/maptalks.mapboxgl)
   * [three.js](https://github.com/maptalks/maptalks.three)
   * [图表 echarts](https://github.com/maptalks/maptalks.e3)

## 环境支持

* 大多数现代化的浏览器以及IE9以上(只有IE11支持3D要素)
* 移动端浏览器
* Node >= 4.x (支持[服务端渲染](https://github.com/maptalks/maptalks.js/wiki/Server-Side-Rendering))
* Electron

**maptalks** maptalks在IE9、IE10、IE11、Firefox和Chrome浏览器上进行了重复测试且运行良好，在持续集成服务上运行的测试用例超过1600个。
## 安装

* 独立引用

下载 [最后发行版](https://github.com/maptalks/maptalks.js/releases) 并且在你的HTML页面中像这样引入:
```html
<link href="path/to/maptalks.css" rel="stylesheet" type="text/css" />
<script src="path/to/maptalks.min.js" type="text/javascript"></script>
```

* CDN(内容分发网络)
可以像这样引用在你的HTML页面中:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.css">
<script src="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.js"></script>
```

* NPM

```shell
npm install maptalks --save
```

## 插件开发

为maptalks写插件是一件轻松且有趣的事情，请查看这个 [教程](https://github.com/maptalks/maptalks.js/wiki) 来开发属于你的插件。当然，也欢迎你向我们 [分享你的作品](https://github.com/maptalks/maptalks.github.io/issues/new) 。

## 贡献

我们热烈欢迎任何形式的贡献，包括问题报告、合并请求、文档更正、功能请求以及其他任何形式的帮助。

### 贡献指南
请仔细阅读我们的 [贡献指南](.github/CONTRIBUTING.md) 以此熟悉我们的开发流程，如何提出修复和改进建议，以及如何测试对maptalks的更改。

## 致谢

Maptalks是站在巨人的肩膀上发展起来的。 详情请参阅 [致谢](ACKNOWLEDGEMENT).
