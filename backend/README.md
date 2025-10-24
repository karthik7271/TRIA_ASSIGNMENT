# Contact List Backend

A minimal Express.js backend with SQLite database for the Contact List frontend application.

## Features

- **SQLite Database** - Lightweight, file-based database
- **RESTful API** - Full CRUD operations for contacts
- **CORS Enabled** - Compatible with frontend development
- **Search & Pagination** - Advanced filtering capabilities
- **Sample Data** - Pre-populated with test contacts

## API Endpoints

### Contacts
- `GET /api/contacts` - List all contacts (with search, pagination, filters)
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `PATCH /api/contacts/:id/favorite` - Toggle favorite status

### Health
- `GET /api/health` - Health check endpoint

## Query Parameters

### GET /api/contacts
- `search` - Search in names, email, company
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `favorite` - Filter by favorite status (true/false)
- `tags` - Filter by tags (comma-separated)

## Database Schema

```sql
CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  avatarUrl TEXT,
  company TEXT,
  jobTitle TEXT,
  tags TEXT, -- JSON array
  favorite INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   # or
   node server.js
   ```

3. **Server will be available at**
   - API: `http://localhost:8000/api`
   - Health: `http://localhost:8000/api/health`

## Sample Data

The database is automatically populated with 6 sample contacts including:
- Asha Sharma (Product Designer)
- Uday Srivastava (Software Engineer)
- Priya Patel (Frontend Developer)
- Rajesh Kumar (CEO)
- Sneha Gupta (UX Designer)
- Amit Singh (Senior Consultant)

## Development

- **Database file**: `contacts.db` (SQLite)
- **Port**: 8000 (configurable via PORT env var)
- **CORS**: Enabled for all origins
- **Logging**: Console output for server status

## API Examples

### Get all contacts
```bash
curl http://localhost:8000/api/contacts
```

### Search contacts
```bash
curl "http://localhost:8000/api/contacts?search=asha"
```

### Get favorites only
```bash
curl "http://localhost:8000/api/contacts?favorite=true"
```

### Create new contact
```bash
curl -X POST http://localhost:8000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Example Corp",
    "jobTitle": "Developer",
    "tags": ["engineering", "javascript"],
    "favorite": false
  }'
```

### Update contact
```bash
curl -X PUT http://localhost:8000/api/contacts/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "favorite": true
  }'
```

### Delete contact
```bash
curl -X DELETE http://localhost:8000/api/contacts/{id}
```

### Toggle favorite status
```bash
curl -X PATCH http://localhost:8000/api/contacts/{id}/favorite \
  -H "Content-Type: application/json" \
  -d '{"favorite": true}'
```

## Error Handling

- **400** - Bad Request (missing required fields, duplicate email)
- **404** - Not Found (contact doesn't exist)
- **500** - Internal Server Error (database issues)

## Dependencies

- **express** - Web framework
- **sqlite3** - SQLite database driver
- **cors** - Cross-Origin Resource Sharing middleware

---

Built for the Contact List React application. Minimal, fast, and production-ready! 🚀
