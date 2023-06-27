import React, { useEffect, useState } from "react";
import Btn from "../../../components/Btn/Btn";
import GoBackHomeBtn from "../../../components/Btn/GoBackHomeBtn";
import { auth, db } from "../../../components/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./Profile.css";

const Profile = () => {
  // Change and set profile data such as PhotoURL and UserName
  // const auth = getAuth();
  const user = auth.currentUser;
  const [errorMsg, setErrorMsg] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  // console.log(user);

  //   Set Profile
  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const userUpadateProfile = await auth.currentUser
        .updateProfile({
          displayName: displayName,
        })
        .then(() => {
          setDisplayName("");

          db.collection("users")
            .where("publicId", "==", user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.update({
                  displayName: displayName,
                });
              });
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  //  Change Profile Image
  const handleChangeProfile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  //  Upload Profile Image
  const handleUploadProfile = async (e) => {
    e.preventDefault();
    setUploading(true);
    console.log(image);
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `profile-images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(progress);
        },
        (error) => {
          console.log("ERROR WHILE UPLAODING IMAGE", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            const userId = auth.currentUser.uid;
            db.collection("users")
              .where("publicId", "==", userId)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref
                    .update({
                      photoURL: url,
                    })
                    .then(() => {
                      console.log(
                        "Download URL saved to database successfully"
                      );
                      auth.currentUser
                        .updateProfile({
                          photoURL: url,
                        })
                        .then(() => {
                          setUploading(false);
                          window.location.reload();
                        });
                    })
                    .catch((error) => {
                      console.log(
                        "Error saving download URL to database:",
                        error
                      );
                    });
                });
              });
          });
        }
      );
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  });

  return (
    !loading && (
      <div className="profile">
        <header className="profile">
          <div className="headerProfileContainer">
            <GoBackHomeBtn />
            <h1>Edit Profile</h1>
          </div>
        </header>
        <div className="profileContainer">
          <form className="profileImage" onSubmit={handleUploadProfile}>
            {!uploading ? (
              <div className="profileImg">
                <img src={user.photoURL} alt="profile" />
              </div>
            ) : (
              <div className="loadingContainer">
                <div
                  className="loadingBar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <div className="profileImgUPL">
              <label className="profileImage">
                <input
                  type="file"
                  onChange={handleChangeProfile}
                  style={{
                    backgroundColor: "#f1f1f1",
                    color: "#333",
                    fontSize: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <Btn className="profilePhotoURL" text="Upload" type="submit" />
            </div>
          </form>
          <div className="profileSmallContainer">
            <form onSubmit={handleProfile} className="profileDisplayName">
              <label className="profileDisplayName">
                <p>Name:</p>
                <input
                  type="text"
                  value={displayName}
                  placeholder={
                    user.displayName ? user.displayName : "User Name"
                  }
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={true}
                />
              </label>
              <Btn className="profileDisplayName" text="Update" type="submit" />
            </form>
            <div className="myProfile">
              <p className="profileItem">Your Email:</p>
              <p className="profileData">{user.email}</p>
              <br />
              <p className="profileItem">Your UserID:</p>
              <p className="profileData">{user.uid}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
