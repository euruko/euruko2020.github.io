# Euruko 2020-2021

This is the website for Euruko 2020-2021.

## Overview

Built using [Victor Hugo](https://github.com/netlify-templates/victor-hugo).

The site uses [Hugo](https://gohugo.io/) as a static site generator and [Webpack](https://webpack.js.org/) as your asset pipeline.

## Deployments

⚠️ The `main` branch is deployed automatically! If you make changes to the `main` branch, they *WILL* go live on the internet.

## Usage

### :exclamation: Prerequisites

You should have the following installed:

* [node](https://nodejs.org/en/download/) (the latest LTS version)
* [yarn](https://yarnpkg.com/en/docs/install)
* [hugo](https://gohugo.io/getting-started/installing/) (v0.57+)

Next step, clone this repository and run:

```bash
yarn install
```

### :construction_worker: Development

While developing the website, use:

```bash
yarn start
```

or for developing your website with `hugo server --buildDrafts --buildFuture`, use:

```bash
yarn run preview
```

Then visit http://localhost:3000/ _- or a new browser windows popped-up already -_ to preview your new website. Webpack Dev Server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### :package: Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
yarn run build
```

To get a preview of posts or articles not yet published, run:

```bash
yarn run build:preview
```

See [package.json](package.json#L8) for all tasks.

## Structure

```
|--site                // Everything in here will be built with hugo
|  |--assets           // Stores all the files which need be processed by Hugo Pipes
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|--src                 // Files that will pass through the asset pipeline
|  |--css              // Webpack will bundle imported css separately
|  |--index.js         // index.js is the webpack entry for your CSS & JS assets
```

## Basic Concepts

You can read more about Hugo's template language in their documentation here:

https://gohugo.io/templates/overview/

The most useful page there is the one about the available functions:

https://gohugo.io/templates/functions/

The `src/index.js` file is the entrypoint for webpack and will be built to `/dist/main.js`

You can use **ES6** and use both relative imports or import libraries from npm.

Any CSS file imported into the `index.js` will be run through Webpack, compiled with [PostCSS Next](http://cssnext.io/), and
minified to `/dist/[name].[hash:5].css`. Import statements will be resolved as part of the build.

## Environment variables

To separate the development and production _- aka build -_ stages, all tasks run with a node environment variable named either `development` or `production`.

You can access the environment variable inside the theme files with `getenv "NODE_ENV"`. See the following example for a conditional statement:

    {{ if eq (getenv "NODE_ENV") "development" }}You're in development!{{ end }}

All tasks starting with _build_ set the environment variable to `production` - the other will set it to `development`.

## Deploying to GitHub Pages

1. Push your changes
2. Run `yarn run deploy`, this will first build a production version of the site and then deploy to GitHub pages
