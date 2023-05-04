import {Text, HStack, Button, Icon} from 'native-base';
import React, {useState} from 'react';

import {MediaSettings} from '../../types/MediaSettings';
import SettingsMediaParams from './SettingsMediaParams';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  mediaSettings: MediaSettings;
};
const ConvertOperation: React.FC<Props> = ({mediaSettings}) => {
  const [isConvert, setIsConvert] = useState<boolean>(true);

  return (
    <>
      <HStack alignItems="center" my={2}>
        <Button
          flex={1}
          bgColor={isConvert ? 'primary.600' : 'primary.200'}
          onPress={() => setIsConvert(true)}>
          <HStack justifyContent="center" space={2}>
            <Icon
              as={Ionicons}
              name={isConvert ? 'checkmark-circle-outline' : 'ellipse-outline'}
              size={6}
              ml={1}
              color="primary.200"
            />

            <Text>Convert</Text>
          </HStack>
        </Button>
        <Button
          flex={1}
          bgColor={isConvert ? 'primary.200' : 'primary.600'}
          onPress={() => setIsConvert(false)}>
          <HStack justifyContent="center" space={2}>
            <Icon
              as={Ionicons}
              name={isConvert ? 'ellipse-outline' : 'checkmark-circle-outline'}
              size={6}
              color="primary.200"
              ml={1}
            />

            <Text>Separate</Text>
          </HStack>
        </Button>
      </HStack>
      <SettingsMediaParams
        isConvert={isConvert}
        mediaSettings={mediaSettings}
      />
    </>
  );
};

export default ConvertOperation;
