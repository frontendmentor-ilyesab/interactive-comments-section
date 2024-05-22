import React from "react";
import ReactDOM from "react-dom/client";
import CommentsProvider from "./Provider/CommentsProvider.tsx";
import App from "./App.tsx";
import "./CSS/reset.css";
import "./CSS/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommentsProvider>
      <App />
    </CommentsProvider>
  </React.StrictMode>
);
