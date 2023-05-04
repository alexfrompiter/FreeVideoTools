import {VStack, ScrollView, Box, Text} from 'native-base';
import React, {useEffect, useState} from 'react';

import ChooseFile from './ChooseFile';
import {VideoPlayer} from '../../components/VideoPlayer/VideoPlayer';
import ExpandSection from '../../components/ExpandSection';
import {getMediaInfo} from '../../utils/FfmpegUtils';
import {MediaSettings} from '../../types/MediaSettings';
import ConvertOperation from './ConvertOperation';

type MediaInfoState = 'absent' | 'loading' | 'error' | 'loaded';

type Props = {};
const ConvertScreen: React.FC<Props> = () => {
  const [uri, setUri] = useState<string>('');
  const [mediaSettings, setMediaSettings] = useState<MediaSettings | undefined>(
    undefined,
  );
  const [mediaState, setMediaState] = useState<MediaInfoState>('absent');

  useEffect(() => {
    setMediaSettings(undefined);
    if (!uri) {
      setMediaState('absent');
    } else {
      setMediaState('loading');
      getMediaInfo(uri).then(info => {
        if (!info) {
          setMediaState('error');
        } else {
          setMediaState('loaded');
          setMediaSettings(new MediaSettings(uri, info));
        }
      });
    }
  }, [uri]);

  return (
    <VStack mx={2} flex={1}>
      <ChooseFile uri={uri} setUri={setUri} />
      {
        {
          absent: <Text>Please choose a file</Text>,
          loading: <Text>Loading media info</Text>,
          error: <Text>Can't loaded media info</Text>,
          loaded: <></>,
        }[mediaState]
      }
      {mediaSettings && (
        <Box flex={2}>
          <ScrollView horizontal={false}>
            <ExpandSection title="Player" isOpened={false}>
              <VideoPlayer
                h={'300px'}
                minH={8}
                uri={uri}
                onVideoInfo={videoInfo => console.log(videoInfo)}
                onError={e => console.log('error: ', e)}
              />
            </ExpandSection>
            <ConvertOperation mediaSettings={mediaSettings} />
          </ScrollView>
        </Box>
      )}

    </VStack>
  );
};

export default ConvertScreen;
