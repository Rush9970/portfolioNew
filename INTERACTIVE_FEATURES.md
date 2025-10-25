# Interactive Features Documentation

This document explains all the interactive features that have been integrated into your portfolio.

## 🎨 Features Overview

### 1. **Custom Cursor** (`CustomCursor.tsx`)
A glowing custom cursor with a follower effect that expands when hovering over interactive elements.

**Usage:**
```tsx
import CustomCursor from "@/components/CustomCursor";

// Add to your main layout
<CustomCursor />
```

**Features:**
- Main cursor with primary color border
- Delayed follower cursor for smooth trailing effect
- Automatically expands on buttons, links, and elements with `.cursor-hover` class
- Fixed positioning with high z-index (9999)

**Customization:**
- Modify colors in `src/index.css` under `.custom-cursor` and `.custom-cursor-follower`
- Adjust size by changing width/height values
- Change delay by modifying the setTimeout value (currently 100ms)

---

### 2. **Skills Radar Chart** (`SkillsRadarChart.tsx`)
A canvas-based radar/spider chart visualization showing skill proficiency levels.

**Usage:**
```tsx
import SkillsRadarChart from "@/components/SkillsRadarChart";

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 80 }
];

<SkillsRadarChart skills={skills} width={500} height={500} />
```

**Props:**
- `skills`: Array of `{ name: string, level: number }` (level: 0-100)
- `width`: Canvas width in pixels (default: 500)
- `height`: Canvas height in pixels (default: 500)

**Features:**
- Responsive canvas rendering
- Animated gradient fill
- Glow effects on data points
- Grid circles and axes
- Skill labels positioned around the chart

---

### 3. **Particle Background** (`ParticleBackground.tsx`)
Animated floating particles that can be added to any container for visual interest.

**Usage:**
```tsx
import ParticleBackground from "@/components/ParticleBackground";

<div className="relative">
  <ParticleBackground 
    particleCount={20} 
    color="rgba(139, 92, 246, 0.6)" 
  />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>
```

**Props:**
- `particleCount`: Number of particles (default: 20)
- `color`: CSS color string (default: primary color)
- `className`: Additional CSS classes

**Features:**
- Canvas-based particle animation
- Particles bounce off container edges
- Automatic resize handling
- Non-interactive (pointer-events: none)

---

### 4. **Konami Code Easter Egg** (`KonamiEasterEgg.tsx`)
A hidden easter egg triggered by the classic Konami code sequence.

**Usage:**
```tsx
import KonamiEasterEgg from "@/components/KonamiEasterEgg";

// Add to your main layout
<KonamiEasterEgg />
```

**Trigger Sequence:**
```
↑ ↑ ↓ ↓ ← → ← → B A
```

**Features:**
- Listens for keyboard input globally
- Shows animated overlay when code is entered
- Resets if wrong key is pressed
- Includes close button to dismiss
- Full-screen overlay with backdrop blur

**Customization:**
- Modify the message in the component
- Change the key sequence in the `konamiCode` array
- Adjust animations in `src/index.css`

---

### 5. **Personality Cards** (`PersonalityCards.tsx`)
Hoverable cards with shimmer effects showcasing personal interests and traits.

**Usage:**
```tsx
import PersonalityCards from "@/components/PersonalityCards";

<PersonalityCards />
```

**Features:**
- Grid layout (responsive: 1-3 columns)
- Shimmer effect on hover
- Lucide icons for visual appeal
- Glass-morphism design
- Staggered animation delays

**Customization:**
Edit the `cards` array in the component:
```tsx
const cards = [
  {
    icon: Music,
    title: "Your Title",
    content: "Your content here"
  },
  // Add more cards...
];
```

---

### 6. **Playful Buttons** (`PlayfulButtons.tsx`)
Three different interactive button styles with unique hover/click effects.

**Usage:**
```tsx
import PlayfulButtons from "@/components/PlayfulButtons";

<PlayfulButtons />
```

**Button Types:**
1. **Glow Button**: Scales up with glowing shadow on hover
2. **Ripple Button**: Creates expanding ripple effect on click
3. **Shake Button**: Shakes horizontally on hover

**Features:**
- Includes loading animation demo
- All buttons use gradient backgrounds
- Smooth transitions and animations
- Lucide icons integrated

**Individual Usage:**
```tsx
// Glow Button
<Button className="btn-glow bg-gradient-to-r from-primary to-accent">
  Glow Effect
</Button>

// Ripple Button (requires click handler)
<Button onClick={createRipple} className="btn-ripple">
  Ripple Effect
</Button>

// Shake Button
<Button className="btn-shake">
  Shake on Hover
</Button>
```

---

### 7. **Skills Radar Section** (`SkillsRadarSection.tsx`)
A complete section wrapper for the radar chart with heading and description.

**Usage:**
```tsx
import SkillsRadarSection from "@/components/SkillsRadarSection";

<SkillsRadarSection />
```

**Features:**
- Pre-styled section with max-width container
- Centered layout
- Responsive design
- Includes sample skills data

---

## 🎨 CSS Animations

All custom animations are defined in `src/index.css`:

### Available Animations:
- `.animate-fade-in` - Fade in with slide up
- `.animate-slide-up` - Slide up animation
- `.animate-scale-in` - Scale in animation
- `.animate-pulse-glow` - Pulsing glow effect
- `.animate-shake` - Shake animation

### Custom Classes:
- `.cursor-hover` - Add to any element to trigger cursor expansion
- `.glass-panel` - Glass-morphism background
- `.glow-primary` - Primary color glow shadow
- `.text-gradient-primary` - Primary gradient text
- `.text-gradient-cyber` - Cyberpunk gradient text

---

## 🚀 Quick Integration Guide

### Step 1: Import Components
```tsx
import CustomCursor from "@/components/CustomCursor";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import PersonalityCards from "@/components/PersonalityCards";
import PlayfulButtons from "@/components/PlayfulButtons";
import SkillsRadarSection from "@/components/SkillsRadarSection";
```

### Step 2: Add to Your Layout
```tsx
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global components */}
      <CustomCursor />
      <KonamiEasterEgg />
      
      {/* Your existing sections */}
      <Hero />
      <About />
      
      {/* New interactive sections */}
      <SkillsRadarSection />
      <PersonalityCards />
      <PlayfulButtons />
      
      <Contact />
    </div>
  );
};
```

### Step 3: Add Particle Effects (Optional)
```tsx
<div className="relative glass-panel p-8 rounded-2xl">
  <ParticleBackground particleCount={15} />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>
```

---

## 🎯 Tips & Best Practices

1. **Custom Cursor**: Works best on desktop. Consider hiding on mobile:
   ```css
   @media (max-width: 768px) {
     .custom-cursor,
     .custom-cursor-follower {
       display: none;
     }
   }
   ```

2. **Radar Chart**: Keep skill count between 4-8 for best visibility

3. **Particles**: Use sparingly - too many can impact performance

4. **Easter Egg**: Keep it subtle - don't hint at it too obviously!

5. **Buttons**: Use the ripple effect for primary CTAs

---

## 🎨 Color Customization

All components use your existing color scheme from `src/index.css`:
- Primary: `hsl(258, 90%, 66%)` - Purple
- Secondary: `hsl(188, 96%, 43%)` - Cyan
- Accent: `hsl(330, 81%, 60%)` - Pink

To change colors, update the CSS variables in `:root` and the components will automatically adapt.

---

## 📱 Responsive Design

All components are mobile-responsive:
- Radar chart scales down on smaller screens
- Personality cards stack in 1-3 columns
- Buttons wrap in flexbox
- Custom cursor can be hidden on mobile

---

## 🐛 Troubleshooting

**Custom cursor not showing:**
- Ensure `CustomCursor` is rendered in your main layout
- Check z-index conflicts
- Verify CSS is loaded

**Radar chart not rendering:**
- Check browser canvas support
- Verify skills data format
- Ensure canvas dimensions are set

**Particles not animating:**
- Check if parent container has defined dimensions
- Verify requestAnimationFrame support
- Check for JavaScript errors in console

---

## 🎉 What's Next?

Consider adding:
- Scroll-triggered animations
- More easter eggs
- Interactive project cards
- Animated skill bars
- 3D elements with Three.js
- Mouse-following gradients
- Parallax effects

---

**Enjoy your interactive portfolio! 🚀**
