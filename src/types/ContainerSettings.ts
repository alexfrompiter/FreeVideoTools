import {MediaInformation} from 'ffmpeg-kit-react-native';
import {getUrlExtension} from '../utils/UrlUtils';

class ContainerChanged {
  extension: string;

  constructor(uri: string) {
    this.extension = getUrlExtension(uri);
  }
}

class Container extends ContainerChanged {
  format: string;

  constructor(uri: string, information: MediaInformation) {
    super(uri);
    this.format = information.getFormat();
  }
}

export class ContainerSettings {
  params: Container;
  changedParams: ContainerChanged;

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
    this.changedParams = new ContainerChanged(uri);
    this.params = new Container(uri, information);
  }
}
