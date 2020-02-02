import '@testing-library/jest-native/extend-expect';

global.self = global;
global.window = {};
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
