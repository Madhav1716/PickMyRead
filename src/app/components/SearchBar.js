"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "../firebaseConfig"; // Adjust path as needed
import { collection, query, onSnapshot } from "firebase/firestore";
import "./Searchbar.css";

function Searchbar({ toggleTheme, darkTheme }) {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchResults, setSearchResults] = useState([]); // Search results state

  useEffect(() => {
    const booksRef = collection(db, "books");

    const q = query(booksRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const books = [];
      snapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });

      // Basic client-side filtering with case insensitivity
      const filteredResults = books.filter((book) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          (book.Author_Name &&
            book.Author_Name.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (book.Book_Name &&
            book.Book_Name.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (book.Category &&
            book.Category.toLowerCase().includes(lowerCaseSearchTerm))
        );
      });

      setSearchResults(filteredResults);
    });

    return unsubscribe;
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="Container">
      <div className="SearchArea">
        <Image
          src="/search.jpg"
          width={5000}
          height={550}
          alt="book"
          priority={true}
          className="SearchArea-image"
        />
      </div>
      <div className="Search-bar-Area">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className={`search ${darkTheme ? "light-theme" : "dark-theme"}`}
            value={searchTerm} // Use the new state name
            onChange={handleChange}
          />
          {searchTerm.length > 0 && (
            <div className="searchResultsContainer">
              {searchResults.length > 0 ? (
                searchResults.map((book) => (
                  <Link
                    href={`/Books/${book.id}`}
                    key={book.id}
                    className="searchResult">
                    <div className="bookImage">
                      <Image
                        src={book.Image || "/book-placeholder.png"}
                        alt="Book Cover"
                        width={50}
                        height={30}
                        priority={true}
                      />
                    </div>
                    <div className="bookDetails">
                      <div className="bookTitle">{book.Book_Name}</div>
                      <div className="author">{book.Author_Name}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="searchResult">No results found :)</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
