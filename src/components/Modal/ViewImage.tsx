import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius={5}
        mx="auto"
        w="auto"
        h="auto"
        maxWidth={['300px', '500px', '900px']}
        maxHeight={['350px', '450px', '600px']}
      >
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={0}
          bg="pGray.900"
        >
          <Image
            src={imgUrl}
            maxWidth={['300px', '500px', '900px']}
            maxHeight={['350px', '450px', '600px']}
          />
        </ModalBody>

        <ModalFooter bg="pGray.900" padding={3}>
          <Link
            as="a"
            href={imgUrl}
            target="_blank"
            colorScheme="pink"
            mr="auto"
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
