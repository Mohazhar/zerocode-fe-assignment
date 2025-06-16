# Deployment Scripts

## Quick Deploy to Vercel

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:

   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard**:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Manual Build

```bash
npm run build
npm run preview
```

## Development

```bash
npm run dev
```

## Type Checking

```bash
npm run typecheck
```
