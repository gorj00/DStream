import React, { useState, useRef, useEffect } from 'react'
import { Modal } from 'reactstrap'
import ReactHlsPlayer from 'react-hls-player'
import { useLogStream } from '../../hooks/useLogStream'

const SingleVideoModal = ({ show, close, picture, info }) => {
  const playerRef = useRef();
  useLogStream(playerRef)

  return (
    <Modal
      modalClassName="modal-black"
      isOpen={show}
      toggle={close}
      style={{
        background: `url('${picture}') no-repeat`,
        minHeight: '400px',
        width: '500px',
      }}
    >
      <div className="modal-header justify-content-center">
        <button className="close" onClick={close}>
          <i className="tim-icons icon-simple-remove text-white" />
        </button>
        <div className="text-muted text-center ml-auto mr-auto">
          <h3 className="mb-0">{info.title}</h3>
        </div>
      </div>
      <div className="modal-body">
          {/* <img 
            src={picture} 
            alt=""
          /> */}
        <ReactHlsPlayer
          src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
          autoPlay={true}
          controls={true}
          width="100%"
          height="auto"
          playerRef={playerRef}
        />

        {/* <video ref={playerRef}         width="100%"
          height="auto" /> */}
      </div>
    </Modal>
  )
}

export default SingleVideoModal
