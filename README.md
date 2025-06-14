# Dave Nilosek Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. The site dynamically loads resume data from an external YAML source and features a working contact form.

## Features

- **Dynamic Resume Loading**: Fetches resume data from external GitHub repository
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI Components**: Built with HeroUI React components
- **Contact Form**: Real form submission using Web3Forms
- **Smooth Animations**: Powered by Framer Motion
- **Type Safety**: Full TypeScript implementation
- **Icon System**: Iconify integration for scalable icons

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: HeroUI React
- **Animations**: Framer Motion
- **Icons**: Iconify
- **Data Parsing**: js-yaml
- **Form Handling**: Web3Forms

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd resume-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## =' Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Contact Form Setup

The contact form uses Web3Forms for email forwarding:

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email to get a free access key
3. Add the access key to your `.env` file as `VITE_WEB3FORMS_ACCESS_KEY`

### Resume Data Source

The resume data is loaded from an external YAML file:

- **Source**: `https://raw.githubusercontent.com/dnilosek/resume/master/Dave_Nilosek%2C_PhD_CV.yaml`
- **Format**: YAML structure with personal info, experience, education, etc.
- **Loading**: Handled by the `useResume` hook

## Project Structure

```
src/
   components/           # React components
      about-section.tsx
      contact-section.tsx
      education-section.tsx
      experience-section.tsx
      projects-section.tsx
      publications-section.tsx
   hooks/               # Custom React hooks
      use-resume.ts
   types/              # TypeScript type definitions
      resume.ts
   App.tsx             # Main app component
   main.tsx           # Application entry point
```
