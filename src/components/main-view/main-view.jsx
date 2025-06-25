import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
{
    ID: 1,
    actresses: [ 'Kate Winslet', 'Frances Fisher' ],
    Actors: [ 'Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane' ],
    Description: "A timeless epic romance and disaster film. Seventeen-year-old Rose boards the luxurious Titanic with her wealthy fiancé. When she meets the free-spirited artist Jack, they fall in love, unaware that the 'unsinkable' ship is heading for disaster. Their passionate but brief romance becomes a fight for survival when the Titanic hits an iceberg.",
    Director: {
      Name: 'James Cameron',
      Bio: 'Canadian filmmaker known for epic, visually spectacular blockbusters with groundbreaking effects and immersive storytelling in sci-fi and adventure genres.',
      Birth: '1954-08-16',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Drama',
      Description: 'Emotionally intense stories exploring human conflicts, relationships, and personal struggles.'
    },
    IMDbRating: 7.9,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    ReleaseYear: 1997,
    Title: 'Titanic'
  },
  {
    ID: 2,
    actresses: [ 'Zoe Saldana', 'Sigourney Weaver' ],
    Actors: [ 'Sam Worthington', 'Stephen Lang', 'Zoe Saldana' ],
    Description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    Director: {
      Name: 'James Cameron',
      Bio: 'Canadian filmmaker known for epic, visually spectacular blockbusters with groundbreaking effects and immersive storytelling in sci-fi and adventure genres.',
      Birth: '1954-08-16',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Science Fiction',
      Description: 'Futuristic worlds, advanced tech, space adventures, and speculative science driving imaginative, thought-provoking stories.'
    },
    IMDbRating: 7.8,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
    ReleaseYear: 2009,
    Title: 'Avatar'
  },
  {
    ID: 3,
    actresses: [ 'Linda Hamilton' ],
    Actors: [ 'Arnold Schwarzenegger', 'Edward Furlong', 'Robert Patrick' ],
    Description: 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son, John Connor, from a more advanced and powerful cyborg.',
    Director: {
      Name: 'James Cameron',
      Bio: 'Canadian filmmaker known for epic, visually spectacular blockbusters with groundbreaking effects and immersive storytelling in sci-fi and adventure genres.',
      Birth: '1954-08-16',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Science Fiction',
      Description: 'Futuristic worlds, advanced tech, space adventures, and speculative science driving imaginative, thought-provoking stories.'
    },
    IMDbRating: 8.6,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    ReleaseYear: 1991,
    Title: 'Terminator 2: Judgment Day'
  },
  {
    ID: 4,
    actresses: [ 'Scarlett Johansson', 'Rebecca Hall' ],
    Actors: [ 'Christian Bale', 'Hugh Jackman', 'Michael Caine' ],
    Description: 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'British-American filmmaker renowned for crafting complex, visually stunning blockbusters with innovative, thought-provoking narratives across sci-fi, thriller, and drama genres.',
      Birth: '1970-07-30',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Drama',
      Description: 'Emotionally intense stories exploring human conflicts, relationships, and personal struggles.'
    },
    IMDbRating: 8.5,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg',
    ReleaseYear: 2006,
    Title: 'The Prestige'
  },
  {
    ID: 5,
    actresses: [ 'Elizabeth Debicki' ],
    Actors: [ 'John David Washington', 'Robert Pattinson', 'Kenneth Branagh' ],
    Description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'British-American filmmaker renowned for crafting complex, visually stunning blockbusters with innovative, thought-provoking narratives across sci-fi, thriller, and drama genres.',
      Birth: '1970-07-30',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Science Fiction',
      Description: 'Futuristic worlds, advanced tech, space adventures, and speculative science driving imaginative, thought-provoking stories.'
    },
    IMDbRating: 7.5,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
    ReleaseYear: 2020,
    Title: 'Tenet'
  },
  {
    ID: 6,
    actresses: [ 'Maggie Gyllenhaal' ],
    Actors: [ 'Christian Bale', 'Heath Ledger', 'Aaron Eckhart' ],
    Description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'British-American filmmaker renowned for crafting complex, visually stunning blockbusters with innovative, thought-provoking narratives across sci-fi, thriller, and drama genres.',
      Birth: '1970-07-30',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Crime',
      Description: 'Gritty investigations, cunning criminals, relentless detectives, and suspenseful plots unraveling dark, twisted mysteries.'
    },
    IMDbRating: 9,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    ReleaseYear: 2008,
    Title: 'The Dark Knight'
  },
  {
    ID: 7,
    actresses: [ 'Carrie-Anne Moss' ],
    Actors: [ 'Keanu Reeves', 'Laurence Fishburne', 'Hugo Weaving' ],
    Description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    Director: 'Lana Wachowski, Lilly Wachowski',
    Featured: true,
    Genre: {
      Name: 'Science Fiction',
      Description: 'Futuristic worlds, advanced tech, space adventures, and speculative science driving imaginative, thought-provoking stories.'
    },
    IMDbRating: 8.7,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    ReleaseYear: 1999,
    Title: 'The Matrix'
  },
  {
    ID: 8,
    actresses: [ 'Bryce Dallas Howard', 'Irrfan Khan' ],
    Actors: [ 'Chris Pratt', "Vincent D'Onofrio", 'Bryce Dallas Howard' ],
    Description: 'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.',
    Director: {
      Name: 'Colin Trevorrow',
      Bio: "American filmmaker known for directing 'Safety Not Guaranteed' before helming major franchises like 'Jurassic World' and 'Star Wars: Episode IX - The Rise of Skywalker'. His work often blends character-driven stories with blockbuster spectacle.",
      Birth: '1976-09-13',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Action Adventure',
      Description: 'Thrilling quests, daring heroes, high-stakes missions, and dynamic battles in exotic, perilous settings.'
    },
    IMDbRating: 7,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BNzQ3OTY4NjAtNzM5NS00NmYwLWJlM2EtNTkyNDQxOThlMDE0XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_.jpg',
    ReleaseYear: 2015,
    Title: 'Jurassic World'
  },
  {
    ID: 9,
    actresses: [ 'Naomi Watts' ],
    Actors: [ 'Naomi Watts', 'Jack Black', 'Adrien Brody' ],
    Description: 'In 1933 New York, an overly ambitious movie producer coerces his cast and hired ship crew to travel to the mysterious Skull Island, where they encounter Kong, a giant ape who is immediately smitten with the leading lady.',
    Director: {
      Name: 'Peter Jackson',
      Bio: "New Zealand filmmaker best known for directing 'The Lord of the Rings' trilogy and its Hobbit prequels, as well as early cult horror films like 'Bad Taste' and 'Braindead'. Academy Award-winning director and producer with a signature fantasy style.",
      Birth: '1961-10-31',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Fantasy',
      Description: 'Magical realms, mythical creatures, heroic quests, and epic battles between good and evil.'
    },
    IMDbRating: 7.2,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjYxYmRlZWYtMzAwNC00MDA1LWJjNTItOTBjMzlhNGMzYzk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    ReleaseYear: 2005,
    Title: 'King Kong'
  },
  {
    ID: 10,
    actresses: [ 'Helena Bonham Carter' ],
    Actors: [ 'Brad Pitt', 'Edward Norton', 'Meat Loaf' ],
    Description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    Director: {
      Name: 'David Fincher',
      Bio: "American filmmaker known for his meticulous directing style and dark, psychological thrillers like 'Se7en', 'Fight Club', and 'Gone Girl'. Also created the Netflix series 'Mindhunter' and is renowned for his technical precision and distinctive visual style.",
      Birth: '1962-08-28',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Drama',
      Description: 'Emotionally intense stories exploring human conflicts, relationships, and personal struggles.'
    },
    IMDbRating: 8.8,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    ReleaseYear: 1999,
    Title: 'Fight Club'
  },
  {
    ID: 11,
    actresses: [ 'Keira Knightley' ],
    Actors: [ 'Johnny Depp', 'Orlando Bloom', 'Geoffrey Rush' ],
    Description: "Blacksmith Will Turner teams up with eccentric pirate Captain Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.",
    Director: {
      Name: 'Gore Verbinski',
      Bio: "American filmmaker known for blending visual flair with eccentric storytelling, best known for directing the 'Pirates of the Caribbean' trilogy, 'The Ring', and the animated film 'Rango'.",
      Birth: '1964-03-16',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Fantasy',
      Description: 'Magical realms, mythical creatures, heroic quests, and epic battles between good and evil.'
    },
    IMDbRating: 8,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    ReleaseYear: 2003,
    Title: 'Pirates of the Caribbean: The Curse of the Black Pearl'
  },
  {
    ID: 12,
    actresses: [ 'Amber Heard', 'Nicole Kidman' ],
    Actors: [ 'Jason Momoa', 'Patrick Wilson', 'Yahya Abdul-Mateen II' ],
    Description: 'Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.',
    Director: {
      Name: 'James Wan',
      Bio: "Australian filmmaker of Malaysian-Chinese descent, known for horror franchises like 'Saw' and 'The Conjuring Universe', as well as blockbusters like 'Aquaman' and 'Furious 7'.",
      Birth: '1977-02-26',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Action Adventure',
      Description: 'Thrilling quests, daring heroes, high-stakes missions, and dynamic battles in exotic, perilous settings.'
    },
    IMDbRating: 6.8,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_.jpg',
    ReleaseYear: 2018,
    Title: 'Aquaman'
  },
  {
    ID: 13,
    actresses: [ 'Rachel Weisz' ],
    Actors: [ 'Brendan Fraser', 'Arnold Vosloo', 'John Hannah' ],
    Description: 'At an archaeological dig in the ancient city of Hamunaptra, an American serving in the French Foreign Legion accidentally awakens a mummy who begins to wreck havoc as he searches for the reincarnation of his long-lost love.',
    Director: {
      Name: 'Stephen Sommers',
      Bio: 'American filmmaker known for action-packed, adventurous blockbusters with thrilling narratives and larger-than-life characters in fantasy and horror genres.',
      Birth: '1962-03-20',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Action Adventure',
      Description: 'Thrilling quests, daring heroes, high-stakes missions, and dynamic battles in exotic, perilous settings.'
    },
    IMDbRating: 7.1,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BOTJiYjBhZDgtMjhiOC00MTIzLThlNGMtMmI1NjIwM2M3YTI5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    ReleaseYear: 1999,
    Title: 'The Mummy'
  },
  {
    ID: 14,
    actresses: [ 'Scarlett Johansson' ],
    Actors: [ 'Morgan Freeman', 'Amr Waked' ],
    Description: 'A woman, accidentally caught in a dark deal, turns the tables on her captors and transforms into a merciless warrior evolved beyond human logic.',
    Director: {
      Name: 'Luc Besson',
      Bio: "French filmmaker known for stylish action films like 'LÃ©on: The Professional', 'The Fifth Element', and 'Lucy'. Founder of EuropaCorp, his work blends European artistry with Hollywood-scale action and sci-fi spectacle.",
      Birth: '1959-03-18',
      Death: null
    },
    Featured: false,
    Genre: {
      Name: 'Science Fiction',
      Description: 'Futuristic worlds, advanced tech, space adventures, and speculative science driving imaginative, thought-provoking stories.'
    },
    IMDbRating: 6.4,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BODcxMzY3ODY1NF5BMl5BanBnXkFtZTgwNzg1NDY4MTE@._V1_.jpg',
    ReleaseYear: 2014,
    Title: 'Lucy'
  },
  {
    ID: 15,
    actresses: [ 'Moira Kelly' ],
    Actors: [ 'Matthew Broderick', 'James Earl Jones', 'Jeremy Irons' ],
    Description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    Director: 'Roger Allers, Rob Minkoff',
    Featured: true,
    Genre: {
      Name: 'Animation',
      Description: 'Vibrant visuals, imaginative characters, and dynamic storytelling brought to life through colorful, animated worlds.'
    },
    IMDbRating: 8.5,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
    ReleaseYear: 1994,
    Title: 'The Lion King'
  },
  {
    ID: 16,
    actresses: [ 'Carrie Fisher' ],
    Actors: [ 'Mark Hamill', 'Harrison Ford', 'Carrie Fisher' ],
    Description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    Director: {
      Name: 'George Lucas',
      Bio: "American filmmaker and entrepreneur, creator of the 'Star Wars' and 'Indiana Jones' franchises. Founded Lucasfilm and pioneered visual effects through Industrial Light & Magic. Known for mythic storytelling and technological innovation in cinema.",
      Birth: '1944-05-14',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Science Fiction',
      Description: 'Futuristic worlds, advanced tech, space adventures, and speculative science driving imaginative, thought-provoking stories.'
    },
    IMDbRating: 8.6,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg',
    ReleaseYear: 1977,
    Title: 'Star Wars: Episode IV - A New Hope'
  },
  {
    ID: 17,
    actresses: [ 'Zazie Beetz' ],
    Actors: [ 'Joaquin Phoenix', 'Robert De Niro' ],
    Description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
    Director: {
      Name: 'Todd Phillips',
      Bio: "American filmmaker known for directing comedies like 'The Hangover' trilogy and 'Old School', before transitioning to dramatic films with the Oscar-winning 'Joker' (2019). Known for edgy humor and character-driven stories.",
      Birth: '1970-12-20',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Drama',
      Description: 'Emotionally intense stories exploring human conflicts, relationships, and personal struggles.'
    },
    IMDbRating: 8.4,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    ReleaseYear: 2019,
    Title: 'Joker'
  },
  {
    ID: 18,
    actresses: [ 'Connie Nielsen' ],
    Actors: [ 'Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen' ],
    Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    Director: {
      Name: 'Ridley Scott',
      Bio: "British filmmaker renowned for sci-fi classics 'Alien' and 'Blade Runner', historical epics like 'Gladiator', and influential thrillers such as 'Thelma & Louise'. Known for visual mastery and thematic depth across genres.",
      Birth: '1937-11-30',
      Death: null
    },
    Featured: true,
    Genre: {
      Name: 'Drama',
      Description: 'Emotionally intense stories exploring human conflicts, relationships, and personal struggles.'
    },
    IMDbRating: 8.5,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    ReleaseYear: 2000,
    Title: 'Gladiator'
  },
  {
    ID: 19,
    actresses: [ 'Scarlett Johansson', 'Brie Larson' ],
    Actors: [ 'Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo' ],
    Description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    Director: 'Anthony Russo, Joe Russo',
    Featured: true,
    Genre: {
      Name: 'Action Adventure',
      Description: 'Thrilling quests, daring heroes, high-stakes missions, and dynamic battles in exotic, perilous settings.'
    },
    IMDbRating: 8.4,
    ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
    ReleaseYear: 2019,
    Title: 'Avengers: Endgame'
  }
]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

   return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px"
    }}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.ID}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};