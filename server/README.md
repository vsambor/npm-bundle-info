# Install dependencies:
`$ npm install`

# On MacOS or Linux, run the app with this command:
`$ DEBUG=myapp:* npm start` or just `$npm start`

# On Windows, use this command:
`> set DEBUG=myapp:* & npm start`

# Available APIs

`/`

### Returns: root API presentation 


`/api/bundle?name=[xxxx]&version=[xxxx]`

```
# GET /api/bundle
{
  stats: { minified: 34500, zipped: 1500 },
  chart: {
    compressionData: [ [Object], [Object] ],
    versions: [ 'v1.0', 'v1.1' ]
  }
}
```