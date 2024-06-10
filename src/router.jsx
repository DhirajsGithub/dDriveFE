import { createBrowserRouter } from "react-router-dom";

import Protected from "./pages/Protected.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FolderView from "./pages/FolderView.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/folder/:folderId", element: <FolderView /> },
    ],
  },
]);

export default router;
