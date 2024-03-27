<h1 align="center"><img src="https://user-images.githubusercontent.com/13678919/31573203-99ae6894-b0e9-11e7-8a7e-2b26eaff58c6.png"/></h1>

[![NPM Version](https://img.shields.io/npm/v/maptalks.svg)](https://github.com/maptalks/maptalks.js) [![Circle CI](https://circleci.com/gh/maptalks/maptalks.js.svg?style=shield)](https://circleci.com/gh/maptalks/maptalks.js) [![codecov](https://codecov.io/gh/maptalks/maptalks.js/branch/master/graph/badge.svg)](https://codecov.io/gh/maptalks/maptalks.js)

可以轻松创建一个集成了2D(平面)和3D(三维)地图的轻量级JavaScript库。

* **2D/3D**: 集成了2D(平面)和3D(三维)地图。
* **可插拔的开放式架构**: 您可以通过 [插件](https://maptalks.org/plugins.html) 轻松扩展您喜爱的技术。
* **性能**: 可流畅渲染数以万计的几何图形。
* **易用**: 非常容易学习和使用。
* **功能齐全**: 满足了大多数制图所需的基本功能。
* **SSR**: [服务端渲染](https://github.com/maptalks/maptalks.js/wiki/Server-Side-Rendering)

## 历程

**maptalks.js** was born for a map-centric project to help [YUM! China](http://www.yumchina.com/en/) (the most successful food chain in China) manage and analyze spatial data all over the country for choosing locations of new KFC and PizzaHut restaurants. After verified in many projects of government depts and enterprises, we are glad to open source it, and hoping it can help you deliver better mapping projects.

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
## Install

* Standalone file

Download the [lastest release](https://github.com/maptalks/maptalks.js/releases) and load it in your HTML page like:
```html
<link href="path/to/maptalks.css" rel="stylesheet" type="text/css" />
<script src="path/to/maptalks.min.js" type="text/javascript"></script>
```

* CDN
Just include this in your html:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.css">
<script src="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.js"></script>
```

* NPM

```shell
npm install maptalks --save
```

## Plugin Development

It's easy and joyful to write plugins for maptalks, please check out [the tutorials](https://github.com/maptalks/maptalks.js/wiki) and begin to develop your own. And you are welcome to [share your work](https://github.com/maptalks/maptalks.github.io/issues/new) with us.

## Contributing

We warmly welcome any kind of contributions including issue reportings, pull requests, documentation corrections, feature requests and any other helps.

### Contributing Guide
Please read our [contributing guide](.github/CONTRIBUTING.md) to learn about our development process, how to propose fixes and improvements, and how to test your changes to maptalks.

## Acknowledgments

Maptalks is built on the shoulders of giants. Please refer to [ACKNOWLEDGEMENT](ACKNOWLEDGEMENT) for details.
