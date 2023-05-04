import {HStack, IInputProps, Input, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import BaseDialog from '../../components/BaseDialog';

export type Props = IInputProps & {
  openingTuple: [boolean, (isOpen: boolean) => void];
  sizeTuple: [string, (newSize: string) => void];
};

const SetSizeDialog: React.FC<Props> = ({openingTuple, sizeTuple}) => {
  const initialRef = React.useRef(null);

  const [width, setWidth] = useState(sizeTuple[0].split('*')[0]);
  const [height, setHeight] = useState(sizeTuple[0].split('*')[1]);

  return (
    <BaseDialog
      openingTuple={openingTuple}
      title="Set video size"
      initialFocusRef={initialRef}
      buttons={[
        {
          title: 'Cancel',
          variant: 'ghost',
          colorScheme: 'blueGray',
        },
        {
          title: 'Save',
          action: () => sizeTuple[1](`${width}*${height}`),
        },
      ]}>
      <VStack space="2" m="3">
        <HStack alignItems="center" space="4">
          <Text>Width: </Text>
          <Input
            ref={initialRef}
            value={width}
            onChangeText={setWidth}
            flex="1"
          />
        </HStack>
        <HStack alignItems="center" space="4">
          <Text>Height: </Text>
          <Input value={height} onChangeText={setHeight} flex="1" />
        </HStack>
      </VStack>
    </BaseDialog>
  );
};

export default SetSizeDialog;
