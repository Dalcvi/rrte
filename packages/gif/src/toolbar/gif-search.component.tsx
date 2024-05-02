import { IGif } from '@giphy/js-types';
import { useTranslations } from '@rrte/i18n';
import { useEffect, useMemo, useState } from 'react';
import classes from './gif-search.component.module.scss';
import { TextInput } from '@rrte/toolbar';

interface ResultMeta {
  msg: string;
  response_id: string;
  status: number;
}

interface ResultPagination {
  count: number;
  total_count: number;
  offset: number;
}

interface Result {
  meta: ResultMeta;
  pagination: ResultPagination;
}

interface GifsResult extends Result {
  data: IGif[];
}

export const GifSearch = ({
  sdk,
  onGifSelect,
  setFirstItemRef,
  setLastItemRef,
}: {
  sdk: string;
  setFirstItemRef?: (element: HTMLElement | null) => void;
  setLastItemRef?: (element: HTMLElement | null) => void;
  onGifSelect: ({
    webp,
    mp4,
    originalWidth,
    originalHeight,
    alt,
  }: {
    webp?: string;
    mp4?: string;
    originalWidth: number;
    originalHeight: number;
    alt?: string;
  }) => void;
}) => {
  const { t } = useTranslations();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [observedGif, setObservedGif] = useState<HTMLVideoElement | HTMLImageElement | null>(null);
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gifGrid, setGifGrid] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    if (search === '') {
      setCurrentPage(0);
      setIsLoading(true);
      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${sdk}&limit=25&rating=g`)
        .then(res => res.json())
        .then((res: GifsResult) => {
          setGifs(res.data);
          setIsLoading(false);
        });
      return;
    }
    fetchMore(0, search);
  }, [search]);

  useEffect(() => {
    if (gifGrid !== null) {
      gifGrid.scrollTop = 0;
    }
  }, [search]);

  useEffect(() => {
    if (observedGif === null) {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMore(currentPage, search);
        }
      },
      { threshold: 1 }
    );
    observer.observe(observedGif);

    return () => {
      observer.disconnect();
    };
  }, [observedGif]);

  const fetchMore = useMemo(
    () => (currentPage: number, search: string) => {
      setIsLoading(true);
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${sdk}&q=${search}&limit=25&offset=${
          currentPage * 25
        }&rating=g&lang=en`
      )
        .then(res => res.json())
        .then((res: GifsResult) => {
          setGifs(res.data);
          setCurrentPage(currentPage + 1);
          setTotalCount(res.pagination.total_count);
          setIsLoading(false);
        });
    },
    []
  );

  return (
    <div className={classes.gifGridContainer}>
      <TextInput
        ref={setFirstItemRef}
        value={search}
        onChange={setSearch}
        label={t('gif-search.text')}
      />
      <ul role="listbox" className={classes.gifGrid} ref={setGifGrid}>
        {gifs.map((gif, index) => {
          const setReference = gifs.length - 1 === index ? setLastItemRef : null;
          const addRef = gifs.length - 4 === index && search !== '' && gifs.length !== totalCount;
          return (
            <li className={classes.gifItem}>
              <button
                role="option"
                aria-selected={false}
                ref={setReference}
                onClick={() => {
                  onGifSelect({
                    webp: gif.images.original.webp,
                    mp4: gif.images.original.mp4,
                    originalWidth: gif.images.original.width,
                    originalHeight: gif.images.original.height,
                    alt: gif.title,
                  });
                }}
                className={classes.gifButton}
              >
                {!!gif.images.fixed_width.webp ? (
                  <img
                    data-testid="gif-img-select"
                    key={gif.id}
                    ref={addRef ? setObservedGif : null}
                    className={classes.gif}
                    src={gif.images.fixed_width.webp}
                    alt={gif.title}
                  />
                ) : (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    data-testid="gif-vid-select"
                    key={gif.id}
                    ref={addRef ? setObservedGif : null}
                    className={classes.gif}
                    autoPlay
                    loop
                    src={gif.images.fixed_width.mp4}
                    title={gif.title}
                  />
                )}
              </button>
            </li>
          );
        })}
        {isLoading && (
          <div className={classes.loaderContainer}>
            <div className={classes.loading} />
          </div>
        )}
      </ul>
    </div>
  );
};
