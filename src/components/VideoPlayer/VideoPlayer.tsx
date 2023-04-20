import React, {useEffect, useMemo, useState} from 'react';
import {VStack, IStackProps} from 'native-base';
import {Platform} from 'react-native';
import {VLCPlayer, VideoInfo} from 'react-native-vlc-media-player';
import {MediaControl} from './MediaControl';

export type Props = IStackProps & {
  uri: string;
  onVideoInfo?: (info: VideoInfo) => void;
  onError?: (err: any) => void;
};

export const VideoPlayer: React.FC<Props> = ({
  uri,
  onVideoInfo,
  onError,
  ...rest
}) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [seekPosition, setSeekPosition] = useState<number>(0);

  const [videoInfo, setVideoInfo] = useState<VideoInfo | undefined>(undefined);
  const [audioTrack, setAudioTrack] = useState<number>(1);
  const [textTrack, setTextTrack] = useState<number>(0);

  useEffect(() => {
    console.log('new uri:', uri);
    setPaused(uri ? false : true);
    setCurrentTime(0);
    setSeekPosition(0);
    setVideoInfo(undefined);
    setAudioTrack(1);
    setTextTrack(0);
  }, [uri]);

  const duration = useMemo(
    () => (videoInfo ? videoInfo.duration : 0),
    [videoInfo],
  );

  const platformSeekPosition = useMemo( () => {
    if (duration) {
      if (Platform.OS === 'ios') {
        return seekPosition / duration; //vlc ios: seek position from 0 to 1
      } else {
        return seekPosition / 1000; //vlc android:  seek position in seconds
      }
    }
    return 0;
  }, [duration, seekPosition]);

  useEffect(() => setCurrentTime(seekPosition), [seekPosition]);


  return (
    <VStack {...rest}>
      <VLCPlayer
        style={{flex: 1}}
        source={{
          uri: uri,
        }}
        seek={platformSeekPosition}
        paused={paused}
        autoAspectRatio={true}
        audioTrack={audioTrack}
        textTrack={textTrack}
        onPlaying={(playInfo: any) => {
          console.log('onPlaying:', playInfo);
        }}
        onProgress={(progressInfo: any) => {
          //change slider no more than once per second
          setCurrentTime(Math.floor(progressInfo.currentTime / 1000) * 1000);
        }}
        onBuffering={(e: any) => console.log('onBuffering:', e)}
        onPaused={(e: any) => console.log('onPaused:', e)}
        onStopped={(e: any) => console.log('onStopped:', e)}
        onLoad={(info: VideoInfo) => {
          console.log('onLoad: ', info);
          setVideoInfo(info);
          onVideoInfo && onVideoInfo(info);
        }}
        onError={e => {
          console.log('onError: ', e);
          onError && onError(e);
        }}
      />
      <MediaControl
        videoInfo={videoInfo}
        position={currentTime}
        pausedTuple={[paused, setPaused]}
        onChangePosition={position => {
          setSeekPosition(position);
        }}
        audioTrack={audioTrack}
        setAudioTrack={setAudioTrack}
        textTrack={textTrack}
        setTextTrack={setTextTrack}
      />
    </VStack>
  );
};
