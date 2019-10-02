# Стартовый шаблон для быстрого старта проектов на React/Redux 🚀

Надстройка над [Create React App](https://github.com/facebook/create-react-app) для поддержки единого стиля кода в проектах со стеком React/Redux.

## Quick Start
1. Node v8+, npm v5+
2. Clone `git@git.sfxdx.ru:knowledge-base/frontend/frontend-start-template.git`
3. `npm install` or `yarn install` 

## TLDR

Шаблон включает в себя все фишки доступные из коробки create-react-app, а также:

- State менеджмент через [redux](https://redux.js.org/), [redux-saga](https://redux-saga.js.org/).
- Стандартный роутинг через [react-router](https://reacttraining.com/react-router/web) и [connected-react-router](https://github.com/supasate/connected-react-router) для синхронизации роутинга через redux
- [Flow](https://flow.org/). Уже настроен и готов к бою.
- Линтинг кода через ESLint + [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb)
- Генерация шаблонного кода компонентов и redux через [CLI](#генерация-шаблонов-через-cli)
- Absolutely Test Ready via  [Jest](https://jestjs.io/) + [Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html)
- Готовность к Component Driven Development через [Storybook](https://storybook.js.org/)
- Анализатор бандла, чтобы ваш JS код был extremely fast 🚀🚀🚀 (но это не точно)

## Структура шаблона

#### `src/assets/`

Папка для статических файлов.

#### `src/components/`

Компоненты без внутреннего состояния (глупые компоненты). CLI генерирует их в виде функциональных компонентов.

#### `src/containers/`

Компоненты, подключенные к хранилищу redux. CLI генерирует их в виде классовых компонентов. 

#### `src/pages/`

Компоненты существующие на уровне роутов.

#### `src/store/`

Включает в себя файлы для стейт мендежмента через redux

#### `src/utils/`

Папка для мелких функций, используемых в приложении

#### Important mention
 
> Папка `src` используется в качестве абсолютного пути для импортов. То есть:
>
> ```import Foo from '../../../components/Foo``` 
>
> заменяется на 
>
>```import Foo from 'components/Foo/```

## Генерация шаблонов через CLI

В шаблоне используется генерация компонентов и redux кода через [plop](https://www.npmjs.com/package/plop). Все предустановленные генераторы находятся в папке `generators`. 
Их 4 вида - `component`, `container`, `page` и `redux`. Каждый генерирует шаблонный код и файлы в соответствующую директорию в `src/`.

Запуск CLI генерации:
```
yarn new
```

Также возможно напрямую указать необходимый генератор и параметр name, например:
```
yarn new component Button
```

```
yarn new redux Auth
```

## Storybook

В приложении обычно всегда есть отдельные UI компоненты. У каждого есть свое состояние - disabled, hovered, focused и т.д.
Чтобы компоненты были самодостаточными и обладали продуманным интерфейсом с инкапсулированной реализацией, в шаблон включен storybook для разработки компонентов в изоляции и возможности тестировать и обозревать компоненты с высоты птичьего полета.

Запуск Storybook:
```
yarn storybook
```

Также при создании новых компонентов CLI предложит создать stories файл для включения их в storybook. Stories файлы подхватываются storybook автоматически.
Конфиг storybook находится в `/.storybook/config.js`