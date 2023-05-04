import {HStack, IconButton, Text, VStack} from 'native-base';
import React, {PropsWithChildren, ReactNode, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type Props = {
  title: string | (() => ReactNode);
  isOpened?: boolean;
};

const ExpandSection: React.FC<PropsWithChildren<Props>> = ({
  title,
  isOpened: opened = true,
  children,
}) => {
  const [isOpened, setIsOpened] = useState(opened);
  return (
    <VStack space={2} borderWidth="2" borderRadius="md">
      <HStack space={2} alignItems="center">
        <IconButton
          _icon={{
            as: Ionicons,
            name: isOpened ? 'caret-down-outline' : 'caret-forward-outline',
          }}
          onPress={() => setIsOpened(!isOpened)}
        />
        {typeof title === 'string' ? <Text>{title}</Text> : title()}
      </HStack>
      {isOpened && children}
    </VStack>
  );
};

export default ExpandSection;
