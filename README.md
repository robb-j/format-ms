# Format Milliseconds

> You should really just use the [ms package](https://www.npmjs.com/package/ms)

A utility function for converting milliseconds into a human readable message.

```js
const { formatMilliseconds, parseMilliseconds } = require('format-ms')

console.log(formatMilliseconds(1000000))
// output: '16m 40s'

console.log(formatMilliseconds(-445500))
// output: '7m 25s 500ms ago'

console.log(formatMilliseconds(961000, { units: 'long' }))
// output: '16 minutes 1 second'

console.log(formatMilliseconds(-445500, { largestOnly: true }))
// output: '7m ago'

console.log(formatMilliseconds(445500, { ignore: [ 'millisecond' ] }))
// output: '7m 25s'

console.log(parseMilliseconds(987654321000))
// output: {
//   years: 31,
//   weeks: 21,
//   days: 0,
//   hours: 4,
//   minutes: 25,
//   seconds: 21,
//   milliseconds: 0 }
```
