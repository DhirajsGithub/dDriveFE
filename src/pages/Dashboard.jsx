import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style/Dashboard.css";
import backendUrl from "../utils/baseUrl";
import Loader from "../components/Loader";
import authContext from "../store/auth-context";

const Dashboard = () => {
  const token = localStorage.getItem("dDriveToken");
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingFolders, setFetchingFolders] = useState(false);
  const navigate = useNavigate();
  const fetchFolders = async () => {
    setLoading(true);
    try {
      setFetchingFolders(true);
      const response = await axios.get(backendUrl + "/api/folders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFetchingFolders(false);

      setFolders(response.data);
    } catch (err) {
      setFetchingFolders(false);
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const createFolder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        backendUrl + "/api/folders",
        { name: newFolderName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchFolders();
      setNewFolderName("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      {loading && <Loader />}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1>Ddrive</h1>
        <button
          onClick={() => {
            localStorage.removeItem("dDriveToken");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <br />
      <form onSubmit={createFolder}>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Create New Folder"
          required
        />
        <button type="submit">Create Folder</button>
      </form>
      <h2>Your Folders</h2>
      {folders.length === 0 && !fetchingFolders && (
        <p>No folders found. Create a new folder to get started.</p>
      )}
      <ul className="folder-list">
        {folders.map((folder) => (
          <li className="folder-item folder-img-name" key={folder._id}>
            <Link state={{ data: folder._id }} to={`/folder/${folder._id}`}>
              <div>
                <img
                  src="https://img.freepik.com/free-vector/illustration-data-folder-icon_53876-6329.jpg"
                  alt="Folder Icon"
                  className="folder-icon"
                />
                <span>{folder.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
