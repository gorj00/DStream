import { useEffect } from 'react'

export const useLogStream = (playerRef, interval=1000) => {


  function timeRangesToString(r) {
    let log = '';
    for (let i = 0; i < r.length; i++) {
      log += '[' + r.start(i) + ', ' + r.end(i) + ']';
      log += ' ';
    }
    return log;
  }

  useEffect(() => {
    setInterval(() => {
      playerRef && 
      playerRef.current && 
      !playerRef.current.paused && 
      playerRef.current.played && 
      console.log('log ', timeRangesToString(playerRef.current.played) )
    }, interval)
  }, [])
}
