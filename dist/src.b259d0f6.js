parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var e,s,o=[{logo:"C",href:"https://blog.csdn.net",note:"CSDN博客平台"},{logo:"Y",href:"https://www.yuque.com",note:"语雀，专业的云端知识库，为知识创作而生"}],t=[{href:"https://blog.csdn.net/qq_40029828/article/details/108920762",title:"#再读JS# （6）jQuery设计思想",info:"jQuery的基本设计思想和主要用法，就是&quot选择某个网页元素，然后对其进行某种操作&quot。"},{href:"https://blog.csdn.net/qq_40029828/article/details/108858868",title:"#再读JS# （5）JS世界",info:"__proto__用于存放共有属性的对象的地址，等同于其构造函数的prototype的地址"}],n=$(".siteLists"),l=$(".blogList"),i=$(".addSite"),a=$(".addBlog"),c=function(e){return e.replace("http://www.","").replace("https://www.","").replace("http://","").replace("https://","")},d=function(){return e=JSON.parse(localStorage.getItem("sites"))},r=function(){return s=JSON.parse(localStorage.getItem("blogs"))},p=function(){localStorage.setItem("sites",JSON.stringify(e))},h=function(){localStorage.setItem("blogs",JSON.stringify(s))};e=d()||o,s=r()||t;var f=!0,u=function(){f?(!$("#lovedSites").hasClass("selected")&&$("#lovedSites").addClass("selected"),$("#sites").hasClass("hidden")&&$("#sites").removeClass("hidden"),$("#lovedBlogs").hasClass("selected")&&$("#lovedBlogs").removeClass("selected"),!$("#blogs").hasClass("hidden")&&$("#blogs").addClass("hidden")):($("#lovedSites").hasClass("selected")&&$("#lovedSites").removeClass("selected"),!$("#sites").hasClass("hidden")&&$("#sites").addClass("hidden"),!$("#lovedBlogs").hasClass("selected")&&$("#lovedBlogs").addClass("selected"),$("#blogs").hasClass("hidden")&&$("#blogs").removeClass("hidden"))},g=function o(){u(),$(".siteLists .site").remove(),$(".blogList .blog").remove(),e.forEach(function(s,t){var n=$('\n        <li class="site"  data-id='.concat(t,'>\n        <span class="delete" data-id=').concat(t,'>\n        <svg class="icon" aria-hidden="true">\n        <use href="#icon-del"></use>\n        </svg>\n        </span>\n        <a href="').concat(s.href,'">\n        <div div class= "logo" > ').concat(s.logo,"</div>\n        <p>").concat(c(s.href),"</p>\n        <p>").concat(s.note,"</p>\n        </a >\n        </li > "));$(n).insertBefore(i).on("click",".delete",function(s){e.splice(t,1),p(),o()})}),s.forEach(function(e,t){var n=$(' <li class="blog">\n          <span class="delete" data-id='.concat(t,'>\n          <svg class="icon" aria-hidden="true">\n            <use href="#icon-del"></use>\n          </svg>\n        </span>\n        <a href="').concat(e.href,'">\n                <h5>').concat(e.title,"</h5>\n                <p>").concat(e.info,"</p>\n            </a>\n            </li>"));$(n).insertBefore(a).on("click",".delete",function(e){s.splice(t,1),h(),o()})})};g(),i.on("click",function(){var s={};s.href=window.prompt("输入你喜欢的网址："),null!==s.href&&(s.note=window.prompt("备注喜欢的原因："),null!==s.note&&(s.logo=c(s.href)[0].toUpperCase(),e.push(s),p(),g()))}),a.on("click",function(){var e={};e.href=window.prompt("输入博客地址："),null!==e.href&&(e.title=window.prompt("博客标题是："),null!==e.title&&(e.info=window.prompt("博客简介是："),null!==e.info&&(s.push(e),h(),g())))}),$(window).on("unload",function(){p(),h()}),$("#lovedSites").on("click",function(){f=f||!f,u()}),$("#lovedBlogs").on("click",function(){f=f?!f:f,u()}),$(document).keypress(function(s){console.log(s.key.toUpperCase()),e.forEach(function(e,o){e.logo===s.key.toUpperCase()&&window.open(e.href,"_blank")})}),$(".searchHead input").keypress(function(e){e.stopPropagation()});
},{}]},{},["Focm"], null)
//# sourceMappingURL=src.b259d0f6.js.map