/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Gif } from '../../packages/gif/src';
import { Paragraph } from '../../packages/paragraph/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [
          {
            type: 'gif',
            id: 'M8sQU9v1wF4CkxP5tl',
            url: 'https://giphy.com/gifs/tax-store-australia-M8sQU9v1wF4CkxP5tl',
            slug: 'tax-store-australia-M8sQU9v1wF4CkxP5tl',
            bitly_gif_url: 'https://gph.is/g/aQrYRQx',
            bitly_url: 'https://gph.is/g/aQrYRQx',
            embed_url: 'https://giphy.com/embed/M8sQU9v1wF4CkxP5tl',
            username: 'TaxStoreAustralia',
            source: 'https://taxstore.com.au/',
            title: '',
            rating: 'g',
            content_url: '',
            source_tld: 'taxstore.com.au',
            source_post_url: 'https://taxstore.com.au/',
            is_sticker: 0,
            import_datetime: '2022-10-11 07:09:26',
            trending_datetime: '0000-00-00 00:00:00',
            images: {
              original: {
                height: '480',
                width: '480',
                size: '294667',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.gif&ct=g',
                mp4_size: '101465',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
                webp_size: '181654',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.webp&ct=g',
                frames: '26',
                hash: 'd9de2c1ab01aec69902f87df575d7bef',
              },
              downsized: {
                height: '480',
                width: '480',
                size: '294667',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.gif&ct=g',
              },
              downsized_large: {
                height: '480',
                width: '480',
                size: '294667',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.gif&ct=g',
              },
              downsized_medium: {
                height: '480',
                width: '480',
                size: '294667',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.gif&ct=g',
              },
              downsized_small: {
                height: '480',
                width: '480',
                mp4_size: '101465',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy-downsized-small.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy-downsized-small.mp4&ct=g',
              },
              downsized_still: {
                height: '480',
                width: '480',
                size: '294667',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy_s.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy_s.gif&ct=g',
              },
              fixed_height: {
                height: '200',
                width: '200',
                size: '83735',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200.gif&ct=g',
                mp4_size: '37747',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200.mp4&ct=g',
                webp_size: '71460',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200.webp&ct=g',
              },
              fixed_height_downsampled: {
                height: '200',
                width: '200',
                size: '21642',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200_d.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200_d.gif&ct=g',
                webp_size: '16844',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200_d.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200_d.webp&ct=g',
              },
              fixed_height_small: {
                height: '100',
                width: '100',
                size: '35614',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100.gif&ct=g',
                mp4_size: '18365',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100.mp4&ct=g',
                webp_size: '34824',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100.webp&ct=g',
              },
              fixed_height_small_still: {
                height: '100',
                width: '100',
                size: '1344',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100_s.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100_s.gif&ct=g',
              },
              fixed_height_still: {
                height: '200',
                width: '200',
                size: '2955',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200_s.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200_s.gif&ct=g',
              },
              fixed_width: {
                height: '200',
                width: '200',
                size: '83735',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200w.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200w.gif&ct=g',
                mp4_size: '37747',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200w.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200w.mp4&ct=g',
                webp_size: '71460',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200w.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200w.webp&ct=g',
              },
              fixed_width_downsampled: {
                height: '200',
                width: '200',
                size: '21642',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200w_d.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200w_d.gif&ct=g',
                webp_size: '16844',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200w_d.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200w_d.webp&ct=g',
              },
              fixed_width_small: {
                height: '100',
                width: '100',
                size: '35614',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100w.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100w.gif&ct=g',
                mp4_size: '18365',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100w.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100w.mp4&ct=g',
                webp_size: '34824',
                webp: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100w.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100w.webp&ct=g',
              },
              fixed_width_small_still: {
                height: '100',
                width: '100',
                size: '1344',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/100w_s.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=100w_s.gif&ct=g',
              },
              fixed_width_still: {
                height: '200',
                width: '200',
                size: '2955',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/200w_s.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=200w_s.gif&ct=g',
              },
              looping: {
                mp4_size: '872533',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy-loop.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy-loop.mp4&ct=g',
              },
              original_still: {
                height: '480',
                width: '480',
                size: '7594',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy_s.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy_s.gif&ct=g',
              },
              original_mp4: {
                height: '480',
                width: '480',
                mp4_size: '101465',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
              },
              preview: {
                height: '336',
                width: '336',
                mp4_size: '45089',
                mp4: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy-preview.mp4?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy-preview.mp4&ct=g',
              },
              preview_gif: {
                height: '134',
                width: '134',
                size: '48670',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy-preview.gif?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy-preview.gif&ct=g',
              },
              preview_webp: {
                height: '384',
                width: '384',
                size: '49330',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/giphy-preview.webp?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=giphy-preview.webp&ct=g',
              },
              '480w_still': {
                height: '480',
                width: '480',
                size: '294667',
                url: 'https://media3.giphy.com/media/M8sQU9v1wF4CkxP5tl/480w_s.jpg?cid=baae7b6fabdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g&ep=v1_gifs_search&rid=480w_s.jpg&ct=g',
              },
            },
            user: {
              avatar_url: 'https://media0.giphy.com/avatars/TaxStoreAustralia/vxkBvEeQxJ7T.gif',
              banner_image: '',
              banner_url: '',
              profile_url: 'https://giphy.com/TaxStoreAustralia/',
              username: 'TaxStoreAustralia',
              display_name: 'Tax Store Australia',
              description: '',
              instagram_url: 'https://instagram.com/taxstoreaus',
              website_url: 'http://taxstore.com.au/',
              is_verified: false,
            },
            analytics_response_payload:
              'e=Z2lmX2lkPU04c1FVOXYxd0Y0Q2t4UDV0bCZldmVudF90eXBlPUdJRl9TRUFSQ0gmY2lkPWJhYWU3YjZmYWJkaXhoOHM5MjJja28zbHk2cmxqaDVxM3YzenhzazU5b2IzNHU5ZyZjdD1n',
            analytics: {
              onload: {
                url: 'https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPU04c1FVOXYxd0Y0Q2t4UDV0bCZldmVudF90eXBlPUdJRl9TRUFSQ0gmY2lkPWJhYWU3YjZmYWJkaXhoOHM5MjJja28zbHk2cmxqaDVxM3YzenhzazU5b2IzNHU5ZyZjdD1n&action_type=SEEN',
              },
              onclick: {
                url: 'https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPU04c1FVOXYxd0Y0Q2t4UDV0bCZldmVudF90eXBlPUdJRl9TRUFSQ0gmY2lkPWJhYWU3YjZmYWJkaXhoOHM5MjJja28zbHk2cmxqaDVxM3YzenhzazU5b2IzNHU5ZyZjdD1n&action_type=CLICK',
              },
              onsent: {
                url: 'https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPU04c1FVOXYxd0Y0Q2t4UDV0bCZldmVudF90eXBlPUdJRl9TRUFSQ0gmY2lkPWJhYWU3YjZmYWJkaXhoOHM5MjJja28zbHk2cmxqaDVxM3YzenhzazU5b2IzNHU5ZyZjdD1n&action_type=SENT',
              },
            },
          },
        ],
        pagination: {
          total_count: 1,
          count: 1,
          offset: 0,
        },
        meta: {
          status: 200,
          msg: 'OK',
          response_id: 'abdixh8s922cko3ly6rljh5q3v3zxsk59ob34u9g',
        },
      }),
  })
) as any;

describe('Gif', () => {
  it('button press should add gif', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), Gif('U2cUFPs3FgG3vLbp2DLXKRlUXn2N12bO')]}
      />
    );
    const button = screen.getByTestId('gif-button.text-modal-button');
    await userEvent.click(button);
    const gifSearch = screen.getByTestId('Search GIF-input');
    await userEvent.type(gifSearch, 't');
    await new Promise(r => setTimeout(r, 500));
    const firstImg = await screen.findByTestId(
      'gif-img-select',
      {},
      {
        timeout: 1000,
      }
    );
    await userEvent.click(firstImg);
    const gifImgEl = await screen.findByTestId(
      'gif-comp-img',
      {},
      {
        timeout: 1000,
      }
    );

    expect(gifImgEl).toBeInTheDocument();
  });
  it('should render gif image', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'gif',
          attrs: {
            webp: 'https://media4.giphy.com/media/EZICHGrSD5QEFCxMiC/giphy.webp?cid=baae7b6frtdzarm52v9njb5f1bxq3icjsiwl1bl3b6ecd3q7&ep=v1_gifs_trending&rid=giphy.webp&ct=g',
            mp4: 'https://media4.giphy.com/media/EZICHGrSD5QEFCxMiC/giphy.mp4?cid=baae7b6frtdzarm52v9njb5f1bxq3icjsiwl1bl3b6ecd3q7&ep=v1_gifs_trending&rid=giphy.mp4&ct=g',
            originalWidth: '480',
            originalHeight: '480',
            alt: 'Tired Good Night GIF by HBO Max',
            alignment: 'center',
            customSize: null,
            customWidth: null,
            customHeight: null,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Gif('')]} />);

    const gifImgEl = screen.getByTestId('gif-comp-img');

    expect(gifImgEl).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });

  it('should render gif video', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'gif',
          attrs: {
            webp: null,
            mp4: 'https://media2.giphy.com/media/V5l5ZucxUc7kNTaXWK/giphy.mp4?cid=baae7b6frtdzarm52v9njb5f1bxq3icjsiwl1bl3b6ecd3q7&ep=v1_gifs_trending&rid=giphy.mp4&ct=g',
            originalWidth: '480',
            originalHeight: '480',
            alt: 'Nintendo Link GIF by GIPHY Gaming',
            alignment: 'center',
            customSize: null,
            customWidth: null,
            customHeight: null,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Gif('')]} />);

    const gifVidEl = screen.getByTestId('gif-comp-vid');

    expect(gifVidEl).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
