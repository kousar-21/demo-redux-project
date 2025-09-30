import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
        
    ]
  },
]);