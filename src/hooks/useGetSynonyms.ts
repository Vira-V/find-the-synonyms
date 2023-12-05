import { useState, useCallback } from "react";
import { fetchSynonyms } from "../api/fetchSynonyms";

export type Synonym = {
  word: string;
  score: number;
};

export const useGetSynonyms = () => {
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSynonyms = useCallback(
    async (word: string) => {
      setIsLoading(true);
      try {
        const result = await fetchSynonyms(word);
        setSynonyms(result);
      } catch (error) {
        console.error("Error fetching synonyms:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setSynonyms]
  );

  return { isLoading, synonyms, getSynonyms };
};