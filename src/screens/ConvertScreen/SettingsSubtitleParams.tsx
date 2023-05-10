import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {HStack, Select, Text, VStack} from 'native-base';
import SubtitleSettings from '../../types/SubtitleSettings';
import {getLabel, selectedFirstList} from '../../utils/CommonUtils';
import ChangedText from './ChangedText';
import ExpandSection from '../../components/ExpandSection';

export type Props = {
  subtitleSettings: SubtitleSettings;
  isSingle: boolean;
};

const SettingsSubtitleParams: React.FC<Props> = ({
  subtitleSettings,
  isSingle,
}) => {
  const changedParams = subtitleSettings.changedParams;
  const params = subtitleSettings.params;

  const [codec, setCodec] = useState(changedParams.codec);

  const codecList = useMemo(() => {
    return selectedFirstList(
      params.codec,
      Object.keys(SubtitleSettings.codecs),
    );
  }, [params.codec]);

  useEffect(() => {
    changedParams.codec = codec;
  }, [changedParams, codec]);

  const renderSubtitleTitle = useCallback(() => {
    let title = !isSingle && params.title ? params.title : 'Subtitle';
    if (params.language) {
      title += ` (${params.language})`;
    }
    title += ':';
    return (
      <React.Fragment>
        <Text>{title}</Text>
        <ChangedText value={params.codec} changedValue={codec} />
      </React.Fragment>
    );
  }, [isSingle, params.title, params.language, params.codec, codec]);

  return (
    <ExpandSection title={renderSubtitleTitle} isOpened={false}>
      <VStack space="2" mx="2">
        <HStack alignItems="center">
          <Text mr={3}>Codec:</Text>
          <Select selectedValue={codec} flex={1} onValueChange={setCodec}>
            {codecList.map(key => {
              return (
                <Select.Item
                  key={key}
                  label={getLabel(key, SubtitleSettings.codecs)}
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

export default SettingsSubtitleParams;
