const { formatMilliseconds } = require('../index')

describe('#formatMilliseconds', () => {
  it('should format the small times', async () => {
    let msg = formatMilliseconds(1000000)
    expect(msg).toBe('16m 40s')
  })
  
  it('should format the medium times', async () => {
    let msg = formatMilliseconds(123456890)
    expect(msg).toBe('1d 34h 17m 36s 890ms')
  })
  
  it('should format the large times', async () => {
    let msg = formatMilliseconds(987654321000)
    expect(msg).toBe('4y 2w 7d 28h 25m 21s')
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
    expect(msg).toBe('1d 34h 17m 36s')
  })
})
