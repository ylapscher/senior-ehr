# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is a Create React App project. Use these commands:

- **Development server**: `npm start` - Runs the app in development mode at http://localhost:3000
- **Build**: `npm run build` - Builds the app for production to the `build` folder
- **Test**: `npm test` - Launches the test runner in interactive watch mode
- **Lint**: ESLint is configured via `react-scripts` but there's no separate lint command

## Project Structure

This is a standard Create React App project with React 19.1.0:

- `src/App.js` - Main application component
- `src/index.js` - Application entry point with React 19's `createRoot`
- `public/` - Static assets including `index.html`
- Standard CRA testing setup with Jest and React Testing Library

## Architecture

- React 19 with Create React App scaffolding
- Uses React.StrictMode in development
- ESLint configuration extends `react-app` and `react-app/jest`
- Performance monitoring via `reportWebVitals` (optional)

## Notes

This appears to be a fresh CRA project with minimal customization. The name suggests it's intended for a senior EHR (Electronic Health Record) application but currently contains only the default CRA template.