import { 
  getYoutubeId,
} from './movie';

describe(`${getYoutubeId.name}`, () => {
  it.each([
    [
      'http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index',
      '0zM3nApSvMg',
    ],
    [
      'http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o',
      'QdK8U-VIH_o',
    ],
    [
      'http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0',
      '0zM3nApSvMg',
    ],
    [
      'http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s',
      '0zM3nApSvMg',
    ],
    [
      'http://www.youtube.com/embed/0zM3nApSvMg?rel=0',
      '0zM3nApSvMg',
    ],
    [
      'http://www.youtube.com/watch?v=0zM3nApSvMg',
      '0zM3nApSvMg',
    ],
    [
      'http://youtu.be/0zM3nApSvMg',
      '0zM3nApSvMg',
    ],
  ])('format(%s, %o) => %s', (url: string, expectedId: string) => {
    // action
    const actual = getYoutubeId(url);
    
    // assert
    expect(actual).toEqual(expectedId);
  });
});