import React from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchCharacters = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`
  );
  return res.data;
};

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <div className="character-details">
        <h2>{character.name}</h2>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Location:</strong> {character.location.name}
        </p>
      </div>
    </div>
  );
};

const CharacterList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery('characters', fetchCharacters, {
      getNextPageParam: (lastPage) => {
        console.log('lastpage', lastPage);
        const url = lastPage.info.next;
        if (!url) return undefined;
        const nextPage = new URL(url).searchParams.get('page');
        console.log('nextPage', nextPage);
        return nextPage;
      },
    });
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>Error occurred</p>;
  console.log('data.pages', data.pages);
  return (
    <div className="character-grid">
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </React.Fragment>
      ))}
      <div className="load-more">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'No More Results'}
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
