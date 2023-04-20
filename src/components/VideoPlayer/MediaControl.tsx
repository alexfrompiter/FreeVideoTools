import React, {useEffect, useMemo, useState} from 'react';
import {TrackInfo, VideoInfo} from 'react-native-vlc-media-player';
import {formatTime} from '../../utils/TimeUtils';
import {
  HStack,
  Text,
  IconButton,
  Slider,
  Icon,
  Select,
  VStack,
  CheckIcon,
  ChevronDownIcon,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type Props = {
  videoInfo?: VideoInfo;
  position: number;
  pausedTuple: [boolean, (paused: boolean) => void];
  onChangePosition: (position: number) => void;
  audioTrack: number;
  setAudioTrack: (track: number) => void;
  textTrack: number;
  setTextTrack: (track: number) => void;
};

export const MediaControl: React.FC<Props> = ({
  videoInfo,
  position,
  pausedTuple,
  onChangePosition,
  audioTrack,
  setAudioTrack,
  textTrack,
  setTextTrack,
}) => {
  const [paused, setPaused] = pausedTuple;
  const [changingSlider, setChangingSlider] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const duration = useMemo(
    () => (videoInfo ? videoInfo.duration : 0),
    [videoInfo],
  );

  const audioTracks: TrackInfo[] = useMemo(
    () => videoInfo?.audioTracks ?? [],
    [videoInfo],
  );

  const textTracks: TrackInfo[] = useMemo(
    () => videoInfo?.textTracks ?? [],
    [videoInfo],
  );

  useEffect(() => {
    if (!changingSlider && duration > 0) {
      setSliderValue(position);
    }
  }, [duration, position, changingSlider]);

  return (
    <VStack>
      <HStack alignItems="center">
        <IconButton size={6}
          _icon={{
            as: Ionicons,
            name: paused ? 'play-outline' : 'pause-outline',
          }}
          onPress={() => {
            setPaused(!paused);
          }}
        />
        <Text>{formatTime(sliderValue)}</Text>
        <Slider
          mx={2}
          flex={1}
          minValue={0}
          maxValue={duration}
          value={sliderValue}
          _disabled={duration === 0}
          onChangeEnd={value => {
            setChangingSlider(false);
            onChangePosition(value);
          }}
          onChange={value => {
            if (!changingSlider) {
              setChangingSlider(true);
            }
            setSliderValue(value);
            onChangePosition(value);
          }}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text>{formatTime(duration)}</Text>
      </HStack>
      <HStack alignItems="center" >
        {audioTracks.length > 1 && (
          <>
            <Icon as={Ionicons} name="musical-notes" size={4} />
            <Select
              flex={1}
              dropdownCloseIcon={<ChevronDownIcon size={3}/>}
              defaultValue={'' + audioTracks[1].id}
              onValueChange={value => setAudioTrack(Number(value))}>
              {audioTracks.map(track => (
                <Select.Item
                  key={track.id}
                  label={track.name}
                  value={'' + track.id}
                />
              ))}
            </Select>
          </>
        )}
        {textTracks.length > 0 && (
          <>
            <Icon as={Ionicons} name="text" size={4} ml={1}/>
            <Select
              flex={1}
              dropdownCloseIcon={<ChevronDownIcon size={3} />}
              onValueChange={value => setTextTrack(Number(value))}
              defaultValue={'' + textTracks[0].id}>
              {textTracks.map(track => (
                <Select.Item
                  key={track.id}
                  label={track.name}
                  value={'' + track.id}
                />
              ))}
            </Select>
          </>
        )}
      </HStack>
    </VStack>
  );
};
