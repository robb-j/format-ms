# Format Milliseconds

A utility function for converting milliseconds into a human readable message.

```js
const { formatMilliseconds, parseMilliseconds } = require('format-ms')

console.log(formatMilliseconds(1000000))
// output: '16m 40s'

console.log(formatMilliseconds(-445500))
// output: '7m 25s 500ms ago'

console.log(formatMilliseconds(961000, 'long'))
// output: 16 minutes 1 second

console.log(parseMilliseconds(987654321000))
// output: {
//   years: 4,
//   weeks: 2,
//   days: 7,
//   hours: 28,
//   minutes: 25,
//   seconds: 21,
//   milliseconds: 0 }
```
