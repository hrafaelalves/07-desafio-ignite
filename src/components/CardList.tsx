import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImageUrl, setSelecteImageUrl] = useState('');

  function handleViewImage(url: string): void {
    setSelecteImageUrl(url);
    onOpen();
  }

  return (
    <>
      {cards && (
        <SimpleGrid columns={3} minChildWidth="250px" spacing="40px">
          {cards.map((item: Card) => {
            return (
              <Card
                key={item.id}
                data={item}
                viewImage={() => handleViewImage(item.url)}
              />
            );
          })}
        </SimpleGrid>
      )}

      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
