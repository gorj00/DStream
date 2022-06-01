import React, { useState } from 'react'
import { Modal } from 'reactstrap'

const SingleVideoModal = ({ show, close, picture, info }) => {
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
      </div>
    </Modal>
  )
}

export default SingleVideoModal
