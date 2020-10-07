// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var sitesDefault = [{
  logo: "C",
  href: "https://blog.csdn.net",
  note: "CSDN博客平台"
}, {
  logo: "Y",
  href: "https://www.yuque.com",
  note: "语雀，专业的云端知识库，为知识创作而生"
}];
var blogsDefault = [{
  href: "https://blog.csdn.net/qq_40029828/article/details/108920762",
  title: "#再读JS# （6）jQuery设计思想",
  info: "jQuery的基本设计思想和主要用法，就是&quot选择某个网页元素，然后对其进行某种操作&quot。"
}, {
  href: "https://blog.csdn.net/qq_40029828/article/details/108858868",
  title: "#再读JS# （5）JS世界",
  info: "__proto__用于存放共有属性的对象的地址，等同于其构造函数的prototype的地址"
}];
var listUl = $(".siteLists");
var listBlogs = $(".blogList");
var addLi = $(".addSite");
var addLiBlog = $(".addBlog");
var siteList;
var blogList;

var simplifyHref = function simplifyHref(href) {
  return href.replace("http://www.", "").replace("https://www.", "").replace('http://', '').replace("https://", "");
};

var getSites = function getSites() {
  siteList = JSON.parse(localStorage.getItem("sites"));
  return siteList;
};

var getBlogs = function getBlogs() {
  blogList = JSON.parse(localStorage.getItem("blogs"));
  return blogList;
};

var saveSites = function saveSites() {
  localStorage.setItem("sites", JSON.stringify(siteList));
};

var saveBlogs = function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogList));
};

siteList = getSites() || sitesDefault;
blogList = getBlogs() || blogsDefault; //用flag来标记现在应该展示sites还是blogs，true为sites，false为blogs

var flag = true;

var display = function display() {
  if (flag) {
    //判断site是不是选中了，没有就加上selected，判断下面是不是被hidden了，是就移除
    $("#lovedSites").hasClass("selected") ? null : $("#lovedSites").addClass("selected");
    $("#sites").hasClass("hidden") ? $("#sites").removeClass("hidden") : null;
    $("#lovedBlogs").hasClass("selected") ? $("#lovedBlogs").removeClass("selected") : null;
    $("#blogs").hasClass("hidden") ? null : $("#blogs").addClass("hidden");
  } else {
    $("#lovedSites").hasClass("selected") ? $("#lovedSites").removeClass("selected") : null;
    $("#sites").hasClass("hidden") ? null : $("#sites").addClass("hidden");
    $("#lovedBlogs").hasClass("selected") ? null : $("#lovedBlogs").addClass("selected");
    $("#blogs").hasClass("hidden") ? $("#blogs").removeClass("hidden") : null;
  }
};

var render = function render() {
  display();
  $(".siteLists .site").remove();
  $(".blogList .blog").remove();
  siteList.forEach(function (item, index) {
    var li = $("\n        <li class=\"site\"  data-id=".concat(index, ">\n        <span class=\"delete\" data-id=").concat(index, ">\n        <svg class=\"icon\" aria-hidden=\"true\">\n        <use xlink:href=\"#icon-del\"></use>\n        </svg>\n        </span>\n        <a href=\"").concat(item.href, "\">\n        <div div class= \"logo\" > ").concat(item.logo, "</div>\n        <p>").concat(simplifyHref(item.href), "</p>\n        <p>").concat(item.note, "</p>\n        </a >\n        </li > ")); //把删除函数写在每个小li遍历的时候，才能拿到index，高级

    $(li).insertBefore(addLi).on('click', '.delete', function (e) {
      siteList.splice(index, 1);
      saveSites();
      render();
    });
  });
  blogList.forEach(function (item, index) {
    var blogLi = $(" <li class=\"blog\">\n          <span class=\"delete\" data-id=".concat(index, ">\n          <svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-del\"></use>\n          </svg>\n        </span>\n        <a href=\"").concat(item.href, "\">\n                <h5>").concat(item.title, "</h5>\n                <p>").concat(item.info, "</p>\n            </a>\n            </li>"));
    $(blogLi).insertBefore(addLiBlog).on('click', '.delete', function (e) {
      blogList.splice(index, 1);
      saveBlogs();
      render();
    });
  });
};

render(); //判断用户是否点击了取消，点击确认则即使空值也保存下来

addLi.on("click", function () {
  var newSite = {};
  newSite["href"] = window.prompt("输入你喜欢的网址：");

  if (newSite["href"] !== null) {
    newSite["note"] = window.prompt("备注喜欢的原因：");

    if (newSite["note"] !== null) {
      newSite["logo"] = simplifyHref(newSite["href"])[0].toUpperCase();
      siteList.push(newSite);
      saveSites();
      render();
    }
  }
});
addLiBlog.on("click", function () {
  var newBlog = {};
  newBlog["href"] = window.prompt("输入博客地址：");

  if (newBlog["href"] !== null) {
    newBlog["title"] = window.prompt("博客标题是：");

    if (newBlog["title"] !== null) {
      newBlog["info"] = window.prompt("博客简介是：");

      if (newBlog["info"] !== null) {
        blogList.push(newBlog);
        saveBlogs();
        render();
      }
    }
  }
});
$(window).on("unload", function () {
  saveSites();
  saveBlogs();
});
$("#lovedSites").on("click", function () {
  flag = flag ? flag : !flag;
  display();
});
$("#lovedBlogs").on("click", function () {
  flag = flag ? !flag : flag;
  display();
}); //添加键盘事件，鼠标按下已有网站的logo的键时，直接跳转对应网站

$(document).keypress(function (e) {
  console.log(e.key.toUpperCase());
  siteList.forEach(function (item, index) {
    if (item.logo === e.key.toUpperCase()) {
      window.open(item.href, "_blank");
    }
  });
}); //因为input也在页面中，会冒泡触发上述键盘事件，需要取消冒泡

$(".searchHead input").keypress(function (e) {
  e.stopPropagation();
});
},{}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60416" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map