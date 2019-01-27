'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

let Trier =
/*#__PURE__*/
function () {
  function Trier(setting, fn) {
    _classCallCheck(this, Trier);

    this.fn = fn;
    this.setting = setting;
    this.__timerID = null;
    this.__currentTryCount = this.setting.tries;
  }

  _createClass(Trier, [{
    key: "decrementTryCount",
    value: function decrementTryCount() {
      if (this.__currentTryCount > 0) {
        this.__currentTryCount--;
      }
    }
  }, {
    key: "stillTrying",
    value: function stillTrying() {
      return this.__currentTryCount > 0;
    }
  }, {
    key: "abort",
    value: function abort() {
      if (this.__timerID == null) {
        return;
      }

      clearTimeout(this.__timerID);
      this.__currentTryCount = 0;
      this.__timerID = null;
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.__timerID == null) {
        return;
      }
    }
  }, {
    key: "resume",
    value: function resume() {}
  }, {
    key: "execute",
    value: function execute() {
      // wait timeouts -> call function -> wait timeouts -> call function
      this.__timerID = setTimeout(() => {
        if (this.stillTrying() === false) {
          return;
        }

        this.execute();
        this.decrementTryCount();
      }, this.setting.timeout);
    }
  }]);

  return Trier;
}();

function trytrytry(settings, fn) {
  const trier = new Trier(settings, fn);
  const publicController = {
    abort: trier.abort,
    pause: trier.pause,
    resume: trier.resume,
    ongoing: trier.stillTrying
  };
  return publicController;
}

module.exports = trytrytry;
