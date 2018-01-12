import jsdom from 'jsdom';
import $ from 'jquery';

global.$ = global.jQuery = $;

global.document = jsdom.jsdom();
global.window =  jsdom.jsdom().defaultView;