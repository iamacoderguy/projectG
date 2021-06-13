import { 
  format,
} from './string';

describe(`${format.name}`, () => {
  it.each([
    [
      'Hello {0}! How are you {1}?',
      [ 'Mr. Test', 'today' ],
      'Hello Mr. Test! How are you today?',
    ],
    [
      '{0} must be greater than or equal to {1}',
      [ 'Number of product application days before stocking', 0 ],
      'Number of product application days before stocking must be greater than or equal to 0',
    ],
    [
      '{0}: {1} {{{2}, surfaceUnit}} - {3} m3',
      [ 'Pond name', '2.5', 'Square metre', '6.25' ],
      'Pond name: 2.5 {{Square metre, surfaceUnit}} - 6.25 m3',
    ],
  ])('format(%s, %o) => %s', (template: string, args: any[], expected: string) => {
    // action
    const actual = format(template, ...args);
    
    // assert
    expect(actual).toEqual(expected);
  });
});