import { useEffect, useMemo, useState } from 'react';
import classes from './gif-search.component.module.scss';
import { IGif } from '@giphy/js-types';

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
}: {
  sdk: string;
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
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [observedGif, setObservedGif] = useState<HTMLVideoElement | HTMLImageElement | null>(null);
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search === '') {
      setCurrentPage(0);
      setIsLoading(true);
      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${sdk}&limit=25&rating=g`)
        .then((res) => res.json())
        .then((res: GifsResult) => {
          setGifs(res.data);
          setIsLoading(false);
        });
      return;
    }
    fetchMore(0, search);
  }, [search]);

  useEffect(() => {
    if (observedGif === null) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore(currentPage, search);
        }
      },
      { threshold: 1 },
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
        }&rating=g&lang=en`,
      )
        .then((res) => res.json())
        .then((res: GifsResult) => {
          setGifs(res.data);
          setCurrentPage(currentPage + 1);
          setTotalCount(res.pagination.total_count);
          setIsLoading(false);
        });
    },
    [],
  );

  return (
    <div className={classes.gifGridContainer}>
      <input type="text" className={classes.gifSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className={classes.gifGrid}>
        {gifs.map((gif, index) => {
          const addRef = gifs.length - 4 === index && search !== '' && gifs.length !== totalCount;
          if (gif.images.fixed_width.webp) {
            return (
              <img
                key={gif.id}
                ref={addRef ? setObservedGif : null}
                className={classes.gif}
                src={gif.images.fixed_width.webp}
                alt={gif.title}
                onClick={() => {
                  onGifSelect({
                    webp: gif.images.original.webp,
                    mp4: gif.images.original.mp4,
                    originalWidth: gif.images.original.width,
                    originalHeight: gif.images.original.height,
                    alt: gif.title,
                  });
                }}
              />
            );
          }
          return (
            <video
              key={gif.id}
              ref={addRef ? setObservedGif : null}
              className={classes.gif}
              autoPlay
              loop
              src={gif.images.fixed_width.mp4}
            />
          );
        })}
        {isLoading && (
          <div className={classes.loaderContainer}>
            <div className={classes.loading} />
          </div>
        )}
      </div>
    </div>
  );
};
