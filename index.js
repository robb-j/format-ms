
// Unit names for formatting different units of time
const unitNames = {
  short: {
    year: 'y',
    week: 'w',
    day: 'd',
    hour: 'h',
    minute: 'm',
    second: 's',
    millisecond: 'ms'
  },
  long: {
    year: ' year(s)',
    week: ' week(s)',
    day: ' day(s)',
    hour: ' hour(s)',
    minute: ' minute(s)',
    second: ' second(s)',
    millisecond: ' millisecond(s)'
  }
}

// A object for converting milliseconds to different units
// Stores the inverse of the calculation so you only have to multiply by it
const millisecondTo = {
  second: 1 / 1000,
  minute: 1 / (1000 * 60),
  hour: 1 / (1000 * 60 * 60),
  day: 1 / (1000 * 60 * 60 * 24),
  week: 1 / (1000 * 60 * 60 * 24 * 7),
  year: 1 / (1000 * 60 * 60 * 24 * 7 * 365.25)
}

// Util to add a unit name w/ pluralisation to value
const unitify = (value, units, unitname) => {
  return value + units[unitname].replace(/\(s\)/, value === 1 ? '' : 's')
}

// Parse milliseconds into its component units in an object
const parseMilliseconds = ms => {
  let totalSeconds = Math.floor(ms * millisecondTo.second)
  let totalMinutes = Math.floor(ms * millisecondTo.minute)
  let totalHours = Math.floor(ms * millisecondTo.hour)
  let totalDays = Math.floor(ms * millisecondTo.day)
  let totalWeeks = Math.floor(ms * millisecondTo.week)
  let totalYears = Math.floor(ms * millisecondTo.year)
  
  let years = totalYears % 7
  let weeks = totalWeeks % 7
  let days = totalDays % 24
  let hours = totalHours % 60
  let minutes = totalMinutes % 60
  let seconds = totalSeconds % 60
  let milliseconds = ms % 1000
  
  return { years, weeks, days, hours, minutes, seconds, milliseconds }
}

// Format a millisecond time into a human readable string
const formatMilliseconds = (ms, { units = 'short', ignore = [] } = {}) => {
  let inPast = ms < 0
  ms = Math.abs(ms)
  
  let comps = parseMilliseconds(ms)
  
  let unitSet = unitNames[units]
  
  let parts = []
  
  const addPartIfNonZero = (arr, key, unitName) => {
    if (comps[key] <= 0 || ignore.includes(unitName)) return
    arr.push(unitify(comps[key], unitSet, unitName))
  }
  
  addPartIfNonZero(parts, 'years', 'year')
  addPartIfNonZero(parts, 'weeks', 'week')
  addPartIfNonZero(parts, 'days', 'day')
  addPartIfNonZero(parts, 'hours', 'hour')
  addPartIfNonZero(parts, 'minutes', 'minute')
  addPartIfNonZero(parts, 'seconds', 'second')
  addPartIfNonZero(parts, 'milliseconds', 'millisecond')
  
  if (inPast) parts.push('ago')
  
  return parts.join(' ')
}

module.exports = {
  unitNames, millisecondTo, unitify, parseMilliseconds, formatMilliseconds
}
