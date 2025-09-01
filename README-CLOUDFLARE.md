# Deploy to Cloudflare Pages

## Manual Deployment Steps:

1. **Push your code to GitHub repository**

2. **Go to Cloudflare Pages Dashboard:**
   - Visit: https://dash.cloudflare.com/
   - Go to "Pages" section
   - Click "Create a project"
   - Connect to Git (GitHub)

3. **Configure Build Settings:**
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: `18.17.0` or higher

4. **Environment Variables:**
   Add these in Cloudflare Pages settings:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Custom Domain (Optional):**
   - Add your custom domain in Pages settings
   - Configure DNS records as instructed

## Note:
Since this is a static export, API routes won't work. You'll need to:
- Use Supabase for backend functionality
- Or deploy API routes separately as Cloudflare Workers

## Alternative: Full-Stack Deployment
For full Next.js features including API routes, consider:
- Vercel (recommended for Next.js)
- Netlify
- Railway
