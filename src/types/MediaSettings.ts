import {MediaInformation} from 'ffmpeg-kit-react-native';
import VideoTrackSettings from './VideoTrackSettings';
import AudioTrackSettings from './AudioTrackSettings';
import SubtitleSettings from './SubtitleSettings';
import {ContainerSettings} from './ContainerSettings';

type CutTime = {
  start: number | undefined;
  finish: number | undefined;
};

export class MediaSettings {
  cut: CutTime = {start: undefined, finish: undefined};
  duration: number;
  containerSettings: ContainerSettings;
  videoTracksSettings: VideoTrackSettings[];
  audioTracksSettings: AudioTrackSettings[];
  subtitlesSettings: SubtitleSettings[];

  constructor(uri: string, information: MediaInformation) {
    this.duration = information.getDuration();
    this.containerSettings = new ContainerSettings(uri, information);
    this.videoTracksSettings = [];
    this.audioTracksSettings = [];
    this.subtitlesSettings = [];

    let streams = information.getStreams();
    if (streams) {
      for (const stream of streams) {
        const type = stream.getType();
        if (type === 'video') {
          this.videoTracksSettings.push(new VideoTrackSettings(stream));
        } else if (type === 'audio') {
          this.audioTracksSettings.push(new AudioTrackSettings(stream));
        } else if (type === 'subtitle') {
          this.subtitlesSettings.push(new SubtitleSettings(stream));
        }
      }
    }
  }
}
