# 🎨 Design System Generator

**Create beautiful, professional design systems in minutes** - No coding required!

A user-friendly tool for designers to create, customize, and export complete design systems. Just pick colors and fonts, then watch your design system come to life!

---

## 📥 Installation (Non-Technical Users)

### Step 1: Install Node.js (One-Time Setup)

Before using this app, you need Node.js installed on your computer:

1. **Visit**: [https://nodejs.org/](https://nodejs.org/)
2. **Download** the **LTS version** (the green button)
3. **Run the installer** and follow the prompts (keep all default settings)
4. **Restart your computer** after installation

**That's it!** You only need to do this once.

---

### Step 2: Install the App

#### 🍎 **For Mac Users:**

1. Open the downloaded folder
2. **Double-click** `install.sh`
3. If it says "cannot be opened", do this:
   - Right-click `install.sh`
   - Select "Open With" → "Terminal"
4. Wait for installation to complete (2-5 minutes)

#### 🪟 **For Windows Users:**

1. Open the downloaded folder
2. **Double-click** `install.bat`
3. Wait for installation to complete (2-5 minutes)
4. If Windows asks for permission, click "Yes"

#### 🐧 **For Linux Users:**

1. Open Terminal in the downloaded folder
2. Run: `./install.sh`
3. Wait for installation to complete

---

### Step 3: Run the App

#### 🍎 **Mac:**
- Double-click `start.sh` (or right-click → Open With → Terminal)

#### 🪟 **Windows:**
- Double-click `start.bat`

#### 🐧 **Linux:**
- Run: `./start.sh`

**The app will open automatically in your browser at `http://localhost:5173`**

⚠️ **Important**: Keep the terminal window open while using the app!

---

## 🚀 Quick Start Guide

### 1️⃣ Choose a Starting Point
- Look at the **sidebar** (left side)
- Click on a predefined design system (like "Material Inspired")
- **OR** click "New Design System" to start from scratch

### 2️⃣ Customize Colors
- In the left panel, enter your brand color (like `#3b82f6`)
- Watch as it generates a complete color palette!
- See instant WCAG accessibility checks

### 3️⃣ Set Your Fonts
- Choose heading and body fonts from the dropdown
- Adjust the base font size
- Click "AI Suggest Pairing" for smart recommendations

### 4️⃣ Preview Live
- Everything updates in real-time on the right side
- See buttons, cards, forms with YOUR colors and fonts
- Hover over buttons to see interactive states

### 5️⃣ Use AI Tools
- **Generate Components**: Type "pricing card" to create custom components
- **Check Accessibility**: Click "Audit Accessibility" in the top bar
- **Get Font Suggestions**: Use the AI font pairing button

### 6️⃣ Export Your Design
- Click "Export" button in the header
- **For Developers**: Copy the Tailwind config
- **For Designers**: Copy the Figma SVG swatches

---

## ✨ Features

### For Designers
- ✅ **No coding required** - Just click and type!
- ✅ **Instant preview** - See changes in real-time
- ✅ **AI-powered suggestions** - Smart font pairings and components
- ✅ **Accessibility checks** - Automatic WCAG compliance testing
- ✅ **Export to Figma** - Copy color swatches directly

### For Developers
- ✅ **Tailwind config export** - Ready to use in your projects
- ✅ **GitHub integration** - Push design systems to GitHub
- ✅ **Complete component library** - All UI components included
- ✅ **Dark mode support** - Built-in theme switching

---

## 💾 Saving Your Work

Your design systems are **automatically saved** in your browser. They'll be there when you come back!

Want to backup to GitHub?
1. Click "Settings" in the sidebar
2. Add your GitHub token and repository URL
3. Click "Push to GitHub" on any design system

---

## 🆘 Troubleshooting

### "Cannot find node" error
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/) and restart your computer.

### "Permission denied" on Mac
**Solution**: Right-click the script → "Open With" → "Terminal"

### App won't start
**Solution**:
1. Make sure you ran the install script first
2. Check that the terminal window is still open
3. Try closing and running `start.sh` or `start.bat` again

### Browser doesn't open automatically
**Solution**: Manually open your browser and go to: `http://localhost:5173`

---

## 🎯 What You Can Do

- ✅ Create unlimited design systems
- ✅ Generate complete color palettes from one color
- ✅ Choose from hundreds of Google Fonts
- ✅ Get AI-powered design suggestions
- ✅ Export for code (Tailwind) or design (Figma)
- ✅ Check accessibility automatically
- ✅ Save and version your work with Git
- ✅ Create whitelabel documentation pages

---

## 🖥️ System Requirements

- **Mac**: macOS 10.13 or newer
- **Windows**: Windows 10 or newer
- **Linux**: Ubuntu 18.04 or newer
- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet**: Required for Google Fonts (only)

---

## 🤝 Need Help?

Having trouble? Check our troubleshooting section above or create an issue on GitHub.

---

## 📖 For Developers

If you're a developer and want to contribute or use the command line:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Tech Stack**: React 18, Vite, Tailwind CSS, Zustand, Shadcn/ui, isomorphic-git

---

Made with ❤️ for designers and developers
