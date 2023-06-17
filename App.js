import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import app from "./firebaseConfig";
import {
  ref as ref1,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as ref2, set, getDatabase, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";


const rtDatabase = getDatabase(app);
const storage = getStorage(app);

function App() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState(null);
  const [classification, setClassification] = useState("");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [field4, setField4] = useState("");
  const [field5, setField5] = useState("");
  const [field6, setField6] = useState("");
  const [crop, setCrop] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [alert, setAlert] = useState(" Hi Upload image and input crop data! ");
  // setAlert("Hi Upload image and input crop data!");

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  function handleClassificationChange(e) {
    setClassification(e.target.value);
  }

  function handleField1Change(e) {
    setField1(e.target.value);
  }

  function handleField2Change(e) {
    setField2(e.target.value);
  }

  function handleField3Change(e) {
    setField3(e.target.value);
  }

  function handleField4Change(e) {
    setField4(e.target.value);
  }

  function handleField5Change(e) {
    setField5(e.target.value);
  }

  function handleField6Change(e) {
    setField6(e.target.value);
  }

  function handlecropChange(e) {
    setCrop(e.target.value);
  }

  function handleFertilizerChange(e) {
    setFertilizer(e.target.value);
  }

  const handleUpload = () => {
    if (!file) {
      setAlert("  Please upload an image first! ");
    } else {
      console.log(file.name);

      const storageRef = ref1(storage, `/files/${file.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const alert = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setAlert(" Ïmage Uploding: " + alert + " %");
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);

            set(ref2(rtDatabase, "cropdata/"), {
              N: field1,
              P: field2,
              K: field3,
              Temparature: field4,
              Humidity: field5,
              Rainfall: field6,
              imageurl: url,
            });

            set(ref2(rtDatabase, "results/"), {
              classification: "",
              crop: "",
              fertilizer: "",
            });

            const reslutref = ref2(rtDatabase, "results/");
            onValue(reslutref, (snapshot) => {
              const data = snapshot.val();
              console.log(data);

              setClassification(data["classification"]);
              setCrop(data["crop"]);
              setFertilizer(data["fertilizer"]);

              if (data == null || data["crop"] == "") {
                setAlert("  Please wait to response");
              } else {
                setAlert(" Your Results Success! ");
              }
            });
          });
        }
      );
    }
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
        </nav>
      </div>

      <h1> AgroBrain</h1>
      <br></br>
      <div className="alert">
        {/* <span
          className="closebtn"
          onclick="this.parentElement.style.display='none';"
        >
          &times;
        </span> */}
        <strong>Info!</strong>
        {alert}
      </div>
      <br></br>
      {/* <h2>Add Image:</h2> */}
      <input type="file" onChange={handleImageUpload} />
      <br />
      <br />
      <img src={image} />
      <br />
      <br />
      <label htmlFor="classification">Classification: </label>
      <input
        style={{
          height: "40px",
          width: "300px",
          borderRadius: "10px",
          fontSize: "20px",
          textAlign: "center",
        }}
        type="text"
        id="classification"
        value={classification}
        onChange={handleClassificationChange}
      />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <form className="card">
          <h5>Please input fields! </h5>
          <label
            htmlFor="field1"
            style={{ marginRight: "50px", color: "black" }}
          >
            Nitrogen:{" "}
          </label>

          <input
            type="text"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
            }}
            id="field1"
            value={field1}
            onChange={handleField1Change}
          />
          <br />
          <br />
          <label
            htmlFor="field2"
            style={{ marginRight: "30px", color: "black", fontSize: "16px" }}
          >
            Phosporous:{" "}
          </label>

          <input
            type="text"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
            }}
            id="field2"
            value={field2}
            onChange={handleField2Change}
          />
          <br />
          <br />
          <label
            htmlFor="field3"
            style={{ marginRight: "48px", color: "black" }}
          >
            Potasium:{" "}
          </label>

          <input
            type="text"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
            }}
            id="field3"
            value={field3}
            onChange={handleField3Change}
          />
          <br />
          <br />
          <label
            htmlFor="field4"
            style={{ marginRight: "25px", color: "black", fontSize: "16px" }}
          >
            Temparature:{" "}
          </label>

          <input
            type="text"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
            }}
            id="field4"
            value={field4}
            onChange={handleField4Change}
          />
          <br />
          <br />
          <label
            htmlFor="field5"
            style={{ marginRight: "48px", color: "black" }}
          >
            Humidity:{" "}
          </label>

          <input
            type="text"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
            }}
            id="field5"
            value={field5}
            onChange={handleField5Change}
          />
          <br />
          <br />
          <label
            htmlFor="field6"
            style={{ marginRight: "60px", color: "black" }}
          >
            Rainfall:{" "}
          </label>

          <input
            type="text"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
            }}
            id="field6"
            value={field6}
            onChange={handleField6Change}
          />
        </form>
      </div>
      <div>
        <br />
        <br />
        <div className="Button">
          <button
            className="recommend_btn"
            onClick={handleUpload}
            // style={{
            //   backgroundColor: "#E5E4E2",
            //   height: "40px",
            //   width: "150px",
            //   borderRadius: "10px",
            // }}
          >
            <b>GET RECOMMENDATIONS</b>
          </button>
        </div>
        <br />
        <br />
        <label
          htmlFor="crop"
          style={{
            marginLeft: "-150px",
            marginRight: "20px",
            color: "black",
          }}
        >
          Predicted Crop:{" "}
        </label>
        <input
          type="text"
          style={{
            height: "40px",
            width: "500px",
            borderRadius: "10px",
            fontSize: "16px",
            textAlign: "center",
          }}
          id="crop"
          value={crop}
          onChange={handlecropChange}
        />
      </div>
      <div>
        <br />
        <br />
        <label
          htmlFor="fertilizer"
          style={{
            marginLeft: "-200px",
            marginRight: "-200px",
            color: "black",
          }}
        >
          Predicted Fertilizer:{" "}
        </label>
        <input
          type="text"
          style={{
            height: "40px",
            width: "500px",
            borderRadius: "10px",
            fontSize: "16px",
            textAlign: "center",
            marginLeft: "250px",
          }}
          id="fertilizer"
          value={fertilizer}
          onChange={handleFertilizerChange}
        />
      </div>
      <br />
      <br />
    </div>
  );
}

export default App;
