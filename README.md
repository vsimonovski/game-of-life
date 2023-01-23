# 🦠 Game of Life 🦠

[Conway's Game of Life Rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

Online demo: [https://game-of-life-vsimonovski.vercel.app/](https://game-of-life-vsimonovski.vercel.app/)

## 🛠 Technologies used

- ⚛️ React
- 💅 Styled Components
- 🗄 Redux Toolkit
- 🎭 Jest
- 🔚 Cypress
- 📦 husky, lint-staged, eslint, commitlint, prettier

## ⚡️ Usage

```bash
npm install # install dependencies
npm start # run project
npm build # build project
npm build:serve # serve build locally
npm run test # run jest tests
npm run cypress:run # run e2e tests in terminal
npm run cypress:open # run Cypress test environment
```

## ⚙️ Config

Grid size, generation interval, and random factor can be adjusted inside `config.ts` file.

## 🗒 Notes

- I decided to use Redux Tookit in order to achieve as clean as possible solution, I tried version without Redux but I wasn't satisfied with the outcome (version without redux is available on "no-redux" branch)
- I had to upgrade version of Typescript in order to add Redux Tookit
- I had to upgrade version of React in order to add Jest and Cypress

## 🛣 TODO (If I had more time)

- [ ] Use canvas instead of CSS grid for displaying cells, I think it is much more suitable for this problem, mostly in terms of performance. Unfortunately, I have never worked with canvas, so I decided to go with CSS grid.
- [ ] Add options to configure grid size, generation interval and random factor from UI, this would probably require writing custom hook for setInterval, I've stumbled upon [this article](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) during my project development which would be relevant for generation interval setting.
- [ ] Add option to select between several seed presets that would generate interesting shapes
- [ ] Add help modal that explains the game rules
- [ ] Cover mobile and tablet viewports with e2e tests
- [ ] Add tests for redux
