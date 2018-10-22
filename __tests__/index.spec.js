const { formatMilliseconds } = require('../index')

describe('#formatMilliseconds', () => {
  it('should format the small times', async () => {
    let msg = formatMilliseconds(1000000)
    expect(msg).toBe('16m 40s')
  })
  
  it('should format the medium times', async () => {
    let msg = formatMilliseconds(123456890)
    expect(msg).toBe('1d 10h 17m 36s 890ms')
  })
  
  it('should format the large times', async () => {
    let msg = formatMilliseconds(987654321000)
    expect(msg).toBe('31y 21w 4h 25m 21s')
  })
  
  it('should format negative times', async () => {
    let msg = formatMilliseconds(-1000000)
    expect(msg).toBe('16m 40s ago')
  })
  
  it('should use long units with pluralisation', async () => {
    let msg = formatMilliseconds(961000, { units: 'long' })
    expect(msg).toBe('16 minutes 1 second')
  })
  
  it('should respect ignored units', async () => {
    let msg = formatMilliseconds(123456890, { ignore: [ 'millisecond' ] })
    expect(msg).toBe('1d 10h 17m 36s')
  })
  
  it('should format largest only', async () => {
    let msg = formatMilliseconds(123456890, { largestOnly: true })
    expect(msg).toBe('1d')
  })
})

// 1000000 ms
//   millis:  (1000000) % 1000 = 0ms
//   seconds: (1000000/1000) % 60  = 40s
//   minutes: (1000000/1000/60) % 60 ~= 16m
//   hours:   (1000000/1000/60/60) % 24 ~= 0h
//   days:    (1000000/1000/60/60/24) % 7 ~= 0d

// 123456890 ms
//   millis:  (123456890) % 1000 = 890ms
//   seconds: (123456890/1000) % 60  = 36s
//   minutes: (123456890/1000/60) % 60 ~= 17m
//   hours:   (123456890/1000/60/60) % 24 ~= 10h
//   days:    (123456890/1000/60/60/24) % 7 ~= 1d

// 987654321000 ms
//   millis:  (987654321000) % 1000 = 0ms
//   seconds: (987654321000/1000) % 60  = 21s
//   minutes: (987654321000/1000/60) % 60 ~= 25m
//   hours:   (987654321000/1000/60/60) % 24 ~= 4h
//   days:    (987654321000/1000/60/60/24) % 7 ~= 0d
//   weeks:   (987654321000/1000/60/60/24/7) % 52 ~= 21w
//   years:   (987654321000/1000/60/60/24/7/52) ~= 31y

// 961000 ms
//   millis:  (961000) % 1000 = 0ms
//   seconds: (961000/1000) % 60  = 1s
//   minutes: (961000/1000/60) % 60 ~= 16m
//   hours:   (961000/1000/60/60) % 24 ~= 0h
