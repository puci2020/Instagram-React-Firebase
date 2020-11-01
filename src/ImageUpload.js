import React, {useState} from 'react';
import styled from 'styled-components'
import {Button, Input} from "@material-ui/core";
import {db, storage} from "./firebase";
import firebase from "firebase";

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 120px;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  padding: 5px 20px;
  position: fixed;
  bottom: 0;
  left: calc(50vw - 200px);
  background-color: ${({theme}) => theme.colors.background};
  
  .file{
  padding: 5px 0;
  width: 100%;
  display: flex;
  
  .file__input{
  flex: 1;

  }
  .file__button{
  flex: 0;
  margin-left: 10px;
  
  }
  }
  
  .control{
  width: 100%;
  font-size: ${({theme}) => theme.font.size.s};
  }
  

  
`;


const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progrss = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progrss);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    db.collection("posts").add({
                        timestapm: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageURL: url,
                        username: username,
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                });

            }

        );
    };

    return (
        <UploadWrapper>
            <progress className="control" value={progress} max="100"/>
            <Input className="control" value={caption} type="text" placeholder="Enter a caption..."
                   onChange={e => setCaption(e.target.value)}/>
            <div className="file">
                <Input className="control file__input"  type="file" onChange={handleChange}/>
                <Button className="control file__button" onClick={handleUpload}>Upload</Button>
            </div>
        </UploadWrapper>
    );
};

export default ImageUpload;
