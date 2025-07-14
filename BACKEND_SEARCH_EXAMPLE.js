// Backend API Search Implementation Example
// This would go in your myFlix API server

// 1. Add search endpoint to your routes
app.get('/movies/search', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { q } = req.query; // Get search query from URL parameter
  
  if (!q || q.trim() === '') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const searchQuery = q.trim().toLowerCase();
  
  // Create case-insensitive search criteria
  const searchCriteria = {
    $or: [
      { Title: { $regex: searchQuery, $options: 'i' } },
      { 'Genre.Name': { $regex: searchQuery, $options: 'i' } },
      { 'Director.Name': { $regex: searchQuery, $options: 'i' } },
      { Description: { $regex: searchQuery, $options: 'i' } }
    ]
  };

  Movies.find(searchCriteria)
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      console.error('Search error:', error);
      res.status(500).send('Error: ' + error);
    });
});

// 2. Alternative: Add search functionality to existing movies endpoint
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { search } = req.query;
  
  let query = {};
  
  if (search && search.trim() !== '') {
    const searchQuery = search.trim().toLowerCase();
    query = {
      $or: [
        { Title: { $regex: searchQuery, $options: 'i' } },
        { 'Genre.Name': { $regex: searchQuery, $options: 'i' } },
        { 'Director.Name': { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  Movies.find(query)
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Error: ' + error);
    });
});

// 3. Advanced search with multiple filters
app.get('/movies/advanced-search', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { title, genre, director, year, featured } = req.query;
  
  let query = {};
  
  if (title) {
    query.Title = { $regex: title, $options: 'i' };
  }
  
  if (genre) {
    query['Genre.Name'] = { $regex: genre, $options: 'i' };
  }
  
  if (director) {
    query['Director.Name'] = { $regex: director, $options: 'i' };
  }
  
  if (year) {
    query.ReleaseYear = parseInt(year);
  }
  
  if (featured === 'true') {
    query.Featured = true;
  }

  Movies.find(query)
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      console.error('Advanced search error:', error);
      res.status(500).send('Error: ' + error);
    });
});

// 4. Full-text search with MongoDB Atlas (if using MongoDB Atlas)
app.get('/movies/fulltext-search', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { q } = req.query;
  
  if (!q || q.trim() === '') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  // MongoDB Atlas Text Search (requires text index)
  Movies.aggregate([
    {
      $search: {
        text: {
          query: q,
          path: ['Title', 'Description', 'Genre.Name', 'Director.Name']
        }
      }
    },
    {
      $limit: 20 // Limit results for performance
    }
  ])
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      console.error('Full-text search error:', error);
      res.status(500).send('Error: ' + error);
    });
});
