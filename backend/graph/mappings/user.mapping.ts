import { UserRegistered, UserLoginLog } from '../generated/User/User'
import { User } from '../generated/schema'

export function handleRegistration(event: UserRegistered): void {
  let user = new User(event.params.addr.toHex())
  user.addr = event.params.addr.toHex()
  user.isLoggedIn = false
  user.date = event.block.timestamp.toI32()
  user.save()
}

export function handleUserLoginLog(event: UserLoginLog): void {
  let id = event.params.addr.toHex()
  let user = User.load(id)
  if (!user) {
    user = new User(id)
  }
  user.addr = event.params.addr.toHex()
  user.isLoggedIn = event.params.isLoggedIn
  user.date = event.params.date.toI32()
  user.save()
}
