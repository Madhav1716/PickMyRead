"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import "../ProductDetail.css";
import Link from "next/link";
import Navbar from "../../components/Navbar";

function ProductDetails(props) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const { id } = props.params || {};

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    const body = document.querySelector("body");
    if (darkTheme) {
      body.style.color = "rgb(var(--foreground-rgb))";
      body.style.background = `linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))`;
    } else {
      body.style.color = "#40513B";
      body.style.background = "#E1EBDC";
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("Book ID not found.");
        setLoading(false);
        return;
      }

      try {
        const bookRef = doc(db, "books", id);
        const bookSnapshot = await getDoc(bookRef);

        if (bookSnapshot.exists()) {
          setProduct(bookSnapshot.data());
        } else {
          setError("Book not found.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center loading">Loading book details...</div>;
  }

  if (error) {
    return <div className="text-center error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center not-found">Book not found.</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="main-screen">
        <div className="navbar">
          <div className="telegram-icon">
            <a href="https://t.me/DealHuntersDaily">
              <i className="fab fa-telegram"></i>
            </a>
          </div>
          <Link className="logo" href="/">
            <Image
              src={darkTheme ? "/favicon-light.ico" : "/favicon-dark.ico"}
              alt="PickMyRead Logo"
              width={200}
              height={200}
              className="favicon"
            />
          </Link>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onChange={toggleTheme}
            />
            <svg
              className="swap-off fill-current w-8 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on fill-current w-8 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        <div className="product-details-container">
          <div className="product-details">
            <div className="product-image">
              {product.Image && (
                <Image
                  src={product.Image}
                  alt={product.Book_Name ? product.Book_Name : "Book Image"}
                  width={1800}
                  height={1800}
                  className="image"
                />
              )}
            </div>
            <div className="product-info">
              <p className="product-title">
                <span>Title:</span> {product.Book_Name || "Title Not Available"}
              </p>
              <p className="product-author">
                <span>Author:</span>{" "}
                {product.Author_Name || "Author Not Available"}
              </p>
              <p className="product-category">
                <span>Category:</span>{" "}
                {product.Category || "Category Not Available"}
              </p>
              <p className="product-description">
                <span>Description:</span>{" "}
                {product.Description ? (
                  <>
                    {showMore
                      ? product.Description
                      : product.Description.slice(0, 200)}{" "}
                    {product.Description.length > 200 && (
                      <button
                        onClick={() => setShowMore(!showMore)}
                        className="toggle-button">
                        {showMore ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </>
                ) : (
                  "Description Not Available"
                )}
              </p>
              <button className="btn btn-outline btn-primary">
                {product.URL ? (
                  <a
                    href={product.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buy-link">
                    Buy Now
                  </a>
                ) : (
                  "URL Not Available"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default ProductDetails;
