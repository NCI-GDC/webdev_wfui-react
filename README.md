# WFUI React

# Installation
## Install peer dependencies
```
npm install react@^0.14.7
npm install react-dom@^0.14.7
```
## Install other dependencies
```
npm install
```

## Install budo
```
npm install -g budo
```

## Install Webpack 
```
npm install -g webpack
```

# Run Component (hot reload)
```
npm start
http://192.168.59.3:9966/
```

# Bundle files with webpack
```
npm run build
```

# Run testing
```
npm test
```

# Notes
If
```
npm install -g budo
```
and / or
```
npm install -g webpack
```
fail, try the following:
```
sudo apt-get purge nodejs npm
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
```