// pages/Categories.js
"use client";
import React, { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import "./Category.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { db } from "../firebaseConfig"; // Adjust path as needed
import Link from "next/link";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export default function Categories() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchResults, setSearchResults] = useState([]); // Search results state

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

  const toggleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  useEffect(() => {
    const booksRef = collection(db, "books");
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    const q = query(
      booksRef,
      searchTerm.length > 0 ? [] : [],
      orderBy("Book_Name", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const books = [];
      snapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });

      // Client-side filtering
      const filteredResults = books.filter((book) => {
        const lowerSearchTerm = trimmedSearchTerm.toLowerCase();
        return (
          book.Author_Name.toLowerCase().includes(lowerSearchTerm) ||
          book.Book_Name.toLowerCase().includes(lowerSearchTerm) ||
          book.Category.toLowerCase().includes(lowerSearchTerm)
        );
      });

      // Custom sorting: Move exact matches to the top
      filteredResults.sort((a, b) => {
        const aMatch = a.Book_Name.toLowerCase() === trimmedSearchTerm;
        const bMatch = b.Book_Name.toLowerCase() === trimmedSearchTerm;

        // If both are exact matches, sort alphabetically
        if (aMatch && bMatch) {
          return a.Book_Name.localeCompare(b.Book_Name);
        }

        // If only one is an exact match, prioritize it
        if (aMatch && !bMatch) {
          return -1;
        }

        if (!aMatch && bMatch) {
          return 1;
        }

        // If neither is an exact match, sort alphabetically
        return a.Book_Name.localeCompare(b.Book_Name);
      });

      setSearchResults(filteredResults);
    });

    return unsubscribe;
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className={`main-container ${darkTheme ? "dark-mode" : ""}`}>
      <Navbar toggleTheme={toggleTheme} darkTheme={darkTheme} />
      <Searchbar
        darkTheme={darkTheme}
        searchTerm={searchTerm}
        handleChange={handleChange}
      />
      <div className="Category-Area">
        <div className="Category-heading">
          {/* SEO-friendly H1 with relevant keywords */}
          <h1>Explore a Wide Range of Book Categories | Pick My Read</h1>{" "}
          {/* This line has changed */}
        </div>

        <div className="Category-group">
          <Link
            href={{ pathname: "/Books", query: { Category: "Sci-Fi" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Sci-Fi
          </Link>
          <Link
            href={{ pathname: "/Books", query: { Category: "Love Story" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Love Story
          </Link>
          <Link
            href={{ pathname: "/Books", query: { Category: "Novels" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Novels
          </Link>
        </div>
        <div className="Category-group">
          <Link
            href={{ pathname: "/Books", query: { Category: "Biography" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Biography
          </Link>
          <Link
            href={{ pathname: "/Books", query: { Category: "Time Travel" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Time Travel
          </Link>
          <Link
            href={{ pathname: "/Books", query: { Category: "Fiction" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Fiction
          </Link>
        </div>
        <div className="Category-group">
          <Link
            href={{
              pathname: "/Books",
              query: { Category: "Self Improvement" },
            }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Self Improvement
          </Link>
          <Link
            href={{ pathname: "/Books", query: { Category: "Comics" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Comics
          </Link>
          <Link
            href={{ pathname: "/Books", query: { Category: "Horror" } }}
            className={`btn btn-outline ${
              darkTheme ? "light-theme" : "dark-theme"
            }`}>
            Horror
          </Link>
        </div>
        {showMoreCategories && (
          <>
            <div className="Category-group">
              <Link
                href={{ pathname: "/Books", query: { Category: "Thriller" } }}
                className={`btn btn-outline ${
                  darkTheme ? "light-theme" : "dark-theme"
                }`}>
                Thriller
              </Link>
              <Link
                href={{ pathname: "/Books", query: { Category: "Mystery" } }}
                className={`btn btn-outline ${
                  darkTheme ? "light-theme" : "dark-theme"
                }`}>
                Mystery
              </Link>
              <Link
                href={{ pathname: "/Books", query: { Category: "Cooking" } }}
                className={`btn btn-outline ${
                  darkTheme ? "light-theme" : "dark-theme"
                }`}>
                Cooking
              </Link>
            </div>
            <div className="Category-group">
              <Link
                href={{ pathname: "/Books", query: { Category: "Spiritual" } }}
                className={`btn btn-outline ${
                  darkTheme ? "light-theme" : "dark-theme"
                }`}>
                Spiritual
              </Link>
              <Link
                href={{ pathname: "/Books", query: { Category: "Business" } }}
                className={`btn btn-outline ${
                  darkTheme ? "light-theme" : "dark-theme"
                }`}>
                Business
              </Link>
              <Link
                href={{ pathname: "/Books", query: { Category: "Fantasy" } }}
                className={`btn btn-outline ${
                  darkTheme ? "light-theme" : "dark-theme"
                }`}>
                Fantasy
              </Link>
            </div>
          </>
        )}

        {!showMoreCategories && (
          <div className="Show-More">
            <button
              className="btn btn-wide btn-primary"
              style={{
                background: darkTheme ? "#815CCE" : "#7480ff",
                color: darkTheme ? "#fff" : "#fff",
              }}
              onClick={toggleShowMoreCategories}>
              Show More
            </button>
          </div>
        )}
        {showMoreCategories && (
          <div className="Show-More">
            <button
              className="btn btn-wide btn-primary"
              style={{
                background: darkTheme ? "#815CCE" : "#7480ff",
                color: darkTheme ? "#fff" : "#fff",
              }}
              onClick={toggleShowMoreCategories}>
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
