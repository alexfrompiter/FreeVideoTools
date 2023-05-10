import { StreamInformation } from "ffmpeg-kit-react-native";

class SubtitleChanged {
  codec: string;

  constructor(stream: StreamInformation) {
    this.codec = stream.getCodec();
  }
}

class Subtitle extends SubtitleChanged {
  index: number;
  title: string;
  language: string;

  constructor(stream: StreamInformation) {
    super(stream);
    this.index = stream.getIndex();
    const tags = stream.getTags();
    this.language = tags.language;
    this.title = tags.title;
  }
}

export default class SubtitleSettings {
  params: Subtitle;
  changedParams: SubtitleChanged;
  selected: boolean;

  static codecs = {
    srt: 'SubRipper',
    vtt: 'WebVTT',
    sub: 'MicroDVD',
    ssa: 'Sub Station Alpha',
    sami: '',
  };

  constructor(stream: StreamInformation) {
    this.changedParams = new SubtitleChanged(stream);
    this.params = new Subtitle(stream);
    this.selected = true;
  }
}
