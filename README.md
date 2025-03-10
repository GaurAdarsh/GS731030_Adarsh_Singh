# GS870730_Adarsh_Singh

## React + TypeScript + Vite

This project is built using React, TypeScript, and Vite for fast and efficient development. It includes modern libraries and tools for state management, routing, UI styling, and data visualization.

### Technologies Used:
- **React 19** - Modern UI library
- **TypeScript** - Static typing
- **Vite** - Fast development server and build tool
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **AG-Grid** - Advanced data grid
- **Recharts** - Charting library

### Installation and Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd react_test
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Building for Production
To build the project for production, run:
```sh
npm run build
```

### Linting and Code Quality
To run ESLint for code linting:
```sh
npm run lint
```

### Expanding the ESLint configuration
If you are developing a production application, update the ESLint configuration to enable type-aware lint rules:
```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

Additionally, install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

### Running the Preview Server
To preview the production build:
```sh
npm run preview
```

