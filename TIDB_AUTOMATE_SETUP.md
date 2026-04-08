# 🚀 Automated TiDB Cloud Setup Guide

## Quick Start (2 Steps)

### Step 1: Get Your API Credentials
1. Go to: https://tidbcloud.com/console/clusters
2. Click your **profile icon** (top right corner)
3. Select **"API Keys"**
4. Click **"Create API Key"** button
5. **COPY and SAVE these:**
   - Public Key
   - Private Key

### Step 2: Run the Setup Script
Open PowerShell in this directory and run:
```powershell
.\setup-tidb.ps1
```

When prompted:
- Paste your **Public API Key**
- Paste your **Private API Key**
- Paste your **Cluster ID** (found in cluster details on TiDB Cloud)

That's it! The script will:
✅ Add `0.0.0.0/0` IP whitelist automatically
✅ Wait for changes to apply
✅ Verify everything is ready

---

## Manual Steps (If Script Fails)

### Get Your Cluster ID:
1. Go to: https://tidbcloud.com/console/clusters
2. Click on cluster **"minehr-db"**
3. Look at the cluster details
4. Find **"Cluster ID"** (long number like 1074315200771485770...)
5. Copy it

### Add IP Whitelist:
1. In same cluster page, scroll down to find **"Security"** or **"Security Settings"**
2. Look for **"IP Whitelist"** section
3. Click **"Add IP Address"**
4. Enter: `0.0.0.0/0`
5. Click **"Confirm"**
6. **Wait 2-3 minutes** for changes to apply

---

## Test Connection

After whitelisting is applied, test here:
```
https://minehr-hrms.vercel.app/api/db-status
```

You should see:
```json
{
  "status": "✅ Database Connected",
  "message": "TiDB Cloud connection is working!"
}
```

---

## Your Connection Details

**Cluster:** minehr-db  
**Database:** minehr_db  
**Host:** gateway01.us-east-1.prod.aws.tidbcloud.com  
**Port:** 4000  
**User:** 4579PdSAb7iFRRN.root  
**SSL:** Required  

---

## App Links

- **Live App:** https://minehr-hrms.vercel.app
- **DB Status:** https://minehr-hrms.vercel.app/api/db-status
- **TiDB Console:** https://tidbcloud.com/console/clusters
- **Vercel Dashboard:** https://vercel.com/aesha-29s-projects/minehr-hrms

---

## What Happens Next

Once IP whitelist is active:
1. ✅ Add Employee form will work
2. ✅ Data saves to TiDB Cloud
3. ✅ All features become functional
4. ✅ No more connection errors

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Script fails to connect | Verify API credentials are correct |
| Still can't add employee | Whitelist might still be applying (wait 3+ min) |
| DB status shows error | Hard refresh (Ctrl+Shift+R) the page |
| Can't find API Keys | You need Account Access level permissions in TiDB |

---

**Questions?** Check the error message from the script - it will guide you!
