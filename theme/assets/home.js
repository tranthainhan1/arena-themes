!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){var o=n(4),i=n(5),r=n(6),s=n(7);e.exports=function(e){return o(e)||i(e)||r(e)||s()}},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.formatMoney=function(e,t){"string"==typeof e&&(e=e.replace(".",""));var n="",o=/\{\{\s*(\w+)\s*\}\}/,i=t||"${{amount}}";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:",",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".";if(isNaN(e)||null==e)return 0;var i=(e=(e/100).toFixed(t)).split("."),r=i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+n),s=i[1]?o+i[1]:"";return r+s}switch(i.match(o)[1]){case"amount":n=r(e,2);break;case"amount_no_decimals":n=r(e,0);break;case"amount_with_comma_separator":n=r(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":n=r(e,0,".",",")}return i.replace(o,n)}},function(e,t,n){var o=n(2);e.exports=function(e){if(Array.isArray(e))return o(e)}},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,t,n){var o=n(2);e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){"use strict";n.r(t);function o(e,t){this.container=function(e){if(!(e instanceof Element))throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");if(null===e.getAttribute("data-section-id"))throw new Error("Theme Sections: The section container provided does not have an id assigned to the data-section-id attribute.");return e}(e),this.id=e.getAttribute("data-section-id"),this.extensions=[],Object.assign(this,function(e){if(void 0!==e&&"object"!=typeof e||null===e)throw new TypeError("Theme Sections: The properties object provided is not a valid");return e}(t)),this.onLoad()}o.prototype={onLoad:Function.prototype,onUnload:Function.prototype,onSelect:Function.prototype,onDeselect:Function.prototype,onBlockSelect:Function.prototype,onBlockDeselect:Function.prototype,extend:function(e){this.extensions.push(e);var t=Object.assign({},e);delete t.init,Object.assign(this,t),"function"==typeof e.init&&e.init.apply(this)}},"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}return t},writable:!0,configurable:!0});window.Shopify=window.Shopify||{},window.Shopify.theme=window.Shopify.theme||{},window.Shopify.theme.sections=window.Shopify.theme.sections||{};var i=window.Shopify.theme.sections.registered=window.Shopify.theme.sections.registered||{},r=window.Shopify.theme.sections.instances=window.Shopify.theme.sections.instances||[];function s(e,t){if("string"!=typeof e)throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");if(void 0!==i[e])throw new Error('Theme Sections: A section of type "'+e+'" has already been registered. You cannot register the same section type twice');function n(e){o.call(this,e,t)}return n.constructor=o,n.prototype=Object.create(o.prototype),n.prototype.type=e,i[e]=n}function a(e,t){e=l(e),void 0===t&&(t=document.querySelectorAll("[data-section-type]")),t=d(t),e.forEach((function(e){var n=i[e];void 0!==n&&(t=t.filter((function(t){return!(c(t).length>0)&&(null!==t.getAttribute("data-section-type")&&(t.getAttribute("data-section-type")!==e||(r.push(new n(t)),!1)))})))}))}function c(e){var t=[];if(NodeList.prototype.isPrototypeOf(e)||Array.isArray(e))var n=e[0];if(e instanceof Element||n instanceof Element)d(e).forEach((function(e){t=t.concat(r.filter((function(t){return t.container===e})))}));else if("string"==typeof e||"string"==typeof n){l(e).forEach((function(e){t=t.concat(r.filter((function(t){return t.type===e})))}))}return t}function u(e){for(var t,n=0;n<r.length;n++)if(r[n].id===e){t=r[n];break}return t}function l(e){return"*"===e?e=Object.keys(i):"string"==typeof e?e=[e]:e.constructor===o?e=[e.prototype.type]:Array.isArray(e)&&e[0].constructor===o&&(e=e.map((function(e){return e.prototype.type}))),e=e.map((function(e){return e.toLowerCase()}))}function d(e){return NodeList.prototype.isPrototypeOf(e)&&e.length>0?e=Array.prototype.slice.call(e):NodeList.prototype.isPrototypeOf(e)&&0===e.length||null===e?e=[]:!Array.isArray(e)&&e instanceof Element&&(e=[e]),e}window.Shopify.designMode&&(document.addEventListener("shopify:section:load",(function(e){var t=e.detail.sectionId,n=e.target.querySelector('[data-section-id="'+t+'"]');null!==n&&a(n.getAttribute("data-section-type"),n)})),document.addEventListener("shopify:section:unload",(function(e){var t=e.detail.sectionId,n=e.target.querySelector('[data-section-id="'+t+'"]');"object"==typeof c(n)[0]&&c(n).forEach((function(e){var t=r.map((function(e){return e.id})).indexOf(e.id);r.splice(t,1),e.onUnload()}))})),document.addEventListener("shopify:section:select",(function(e){var t=u(e.detail.sectionId);"object"==typeof t&&t.onSelect(e)})),document.addEventListener("shopify:section:deselect",(function(e){var t=u(e.detail.sectionId);"object"==typeof t&&t.onDeselect(e)})),document.addEventListener("shopify:block:select",(function(e){var t=u(e.detail.sectionId);"object"==typeof t&&t.onBlockSelect(e)})),document.addEventListener("shopify:block:deselect",(function(e){var t=u(e.detail.sectionId);"object"==typeof t&&t.onBlockDeselect(e)})));var p=n(0),f=n.n(p),h=n(3),m={debounce:function(e,t){var n;return function(){for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];var s=function(){clearTimeout(n),e.apply(void 0,i)};clearTimeout(n),n=setTimeout(s,t)}},handleCollapse:function(e,t){var n=!0,o=!1;e.addEventListener("click",(function(){var e=this;if(n||o)if(n=!1,o=!1,t.classList.contains("show")){var i=t.offsetHeight;t.style.height="".concat(i,"px"),m.debounce((function(){t.style.height="0px"}),1)(),m.debounce((function(){t.style.height="",t.classList.remove("show"),e.classList.remove("show"),o=!0}),200)()}else{t.classList.add("show"),t.style.height="0px";var r=f()(t.children).reduce((function(e,t){return e+t.offsetHeight}),0);t.style.height="".concat(r,"px"),m.debounce((function(){t.style.height="",e.classList.add("show"),o=!0}),200)()}}))},initTNS:function(){function e(e){e.preventDefault()}f()(document.getElementsByClassName("js-tns")).forEach((function(t){var n=t.getAttribute("data-config"),o=JSON.parse(document.getElementById(n).innerHTML);o=Object.assign(o,{container:t});var i=tns(o);o.mouseDrag&&(i.events.on("dragMove",(function(t){f()(t.slideItems).forEach((function(t){var n=t.getElementsByTagName("a");f()(n).forEach((function(t){t.addEventListener("click",e)}))}))})),i.events.on("dragEnd",(function(t){f()(t.slideItems).forEach((function(t){var n=t.getElementsByTagName("a");f()(n).forEach((function(t){t.removeEventListener("click",e)}))}))})))}))},initHandleCollapse:function(){var e=document.getElementsByClassName("js-btn-collapse");f()(e).forEach((function(e){var t=e.getAttribute("data-target"),n=document.getElementById(t);m.handleCollapse(e,n)}))},initBackToTop:function(){var e=document.getElementById("back-to-top");e&&e.addEventListener("click",(function(e){window.scroll({top:0,left:0,behavior:"smooth"})})),window.addEventListener("scroll",(function(){window.pageYOffset>window.innerHeight?e.classList.add("show"):e.classList.remove("show")}))},addToCart:function(){var e=document.getElementsByClassName("js-add-to-card");f()(e).forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault();var t=e.target.closest("form");fetch("/cart/add.js",{method:"post",headers:new Headers,body:new URLSearchParams(m.serialize(t))}).then((function(e){fetch("/cart.js").then((function(e){return e.json()})).then((function(e){m.dispatchEvent("cartChange",e)}))})).catch((function(e){return console.log(e.message)}))}))}))},getCart:function(){fetch("/cart.js",{method:"get",headers:new Headers}).then((function(e){return e.json()})).then((function(e){0!==e.item_count&&(m.cart=e)}))},onCartChange:function(e,t){var n=document.getElementById("total_item_of_cart"),o=document.getElementById("cart_total"),i=document.getElementById("cart_container");switch(t){case"remove":i&&0===e.item_count&&i.classList.add("empty"),o.innerHTML=h.formatMoney(e.total_price,theme.currency.money)}n&&(n.innerHTML=e.item_count)},removeItemCart:function(){var e=document.getElementsByClassName("btn-remove");f()(e).forEach((function(e){e.addEventListener("click",(function(){var e=this.closest(".cart-item"),t=this.getAttribute("data-key");fetch("/cart/change.js",{method:"post",body:new URLSearchParams({id:t,quantity:0})}).then((function(e){return e.json})).then((function(e){return m.dispatchEvent("cartChange",e)}),e.remove())}))}))},registerEvents:function(e,t){void 0!==t?(this.eventContainers[e]=this.eventContainers[e]||[],this.eventContainers[e]=[].concat(f()(this.eventContainers[e]),[t])):console.error("container is not defined")},eventContainers:{},dispatchEvent:function(e,t){m.eventContainers[e].forEach((function(n){n&&n.dispatchEvent(new CustomEvent(e,{detail:t}))}))},serialize:function(e){for(var t=[],n=0;n<e.elements.length;n++){var o=e.elements[n];if(o.name&&!o.disabled&&"file"!==o.type&&"reset"!==o.type&&"submit"!==o.type&&"button"!==o.type)if("select-multiple"===o.type)for(var i=0;i<o.options.length;i++)o.options[i].selected&&t.push(encodeURIComponent(o.name)+"="+encodeURIComponent(o.options[i].value));else("checkbox"!==o.type&&"radio"!==o.type||o.checked)&&t.push(encodeURIComponent(o.name)+"="+encodeURIComponent(o.value))}return t.join("&")}},y=m,g={onLoad:function(){var e=this.container,t=e.getAttribute("data-setting");if(t){var n=document.createElement("li"),o=e.getElementsByClassName("js-btn-collapse")[0].getAttribute("data-target");n.setAttribute("id",o),n.classList="js-collapse collapse",n.style.listStyle="none",n.style.padding="0px";var i=e.querySelector(".paragraph-2 ul"),r=i.children;f()(r).forEach((function(e,o){o>t-1&&n.appendChild(e)})),i.appendChild(n)}}},v={onLoad:function(){var e=this.container;this.elms={btnMenu:e.querySelector(".js-handle-nav-mobile"),menuMobileContainer:e.querySelector(".js-nav-mobile"),elmTriggerCollapse:e.querySelectorAll(".js-trigger-collapse"),overlayMenuMobile:e.querySelector(".header .overlay-menu-mobile"),headerDesktop:e.getElementsByClassName("header-desktop")[0],openSearch:e.getElementsByClassName("js-open-search")[0],totalItemCart:document.getElementById("total_item_of_cart")},this.handleMenuMobile(),this.toggleSearch(),y.registerEvents("cartChange",this.elms.totalItemCart),this.elms.totalItemCart.addEventListener("cartChange",(function(e){var t=e.detail;this.innerHTML=t.item_count}))},handleMenuMobile:function(){var e=!0,t=!1,n=this.elms,o=n.btnMenu,i=n.overlayMenuMobile,r=n.menuMobileContainer;o.addEventListener("click",(function(n){(e||t)&&(e=!1,t=!1,o.classList.contains("show")?(document.body.classList.remove("sidebar-mobile-show"),o.classList.remove("show"),r.classList.remove("show"),document.body.classList.remove("popup-is-showing"),t=!0):(document.body.classList.add("sidebar-mobile-show"),o.classList.add("show"),r.classList.add("show"),document.body.classList.add("popup-is-showing"),t=!0))})),i.addEventListener("click",(function(){document.body.classList.remove("sidebar-mobile-show"),o.classList.remove("show"),r.classList.remove("show"),document.body.classList.remove("popup-is-showing")}))},toggleSearch:function(){var e=this;this.elms.openSearch.addEventListener("click",(function(t){var n=e.container.getElementsByClassName("search")[0],o=document.getElementById("search_mobile");window.innerWidth>991.9?n.classList.add("search-show"):o.classList.add("show")}))}},b={onLoad:function(){var e=this.container;this.elements={blocks:e.querySelectorAll(".footer-top__item.menu-item"),footerWrapper:e.querySelector(".footer .footer__wrapper")},this.handleCollapse(),this.handlePaddingFooter()},handleCollapse:function(){this.elements.blocks.forEach((function(e){var t=!0,n=!1,o=e.getElementsByClassName("js-collapse")[0],i=o.children;e.getElementsByClassName("js-trigger-collapse")[0].addEventListener("click",(function(e){if(t||n){t=!1,n=!1;var r=e.target.closest(".footer-top__item.menu-item");if(r.classList.contains("show")){var s=o.offsetHeight;o.style.height="".concat(s,"px"),y.debounce((function(){o.style.height="0px"}),1)(),y.debounce((function(){r.classList.remove("show"),o.style.height="",n=!0}),200)()}else{r.classList.add("show"),o.style.height="0px";var a=Object.values(i).reduce((function(e,t){return e+t.offsetHeight}),0);o.style.height="".concat(a,"px"),y.debounce((function(){o.style.height="",n=!0}),200)()}}}))}))},handlePaddingFooter:function(){var e=this.elements.footerWrapper,t=getComputedStyle(e),n=document.querySelector(".mobile-bar"),o=parseInt(t.paddingBottom);function i(){var t=n.offsetHeight;e.style.paddingBottom="".concat(t+o,"px")}window.innerWidth<992&&i(),window.addEventListener("resize",(function(){i()}))}},w=(function(e){function t(t){return e.apply(this,arguments)}t.toString=function(){return e.toString()}}((function(e){var t=this;fetch(e).then((function(e){return e.json()})).then((function(e){t.handleResults(e),t.handlePagination(e)}))})),n(1)),E=n.n(w),L=window,S=(L.requestAnimationFrame||L.webkitRequestAnimationFrame||L.mozRequestAnimationFrame||L.msRequestAnimationFrame,window);S.cancelAnimationFrame||S.mozCancelAnimationFrame;document.documentElement;document.createElement("_");try{var j=Object.defineProperty({},"passive",{get:function(){!0}});window.addEventListener("test",null,j)}catch(e){}Object.keys||(Object.keys=function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}),"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});(function(){function e(e){var t=this;this.container=e.container,this.product=e.product,this.singleOptionSelector=document.getElementsByClassName("single-option-selector"),this.currentVariant=this._getVariantFromOptions(),f()(this.singleOptionSelector).forEach((function(e){e.addEventListener("change",t._onSelectChange.bind(t))}))}e.prototype={_getVariantFromOptions:function(){var e=this._getCurrentOptions();return this.product.variants.find((function(t){return e.every((function(e){return e.value===t[e.index]}))}))},_onSelectChange:function(){var e=this._getVariantFromOptions();this.container.dispatchEvent(new CustomEvent("variantChange",{detail:e})),e&&(this._updateMasterSelect(e),this._updateImages(e),this._updatePrice(e),this._updateSKU(e),this.currentVariant=e)},_getCurrentOptions:function(){return f()(this.singleOptionSelector).map((function(e){var t={};return t.index=e.getAttribute("data-index"),t.value=e.value,t}))},_updateMasterSelect:function(e){document.getElementById("master_select").value=e.id},_updateHistoryState:function(e){if(history.replaceState&&e){var t=window.location.protocol+"//"+window.location.host+window.location.pathname+"?variant="+e.id;window.history.replaceState({path:t},"",t)}},_updateImages:function(e){var t=e.featured_image||{},n=this.currentVariant.featured_image||{};e.featured_image&&t.src!==n.src&&this.container.dispatchEvent(new CustomEvent("updateImage",{detail:t.position-1}))},_updatePrice:function(e){e.price===this.currentVariant.price&&e.compare_at_price===this.currentVariant.compare_at_price||this.container.dispatchEvent(new CustomEvent({detail:e}))},_updateSKU:function(e){e.sku!==this.currentVariant.sku&&this.container.dispatchEvent(new CustomEvent({detail:e}))}}})(),function(e){function t(t){return e.apply(this,arguments)}t.toString=function(){return e.toString()}}((function(e){var t=this;fetch(e).then((function(e){return e.json()})).then((function(e){t.handleResults(e),t.handlePagination(e)}))}));function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){E()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C={init:function(){var e=document.getElementsByClassName("js-search-input"),t=document.getElementById("search_template").innerHTML;f()(e).forEach((function(e){var n=e.closest("[data-search-container]"),o=n.getElementsByClassName("js-search-results")[0],i=n.getElementsByClassName("keyword")[0],r=n.getElementsByClassName("js-close-search")[0],s=n.getElementsByClassName("search-form")[0],a=n.getElementsByClassName("btn-view-all")[0],c=n.getAttribute("data-config"),u=JSON.parse(document.getElementById(c).innerHTML),l=u,d=l.parameters,p=l.productType,f=l.resourcesType;e.addEventListener("keyup",y.debounce((function(e){var n=e.target.value.trim();n?(i.innerHTML=n,u=Object.assign(d,{q:n}),o.classList.remove("is-loading","no-result","has-results"),o.classList.add("is-loading"),fetch("/search/suggest.json?"+new URLSearchParams(d)).then((function(e){return e.json()})).then((function(e){var n=C.handleResult(f,p,e.resources.results);if(n.hasResults){var i=Mustache.render(t,n);o.querySelector(".results .wrapper").innerHTML=i,o.classList.remove("is-loading"),o.classList.add("has-results")}else o.classList.remove("is-loading"),o.classList.add("no-result")}))):o.classList.remove("is-loading","no-result","has-results")}),500)),r.addEventListener("click",(function(e){var t=this.getAttribute("data-toggle");n.classList.remove(t),o.classList.remove("is-loading","no-result","has-results")})),a.addEventListener("click",(function(){s.submit()})),new MutationObserver((function(e){for(var t=["is-loading","no-result","has-results"],i=0;i<t.length;i++){if(o.classList.contains(t[i])){n.classList.add("is-typing");break}n.classList.remove("is-typing")}})).observe(o,{attributes:!0})}))},handleResult:function(e,t,n){var o=e.reduce((function(e,o){if("products"===o)switch(t){case"all":e=Object.assign(e,{products:{themes:n.products.filter((function(e){return e.type.match(/(themes|theme|Theme|Themes|THEME|THEMES)/gi)})),apps:n.products.filter((function(e){return e.type.match(/(app|apps|Apps|App|APP|APPS)/gi)}))}});break;case"themes":e=Object.assign(e,{products:{themes:n.products.filter((function(e){return e.type.match(/(themes|theme|Theme|Themes|THEME|THEMES)/gi)}))}});break;case"apps":e=Object.assign(e,{products:{apps:n.products.filter((function(e){return e.type.match(/(app|apps|Apps|App|APP|APPS)/gi)}))}});break;case"tasks":e=Object.assign(e,{products:{tasks:n.products.filter((function(e){return e.type.match(/(task|tasks|Task|Tasks|TASK|TASKS)/gi)}))}})}else e[o]=n[o];return e}),{}),i=e.reduce((function(e,t){return e+="products"===t?Object.keys(o.products).reduce((function(e,t){return e+=o.products[t].length}),0):o[t].length}),0);return _(_({},o),{},{hasResults:!!i,themes_title:theme.themes_title,apps_title:theme.apps_title,article_title:theme.popular_articles})}},k=C;window.lazySizesConfig=window.lazySizesConfig||{},lazySizesConfig.loadMode=1,s("header",v),s("footer",b),s("hero-banner",g),a("*"),k.init(),y.initTNS(),y.initHandleCollapse(),y.initBackToTop()}]);