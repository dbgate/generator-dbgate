# generator-dbgate [![NPM version][npm-image]][npm-url] 

> Generator for DbGate plugins

## Installation

First, install [Yeoman](http://yeoman.io) and generator-dbgate using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-dbgate
```

Then generate your new project:

```bash
yo dbgate
```

Select one of plugin types:
- file format - parser and writer of file format
- database engine connector

## Test your plugin
If you create plugin of file format type, it is prepared to test it imediately. You need to have DbGate installed locally.

```bash
cd dbgate-plugin-myplugin
yarn plugin
```

If you start DbGate, you will see new plugin. Command ```yarn plugout``` deletes plugin from DbGate.

## Publish you plugin
Check plugins package.json and fill plugin description, keywords and author. Then ```yarn publish``` will publish plugin into NPM repository. After this, plugin will bve accessible for all DbGate users.

## License

MIT © [Jan Prochazka]()


[npm-image]: https://badge.fury.io/js/generator-dbgate.svg
[npm-url]: https://npmjs.org/package/generator-dbgate
