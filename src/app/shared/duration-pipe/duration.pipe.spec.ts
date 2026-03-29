import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('formats seconds to mm:ss', () => {
    expect(pipe.transform(200)).toBe('3:20');
    expect(pipe.transform(60)).toBe('1:00');
    expect(pipe.transform(9)).toBe('0:09');
  });

  it('returns --:-- for undefined', () => {
    expect(pipe.transform(undefined)).toBe('--:--');
  });
});
