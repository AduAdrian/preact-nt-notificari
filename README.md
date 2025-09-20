````markdown
# React Notificari - Full Stack Application

Modern full-stack notification application built with React, Vite, TypeScript, NestJS, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **React 18** - Latest React with TypeScript
- **Vite** - Lightning-fast build tool (much faster than Create React App)
- **TypeScript** - Type safety and better DX
- **TailwindCSS** - Utility-first CSS framework
- **React Query (@tanstack/react-query)** - Server state management
- **React Router DOM** - Client-side routing
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Full type safety
- **Prisma** - Modern database ORM
- **PostgreSQL** - Robust relational database
- **JWT Authentication** - Secure auth system
- **Passport** - Authentication middleware
- **Class Validator** - Request validation
- **bcrypt** - Password hashing

### DevOps & Tools
- **Docker** - PostgreSQL and Redis containers
- **Redis** - Caching and sessions
- **Concurrently** - Run multiple dev servers
- **ESLint + Prettier** - Code quality and formatting

## 📁 Project Structure

```
react-notificari/
├── frontend/              # React Vite TypeScript app
├── backend/               # NestJS API server  
├── docker-compose.yml     # Docker services
└── package.json          # Root scripts
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies  
cd backend && npm install && cd ..
```

### 2. Start Database Services
```bash
# Start PostgreSQL and Redis with Docker
npm run docker:up
```

### 3. Setup Database
```bash
# Run database migrations and generate Prisma client
npm run setup
```

### 4. Start Development Servers
```bash
# Start both frontend and backend simultaneously
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Database: PostgreSQL on port 5432
- Redis: on port 6379

## 📋 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both applications
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services
- `npm run setup` - Setup database (migrate + generate)

### Database Management
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio GUI

### Individual Services
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://notificari_user:notificari_password@localhost:5432/notificari_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"
PORT=3001
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

## 🗄️ Database Schema

The application includes a basic notification system with:

- **Users** - Authentication and user management
- **Notifications** - Notification system with types (INFO, SUCCESS, WARNING, ERROR)

## 🎯 Key Features

- ⚡ **Vite** - Much faster than Create React App
- 🔒 **JWT Authentication** - Secure user auth system
- 📱 **Responsive Design** - Mobile-first with TailwindCSS
- 🎨 **Modern UI Components** - Beautiful and accessible
- 🔄 **Real-time Updates** - WebSocket support ready
- 📊 **Database Management** - Prisma ORM with migrations
- 🐳 **Docker Support** - Easy development setup
- 🔍 **Type Safety** - Full TypeScript coverage
- 🚀 **Production Ready** - Optimized builds and deployments

## 🚀 Production Deployment

1. Build applications: `npm run build`
2. Set production environment variables
3. Run database migrations: `npm run db:migrate`
4. Deploy using your preferred hosting platform

## 📝 Next Steps

1. Customize the notification models in `backend/prisma/schema.prisma`
2. Add your UI components in `frontend/src/components`
3. Implement authentication flows
4. Add real-time WebSocket connections
5. Configure email notifications (SMTP)
6. Add more notification types and features

## 🤝 Development Tips

- Use `npm run db:studio` to visually manage your database
- Frontend hot reload works automatically with Vite
- Backend hot reload works with NestJS dev mode
- Check Docker logs with `npm run docker:logs`
- Prisma generates types automatically after migrations

Enjoy building your notification system! 🎉
````