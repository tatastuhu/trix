/*
Trix 2.0.0-alpha
Copyright © 2021 Basecamp, LLC
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var copyObject = function(object = {}) {
    var key, result, value;
    result = {};
    for (key in object) {
      value = object[key];
      result[key] = value;
    }
    return result;
  };

  var objectsAreEqual = function(a = {}, b = {}) {
    var key, value;
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (key in a) {
      value = a[key];
      if (value !== b[key]) {
        return false;
      }
    }
    return true;
  };

  var copyValue, rangeValuesAreEqual;

  var normalizeRange = function(range) {
    var ref;
    if (range == null) {
      return;
    }
    if (!Array.isArray(range)) {
      range = [range, range];
    }
    return [copyValue(range[0]), copyValue((ref = range[1]) != null ? ref : range[0])];
  };

  var rangeIsCollapsed = function(range) {
    var end, start;
    if (range == null) {
      return;
    }
    [start, end] = ranges.normalizeRange(range);
    return rangeValuesAreEqual(start, end);
  };

  var rangesAreEqual = function(leftRange, rightRange) {
    var leftEnd, leftStart, rightEnd, rightStart;
    if (!((leftRange != null) && (rightRange != null))) {
      return;
    }
    [leftStart, leftEnd] = ranges.normalizeRange(leftRange);
    [rightStart, rightEnd] = ranges.normalizeRange(rightRange);
    return rangeValuesAreEqual(leftStart, rightStart) && rangeValuesAreEqual(leftEnd, rightEnd);
  };

  copyValue = function(value) {
    if (typeof value === "number") {
      return value;
    } else {
      return copyObject(value);
    }
  };

  rangeValuesAreEqual = function(left, right) {
    if (typeof left === "number") {
      return left === right;
    } else {
      return objectsAreEqual(left, right);
    }
  };

  var lang;

  var lang$1 = lang = {
    attachFiles: "Attach Files",
    bold: "Bold",
    bullets: "Bullets",
    byte: "Byte",
    bytes: "Bytes",
    captionPlaceholder: "Add a caption…",
    code: "Code",
    heading1: "Heading",
    indent: "Increase Level",
    italic: "Italic",
    link: "Link",
    numbers: "Numbers",
    outdent: "Decrease Level",
    quote: "Quote",
    redo: "Redo",
    remove: "Remove",
    strike: "Strikethrough",
    undo: "Undo",
    unlink: "Unlink",
    url: "URL",
    urlPlaceholder: "Enter a URL…",
    GB: "GB",
    KB: "KB",
    MB: "MB",
    PB: "PB",
    TB: "TB"
  };

  var css;

  var css$1 = css = {
    attachment: "attachment",
    attachmentCaption: "attachment__caption",
    attachmentCaptionEditor: "attachment__caption-editor",
    attachmentMetadata: "attachment__metadata",
    attachmentMetadataContainer: "attachment__metadata-container",
    attachmentName: "attachment__name",
    attachmentProgress: "attachment__progress",
    attachmentSize: "attachment__size",
    attachmentToolbar: "attachment__toolbar",
    attachmentGallery: "attachment-gallery"
  };

  var attributes;

  attributes = {
    default: {
      tagName: "div",
      parse: false
    },
    quote: {
      tagName: "blockquote",
      nestable: true
    },
    heading1: {
      tagName: "h1",
      terminal: true,
      breakOnReturn: true,
      group: false
    },
    code: {
      tagName: "pre",
      terminal: true,
      text: {
        plaintext: true
      }
    },
    bulletList: {
      tagName: "ul",
      parse: false
    },
    bullet: {
      tagName: "li",
      listAttribute: "bulletList",
      group: false,
      nestable: true,
      test: function(element) {
        return tagName(element.parentNode) === attributes[this.listAttribute].tagName;
      }
    },
    numberList: {
      tagName: "ol",
      parse: false
    },
    number: {
      tagName: "li",
      listAttribute: "numberList",
      group: false,
      nestable: true,
      test: function(element) {
        return tagName(element.parentNode) === attributes[this.listAttribute].tagName;
      }
    },
    attachmentGallery: {
      tagName: "div",
      exclusive: true,
      terminal: true,
      parse: false,
      group: false
    }
  };

  var blockAttributes = attributes;

  var fileSize, sizes;

  sizes = [lang$1.bytes, lang$1.KB, lang$1.MB, lang$1.GB, lang$1.TB, lang$1.PB];

  var fileSize$1 = fileSize = {
    prefix: "IEC",
    precision: 2,
    formatter: function(number) {
      var base, exp, humanSize, string, withoutInsignificantZeros;
      switch (number) {
        case 0:
          return `0 ${lang$1.bytes}`;
        case 1:
          return `1 ${lang$1.byte}`;
        default:
          base = (function() {
            switch (this.prefix) {
              case "SI":
                return 1000;
              case "IEC":
                return 1024;
            }
          }).call(this);
          exp = Math.floor(Math.log(number) / Math.log(base));
          humanSize = number / Math.pow(base, exp);
          string = humanSize.toFixed(this.precision);
          withoutInsignificantZeros = string.replace(/0*$/, "").replace(/\.$/, "");
          return `${withoutInsignificantZeros} ${sizes[exp]}`;
      }
    }
  };

  var name = "trix";
  var version = "2.0.0-alpha";
  var description = "A rich text editor for everyday writing";
  var main = "dist/trix.js";
  var style = "dist/trix.css";
  var files = [
  	"dist/*.css",
  	"dist/*.js"
  ];
  var repository = {
  	type: "git",
  	url: "git+https://github.com/basecamp/trix.git"
  };
  var keywords = [
  	"rich text",
  	"wysiwyg",
  	"editor"
  ];
  var author = "Basecamp, LLC";
  var license = "MIT";
  var bugs = {
  	url: "https://github.com/basecamp/trix/issues"
  };
  var homepage = "https://trix-editor.org/";
  var devDependencies = {
  	"@rollup/plugin-json": "^4.1.0",
  	coffeescript: "^2.5.1",
  	esm: "^3.2.25",
  	karma: "5.0.2",
  	"karma-chrome-launcher": "3.1.0",
  	"karma-qunit": "^4.1.2",
  	"karma-sauce-launcher": "^4.3.6",
  	qunit: "^2.16.0",
  	rollup: "^2.56.3",
  	"rollup-plugin-coffee-script": "^2.0.0",
  	"rollup-plugin-commonjs": "^10.1.0",
  	"rollup-plugin-filesize": "^9.1.1",
  	"rollup-plugin-includepaths": "^0.2.4",
  	"rollup-plugin-node-resolve": "^5.2.0",
  	svgo: "^0.6.1"
  };
  var scripts = {
  	build: "rollup -c",
  	test: "yarn run build && karma start"
  };
  var dependencies = {
  };
  var _package = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	style: style,
  	files: files,
  	repository: repository,
  	keywords: keywords,
  	author: author,
  	license: license,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies,
  	scripts: scripts,
  	dependencies: dependencies
  };

  var VERSION = version;

  var ZERO_WIDTH_SPACE = "\uFEFF";

  var NON_BREAKING_SPACE = "\u00A0";

  var OBJECT_REPLACEMENT_CHARACTER = "\uFFFC";

  var browser = {
    // Android emits composition events when moving the cursor through existing text
    // Introduced in Chrome 65: https://bugs.chromium.org/p/chromium/issues/detail?id=764439#c9
    composesExistingText: /Android.*Chrome/.test(navigator.userAgent),
    // IE 11 activates resizing handles on editable elements that have "layout"
    forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent),
    // https://www.w3.org/TR/input-events-1/ + https://www.w3.org/TR/input-events-2/
    supportsInputEvents: (function() {
      var i, len, property, ref;
      if (typeof InputEvent === "undefined") {
        return false;
      }
      ref = ["data", "getTargetRanges", "inputType"];
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        if (!(property in InputEvent.prototype)) {
          return false;
        }
      }
      return true;
    })()
  };

  var BasicObject, apply, parseProxyMethodExpression, proxyMethodExpressionPattern;

  var BasicObject$1 = BasicObject = class BasicObject {
    static proxyMethod(expression) {
      var name, optional, toMethod, toProperty;
      ({name, toMethod, toProperty, optional} = parseProxyMethodExpression(expression));
      return this.prototype[name] = function() {
        var object, subject;
        object = toMethod != null ? optional ? typeof this[toMethod] === "function" ? this[toMethod]() : void 0 : this[toMethod]() : toProperty != null ? this[toProperty] : void 0;
        if (optional) {
          subject = object != null ? object[name] : void 0;
          if (subject != null) {
            return apply.call(subject, object, arguments);
          }
        } else {
          subject = object[name];
          return apply.call(subject, object, arguments);
        }
      };
    }

  };

  parseProxyMethodExpression = function(expression) {
    var args, match;
    if (!(match = expression.match(proxyMethodExpressionPattern))) {
      throw new Error(`can't parse @proxyMethod expression: ${expression}`);
    }
    args = {
      name: match[4]
    };
    if (match[2] != null) {
      args.toMethod = match[1];
    } else {
      args.toProperty = match[1];
    }
    if (match[3] != null) {
      args.optional = true;
    }
    return args;
  };

  ({apply} = Function.prototype);

  proxyMethodExpressionPattern = /^(.+?)(\(\))?(\?)?\.(.+?)$/;

  var ObjectGroup;

  var ObjectGroup$1 = ObjectGroup = class ObjectGroup {
    static groupObjects(ungroupedObjects = [], {depth, asTree} = {}) {
      var base, group, i, len, object, objects;
      if (asTree) {
        if (depth == null) {
          depth = 0;
        }
      }
      objects = [];
      for (i = 0, len = ungroupedObjects.length; i < len; i++) {
        object = ungroupedObjects[i];
        if (group) {
          if ((typeof object.canBeGrouped === "function" ? object.canBeGrouped(depth) : void 0) && (typeof (base = group[group.length - 1]).canBeGroupedWith === "function" ? base.canBeGroupedWith(object, depth) : void 0)) {
            group.push(object);
            continue;
          } else {
            objects.push(new this(group, {depth, asTree}));
            group = null;
          }
        }
        if (typeof object.canBeGrouped === "function" ? object.canBeGrouped(depth) : void 0) {
          group = [object];
        } else {
          objects.push(object);
        }
      }
      if (group) {
        objects.push(new this(group, {depth, asTree}));
      }
      return objects;
    }

    constructor(objects1 = [], {depth, asTree}) {
      this.objects = objects1;
      if (asTree) {
        this.depth = depth;
        this.objects = this.constructor.groupObjects(this.objects, {
          asTree,
          depth: this.depth + 1
        });
      }
    }

    getObjects() {
      return this.objects;
    }

    getDepth() {
      return this.depth;
    }

    getCacheKey() {
      var i, keys, len, object, ref;
      keys = ["objectGroup"];
      ref = this.getObjects();
      for (i = 0, len = ref.length; i < len; i++) {
        object = ref[i];
        keys.push(object.getCacheKey());
      }
      return keys.join("/");
    }

  };

  var ObjectView,
    indexOf$1 = [].indexOf;

  // import ObjectGroupView from "views/object_group_view"
  var ObjectView$1 = ObjectView = class ObjectView extends BasicObject$1 {
    constructor(object1, options1 = {}) {
      super();
      this.object = object1;
      this.options = options1;
      this.childViews = [];
      this.rootView = this;
    }

    getNodes() {
      var i, len, node, ref, results;
      if (this.nodes == null) {
        this.nodes = this.createNodes();
      }
      ref = this.nodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        results.push(node.cloneNode(true));
      }
      return results;
    }

    invalidate() {
      var ref;
      this.nodes = null;
      this.childViews = [];
      return (ref = this.parentView) != null ? ref.invalidate() : void 0;
    }

    invalidateViewForObject(object) {
      var ref;
      return (ref = this.findViewForObject(object)) != null ? ref.invalidate() : void 0;
    }

    findOrCreateCachedChildView(viewClass, object, options) {
      var view;
      if (view = this.getCachedViewForObject(object)) {
        this.recordChildView(view);
      } else {
        view = this.createChildView(...arguments);
        this.cacheViewForObject(view, object);
      }
      return view;
    }

    createChildView(viewClass, object, options = {}) {
      var view;
      if (object instanceof ObjectGroup$1) {
        options.viewClass = viewClass;
        viewClass = ObjectGroupView;
      }
      view = new viewClass(object, options);
      return this.recordChildView(view);
    }

    recordChildView(view) {
      view.parentView = this;
      view.rootView = this.rootView;
      this.childViews.push(view);
      return view;
    }

    getAllChildViews() {
      var childView, i, len, ref, views;
      views = [];
      ref = this.childViews;
      for (i = 0, len = ref.length; i < len; i++) {
        childView = ref[i];
        views.push(childView);
        views = views.concat(childView.getAllChildViews());
      }
      return views;
    }

    findElement() {
      return this.findElementForObject(this.object);
    }

    findElementForObject(object) {
      var id;
      if (id = object != null ? object.id : void 0) {
        return this.rootView.element.querySelector(`[data-trix-id='${id}']`);
      }
    }

    findViewForObject(object) {
      var i, len, ref, view;
      ref = this.getAllChildViews();
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        if (view.object === object) {
          return view;
        }
      }
    }

    getViewCache() {
      if (this.rootView === this) {
        if (this.isViewCachingEnabled()) {
          return this.viewCache != null ? this.viewCache : this.viewCache = {};
        }
      } else {
        return this.rootView.getViewCache();
      }
    }

    isViewCachingEnabled() {
      return this.shouldCacheViews !== false;
    }

    enableViewCaching() {
      return this.shouldCacheViews = true;
    }

    disableViewCaching() {
      return this.shouldCacheViews = false;
    }

    getCachedViewForObject(object) {
      var ref;
      return (ref = this.getViewCache()) != null ? ref[object.getCacheKey()] : void 0;
    }

    cacheViewForObject(view, object) {
      var ref;
      return (ref = this.getViewCache()) != null ? ref[object.getCacheKey()] = view : void 0;
    }

    garbageCollectCachedViews() {
      var cache, key, objectKeys, results, view, views;
      if (cache = this.getViewCache()) {
        views = this.getAllChildViews().concat(this);
        objectKeys = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = views.length; i < len; i++) {
            view = views[i];
            results.push(view.object.getCacheKey());
          }
          return results;
        })();
        results = [];
        for (key in cache) {
          if (indexOf$1.call(objectKeys, key) < 0) {
            results.push(delete cache[key]);
          }
        }
        return results;
      }
    }

  };

  var AttachmentView, htmlContainsTagName;

  var AttachmentView$1 = AttachmentView = (function() {
    var createCursorTarget;

    class AttachmentView extends ObjectView$1 {
      constructor() {
        super();
        this.attachment = this.object;
        this.attachment.uploadProgressDelegate = this;
        this.attachmentPiece = this.options.piece;
      }

      createContentNodes() {
        return [];
      }

      createNodes() {
        var figure, href, i, innerElement, len, node, ref;
        figure = innerElement = makeElement({
          tagName: "figure",
          className: this.getClassName(),
          data: this.getData(),
          editable: false
        });
        if (href = this.getHref()) {
          innerElement = makeElement({
            tagName: "a",
            editable: false,
            attributes: {
              href,
              tabindex: -1
            }
          });
          figure.appendChild(innerElement);
        }
        if (this.attachment.hasContent()) {
          innerElement.innerHTML = this.attachment.getContent();
        } else {
          ref = this.createContentNodes();
          for (i = 0, len = ref.length; i < len; i++) {
            node = ref[i];
            innerElement.appendChild(node);
          }
        }
        innerElement.appendChild(this.createCaptionElement());
        if (this.attachment.isPending()) {
          this.progressElement = makeElement({
            tagName: "progress",
            attributes: {
              class: css$1.attachmentProgress,
              value: this.attachment.getUploadProgress(),
              max: 100
            },
            data: {
              trixMutable: true,
              trixStoreKey: ["progressElement", this.attachment.id].join("/")
            }
          });
          figure.appendChild(this.progressElement);
        }
        return [createCursorTarget("left"), figure, createCursorTarget("right")];
      }

      createCaptionElement() {
        var caption, captionConfig, figcaption, name, nameElement, size, sizeElement;
        figcaption = makeElement({
          tagName: "figcaption",
          className: css$1.attachmentCaption
        });
        if (caption = this.attachmentPiece.getCaption()) {
          figcaption.classList.add(`${css$1.attachmentCaption}--edited`);
          figcaption.textContent = caption;
        } else {
          captionConfig = this.getCaptionConfig();
          if (captionConfig.name) {
            name = this.attachment.getFilename();
          }
          if (captionConfig.size) {
            size = this.attachment.getFormattedFilesize();
          }
          if (name) {
            nameElement = makeElement({
              tagName: "span",
              className: css$1.attachmentName,
              textContent: name
            });
            figcaption.appendChild(nameElement);
          }
          if (size) {
            if (name) {
              figcaption.appendChild(document.createTextNode(" "));
            }
            sizeElement = makeElement({
              tagName: "span",
              className: css$1.attachmentSize,
              textContent: size
            });
            figcaption.appendChild(sizeElement);
          }
        }
        return figcaption;
      }

      getClassName() {
        var extension, names;
        names = [css$1.attachment, `${css$1.attachment}--${this.attachment.getType()}`];
        if (extension = this.attachment.getExtension()) {
          names.push(`${css$1.attachment}--${extension}`);
        }
        return names.join(" ");
      }

      getData() {
        var attributes, data;
        data = {
          trixAttachment: JSON.stringify(this.attachment),
          trixContentType: this.attachment.getContentType(),
          trixId: this.attachment.id
        };
        ({attributes} = this.attachmentPiece);
        if (!attributes.isEmpty()) {
          data.trixAttributes = JSON.stringify(attributes);
        }
        if (this.attachment.isPending()) {
          data.trixSerialize = false;
        }
        return data;
      }

      getHref() {
        if (!htmlContainsTagName(this.attachment.getContent(), "a")) {
          return this.attachment.getHref();
        }
      }

      getCaptionConfig() {
        var captionConfig, ref, type;
        type = this.attachment.getType();
        captionConfig = copyObject((ref = attachments$1[type]) != null ? ref.caption : void 0);
        if (type === "file") {
          captionConfig.name = true;
        }
        return captionConfig;
      }

      findProgressElement() {
        var ref;
        return (ref = this.findElement()) != null ? ref.querySelector("progress") : void 0;
      }

      // Attachment delegate
      attachmentDidChangeUploadProgress() {
        var ref, value;
        value = this.attachment.getUploadProgress();
        return (ref = this.findProgressElement()) != null ? ref.value = value : void 0;
      }

    };

    AttachmentView.attachmentSelector = "[data-trix-attachment]";

    createCursorTarget = function(name) {
      return makeElement({
        tagName: "span",
        textContent: ZERO_WIDTH_SPACE,
        data: {
          trixCursorTarget: name,
          trixSerialize: false
        }
      });
    };

    return AttachmentView;

  }).call(undefined);

  htmlContainsTagName = function(html, tagName) {
    var div;
    div = makeElement("div");
    div.innerHTML = html != null ? html : "";
    return div.querySelector(tagName);
  };

  var textAttributes;

  var textAttributes$1 = textAttributes = {
    bold: {
      tagName: "strong",
      inheritable: true,
      parser: function(element) {
        var style;
        style = window.getComputedStyle(element);
        return style["fontWeight"] === "bold" || style["fontWeight"] >= 600;
      }
    },
    italic: {
      tagName: "em",
      inheritable: true,
      parser: function(element) {
        var style;
        style = window.getComputedStyle(element);
        return style["fontStyle"] === "italic";
      }
    },
    href: {
      groupTagName: "a",
      parser: function(element) {
        var attachmentSelector, link, matchingSelector;
        ({attachmentSelector} = AttachmentView$1);
        matchingSelector = `a:not(${attachmentSelector})`;
        if (link = findClosestElementFromNode(element, {matchingSelector})) {
          return link.getAttribute("href");
        }
      }
    },
    strike: {
      tagName: "del",
      inheritable: true
    },
    frozen: {
      style: {
        "backgroundColor": "highlight"
      }
    }
  };

  // Not all changes to a Trix document result in an undo entry being added to
  // the stack. Trix aggregates successive changes into a single undo entry for
  // typing and for attribute changes to the same selected range. The "undo
  // interval" specifies how often, in milliseconds, these aggregate entries are
  // split (or prevents splitting them at all when set to 0).
  var undoInterval;

  var undoInterval$1 = undoInterval = 5000;

  var attachments;

  var attachments$1 = attachments = {
    preview: {
      presentation: "gallery",
      caption: {
        name: true,
        size: true
      }
    },
    file: {
      caption: {
        size: true
      }
    }
  };

  var keyNames;

  var keyNames$1 = keyNames = {
    "8": "backspace",
    "9": "tab",
    "13": "return",
    "27": "escape",
    "37": "left",
    "39": "right",
    "46": "delete",
    "68": "d",
    "72": "h",
    "79": "o"
  };

  var toolbar;

  var toolbar$1 = toolbar = {
    getDefaultHTML: function() {
      return `<div class="trix-button-row">
  <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="${lang$1.bold}" tabindex="-1">${lang$1.bold}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="${lang$1.italic}" tabindex="-1">${lang$1.italic}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="${lang$1.strike}" tabindex="-1">${lang$1.strike}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="${lang$1.link}" tabindex="-1">${lang$1.link}</button>
  </span>

  <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="${lang$1.heading1}" tabindex="-1">${lang$1.heading1}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="${lang$1.quote}" tabindex="-1">${lang$1.quote}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="${lang$1.code}" tabindex="-1">${lang$1.code}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="${lang$1.bullets}" tabindex="-1">${lang$1.bullets}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="${lang$1.numbers}" tabindex="-1">${lang$1.numbers}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="${lang$1.outdent}" tabindex="-1">${lang$1.outdent}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="${lang$1.indent}" tabindex="-1">${lang$1.indent}</button>
  </span>

  <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="${lang$1.attachFiles}" tabindex="-1">${lang$1.attachFiles}</button>
  </span>

  <span class="trix-button-group-spacer"></span>

  <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="${lang$1.undo}" tabindex="-1">${lang$1.undo}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="${lang$1.redo}" tabindex="-1">${lang$1.redo}</button>
  </span>
</div>

<div class="trix-dialogs" data-trix-dialogs>
  <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
    <div class="trix-dialog__link-fields">
      <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="${lang$1.urlPlaceholder}" aria-label="${lang$1.url}" required data-trix-input>
      <div class="trix-button-group">
        <input type="button" class="trix-button trix-button--dialog" value="${lang$1.link}" data-trix-method="setAttribute">
        <input type="button" class="trix-button trix-button--dialog" value="${lang$1.unlink}" data-trix-method="removeAttribute">
      </div>
    </div>
  </div>
</div>`;
    }
  };

  var input;

  input = {
    level2Enabled: true,
    getLevel: function() {
      if (this.level2Enabled && browser.supportsInputEvents) {
        return 2;
      } else {
        return 0;
      }
    },
    pickFiles: function(callback) {
      input = makeElement("input", {
        type: "file",
        multiple: true,
        hidden: true,
        id: this.fileInputId
      });
      input.addEventListener("change", function() {
        callback(input.files);
        return removeNode(input);
      });
      removeNode(document.getElementById(this.fileInputId));
      document.body.appendChild(input);
      return input.click();
    },
    fileInputId: `trix-file-input-${Date.now().toString(16)}`
  };

  var input$1 = input;

  var config;

  config = {lang: lang$1, css: css$1, blockAttributes, fileSize: fileSize$1, textAttributes: textAttributes$1, toolbar: toolbar$1, undoInterval: undoInterval$1, attachments: attachments$1, keyNames: keyNames$1, input: input$1};

  var config$1 = config;

  var config$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    lang: lang$1,
    css: css$1,
    blockAttributes: blockAttributes,
    fileSize: fileSize$1,
    textAttributes: textAttributes$1,
    toolbar: toolbar$1,
    undoInterval: undoInterval$1,
    attachments: attachments$1,
    keyNames: keyNames$1,
    input: input$1,
    'default': config$1
  });

  var extend = function(properties) {
    var key, value;
    for (key in properties) {
      value = properties[key];
      this[key] = value;
    }
    return this;
  };

  var blockTagNames, html, match, ref, ref1, ref2,
    indexOf = [].indexOf;

  html = document.documentElement;

  match = (ref = (ref1 = (ref2 = html.matchesSelector) != null ? ref2 : html.webkitMatchesSelector) != null ? ref1 : html.msMatchesSelector) != null ? ref : html.mozMatchesSelector;

  blockTagNames = void 0;

  var handleEvent = function(eventName, {onElement, matchingSelector, withCallback, inPhase, preventDefault, times} = {}) {
    var callback, element, handler, selector, useCapture;
    element = onElement != null ? onElement : html;
    selector = matchingSelector;
    callback = withCallback;
    useCapture = inPhase === "capturing";
    handler = function(event) {
      var target;
      if ((times != null) && --times === 0) {
        handler.destroy();
      }
      target = dom.findClosestElementFromNode(event.target, {
        matchingSelector: selector
      });
      if (target != null) {
        if (withCallback != null) {
          withCallback.call(target, event, target);
        }
        if (preventDefault) {
          return event.preventDefault();
        }
      }
    };
    handler.destroy = function() {
      return element.removeEventListener(eventName, handler, useCapture);
    };
    element.addEventListener(eventName, handler, useCapture);
    return handler;
  };

  var handleEventOnce = function(eventName, options = {}) {
    options.times = 1;
    return handleEvent(eventName, options);
  };

  var triggerEvent = function(eventName, {onElement, bubbles, cancelable, attributes} = {}) {
    var element, event;
    element = onElement != null ? onElement : html;
    bubbles = bubbles !== false;
    cancelable = cancelable !== false;
    event = document.createEvent("Events");
    event.initEvent(eventName, bubbles, cancelable);
    if (attributes != null) {
      extend.call(event, attributes);
    }
    return element.dispatchEvent(event);
  };

  var elementMatchesSelector = function(element, selector) {
    if ((element != null ? element.nodeType : void 0) === 1) {
      return match.call(element, selector);
    }
  };

  var findClosestElementFromNode = function(node, {matchingSelector, untilNode} = {}) {
    while (!((node == null) || node.nodeType === Node.ELEMENT_NODE)) {
      node = node.parentNode;
    }
    if (node == null) {
      return;
    }
    if (matchingSelector != null) {
      if (node.closest && (untilNode == null)) {
        return node.closest(matchingSelector);
      } else {
        while (node && node !== untilNode) {
          if (dom.elementMatchesSelector(node, matchingSelector)) {
            return node;
          }
          node = node.parentNode;
        }
      }
    } else {
      return node;
    }
  };

  var findInnerElement = function(element) {
    while (element != null ? element.firstElementChild : void 0) {
      element = element.firstElementChild;
    }
    return element;
  };

  var innerElementIsActive = function(element) {
    return document.activeElement !== element && dom.elementContainsNode(element, document.activeElement);
  };

  var elementContainsNode = function(element, node) {
    if (!(element && node)) {
      return;
    }
    while (node) {
      if (node === element) {
        return true;
      }
      node = node.parentNode;
    }
  };

  var findNodeFromContainerAndOffset = function(container, offset) {
    var ref3;
    if (!container) {
      return;
    }
    if (container.nodeType === Node.TEXT_NODE) {
      return container;
    } else if (offset === 0) {
      return (ref3 = container.firstChild) != null ? ref3 : container;
    } else {
      return container.childNodes.item(offset - 1);
    }
  };

  var findElementFromContainerAndOffset = function(container, offset) {
    var node;
    node = dom.findNodeFromContainerAndOffset(container, offset);
    return dom.findClosestElementFromNode(node);
  };

  var findChildIndexOfNode = function(node) {
    var childIndex;
    if (!(node != null ? node.parentNode : void 0)) {
      return;
    }
    childIndex = 0;
    while (node = node.previousSibling) {
      childIndex++;
    }
    return childIndex;
  };

  var removeNode = function(node) {
    var ref3;
    return node != null ? (ref3 = node.parentNode) != null ? ref3.removeChild(node) : void 0 : void 0;
  };

  var walkTree = function(tree, {onlyNodesOfType, usingFilter, expandEntityReferences} = {}) {
    var whatToShow;
    whatToShow = (function() {
      switch (onlyNodesOfType) {
        case "element":
          return NodeFilter.SHOW_ELEMENT;
        case "text":
          return NodeFilter.SHOW_TEXT;
        case "comment":
          return NodeFilter.SHOW_COMMENT;
        default:
          return NodeFilter.SHOW_ALL;
      }
    })();
    return document.createTreeWalker(tree, whatToShow, usingFilter != null ? usingFilter : null, expandEntityReferences === true);
  };

  var tagName = function(element) {
    var ref3;
    return element != null ? (ref3 = element.tagName) != null ? ref3.toLowerCase() : void 0 : void 0;
  };

  var makeElement = function(tagName, options = {}) {
    var childNode, className, element, i, j, key, len, len1, ref3, ref4, ref5, ref6, ref7, value;
    if (typeof tagName === "object") {
      options = tagName;
      ({tagName} = options);
    } else {
      options = {
        attributes: options
      };
    }
    element = document.createElement(tagName);
    if (options.editable != null) {
      if (options.attributes == null) {
        options.attributes = {};
      }
      options.attributes.contenteditable = options.editable;
    }
    if (options.attributes) {
      ref3 = options.attributes;
      for (key in ref3) {
        value = ref3[key];
        element.setAttribute(key, value);
      }
    }
    if (options.style) {
      ref4 = options.style;
      for (key in ref4) {
        value = ref4[key];
        element.style[key] = value;
      }
    }
    if (options.data) {
      ref5 = options.data;
      for (key in ref5) {
        value = ref5[key];
        element.dataset[key] = value;
      }
    }
    if (options.className) {
      ref6 = options.className.split(" ");
      for (i = 0, len = ref6.length; i < len; i++) {
        className = ref6[i];
        element.classList.add(className);
      }
    }
    if (options.textContent) {
      element.textContent = options.textContent;
    }
    if (options.childNodes) {
      ref7 = [].concat(options.childNodes);
      for (j = 0, len1 = ref7.length; j < len1; j++) {
        childNode = ref7[j];
        element.appendChild(childNode);
      }
    }
    return element;
  };

  var getBlockTagNames = function() {
    var key;
    return blockTagNames != null ? blockTagNames : blockTagNames = (function() {
      var results;
      results = [];
      for (key in blockAttributes) {
        ({tagName} = blockAttributes[key]);
        if (tagName) {
          results.push(tagName);
        }
      }
      return results;
    })();
  };

  var nodeIsBlockContainer = function(node) {
    return nodeIsBlockStartComment(node != null ? node.firstChild : void 0);
  };

  var nodeProbablyIsBlockContainer = function(node) {
    var ref3, ref4;
    return (ref3 = tagName(node), indexOf.call(dom.getBlockTagNames(), ref3) >= 0) && (ref4 = tagName(node.firstChild), indexOf.call(dom.getBlockTagNames(), ref4) < 0);
  };

  var nodeIsBlockStart = function(node, {strict} = {
      strict: true
    }) {
    if (strict) {
      return dom.nodeIsBlockStartComment(node);
    } else {
      return dom.nodeIsBlockStartComment(node) || (!dom.nodeIsBlockStartComment(node.firstChild) && dom.nodeProbablyIsBlockContainer(node));
    }
  };

  var nodeIsBlockStartComment = function(node) {
    return nodeIsCommentNode(node) && (node != null ? node.data : void 0) === "block";
  };

  var nodeIsCommentNode = function(node) {
    return (node != null ? node.nodeType : void 0) === Node.COMMENT_NODE;
  };

  var nodeIsCursorTarget = function(node, {name} = {}) {
    if (!node) {
      return;
    }
    if (dom.nodeIsTextNode(node)) {
      if (node.data === ZERO_WIDTH_SPACE) {
        if (name) {
          return node.parentNode.dataset.trixCursorTarget === name;
        } else {
          return true;
        }
      }
    } else {
      return dom.nodeIsCursorTarget(node.firstChild);
    }
  };

  var nodeIsAttachmentElement = function(node) {
    return elementMatchesSelector(node, AttachmentView$1.attachmentSelector);
  };

  var nodeIsEmptyTextNode = function(node) {
    return nodeIsTextNode(node) && (node != null ? node.data : void 0) === "";
  };

  var nodeIsTextNode = function(node) {
    return (node != null ? node.nodeType : void 0) === Node.TEXT_NODE;
  };

  var defer = function(fn) {
    return setTimeout(fn, 1);
  };

  var allAttributeNames, blockAttributeNames, listAttributeNames, textAttributeNames;

  allAttributeNames = null;

  blockAttributeNames = null;

  textAttributeNames = null;

  listAttributeNames = null;

  var getAllAttributeNames = function() {
    return allAttributeNames != null ? allAttributeNames : allAttributeNames = getTextAttributeNames().concat(getBlockAttributeNames());
  };

  var getBlockConfig = function(attributeName) {
    return blockAttributes[attributeName];
  };

  var getBlockAttributeNames = function() {
    return blockAttributeNames != null ? blockAttributeNames : blockAttributeNames = Object.keys(blockAttributes);
  };

  var getTextConfig = function(attributeName) {
    return textAttributes$1[attributeName];
  };

  var getTextAttributeNames = function() {
    return textAttributeNames != null ? textAttributeNames : textAttributeNames = Object.keys(textAttributes$1);
  };

  var getListAttributeNames = function() {
    var key, listAttribute;
    return listAttributeNames != null ? listAttributeNames : listAttributeNames = (function() {
      var results;
      results = [];
      for (key in blockAttributes) {
        ({listAttribute} = blockAttributes[key]);
        if (listAttribute != null) {
          results.push(listAttribute);
        }
      }
      return results;
    })();
  };

  var PreviewableAttachmentView$1;

  var previewable_attachment_view = PreviewableAttachmentView$1 = class PreviewableAttachmentView extends AttachmentView$1 {
    constructor() {
      super();
      this.attachment.previewDelegate = this;
    }

    createContentNodes() {
      this.image = makeElement({
        tagName: "img",
        attributes: {
          src: ""
        },
        data: {
          trixMutable: true
        }
      });
      this.refresh(this.image);
      return [this.image];
    }

    createCaptionElement() {
      var figcaption;
      figcaption = super.createCaptionElement();
      if (!figcaption.textContent) {
        figcaption.setAttribute("data-trix-placeholder", lang$1.captionPlaceholder);
      }
      return figcaption;
    }

    refresh(image) {
      var ref;
      if (image == null) {
        image = (ref = this.findElement()) != null ? ref.querySelector("img") : void 0;
      }
      if (image) {
        return this.updateAttributesForImage(image);
      }
    }

    updateAttributesForImage(image) {
      var height, previewURL, serializedAttributes, storeKey, url, width;
      url = this.attachment.getURL();
      previewURL = this.attachment.getPreviewURL();
      image.src = previewURL || url;
      if (previewURL === url) {
        image.removeAttribute("data-trix-serialized-attributes");
      } else {
        serializedAttributes = JSON.stringify({
          src: url
        });
        image.setAttribute("data-trix-serialized-attributes", serializedAttributes);
      }
      width = this.attachment.getWidth();
      height = this.attachment.getHeight();
      if (width != null) {
        image.width = width;
      }
      if (height != null) {
        image.height = height;
      }
      storeKey = ["imageElement", this.attachment.id, image.src, image.width, image.height].join("/");
      return image.dataset.trixStoreKey = storeKey;
    }

    // Attachment delegate
    attachmentDidChangeAttributes() {
      this.refresh(this.image);
      return this.refresh();
    }

  };

  var PieceView;

  var PieceView$1 = PieceView = (function() {
    var nbsp;

    class PieceView extends ObjectView$1 {
      constructor() {
        super();
        this.piece = this.object;
        this.attributes = this.piece.getAttributes();
        ({textConfig: this.textConfig, context: this.context} = this.options);
        if (this.piece.attachment) {
          this.attachment = this.piece.attachment;
        } else {
          this.string = this.piece.toString();
        }
      }

      createNodes() {
        var element, i, innerElement, len, node, nodes;
        nodes = this.attachment ? this.createAttachmentNodes() : this.createStringNodes();
        if (element = this.createElement()) {
          innerElement = findInnerElement(element);
          for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            innerElement.appendChild(node);
          }
          nodes = [element];
        }
        return nodes;
      }

      createAttachmentNodes() {
        var constructor, view;
        constructor = this.attachment.isPreviewable() ? PreviewableAttachmentView : AttachmentView$1;
        view = this.createChildView(constructor, this.piece.attachment, {piece: this.piece});
        return view.getNodes();
      }

      createStringNodes() {
        var element, i, index, len, length, node, nodes, ref, ref1, substring;
        if ((ref = this.textConfig) != null ? ref.plaintext : void 0) {
          return [document.createTextNode(this.string)];
        } else {
          nodes = [];
          ref1 = this.string.split("\n");
          for (index = i = 0, len = ref1.length; i < len; index = ++i) {
            substring = ref1[index];
            if (index > 0) {
              element = makeElement("br");
              nodes.push(element);
            }
            if (length = substring.length) {
              node = document.createTextNode(this.preserveSpaces(substring));
              nodes.push(node);
            }
          }
          return nodes;
        }
      }

      createElement() {
        var config, element, innerElement, key, pendingElement, ref, ref1, styles, value;
        styles = {};
        ref = this.attributes;
        for (key in ref) {
          value = ref[key];
          if (!(config = getTextConfig(key))) {
            continue;
          }
          if (config.tagName) {
            pendingElement = makeElement(config.tagName);
            if (innerElement) {
              innerElement.appendChild(pendingElement);
              innerElement = pendingElement;
            } else {
              element = innerElement = pendingElement;
            }
          }
          if (config.styleProperty) {
            styles[config.styleProperty] = value;
          }
          if (config.style) {
            ref1 = config.style;
            for (key in ref1) {
              value = ref1[key];
              styles[key] = value;
            }
          }
        }
        if (Object.keys(styles).length) {
          if (element == null) {
            element = makeElement("span");
          }
          for (key in styles) {
            value = styles[key];
            element.style[key] = value;
          }
        }
        return element;
      }

      createContainerElement() {
        var attributes, config, key, ref, value;
        ref = this.attributes;
        for (key in ref) {
          value = ref[key];
          if (config = getTextConfig(key)) {
            if (config.groupTagName) {
              attributes = {};
              attributes[key] = value;
              return makeElement(config.groupTagName, attributes);
            }
          }
        }
      }

      preserveSpaces(string) {
        if (this.context.isLast) {
          string = string.replace(/\ $/, nbsp);
        }
        string = string.replace(/(\S)\ {3}(\S)/g, `$1 ${nbsp} $2`).replace(/\ {2}/g, `${nbsp} `).replace(/\ {2}/g, ` ${nbsp}`);
        if (this.context.isFirst || this.context.followsWhitespace) {
          string = string.replace(/^\ /, nbsp);
        }
        return string;
      }

    };

    nbsp = NON_BREAKING_SPACE;

    return PieceView;

  }).call(undefined);

  var TextView;

  var TextView$1 = TextView = (function() {
    var endsWithWhitespace;

    class TextView extends ObjectView$1 {
      constructor() {
        super();
        this.text = this.object;
        ({textConfig: this.textConfig} = this.options);
      }

      createNodes() {
        var context, i, index, lastIndex, len, nodes, piece, pieces, previousPiece, view;
        nodes = [];
        pieces = ObjectGroup$1.groupObjects(this.getPieces());
        lastIndex = pieces.length - 1;
        for (index = i = 0, len = pieces.length; i < len; index = ++i) {
          piece = pieces[index];
          context = {};
          if (index === 0) {
            context.isFirst = true;
          }
          if (index === lastIndex) {
            context.isLast = true;
          }
          if (endsWithWhitespace(previousPiece)) {
            context.followsWhitespace = true;
          }
          view = this.findOrCreateCachedChildView(PieceView$1, piece, {textConfig: this.textConfig, context});
          nodes.push(...view.getNodes());
          previousPiece = piece;
        }
        return nodes;
      }

      getPieces() {
        var i, len, piece, ref, results;
        ref = this.text.getPieces();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          piece = ref[i];
          if (!piece.hasAttribute("blockBreak")) {
            results.push(piece);
          }
        }
        return results;
      }

    };

    endsWithWhitespace = function(piece) {
      return /\s$/.test(piece != null ? piece.toString() : void 0);
    };

    return TextView;

  }).call(undefined);

  var BlockView;

  var BlockView$1 = BlockView = class BlockView extends ObjectView$1 {
    constructor() {
      super();
      this.block = this.object;
      this.attributes = this.block.getAttributes();
    }

    createNodes() {
      var attributes, comment, element, i, len, node, nodes, ref, tagName, textConfig, textView;
      comment = document.createComment("block");
      nodes = [comment];
      if (this.block.isEmpty()) {
        nodes.push(makeElement("br"));
      } else {
        textConfig = (ref = getBlockConfig(this.block.getLastAttribute())) != null ? ref.text : void 0;
        textView = this.findOrCreateCachedChildView(TextView$1, this.block.text, {textConfig});
        nodes.push(...textView.getNodes());
        if (this.shouldAddExtraNewlineElement()) {
          nodes.push(makeElement("br"));
        }
      }
      if (this.attributes.length) {
        return nodes;
      } else {
        ({tagName} = blockAttributes.default);
        if (this.block.isRTL()) {
          attributes = {
            dir: "rtl"
          };
        }
        element = makeElement({tagName, attributes});
        for (i = 0, len = nodes.length; i < len; i++) {
          node = nodes[i];
          element.appendChild(node);
        }
        return [element];
      }
    }

    createContainerElement(depth) {
      var attributeName, attributes, className, size, tagName;
      attributeName = this.attributes[depth];
      ({tagName} = getBlockConfig(attributeName));
      if (depth === 0 && this.block.isRTL()) {
        attributes = {
          dir: "rtl"
        };
      }
      if (attributeName === "attachmentGallery") {
        size = this.block.getBlockBreakPosition();
        className = `${css$1.attachmentGallery} ${css$1.attachmentGallery}--${size}`;
      }
      return makeElement({tagName, className, attributes});
    }

    // A single <br> at the end of a block element has no visual representation
    // so add an extra one.
    shouldAddExtraNewlineElement() {
      return /\n\n$/.test(this.block.toString());
    }

  };

  var ElementStore;

  var ElementStore$1 = ElementStore = (function() {
    var getKey;

    class ElementStore {
      constructor(elements) {
        this.reset(elements);
      }

      add(element) {
        var key;
        key = getKey(element);
        return this.elements[key] = element;
      }

      remove(element) {
        var key, value;
        key = getKey(element);
        if (value = this.elements[key]) {
          delete this.elements[key];
          return value;
        }
      }

      reset(elements = []) {
        var element, i, len;
        this.elements = {};
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          this.add(element);
        }
        return elements;
      }

    };

    getKey = function(element) {
      return element.dataset.trixStoreKey;
    };

    return ElementStore;

  }).call(undefined);

  var DocumentView;

  var DocumentView$1 = DocumentView = (function() {
    var elementsHaveEqualHTML, findStoredElements, ignoreSpaces;

    class DocumentView extends ObjectView$1 {
      static render(document) {
        var element, view;
        element = makeElement("div");
        view = new this(document, {element});
        view.render();
        view.sync();
        return element;
      }

      constructor() {
        super();
        ({element: this.element} = this.options);
        this.elementStore = new ElementStore$1();
        this.setDocument(this.object);
      }

      setDocument(document) {
        if (!document.isEqualTo(this.document)) {
          return this.document = this.object = document;
        }
      }

      render() {
        var i, len, node, object, objects, results, view;
        this.childViews = [];
        this.shadowElement = makeElement("div");
        if (!this.document.isEmpty()) {
          objects = ObjectGroup$1.groupObjects(this.document.getBlocks(), {
            asTree: true
          });
          results = [];
          for (i = 0, len = objects.length; i < len; i++) {
            object = objects[i];
            view = this.findOrCreateCachedChildView(BlockView$1, object);
            results.push((function() {
              var j, len1, ref, results1;
              ref = view.getNodes();
              results1 = [];
              for (j = 0, len1 = ref.length; j < len1; j++) {
                node = ref[j];
                results1.push(this.shadowElement.appendChild(node));
              }
              return results1;
            }).call(this));
          }
          return results;
        }
      }

      isSynced() {
        return elementsHaveEqualHTML(this.shadowElement, this.element);
      }

      sync() {
        var fragment;
        fragment = this.createDocumentFragmentForSync();
        while (this.element.lastChild) {
          this.element.removeChild(this.element.lastChild);
        }
        this.element.appendChild(fragment);
        return this.didSync();
      }

      // Private
      didSync() {
        this.elementStore.reset(findStoredElements(this.element));
        return defer(() => {
          return this.garbageCollectCachedViews();
        });
      }

      createDocumentFragmentForSync() {
        var element, fragment, i, j, len, len1, node, ref, ref1, storedElement;
        fragment = document.createDocumentFragment();
        ref = this.shadowElement.childNodes;
        for (i = 0, len = ref.length; i < len; i++) {
          node = ref[i];
          fragment.appendChild(node.cloneNode(true));
        }
        ref1 = findStoredElements(fragment);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          element = ref1[j];
          if (storedElement = this.elementStore.remove(element)) {
            element.parentNode.replaceChild(storedElement, element);
          }
        }
        return fragment;
      }

    };

    findStoredElements = function(element) {
      return element.querySelectorAll("[data-trix-store-key]");
    };

    elementsHaveEqualHTML = function(element, otherElement) {
      return ignoreSpaces(element.innerHTML) === ignoreSpaces(otherElement.innerHTML);
    };

    ignoreSpaces = function(html) {
      return html.replace(/&nbsp;/g, " ");
    };

    return DocumentView;

  }).call(undefined);

  var assert, getHTML;

  assert = QUnit.assert;

  assert.locationRange = function(start, end) {
    var actualLocationRange, expectedLocationRange;
    expectedLocationRange = normalizeRange([start, end]);
    actualLocationRange = getEditorController().getLocationRange();
    return this.deepEqual(actualLocationRange, expectedLocationRange);
  };

  assert.selectedRange = function(range) {
    var actualRange, expectedRange;
    expectedRange = normalizeRange(range);
    actualRange = getEditor().getSelectedRange();
    return this.deepEqual(actualRange, expectedRange);
  };

  assert.textAttributes = function(range, attributes) {
    var blocks, document, locationRange, piece, pieces, text, textIndex, textRange;
    document = getDocument().getDocumentAtRange(range);
    blocks = document.getBlocks();
    if (blocks.length !== 1) {
      throw `range ${JSON.stringify(range)} spans more than one block`;
    }
    locationRange = getDocument().locationRangeFromRange(range);
    textIndex = locationRange[0].index;
    textRange = [locationRange[0].offset, locationRange[1].offset];
    text = getDocument().getTextAtIndex(textIndex).getTextAtRange(textRange);
    pieces = text.getPieces();
    if (pieces.length !== 1) {
      throw `range ${JSON.stringify(range)} must only span one piece`;
    }
    piece = pieces[0];
    return this.deepEqual(piece.getAttributes(), attributes);
  };

  assert.blockAttributes = function(range, attributes) {
    var block, blocks, document;
    document = getDocument().getDocumentAtRange(range);
    blocks = document.getBlocks();
    if (blocks.length !== 1) {
      throw `range ${JSON.stringify(range)} spans more than one block`;
    }
    block = blocks[0];
    return this.deepEqual(block.getAttributes(), attributes);
  };

  assert.documentHTMLEqual = function(trixDocument, html) {
    return this.equal(getHTML(trixDocument), html);
  };

  getHTML = function(trixDocument) {
    return DocumentView$1.render(trixDocument).innerHTML;
  };

  var ready, setFixtureHTML;

  setFixtureHTML = function(html, container = "form") {
    var element;
    element = document.getElementById("trix-container");
    if (element != null) {
      removeNode(element);
    }
    element = document.createElement(container);
    element.id = "trix-container";
    element.innerHTML = html;
    return document.body.insertAdjacentElement("afterbegin", element);
  };

  ready = null;

  var testGroup = function(name, options, callback) {
    var afterEach, beforeEach, container, setup, teardown, template;
    if (callback != null) {
      ({container, template, setup, teardown} = options);
    } else {
      callback = options;
    }
    beforeEach = function() {
      // Ensure window is active on CI so focus and blur events are natively dispatched
      window.focus();
      ready = function(callback) {
        var handler;
        if (template != null) {
          addEventListener("trix-initialize", handler = function({target}) {
            removeEventListener("trix-initialize", handler);
            if (target.hasAttribute("autofocus")) {
              target.editor.setSelectedRange(0);
            }
            return callback(target);
          });
          return setFixtureHTML(JST[`test_helpers/fixtures/${template}`](), container);
        } else {
          return callback();
        }
      };
      return typeof setup === "function" ? setup() : void 0;
    };
    afterEach = function() {
      if (template != null) {
        setFixtureHTML("");
      }
      return typeof teardown === "function" ? teardown() : void 0;
    };
    if (callback != null) {
      return QUnit.module(name, function(hooks) {
        hooks.beforeEach(beforeEach);
        hooks.afterEach(afterEach);
        return callback();
      });
    } else {
      return QUnit.module(name, {beforeEach, afterEach});
    }
  };

  var test = function(name, callback) {
    return QUnit.test(name, function(assert) {
      var doneAsync;
      doneAsync = assert.async();
      return ready(function(element) {
        var done;
        done = function(expectedDocumentValue) {
          if (element != null) {
            if (expectedDocumentValue) {
              assert.equal(element.editor.getDocument().toString(), expectedDocumentValue);
            }
            return requestAnimationFrame(doneAsync);
          } else {
            return doneAsync();
          }
        };
        if (callback.length === 0) {
          callback();
          return done();
        } else {
          return callback(done);
        }
      });
    });
  };

  var testIf = function(condition, ...args) {
    if (condition) {
      return helpers.test(...args);
    } else {
      return helpers.skip(...args);
    }
  };

  var skip = QUnit.skip;

  var UTF16String, hasArrayFrom, hasStringCodePointAt, hasStringFromCodePoint, ucs2decode, ucs2encode;

  var UTF16String$1 = UTF16String = class UTF16String extends BasicObject$1 {
    static box(value = "") {
      if (value instanceof this) {
        return value;
      } else {
        return this.fromUCS2String(value != null ? value.toString() : void 0);
      }
    }

    static fromUCS2String(ucs2String) {
      return new this(ucs2String, ucs2decode(ucs2String));
    }

    static fromCodepoints(codepoints) {
      return new this(ucs2encode(codepoints), codepoints);
    }

    constructor(ucs2String1, codepoints1) {
      super();
      this.ucs2String = ucs2String1;
      this.codepoints = codepoints1;
      this.length = this.codepoints.length;
      this.ucs2Length = this.ucs2String.length;
    }

    offsetToUCS2Offset(offset) {
      return ucs2encode(this.codepoints.slice(0, Math.max(0, offset))).length;
    }

    offsetFromUCS2Offset(ucs2Offset) {
      return ucs2decode(this.ucs2String.slice(0, Math.max(0, ucs2Offset))).length;
    }

    slice() {
      return this.constructor.fromCodepoints(this.codepoints.slice(...arguments));
    }

    charAt(offset) {
      return this.slice(offset, offset + 1);
    }

    isEqualTo(value) {
      return this.constructor.box(value).ucs2String === this.ucs2String;
    }

    toJSON() {
      return this.ucs2String;
    }

    getCacheKey() {
      return this.ucs2String;
    }

    toString() {
      return this.ucs2String;
    }

  };

  hasArrayFrom = (typeof Array.from === "function" ? Array.from("\ud83d\udc7c").length : void 0) === 1;

  hasStringCodePointAt = (typeof " ".codePointAt === "function" ? " ".codePointAt(0) : void 0) != null;

  hasStringFromCodePoint = (typeof String.fromCodePoint === "function" ? String.fromCodePoint(32, 128124) : void 0) === " \ud83d\udc7c";

  // UCS-2 conversion helpers ported from Mathias Bynens' Punycode.js:
  // https://github.com/bestiejs/punycode.js#punycodeucs2

  // Creates an array containing the numeric code points of each Unicode
  // character in the string. While JavaScript uses UCS-2 internally,
  // this function will convert a pair of surrogate halves (each of which
  // UCS-2 exposes as separate characters) into a single code point,
  // matching UTF-16.
  if (hasArrayFrom && hasStringCodePointAt) {
    ucs2decode = function(string) {
      return Array.from(string).map(function(char) {
        return char.codePointAt(0);
      });
    };
  } else {
    ucs2decode = function(string) {
      var counter, extra, length, output, value;
      output = [];
      counter = 0;
      length = string.length;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if ((0xD800 <= value && value <= 0xDBFF) && counter < length) {
          // high surrogate, and there is a next character
          extra = string.charCodeAt(counter++);
          if ((extra & 0xFC00) === 0xDC00) {
            // low surrogate
            value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
          } else {
            // unmatched surrogate; only append this code unit, in case the
            // next code unit is the high surrogate of a surrogate pair
            counter--;
          }
        }
        output.push(value);
      }
      return output;
    };
  }

  // Creates a string based on an array of numeric code points.
  if (hasStringFromCodePoint) {
    ucs2encode = function(array) {
      return String.fromCodePoint(...array);
    };
  } else {
    ucs2encode = function(array) {
      var characters, output, value;
      characters = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = array.length; i < len; i++) {
          value = array[i];
          output = "";
          if (value > 0xFFFF) {
            value -= 0x10000;
            output += String.fromCharCode(value >>> 10 & 0x3FF | 0xD800);
            value = 0xDC00 | value & 0x3FF;
          }
          results.push(output + String.fromCharCode(value));
        }
        return results;
      })();
      return characters.join("");
    };
  }

  var Object$1, id;

  id = 0;

  var TrixObject = Object$1 = class Object extends BasicObject$1 {
    static fromJSONString(jsonString) {
      return this.fromJSON(JSON.parse(jsonString));
    }

    constructor() {
      super();
      this.id = ++id;
    }

    hasSameConstructorAs(object) {
      return this.constructor === (object != null ? object.constructor : void 0);
    }

    isEqualTo(object) {
      return this === object;
    }

    inspect() {
      var contents, key, value;
      contents = (function() {
        var ref, ref1, results;
        ref1 = (ref = this.contentsForInspection()) != null ? ref : {};
        results = [];
        for (key in ref1) {
          value = ref1[key];
          results.push(`${key}=${value}`);
        }
        return results;
      }).call(this);
      return `#<${this.constructor.name}:${this.id}${contents.length ? ` ${contents.join(", ")}` : ""}>`;
    }

    contentsForInspection() {}

    toJSONString() {
      return JSON.stringify(this);
    }

    toUTF16String() {
      return UTF16String$1.box(this);
    }

    getCacheKey() {
      return this.id.toString();
    }

  };

  var arraysAreEqual = function(a = [], b = []) {
    var i, index, len, value;
    if (a.length !== b.length) {
      return false;
    }
    for (index = i = 0, len = a.length; i < len; index = ++i) {
      value = a[index];
      if (value !== b[index]) {
        return false;
      }
    }
    return true;
  };

  var arrayStartsWith = function(a = [], b = []) {
    return arrays.arraysAreEqual(a.slice(0, b.length), b);
  };

  var spliceArray = function(array, ...args) {
    var result;
    result = array.slice(0);
    result.splice(...args);
    return result;
  };

  var summarizeArrayChange = function(oldArray = [], newArray = []) {
    var added, currentValues, existingValues, i, j, k, len, len1, len2, removed, value;
    added = [];
    removed = [];
    existingValues = new Set();
    for (i = 0, len = oldArray.length; i < len; i++) {
      value = oldArray[i];
      existingValues.add(value);
    }
    currentValues = new Set();
    for (j = 0, len1 = newArray.length; j < len1; j++) {
      value = newArray[j];
      currentValues.add(value);
      if (!existingValues.has(value)) {
        added.push(value);
      }
    }
    for (k = 0, len2 = oldArray.length; k < len2; k++) {
      value = oldArray[k];
      if (!currentValues.has(value)) {
        removed.push(value);
      }
    }
    return {added, removed};
  };

  var Hash;

  var Hash$1 = Hash = (function() {
    var box, copy, merge, object, unbox;

    class Hash extends TrixObject {
      static fromCommonAttributesOfObjects(objects = []) {
        var hash, i, keys, len, object, ref;
        if (!objects.length) {
          return new (this)();
        }
        hash = box(objects[0]);
        keys = hash.getKeys();
        ref = objects.slice(1);
        for (i = 0, len = ref.length; i < len; i++) {
          object = ref[i];
          keys = hash.getKeysCommonToHash(box(object));
          hash = hash.slice(keys);
        }
        return hash;
      }

      static box(values) {
        return box(values);
      }

      constructor(values = {}) {
        super();
        this.values = copy(values);
      }

      add(key, value) {
        return this.merge(object(key, value));
      }

      remove(key) {
        return new Hash(copy(this.values, key));
      }

      get(key) {
        return this.values[key];
      }

      has(key) {
        return key in this.values;
      }

      merge(values) {
        return new Hash(merge(this.values, unbox(values)));
      }

      slice(keys) {
        var i, key, len, values;
        values = {};
        for (i = 0, len = keys.length; i < len; i++) {
          key = keys[i];
          if (this.has(key)) {
            values[key] = this.values[key];
          }
        }
        return new Hash(values);
      }

      getKeys() {
        return Object.keys(this.values);
      }

      getKeysCommonToHash(hash) {
        var i, key, len, ref, results;
        hash = box(hash);
        ref = this.getKeys();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          if (this.values[key] === hash.values[key]) {
            results.push(key);
          }
        }
        return results;
      }

      isEqualTo(values) {
        return arraysAreEqual(this.toArray(), box(values).toArray());
      }

      isEmpty() {
        return this.getKeys().length === 0;
      }

      toArray() {
        var key, result, value;
        return (this.array != null ? this.array : this.array = ((function() {
          var ref;
          result = [];
          ref = this.values;
          for (key in ref) {
            value = ref[key];
            result.push(key, value);
          }
          return result;
        }).call(this))).slice(0);
      }

      toObject() {
        return copy(this.values);
      }

      toJSON() {
        return this.toObject();
      }

      contentsForInspection() {
        return {
          values: JSON.stringify(this.values)
        };
      }

    };

    object = function(key, value) {
      var result;
      result = {};
      result[key] = value;
      return result;
    };

    merge = function(object, values) {
      var key, result, value;
      result = copy(object);
      for (key in values) {
        value = values[key];
        result[key] = value;
      }
      return result;
    };

    copy = function(object, keyToRemove) {
      var i, key, len, result, sortedKeys;
      result = {};
      sortedKeys = Object.keys(object).sort();
      for (i = 0, len = sortedKeys.length; i < len; i++) {
        key = sortedKeys[i];
        if (key !== keyToRemove) {
          result[key] = object[key];
        }
      }
      return result;
    };

    box = function(object) {
      if (object instanceof Hash) {
        return object;
      } else {
        return new Hash(object);
      }
    };

    unbox = function(object) {
      if (object instanceof Hash) {
        return object.values;
      } else {
        return object;
      }
    };

    return Hash;

  }).call(undefined);

  var Operation;

  var Operation$1 = Operation = (function() {
    class Operation extends BasicObject$1 {
      isPerforming() {
        return this.performing === true;
      }

      hasPerformed() {
        return this.performed === true;
      }

      hasSucceeded() {
        return this.performed && this.succeeded;
      }

      hasFailed() {
        return this.performed && !this.succeeded;
      }

      getPromise() {
        return this.promise != null ? this.promise : this.promise = new Promise((resolve, reject) => {
          this.performing = true;
          return this.perform((succeeded, result) => {
            this.succeeded = succeeded;
            this.performing = false;
            this.performed = true;
            if (this.succeeded) {
              return resolve(result);
            } else {
              return reject(result);
            }
          });
        });
      }

      perform(callback) {
        return callback(false);
      }

      release() {
        var ref;
        if ((ref = this.promise) != null) {
          if (typeof ref.cancel === "function") {
            ref.cancel();
          }
        }
        this.promise = null;
        this.performing = null;
        this.performed = null;
        return this.succeeded = null;
      }

    };

    Operation.proxyMethod("getPromise().then");

    Operation.proxyMethod("getPromise().catch");

    return Operation;

  }).call(undefined);

  var ImagePreloadOperation;

  var ImagePreloadOperation$1 = ImagePreloadOperation = class ImagePreloadOperation extends Operation$1 {
    constructor(url) {
      super();
      this.url = url;
    }

    perform(callback) {
      var image;
      image = new Image();
      image.onload = () => {
        image.width = this.width = image.naturalWidth;
        image.height = this.height = image.naturalHeight;
        return callback(true, image);
      };
      image.onerror = function() {
        return callback(false);
      };
      return image.src = this.url;
    }

  };

  var Attachment,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  var Attachment$1 = Attachment = (function() {
    class Attachment extends TrixObject {
      static attachmentForFile(file) {
        var attachment, attributes;
        attributes = this.attributesForFile(file);
        attachment = new this(attributes);
        attachment.setFile(file);
        return attachment;
      }

      static attributesForFile(file) {
        return new Hash$1({
          filename: file.name,
          filesize: file.size,
          contentType: file.type
        });
      }

      static fromJSON(attachmentJSON) {
        return new this(attachmentJSON);
      }

      constructor(attributes = {}) {
        super();
        this.releaseFile = this.releaseFile.bind(this);
        this.attributes = Hash$1.box(attributes);
        this.didChangeAttributes();
      }

      getAttribute(attribute) {
        return this.attributes.get(attribute);
      }

      hasAttribute(attribute) {
        return this.attributes.has(attribute);
      }

      getAttributes() {
        return this.attributes.toObject();
      }

      setAttributes(attributes = {}) {
        var newAttributes, ref, ref1;
        newAttributes = this.attributes.merge(attributes);
        if (!this.attributes.isEqualTo(newAttributes)) {
          this.attributes = newAttributes;
          this.didChangeAttributes();
          if ((ref = this.previewDelegate) != null) {
            if (typeof ref.attachmentDidChangeAttributes === "function") {
              ref.attachmentDidChangeAttributes(this);
            }
          }
          return (ref1 = this.delegate) != null ? typeof ref1.attachmentDidChangeAttributes === "function" ? ref1.attachmentDidChangeAttributes(this) : void 0 : void 0;
        }
      }

      didChangeAttributes() {
        if (this.isPreviewable()) {
          return this.preloadURL();
        }
      }

      isPending() {
        return (this.file != null) && !(this.getURL() || this.getHref());
      }

      isPreviewable() {
        if (this.attributes.has("previewable")) {
          return this.attributes.get("previewable");
        } else {
          return this.constructor.previewablePattern.test(this.getContentType());
        }
      }

      getType() {
        if (this.hasContent()) {
          return "content";
        } else if (this.isPreviewable()) {
          return "preview";
        } else {
          return "file";
        }
      }

      getURL() {
        return this.attributes.get("url");
      }

      getHref() {
        return this.attributes.get("href");
      }

      getFilename() {
        var ref;
        return (ref = this.attributes.get("filename")) != null ? ref : "";
      }

      getFilesize() {
        return this.attributes.get("filesize");
      }

      getFormattedFilesize() {
        var filesize;
        filesize = this.attributes.get("filesize");
        if (typeof filesize === "number") {
          return fileSize$1.formatter(filesize);
        } else {
          return "";
        }
      }

      getExtension() {
        var ref;
        return (ref = this.getFilename().match(/\.(\w+)$/)) != null ? ref[1].toLowerCase() : void 0;
      }

      getContentType() {
        return this.attributes.get("contentType");
      }

      hasContent() {
        return this.attributes.has("content");
      }

      getContent() {
        return this.attributes.get("content");
      }

      getWidth() {
        return this.attributes.get("width");
      }

      getHeight() {
        return this.attributes.get("height");
      }

      getFile() {
        return this.file;
      }

      setFile(file1) {
        this.file = file1;
        if (this.isPreviewable()) {
          return this.preloadFile();
        }
      }

      releaseFile() {
        boundMethodCheck(this, Attachment);
        this.releasePreloadedFile();
        return this.file = null;
      }

      getUploadProgress() {
        var ref;
        return (ref = this.uploadProgress) != null ? ref : 0;
      }

      setUploadProgress(value) {
        var ref;
        if (this.uploadProgress !== value) {
          this.uploadProgress = value;
          return (ref = this.uploadProgressDelegate) != null ? typeof ref.attachmentDidChangeUploadProgress === "function" ? ref.attachmentDidChangeUploadProgress(this) : void 0 : void 0;
        }
      }

      toJSON() {
        return this.getAttributes();
      }

      getCacheKey() {
        return [super.getCacheKey(), this.attributes.getCacheKey(), this.getPreviewURL()].join("/");
      }

      // Previewable
      getPreviewURL() {
        return this.previewURL || this.preloadingURL;
      }

      setPreviewURL(url) {
        var ref, ref1;
        if (url !== this.getPreviewURL()) {
          this.previewURL = url;
          if ((ref = this.previewDelegate) != null) {
            if (typeof ref.attachmentDidChangeAttributes === "function") {
              ref.attachmentDidChangeAttributes(this);
            }
          }
          return (ref1 = this.delegate) != null ? typeof ref1.attachmentDidChangePreviewURL === "function" ? ref1.attachmentDidChangePreviewURL(this) : void 0 : void 0;
        }
      }

      preloadURL() {
        return this.preload(this.getURL(), this.releaseFile);
      }

      preloadFile() {
        if (this.file) {
          this.fileObjectURL = URL.createObjectURL(this.file);
          return this.preload(this.fileObjectURL);
        }
      }

      releasePreloadedFile() {
        if (this.fileObjectURL) {
          URL.revokeObjectURL(this.fileObjectURL);
          return this.fileObjectURL = null;
        }
      }

      preload(url, callback) {
        var operation;
        if (url && url !== this.getPreviewURL()) {
          this.preloadingURL = url;
          operation = new ImagePreloadOperation$1(url);
          return operation.then(({width, height}) => {
            if (!(this.getWidth() && this.getHeight())) {
              this.setAttributes({width, height});
            }
            this.preloadingURL = null;
            this.setPreviewURL(url);
            return typeof callback === "function" ? callback() : void 0;
          }).catch(() => {
            this.preloadingURL = null;
            return typeof callback === "function" ? callback() : void 0;
          });
        }
      }

    };

    Attachment.previewablePattern = /^image(\/(gif|png|jpe?g)|$)/;

    return Attachment;

  }).call(undefined);

  testGroup("Attachment", function() {
    var contentType, createAttachment, i, j, len, len1, nonPreviewableTypes, previewableTypes;
    previewableTypes = "image image/gif image/png image/jpg".split(" ");
    nonPreviewableTypes = "image/tiff application/foo".split(" ");
    createAttachment = function(attributes) {
      return new Attachment$1(attributes);
    };
    for (i = 0, len = previewableTypes.length; i < len; i++) {
      contentType = previewableTypes[i];
      (function(contentType) {
        return test(`${contentType} content type is previewable`, function() {
          return assert.ok(createAttachment({contentType}).isPreviewable());
        });
      })(contentType);
    }
    for (j = 0, len1 = nonPreviewableTypes.length; j < len1; j++) {
      contentType = nonPreviewableTypes[j];
      (function(contentType) {
        return test(`${contentType} content type is NOT previewable`, function() {
          return assert.notOk(createAttachment({contentType}).isPreviewable());
        });
      })(contentType);
    }
    return test("'previewable' attribute determines previewability", function() {
      var attrs;
      attrs = {
        previewable: true,
        contentType: nonPreviewableTypes[0]
      };
      assert.ok(createAttachment(attrs).isPreviewable());
      attrs = {
        previewable: false,
        contentType: previewableTypes[0]
      };
      return assert.notOk(createAttachment(attrs).isPreviewable());
    });
  });

})));
