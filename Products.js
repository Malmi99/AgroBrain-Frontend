import React from "react";
import { useState } from "react";
import "../../App.css";
import app from "../../firebaseConfig.js";
import {
  ref as ref1,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as ref2, set, getDatabase, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";

const rtDatabase = getDatabase(app);
const storage = getStorage(app);

export default function Products() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");
  const [result, setresult] = useState("");
  const [percent, setPercent] = useState(0);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref1(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);

          set(ref2(rtDatabase, "users/"), {
            filenme: "sdsds",
            imageuri: url,
          });

          const reslutref = ref2(rtDatabase, "users/results/");
          onValue(reslutref, (snapshot) => {
            const data = snapshot.val();
            setresult(data);
            if (data == null){
              setresult("please wait to response");
            }
          });
        });
      }
    );
  };

  return (
    <div className="App">
      <br></br>
      <h1>Tea Leaf Disease Detection</h1>
      <div className="imageContainer">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image ? <img src={image} className="image" alt="preview" /> : null}
        <h2>{percent} "% uploding done"</h2>
      </div>
      <button class="bttn02" onClick={handleUpload}>
        DETECT
      </button>
      {result ? <h1>{result}</h1> : null}
    </div>
  );
}
