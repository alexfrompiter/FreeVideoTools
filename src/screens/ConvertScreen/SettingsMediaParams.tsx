import React from 'react';
import {Box, Text, VStack} from 'native-base';
import {MediaSettings} from '../../types/MediaSettings';
import SettingsBaseParams from './SettingsBaseParams';

import SettingsVideoParams from './SettingsVideoParams';
import SettingsSubtitleParams from './SettingsSubtitleParams';
import SettingsAudioParams from './SettingsAudioParams';

export type Props = {
  isConvert: boolean;
  mediaSettings: MediaSettings;
};

const SettingsMediaParams: React.FC<Props> = ({isConvert, mediaSettings}) => {
  return (
    <VStack space="2">
      {isConvert && (
        <SettingsBaseParams baseSettings={mediaSettings.baseSettings} />
      )}
      {isConvert &&
        mediaSettings.videoTracksSettings.map(videoSettings => {
          return (
            <SettingsVideoParams
              videoSettings={videoSettings}
              isSingle={mediaSettings.videoTracksSettings.length === 1}
            />
          );
        })}
      {mediaSettings.audioTracksSettings.length > 1 && (
        <Box m="4">
          <Text bold>Audio tracks:</Text>
        </Box>
      )}
      {mediaSettings.audioTracksSettings.map(audioSettings => {
        return (
          <SettingsAudioParams
            audioSettings={audioSettings}
            isSingle={mediaSettings.audioTracksSettings.length === 1}
          />
        );
      })}
      {mediaSettings.subtitlesSettings.length > 1 && (
        <Box m="4">
          <Text bold>Subtitles:</Text>
        </Box>
      )}
      {mediaSettings.subtitlesSettings.map(subtitleSettings => {
        return (
          <SettingsSubtitleParams
            subtitleSettings={subtitleSettings}
            isSingle={mediaSettings.subtitlesSettings.length === 1}
          />
        );
      })}
    </VStack>
  );
};

export default SettingsMediaParams;
