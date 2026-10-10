'use client';

// Update:
// BE 2 CRUD using Context API to manage state globally
// DB Live 2 Connect to Supabase

import { createContext, useContext, useEffect, useState } from 'react';

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      try {
        const res = await fetch('/api/favorites', {
          method: 'GET',
        });

        const result = await res.json();

        if (!res.ok) {
          console.error('Failed to load favorites:', result.error);
          return;
        }

        const favoriteData = Array.isArray(result.data) ? result.data : [];
        console.log(favoriteData)

        if (isMounted) {
          setFavorites(favoriteData);
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  async function addFavorite(user) {
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('Failed to add favorite:', result.error);
        return false;
      }

      const newFavorite = result.data ?? result;

      if (!newFavorite?.id) {
        console.error(
          'Add favorite API did not return a favorite with an id:',
          result
        );
        return false;
      }

      setFavorites((prev) => {
        const alreadyExists = prev.some(
          (favorite) => favorite.id === newFavorite.id
        );

        return alreadyExists ? prev : [...prev, newFavorite];
      });

      return true;
    } catch (error) {
      console.error('Failed to add favorite:', error);
      return false;
    }
  }

  async function removeFavorite(favoriteId) {
    try {
      const res = await fetch(
        `/api/favorites/${encodeURIComponent(favoriteId)}`,
        {
          method: 'DELETE',
        }
      );

      const result = await res.json();

      if (!res.ok) {
        console.error('Failed to remove favorite:', result.error);
        return false;
      }

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.id !== favoriteId)
      );

      return true;
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      return false;
    }
  }

  function isFavorite(userId) {
    return favorites.some((favorite) => favorite.id === userId);
  }


  async function toggleFavorite(user) {
    if (isFavorite(user.id)) {
      return await removeFavorite(user.id);
    }

    return await addFavorite(user);
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error('useFavorite harus dipakai di dalam <FavoriteProvider>');
  }

  return context;
}
