import React from "react";
import "./Profile.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from "../../../Firebase/config";
import { setUser } from "../../../redux/user/userSlice";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  // Function to handle image upload
  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image before uploading.");
      return;
    }

    try {
      const storage = getStorage(firebase);
      const storageRef = ref(storage, `profile_images/${user.id}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      toast.success("Image uploaded successfully!");

      fetch("/user/image-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user_id: user.id, url: downloadURL }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response.status);
          if (response.status) {
            dispatch(
              setUser({
                name: user.name,
                email: user.email,
                phone: user.phone,
                id: user.id,
                url: downloadURL,
                token: user.token,
              })
            );
          } else {
            toast.error("Image storing failed");
          }
        });
    } catch (error) {
      toast.error("Image upload failed.");
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <ToastContainer position={"bottom-right"} />
        <div className="image-upload">
          {user?.url ? (
            <img className="profile-image" src={user.url} alt="User" />
          ) : (
            <img
              className="profile-image"
              src="https://via.placeholder.com/150"
              alt="User"
            />
          )}
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-info">
          <h2 className="section-title">Profile Details</h2>
        </div>
        <div className="profile-section">
          <h4 className="profile-name">{user.name}</h4>
          <p className="profile-info"> {user.email}</p>
          <p className="profile-info">{user.phone}</p>
        </div>
      </div>
      <div className="profile-footer">
        <form action="" onSubmit={handleImageUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
          <button className="edit-profile-button">Upload Image</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
