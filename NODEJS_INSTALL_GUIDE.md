# Node.js Installation - Detailed Step-by-Step Guide for Windows

## Why You Need This
Node.js is required to run the Amora admin panel locally. Without it, I cannot start the development server.

---

## Step-by-Step Installation (5 minutes)

### Step 1: Download Node.js (1 minute)

**Option A - Direct Link (Recommended)**:
1. Click this link: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
2. Your browser will download the file (about 30 MB)
3. Wait for download to complete

**Option B - Official Website**:
1. Go to https://nodejs.org/
2. Click the green "Download Node.js (LTS)" button
3. Wait for download to complete

### Step 2: Run the Installer (2 minutes)

1. **Open Downloads folder**
   - Press `Windows key + E` to open File Explorer
   - Click "Downloads" in the left sidebar
   - OR go to: `C:\Users\AS\Downloads`

2. **Find the installer**
   - Look for: `node-v20.11.0-x64.msi` (or similar)
   - File size: ~30 MB
   - Icon: Green hexagon with "Node.js" text

3. **Double-click the file**
   - If you see "Do you want to allow this app to make changes?" → Click **Yes**

### Step 3: Installation Wizard (2 minutes)

**Screen 1 - Welcome**
- Text: "Welcome to the Node.js Setup Wizard"
- Click: **Next**

**Screen 2 - License Agreement**
- Checkbox: "I accept the terms in the License Agreement"
- Check the box
- Click: **Next**

**Screen 3 - Destination Folder**
- Default: `C:\Program Files\nodejs\`
- Leave as default
- Click: **Next**

**Screen 4 - Custom Setup**
- Shows components to install
- Leave everything checked (default)
- Important: Make sure "Add to PATH" is checked ✅
- Click: **Next**

**Screen 5 - Tools for Native Modules** (IMPORTANT)
- Checkbox: "Automatically install the necessary tools..."
- ✅ **CHECK THIS BOX** (important for Windows)
- This will install Python and Visual Studio Build Tools
- Click: **Next**

**Screen 6 - Ready to Install**
- Click: **Install**
- Wait for green progress bar to complete (1-2 minutes)

**Screen 7 - Installation Complete**
- Click: **Finish**

### Step 4: Additional Tools Installation (Optional but Recommended)

If you checked "Automatically install necessary tools":
- A PowerShell window will open
- Press **any key** to continue
- It will install Python and Visual Studio Build Tools
- Wait 5-10 minutes (this is optional but helpful)
- Window will close when done

**You can skip this and it will still work!**

### Step 5: Verify Installation (1 minute)

1. **Close ALL terminal windows**
   - Close PowerShell
   - Close Command Prompt
   - Close VS Code if open

2. **Open NEW PowerShell**
   - Press `Windows key`
   - Type: `powershell`
   - Click "Windows PowerShell"

3. **Type this command**:
   ```powershell
   node --version
   ```

4. **Expected output**:
   ```
   v20.11.0
   ```
   (or similar version number)

5. **Also check npm**:
   ```powershell
   npm --version
   ```
   Expected output: `10.x.x` or similar

### Step 6: Restart VS Code

1. **Close VS Code completely**
   - File → Exit
   - Or click the X button

2. **Reopen VS Code**
   - Double-click VS Code icon
   - Open your project folder

3. **Let me know you're ready!**
   - Type: "Node.js installed"
   - I'll automatically set up the rest!

---

## What Happens Next (Automatic)

Once you confirm Node.js is installed, I will:

1. ✅ Navigate to admin-web folder
2. ✅ Run `npm install` (installs dependencies)
3. ✅ Create `.env` file with configuration
4. ✅ Run `npm run dev` (starts server)
5. ✅ Your browser opens to http://localhost:5173
6. ✅ You see the Amora admin dashboard!

---

## Troubleshooting

### "node: command not found" after installation
**Solution**: Did you restart your terminal/VS Code?
- Close ALL PowerShell/terminal windows
- Close VS Code
- Reopen everything
- Try again

### Installation fails
**Solution**: Run as Administrator
- Right-click PowerShell
- Select "Run as Administrator"
- Try installation again

### Download is slow
**Solution**: Use direct link
- https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
- This is faster than the official website

### "Access Denied" error
**Solution**: Run installer as Administrator
- Right-click the .msi file
- Select "Run as Administrator"
- Click "Yes" when prompted

---

## Why I Can't Do This For You

**What I CAN do**:
- ✅ Run terminal commands
- ✅ Create files
- ✅ Install npm packages (once Node.js exists)
- ✅ Start development servers
- ✅ Configure everything

**What I CANNOT do**:
- ❌ Download files from internet
- ❌ Run .exe or .msi installers
- ❌ Click buttons in installation wizards
- ❌ Grant administrator permissions
- ❌ Install system software

**Why**: I only have access to your terminal for running commands. I cannot interact with your Windows desktop, browser, or installation wizards.

---

## Quick Summary

1. Download: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
2. Run the file → Next, Next, Next, Install
3. Close and reopen VS Code
4. Tell me "installed"
5. I handle everything else!

---

## Alternative: Skip Local Setup

If you don't want to install Node.js right now:
1. **Deploy to cloud** instead
2. Use Vercel/Netlify free hosting
3. No local setup needed
4. I can guide you through that process

---

Ready? Download and install Node.js, then let me know when done! 🚀
