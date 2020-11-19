import { VideoType } from 'app/shared/model/enumerations/video-type.model';

export interface IVideo {
  id?: number;
  videoPath?: string;
  recordingStartedAt?: string;
  recordingEndedAt?: string;
  videoType?: VideoType;
}

export const defaultValue: Readonly<IVideo> = {};
