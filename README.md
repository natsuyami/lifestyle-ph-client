# lifestyle-ph-client

## Project setup
1. Copy the `.env-copy` file on the *.development-settings* to the root directory of lifestyle-ph-client and name it `.env`.
2. Update the `.env` file values via:
    a. you might need to ask the dev for the value for the cookie settings details for restriction
    b. values such as keys and secrets requires to use the scripts in the *lifestyle-ph-server* to get the values.
    c. value such as attribute keys one and two requires to use the script in the *lifestyle-ph-server* to get the values.
3. Execute the npm command below:
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### File Structure

Please follow the file structure to easily identify components and resources:

- **Components**: create a folder specifying the type of component (e.g. `buttons, pages, cards, carousels, navigation-bar, tool-bar`, etc.). Save the template and script for the component *not including the customized design/user experience* (customized CSS should be included in the page where it will be rendered and scripts should be dynamic only, custom static value should be defined on the page/component that the dependent component will be used).
- **CSS**: main.css is the main/body CSS of the app while per page or component should have contain their own CSS file.
- **Dependencies**: uninstall unnecessaries dependencies before committing.
- **Config Properties**: TBA
- **Config Class**: for generic config class, attached it on the root folder where `main.js` is placed (e.g. `router.js` is the config class for router view).
- **Assets**: `images, video, icons, fonts` are placed here in the asset folder. Create specific folder for the type of asset.