import {MediaInformation, StreamInformation} from 'ffmpeg-kit-react-native';
import {getUrlExtension} from '../utils/UrlUtils';

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
  constructor(stream: StreamInformation) {
    super(stream);
  }
}

export class VideoTrackSettings {
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
    h264: '',
    h265: '',
    mpeg4: '',
    mpeg2: '',
  };

  constructor(stream: StreamInformation) {
    this.changedParams = new VideoTrackChanged(stream);
    this.params = new VideoTrack(stream);
    this.selected = true;
  }
}

class AudioTrackChanged {
  codec: string;
  bitrate: number;

  constructor(stream: StreamInformation) {
    this.codec = stream.getCodec();
    this.bitrate = Number(stream.getBitrate());
  }
}

class AudioTrack extends AudioTrackChanged {
  title: string;
  language: string;
  layout: string; //mono,stereo,...

  constructor(stream: StreamInformation) {
    super(stream);
    this.layout = stream.getChannelLayout();
    const tags = stream.getTags();
    this.language = tags.language;
    this.title = tags.title;
  }
}

export class AudioTrackSettings {
  params: AudioTrack;
  changedParams: AudioTrackChanged;
  selected: boolean;

  static codecs = {
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

class SubtitleChanged {
  codec: string;

  constructor(stream: StreamInformation) {
    this.codec = stream.getCodec();
  }
}

class Subtitle extends SubtitleChanged {
  title: string;
  language: string;

  constructor(stream: StreamInformation) {
    super(stream);
    const tags = stream.getTags();
    this.language = tags.language;
    this.title = tags.title;
  }
}

export class SubtitleSettings {
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
    this.changedParams = new AudioTrackChanged(stream);
    this.params = new AudioTrack(stream);
    this.selected = true;
  }
}

type CutTime = {
  start: number | undefined;
  finish: number | undefined;
};

class BaseInfoChanged {
  extension: string;
  cut: CutTime;

  constructor(uri: string) {
    this.extension = getUrlExtension(uri);
    this.cut = {
      start: undefined,
      finish: undefined,
    };
  }
}

class BaseInfo extends BaseInfoChanged {
  format: string;
  duration: number;

  constructor(uri: string, information: MediaInformation) {
    super(uri);
    this.format = information.getFormat();
    this.duration = information.getDuration();
  }
}

export class BaseInfoSettings {
  params: BaseInfo;
  changedParams: BaseInfoChanged;

  static extensions = {
    mkv: 'Matroska',
    mp4: 'MPEG-4',
    avi: '',
    webm: 'WebM',
    flv: 'Flash Video',
    vob: '',
    ogg: 'ogg Video',
    mov: 'QuickTime movie',
    rm: 'Real Media',
    mpg: 'MPEG-2',
    '3gp': 'for cell phones',
    mpeg: '',
    wmf: 'Windows Media Video',
  };


  constructor(uri: string, information: MediaInformation) {
    this.changedParams = new BaseInfoChanged(uri);
    this.params = new BaseInfo(uri, information);
  }
}

export class MediaSettings {
  baseSettings: BaseInfoSettings;
  videoTracksSettings: VideoTrackSettings[];
  audioTracksSettings: AudioTrackSettings[];
  subtitlesSettings: SubtitleSettings[];

  constructor(uri: string, information: MediaInformation) {
    this.baseSettings = new BaseInfoSettings(uri, information);
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
