import { UserRegistered, UserLoginLog } from '../generated/User/User'
import { User } from '../generated/schema'

export function handleRegistration(event: UserRegistered): void {
  const user = new Gravatar(event.params.id)
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id)
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}
