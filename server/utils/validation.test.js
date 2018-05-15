const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(2342234)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('        ')).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    expect(isRealString('    spaces   but also    letters    ')).toBe(true);
  });
});
