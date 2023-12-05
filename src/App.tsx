// App.jsx
import React, { useState, useRef } from "react";
import "./App.css";
import { useGetSynonyms } from "./hooks/useGetSynonyms";

function App() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState("");
  const { isLoading, synonyms, getSynonyms } = useGetSynonyms();
  const [visibleSynonyms, setVisibleSynonyms] = useState<number>(10);
  const [noResults, setNoResults] = useState<boolean>(false); 


  const handleFetchSynonyms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (word.trim()) {
      await getSynonyms(word);
      setVisibleSynonyms(10);
      scrollToResults();
      setNoResults(synonyms.length === 0);
    }
  };

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord);
    getSynonyms(newWord);
    setVisibleSynonyms(10);
    scrollToResults();
  };

  const handleShowMore = () => {
    setVisibleSynonyms((prevVisibleSynonyms) => prevVisibleSynonyms + 10);
    scrollToResults();
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div className="App-container">
    <div className="App">
      <form className="form" onSubmit={handleFetchSynonyms}>
        <label htmlFor="word-input">Enter the word and find the synonyms</label>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          id="word-input"
        />
        <button type="submit" disabled={!word.trim()}>
          Submit
        </button>
      </form>
      <div className="results-container" ref={resultsRef}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {synonyms.length > 0 ? (
              <ul>
                {synonyms.slice(0, visibleSynonyms).map((synonym) => (
                  <li
                    onClick={() => handleSynonymClicked(synonym.word)}
                    key={synonym.word}
                  >
                    {synonym.word}
                  </li>
                ))}
              </ul>
            ) : (
              noResults && (
                <div className="no-results">No results. Try another word.</div>
              )
            )}
            {visibleSynonyms < synonyms.length && (
              <button onClick={handleShowMore} className="show-more-button">
                Show More
              </button>
            )}
          </div>
        )}
      </div>
      <div className="balls-container">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
        </div>
    </div>
    </div>
  );
}

export default App;
