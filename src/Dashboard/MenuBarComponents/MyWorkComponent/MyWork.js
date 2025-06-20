import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject, listAll } from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, storage, db } from '../../../firebase';
import style from "./mywork.module.css";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function App(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [projectObjective, setProjectObjective] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setTasks(userDoc.data().tasks || []);
        }
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleProjectObjectiveChange = (e) => {
    setProjectObjective(e.target.value);
  };
  const handleprojectDescription=(e)=>{
    setProjectDescription(e.target.value);
  }

  const handleUpload = async () => {
    if (!file || !fileName || !projectObjective || !user || !projectDescription) return;

    const storageRef = ref(storage, `files/${user.uid}/${fileName}`);
    const fileRef = ref(storage, `files/${user.uid}/${fileName}`);

    try {
      const files = await listAll(fileRef);
      if (files.items.length > 0) {
        setError("File already exists. Please choose a different file name.");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progress function (optional)
      }, 
      (error) => {
        console.error("Upload failed:", error);
      }, 
      async () => {
        // Complete function
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update user document with new task
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const newTask = { 
          fileName, 
          fileUrl: downloadURL, 
          filePath: `files/${user.uid}/${fileName}`,
          projectObjective,
          projectDescription
        };
        const updatedTasks = userDoc.exists() ? [...userDoc.data().tasks, newTask] : [newTask];

        // Use setDoc to create or update the document
        await setDoc(userDocRef, { tasks: updatedTasks }, { merge: true });

        // Update tasks state
        setTasks(updatedTasks);

        // Clear file input field and file name input field
        setFile(null);
        setFileName(""); // added this line
        setProjectObjective(""); // added this line
        setProjectDescription("");
        setError(null);
      }
    );
  };

  const handleDelete = async (task) => {
    if (!user) return;

    // Delete file from Storage
    const storageRef = ref(storage, task.filePath);
    await deleteObject(storageRef);

    // Delete task from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    const updatedTasks = userDoc.data().tasks.filter((t) => t.fileName !== task.fileName);
    await updateDoc(userDocRef, { tasks: updatedTasks });

    // Update tasks state
    setTasks(updatedTasks);
  };


  const [modalShow, setModalShow] = React.useState(false);
  const [modalTask, setModalTask] = useState(null);
  
  return (
    <div className="container-fluid">
        <h3>My Work</h3>
<div className='row'>
<div className='col-12 col-md-6 col-sm-12 mb-2'>
  <label htmlFor='File'>File</label>
<input type="file" className="form-control" id="File" onChange={handleFileChange} />
      </div>
<div className='col-12 col-md-6 col-sm-12'>
<label htmlFor='FileName'>Project Title</label>
      <input 
        type="text" 
        placeholder="Enter file name" 
        className='form-control'
        value={fileName}  // added this line
        maxLength="20"
        required
        onChange={handleFileNameChange} 
      />
      </div>
      <div className='row'>
<div className='col-12 col-md-12 col-sm-12'>
<label htmlFor='object'>Objective</label>
      <textarea 
        type="text" 
        placeholder="Enter the Objective of the project"
        className='form-control p-2'
        rows="2"
        maxLength="150"
        required
        value={projectObjective}  // added this line
        onChange={handleProjectObjectiveChange} 
      />
<label htmlFor='description' className='mt-2'>Description</label>
       <textarea 
        type="text" 
        placeholder="Enter Description"
        className='form-control p-3'
        rows="3"
        maxLength="150"
        required
        value={projectDescription}  // added this line
        onChange={handleprojectDescription} 
      />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      </div>
      <button onClick={handleUpload} className='btn mt-3 mb-3' style={{backgroundColor:'#7c56f6',color:'white'}}>Upload</button>

<div className={style.taskgrid}>
  {tasks.map((task, index) => (
    <div key={index} className={style.taskitem}>
      <div className={`${style.card} m-2`}>
        <div className={style.cardbody}>
          <h5 className={style.cardtitle} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{task.fileName}</h5>
          <p className={style.cardtext}>
            <a href={task.fileUrl} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          </p>
          <p className={style.cardtext} style={{whiteSpace:'wrap',textOverflow: 'ellipsis'}}>{task.projectObjective}</p>

          <Button onClick={() => {
            setModalTask(task);
            setModalShow(true);
          }}   style={{backgroundColor:'#7c56f6',color:'white',border:'none'}}>
            veiw
          </Button>

          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {modalTask ? modalTask.fileName : ''}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {modalTask ? modalTask.projectDescription : ''}
              </p>
              <p className={style.cardtext}>
              <a href={modalTask ? modalTask.fileUrl : ''} target="_blank" rel="noopener noreferrer">
                View File
              </a>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(task);
            }}
            className="btn mx-2"
            style={{backgroundColor:'#7c56f6',color:'white'}}
          >
            Delete
          </button>
        </div>
      </div>
      </div>
  ))}
</div>

</div>

  );
}

export default App; 


