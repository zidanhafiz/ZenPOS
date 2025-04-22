# Database Setup Guide

This guide will help you set up the database for the ZenPOS project.

## Prerequisites

- [Supabase](https://supabase.com/) account
- Basic understanding of SQL

## Setup Steps

### 1. Create a Supabase Project

1. Sign up or log in at [Supabase](https://supabase.com/)
2. Create a new project
3. Note your project URL and anon key (you'll need these later)

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the Schema Setup Script

We've included a script to set up the database schema and seed data:

```bash
npm run setup-db
# or
yarn setup-db
# or
pnpm setup-db
```

Or you can set up the database manually using the SQL Editor in the Supabase dashboard:

1. Navigate to the SQL Editor in your Supabase project
2. Copy the contents of `supabase/schema.sql` into the editor and run it
3. Copy the contents of `supabase/seed.sql` into the editor and run it

### 4. Database Structure

The project uses the following tables:

- **users**: Stores user information
- **products**: Contains product catalog
- **transactions**: Records sales transactions
- **transaction_items**: Stores line items for each transaction

### 5. Test Data

The seed script provides:
- Sample products with categories and prices
- Example transactions and transaction items
- A default admin user

Default admin credentials for testing:
- Email: admin@example.com
- Password: Admin123!

**Note**: For security reasons, you should change these credentials in a production environment.

### Troubleshooting

If you encounter any issues with the database setup:
1. Check your Supabase project settings
2. Ensure you have the correct environment variables
3. Look at the error messages in the console for specific SQL errors
4. Open an issue on our GitHub repository 