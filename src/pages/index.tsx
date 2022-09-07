import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosPromise } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface FetchImagesData {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type Image = {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
};

interface ImageResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<ImageResponse> {
    const { data } = await api.get(`/api/images`, {
      params: { after: pageParam },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['images'], fetchImages, {
    getNextPageParam: (lastPage, page) => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const newData = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });

    return newData;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={[10, 20]} mx="auto" my={[10, 20]}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            mt={4}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
