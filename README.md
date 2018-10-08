# Autogit Plugin - Github Sync Description

A plugin for synching the description with GitHub.

## Install

```sh
npm install --save autogit-plugin-github-sync-description
```

## Usage

#### Options

This plugin uses the following options object:

```js
{
  token: '' // GitHub token
}
```

#### Configuration

Add this plugin to a command:

```js
const syncDescription = require ( 'autogit-plugin-github-sync-description' );

module.exports = {
  commands: {
    'my-command': [
      syncDescription ({ token: 'MY_GITHUB_TOKEN' })
    ]
  }
}
```

## License

MIT © Fabio Spampinato
