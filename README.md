# Особенности приложения:
1. Работа с фейковым серверным API с помощью async-thunk.
2. Сортировка билетов по цене, длительности перелёта и количеству пересадок.
3. Фильтрация по авиакомпаниям.
4. Фильтрация по количеству пересадок.

## Функциональные требования:
- Проект создан с помощью Vite или Create React App, исправно запускается с помощью команды npm start или npm run dev и собирается с помощью npm run build.
- Проект использует Redux Toolkit, не использует стандартный Redux с createStore, не использует легаси-методы connect, mapStateToProps, mapDispatchToProps.
- Требования к адаптивной вёрстке — приложение в целом соответствует макету. Версии для ПК и мобильных устройств исправно работают.
- Используются дополнительные методы из Redux Toolkit, такие как createAsyncThunk для запросов к API, createEntityAdapter для работы с массивами данных.
- Проект написан на TypeScript:

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
