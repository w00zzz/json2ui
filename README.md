# Json2UI

A powerful JSON to UI generator that transforms JSON schemas into beautiful, functional user interfaces. Built with Next.js, TypeScript, and Prisma, Json2UI allows you to quickly generate UIs from JSON definitions with minimal effort.

## 🚀 Features

- **JSON to UI Generation**: Transform JSON schemas into fully functional UIs
- **Customizable Components**: Extensive library of pre-built UI components
- **Real-time Preview**: See changes as you edit your JSON schema
- **Modern Stack**: Next.js 14 with App Router and TypeScript
- **Responsive Design**: Works seamlessly across all device sizes
- **User Authentication**: Secure access control for your projects

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT-based authentication
- **Testing**: Vitest, React Testing Library
- **Styling**: Tailwind CSS

## 📦 Prerequisites

- Node.js 18.0.0 or later
- PostgreSQL database
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/json2ui.git
cd json2ui
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/json2ui"
JWT_SECRET=your_jwt_secret_here
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 4. Set up the database

Run database migrations:

```bash
npx prisma migrate dev --name init
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🏗 Project Structure

```
json2ui/
├── app/                  # Next.js app directory
├── backend/             # Backend controllers and utilities
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Express middlewares
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── db/                  # Database configuration
│   └── prisma/          # Prisma schema and migrations
├── public/              # Static files
├── tests/               # Test files
└── .env.example         # Example environment variables
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

w00zzz - [@w00zzz](https://twitter.com/w00zzz) - w00zzz@proton.me

Project Link: [https://github.com/w00zzz/json2ui](https://github.com/w00zzz/json2ui)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
