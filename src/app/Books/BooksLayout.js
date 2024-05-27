import React, { Suspense } from "react";
import Navbar from "../components/Navbar";

const BooksLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};

export default BooksLayout;
