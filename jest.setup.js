import 'react-native-browser-polyfill';
import '@testing-library/jest-native/extend-expect';

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
global.window = {};
