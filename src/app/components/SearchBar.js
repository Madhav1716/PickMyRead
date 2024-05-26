"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "../firebaseConfig"; // Adjust path as needed
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import "./Searchbar.css";

function Searchbar({ toggleTheme, darkTheme }) {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchResults, setSearchResults] = useState([]); // Search results state

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
    <div className="SearchArea">
      <Image
        src="/search.jpg"
        width={5000}
        height={550}
        alt="book"
        priority={true}
        className="SearchArea-image"
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className={`search ${darkTheme ? "light-theme" : "dark-theme"}`}
          value={searchTerm} // Use the new state name
          onChange={handleChange}
        />{" "}
        {searchTerm.length > 0 && (
          <div className="searchResultsContainer">
            {searchTerm.length > 0 && (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
