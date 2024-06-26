"use client";
import React, { useState, useEffect, Suspense } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head"; // Import Head for managing document head
import "./Books.css";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import Navbar from "../components/Navbar";

function Books() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("Category");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const booksCollection = collection(db, "books");
        let booksQuery = booksCollection;
        if (category) {
          booksQuery = query(
            booksCollection,
            where("Category", "==", category)
          );
        }
        const booksSnapshot = await getDocs(booksQuery);
        const booksData = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

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

  return (
    <>
      <Head>
        <title>Discover and Buy Books | PickMyRead.com</title>
        <meta
          name="description"
          content="Explore our vast collection of books. Find the latest releases, bestsellers, and more on PickMyRead.com. Buy books online and enjoy fast delivery."
        />
        <meta
          name="keywords"
          content="books, buy books, book store, bestsellers, new releases"
        />
        <link rel="canonical" href="https://www.pickmyread.com/books" />
        <meta
          property="og:title"
          content="Discover and Buy Books | PickMyRead.com"
        />
        <meta
          property="og:description"
          content="Explore our vast collection of books. Find the latest releases, bestsellers, and more on PickMyRead.com. Buy books online and enjoy fast delivery."
        />
        <meta property="og:url" content="https://www.pickmyread.com/books" />
        <meta property="og:type" content="website" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="main-container">
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar toggleTheme={toggleTheme} darkTheme={darkTheme} />{" "}
          </Suspense>
          <div className="Container">
            <div className="main-title">
              <h1>Explore Our Book Collection</h1>
            </div>
            <div className="Cards">
              {loading ? (
                <div className="loading-indicator">Loading books...</div>
              ) : error ? (
                <div className="error-message">
                  Error fetching books: {error.message}
                </div>
              ) : (
                books.map((book) => (
                  <div className="product-card" key={book.id}>
                    <div className="product-image">
                      <Image
                        src={book.Image}
                        alt="Book Cover"
                        width={500}
                        height={800}
                      />
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">{book.Book_Name}</h2>
                      <p className="product-author">by {book.Author_Name}</p>
                      <p className="product-category">
                        Category: {book.Category}
                      </p>
                      <p className="product-description">
                        Description: {book.Description.substring(0, 80)}...
                      </p>
                      <div className="product-rating">Rating: ⭐⭐⭐⭐⭐</div>
                      <div className="button-group">
                        <button className="btn btn-outline btn-accent">
                          <a href={book.URL}>Buy Now</a>
                        </button>
                        <Link
                          href={{ pathname: `/Books/${book.id}` }}
                          className="btn btn-outline btn-primary">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Books;
