# LISA AI Chatbot - Design Guidelines

## Design Approach
**Selected Approach:** Design System + Reference-Based Hybrid  
**Primary References:** Linear (minimal aesthetics), ChatGPT (conversational patterns), Material Design (structure)  
**Rationale:** Utility-focused chat application requiring clean, distraction-free interface optimized for productivity and conversation flow

## Core Design Principles
1. **Conversation-First:** Minimize chrome, maximize focus on chat content
2. **Professional Clarity:** Clean, technical aesthetic reflecting BIOS team identity
3. **Responsive Efficiency:** Seamless experience across desktop and mobile
4. **Minimal Distraction:** Subtle animations, focused interactions

## Color Palette

### Dark Mode (Primary)
- **Background:** 222 15% 8% (deep charcoal)
- **Surface:** 222 15% 12% (elevated panels)
- **Border:** 222 10% 20% (subtle dividers)
- **Primary:** 210 100% 60% (vibrant blue for LISA brand)
- **Primary Hover:** 210 100% 55%
- **Text Primary:** 0 0% 98% (near white)
- **Text Secondary:** 222 15% 65% (muted gray)
- **AI Message Background:** 222 15% 15% (slightly elevated)
- **User Message Background:** 210 100% 60% (primary color)

### Light Mode
- **Background:** 0 0% 98%
- **Surface:** 0 0% 100%
- **Border:** 222 10% 88%
- **Primary:** 210 100% 50%
- **Text Primary:** 222 20% 15%
- **Text Secondary:** 222 10% 45%

## Typography
- **Primary Font:** Inter (Google Fonts) - clean, technical readability
- **Code Font:** JetBrains Mono - for code blocks in responses
- **Scale:**
  - Headings: text-2xl font-semibold (LISA branding)
  - Chat Messages: text-base leading-relaxed
  - Input: text-base
  - Labels: text-sm text-secondary
  - Timestamps: text-xs text-secondary

## Layout System
**Spacing Units:** Tailwind 2, 3, 4, 6, 8, 12 units
- Message padding: p-4
- Section spacing: gap-6
- Container padding: p-6 to p-8
- Input area: p-4

**Layout Structure:**
- Full-height app: h-screen flex flex-col
- Chat container: flex-1 overflow-y-auto max-w-4xl mx-auto w-full
- Fixed input: sticky bottom-0 backdrop-blur

## Component Library

### Header Bar
- Height: h-16
- Background: bg-surface border-b
- Content: LISA branding + "BIOS Team" subtitle
- Right side: API status indicator (green dot when connected)

### Chat Messages
**User Messages:**
- Alignment: ml-auto max-w-2xl
- Background: bg-primary text-white
- Shape: rounded-2xl rounded-br-md
- Padding: px-4 py-3

**AI Messages (LISA):**
- Alignment: mr-auto max-w-2xl
- Background: bg-ai-message
- Shape: rounded-2xl rounded-bl-md
- Padding: px-4 py-3
- Avatar: Small "L" icon or logo (32x32, rounded-full)

**Message Meta:**
- Timestamp: text-xs mt-1 opacity-60
- Typing indicator: Three animated dots for LISA responses

### Input Area
- Container: bg-surface/80 backdrop-blur-xl border-t
- Input field: bg-background rounded-full px-6 py-3
- Send button: Primary color, circular, icon-only (arrow up)
- Focus state: ring-2 ring-primary

### Status & Indicators
- Connection status: Small badge in header (green/yellow/red)
- Loading states: Skeleton loaders matching message shape
- Error states: Red text with retry option

### Empty State
- Centered content when no messages
- LISA logo/icon (96x96)
- Welcome message: "Hi, I'm LISA. How can I help the BIOS team today?"
- Suggested prompts as clickable chips (3-4 examples)

## Interactions & Animations
**Minimal Animation Budget:**
- Message appearance: fade-in + slide-up (200ms)
- Typing indicator: subtle pulse animation
- Button hover: opacity transition (150ms)
- No scroll animations or complex transitions

## Responsive Behavior
- **Desktop (lg:):** Side margins, max-w-4xl centered chat
- **Mobile:** Full-width chat, input slides up with keyboard
- **Touch targets:** Minimum 44px height for interactive elements

## Images
**No hero images** - Chat interface focuses immediately on conversation functionality. 

**Icon Requirements:**
- LISA logo/avatar: 32x32 for messages, 96x96 for empty state
- Send icon: Arrow up or paper plane (24x24)
- Status icons: 8x8 dots for connection status

Use Heroicons for UI elements via CDN.