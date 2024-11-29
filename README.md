# gainz-deck

A mobile application that assist on your workout routines.

![cover](./README.assets/cover.webp)

Disclaimer: This does not represent the final product. It is still a work in progress phase.

### Pre-requisite Package

1. [Node](https://formulae.brew.sh/formula/node)
2. [Docker](https://formulae.brew.sh/formula/docker)
3. [Android Studio Emulator](https://developer.android.com/studio)
4. [EAS CLI](https://github.com/expo/eas-cli)
5. [SDK](https://developer.android.com/studio)
6. [Watchman](https://formulae.brew.sh/formula/watchman)
7. [Git](https://formulae.brew.sh/formula/git)
8. [GitHub CLI](https://formulae.brew.sh/formula/gh) (Optional)
9. [Plugin:Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
10. [Plugin:ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
11. [Bun](https://bun.sh/) (For Local Development Only, CI still use npm)

### Installation
```sh
bun install
```

### Run
```sh
bun run dev
```

### Test
```sh
# all linter
bun run test:linter 
```

### Build
```sh
# build locally with eas
bun run build:local

# build with gradlew (raw approach)
bun run build:local-raw
```

### Backlogs
1. Pull data-related action states into zustand to seperate of concern base on entity
2. Integrate state management into pages or component
3. Refine Assets
4. House keeping


## Ideal Directories Structure Blueprint
```
src           (source code)
|- app        (file-base routing pages)
    |- static path | [dynamic path] ...
        |- _layout.tsx
        |- <page-name>.tsx
        |- index.ts
|- assets
    |- fonts
        |- index.ts
    |- images
        |- index.ts
|- components (ui reuseable parts, modal)
    |- <component-name>
        |- <component-name>.tsx             (view component)
        |- <component-name>.d.ts            (typing interfaces)
        |- <component-name>.controller.tsx  (control component)
        |- <component-name>.test.js(x)      (unit test)
        |- <component-name>.test.js.snap    (test snapshots)
        |- <component-name>.stories.js      (preview component)
        |- <component-name>.style.ts        (style component)
        |- index.ts
|- layouts    (distinct ui frame)
    |- <layout-name>
        |- <layout-name>.tsx             (view component)
        |- <layout-name>.d.ts            (typing interfaces)
        |- <layout-name>.controller.tsx  (control view)
        |- <layout-name>.test.js(x)      (unit test)
        |- <layout-name>.test.js.snap    (test snapshots)
        |- <layout-name>.stories.js      (preview component)
        |- <layout-name>.style.ts        (style component)
        |- index.ts
|- services   (external related communication)
|- utility    (reuseable logics)
|- constants  (static public data)
|- controller (global controller)
|- styles     (global styles)
|- __tests__  (functional, intergration, e2e test cases)
```

## Data Contracts
```
wip
```

### References

- [modify expo-router root path](https://docs.expo.dev/router/reference/src-directory/)
- [github workflow methods](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [github methods](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context)
- [reset git cache](https://stackoverflow.com/questions/41863484/clear-git-local-cache)
- [jest snapshot ci practices](https://jestjs.io/docs/snapshot-testing)
- [quick setup linter for react native](https://github.com/vasilestefirta/react-native-eslint-prettier-example)
- [running git in github actions](https://github.com/orgs/community/discussions/53762)
- [expo file-base routing](https://docs.expo.dev/routing/create-pages/)
- [expo routing layout grouping](https://docs.expo.dev/routing/layouts/)
- [storybook view choice](https://maurogarcia.dev/posts/Setup-storybook-with-expo/)

## Code Quality and Standardisation
Extension to install on VSCode IDE

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - [List](https://github.com/dustinspecker/awesome-eslint)

> Note:
> typescript package support dependent so latest ts features checks likely not supported yet

[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - [Options](https://prettier.io/docs/en/options)

### Contributor
dendrovis team
