import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config";

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`${BASE_URL}/api/places/search/?query=${encodeURIComponent(searchQuery)}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  // Pagination Logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid py-5" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h3 className="text-secondary text-center">
            Search Results for "{searchQuery}"
          </h3>
          <hr />

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-muted text-center">No results found.</p>
          ) : (
            <>
              <div className="list-group">
                {currentResults.map((result) => (
                  <Link
                    key={result.id}
                    to={{
                      pathname: `/place/${result.id}`,
                      search: `?placeName=${encodeURIComponent(result.name)}&price=${result.price}`,
                    }}
                    className="list-group-item list-group-item-action"
                  >
                    <h5 className="mb-1 text-primary">{result.name}</h5>
                    <p className="mb-1 text-muted">{result.description}</p>c
                    <small className="text-success fw-bold">Price: KES {result.price}</small>
                  </Link>
                ))}
              </div>
              {/* Pagination Controls */}
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
