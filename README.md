# URL Shortener System

## Overview

This project implements a robust **URL Shortener System** that allows users to shorten URLs, retrieve original URLs, update existing entries, and delete them. The system leverages modern web technologies to provide a high-performance, scalable solution for URL management.

## Technology Stack

- **Backend**: TypeScript + Apollo Server (GraphQL)
- **Database**: MySQL (Prisma ORM)
- **Caching**: Redis
- **Performance Optimization**: Bloom Filter
- **Testing**: Mocha

## Features

- Create shortened URLs with optional custom short codes
- Retrieve original URLs using short codes
- Update existing URL mappings
- Delete URL entries
- Intelligent caching with Redis
- Efficient URL existence checking with Bloom Filter

## System Architecture

### Components

- **GraphQL API**: Handles all URL operations
- **MySQL Database**: Persistent storage for URL mappings
- **Redis Cache**: Improves performance by caching frequently accessed URLs
- **Bloom Filter**: Optimizes URL existence checks

## Prerequisites

### System Requirements

- Node.js (v16+ recommended)
- Docker (optional, but recommended for easy setup)
- MySQL
- Redis

### Installation Steps

1. **Clone the Repository**

   ```sh
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the project root with the following configuration:

   ```
   DATABASE_NAME='url_shortener_db'
   DATABASE_HOST='127.0.0.1'
   DATABASE_PORT='3306'
   DATABASE_USER='root'
   DATABASE_PASSWORD='your_password'
   DATABASE_URL="mysql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"

   REDIS_HOST="127.0.0.1"
   REDIS_PORT="6379"
   REDIS_PASSWORD=""
   ```

4. **Database Setup (Docker Recommended)**

   ```sh
   # Pull MySQL Docker image
   docker pull mysql:8.3

   # Run MySQL container
   docker run -d -p 3306:3306 \
     -e MYSQL_ROOT_PASSWORD=your_password \
     -e MYSQL_DATABASE=url_shortener_db \
     mysql:8.3 --default-authentication-plugin=mysql_native_password

   # Pull Redis Docker image
   docker pull redis

   # Run Redis container
   docker run -d -p 6379:6379 redis
   ```

5. **Database Migrations**
   ```sh
   npx prisma migrate dev
   ```

## Running the Application

### Development Mode

```sh
npm run dev
```

### Production Build

```sh
npm run build
npm start
```

### Running Tests

```sh
npm test
```

## GraphQL API Endpoints

### Queries

- `getUrl(shortCode: String!)`: Retrieve original URL for a given short code

### Mutations

- `createUrl(originalUrl: String!, shortCode: String, ttl: Int)`: Create a new shortened URL
- `updateUrl(shortCode: String!, originalUrl: String!)`: Update an existing URL mapping
- `deleteUrl(shortCode: String!)`: Delete a URL mapping

## Performance Optimizations

### Bloom Filter

- Efficiently checks URL existence before database queries
- Configurable false positive rate
- Reduces unnecessary database lookups

### Caching Strategy

- Redis caching for frequently accessed URLs
- Automatic cache expiration management
- Minimal database load

## Database Schema

```prisma
model ShortenedURL {
  id          Int      @id @default(autoincrement())
  originalUrl String
  shortCode   String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([originalUrl])
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Yong Hsiang Hsieh - wilsonhsieh1216@gmail.com

Project Link: [https://github.com/yourusername/url-shortener](https://github.com/yourusername/url-shortener)

---

**Happy Shortening! 🔗✨**
