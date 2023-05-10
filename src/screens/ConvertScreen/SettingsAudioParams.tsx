import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {HStack, Select, Text, VStack} from 'native-base';
import AudioTrackSettings from '../../types/AudioTrackSettings';
import {getLabel, selectedFirstList} from '../../utils/CommonUtils';
import ChangedText from './ChangedText';
import ExpandSection from '../../components/ExpandSection';

export type Props = {
  audioSettings: AudioTrackSettings;
  isSingle: boolean;
};

const SettingsAudioParams: React.FC<Props> = ({audioSettings, isSingle}) => {
  const changedParams = audioSettings.changedParams;
  const params = audioSettings.params;

  const [codec, setCodec] = useState(changedParams.codec);

  const codecList = useMemo(() => {
    return selectedFirstList(
      params.codec,
      Object.keys(AudioTrackSettings.codecs),
    );
  }, [params.codec]);

  useEffect(() => {
    changedParams.codec = codec;
  }, [changedParams, codec]);

  const renderAudioTitle = useCallback(() => {
    let title = !isSingle && params.title ? params.title : 'Audio';
    if (params.language) {
      title += ` (${params.language})`;
    }
    title += ':';

    return (
      <React.Fragment>
        <Text>{title}</Text>
        <></>
        <ChangedText value={params.codec} changedValue={codec} />
      </React.Fragment>
    );
  }, [isSingle, params.title, params.language, params.codec, codec]);

  return (
    <ExpandSection title={renderAudioTitle} isOpened={false}>
      <VStack space="2" mx="2">
        <HStack alignItems="center">
          <Text mr={3}>Codec:</Text>
          <Select selectedValue={codec} flex={1} onValueChange={setCodec}>
            {codecList.map(key => {
              return (
                <Select.Item
                  key={key}
                  label={getLabel(key, AudioTrackSettings.codecs)}
                  value={key}
                />
              );
            })}
          </Select>
        </HStack>
      </VStack>
    </ExpandSection>
  );
};

export default SettingsAudioParams;
