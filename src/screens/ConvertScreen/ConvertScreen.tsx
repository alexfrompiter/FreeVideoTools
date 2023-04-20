import {VStack, ScrollView, Box, Text} from 'native-base';
import React, {useState} from 'react';

import ChooseFile from './ChooseFile';
import {VideoPlayer} from '../../components/VideoPlayer/VideoPlayer';

export type Props = {};

const ConvertScreen: React.FC<Props> = () => {
  const [uri, setUri] = useState<string>('');

  return (
    <VStack mx={2} borderColor="red.400" borderWidth={2} flex={1}>
      <ChooseFile uri={uri} setUri={setUri} />
      <Box flex={2}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            borderColor: 'green',
            borderWidth: 5,
          }}>
          <VideoPlayer
            h={'300px'}
            minH={8}
            uri={uri}
            onVideoInfo={videoInfo => console.log(videoInfo)}
            onError={e => console.log('error: ', e)}
          />
        </ScrollView>
      </Box>
      <Text>finish</Text>
    </VStack>
  );
};

export default ConvertScreen;
