import 'react-testing-library/cleanup-after-each';

const MOCK_DATE = new Date(69);
const _Date = Date;

// @ts-ignore
global._Date = _Date;
// @ts-ignore
global.Date = jest.fn(() => MOCK_DATE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;
