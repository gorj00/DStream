import { StreamRewardLogAdded } from '../generated/DStreamToken/DStreamToken'
import { StreamRewardLog, Video } from '../generated/schema'
import { Bytes } from '@graphprotocol/graph-ts'

export function handleStreamRewardLog(event: StreamRewardLogAdded): void {
  let video = Video.load(event.params.videoId.toString())
  let countByVideoId = event.params.count
  let streamRewardLog = new StreamRewardLog(
    Bytes.fromI32(event.params.videoId.toI32()).concatI32(countByVideoId.toI32())
  )
  streamRewardLog.user = event.params.user.toHex()
  streamRewardLog.date = event.block.timestamp.toI32()
  streamRewardLog.amount = event.params.amount.toI32()
  streamRewardLog.save()
}
