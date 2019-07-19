# Installation

## Direct Download / CDN

https://unpkg.com/dalitek-i18n-lite/dist/dalitek-i18n-lite 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/dalitek-i18n-lite@{{ $version }}/dist/dalitek-i18n-lite.js
 
Include dalitek-i18n-lite after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/dalitek-i18n-lite/dist/dalitek-i18n-lite.js"></script>
```

## NPM

```sh
$ npm install dalitek-i18n-lite
```

## Yarn

```sh
$ yarn add dalitek-i18n-lite
```

When used with a module system, you must explicitly install the `dalitek-i18n-lite` via `Vue.use()`:

```javascript
import Vue from 'vue'
import dalitek-i18n-lite from 'dalitek-i18n-lite'

Vue.use(dalitek-i18n-lite)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `dalitek-i18n-lite` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//dalitek-i18n-lite.git node_modules/dalitek-i18n-lite
$ cd node_modules/dalitek-i18n-lite
$ npm install
$ npm run build
```

