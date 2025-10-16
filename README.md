# Micro Motivator 🍃

A beautiful micro-motivator application built with Next.js 14, featuring seasonal theming, accessibility-first design, and mindfulness features to help you stay motivated throughout your day.

## ✨ Features

- **🎨 Seasonal Theming**: Automatically adapts colors and animations based on the current season
- **♿ Accessibility First**: Built with WCAG guidelines in mind
  - Skip-to-content links
  - Reduced motion support
  - High contrast mode compatibility
  - Keyboard navigation
- **🌊 Glassy Dark UI**: Modern glass morphism design with a sophisticated dark theme
- **🍂 Animated Backgrounds**: Subtle falling leaf animation during fall season
- **⚙️ Manual Season Override**: Lock any season manually in settings
- **📱 Responsive Design**: Works beautifully on all device sizes
- **🔧 TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Recharts (ready for data visualization)
- **Animations**: Lottie React (ready for advanced animations)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd micro-motivator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── FallingLeaves.tsx # Seasonal animation component
├── lib/                   # Utility functions
│   ├── storage.ts        # Safe localStorage utilities
│   └── utils.ts          # General utilities
├── providers/             # React context providers
│   └── SeasonProvider.tsx # Seasonal theming provider
├── theme/                 # Theme configuration
│   └── palette.ts        # Seasonal color palettes
├── types.ts              # TypeScript type definitions
└── .github/
    └── copilot-instructions.md
```

## 🎨 Seasonal Theming

The app features four distinct seasonal color palettes:

- **🌸 Spring**: Fresh greens with soft pink and pale yellow accents
- **☀️ Summer**: Bright sky blue with sunny yellow and coral orange
- **🍂 Fall**: Burnt orange and amber with deep moss and plum (includes falling leaves)
- **❄️ Winter**: Ice blue with light gray-blue and crisp white accents

Colors automatically switch based on the current date:
- Spring: March - May
- Summer: June - August  
- Fall: September - November
- Winter: December - February

## ♿ Accessibility Features

- **Skip Links**: Press Tab when the page loads to access skip-to-content link
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **High Contrast**: Compatible with high contrast mode
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Semantic HTML and proper ARIA labels
- **Focus Management**: Clear focus indicators and logical tab order

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🎯 Customization

### Adding New Seasonal Themes

Edit `theme/palette.ts` to add or modify seasonal color palettes:

```typescript
export const seasonalPalettes: Record<Season, SeasonalTheme> = {
  // Add your custom season here
}
```

### Customizing Colors

All colors use CSS custom properties. Modify the color values in:
- `app/globals.css` for base theme colors
- `theme/palette.ts` for seasonal colors

### Adding Components

Use shadcn/ui to add more components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc.
```

## 📦 Built-in Types

The project includes comprehensive TypeScript types for:

- User profiles and sessions
- Gamification (badges, streaks)
- Weather and environmental data
- Breathing exercise patterns
- Seasonal theming
- App settings and preferences
- Analytics and progress tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- [Lucide](https://lucide.dev/) for the icon library

---

Built with ❤️ and seasonal inspiration