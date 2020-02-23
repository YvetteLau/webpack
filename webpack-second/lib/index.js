"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var Animal =
/*#__PURE__*/
function () {
  function Animal(name) {
    (0, _classCallCheck2["default"])(this, Animal);
    this.name = name;
  }

  (0, _createClass2["default"])(Animal, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);
  return Animal;
}();

var dog = new Animal('dog');
var _default = Animal;
exports["default"] = _default;