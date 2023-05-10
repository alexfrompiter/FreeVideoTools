import {StreamInformation} from 'ffmpeg-kit-react-native';

class VideoTrackChanged {
  size: string;
  codec: string;
  aspectRatio: string;
  frameRate: string;

  constructor(stream: StreamInformation) {
    this.codec = stream.getCodec();
    this.size = `${stream.getWidth()}*${stream.getHeight()}`;
    this.aspectRatio = stream.getDisplayAspectRatio();
    this.frameRate = stream.getAverageFrameRate();
  }
}

class VideoTrack extends VideoTrackChanged {
  index: number;

  constructor(stream: StreamInformation,) {
    super(stream);
    this.index = stream.getIndex();
  }
}

export default class VideoTrackSettings {
  params: VideoTrack;
  changedParams: VideoTrackChanged;
  selected: boolean;

  static sizes = {
    '3840*2160': '4K',
    '1920*1080': 'HD 1080',
    '1280*720': 'HD 720',
    '854*480': '480p',
    '640*360': '360p',
    '426*240': '240p',
  };

  static codecs = {
    h264: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
    hevc: 'H.265 / HEVC (High Efficiency Video Coding)',
    vp9: 'Google VP9',
    av1: 'Alliance for Open Media AV1',
  };

  constructor(stream: StreamInformation) {
    this.changedParams = new VideoTrackChanged(stream);
    this.params = new VideoTrack(stream);
    this.selected = true;
  }
}
