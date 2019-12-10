# npm-bundle-info
Provides information about npm packages like size when minified or zipped across multiple bundle versions. 

## Status
![](https://img.shields.io/github/workflow/status/vsambor/npm-bundle-info/Node%20CI?style=for-the-badge)

## Main tech versions
![node.js](https://img.shields.io/badge/node-12.8.0-green.svg)
![npm](https://img.shields.io/badge/npm-6.10.2-yellow.svg)
![express](https://img.shields.io/badge/express-4.16.x-orange.svg)
![ReactJS](https://img.shields.io/badge/reactjs-16.12.x-brightgreen.svg)
![create-react-app](https://img.shields.io/badge/create_react_app-3.2.x-blue.svg)

## Features
- Search for bundles
- Search input with autocomplete
- Show minified bundle size
- Show minified + gzipped bundle size
- Retrieves the last 3 versions and the last major version of a package
- Show data in a bar chart
- Uses a persistent cache system when retrieving bundle stats

## High level architercutre
[Design/Architecutre](https://github.com/vsambor/npm-bundle-info/wiki/Architecture)

## Kanban
[Bundle Info Dashboard](https://github.com/vsambor/npm-bundle-info/projects/2)

## Backend tech stack

- [node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [body-parser](https://github.com/expressjs/body-parser)
- [cors](https://github.com/expressjs/body-parser)
- [morgan](https://github.com/expressjs/morgan)
- [rollup](https://rollupjs.org/guide/en/)
- [jest](https://jestjs.io/)
- [semver](https://github.com/npm/node-semver)

## Frontend tech stack

- [reactjs](https://reactjs.org//)
- [react-scripts](https://github.com/facebook/create-react-app)
- [yarn](https://yarnpkg.com/lang/en/)
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)
- [jest](https://karma-runner.github.io/2.0/index.html)
- [emzyme](https://airbnb.io/enzyme/)


## Usage

### For Frontend go to [Frontend README](https://github.com/vsambor/npm-bundle-info/blob/master/client/README.md)

### For Backend go to [Backend README](https://github.com/vsambor/npm-bundle-info/blob/master/server/README.md)

## Misc
 - github workflow CI


## Result

<img width="1256" alt="Screen Shot 2019-12-10 at 1 15 20 AM" src="https://user-images.githubusercontent.com/26199384/70483988-a02a0800-1aea-11ea-9cc9-67a6900dcd51.png">
