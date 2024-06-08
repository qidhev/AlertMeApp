# AlertMe App

Данный проект предоставляет код приложения для оповещения населения о надвигающейся угрозе, уведомления о явлениях или других важных ситуациях

Приложение написано на React Native, с использованием сторонних библиотек и самописных модулей.

# Начало

>**Заметка**: Перед выполнением следующих шагов необходимо настроить окружение - [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup).

## Пункт 1: Старт Dev сервера **Metro**

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Пункт 2: Старт установки dev-apk

### Для Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

## Пункт 3: Создание prod-apk

### Для Android

```bash
cd ./android

./gradlew assembleRelease
```

В папке ```\android\app\build\outputs\apk\release``` будет app-release.apk для установки