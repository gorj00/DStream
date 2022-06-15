import { VideoEntryAdded } from '../generated/Video/Video'
import { Video } from '../generated/schema'

export function handleVideoEntryAdded(event: VideoEntryAdded): void {
  let video = new Video(event.params.id.toString())
  video.ipfsCid = event.params.ipfsCid
  video.dateCreated = event.block.timestamp.toI32()
  video.uploader = event.params.uploader.toHex()
  video.projectId = event.params.projectId
  video.save()
}
