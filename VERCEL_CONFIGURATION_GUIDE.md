# 🚀 Complete Step-by-Step Vercel Configuration Guide

## 📋 Overview

This guide will walk you through configuring all 4 Vercel projects to ensure all pages load correctly with proper subdomain routing.

**Time Required:** 10-15 minutes  
**Difficulty:** Easy  
**Prerequisites:** Access to Vercel dashboard (logged in as dev@decentralizedrights.com)

---

## 🎯 What We're Fixing

**Problem:** Only 3-5 pages are being built instead of all 31 pages  
**Cause:** Incorrect root directory configuration in Vercel projects  
**Solution:** Configure each project's root directory to point to the correct folder

---

## 📁 Repository Structure

Your Dr-Website repository has this structure:

```
Dr-Website/
├── src/
│   ├── app/              ← Main website pages (31 pages)
│   │   ├── page.tsx      ← Homepage
│   │   ├── layout.tsx    ← Navigation
│   │   ├── learn/        ← Learning platform
│   │   ├── docs/         ← Documentation
│   │   ├── why-drp/      ← Why DRP page
│   │   ├── roadmap/      ← Roadmap
│   │   ├── whitepaper/   ← Whitepaper
│   │   ├── community/    ← Community
│   │   └── ...
│   ├── components/       ← Shared components
│   └── lib/              ← Utilities
├── explorer/
│   ├── src/app/          ← Explorer pages
│   ├── package.json
│   └── next.config.js
├── app/
│   ├── app/              ← App dashboard pages
│   └── layout.tsx
├── api/
│   └── pages/            ← API routes
├── package.json          ← Root package.json
├── next.config.js        ← Root config
└── vercel.json           ← Routing config
```

---

## 🔧 Step-by-Step Configuration

### **PROJECT 1: dr-website (Main Site - decentralizedrights.com)**

This is your main website with all the content pages.

#### Step 1.1: Access Project Settings

1. Open your browser and go to: **https://vercel.com/decentralized-rights-projects/dr-website**
2. Click on **"Settings"** tab (top navigation)
3. Click on **"General"** in the left sidebar

#### Step 1.2: Configure Root Directory

1. Scroll down to **"Root Directory"** section
2. Click **"Edit"** button
3. **Leave the field EMPTY** (or type `./`)
   - This tells Vercel to use the project root
   - The main site's pages are in `src/app` which Next.js will auto-detect
4. Make sure **"Include source files outside of the Root Directory in the Build Step"** is **UNCHECKED**
5. Click **"Save"**

#### Step 1.3: Verify Build Settings

1. Scroll to **"Build & Development Settings"**
2. Click **"Edit"** (if not already in edit mode)
3. Set these values:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** `.next` (or leave default)
   - **Install Command:** `npm install` (or leave default)
4. Click **"Save"**

#### Step 1.4: Trigger Redeploy

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **three dots (⋯)** menu on the right
4. Click **"Redeploy"**
5. In the popup, click **"Redeploy"** again to confirm
6. **Wait 2-3 minutes** for build to complete

#### Step 1.5: Verify Pages Load

Once deployment shows ✅ "Ready", test these URLs:
- Homepage: `https://dr-website-git-main-decentralized-rights-projects.vercel.app/`
- Learn: `/learn`
- Docs: `/docs`
- Why DRP: `/why-drp`
- Roadmap: `/roadmap`
- Whitepaper: `/whitepaper`
- Community: `/community`
- Random 404: `/random-page` (should show custom 404)

---

### **PROJECT 2: drp-frontend (App - app.decentralizedrights.com)**

This is your application dashboard.

#### Step 2.1: Access Project Settings

1. Go to: **https://vercel.com/decentralized-rights-projects/drp-frontend**
2. Click **"Settings"** → **"General"**

#### Step 2.2: Configure Root Directory

1. Find **"Root Directory"** section
2. Click **"Edit"**
3. Set to: `app`
   - This tells Vercel to build only the `/app` folder
4. **Uncheck** "Include source files outside..."
5. Click **"Save"**

#### Step 2.3: Build Settings

1. **Framework Preset:** `Next.js`
2. **Build Command:** Default (`npm run build`)
3. **Output Directory:** `.next`
4. Click **"Save"**

#### Step 2.4: Redeploy

1. Go to **"Deployments"** tab
2. Click **⋯** → **"Redeploy"** on latest
3. Wait for build to complete (2-3 min)

#### Step 2.5: Verify

Test: `https://drp-frontend-git-main-decentralized-rights-projects.vercel.app/`

---

### **PROJECT 3: drp-blockchain-explorer (Explorer - explorer.decentralizedrights.com)**

This is your blockchain explorer.

#### Step 3.1: Access Settings

1. Go to: **https://vercel.com/decentralized-rights-projects/drp-blockchain-explorer**
2. **Settings** → **"General"**

#### Step 3.2: Root Directory

1. **Root Directory:** `explorer`
2. **Uncheck** source files outside
3. **Save**

#### Step 3.3: Build Settings

1. **Framework:** `Next.js`
2. **Build Command:** Default
3. **Output:** `.next`
4. **Save**

#### Step 3.4: Redeploy

1. **Deployments** → **Redeploy** latest
2. Wait 2-3 minutes

#### Step 3.5: Verify

Test: `https://drp-blockchain-explorer-git-main-decentralized-rights-projects.vercel.app/`

---

### **PROJECT 4: drp-backend-api (API - api.decentralizedrights.com)**

This is your backend API.

#### Step 4.1: Access Settings

1. Go to: **https://vercel.com/decentralized-rights-projects/drp-backend-api**
2. **Settings** → **"General"**

#### Step 4.2: Root Directory

1. **Root Directory:** `api`
2. **Uncheck** source files outside
3. **Save**

#### Step 4.3: Build Settings

1. **Framework:** `Next.js` (or leave as detected)
2. **Build Command:** Default
3. **Output:** Default
4. **Save**

#### Step 4.4: Redeploy

1. **Deployments** → **Redeploy** latest
2. Wait 2-3 minutes

#### Step 4.5: Verify

Test: `https://drp-backend-api-git-main-decentralized-rights-projects.vercel.app/`

---

## 🌐 Adding Custom Domains (After All Builds Pass)

Once all 4 projects are deployed successfully, add custom domains:

### For Each Project:

1. Go to project → **"Settings"** → **"Domains"**
2. Click **"Add"** button
3. Enter the domain:
   - **dr-website:** `decentralizedrights.com` and `www.decentralizedrights.com`
   - **drp-frontend:** `app.decentralizedrights.com`
   - **drp-blockchain-explorer:** `explorer.decentralizedrights.com`
   - **drp-backend-api:** `api.decentralizedrights.com`
4. Click **"Add"**
5. Vercel will show DNS records to configure

### DNS Configuration

In your **Namespace** (or domain registrar) DNS settings:

```dns
# Root domain
Type: A
Name: @
Value: 76.76.21.21

# WWW
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# App subdomain
Type: CNAME
Name: app
Value: cname.vercel-dns.com

# Explorer subdomain
Type: CNAME
Name: explorer
Value: cname.vercel-dns.com

# API subdomain
Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

**DNS Propagation:** Takes 15 minutes to 48 hours (usually 1-2 hours)

---

## 🧪 Testing Checklist

### Main Site (dr-website)

After redeployment, verify all these pages load:

- [ ] `/` - Homepage with "Welcome to DRP"
- [ ] `/learn` - Learning platform hub
- [ ] `/learn/dashboard` - User learning dashboard
- [ ] `/learn/leaderboard` - Leaderboard
- [ ] `/learn/ai-tutor` - AI tutor interface
- [ ] `/why-drp` - Why choose DRP page
- [ ] `/docs` - Documentation index
- [ ] `/docs/getting-started` - Getting started guide
- [ ] `/docs/protocol` - Protocol documentation
- [ ] `/docs/consensus` - Consensus mechanism
- [ ] `/docs/repository` - Repository info
- [ ] `/docs/security` - Security documentation
- [ ] `/docs/community` - Community docs
- [ ] `/docs/contributing` - Contributing guide
- [ ] `/docs/examples` - Code examples
- [ ] `/docs/faq` - FAQ page
- [ ] `/roadmap` - Project roadmap
- [ ] `/whitepaper` - Whitepaper document
- [ ] `/community` - Community hub
- [ ] `/privacy-policy` - Privacy policy
- [ ] `/terms-of-service` - Terms of service
- [ ] `/eldercore-terms` - ElderCore terms
- [ ] `/eldercore-privacy` - ElderCore privacy
- [ ] `/api` - Redirects to api subdomain
- [ ] `/explorer` - Redirects to explorer subdomain
- [ ] `/app` - Redirects to app subdomain
- [ ] `/random-nonexistent-page` - Shows custom 404

### Subdomain Sites

- [ ] `app.decentralizedrights.com` - App dashboard loads
- [ ] `explorer.decentralizedrights.com` - Blockchain explorer loads
- [ ] `api.decentralizedrights.com` - API documentation/endpoints load

---

## 🐛 Troubleshooting

### Issue: Still Getting 404 After Redeploy

**Solution 1:** Clear Vercel build cache
1. Settings → General
2. Scroll to bottom
3. Click "Clear Build Cache"
4. Redeploy again

**Solution 2:** Check build logs
1. Go to Deployments tab
2. Click on the deployment
3. Click "Building" or "View Function Logs"
4. Look for errors in red

### Issue: "No package.json found"

**Solution:** 
- For subdomains: Ensure root directory is set correctly (app, explorer, or api)
- Each subfolder needs its own package.json

### Issue: Build Succeeds But Pages 404

**Solution:**
1. Check that `src/app` folder exists in repository
2. Verify `layout.tsx` and `page.tsx` files are present
3. Clear browser cache (Ctrl+Shift+R)

### Issue: Custom Domain Not Working

**Solution:**
1. Verify DNS records are correct
2. Wait for DNS propagation (check with: https://dnschecker.org)
3. Ensure domain is added in Vercel → Settings → Domains
4. Check that SSL certificate is active (automatic in Vercel)

---

## 📊 Expected Build Output

### For dr-website (Main Site):

After successful build, you should see:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         120 kB
├ ○ /learn                               8.1 kB         125 kB
├ ○ /docs                                6.3 kB         122 kB
├ ○ /why-drp                             7.4 kB         123 kB
├ ○ /roadmap                             5.9 kB         121 kB
├ ○ /whitepaper                          6.7 kB         122 kB
├ ○ /community                           5.4 kB         120 kB
└ ○ /_not-found                          1.1 kB         115 kB

+ 20+ more routes for all pages
```

If you only see 3-5 routes, the root directory is wrong.

### For Subdomains:

Each should show their own route structure based on their folder contents.

---

## ✅ Quick Verification Commands

After all deployments are ready, test with curl:

```bash
# Test main site homepage
curl -I https://dr-website-git-main-decentralized-rights-projects.vercel.app/

# Should return: HTTP/2 200

# Test a specific page
curl -I https://dr-website-git-main-decentralized-rights-projects.vercel.app/learn

# Should return: HTTP/2 200 (not 404)

# Test 404 page
curl -I https://dr-website-git-main-decentralized-rights-projects.vercel.app/nonexistent

# Should return: HTTP/2 404 with custom 404 page
```

---

## 📞 Need Help?

If you encounter issues during configuration:

1. **Check Vercel build logs** - Shows exact error messages
2. **GitHub repository** - https://github.com/Decentralized-Rights-Protocol/Dr-Website
3. **Vercel documentation** - https://vercel.com/docs
4. **Contact me** - I can help troubleshoot specific errors

---

## 🎉 Success Criteria

You'll know it's working when:

✅ All 4 projects show **"Ready"** status in Vercel  
✅ dr-website build output shows **25+ routes** (not just 3-5)  
✅ You can visit `/learn`, `/docs`, `/roadmap` etc. without 404  
✅ Custom 404 page appears for non-existent pages  
✅ Navigation menu appears on all pages  
✅ Subdomain redirect pages work (`/api`, `/explorer`, `/app`)  

---

## 📸 Visual Guide

### Step 1: Finding Root Directory Setting

```
Vercel Dashboard
└── Your Project (e.g., dr-website)
    └── Settings (top tab)
        └── General (left sidebar)
            └── Scroll to "Root Directory"
                └── Click "Edit"
                    └── Type the directory name
                        └── Click "Save"
```

### Step 2: Redeploying

```
Vercel Dashboard
└── Your Project
    └── Deployments (top tab)
        └── Latest Deployment (top of list)
            └── Click ⋯ (three dots)
                └── Click "Redeploy"
                    └── Confirm in popup
                        └── Wait for "Ready" status
```

---

## 🔄 Configuration Summary Table

| Project | Root Directory | Build Command | Output Dir | Purpose |
|---------|---------------|---------------|------------|---------|
| **dr-website** | *(empty)* or `./` | `npm run build` | `.next` | Main website with all pages |
| **drp-frontend** | `app` | `npm run build` | `.next` | App dashboard |
| **drp-blockchain-explorer** | `explorer` | `npm run build` | `.next` | Blockchain explorer |
| **drp-backend-api** | `api` | default | default | API endpoints |

---

## 🚨 Common Mistakes to Avoid

❌ **Don't** set root directory to `src` for dr-website (causes package.json issues)  
❌ **Don't** enable "source files outside root" unless needed  
❌ **Don't** change build commands unless necessary  
❌ **Don't** forget to click "Save" after each change  
❌ **Don't** skip the redeploy step  

✅ **Do** leave dr-website root directory empty  
✅ **Do** set subdomain root directories to their folder names  
✅ **Do** wait for each deployment to complete before testing  
✅ **Do** check build logs if deployment fails  
✅ **Do** clear browser cache when testing  

---

## 📋 Quick Start Checklist

Print this and check off as you go:

### Main Site (dr-website):
- [ ] Set root directory to empty
- [ ] Verify build settings
- [ ] Save changes
- [ ] Redeploy
- [ ] Wait for "Ready" status
- [ ] Test homepage loads
- [ ] Test /learn loads
- [ ] Test /docs loads
- [ ] Test custom 404 works

### App (drp-frontend):
- [ ] Set root directory to `app`
- [ ] Save
- [ ] Redeploy
- [ ] Verify loads

### Explorer (drp-blockchain-explorer):
- [ ] Set root directory to `explorer`
- [ ] Save
- [ ] Redeploy
- [ ] Verify loads

### API (drp-backend-api):
- [ ] Set root directory to `api`
- [ ] Save
- [ ] Redeploy
- [ ] Verify loads

### Final Steps:
- [ ] All 4 projects showing "Ready"
- [ ] All pages accessible without 404
- [ ] Add custom domains
- [ ] Configure DNS
- [ ] Test with custom domains

---

## 🎯 Expected Timeline

- **Configuration changes:** 5 minutes
- **4 Redeployments:** 8-12 minutes (2-3 min each)
- **Testing:** 5 minutes
- **DNS setup:** 5 minutes
- **DNS propagation:** 1-48 hours (usually 1-2 hours)

**Total active time:** ~20 minutes  
**Total wait time:** 1-2 hours for DNS

---

## 📞 After Completion

Once all sites are working:

1. **Share the links** with your team
2. **Monitor analytics** in Vercel dashboard
3. **Set up monitoring** (optional: error tracking)
4. **Add more content** as needed
5. **Configure CI/CD** for automatic deployments

---

## 🔗 Quick Links

- **GitHub Repository:** https://github.com/Decentralized-Rights-Protocol/Dr-Website
- **Vercel Dashboard:** https://vercel.com/decentralized-rights-projects
- **Main Site Project:** https://vercel.com/decentralized-rights-projects/dr-website
- **App Project:** https://vercel.com/decentralized-rights-projects/drp-frontend
- **Explorer Project:** https://vercel.com/decentralized-rights-projects/drp-blockchain-explorer
- **API Project:** https://vercel.com/decentralized-rights-projects/drp-backend-api

---

## ✨ Pro Tips

💡 **Tip 1:** Use Vercel's "Preview Deployments" to test changes before production  
💡 **Tip 2:** Enable "Auto-assign custom domains" for easier domain management  
💡 **Tip 3:** Set up deployment notifications in Slack or Discord  
💡 **Tip 4:** Use Vercel Analytics to monitor site performance  
💡 **Tip 5:** Create a custom domain for staging (e.g., staging.decentralizedrights.com)  

---

## 🎊 You're Almost There!

Follow these steps carefully, and your entire Decentralized Rights Protocol website infrastructure will be live and fully functional!

**Questions?** Refer to the troubleshooting section or check the Vercel documentation.

---

**Document Version:** 1.0  
**Last Updated:** November 7, 2025  
**Status:** Ready for Implementation  
**Estimated Completion Time:** 20 minutes active work

Good luck! 🚀
