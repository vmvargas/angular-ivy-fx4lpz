import { CustomLongDateTimePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomLongDateTimePipe(new Date().toISOString());
    expect(pipe).toBeTruthy();
  });
});
