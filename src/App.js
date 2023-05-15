"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var logo_svg_1 = require("./logo.svg");
require("./App.css");
var DataDisplay_jsx_1 = require("./DataDisplay.jsx");
function App() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo_svg_1.default} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <DataDisplay_jsx_1.DataDisplay />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>);
}
exports.default = App;
