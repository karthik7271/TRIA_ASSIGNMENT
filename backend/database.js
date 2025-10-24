const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'contacts.db');
const db = new sqlite3.Database(dbPath);

// Initialize database with contacts table
function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create contacts table
      db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
          id TEXT PRIMARY KEY,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT,
          avatarUrl TEXT,
          company TEXT,
          jobTitle TEXT,
          tags TEXT,
          favorite INTEGER DEFAULT 0,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database initialized successfully');
          resolve();
        }
      });
    });
  });
}

// Insert sample data if table is empty
function seedDatabase() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) as count FROM contacts', (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count === 0) {
        const sampleContacts = [
          {
            id: 'c1a7b0ff-1234-5678-9abc-def012345678',
            firstName: 'Asha',
            lastName: 'Sharma',
            email: 'asha@example.com',
            phone: '+91-9876543210',
            avatarUrl: null,
            company: 'Acme Co.',
            jobTitle: 'Product Designer',
            tags: JSON.stringify(['design', 'india']),
            favorite: 1,
            createdAt: '2025-10-01T12:00:00.000Z',
            updatedAt: '2025-10-01T12:00:00.000Z'
          },
          {
            id: 'e8f9a8b2-5678-9abc-def0-123456789abc',
            firstName: 'Uday',
            lastName: 'Srivastava',
            email: 'uday@example.com',
            phone: '+91-9999999999',
            avatarUrl: null,
            company: 'Example Labs',
            jobTitle: 'Software Engineer',
            tags: JSON.stringify(['engineering', 'friend']),
            favorite: 0,
            createdAt: '2025-09-15T09:00:00.000Z',
            updatedAt: '2025-09-15T09:00:00.000Z'
          },
          {
            id: 'f1a2b3c4-9abc-def0-1234-56789abcdef0',
            firstName: 'Priya',
            lastName: 'Patel',
            email: 'priya@techcorp.com',
            phone: '+91-8888888888',
            avatarUrl: null,
            company: 'TechCorp',
            jobTitle: 'Frontend Developer',
            tags: JSON.stringify(['engineering', 'react', 'javascript']),
            favorite: 1,
            createdAt: '2025-09-20T14:30:00.000Z',
            updatedAt: '2025-09-20T14:30:00.000Z'
          },
          {
            id: 'a1b2c3d4-5678-9abc-def0-123456789abc',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            email: 'rajesh@startup.io',
            phone: '+91-7777777777',
            avatarUrl: null,
            company: 'StartupIO',
            jobTitle: 'CEO',
            tags: JSON.stringify(['leadership', 'startup', 'business']),
            favorite: 0,
            createdAt: '2025-09-10T10:15:00.000Z',
            updatedAt: '2025-09-10T10:15:00.000Z'
          },
          {
            id: 'b2c3d4e5-6789-abcd-ef01-23456789abcd',
            firstName: 'Sneha',
            lastName: 'Gupta',
            email: 'sneha@designstudio.com',
            phone: '+91-6666666666',
            avatarUrl: null,
            company: 'Design Studio',
            jobTitle: 'UX Designer',
            tags: JSON.stringify(['design', 'ux', 'research']),
            favorite: 1,
            createdAt: '2025-09-25T16:45:00.000Z',
            updatedAt: '2025-09-25T16:45:00.000Z'
          },
          {
            id: 'c3d4e5f6-789a-bcde-f012-3456789abcde',
            firstName: 'Amit',
            lastName: 'Singh',
            email: 'amit@consulting.com',
            phone: '+91-5555555555',
            avatarUrl: null,
            company: 'Consulting Inc',
            jobTitle: 'Senior Consultant',
            tags: JSON.stringify(['consulting', 'strategy', 'business']),
            favorite: 0,
            createdAt: '2025-09-05T08:20:00.000Z',
            updatedAt: '2025-09-05T08:20:00.000Z'
          }
        ];

        const stmt = db.prepare(`
          INSERT INTO contacts (
            id, firstName, lastName, email, phone, avatarUrl, company, 
            jobTitle, tags, favorite, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        sampleContacts.forEach(contact => {
          stmt.run([
            contact.id,
            contact.firstName,
            contact.lastName,
            contact.email,
            contact.phone,
            contact.avatarUrl,
            contact.company,
            contact.jobTitle,
            contact.tags,
            contact.favorite,
            contact.createdAt,
            contact.updatedAt
          ]);
        });

        stmt.finalize();
        console.log('Sample data inserted');
      }
      resolve();
    });
  });
}

module.exports = { db, initDatabase, seedDatabase };
