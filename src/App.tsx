// App.tsx
import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import Store from "./component/Store";
import Sku from "./component/Sku";
import Charts from "./component/Charts";
import Planning from "./component/Planning";



const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/Store" element={<Layout><Store /></Layout>} />
        <Route path="/sku" element={<Layout><Sku /></Layout>} />
        <Route path="/planning" element={<Layout><Planning /></Layout>} />
        <Route path="/charts" element={<Layout><Charts /></Layout>} />
        <Route path="/" element={<Navigate to="/Store" />} /> {/* Redirect to /Store */}
      </Routes>
  );
};

export default App;