import {
  FFmpegKitConfig,
  FFprobeKit,
  MediaInformation,
  MediaInformationSession,
} from 'ffmpeg-kit-react-native';

export async function getMediaInfo(
  uri: string,
): Promise<MediaInformation | undefined> {
  try {
    const decodeUri = decodeURI(uri);
    const session = await FFprobeKit.getMediaInformation(decodeUri);
    const information = await session.getMediaInformation();
    if (information === undefined) {
      printFailedDescription(session);
    } else {
      printMediaInfo(information);
    }
    return information;
  } catch (e) {
    console.log('getMediaInfo - catch: ', e);
    return undefined;
  }
}

async function printFailedDescription(session: MediaInformationSession) {
  const state = FFmpegKitConfig.sessionStateToString(await session.getState());
  const returnCode = await session.getReturnCode();
  const failStackTrace = await session.getFailStackTrace();
  const duration = await session.getDuration();
  const output = await session.getOutput();

  console.log('Get media information failed');
  console.log(`\tState: ${state}`);
  console.log(`\tDuration: ${duration}`);
  console.log(`\tReturn Code: ${returnCode}`);
  console.log(`\tFail stack trace: ${failStackTrace}`);
  console.log(`\tOutput: ${output}`);
}

function printMediaInfo(information: MediaInformation) {
  console.log(`Media information for ${information.getFilename()}`);

  if (information.getFormat() !== undefined) {
    console.log(`\tFormat: ${information.getFormat()}`);
  }
  if (information.getBitrate() !== undefined) {
    console.log(`\tBitrate: ${information.getBitrate()}`);
  }
  if (information.getDuration() !== undefined) {
    console.log(`\tDuration: ${information.getDuration()}`);
  }
  if (information.getStartTime() !== undefined) {
    console.log(`\tStart time: ${information.getStartTime()}`);
  }
  if (information.getTags() !== undefined) {
    let tags = information.getTags();
    Object.keys(tags).forEach(key => {
      console.log(`\tTag: ${key}:${tags[key]}`);
    });
  }

  let streams = information.getStreams();
  if (streams !== undefined) {
    for (let i = 0; i < streams.length; ++i) {
      let stream = streams[i];
      if (stream.getIndex() != null) {
        console.log(`Stream index: ${stream.getIndex()}`);
      }
      if (stream.getType() != null) {
        console.log(`\tStream type: ${stream.getType()}`);
      }
      if (stream.getCodec() != null) {
        console.log(`\tStream codec: ${stream.getCodec()}`);
      }
      if (stream.getCodecLong() != null) {
        console.log(`\tStream codec long: ${stream.getCodecLong()}`);
      }
      if (stream.getFormat() != null) {
        console.log(`\tStream format: ${stream.getFormat()}`);
      }
      if (stream.getWidth() != null) {
        console.log(`\tStream width: ${stream.getWidth()}`);
      }
      if (stream.getHeight() != null) {
        console.log(`\tStream height: ${stream.getHeight()}`);
      }
      if (stream.getBitrate() != null) {
        console.log(`\tStream bitrate: ${stream.getBitrate()}`);
      }
      if (stream.getSampleRate() != null) {
        console.log(`\tStream sample rate: ${stream.getSampleRate()}`);
      }
      if (stream.getSampleFormat() != null) {
        console.log(`\tStream sample format: ${stream.getSampleFormat()}`);
      }
      if (stream.getChannelLayout() != null) {
        console.log(`\tStream channel layout: ${stream.getChannelLayout()}`);
      }
      if (stream.getSampleAspectRatio() != null) {
        console.log(
          `\tStream sample aspect ratio: ${stream.getSampleAspectRatio()}`,
        );
      }
      if (stream.getDisplayAspectRatio() != null) {
        console.log(
          `\tStream display ascpect ratio: ${stream.getDisplayAspectRatio()}`,
        );
      }
      if (stream.getAverageFrameRate() != null) {
        console.log(
          `\tStream average frame rate: ${stream.getAverageFrameRate()}`,
        );
      }
      if (stream.getRealFrameRate() != null) {
        console.log(`\tStream real frame rate: ${stream.getRealFrameRate()}`);
      }
      if (stream.getTimeBase() != null) {
        console.log(`\tStream time base: ${stream.getTimeBase()}`);
      }
      if (stream.getCodecTimeBase() != null) {
        console.log(`\tStream codec time base: ${stream.getCodecTimeBase()}`);
      }
      if (stream.getTags() !== undefined) {
        let tags = stream.getTags();
        Object.keys(tags).forEach(key => {
          console.log(`\tStream tag: ${key}:${tags[key]}`);
        });
      }
    }
  }

  let chapters = information.getChapters();
  if (chapters !== undefined) {
    for (let i = 0; i < chapters.length; ++i) {
      let chapter = chapters[i];
      if (chapter.getId() != null) {
        console.log(`Chapter id: ${chapter.getId()}`);
      }
      if (chapter.getTimeBase() != null) {
        console.log(`\tChapter time base: ${chapter.getTimeBase()}`);
      }
      if (chapter.getStart() != null) {
        console.log(`\tChapter start: ${chapter.getStart()}`);
      }
      if (chapter.getStartTime() != null) {
        console.log(`\tChapter start time: ${chapter.getStartTime()}`);
      }
      if (chapter.getEnd() != null) {
        console.log(`\tChapter end: ${chapter.getEnd()}`);
      }
      if (chapter.getEndTime() != null) {
        console.log(`\tChapter end time: ${chapter.getEndTime()}`);
      }
      if (chapter.getTags() !== undefined) {
        let tags = chapter.getTags();
        Object.keys(tags).forEach(key => {
          console.log(`\tChapter tag: ${key}:${tags[key]}`);
        });
      }
    }
  }
}
