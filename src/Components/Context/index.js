import { createContext, useState, useEffect } from "react";

export const likedContext = createContext(null);

export const LikedContextProvider = ({ children }) => {
  const [likedAnimeList, setLikedAnimeList] = useState(() => {
    // Load from localStorage on first render
    const storedList = localStorage.getItem("likedAnimeList");
    return storedList ? JSON.parse(storedList) : [];
  });

  // ⬅️ Save to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem("likedAnimeList", JSON.stringify(likedAnimeList));
  }, [likedAnimeList]);

  const addToLiked = (anime) => {
    setLikedAnimeList((prevList) => {
      const exists = prevList.some((a) => a.id === anime.id);
      return exists ? prevList : [...prevList, anime];
    });
  };

  const removeFromLiked = (id) => {
    setLikedAnimeList((prevList) => prevList.filter((a) => a.id !== id));
  };

  return (
    <likedContext.Provider value={{ likedAnimeList, addToLiked, removeFromLiked }}>
      {children}
    </likedContext.Provider>
  );
};
