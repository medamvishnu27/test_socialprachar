import React, { useEffect, useRef } from 'react'

const SPVideo = () => {
  const videoRef = useRef(null);

  // Function to handle closing the modal and stopping the video
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
      videoRef.current.currentTime = 0; // Reset video to the start
    }
  };


  useEffect(() => {
    // Function to play the video when the modal is opened
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    // Bootstrap modal event listener for 'show' event
    const modalElement = document.getElementById('exampleModalToggle');
    if (modalElement) {
      modalElement.addEventListener('show.bs.modal', playVideo);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (modalElement) {
        modalElement.removeEventListener('show.bs.modal', playVideo);
      }
    };
  }, []);
    
  return (
    <div>
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} ></button>
      </div>
      <div className="modal-body">
        <video ref={videoRef} width="100%" controls >
        <source src={`${process.env.PUBLIC_URL}/spVideo.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      
    </div>
  </div>
</div>
    </div>
  )
}

export default SPVideo
