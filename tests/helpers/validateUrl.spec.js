const validateUrl = require('../../helpers/validateUrl')

describe('validateUrl', () => {
  it('returns true if the url is valid', () => {
    expect(validateUrl('http://example.com')).toBe(true)
    expect(validateUrl('http://www.example.com')).toBe(true)
    expect(validateUrl('http://www.example.com/path')).toBe(true)
    expect(validateUrl('http://www.example.com/path/subpath/subsubpath')).toBe(true)
    expect(validateUrl('http://www.example.com/path?params=true')).toBe(true)
    expect(validateUrl('http://www.example.com/path?params=true&anotherParam=false')).toBe(true)
    expect(validateUrl('https://www.example.com/')).toBe(true)
  })

  it('returns false if the url is invalid', () => {
    expect(validateUrl('example')).toBe(false)
    expect(validateUrl('123.example com')).toBe(false)
  })
})
