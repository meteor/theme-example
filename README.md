# Test Docs Deployment

This docs deployment is a test [Hexo](https://github.com/hexojs/hexo) theme used by the [`meteor-theme-hexo` (npm) theme](https://github.com/meteor/meteor-theme-hexo) test deployment previews on Netlify.

It can also be used to test theme changes locally!

## Basic Usage

There are two commands, and they use the same arguments which are explained below.

* `npm run build -- <arguments>`
  * This generates the content.
* `npm start -- <arguments>`
  * This generates and also starts a local web server on port 4000.

## Arguments

* `--config-pkg <node-pkg>`
  * Where `<node-pkg>` is a Hexo configuration, such as `apollo-hexo-config`.
  * Either this option, or the next option are required.
* `--config-dir <path>`
  * Where `<path>` is a local checkout of the configuration.
  * Either this option, or the previous option is required.
* `--theme-dir <path>`
  * While it would be great if this worked when pointed anywhere on the system, a Hexo limitation prevents it from reaching outside the root of this repository, so you'll need to symlink your local Git checkout into `themes/meteor` and then run this as `--theme-dir themes/meteor`.

## Examples

**For the configuration, use your local checkout which is alongside this theme in `../apollo-hexo-config` along with a local copy of the theme which you've symlinked into `themes/meteor`.**
```
npm run server --  --config-dir ../apollo-hexo-config --theme-dir themes/meteor
```

**Use the locally symlinked version of the theme you've put in `themes/meteor`.**
```
npm run server --  --config-pkg apollo-hexo-config --theme-dir themes/meteor
```

**Use the Meteor Hexo configuration**
```
npm run server --  --config-pkg meteor-hexo-config
```
