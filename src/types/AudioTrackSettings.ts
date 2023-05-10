import {StreamInformation} from 'ffmpeg-kit-react-native';

class AudioTrackChanged {
  codec: string;
  bitrate: number;

  constructor(stream: StreamInformation) {
    this.codec = stream.getCodec();
    this.bitrate = Number(stream.getBitrate());
  }
}

class AudioTrack extends AudioTrackChanged {
  index: number;
  title: string;
  language: string;
  layout: string; //mono,stereo,...

  constructor(stream: StreamInformation) {
    super(stream);
    this.index = stream.getIndex();
    this.layout = stream.getChannelLayout();
    const tags = stream.getTags();
    this.language = tags.language;
    this.title = tags.title;
  }
}

export default class AudioTrackSettings {
  params: AudioTrack;
  changedParams: AudioTrackChanged;
  selected: boolean;

  static codecs = {
    ac3: '',
    aac: 'Advanced Audio Codec',
    aiff: 'uncompressed CD-quality used by Apple',
    flac: 'Free Lossless Audio Codec',
    m4a: 'MPEG4 for iTunes Music',
    m4b: 'Audiobook/podcast used by Apple',
    mp3: '',
    ogg: 'Vorbis audio',
    ra: 'Real Audio',
    wav: 'Windows audio',
  };

  constructor(stream: StreamInformation) {
    this.changedParams = new AudioTrackChanged(stream);
    this.params = new AudioTrack(stream);
    this.selected = true;
  }
}
