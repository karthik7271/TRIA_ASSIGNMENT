const express = require('express');
const cors = require('cors');
const { db, initDatabase, seedDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


// Helper function to generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Helper function to format contact from database
function formatContact(row) {
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    avatarUrl: row.avatarUrl,
    company: row.company,
    jobTitle: row.jobTitle,
    tags: JSON.parse(row.tags || '[]'),
    favorite: Boolean(row.favorite),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

// GET /api/contacts - List contacts with search and pagination
app.get('/api/contacts', (req, res) => {
  const { search, page = 1, limit = 20, favorite, tags } = req.query;
  
  let query = 'SELECT * FROM contacts WHERE 1=1';
  const params = [];
  
  // Apply search filter
  if (search) {
    query += ' AND (firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR company LIKE ? OR tags LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
  }
  
  // Apply favorite filter
  if (favorite === 'true') {
    query += ' AND favorite = 1';
  }
  
  // Apply tags filter
  if (tags) {
    const tagList = tags.split(',');
    const tagConditions = tagList.map(() => 'tags LIKE ?').join(' OR ');
    query += ` AND (${tagConditions})`;
    tagList.forEach(tag => params.push(`%"${tag}"%`));
  }
  
  // Get total count
  db.get(query.replace('SELECT *', 'SELECT COUNT(*) as count'), params, (err, countRow) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    const total = countRow.count;
    
    // Apply pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
      const contacts = rows.map(formatContact);
      
      res.json({
        data: contacts,
        meta: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total
        }
      });
    });
  });
});

// GET /api/contacts/:id - Get single contact
app.get('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (!row) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(formatContact(row));
  });
});

// POST /api/contacts - Create new contact
app.post('/api/contacts', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    jobTitle,
    tags = [],
    favorite = false
  } = req.body;
  
  // Validate required fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const id = generateUUID();
  const now = new Date().toISOString();
  
  db.run(
    `INSERT INTO contacts (
      id, firstName, lastName, email, phone, avatarUrl, company, 
      jobTitle, tags, favorite, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      firstName,
      lastName,
      email,
      phone || null,
      null, // avatarUrl
      company || null,
      jobTitle || null,
      JSON.stringify(tags),
      favorite ? 1 : 0,
      now,
      now
    ],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      
      // Return the created contact
      db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json(formatContact(row));
      });
    }
  );
});

// PUT /api/contacts/:id - Update contact
app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    jobTitle,
    tags,
    favorite
  } = req.body;
  
  const now = new Date().toISOString();
  
  db.run(
    `UPDATE contacts SET 
      firstName = ?, lastName = ?, email = ?, phone = ?, 
      company = ?, jobTitle = ?, tags = ?, favorite = ?, updatedAt = ?
    WHERE id = ?`,
    [
      firstName,
      lastName,
      email,
      phone || null,
      company || null,
      jobTitle || null,
      JSON.stringify(tags || []),
      favorite ? 1 : 0,
      now,
      id
    ],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      
      // Return the updated contact
      db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.json(formatContact(row));
      });
    }
  );
});

// DELETE /api/contacts/:id - Delete contact
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM contacts WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(204).send();
  });
});

// PATCH /api/contacts/:id/favorite - Toggle favorite status
app.patch('/api/contacts/:id/favorite', (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  
  if (typeof favorite !== 'boolean') {
    return res.status(400).json({ message: 'Favorite must be a boolean value' });
  }
  
  const now = new Date().toISOString();
  
  db.run(
    'UPDATE contacts SET favorite = ?, updatedAt = ? WHERE id = ?',
    [favorite ? 1 : 0, now, id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      
      // Return the updated contact
      db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.json(formatContact(row));
      });
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initDatabase();
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
