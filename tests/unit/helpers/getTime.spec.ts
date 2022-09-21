import { getTime } from '@/helpers';

describe('Helpers fn - getTime', () => {
  it('endTime and startTime are equals', () => {
    const time = getTime(0, 0);
    expect(time).toEqual('0 sec');
  });
  it('get integer sec', () => {
    const time = getTime(0, 1000); // needs time in miliseconds
    expect(time).toEqual('1 sec');
  });
  it('get sec with one place after comma', () => {
    const time = getTime(0, 1500);
    expect(time).toEqual('1.5 sec');
  });
  it('get sec with two place after comma', () => {
    const time = getTime(0, 1510);
    expect(time).toEqual('1.51 sec');
  });
  it('get sec with two place after comma', () => {
    const time = getTime(0, 1512);
    expect(time).toEqual('1.51 sec');
  });
  it('get integer min', () => {
    const time = getTime(0, 120000);
    expect(time).toEqual('2 min');
  });
  it('get min with comma', () => {
    const time = getTime(0, 150000);
    expect(time).toEqual('2.5 min');
  });
});
