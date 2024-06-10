import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backendUrl from "../utils/baseUrl";
import "../style/FolderView.css";
import Loader from "../components/Loader";
import delIcon from "../assets/delicon.svg";

const Breadcrumb = ({ folders }) => {
  return (
    <div className="breadcrumb">
      {folders.map((folder, index) => (
        <span key={index} className="breadcrumb-item">
          {index !== 0 && <span className="breadcrumb-separator">/</span>}
          <Link to={folder?._id === "home" ? "/" : `/folder/${folder._id}`}>
            {folder.name}
          </Link>
        </span>
      ))}
    </div>
  );
};

const FolderView = () => {
  const token = localStorage.getItem("dDriveToken");
  const { folderId } = useParams();
  const [folder, setFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [searchImg, setSearchImg] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stackBreadcrumb, setStackBreadcrumb] = useState([
    { name: "home", _id: "home" },
  ]);
  const navigation = useNavigate();

  const location = useLocation();

  const fetchFolder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/folders/${folderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFolder(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchFolder();
  }, [folderId]);

  const createSubFolder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/api/folders`,
        { name: newFolderName, parent: folderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchFolder();
      setNewFolderName("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", newImageFile);
    formData.append("folderId", folderId);

    try {
      await axios.post(backendUrl + "/api/images/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchFolder();
      setNewImageFile(null);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const deleteFolder = async (folderId) => {
    setLoading(true);
    try {
      let res = await axios.delete(`${backendUrl}/api/folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        if (stackBreadcrumb.length > 2) {
          navigation(
            `/folder/${stackBreadcrumb[stackBreadcrumb.length - 2]._id}`
          );
        } else {
          navigation("/");
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  console.log(stackBreadcrumb);

  const filteredImages = folder?.images.filter((image) =>
    image.name.toLowerCase().includes(searchImg.toLowerCase())
  );
  useEffect(() => {
    // Check if the page was reloaded
    if (sessionStorage.getItem("isReloaded")) {
      sessionStorage.removeItem("isReloaded");
      navigation("/");
    } else {
      fetchFolder();
    }
  }, [folderId, navigation]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isReloaded", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    for (let i = 0; i < stackBreadcrumb.length - 1; i++) {
      if (stackBreadcrumb[i]._id === stackBreadcrumb[i + 1]._id) {
        setStackBreadcrumb((prev) => prev.slice(0, i + 1));
      }
    }

    for (let i = 0; i < stackBreadcrumb.length; i++) {
      if (stackBreadcrumb[i]._id === folderId) {
        setStackBreadcrumb((prev) => prev.slice(0, i + 1));

        return;
      }
    }
    if (folder?.folder) {
      setStackBreadcrumb((prev) => [...prev, folder.folder]);
    }
  }, [folder, location]);

  return (
    <div className="folder-view">
      {loading && <Loader />}

      {!folder && !loading && <h2>This folder is not available</h2>}
      {folder && (
        <>
          <Breadcrumb folders={stackBreadcrumb} />
          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h2>{folder?.folder?.name}</h2>
            <img
              onClick={deleteFolder.bind(this, folder?.folder?._id)}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              src={delIcon}
              alt=""
            />
          </div>
          {/* <Breadcrumb folders={folder.subfolders} /> */}
          <br />
          <form onSubmit={createSubFolder}>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New Folder Name"
              required
            />
            <button type="submit">Create Subfolder</button>
          </form>
          <form onSubmit={uploadImage} encType="multipart/form-data">
            <input
              accept="image/*"
              type="file"
              name="image"
              onChange={(e) => setNewImageFile(e.target.files[0])}
              required
            />
            <button type="submit">Upload Image</button>
          </form>
          <input
            type="text"
            placeholder="Search Images"
            value={searchImg}
            onChange={(e) => setSearchImg(e.target.value)}
          />
          <ul className="folder-list">
            {folder.subfolders.length === 0 && (
              <li className="empty-folder">This folder is empty.</li>
            )}
            {folder.subfolders?.map((subfolder) => (
              <li className="folder-item folder-img-name" key={subfolder._id}>
                <Link
                  state={{ data: subfolder._id }}
                  to={`/folder/${subfolder._id}`}
                >
                  <div>
                    <img
                      src="https://img.freepik.com/free-vector/illustration-data-folder-icon_53876-6329.jpg"
                      alt="Folder Icon"
                      className="folder-icon"
                    />
                    <p>{subfolder.name}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="image-list">
            {filteredImages.length === 0 && (
              <li className="empty-folder">No images found.</li>
            )}
            {filteredImages.map((image) => (
              <li className="image-item" key={image._id}>
                <img
                  src={`${backendUrl}/uploads${image.path.split("uploads")[1]}`}
                  alt={image.name}
                  className="image-preview"
                />
                <p>{image.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FolderView;
