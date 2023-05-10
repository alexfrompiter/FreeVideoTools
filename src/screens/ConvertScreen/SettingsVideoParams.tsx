import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {HStack, Select, Text, VStack} from 'native-base';
import VideoTrackSettings from '../../types/VideoTrackSettings';
import ExpandSection from '../../components/ExpandSection';
import {customStr, getLabel, selectedFirstList} from '../../utils/CommonUtils';
import SetSizeDialog from './SetSizeDialog';
import ChangedText from './ChangedText';

export type Props = {
  videoSettings: VideoTrackSettings;
  isSingle: boolean;
};

const SettingsVideoParams: React.FC<Props> = ({videoSettings}) => {
  const changedParams = videoSettings.changedParams;
  const params = videoSettings.params;

  const [codec, setCodec] = useState(changedParams.codec);

  const codecList = useMemo(() => {
    const list = selectedFirstList(
      params.codec,
      Object.keys(VideoTrackSettings.codecs),
    );
    console.log('video codecs:', list);
    return list;
  }, [params.codec]);

  useEffect(() => {
    changedParams.codec = codec;
  }, [changedParams, codec]);

  const [size, setSize] = useState(changedParams.size);

  const sizeList = useMemo(() => {
    let last: string | string[] = customStr;
    if (!(size in VideoTrackSettings.sizes)) {
      last = [size, customStr];
    }
    return selectedFirstList(
      params.size,
      Object.keys(VideoTrackSettings.sizes),
      last,
    );
  }, [params.size, size]);

  useEffect(() => {
    changedParams.size = size;
  }, [changedParams, size]);

  const [openSizeDialog, setOpenSizeDialog] = useState<boolean>(false);

  const onChangeSize = (val: string) => {
    if (val === customStr) {
      setOpenSizeDialog(true);
    } else {
      setSize(val);
    }
  };

  const renderVideoTitle = useCallback(() => {
    return (
      <React.Fragment>
        <Text>Video :</Text>
        <ChangedText value={params.codec} changedValue={codec} />
        <ChangedText value={params.size} changedValue={size} />
      </React.Fragment>
    );
  }, [params.codec, codec, params.size, size]);

  return (
    <>
      <ExpandSection title={renderVideoTitle} isOpened={false}>
        <VStack space="2" mx="2">
          <HStack alignItems="center">
            <Text mr={3}>Codec:</Text>
            <Select selectedValue={codec} flex={1} onValueChange={setCodec}>
              {codecList.map(key => {
                return (
                  <Select.Item
                    key={key}
                    label={getLabel(key, VideoTrackSettings.codecs)}
                    value={key}
                  />
                );
              })}
            </Select>
          </HStack>
          <HStack alignItems="center">
            <Text mr={3}>Size:</Text>
            <Select selectedValue={size} flex={1} onValueChange={onChangeSize}>
              {sizeList.map(key => {
                return (
                  <Select.Item
                    key={key}
                    label={getLabel(key, VideoTrackSettings.sizes)}
                    value={key}
                  />
                );
              })}
            </Select>
          </HStack>
        </VStack>
      </ExpandSection>
      <SetSizeDialog
        openingTuple={[openSizeDialog, setOpenSizeDialog]}
        sizeTuple={[size, setSize]}
      />
    </>
  );
};

export default SettingsVideoParams;
