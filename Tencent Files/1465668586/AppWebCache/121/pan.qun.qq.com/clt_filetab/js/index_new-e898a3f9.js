(function(e) {
    var a = {};
    function t(i) {
        if (a[i]) return a[i].exports;
        var n = a[i] = {
            exports: {},
            id: i,
            loaded: false
        };
        e[i].call(n.exports, n, n.exports, t);
        n.loaded = true;
        return n.exports;
    }
    t.m = e;
    t.c = a;
    t.p = "//s1.url.cn/qqun/pan/clt_filetab/js/";
    return t(0);
})([ function(e, a, t) {
    "use strict";
    savePoint("start");
    window.G = {};
    G.flagThumb = true;
    G.flagUploadTemp = false;
    G.flagHeightChrome = /chrome\/([2|3]\d)/gi.test(window.navigator.userAgent);
    G.canOpenFolder = window.external && window.external.openFolder;
    G.ifFileExist = window.external && window.external.isFileExist;
    G.flagIsVip = false;
    G.handler = {};
    G.cMap = {};
    G.pList = [];
    G.cList = [];
    G.compList = [];
    G.selectRow = {};
    G.previewCache = {};
    G.activeElement;
    G.oldVersion = false;
    G.folderVersion = 5461;
    G.nowFolder = "/";
    G.folderNum = 0;
    G.appid = 4;
    G.canCreateFolder = true;
    G.mac = false;
    G.tab = {};
    var i = t(14);
    var n = t(15);
    var r = t(16);
    var o = t(17);
    var l = t(20);
    var s = t(18);
    var d = t(19);
    var f = t(21);
    var c = t(22);
    var u = t(23);
    var p = t(24);
    var v = t(25);
    var m = t(26);
    var h = s.getParameter("debug");
    var g = decodeURIComponent(s.getParameter("webParams"));
    var w = window.external && window.external.CallHummerApi && window.external.CallHummerApi("IM.GetVersion");
    if (w) {
        try {
            w = JSON.parse(w);
            if (w.errorCode === 0) {
                w = w.version;
            }
        } catch (b) {
            w = false;
        }
    }
    G.version = w;
    G.webParams = g;
    G.downFast = window.external && window.external.downloadByXF;
    G.fileMap = function() {
        var e = [];
        return function() {
            e[G.module()] = e[G.module()] || {};
            return e[G.module()];
        };
    }();
    G.folderMap = function() {
        var e = [];
        return function() {
            var a = G.module();
            if (a === 1 || a === 2 || a === 3) {
                a = 0;
            }
            e[a] = e[a] || {};
            return e[a];
        };
    }();
    G.module = function() {
        var e = 0;
        var a = {
            0: "首页",
            1: "文件夹内",
            2: "成员文件列表",
            3: "搜索结果页"
        };
        return function(t) {
            if (t === undefined) {
                return e;
            } else if (a[t]) {
                if (t !== 3) {
                    $("#inputSearch").val("");
                }
                return e = t;
            } else {
                console.log("illegal module");
            }
        };
    }();
    G.checkHttps = function() {
        var e = location.href;
        return e.indexOf("https://") >= 0 ? true : false;
    };
    G.scrollHandler = function() {
        var e = [];
        return function(a) {
            var t = G.module();
            if (a) {
                return e[t] = a;
            } else {
                e[t] = e[t] || function() {};
                e[t]();
            }
        };
    }();
    function y() {
        var e = location.href;
        if (e.indexOf("groupShareClientV2.html") > 0) {
            G.newUi = true;
        }
        if (navigator.userAgent.indexOf("Mac OS X") >= 0) {
            G.mac = true;
            $("#inputSearch").attr("placeholder", "");
            $("#navTopFolder").attr("data-action", "menu.filenum");
            $(".refresh-icon").attr("data-action", "menu.refresh").click(function() {
                window.location.reload();
            });
        } else {
            $("#inputSearch").attr("placeholder", "搜索");
        }
    }
    function x() {
        y();
        G.info = i.getInfo();
        n.init();
        d.init();
        o.init();
        p.init();
        m.action(g);
        if (localVersion === "isLocal") {
            report("offlinePage");
        }
        report("expnew");
    }
    x();
}, , , , , , , , , , , , , , function(e, a, t) {
    "use strict";
    var i = t(18), n = t(64);
    function r() {
        var e = i.getUin();
        var a = i.getParameter("gid");
        var t = function() {
            var t = "refresh_" + e + "_" + a;
            if (i.getCookie(t) * 1) {
                i.getCookie(t);
                return true;
            }
            return false;
        }();
        if (!/^\d+$/.test(a)) {
            a = parseInt(a, 10);
            if (isNaN(a)) {
                a = "0";
            }
        }
        var r = i.getParameter("visitor");
        var o = r === "1";
        var l = n.getVersion().version;
        var s = {
            uin: parseInt(e),
            gc: parseInt(a),
            isVisitor: o,
            nickName: n.getNickName(e),
            fromRefresh: t,
            version: l
        };
        return s;
    }
    e.exports = {
        getInfo: r
    };
}, function(e, a, t) {
    "use strict";
    var i = undefined;
    var n = undefined;
    var r = undefined;
    var o = [];
    var l = window.localStorage;
    var s = {};
    function d() {
        if (!i) {
            i = "lp" + G.info.gc + "-" + G.info.uin;
        }
        if (!r) {
            r = "tips" + G.info.gc + "-" + G.info.uin;
        }
        if (!n) {
            n = "clist" + G.info.gc + "-" + G.info.uin;
        }
        return i;
    }
    function f(e) {
        try {
            l.setItem(r, e);
        } catch (a) {
            l.clear();
            l.setItem(r, e);
        }
    }
    function c() {
        return l.getItem(r);
    }
    function u(e) {
        s[e.filepath] = e.localpath;
        o.push(e);
        console.log("set local:", e);
        try {
            l.setItem(i, JSON.stringify(s));
            l.setItem(n, JSON.stringify(o));
        } catch (a) {
            l.clear();
            l.setItem(i, JSON.stringify(s));
            l.setItem(n, JSON.stringify(o));
        }
    }
    function p(e) {
        if (e.orcType === 1) {
            delete s[e.filepath];
        } else {
            delete s[e.id];
        }
        try {
            l.setItem(i, JSON.stringify(s));
        } catch (a) {
            l.clear();
            l.setItem(i, JSON.stringify(s));
        }
    }
    function v(e) {
        return s[e] || false;
    }
    function m(e) {
        var a = arguments.length <= 1 || arguments[1] === undefined ? "push" : arguments[1];
        if (a === "push") {
            o.push(e);
        } else if (a === "delete") {
            o = o.filter(function(a) {
                return e.localpath !== a.localpath;
            });
        }
        try {
            l.setItem(n, JSON.stringify(o));
        } catch (t) {
            l.clear();
            l.setItem(n, JSON.stringify(o));
        }
    }
    function h() {
        var e = l.getItem(n);
        if (e === null) {
            return false;
        }
        try {
            return JSON.parse(e);
        } catch (a) {
            return false;
        }
    }
    function g() {
        l.removeItem(n);
    }
    function w() {
        i = d();
        var e = l.getItem(i);
        if (e) {
            s = JSON.parse(e);
        }
    }
    e.exports = {
        set: u,
        remove: p,
        check: v,
        init: w,
        setTips: f,
        getTips: c,
        clearClist: g,
        getClist: h,
        setClist: m
    };
}, function(e, a, t) {
    "use strict";
    t(94);
}, function(e, a, t) {
    "use strict";
    var i = t(89);
    var n = t(90);
    var r = t(86);
    var o = t(77);
    var l = t(15);
    var s = t(91);
    var d = t(64);
    var f = $(G.handler);
    window.client = d;
    function c() {
        for (var e in r) {
            if (r.hasOwnProperty(e)) {
                f.bind("box." + e, r[e]);
            }
        }
    }
    function u() {
        var e = d.getTaskListAdv();
        var a = l.getClist();
        G.pList = s.cleanMap(e.map);
        G.compList = a;
        if (G.compList) {
            for (var t = 0, i = G.compList.length; t < i; t++) {
                var n = G.compList[t];
                var r = o.getData(n.filepath);
                if (!r) {
                    n.id = n.filepath;
                    o.addData(n);
                }
            }
        }
        c();
    }
    e.exports = {
        init: u
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    e.exports = function() {
        var e = function x(e) {
            var a = new RegExp("(?:^|;+|\\s+)" + e + "=([^;]*)"), t = document.cookie.match(a);
            return !t ? "" : t[1];
        };
        var a = function k() {
            var a = e("uin");
            if (!a) {
                return 0;
            }
            a += "";
            return a.replace(/^[\D0]+/g, "");
        };
        var t = function F(e, a) {
            a = a || location.href;
            var t = new RegExp("(\\?|#|&)" + e + "=([^&^#]*)(&|#|$)"), i = a.match(t);
            return decodeURIComponent(!i ? "" : i[2]);
        };
        var n = function T(e) {
            e += "";
            return e.replace(/^[ 　]*/gi, "");
        };
        var r = function $(e, a) {
            var t = a || 3;
            e += "";
            e = n(e);
            var i = e.match(/[^\x00-\xff]/g) || [];
            var r = e.replace(/[^\x00-\xff]/g, "");
            return parseInt(i.length * t + r.length);
        };
        function o(e, a) {
            var t = 0;
            for (var i = 0; i < e.length; i++) {
                var n = e.charAt(i);
                encodeURI(n).length > 2 ? t += 1 : t += .5;
                if (t >= a) {
                    var r = t == a ? i + 1 : i;
                    return e.substr(0, r);
                    break;
                }
            }
            return e;
        }
        function l(e) {
            var a = 0;
            for (var t = 0; t < e.length; t++) {
                var i = e.charAt(t);
                encodeURI(i).length > 2 ? a += 1 : a += .5;
            }
            return a;
        }
        var s = function _(e, a, t) {
            var i = r(e, 3);
            if (i < a || i > t) {
                return false;
            }
            return true;
        };
        var d = function C(e, a) {
            var a = a || 10;
            var t = r(e);
            var i = a - t;
            return i >= 0 ? i : 0;
        };
        var f = function S(e, a) {};
        window.onerror = function(e, a, t) {};
        function c(e) {
            if (e && e.length > 0) {
                e.addClass("remove-ease");
                setTimeout(function() {
                    e.remove();
                }, 300);
            }
        }
        var u = function M(e, a) {
            return function(t) {
                var i = arguments.length;
                if (a) t = Object(t);
                if (i < 2 || t == null) return t;
                for (var n = 1; n < i; n++) {
                    var r = arguments[n], o = e(r), l = o.length;
                    for (var s = 0; s < l; s++) {
                        var d = o[s];
                        if (!a || t[d] === void 0) t[d] = r[d];
                    }
                }
                return t;
            };
        };
        var p = function D(e) {
            var a = typeof e === "undefined" ? "undefined" : i(e);
            return a === "function" || a === "object" && !!e;
        };
        var v = function R(e) {
            if (!p(e)) return [];
            var a = [];
            for (var t in e) {
                a.push(t);
            }
            return a;
        };
        var m = u(v);
        function h() {
            var e = {};
            var a = Object.keys(G.folderMap());
            for (var t = a.length - 1; t >= 0; t--) {
                var i = G.folderMap()[a[t]];
                if (i) {
                    e[i.fnameEsc] = i;
                }
            }
            var n = "新建文件夹";
            var r = 1;
            while (e[n] !== undefined) {
                n = "新建文件夹(" + r + ")";
                r++;
            }
            return n;
        }
        var g = function j(e, a) {
            if (e.length <= 1) {
                return e;
            }
            var t = Math.floor(e.length / 2);
            var i = e.splice(t, 1)[0];
            var n = [];
            var r = [];
            for (var o = 0; o < e.length; o++) {
                if (e[o]) {
                    if (e[o][a] > i[a]) {
                        n.push(e[o]);
                    } else {
                        r.push(e[o]);
                    }
                }
            }
            return j(n, a).concat([ i ], j(r, a));
        };
        function w(e, a) {
            a.map(function(e) {
                return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            });
            var t = "(" + a.join("|") + ")";
            var i = e.split(new RegExp(t, "i"));
            return i;
        }
        function b(e, a) {
            for (var t = a.length - 1; t >= 0; t--) {
                a[t] = ("" + a[t]).toUpperCase();
            }
            var i = [];
            for (var t = e.length - 1; t >= 0; t--) {
                if (a.indexOf(e[t].toUpperCase()) !== -1) {
                    i[t] = '<span class="match-word">' + e[t] + "</span>";
                } else {
                    i[t] = e[t];
                }
            }
            return i.join("");
        }
        function y(e, a) {
            var t = w(e, a);
            return b(t, a);
        }
        return {
            getCookie: e,
            getUin: a,
            getParameter: t,
            getLen: r,
            changeLen: d,
            checkLength: s,
            checkLen: f,
            extend: m,
            removeEase: c,
            subString: o,
            quickSortByObjectAttr: g,
            getFolderNameDefault: h,
            heightLight: y
        };
    }();
}, function(e, a, t) {
    "use strict";
    var i = t(78);
    var n = l(i);
    var r = t(79);
    var o = l(r);
    function l(e) {
        if (e && e.__esModule) {
            return e;
        } else {
            var a = {};
            if (e != null) {
                for (var t in e) {
                    if (Object.prototype.hasOwnProperty.call(e, t)) a[t] = e[t];
                }
            }
            a.default = e;
            return a;
        }
    }
    var s = t(80).getHandlerTasks();
    var d = t(81);
    var f = t(82);
    var c = t(83);
    var u = $(G.handler);
    G.tab = f;
    function p(e) {
        var a = $(this).data("keyup");
        if (a) {
            var t = s[a];
            if (typeof t === "function") {
                t.call(this, e);
            }
        }
    }
    function v(e) {
        var a = $(this).data("keydown");
        if (a) {
            var t = s[a];
            if (typeof t === "function") {
                t.call(this, e);
            }
        }
    }
    function m(e) {
        var a = $(this).data("blur");
        if (a) {
            var t = s[a];
            if (typeof t === "function") {
                t.call(this, e);
            }
        }
    }
    function h() {
        this.inputStart = true;
    }
    function g() {
        var e = this;
        setTimeout(function() {
            e.inputStart = false;
        }, 200);
    }
    function w(e) {
        var a = $(e.target);
        if (a.parents("#box").length === 0 && a.data("action") !== "box.toggle") {
            u.trigger("box.hide");
        }
    }
    function b(e) {
        var a = $(this).data("focus");
        if (a) {
            var t = s[a];
            if (typeof t === "function") {
                t.call(this);
            }
        }
    }
    function y(e) {
        var a = $(this).data("action");
        if (a) {
            var t = s[a];
            if (typeof t === "function") {
                t.call(this);
            }
            if (a === "openGroupInfoCard") {
                e.stopPropagation();
            }
        } else {
            u.trigger("box.hide");
        }
    }
    function x(e) {
        var a = $(this).data("dbaction");
        if (a) {
            var t = s[a];
            if (typeof t === "function") {
                t.call(this);
            }
        } else {
            u.trigger("box.hide");
        }
    }
    function k() {
        o.init();
        $(document).on("click", "[data-action]", y);
        $(document).on("dblclick", "[data-dbaction]", x);
        $("body").on("click", w);
        $(document).on("keyup", "[data-keyup]", p);
        $(document).on("keydown", "[data-keydown]", v);
        $(document).on("focus", "[data-focus]", b);
        $(document).on("blur", "[data-blur]", m);
        $(document).on("compositionstart", "[data-cstart]", h);
        $(document).on("compositionend", "[data-cend]", g);
        $("body").on("click", function(e) {
            d["menu.hide"](e.target);
        });
        $(window).on("load", function() {
            $(".scroll-dom").scroll(function() {
                var e = document.querySelector(".scroll-dom").scrollHeight;
                var a = $(".scroll-dom").scrollTop();
                var t = $(".scroll-dom").height();
                var i = 30;
                if (e - (a + t) <= i) {
                    G.scrollHandler && G.scrollHandler();
                }
            });
        });
    }
    e.exports = {
        init: k
    };
}, function(e, a, t) {
    "use strict";
    var i = t(109), n = t(18), r = $(G.handler), o;
    var l = t(64);
    var s = {
        fail: "fail",
        wait: "wait",
        suc: "suc",
        alert: "new-alert"
    }, d, f;
    function c(e, a) {
        var t = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
        if (G.mac) {
            if (e === "fail") {
                l.alert(2, "提示", a);
            }
        } else {
            if (!o) {
                var n = {
                    cls: s[e],
                    text: a
                };
                var r = i(n);
                $("body").append(r);
                o = $("#toastDom");
                d = o.find(".toast-icon");
                f = o.find(".toast-message");
            } else {
                d.attr("class", "icons-" + s[e] + " toast-icon");
                f.text(a);
            }
            o.addClass("open");
            if (t) {
                setTimeout(function() {
                    u();
                }, 1e3);
            }
        }
    }
    function u() {
        if (o) {
            o.removeClass("open");
        }
    }
    r.bind("toast.show", function(e, a) {
        if (a && a.type && a.text) {
            c(a.type, a.text, a.autoHide);
        }
    });
    r.bind("toast.hide", function(e, a) {
        u();
    });
    e.exports = {
        show: c,
        hide: u
    };
}, function(e, a, t) {
    "use strict";
    var i = $("#folderPanel");
    var n = t(67);
    var r = t(68);
    var o = t(69);
    var l = t(70);
    var s = t(71);
    var d = t(72);
    var f = t(73);
    var c = t(74);
    var u = t(18);
    var p = t(75);
    var v = $(G.handler);
    var m = t(76);
    function h() {}
    function g() {
        report("clkCreateFolder");
        if (this.nodeName === "LI") {
            reportNew("blankRightMenuClick", {
                ver1: G.customMenuLength ? 1 : 2,
                ver2: G.info.isAdmin ? 1 : 2,
                ver3: 2
            });
        }
        if (!G.canCreateFolder) {
            v.trigger("toast.show", {
                type: "new-alert",
                text: "文件夹个数已达上限"
            });
            return;
        }
        n.show(i, {
            title: "新建文件夹",
            tips: "请输入文件夹名称",
            showValue: u.getFolderNameDefault(),
            action: "folder.createFolder"
        });
        $(".new-name").focus();
    }
    function w(e) {
        report("renameFolder");
        if (G.selectRow) {
            var a = G.getReportInfo(G.selectRow);
            a.ver3 = 4;
            reportNew("folderRightMenuClick", a);
        }
        n.show(i, {
            title: "重命名",
            tips: "请输入文件夹的新名称",
            action: "folder.renameFolder",
            showValue: G.selectRow.fnameEsc
        });
    }
    function b() {
        n.hide(i);
        if (G.activeElement) {
            G.activeElement.focus();
        }
    }
    function y() {}
    function x() {}
    function x() {
        i.find(".btn-ok").attr("data-action", "folder.createOK");
    }
    function k() {
        if (event && event.keyCode !== 13) {
            m["input.keyup"].call(this, event);
            return;
        }
        var e = $('[data-keyup="folderTree.create"]');
        if (!e.length) {
            callback && callback();
            return;
        }
        var a = e.val();
        var t = m.folderName(a);
        if (!t) {
            return;
        }
        r.createFolder();
    }
    e.exports = {
        "folder.openfolder": p.openByFolder,
        "folder.property": d.show,
        "folder.create": g,
        "folder.panelhide": b,
        "folder.show": y,
        "folder.showmove": x,
        "folder.toDelete": x,
        "folder.createFolder": r.createFolder,
        "folder.deleteFolder": o.deleteFolder,
        "folder.renameFolder": l.renameFolder,
        "folder.showDeleteFolder": o.showDeleteFolder,
        "folder.showRenameFolder": w,
        "folder.open": f.renderFolder,
        "folder.openroot": f.renderRootFolder,
        "folder.download": s.download,
        "folder.downloadByBtn": s.downloadByBtn,
        "input.createFolder": k
    };
}, function(e, a, t) {
    "use strict";
    var i = t(95);
    var n = t(75);
    var r = t(96);
    var o = t(97);
    var l = t(98);
    var s = t(99);
    var d = t(100);
    var f = t(101);
    var c = t(102);
    var u = t(103);
    var p = t(104);
    var v = t(105);
    var m = t(106);
    var h = t(107);
    var g = t(108);
    var w = t(77);
    function b() {
        var e = $(this).parents(".list-item");
        var a = e.data("path");
        var t = undefined;
        var i = w.getData(a);
        if (i.orcType === 2) {
            t = "fold";
        } else if (i.orcType == 1) {
            t = "file";
        }
        G.selectRow = i || {};
        G.selectRow.path = a;
        G.selectRow.type = t;
        G.selectRows = [ G.selectRow ];
    }
    e.exports = {
        "file.batchDelete": p.remove,
        "batch.removeAction": p.removeAction,
        "file.batchMove": p.move,
        "file.batchDownload": p.down,
        "file.batchSaveAs": p.save,
        "file.selectAll": u.selectAll,
        "file.select": u.select,
        "file.check": u.check,
        "file.exitBatch": u.exit,
        "file.upload": i.upload,
        "file.batchUpload": i.bupload,
        "file.openFolder": n.openByPath,
        "file.openFolderInBox": n.openByMenu,
        "file.showRename": r.showFileRename,
        "file.renameFile": r.renameFile,
        "file.saveAs": v.save,
        "file.download": o.download,
        "file.downloadByDom": o.downloadByDom,
        "file.downloadByMenu": o.downloadByMenu,
        "file.downloadByBtn": o.downloadByBtn,
        "file.downloadBatch": o.downloadBatch,
        "file.preview": d.preview,
        "file.menupreview": d.menupreview,
        "file.jubao": c,
        "file.permanent": h,
        "file.delete": s.removeOne,
        "file.deleteBatch": s.removeBatch,
        "file.forward": l.forward,
        "file.forwardMobile": l.toMobile,
        "file.showUpload": i.showUpload,
        "file.showMove": f.showMove,
        "file.move": f.move,
        "upload.noTips": i.noTips,
        "upload.cUpload": i.cupload,
        "file.getByUin": m.byUin,
        "file.getAttr": g,
        "qq.update": i.update,
        "file.aria": b
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(85);
    var r = t(92);
    var o = t(113);
    var l = t(77);
    var s = t(18);
    var d = t(25);
    G.renderOtherGroupResultFuncSingtons = {};
    function f() {
        var e = [ '<div class="search-empty"><div class="search-icon-dom">', '<div class="icons-search-empty"></div>', '<span class="empty-desc">很遗憾，', '没有找到与"', G.searchKeyword, '"相关的文件</span></div></div>' ];
        var a = e.join("");
        return a;
    }
    function c(e) {
        var a = $(".other-group-result-desc");
        a.prev().find("dl").css("border-bottom-width", e);
        a.prev().find("div").css("border-bottom-width", e);
    }
    function u() {
        var e = true, a = true;
        var t = {
            dataSelfGroupLen: 0,
            dataOtherGroupLen: 0
        };
        return function(t) {
            var i = G.getDomPanel();
            var n = t.selfGroupResult;
            var r = t.otherGroupResult;
            var l = t.owner;
            var s = t.total - t.owner;
            var d = false;
            var c = false;
            if (l === 0 && s === 0) {
                var u = f();
                i.html(u);
                $(".search-empty").css("height", "100%");
                return;
            }
            console.log(n, r);
            if (n.length > 0) {
                d = o({
                    data: {
                        self: true,
                        first: e,
                        list: n,
                        total: l,
                        name: "本群搜索结果",
                        gc: "0000"
                    },
                    renderParams: {
                        actionHide: false,
                        getByUinHide: false,
                        searchModule: true
                    },
                    batchMode: false
                });
            } else {
                if (e) {
                    d = '<div class="search-no-result">本群没有搜索到相关的文件</div>';
                }
            }
            if (r.length > 0) {
                c = o({
                    data: {
                        self: false,
                        first: a,
                        list: r,
                        total: s,
                        name: "其他群的搜索结果",
                        gc: "1111"
                    },
                    renderParams: {
                        actionHide: false,
                        getByUinHide: false,
                        searchModule: true
                    },
                    batchMode: false
                });
            }
            if (e) {
                report("showSearchRes");
                i.html("");
                e = false;
                $("body").trigger("searchResult", true);
            }
            if (d) {
                i.append(d);
            }
            if (r.length > 0 && a) {
                a = false;
            }
            if (c) {
                i.append(c);
            }
            $("#createFolder").hide();
        };
    }
    function p() {
        var e = false;
        var a = undefined;
        return function(t, r) {
            var o = G.module();
            var c = G.searchKeyword = $.trim($("#inputSearch").val()) || "";
            if (!(t && t.keyCode == 13 || t == undefined) || c === "") {
                return;
            }
            report("doSearch");
            G.module(3);
            G.scrollHandler(function() {
                var t = G.searchKeyword = $("#inputSearch").val() || "";
                var c = {
                    key_word: t
                };
                e = o !== G.module() || G.module() !== 3 || JSON.stringify(a) != JSON.stringify(c);
                o = G.module();
                a = c;
                var p = function h(a, t) {
                    if (e && !G.isHistory) {
                        G.setHistory(c);
                    }
                    G.isHistory = false;
                    G.nowFolder = false;
                    $("body").attr("data-mode", "search");
                    if (e || G.renderListFuncSingtons[t] == undefined) {
                        G.renderListFuncSingtons[t] = u();
                        G.tab.resetTab();
                    }
                    function i(e) {
                        e = e || [];
                        function a(e) {
                            return e.gc === G.info.gc;
                        }
                        function t(e) {
                            return e.gc !== G.info.gc;
                        }
                        var i = {
                            ut: "upload_time",
                            owner_name: "uin_name"
                        };
                        var n = function r(e) {
                            var a = arguments.length <= 1 || arguments[1] === undefined ? {
                                filters: {
                                    selfGroupFilter: function r() {},
                                    otherGroupFilter: function o() {}
                                }
                            } : arguments[1];
                            function t(e, a, t) {
                                e = e.filter(a);
                                var n = {};
                                for (var r = e.length - 1; r >= 0; r--) {
                                    var o = e[r];
                                    n[o.id] = o;
                                }
                                var d = l.setFileList(e, i);
                                var f = d.file;
                                for (var r = f.length - 1; r >= 0; r--) {
                                    var c = f[r].fp;
                                    var o = G.fileMap()["/" + f[r].busid + c];
                                    var u = n[c].match_word;
                                    f[r].name = s.heightLight(o.name, u);
                                    f[r].suf = s.heightLight(o.suf, u);
                                    if (t) {
                                        f[r].otherGroupName = n[c]["group_name"];
                                        f[r].gc = n[c]["gc"];
                                    }
                                }
                                return f;
                            }
                            var n = {
                                selfGroupResult: t(e, a.filters.selfGroupFilter),
                                otherGroupResult: t(e, a.filters.otherGroupFilter, true)
                            };
                            return n;
                        };
                        return n(e, {
                            filters: {
                                selfGroupFilter: a,
                                otherGroupFilter: t
                            }
                        });
                    }
                    var n = i(a.file_list);
                    n.owner = a.owner_total;
                    n.total = a.total;
                    G.renderListFuncSingtons[t](n);
                    r && r();
                    d.showLoad(true);
                    console.debug("reset history in search!");
                };
                var v = {
                    succ: function g(e, a) {
                        p(e, a);
                    },
                    fail: function w() {
                        if (e) {
                            var a = "100%";
                            var t = G.getDomPanel();
                            t.html(f());
                            $(".search-empty").css("height", a || "160px");
                        }
                        d.showLoad(true);
                    },
                    beforeRequest: function(e) {
                        return function() {
                            e();
                        };
                    }(d.showLoad),
                    searchParams: c,
                    isNew: e
                };
                if ((typeof nodeData === "undefined" ? "undefined" : i(nodeData)) === "object") {
                    var m = {
                        key_word: nodeData.key_word,
                        search_type: 0,
                        app_id: 4
                    };
                    p(nodeData, m);
                    nodeData = false;
                } else {
                    n.search(v);
                }
            });
            G.scrollHandler();
        };
    }
    e.exports = {
        search: p()
    };
}, function(e, a, t) {
    "use strict";
    var i = t(92);
    var n = t(93);
    var r = $(G.handler);
    var o = function d() {
        i.checkVip().done(function(e) {
            if (e && e.vinfo && e.vinfo.supervip) {
                G.flagIsVip = true;
            } else {
                G.flagIsVip = false;
            }
            n.showQQVip();
        }).fail(function(e) {
            n.showQQVip();
        });
    };
    var l = function f() {
        n.show();
        r.trigger("menu.hide");
    };
    var s = function c() {
        report("openVip");
        if (G.activeElement) {
            G.activeElement.focus();
        }
        window.open("http://pay.qq.com/ipay/index.shtml?c=cjclub&aid=vip.gongneng.client.qunwenjian_openvip&ADTAG=CLIENT.QQ.GroupFile_OpenSVIP");
    };
    e.exports = {
        init: o,
        "vip.show": l,
        "vip.open": s
    };
}, function(e, a, t) {
    "use strict";
    var i = t(84);
    var n = t(111);
    var r = t(85);
    var o = t(77);
    var l = t(18);
    var s = t(86);
    var d = t(87);
    var f = $("#fileListDom");
    var c = $("#fileNumText");
    var u = $("#groupSize");
    var p = $("#groupSizeBar");
    var v = t(88);
    var m = $(G.handler);
    var h = location.href;
    var g = undefined;
    g = t(112);
    var w = true;
    var b = undefined;
    G.renderListFuncSingtons = {};
    G.getListFuncSingtons = {};
    G.searchFuncSingtons = {};
    m.bind("file.thumbUpdate", function(e, a) {
        var t = $("#" + a.domid);
        if (t.length && a.previewObj && a.previewObj.url) {
            (function() {
                var e = a.previewObj.url + "&pictype=scaled&size=50*50";
                if (G.checkHttps()) {
                    e = e.replace("http://", "");
                    e = "https://proxy.qun.qq.com/tx_tls_gate=" + e;
                }
                var i = new Image();
                i.onload = function() {
                    t.find(".filesmall-pic").css("background-image", "url(" + e + ")").addClass("thumb");
                };
                i.onerror = function() {
                    console.log("缩略图加载失败!", e);
                };
                i.src = e;
                report("imgurl");
            })();
        }
    });
    m.bind("file.dataUpdate", function(e, a) {
        var t = $("#" + a.domid);
        if (a.remoteType === 1) {
            t.removeClass("temp");
            t.find(".item-tags").hide();
            t.find(".tmp").remove();
        }
        if (a.newFilePath) {
            t.attr("data-path", a.newFilePath);
        }
        t.find(".file-info .name").text(a.fnameEsc);
    });
    var y = function W() {
        var e = G.module();
        var a = function r(e) {
            return '<section class="file-list" id="' + e + '"></section>';
        };
        var t = function l() {
            var e = o.getData(G.nowFolder);
            var t = e.domid;
            if (!e && G.nowFolder) {
                t = G.nowFolder.replace(/\//g, "-");
            }
            if (t === "-") {
                t = false;
            }
            if (t) {
                var i = $("#list" + t);
                if (i.length > 0) {
                    return i;
                } else {
                    f.after(a("list" + t));
                    i = $("#list" + t);
                    return i;
                }
            } else {
                return $("#fileListDom");
            }
        };
        var i = function s() {
            var e = $("#searchFileDom");
            if (e.length > 0) {
                return e;
            } else {
                f.after(a("searchFileDom"));
                e = $("#searchFileDom");
                return e;
            }
        };
        var n = function d() {
            var e = $("#userFileDom");
            if (e.length > 0) {
                return e;
            } else {
                f.after(a("userFileDom"));
                e = $("#userFileDom");
                return e;
            }
        };
        $(".file-list").hide();
        switch (e) {
          case 0:
            if (e === 0) {
                f.show();
            }
            return f;
            break;

          case 1:
            return t().show();
            break;

          case 3:
            return i().show();
            break;

          case 2:
            return n().show();
            break;
        }
    };
    var x = function Y() {
        var e = G.module();
        var a = function r(e) {
            return '<section class="file-list" id="' + e + '"></section>';
        };
        var t = function l() {
            var e = o.getData(G.nowFolder);
            var t = e.domid;
            if (!e && G.nowFolder) {
                t = G.nowFolder.replace(/\//g, "-");
            }
            if (t === "-") {
                t = false;
            }
            if (t) {
                var i = $("#list" + t);
                if (i.length > 0) {
                    return i;
                } else {
                    f.after(a("list" + t));
                    i = $("#list" + t);
                    return i;
                }
            } else {
                return $("#fileListDom");
            }
        };
        var i = function s() {
            var e = $("#searchFileDom");
            if (e.length > 0) {
                return e;
            } else {
                f.after(a("searchFileDom"));
                e = $("#searchFileDom");
                return e;
            }
        };
        var n = function d() {
            var e = $("#userFileDom");
            if (e.length > 0) {
                return e;
            } else {
                f.after(a("userFileDom"));
                e = $("#userFileDom");
                return e;
            }
        };
        switch (e) {
          case 0:
            return f;
            break;

          case 1:
            return t();
            break;

          case 3:
            return i();
            break;

          case 2:
            return n();
            break;
        }
    };
    G.onlyGetDom = x;
    G.getDomPanel = y;
    function k() {
        L();
        c.text(G.file.allnum).attr("aria-label", "共" + G.file.allnum + "个文件");
        $("#macFileNums").text("共" + G.file.allnum + "个文件");
        var e = parseInt(G.file.cu / G.file.ct * 100);
        p.css("width", e + "%");
        if (G.file.capacityused) {
            u.text(G.file.capacityused + "/" + G.file.capacitytotal);
        } else {
            u.text("未知/未知");
        }
        if (G.nowFolder === "/") {
            $("#fileNum").removeClass("hide");
        }
        if (G.info.isAdmin) {
            $("#createFolder").show();
        } else {
            $("#box").addClass("one");
        }
    }
    var F = 0;
    function T(e) {
        var a = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var t = true;
        return function(e) {
            Q(true);
            var i = y();
            if (!e || e.file.length === 0 && e.folder.length === 0) {
                _();
                k();
                t = false;
                return;
            }
            w = false;
            if (G.info.isVisitor) {
                a.actionHide = true;
            }
            var n = g({
                list: e.file,
                renderParams: a
            });
            var r = g({
                list: e.folder,
                renderParams: a
            });
            if (t) {
                k();
                t = false;
                i.html(r);
                i.append(n);
            } else {
                var o = $(".fold").last();
                if (o.length > 0) {
                    o.after(r);
                } else {
                    i.append(r);
                }
                i.append(n);
            }
            i.find(".list-item").each(function(e) {
                this.setAttribute("idx", e);
            });
            if (G.initInFolder) {
                F++;
                $("#fileListDom").hide();
            } else {
                $("body").trigger("newbie");
            }
            if (F === 2) {
                F++;
                G.nowFolder = G.initInFolder;
                var l = G.nowFolder.replace(/\//i, "-");
                $("#list" + l).show();
                G.initInFolder = false;
            }
            if ($(".scroll-dom")[0].scrollHeight > $(".scroll-dom").height()) {
                $(".file-header").addClass("padding");
            } else {
                $(".file-header").removeClass("padding");
            }
            if (!window._timePoints["show"]) {
                savePoint("show");
                var s = {
                    20: window._timePoints["css"],
                    21: window._timePoints["zepto"],
                    22: window._timePoints["js"],
                    23: window._timePoints["start"]
                };
                if (localVersion === "isLocal") {
                    s[25] = window._timePoints["show"];
                } else if (typeof nodeCost !== "undefined") {
                    s[26] = window._timePoints["show"];
                } else {
                    s[24] = window._timePoints["show"];
                }
                QReport.huatuo({
                    appid: 10016,
                    flag1: 1772,
                    flag2: 1,
                    flag3: 1,
                    speedTime: s
                });
            }
        };
    }
    function _() {
        var e = G.getDomPanel();
        if (!e.find(".list-item").length) {
            var a = n();
            e.html(a);
        }
    }
    function C(e) {
        if (G.nowFolder !== "/") {
            return;
        }
        var a = g({
            list: [ e ]
        });
        if (f.find(".icons-empty").length === 0) {
            f.prepend(a);
        } else {
            f.html(a);
        }
    }
    function S(e) {
        if (e) {
            if (e.domid) {
                var a = e.domid;
                $("#" + a).remove();
            } else if (e.id) {
                var a = e.id;
                $("[data-path=" + a + "]").remove();
            }
        }
        setTimeout(_, 500);
    }
    function M(e) {
        var a = G.getDomPanel();
        var t = a.find(".fold").last();
        var i = g({
            list: [ e ]
        });
        if (G.info.version < G.folderVersion) {
            if (e.parentId === "/" && G.nowFolder === "/") {
                if (t.length) {
                    t.after(i);
                } else {
                    a.prepend(i);
                }
            }
        } else {
            if (t.length) {
                t.after(i);
            } else if (G.folder !== "/" && a.find(".icons-empty").length === 0) {
                a.prepend(i);
            } else {
                a.html(i);
            }
        }
        v.renderSpace();
    }
    function D(e) {
        var a = e.parentId;
        if (a === "/") {
            var t = "#fileListDom";
            var i = $(t);
            var n = g({
                list: [ e ]
            });
            $("#" + e.domid).remove();
            if (i.find(".fold").length > 0) {
                i.find(".fold").last().after(n);
            } else {
                i.prepend(n);
            }
        }
    }
    function R(e) {
        if (e) {
            var a = e.domid;
            $("#" + a).remove();
            l.removeEase($("#" + a));
        }
    }
    function j(e) {
        if (e.orcType === 2) {
            S(e);
        } else {
            R(e);
        }
        var a = G.getDomPanel();
        if (a.find(".list-item").length === 0) {
            console.log("set empty");
            _();
        }
    }
    var N = function X() {
        var e = {
            filterUin: G.info.uin,
            filterCode: 4
        };
        var a = i.getList(e);
        a(function(e) {
            s.firstRender();
        }, function(e) {});
    };
    var I = 0;
    var O = 0;
    var L = function K() {
        var e = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];
        I++;
        if (e !== -1) {
            O = e;
        }
        if (I < 2) {
            return;
        }
        if (!G.info.isAdmin && !O) {
            G.info.canCreateFolder = false;
            $("#createFolder").hide();
        } else {
            G.info.canCreateFolder = true;
        }
    };
    function E(e, a) {
        i.setAllSpace(function(a) {
            P();
            L(a.all_upload);
            e && e(a);
        }, a);
    }
    function P() {
        if (G.nowFolder !== "/") {
            return;
        }
        u.text(G.file.capacityused + "/" + G.file.capacitytotal);
        $("#fileNumText").text(G.file.allnum);
        $("#macFileNums").text("共" + G.file.allnum + "个文件");
        if (G.file.capacitytotal) {
            $("#ariaSpace").attr("aril-label", "已用容量" + G.file.capacityused + "共" + G.file.capacitytotal);
        } else {
            $("#ariaSpace").attr("aril-label", "已用容量未知G,共未知G");
        }
        var e = parseInt(G.file.cu / G.file.ct * 100);
        p.css("width", e + "%");
        $("#fileNum").removeClass("hide");
    }
    function A(e) {
        var a = e || {};
        var t = a.container || "#folderOrSearchResult";
        var i = a.succ;
        var n = a.searchParams || {};
        var o = JSON.stringify(n);
        if (G.searchFuncSingtons[o] == undefined) {
            G.searchFuncSingtons[o] = r.search(n);
        }
        G.searchFuncSingtons[o](function(e) {
            if (G.renderListFuncSingtons[folderId] == undefined) {
                G.renderListFuncSingtons[folderId] = T(t);
            }
            G.renderListFuncSingtons[folderId](e);
            i && i(e);
        }, function() {});
    }
    var B = function Z() {
        var e = false;
        var a = undefined;
        return function(t) {
            var n = t || {};
            var r = n.paramsFilter || {};
            var o = n.container || "#fileListDom";
            var l = n.succ;
            var s = n.fail;
            e = JSON.stringify(a) !== JSON.stringify(r);
            var f = a = r;
            $("body").attr("data-mode", "folder");
            if (G.isHistory) {
                var c = r.folderId;
                var u = "#list" + c.replace("/", "-");
                if (c === "/") {
                    u = "#fileListDom";
                }
                $(".file-list").hide();
                $(u).show();
                d.updataFolderHeader(t.paramsFilter.folder);
                l && l();
                return function() {};
            }
            if (G.nowFolder !== "/") {
                $("body").addClass("folder-module");
            } else {
                $("body").removeClass("folder-module");
            }
            return G.scrollHandler(function() {
                if (e || G.getListFuncSingtons[f] == undefined) {
                    G.getListFuncSingtons[f] = i.getList(r);
                }
                G.getListFuncSingtons[f](function(a) {
                    if (e || G.renderListFuncSingtons[f] == undefined) {
                        e = false;
                        G.renderListFuncSingtons[f] = T(o, n.renderParams);
                    }
                    if (r.filterCode === 3) {
                        var t = a.file;
                        for (var i = t.length - 1; i >= 0; i--) {
                            var s = t[i];
                            if (s.parentId && G.folderMap()[s.parentId]) {
                                a.file[i].folderName = G.folderMap()[s.parentId].fnameEsc;
                            }
                        }
                    }
                    G.renderListFuncSingtons[f](a);
                    Q(true);
                    l && l(a);
                }, function(e) {
                    Q(true);
                    e && console.log(e);
                    if (e.ec !== 1e3) {
                        var a = "拉取文件列表失败";
                        if (w) {
                            if (G.mac) {
                                a += "，请稍后重试";
                            } else {
                                a += '，请稍后<a onclick="window.location.reload();">重试</a>';
                            }
                        }
                        m.trigger("toast.show", {
                            type: "fail",
                            text: a,
                            autoHide: !w
                        });
                    }
                    if (e && e.fc && e.fc === 1) {
                        return;
                    }
                }, function(e) {
                    return function() {
                        e();
                    };
                }(Q));
            });
        };
    }();
    var z = function ea() {
        var e = {};
        var a = {};
        var t = "#fileListDom";
        i.getList(a)();
    };
    function q(e) {
        B(e)();
        N();
        if (!G.file || !G.file.ct) {
            E();
        }
    }
    function U(e) {
        var a = function r(a) {
            if (a.length === 0) {
                return;
            }
            if (a.find(".file-status").length > 0) {
                a.find(".width").css("width", e.cPercent + "%");
                if (e.cPercent >= 100 || e.status === "remove") {
                    a.find(".item-time .drag-dom").show();
                    a.find(".item-time .file-status").hide();
                } else {
                    a.find(".item-time .drag-dom").hide();
                    a.find(".item-time .file-status").show();
                }
            } else {
                var t = "正在打开";
                if (G.saveasList[e.filepath]) {
                    t = "正在下载";
                }
                var i = [ '<div class="file-download file-status">', "" + t, '<div class="file-parents">', '<div class="width" style="width:' + e.cPercent + '%"></div>', "</div>", '<div class="miss-close" onclick="G.removeTaskInDownLoad(' + e.taskId + ",'" + e.filepath + "')\"></div>", "</div>" ];
                a.find(".item-time .drag-dom").hide();
                a.find(".item-time").append(i.join(""));
            }
        };
        if (e.orcType === 1) {
            var t = e.filepath.replace(/\//gi, "-");
            var i = $("#" + t);
            var n = $("#search" + t);
            a(i);
            a(n);
        }
    }
    function H(e, a) {
        var t = e.domid;
        if (!t) {
            t = o.getId(e.oldfilepath);
        }
        var i = $("#" + t);
        var n = undefined;
        i.find(".item-time .drag-dom").hide();
        n = '<div class="file-status">正在更新中</div>';
        i.find(".item-time").append(n);
        i.find(".file-icons").addClass("editing");
    }
    function J(e) {
        var a = o.getData(e.oldfilepath);
        var t = $("#" + a.domid);
        if (t) {
            t.attr("id", e.domid);
            t.attr("data-path", e.filepath);
            t.find(".item-time .drag-dom").text(e.mtStr).attr("title", "更新时间:" + e.mtoStr).show();
            t.find(".file-icons").removeClass("editing");
            t.find(".item-time .file-status").hide();
            if (!e.preview) {
                t.attr("data-dbaction", "file.downloadByDom");
            }
        }
        delete G.editFileList[a.filepath];
        o.remove(e.oldfilepath);
    }
    function V(e) {
        var a = undefined;
        if (e.orcType === 1) {
            a = $('.list-item[data-path="' + e.filepath + '"]');
            a.find(".item-name").attr("title", e.nameEsc + e.suf);
            a.find(".item-name .name").text(e.nameEsc + e.suf);
            a.find(".item-time").attr("title", "更新时间:" + e.mtoStr);
            a.find(".item-time span").text(e.mtStr);
        } else {
            a = $("#" + e.domid);
            if (e.toFirst) {
                a.remove();
                C(e);
                return;
            } else {
                a = $("#" + e.domid);
                if (e.filenum) {
                    a.find(".file-size").text(e.filenum + "个文件").attr("title", e.filenum + "个文件");
                }
            }
            a.find(".item-name").attr("title", e.fnameEsc);
            a.find(".item-time").attr("title", "更新时间:" + e.mtoStr);
            a.find(".item-time").text(e.mtStr);
        }
        if (e.status !== "downloadcomplete") {}
        if (e.status === "uploadcomplete" || e.status === "downloadcomplete") {
            a.addClass("succ");
            var t = "打开";
            if (G.mac) {
                t = "";
            }
        } else if (!e.isDown && !e.isDowning) {
            a.removeClass("succ");
        } else if (e.isDowning) {}
    }
    function Q(e) {
        if (!b) {
            $("body").append('<div class="loader" id="loaderDom"><div class="loading"></div></div>');
            b = $("#loaderDom");
        }
        if (e) {
            b.removeClass("open");
        } else {
            b.addClass("open");
        }
    }
    e.exports = {
        init: q,
        appendFold: C,
        removeFold: S,
        appendFile: M,
        appendFileToFolder: D,
        updateRow: V,
        search: A,
        renderSpace: P,
        removeRow: j,
        getList: B,
        getRoot: z,
        renderList: T,
        showLoad: Q,
        updateDownloadRow: U,
        updateEditFileRow: J,
        fileInEditRow: H,
        getDomPanel: y
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(21);
    var r = t(22);
    var o = t(23);
    var l = t(25);
    G.initInFolder = false;
    var s = function f(e) {
        try {
            G.setHistory({
                action: "fileList",
                params: {
                    folderId: "/",
                    fname: false
                }
            });
        } catch (a) {}
        if (e === "") {
            l.init();
        } else {
            try {
                e = JSON.parse(e);
            } catch (a) {
                l.init();
                return;
            }
        }
        if (e.action === "fileList") {
            var t = e.params;
            t = (typeof t === "undefined" ? "undefined" : i(t)) === "object" ? t : {};
            var s = t.folderId;
            if (s === "/") {
                l.init();
            } else {
                G.initInFolder = s;
                l.getList({})();
                n["folder.open"](s, t.fname);
            }
        } else if (e.action === "search") {
            (function() {
                var a = e.params;
                a = (typeof a === "undefined" ? "undefined" : i(a)) === "object" ? a : {};
                var t = a.keyword;
                $("#inputSearch").val(t);
                var n = a.files[0];
                o.search(undefined, function(e) {
                    var a = true;
                    var i = false;
                    return function() {
                        if (a) {
                            r["file.getAttr"](e, t);
                            a = false;
                        }
                        if (!i) {
                            var n = "#" + ("/" + e["busId"] + e["fileId"]).replace(/\//gi, "-");
                            i = true;
                        }
                    };
                }(n));
            })();
        }
    };
    var d = function c() {
        window.addEventListener("storage", function(e) {
            if (e.key !== "notifyOtherGroup") {
                return;
            }
            var a = {};
            try {
                a = JSON.parse(e.newValue);
            } catch (e) {
                console.log("decode JSON fail");
                return;
            }
            if (a.gc !== G.info.gc) {
                return;
            }
            var t = a.webParams;
            s(t);
        });
    }();
    e.exports = {
        action: s
    };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = top.external;
    function r() {
        var e = undefined;
        if (window.external && n.getTaskList) {
            e = n.getTaskList();
            if (typeof e !== "string") {
                e = "";
            }
        } else {}
        return e;
    }
    function o() {
        var e = {};
        if (window.external && n.getTaskList) {
            var a = n.getTaskList();
            if (typeof a !== "string") {
                a = "";
            }
            if (a === "") {
                e.map = {};
                e.status = "busy";
            } else if (a === "{}") {
                e.map = {};
                e.status = "ok";
                e.empty = true;
            } else {
                try {
                    e.map = JSON.parse(a);
                } catch (t) {
                    console.error("客户端接口getTaskList返回的数据有问题?parse出错[" + a + "]");
                }
                if (i(e.map) === "object" && e.map !== null) {
                    e.status = "ok";
                } else {
                    e.map = {};
                    e.status = "parseerror";
                }
            }
        } else {
            e = {
                map: {},
                status: "ok",
                empty: true
            };
        }
        return e;
    }
    function l() {
        var e = undefined;
        if (window.external && n.getCompleteTaskList) {
            e = n.getCompleteTaskList();
            if (e === null) {
                e = "";
            }
        } else {
            console.log("task相关接口不存在 getTaskList");
        }
        return e;
    }
    function s() {
        var e = {};
        if (window.external && n.getCompleteTaskList) {
            var a = n.getCompleteTaskList();
            if (typeof a !== "string") {
                a = "";
            }
            if (a === "") {
                e.map = {};
                e.status = "busy";
            } else if (a === "{}") {
                e.map = {};
                e.status = "ok";
                e.empty = true;
            } else {
                try {
                    e.map = JSON.parse(a);
                } catch (t) {
                    console.error("客户端接口getCompleteTaskList返回的数据有问题?parse出错[" + a + "]");
                }
                if (i(e.map) === "object" && e.map !== null) {
                    e.status = "ok";
                } else {
                    e.map = {};
                    e.status = "parseerror";
                }
            }
        } else {
            e = {
                map: {},
                status: "ok",
                empty: true
            };
        }
        return e;
    }
    function d(e) {
        if (window.external && n.getTaskInfo) {
            var a = n.getTaskInfo(e);
        } else {}
        return ret;
    }
    function f(e, a) {
        var t = undefined;
        if (!e) {
            e = 1;
        }
        if (window.g_flag_upload_temp) {
            e = 2;
        }
        if ("addUploadTask" in n) {
            t = n.addUploadTask(e, a);
        } else {}
        return t;
    }
    function c(e, a, t, i) {
        var r = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
        var o = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];
        var l = undefined;
        if (window.external && n.addDownloadTask) {
            t = t + "";
            l = n.addDownloadTask(e, a, t, i, r || false, o);
        } else {
            l = -1;
        }
        return l;
    }
    function u(e) {
        var a = undefined;
        if (window.external && n.downloadFiles) {
            a = n.downloadFiles(JSON.stringify(e));
            console.debug(a);
        } else {
            a = -1;
        }
        return a;
    }
    function p(e, a, t) {
        var i = undefined;
        if (window.external && n.downloadByXF) {
            t = t + "";
            i = n.downloadByXF(e, a, t);
            console.debug(i);
        } else {
            i = -1;
        }
        return i;
    }
    function v(e, a, t) {
        var i = undefined;
        if (window.external && n.forwardFile) {
            i = n.forwardFile(a, e, t);
        } else {
            i = -1;
        }
        return i;
    }
    function m(e, a, t) {
        var i = undefined;
        if (window.external && n.forwardFileToDataLine) {
            i = n.forwardFileToDataLine(a, e, t);
        } else {
            i = -1;
        }
        return i;
    }
    function h(e, a, t, i) {
        var r = undefined;
        console.log("client", e, a, t, i);
        if (window.external && n.addContinueUploadTask) {
            r = n.addContinueUploadTask(e, a, t, i);
            console.log(r);
        } else {
            r = -1;
        }
        return r;
    }
    function g(e) {
        var a = undefined;
        if (window.external && n.removeTask) {
            a = n.removeTask(e);
        } else {
            a = -1;
        }
        return a;
    }
    function w(e) {
        var a = undefined;
        if (window.external && n.removeCompleteTask) {
            a = n.removeCompleteTask(e);
        } else {
            a = -1;
        }
        return a;
    }
    function b(e) {
        var a = undefined;
        if (window.external && n.pauseTask) {
            a = n.pauseTask(e);
        } else {
            a = -1;
        }
        return a;
    }
    function y(e) {
        var a = undefined;
        if (window.external && n.resumeTask) {
            a = n.resumeTask(e);
        } else {
            a = -1;
        }
        return a;
    }
    function x() {
        var e = top.external && top.external.CallHummerApi;
        if (e) {
            var a = undefined;
            try {
                a = e.apply(this, arguments);
                a = JSON.parse(a);
                return a;
            } catch (t) {
                return false;
            }
        }
        return false;
    }
    function k() {
        if (G.mac) {
            try {
                var e = n.getVersion();
                return {
                    errorCode: 0,
                    version: e
                };
            } catch (a) {
                return {
                    errorCode: 1,
                    version: 0
                };
            }
        } else {
            return x("IM.GetVersion");
        }
    }
    function F() {
        if (window["G_DEBUG"]) {
            return true;
        }
        var e = x("Contact.IsOnline");
        if (e) {
            return x("Contact.IsOnline").online;
        } else {
            return false;
        }
    }
    function T(e, a) {
        a = a || 1;
        return x("Contact.OpenContactInfoCard", '{ "uin" : "' + e + '", "tabId" : ' + a + " }");
    }
    function $(e, a) {
        a = a || 1;
        return x("Group.OpenGroupInfoCard", '{ "groupId" : "' + e + '", "tabId" : ' + a + " }");
    }
    function _(e, a) {
        var t = JSON.stringify({
            gc: "" + e,
            webParams: a
        });
        return x("Group.OpenGroupFile", t);
    }
    var C = null;
    function S(e) {
        if (C) {
            return C;
        }
        var a = {
            uin: e + ""
        };
        a = JSON.stringify(a);
        var t = x("Contact.GetNickName", a);
        if (t && t.errorCode === 0 && t.nickName) {
            C = t.nickName;
        }
        if (G.mac) {
            try {
                C = n.getNickName(e);
            } catch (i) {
                C = e;
            }
        }
        if (!C) {
            return e;
        }
        return C;
    }
    function M() {
        return x("IM.GetClientKey");
    }
    function D(e) {
        e += "&pictype=scaled&size=1024*1024";
        var a = undefined;
        if (G.mac) {
            a = window.external && window.external.previewPicture(e);
        } else {
            a = x("Misc.OpenWebPic", '{"url":"' + e + '"}');
        }
        return a;
    }
    function R(e, a) {
        window.external && window.external.previewFile(e, a);
    }
    function j() {
        var e = s();
        if (e.map) {
            for (var a in e.map) {
                var t = e.map[a];
                if (t.id) {
                    var i = w(t.id);
                    if (i === -1) {
                        console.warn("移除完成任务失败！");
                    }
                }
            }
        }
    }
    function N(e, a, t) {
        if (G.mac) {
            return window.alert(t);
        } else {
            return x("Window.Alert", '{ "iconType" : ' + e + ', "title" : "' + a + '", "text" : "' + t + '" }');
        }
    }
    function I(e, a, t) {
        if (G.mac) {
            var i = window.confirm(t);
            return {
                errorCode: 0,
                ret: i
            };
        } else {
            return x("Window.Confirm", '{ "iconType" : ' + e + ', "title" : "' + a + '", "text" : "' + t + '" }');
        }
    }
    function O() {
        var e = undefined;
        if (window.external && n.getUploadFiles) {
            e = n.getUploadFiles();
        } else {
            e = -1;
        }
        return e;
    }
    function L(e, a, t) {
        if (!t) {
            t = 1;
        }
        var i = undefined;
        if (window.external && n.uploadFiles) {
            i = n.uploadFiles(e, a, t);
        } else {
            i = -1;
        }
        return i;
    }
    function E(e, a, t) {
        console.log(e, a);
        var i = undefined;
        if (!t) {
            t = 1;
        }
        if ("onlineEditFile" in n) {
            i = n.onlineEditFile(e, a, t);
        } else {}
        return i;
    }
    function P(e) {
        var a = undefined;
        if (!remotetype) {
            remotetype = 1;
        }
        if (window.external && n.setUploadFileRemotePath) {
            a = n.setUploadFileRemotePath(e);
        } else {
            a = -1;
        }
        return a;
    }
    function A(e) {
        var a = undefined;
        if (window.external && n.addMultiDownloadTasks) {
            a = n.addMultiDownloadTasks(e);
        } else {
            a = -1;
        }
        return a;
    }
    e.exports = {
        getVersion: k,
        getBatchFiles: O,
        batchUpload: L,
        setUploadFileRemotePath: P,
        getTaskListAdv: o,
        getCompleteTaskListAdv: s,
        addUploadTask: f,
        addDownloadTask: c,
        addDownloadFast: p,
        addContinueUploadTask: h,
        removeTask: g,
        removeCompleteTask: w,
        pauseTask: b,
        resumeTask: y,
        getTaskInfo: d,
        forwardFile: v,
        forwardFileToDataLine: m,
        callHummerApi: x,
        getNickName: S,
        isOnline: F,
        getClientKey: M,
        preview: D,
        previewFile: R,
        clearClist: j,
        alert: N,
        confirm: I,
        openGroupInfoCard: $,
        openGroupFile: _,
        addMultiDownloadTasks: A,
        onlineEditFile: E
    };
}, , , function(e, a, t) {
    "use strict";
    var i = {
        folderTreePanel: t(164)
    };
    var n = t(137);
    var r = $(G.handler);
    function o(e, a) {
        r.trigger("menu.hide");
        e.find(".panel-title span").text(a.title);
        e.find(".rename-hint").text(a.tips);
        e.find(".btn-ok").attr("data-action", a.action);
        var t = e.find(".new-name");
        if (a.showValue) {
            t.val(a.showValue);
        }
        e.find(".error-message").removeClass("show");
        e.addClass("open").focus();
        if (a.showValue) {
            t[0].inputStart = true;
            t[0].focus();
            t[0].select();
            setTimeout(function() {
                t[0].inputStart = false;
            }, 200);
        }
    }
    function l(e) {
        e.removeClass("open");
    }
    function s(e) {
        r.trigger("menu.hide");
        var a = $("#containerFolderTreePanel");
        a.html(i.folderTreePanel(e));
        n.render(a.find(".folder-tree-box"));
        a.find("#folderTreePanel").addClass("open");
    }
    function d(e, a) {
        r.trigger("menu.hide");
        e.addClass("open").focus();
        if (a) {
            if (a.hideAll) {
                e.find(".panel-footer").addClass("hide");
            } else {
                e.find(".panel-footer").removeClass("hide");
            }
            if (a.hideOk) {
                e.find(".btn-ok").addClass("hide");
            } else {
                e.find(".btn-ok").removeClass("hide");
            }
            if (a.closeText) {
                e.find(".btn-no").text("确定").val("确定");
            } else {
                e.find(".btn-no").text("取消").val("取消");
            }
            e.find(".panel-title span").text(a.title);
            e.find(".panel-content").html(a.text);
            e.find(".btn-ok").attr("data-action", a.action);
        }
    }
    function f() {
        $(".panel-overlay").removeClass("open");
    }
    r.bind("panel.hideAll", f);
    e.exports = {
        show: o,
        hide: l,
        hideAll: f,
        showFolderTreePanel: s,
        showBatchPanel: d
    };
}, function(e, a, t) {
    "use strict";
    var i = $("#folderPanel");
    var n = t(25);
    var r = t(138);
    var o = t(92);
    var l = t(67);
    var s = t(77);
    var d = $(G.handler);
    function f() {
        var e = $.trim(i.find(".new-name").val());
        var a = {
            parent_id: "/",
            name: e
        };
        o.createFolder(a).done(function(e) {
            var a = s.filterFolder(e.folder_info);
            G.folderNum++;
            report("createFolderSuc");
            s.addData(a);
            n.appendFold(a);
            l.hideAll();
            d.trigger("toast.show", {
                type: "suc",
                text: "新建文件夹成功"
            });
        }).fail(function(e) {
            if (e.ec === 405) {
                G.canCreateFolder = false;
            }
            r.showError(e.ec, i);
            report("newFolderError");
        });
    }
    e.exports = {
        createFolder: f
    };
}, function(e, a, t) {
    "use strict";
    var i = t(25);
    var n = t(92);
    var r = t(77);
    var o = $(G.handler);
    var l = t(15);
    function s(e) {
        if (e.errorCode === 0 && e.ret) {
            var a = {
                id: G.selectRow.id
            };
            n.deleteFolder(a).done(function(e) {
                if (e.ec) {
                    client.alert(2, "提示", "删除文件夹失败");
                    return;
                }
                G.canCreateFolder = true;
                var a = G.folderMap()[G.selectRow.id];
                G.folderNum--;
                if (G.folderNum < 0) {
                    G.folderNum = 0;
                }
                r.remove(a.id);
                i.removeRow(a);
                l.setClist(a, "delete");
                o.trigger("toast.show", {
                    type: "suc",
                    text: "删除文件夹成功"
                });
                report("delFolderSuc");
            }).fail(function(e) {
                client.alert(2, "提示", "删除文件夹失败");
                report("delFolderError");
            });
        }
    }
    function d() {
        o.trigger("menu.hide");
        if (!G.selectRow) {
            return;
        }
        var e = G.getReportInfo(G.selectRow);
        e.ver3 = 6;
        reportNew("folderRightMenuClick", e);
        report("deleteFolder", G.module());
        var a = client.confirm(2, "提示", "你确定要删除" + G.selectRow.fnameEsc + "以及文件夹内的所有文件吗？");
        if (a) {
            s(a);
        }
    }
    e.exports = {
        showDeleteFolder: d,
        deleteFolder: s
    };
}, function(e, a, t) {
    "use strict";
    var i = $("#folderPanel");
    var n = t(25);
    var r = t(138);
    var o = t(92);
    var l = t(67);
    var s = t(77);
    var d = t(139);
    var f = $(G.handler);
    function c() {
        f.trigger("menu.hide");
        if (!G.selectRow) {
            return;
        }
        var e = $.trim(i.find(".new-name").val());
        var a = G.selectRow.id;
        var t = {
            folder_id: a,
            new_name: e
        };
        o.renameFolder(t).done(function(t) {
            var i = G.folderMap()[a];
            i.fname = e;
            i.fnameEsc = e;
            i.name = e;
            i.modify_time = Math.ceil(new Date().getTime() / 1e3);
            i = s.updateFolder(i);
            $("[data-path='" + a + "']").find(".name").html(e);
            f.trigger("toast.show", {
                type: "suc",
                text: "重命名文件夹成功"
            });
            n.updateRow(i);
            l.hideAll();
        }).fail(function(e) {
            r.showError(e.ec, i);
            report("renameFolderError");
        });
        return true;
    }
    e.exports = {
        renameFolder: c
    };
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(15);
    var r = $(G.handler);
    var o = G.folderVersion;
    function l() {
        if (n.getTips()) {} else {
            report("showOldVersion");
            s();
        }
    }
    function s() {
        $("#updateQQ").addClass("open");
        $("#updateQQTips").text("当前版本不支持文件夹下载功能，请升级QQ至最新版本后体验");
        $("#updateQQ").find("input.btn-notips").attr("data-action", "panel.close");
    }
    function d(e) {
        var a = document.createElement("div");
        var t = this.getBoundingClientRect();
        var i = function r() {
            var e = document.height;
            var a = G.getDomPanel();
            var t = a[0].scrollHeight;
            if (t + 52 > e) {
                return true;
            }
            return false;
        };
        a.innerHTML = '<div class="img"></div>';
        a.className = "file-animate files-" + e.icon;
        var n = window.innerWidth - t.left - 76;
        if (G.info.isAdmin) {
            n += 47;
        }
        if (i()) {
            n -= 20;
        }
        if (G.mac) {
            n = 177;
        }
        a.style.right = n + "px";
        a.style.top = t.top - 20 + "px";
        document.body.appendChild(a);
        setTimeout(function() {
            document.body.removeChild(a);
        }, 1500);
    }
    function f(e) {
        if (G.info.version < o) {
            l();
            return;
        }
        report("downloadFolder");
        if (e) {
            d.call(this, e);
            var a = e.id;
            var t = e.fnameEsc;
            console.log(e, a, t);
            client.addDownloadTask(a, t, 0, true, true);
        }
        r.trigger("menu.hide");
    }
    function c() {
        f.bind(this)(G.selectRow);
    }
    function u() {
        var e = $(this).closest(".list-item");
        var a = e.data("path");
        var t = i.getData(a);
        f.bind(this)(t);
    }
    e.exports = {
        download: c,
        downloadByBtn: u
    };
}, function(e, a, t) {
    "use strict";
    var i = $("#folderPropertyPanel");
    var n = t(87);
    var r = $(G.handler);
    function o() {
        report("propFolder");
        n.render(i, G.selectRow);
        i.addClass("open");
        r.trigger("menu.hide");
        i.find(".aria-hide")[0].focus();
        var e = G.getReportInfo(G.selectRow);
        e.ver3 = 5;
        reportNew("folderRightMenuClick", e);
    }
    e.exports = {
        show: o
    };
}, function(e, a, t) {
    "use strict";
    var i = t(25);
    var n = t(77);
    var r = t(87);
    function o(e, a) {
        e = e || $(this).data("path");
        report("clkFolder", G.module());
        if (G.mac) {
            $(".mac-file-top").removeClass("user-module");
        }
        if ((G.module() == 0 || G.module() == 1) && e === G.nowFolder) {
            console.log("open folder return!!!!!", G.module(), G.nowFolder, e);
            return;
        }
        G.module(e === "/" ? 0 : 1);
        G.nowFolder = e;
        var t = undefined;
        if (e === "/") {
            t = Math.random();
        }
        var o = n.getData(e);
        var l = G.getReportInfo(o);
        reportNew("doubleClickFolder", l);
        function s(e) {
            if (a) {
                o = {
                    fnameEsc: a
                };
            }
            r.updataFolderHeader(o);
            var t = location.hash;
            t = decodeURIComponent(t);
            var i = {
                action: "fileList",
                params: {
                    folderId: G.nowFolder,
                    fname: o.fnameEsc
                }
            };
            location.hash = t.replace(/&webParams={.+}/, "") + "&webParams=" + encodeURIComponent(JSON.stringify(i));
            if (!G.isHistory) {
                G.setHistory(i);
            }
            G.isHistory = false;
        }
        var d = {
            folderId: e,
            random: t
        };
        if (a) {
            d.folder = {
                fnameEsc: a
            };
        }
        i.getList({
            paramsFilter: d,
            succ: s
        })();
    }
    function l(e, a) {
        o.call(this, e, a);
        reportNew("wayRoot");
    }
    e.exports = {
        renderFolder: o,
        renderRootFolder: l
    };
}, function(e, a, t) {
    "use strict";
    var i = $("#move-file-panel");
    function n() {
        i.addClass("open");
    }
    function r() {
        i.removeClass("open");
    }
    function o() {
        i.removeClass("open");
    }
    function l() {
        console.log("ok move file");
    }
    function s() {
        console.log("move file create folder");
    }
    function d(e, a) {
        var t = $(e.target).closest(".folder-list-item");
        $(".folder-list-item").removeClass("active");
        t.addClass("active");
    }
    e.exports = {
        oveFileOpen: n,
        moveFileClose: r,
        moveFileCancel: o,
        moveFileOk: l,
        moveFileCreateFolder: s,
        fileActive: d
    };
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(64);
    var r = t(25);
    var o = t(86);
    var l = t(15);
    var s = $(G.handler);
    function d(e) {
        delete e.status;
        e.isDown = false;
        e.isDowning = false;
        e.succ = false;
        r.updateRow(e);
        o.removeOpenFolder(e);
        l.remove(e);
    }
    function f(e) {
        s.trigger("menu.hide");
        if (window.external && window.external.isFileExist) {
            var a = window.external.isFileExist(e);
            if (a == "false" || a === false) {
                n.alert(2, "提示", "此文件夹不存在，可能已被删除或被移动到其他位置");
                var t = i.getFile(e);
                d(t);
                return false;
            }
        } else {}
        if (window.external && window.external.openFile) {
            var r = window.external.openFile(e);
            if (r == "success") {
                return true;
            } else if (r !== "file cannot open") {
                return false;
            }
        }
        if (window.external && window.external.openFolder) {
            var r = window.external.openFolder(e);
            if (r == "success") {} else {
                n.alert(2, "提示", "此文件夹不存在，可能已被删除或被移动到其他位置");
                return false;
            }
        } else {}
    }
    function c() {
        var e = G.selectRow;
        var a = e.localpath;
        s.trigger("menu.hide");
        if (typeof a === "string" && a.indexOf("OSRoot") < 0) {
            a = "OSRoot:\\" + a;
        }
        report("clkOpenFile", G.module());
        var t = G.getReportInfo(e);
        t.ver3 = 1;
        reportNew("folderRightMenuClick", t);
        if (window.external && window.external.isFileExist) {
            var i = window.external.isFileExist(a);
            if (i == "false" || i === false) {
                n.alert(2, "提示", "此文件夹不存在，可能已被删除或被移动到其他位置");
                d(e);
                return false;
            }
        } else {}
        if (window.external && window.external.openFolder) {
            var r = window.external.openFolder(a);
            if (r == "success") {} else {
                n.alert(2, "提示", "此文件夹不存在，可能已被删除或被移动到其他位置");
                return false;
            }
        } else {}
    }
    function u(e) {
        if (!e) {
            var a = $(this).parents(".file");
            var t = a.data("path");
            var r = i.getData(t);
        }
        var o = e.localpath;
        s.trigger("menu.hide");
        if (typeof o === "string" && o.indexOf("OSRoot") < 0) {
            o = "OSRoot:\\" + o;
        }
        report("clkOpenFile", G.module());
        if (window.external && window.external.isFileExist) {
            var l = window.external.isFileExist(o);
            if (l == "false" || l === false) {
                n.alert(2, "提示", "此文件不存在，可能已被删除或被移动到其他位置");
                d(e);
                return false;
            }
        } else {}
        if (window.external && window.external.openFile) {
            var f = window.external.openFile(o);
            console.log("open file", f);
            if (f == "success") {
                return true;
            } else if (f === "file cannot open") {
                var c = n.confirm(2, "提示", "此文件无法识别并打开，是否在文件夹中查看该文件？");
                if (c.errorCode === 0 && c.ret) {} else {
                    return false;
                }
            }
        }
        if (window.external && window.external.openFolder) {
            var f = window.external.openFolder(o);
            if (f == "success") {} else {
                n.alert(2, "提示", "此文件夹不存在，可能已被删除或被移动到其他位置");
                d(e);
                return false;
            }
        } else {}
    }
    function p() {
        var e = this;
        s.trigger("menu.hide");
        report("clkShowInFolder", G.module());
        while (!e.classList.contains("complete")) {
            e = e.parentNode;
        }
        var a = $(e);
        var t = a.data("path");
        var n = i.getData(t);
        var r = n._localpath || n.localpath || n.localname;
        if (r && r.indexOf("OSRoot:\\") != 0) {
            r = "OSRoot:\\" + r;
        }
        var o = f(r);
        if (o == false) {}
    }
    function v() {
        var e = this;
        s.trigger("menu.hide");
        while (!e.classList.contains("complete")) {
            e = e.parentNode;
        }
        var a = $(e);
        var t = a.data("path");
        var r = i.getData(t);
        $("#boxTitle a").focus();
        if (r) {
            var o = r._localpath || r.localpath || r.localname;
            if (o) {
                if (typeof o === "string" && o.indexOf("OSRoot:\\") != 0) {
                    o = "OSRoot:\\" + o;
                }
                var l = false;
                if (window.external && window.external.openFolder) {
                    var f = window.external.openFolder(o);
                    if (f == "success") {
                        l = true;
                    } else {
                        n.alert(2, "提示", "此文件夹不存在，可能被删除或被移动到其他位置");
                    }
                } else {}
                if (l == false) {
                    d(r);
                }
            } else {
                d(r);
            }
        }
    }
    function m() {
        var e = G.selectRow;
        s.trigger("menu.hide");
        var a = G.getReportInfo(e);
        a.ver3 = 3;
        reportNew("fileRightMenuClick", a);
        if (e) {
            report("clkShowInFolder", G.module());
            var t = e.localpath;
            if (t) {
                if (typeof t === "string" && t.indexOf("OSRoot:\\") != 0) {
                    t = "OSRoot:\\" + t;
                }
                var i = false;
                if (window.external && window.external.openFolder) {
                    var r = window.external.openFolder(t);
                    console.log(r);
                    if (r == "success") {
                        i = true;
                    } else {
                        n.alert(2, "提示", "此文件夹不存在，可能被删除或被移动到其他位置");
                    }
                } else {}
                if (i == false) {
                    d(e);
                }
            } else {
                d(e);
            }
        }
    }
    e.exports = {
        openByFolder: c,
        openByPath: u,
        openByBox: p,
        openByMenu: m,
        openFolderByBoxIco: v,
        changeOpenFolder2Download: d
    };
}, function(e, a, t) {
    "use strict";
    var i = t(18);
    var n = 48;
    var r = t(68);
    function o(e) {
        var a = false;
        var t = new RegExp('^[^/\\\\:?*"<>|]+$');
        a = t.test(e);
        console.log("reg", t.test(e));
        return a;
    }
    function l() {
        var e = $.trim(this.value);
        if (e.length > n && !input) {
            this.value = e.substr(0, n);
        }
        return;
    }
    function s(e) {
        var a = this.inputStart;
        var t = this.value;
        var r = $(this).parents(".panel-overlay");
        var l = $(this).parent().find(".bubble");
        var s = $("#folderPanel .btn-ok").data("action");
        if ($.trim(t) === "") {
            $(this).parent().find(".error-message").removeClass("show");
            r.find(".btn-ok").prop("disabled", true);
            l.hide();
            return;
        }
        if (!o(t)) {
            var d = '文件夹名称不能包含 \\ / : * ? " < > |';
            if (s === "file.renameFile") {
                d = '文件名称不能包含 \\ / : * ? " < > |';
            }
            $(this).parent().find(".error-message").text(d).addClass("show");
            l.html('<span class="bot"></span><span class="top"></span>' + d).show();
            r.find(".btn-ok").prop("disabled", true);
        } else {
            $(this).parent().find(".error-message").removeClass("show");
            l.hide();
        }
        if (t.length === 0) {
            r.find(".btn-ok").prop("disabled", true);
        } else if (t.length !== 0 && o(t)) {
            r.find(".btn-ok").prop("disabled", false);
        }
        if (t.length > n && !a) {
            this.value = t.substr(0, n);
        }
        if ($("#folderPanel [data-action]").length) {
            if (e && e.keyCode == 13 && !a) {
                $("#folderPanel [data-action]").click();
            }
        }
        return;
        if (i.getLen(t) > n && !a) {
            this.value = i.subString(t, 16);
        }
    }
    function d() {
        $("#folderPanel .error-message").removeClass("show");
    }
    e.exports = {
        "input.keyup": s,
        "input.focus": d,
        "input.blur": l,
        folderName: o
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(140);
    var r = t(139);
    var o = t(141);
    var l = t(142);
    var s = t(143);
    var d = t(18);
    var f = t(91);
    var c = t(15);
    var u = $(G.handler);
    var p = {};
    var v = false;
    var m = $("#groupSize");
    var h = $("#groupSizeBar");
    function g(e) {
        if (e.orcType === 1) {
            var a = G.module() === 1 ? 1 : 0;
            var t = $("#" + e.domid);
            var i = t.attr("idx");
            var n = a;
            if (typeof i !== "undefined") {
                n += "_" + i;
            }
            var r = e.uin === G.info.uin ? 1 : 2;
            return {
                ver1: e.isDown ? 1 : 2,
                ver2: G.info.isAdmin ? 1 : 2,
                ver3: r,
                ver4: encodeURIComponent(e.fname),
                ver5: encodeURIComponent(e.filetype),
                ver6: n
            };
        } else if (e.orcType === 2) {
            var a = 0;
            var t = $("#" + e.domid);
            var i = t.attr("idx");
            var o = a;
            if (typeof i !== "undefined") {
                o += "_" + i;
            }
            var r = G.info.uin === e.uin ? 1 : 2;
            return {
                ver1: e.filenum === e.downNum ? 1 : 2,
                ver2: G.info.isAdmin ? 1 : 2,
                ver3: r,
                ver4: encodeURIComponent(e.name),
                ver5: o
            };
        }
        return false;
    }
    G.getReportInfo = g;
    function w() {
        if (G.nowFolder !== "/") {
            return;
        }
        m.text(G.file.capacityused + "/" + G.file.capacitytotal);
        $("#fileNumText").text(G.file.allnum);
        $("#macFileNums").text("共" + G.file.allnum + "个文件");
        var e = parseInt(G.file.cu / G.file.ct * 100);
        h.css("width", e + "%");
        $("#fileNum").removeClass("hide");
    }
    e.exports = p;
    function b(e) {
        e += "";
        return e.replace(/\//gi, "-");
    }
    p.getId = b;
    p.updateFile = function(e, a) {
        if (a === "rename" && e) {
            e.mt = Math.ceil(new Date().getTime() / 1e3);
            e.mtStr = r.getDateStr(e.mt);
            e.mtoStr = r.getorcDateStr(e.mt);
        }
        if (a === "permanent" && e) {
            delete G.fileMap()[e.filepath];
            if (e.id) {
                delete G.fileMap()[e.id];
            }
            G.fileMap()[e.newFilePath] = e;
            e.filepath = e.newFilePath;
        }
    };
    p.updateFolder = function(e) {
        delete G.folderMap()[e.id];
        e.modify_time = Math.ceil(new Date().getTime() / 1e3);
        e.mt = e.modify_time;
        e.mtStr = r.getDateStr(e.modify_time);
        e.mtoStr = r.getorcDateStr(e.modify_time);
        G.folderMap()[e.id] = e;
        return e;
    };
    p.filterFolder = function(e) {
        var a = {
            fname: e.name,
            fnameEsc: o.decode(e.name),
            name: e.name,
            id: e.id,
            icon: "folder",
            ct: e.create_time,
            ctStr: r.getDateStr(e.create_time),
            mt: e.modify_time,
            mtStr: r.getDateStr(e.modify_time),
            mtoStr: r.getorcDateStr(e.modify_time),
            uin: e.owner_uin || G.info.uin,
            filenum: e.size,
            nick: e.owner_name || G.info.nickName,
            mnick: e.modify_name || G.info.nickName,
            muin: e.modify_uin || G.info.uin,
            orcType: e.type || 2,
            domid: b(e.id),
            downNum: 0
        };
        var t = c.check(a.id);
        if (t) {
            a.localpath = t;
            a.succ = true;
        }
        return a;
    };
    p.addData = function(e) {
        if (!e) {
            return;
        }
        if (e.orcType === 2) {
            G.folderMap()[e.id] = e;
        } else {
            G.fileMap()[e.filepath] = e;
        }
    };
    p.getData = function(e) {
        return G.folderMap()[e] || G.fileMap()[e] || false;
    };
    p.remove = function(e) {
        if (G.folderMap()[e]) {
            delete G.folderMap()[e];
        }
        var a = G.fileMap()[e];
        if (a) {
            a.isRemoved = true;
            delete G.fileMap()[e];
            delete G.fileMap()[a.filepath];
        }
    };
    p.getFile = function(e, a) {
        return G.fileMap()[e] || G.fileMap()[a] || false;
    };
    p.getTask = function(e) {
        return G.cMap[e] || false;
    };
    p.setAllNum = function(e) {
        var a = "total_cnt";
        if (!G.file) {
            G.file = {};
        }
        G.file.allnum = e.total || 0;
    };
    p.setAllSpace = function M(e) {
        if (!G.file) {
            G.file = {};
        }
        G.file.capacitytotal = n.getSize(e.totalSpace);
        G.file.capacityused = n.getSize(e.usedSpace);
        G.file.ct = e.totalSpace;
        G.file.cu = e.usedSpace;
    };
    p.removeAllNum = function(e) {
        if (G.file.allnum) {
            G.file.allnum--;
        }
        if (e.remoteType === 1) {
            G.file.cu -= e.size;
            G.file.capacityused = n.getSize(G.file.cu);
        }
    };
    p.addAllNum = function(e) {};
    p.updateAllNum = function(e) {
        var a = {
            files: [],
            action: ""
        };
        e = d.extend(a, e);
        var t = e.action;
        var i = e.files;
        var n = 0;
        for (var r = i.length - 1; r >= 0; r--) {
            n += i[r].size;
        }
        if (t === "add") {
            G.file.allnum = G.file.allnum + i.length;
            G.file.cu += n;
        } else if (t === "remove") {
            G.file.allnum = G.file.allnum - i.length;
            G.file.cu -= n;
        } else {
            console.log("illegal action");
        }
        w();
    };
    p.setRole = function(e) {
        if (v) {
            return;
        }
        v = true;
        var a = e.userRole || 0;
        var t = e.openFlag || 0;
        var i = 0;
        var n = 0;
        var r = false;
        var o = e.userRole === 3 ? true : false;
        if (a >= 1 && a !== 4) {
            i = 1;
            a === 1 && (n = 1);
            r = true;
        } else if (a === 3 && t === 1) {
            o = true;
        }
        G.info.isAdmin = i;
        G.info.isMaster = n;
        G.info.isVisitor = o;
        G.info.isPublic = t;
        G.canCreateFolder = r;
        report("enter", t);
        report("showSearchBtn");
        $("body").addClass("auth" + G.info.isAdmin);
    };
    function y(e) {
        var a = {};
        for (var t in e) {
            a[t] = e[t];
        }
        return a;
    }
    p.task2file = function(e) {
        var a = e;
        var t = a.filepath.substr(1, 3);
        t = parseInt(t);
        var i = parseInt(new Date().getTime() / 1e3, 10);
        var l = n.getFileName(a.filename);
        if (a.status !== "downloadcomplete") {
            a.name = l.filename_name;
            a.fname = a.filename;
            a.fnameEsc = o.decode(a.filename);
            a.nameEsc = o.decode(l.filename_name);
            a.folderid = b(a.folderpath);
            a.down = 0;
            a.filepath = a.filepath;
            a.fp = a.filepath.substr(4);
            a.domid = b(a.filepath);
            a.busid = t;
            a.filetype = n.getType(l.filename_suc);
            a.uin = G.info.uin;
            a.nick = G.info.nickName;
            a.upsize = a.filesize;
            a.temp = t == 102 ? false : true;
            a.ttl = 86400;
            a.ct = i;
            a.ctStr = r.dayStr(i);
            a.mt = i;
            a.mtStr = r.getDateStr(i);
            a.mtoStr = r.getorcDateStr(i), a.type = 1;
            a.succ = true;
            a.admin = true;
            a.isDown = true;
            a.remove = true;
            a.rename = true;
            a.size = a.size;
            a.canEdit = n.canEdit(a.filetype, a.admin);
            a.remoteType = t === 102 ? 1 : 2;
            a.parentId = a.folderpath || "/";
        } else {
            var s = undefined;
            var d = a.id;
            if (a.downloadtasktype === 1) {
                s = y(G.folderMap()[a.filepath]);
            } else {
                s = y(G.fileMap()[a.filepath]);
            }
            a = $.extend(true, s, a);
            a.taskId = d;
            a.isDown = true;
            a.succ = true;
            a.domid = b(a.filepath);
        }
        if (G.cMap[a.id]) {
            delete G.cMap[a.id];
        }
        if (G.cMap[a.filepath]) {
            delete G.cMap[a.filepath];
        }
        if (a.orcType === 2) {
            a.id = a.filepath;
        }
        p.addData(a);
        return a;
    };
    p.setFileList = function(e, a) {
        if (!G.cMap) {
            G.cMap = {};
        }
        var t = [];
        var i = [];
        var f = [];
        var v = [];
        a = d.extend({
            fn: "name",
            t: "bus_id",
            uin: "owner_uin",
            dt: "download_times",
            ut: "create_time",
            mt: "modify_time",
            lp: "local_path",
            ufs: "upload_size",
            fp: "id",
            fs: "size",
            owner_name: "owner_name"
        }, a);
        var m = a.fn;
        var h = a.t;
        var g = a.uin;
        var w = a.dt;
        var y = a.ut;
        var k = a.mt;
        var F = a.lp;
        var T = a.ufs;
        var $ = a.fp;
        var _ = a.fs;
        var S = a.owner_name;
        e = e || [];
        for (var M = 0, D = e.length; M < D; M++) {
            var R = e[M];
            if (R.type === undefined) {
                R.type = 1;
            }
            if (R.type === 1) {
                var j = n.getFileName(R[m]);
                var N = {
                    t: R[h],
                    exp: R.exp || 0,
                    lp: R[F],
                    busid: R[h],
                    fname: R[m],
                    fnameEsc: o.decode(R[m]),
                    name: j.filename_name,
                    nameEsc: o.decode(j.filename_name),
                    suf: j.filename_suf,
                    icon: n.getIcon(j.filename_suf),
                    domid: b("/" + R[h] + R[$]),
                    filepath: "/" + R[h] + R[$],
                    fp: R[$],
                    admin: false,
                    filetype: n.getType(j.filename_suf),
                    uin: R[g],
                    nick: R[S],
                    size: R[_],
                    sizeStr: n.getSize(R[_]),
                    upsize: R[T],
                    temp: R[h] === 104 ? true : false,
                    down: R[w],
                    ct: R[y],
                    ctStr: r.dayStr(R[y]),
                    mt: R[k],
                    parentId: R["parent_id"],
                    mtStr: r.dayStr(R[k]),
                    mtoStr: r.getorcDateStr(R[k]),
                    orcType: R.type,
                    md5: R.md5,
                    safeType: R["safe_type"],
                    remove: false,
                    rename: false,
                    isDown: false
                };
                if (R.gc) {
                    N.gc = R.gc;
                }
                if (R.group_name) {
                    N.gname = R.group_name;
                }
                N.admin = x(R[g]);
                if (N.admin) {
                    N.remove = true;
                    N.rename = true;
                }
                N.canEdit = n.canEdit(N.filetype, N.admin);
                N = C(N);
                var I = c.check(N.filepath);
                if (I) {
                    N.isDown = true;
                    N.localpath = I;
                    N.succ = true;
                    report("showOpenFile", G.module(), 1);
                } else {
                    report("showDownloadBtn", G.module(), 1);
                }
                reportNew("newFileShow", {
                    ver1: N.isDown ? 1 : 2,
                    ver2: G.info.isAdmin ? 1 : 2
                });
                if (N.safeType) {
                    var O = G.getReportInfo(N);
                    O.ver3 = O.ver4;
                    O.ver4 = O.ver5;
                    O.ver5 = O.ver6;
                    delete O.ver6;
                    reportNew("blackExp", O);
                }
                if (N.result === 3 && !G.previewCache[N.filepath]) {
                    t.push(N);
                }
                if (G.previewCache[N.filepath]) {
                    N.previewObj = G.previewCache[N.filepath];
                }
                G.fileMap()[N.filepath] = N;
                if (R[_] === R[T]) {
                    i.push(N);
                } else if (R[g] === G.info.uin) {
                    l.add(N);
                    f.push(N);
                }
            } else {
                var N = p.filterFolder(R);
                G.folderNum++;
                p.addData(N);
                v.push(N);
                reportNew("folderShow", {
                    ver1: N.downNum === N.fileNum ? 1 : 2,
                    ver2: G.info.isAdmin ? 1 : 2
                });
                report("showOpenFile", G.module(), 1);
            }
        }
        G.topFolder = {
            fname: "群文件",
            fnameEsc: "群文件",
            id: "/",
            icon: "folder",
            mt: 0,
            mtStr: 0,
            uin: 0,
            filenum: 0,
            nick: 0,
            type: 2
        };
        if (f.length > 0) {
            G.cList = f;
            u.trigger("box.renderNum");
        }
        if (t.length > 0) {
            s.getThumb(t);
        }
        if (v.length > 0) {
            report("folderNum", G.module(), v.length);
        }
        report("showSeeBtn", G.module());
        return {
            file: i,
            folder: v
        };
    };
    function x(e) {
        if (G.info.isAdmin || e === G.info.uin) {
            return true;
        } else {
            return false;
        }
    }
    function k(e) {
        if (G.info.isAdmin || e === G.info.uin) {
            return true;
        } else {
            return false;
        }
    }
    function F() {
        return !G.info.isVisitor;
    }
    var T = 1;
    var _ = 2;
    function C(e) {
        var a = 0;
        if (!e || typeof e.name === "undefined") {
            console.log(!e, !e.name);
            return;
        }
        if (e.filepath) {
            e.filepath = e.filepath.replace(/\\\//g, "/");
        }
        if (!e.remoteType) {
            switch (e.busid) {
              case 102:
                e.remoteType = T;
                break;

              case 104:
              case 105:
                e.remoteType = _;
                break;

              default:
                e.remoteType = T;
            }
        }
        if (e.lp) {
            if (G.mac) {
                e.localpath = o.decode(e.lp);
            } else {
                e.localpath = o.decode(e.lp).replace(/\\|\//g, "\\\\");
            }
        }
        if (e.upsize < e.size) {
            if (e.uin === G.info.uin) {
                e.type = "continueupload";
                e.status = "continue";
                e.canContinueUpload = true;
                e.taskStarttime = e.ct;
                e.styles = "upload pause";
                e.csize = e.upsize;
                e.csizeStr = n.getSize(e.upsize);
                e.cPercent = 0;
                if (e.upsize && e.size) {
                    e.cPercent = 100 * e.upsize / e.size;
                }
                e.notComplete = true;
                e.result = 1;
                f.parse(e);
            }
        } else {
            e.result = 2;
            if (e.auditflag > 0) {
                console.warn("auditFlag", e);
            }
            var t = e.name;
            var i = e.size;
            var r = e.ct;
            if (!e.down) {
                e.down = 0;
            }
            if (e.filetype === "图片") {
                e.result = 3;
                if (!G.info.isVisitor) {
                    e.preview = true;
                }
            }
            if (e.remoteType === _ && e.isAdmin) {
                e.canForever = true;
            }
            var l = 0;
            if (i < 1024 * 100) {
                l = 5;
            } else if (i < 1024 * 1024) {
                l = 4;
            } else if (i < 1024 * 1024 * 10) {
                l = 3;
            } else if (i < 1024 * 1024 * 50) {
                l = 2;
            } else if (i < 1024 * 1024 * 100) {
                l = 1;
            }
            var s = [];
            if (e.isAdmin) {
                e.canDelete = true;
                e.canRename = true;
                s.push("can_delete=1 ");
                s.push("can_rename=1 ");
            }
            if (e.preview) {
                s.push("can_preview=1 ");
            }
            if (e.canForever) {
                s.push("can_forever=1 ");
            }
            e.canDo = s.join("");
            e.showMore = "";
            if (e.canDo === "") {
                e.showMore = "disable_more";
            }
            e.sizeType = l;
            if (!e.styleTemp) {
                e.styleTemp = "";
            }
            if (!e.styleIssucc) {
                e.styleIssucc = "";
            }
            e.expireStr = "";
            e.fileTitle = e.filename;
            if (e.remotetype === _) {
                e.styleTemp = "temp";
                e.expireStr = d.getExpriesDayNum(e.ttl) + "天后到期";
                e.fileTitle += " (临时文件：剩余" + data.getExpriesDayNum(e.ttl) + "天)";
            }
        }
        return e;
    }
    var S = function() {
        var e = window.external && window.external.getPreviewSuffixConfig && window.external.getPreviewSuffixConfig();
        if (e === null) {
            e = {
                content: []
            };
        }
        if (typeof e === "string") {
            try {
                e = JSON.parse(e);
            } catch (a) {}
        }
        if ((typeof e === "undefined" ? "undefined" : i(e)) !== "object") {
            e = {
                content: []
            };
        }
        var t = {};
        if (e = e.content) {
            var n = function l(a, i) {
                var n = e[a].suffix, r = e[a].maxsize;
                var o = n.split(".");
                o.forEach(function(e, a, i) {
                    if (e) {
                        t[e] = r;
                    }
                });
            };
            for (var r = 0, o = e.length; r < o; r++) {
                n(r, o);
            }
        }
        return function(e, a) {
            var i = undefined;
            if ((i = t[e]) && a <= i) {
                return true;
            }
        };
    }();
    p.clearComplete = function() {
        l.clearComplete();
    };
}, function(e, a, t) {
    "use strict";
    var i = t(18);
    var n = window.localStorage;
    function r() {
        var e = i.getCookie("uin");
        if (!e) {
            return 0;
        }
        e += "";
        return e.replace(/^[\D0]+/g, "");
    }
    var o = "newbie" + r();
    var l = function c() {
        var e = $("#fileListDom");
        var a = e.find(".file").eq(0);
        console.log("getfileidx", G.nowFolder);
        if (a.length > 0 && G.nowFolder === "/") {
            var t = a[0].offsetTop;
            var i = $(".scroll-dom").height();
            var n = a.height();
            if (t < i) {
                if (t + 76 > i) {
                    return {
                        t: t - 76,
                        u: 0
                    };
                } else {
                    return {
                        t: t + n,
                        u: 1
                    };
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    var s = function u() {
        $("#newBie").bind("click", function() {
            $("#newBie").hide();
            try {
                n.setItem(o, 1);
            } catch (e) {
                n.clear();
                n.setItem(o, 1);
            }
        });
    };
    var d = function p() {
        if (G.nowFolder === "/") {
            var e = l();
            if (e) {
                $("#newBie").show();
                $("#newBieTips").css("top", e.t + 78 + "px");
                if (!e.u) {
                    $("#newBieTips").addClass("bottom");
                }
                s();
            } else {
                $("#newBie").hide();
            }
        } else {
            $("#newBie").hide();
        }
    };
    var f = function v() {
        $("#newBie").remove();
    };
    $("body").bind("newbie", function(e) {
        try {
            var a = n.getItem(o);
            if (a) {
                f();
            } else {
                d();
            }
        } catch (e) {
            console.info(e);
        }
    });
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: true
    });
    a.init = na;
    a.listClick = ra;
    var i = t(103);
    var n = t(77);
    var r = t(151);
    var o = t(101);
    var l = $("#customMenu");
    var s = $(".scroll-dom");
    var d = 76;
    var f = 500;
    var c = {};
    var u = 0;
    var p = 44;
    var v = "dragDiv";
    var m = "w";
    var h = 0;
    var g = 0;
    var w = 0, b = 0;
    var y = 0;
    var x = false;
    var k = false;
    var F = false;
    var T = 0;
    var _ = 0;
    var C = "0px", S = "0px", M = "0px", D = "0px";
    var R = false;
    var j = undefined;
    var N = undefined;
    var I = undefined;
    var O = undefined;
    var L = 0;
    var E = 0;
    var P = 0;
    var A = 0;
    var B = document.body.clientWidth;
    var z = document.body.clientHeight;
    var q = function oa() {
        var e = G.onlyGetDom().find(".selected");
        var a = e.length;
        var t = [];
        var i = false;
        G.selectRows = [];
        for (var r = 0; r < a; r++) {
            var o = e[r];
            if (o.classList.contains("fold")) {
                i = o;
            } else {
                var l = o.getAttribute("data-path");
                var s = n.getData(l);
                if (s) {
                    G.selectRows.push(s);
                    t.push(s);
                }
            }
        }
        return {
            list: t,
            fold: i
        };
    };
    var U = function la() {
        l.addClass("hide");
    };
    var H = function sa(e) {
        x = false;
        if ($(".selected").length === 0) {
            return;
        }
        k = true;
    };
    var J = function da(e) {
        k = false;
        var a = function f() {
            $(".hover").removeClass("hover");
            $(".selected").removeClass("selected");
            Y();
        };
        if ($("#dragItem .status").hasClass("disable")) {
            a();
            return;
        }
        var t = e.clientY;
        var i = q();
        var r = i.list;
        var l = $(e.target);
        if (!l.hasClass("fold")) {
            l = l.parents(".fold");
        }
        var s = l.data("path");
        var d = n.getData(s);
        if (d) {
            o.movelist(r, s, true);
        }
        F = false;
        a();
    };
    var V = function fa(e) {
        var a = $(e.target);
        var t = e.clientX;
        var o = e.clientY;
        if (!a.hasClass("list-item")) {
            a = a.parents(".list-item");
        }
        var s = q();
        var d = s.list;
        var f = {};
        var c = undefined;
        var u = function g(e) {
            var t = false;
            if (a.hasClass("file") || a.hasClass("fold")) {
                t = true;
                return t;
            }
            var i = a.data("path");
            if (!e) {
                t = false;
            } else if (e && e.filepath === i) {
                t = true;
            } else {
                t = false;
            }
            return t;
        };
        if (d.length > 1 && a.hasClass("selected")) {
            r.renderCustomMenu(l, d);
            c = "chooseMenuShow";
            f.ver1 = a.length > 0 ? 1 : 2;
            f.ver2 = G.info.isAdmin ? 1 : 2;
            f.ver3 = G.module() === 1 ? 0 : 1;
        } else {
            $(".selected").removeClass("selected");
            k = false;
            if (u(d[0])) {
                a.addClass("selected");
                var p = a.data("path");
                var v = n.getData(p);
                G.selectRow = v;
                G.selectRows = [ v ];
                f = G.getReportInfo(v);
                if (v.orcType === 2) {
                    c = "folderRightMenuShow";
                } else {
                    c = "fileRightMenuShow";
                }
                if ($(e.target).parents(".group1111").length > 0) {
                    v.othergroup = true;
                }
                if (ta()) {
                    v.issearch = true;
                }
                r.renderCustomMenu(l, v);
            } else {
                c = "blankRightMenuShow";
                f.ver1 = a.length > 0 ? 1 : 2;
                f.ver2 = G.info.isAdmin ? 1 : 2;
                f.ver3 = G.module() === 1 ? 0 : 1;
                r.renderCustomMenu(l);
                i.changeDownLoadBtn(false);
            }
        }
        reportNew(c, f);
        l.removeClass("hide");
        var m = l.width();
        var h = l.height();
        if (o + h > z) {
            o += z - (o + h) - 10;
        }
        if (t + m > B) {
            t += B - (t + m) - 10;
        }
        l.css({
            top: o + "px",
            left: t + "px"
        });
    };
    var Q = function ca(e) {
        if (!c.x) {
            c.x = e.clientX;
            c.y = e.clientY;
        }
        if (Math.abs(e.clientX - c.x) < 10 && Math.abs(e.clientY - c.y) < 10) {
            return false;
        } else {
            c.x = e.clientX;
            c.y = e.clientY;
        }
        var a = +new Date();
        var t = a - u < f;
        u = a;
        if (t) {
            k = false;
            x = false;
        }
        return t;
    };
    var W = function ua(e) {
        try {
            var a = e.clientY - d + y;
            var t = Math.ceil(a / p) - 1;
            return G.onlyGetDom().find(".list-item").eq(t);
        } catch (i) {
            return $("body");
        }
    };
    var Y = function pa() {
        $("#dragItem").remove();
    };
    var X = function va(e) {
        var a = e.clientX;
        var t = e.clientY;
        if (a > 10 && t > 88 && a < B - 10 && t < z - 10) {
            return true;
        }
        x = false;
        k = false;
        return false;
    };
    var K = function ma() {
        if ($("#dragDiv").length) {
            $("#dragDiv").remove();
        }
    };
    var Z = function ha(e) {
        K();
        if (k) {
            J(e);
        }
        if (x) {
            H(e);
        }
        R = false;
        F = false;
    };
    var ea = function ga(e) {
        if (!F || ta()) {
            return;
        }
        if (!X(e) || e.button === 2) {
            Y();
            return;
        }
        var a = e.clientX;
        var t = e.clientY;
        var i = a - I.x - 32;
        var r = t - I.y - 50;
        var o = $("#dragItem");
        if (Math.abs(i) > 5 || Math.abs(t - I.y) > 5) {
            o.show();
        }
        o.css({
            top: I.y + r + "px",
            left: I.x + i + "px"
        });
        var l = W(e);
        if (l.hasClass("fold")) {
            var s = l.data("path");
            var d = n.getData(s);
            $(".fold").removeClass("selected");
            l.addClass("selected");
            if ($("#folderNameWidth").length === 0) {
                $("body").append('<div id="folderNameWidth" style="opacity:0;display:inline-block;">' + d.fnameEsc + "</div>");
            } else {
                $("#folderNameWidth").text(d.fnameEsc);
            }
            var f = $("#folderNameWidth").width();
            o.addClass("can");
            o.find(".move-folder-name").text(d.fnameEsc);
            o.find(".move-info").css("width", f + 66 + "px");
        } else {
            $(".fold").removeClass("selected");
            o.removeClass("can");
        }
    };
    var aa = function wa(e) {
        Y();
        if (!X(e) || ta()) {
            return;
        }
        k = true;
        F = true;
        var a = e.clientX - 32;
        var t = e.clientY - 50;
        var i = $(".selected").find(".file-icons").eq(0).html();
        var r = $(".selected").eq(0).data("path");
        var o = 0;
        $(".selected").each(function() {
            if ($(this).hasClass("file")) {
                o++;
            }
        });
        var l = n.getFile(r);
        var s = $('<div class="drag-item" id="dragItem"><div class="item"><div class="filesbig-' + l.icon + '_big"></div><span class="file-num">' + o + '</span></div><div class="status icon-cannot"></div><div class="bgs"></div><div class="move-info"> 移动到 <span class="move-folder-name"></span></div></div>');
        s.css({
            top: t + "px",
            left: a + "px"
        });
        s.hide();
        I = {
            x: a,
            y: e.clientY
        };
        $("body").append(s);
        if (l.previewObj) {
            (function() {
                var e = l.previewObj.url + "&pictype=scaled&size=50*50";
                var a = new Image();
                a.onload = function() {
                    s.find(".filesmall-pic").css("background-image", "url(" + e + ")").addClass("thumb");
                };
                a.onerror = function() {
                    console.log("缩略图加载失败!", e);
                };
                a.src = e;
            })();
        }
    };
    var ta = function ba() {
        return G.module() === 3;
    };
    var ia = function ya() {
        if (G.module() === 3) {
            T = 58;
            _ = 58;
        } else {
            T = 0;
            _ = 0;
        }
    };
    function na() {
        var e = function r(e) {
            if (typeof j.x !== "undefined" && R) {
                var a = e - j.x;
                var t = Math.abs(a);
                R.width(t);
                if (a < 0) {
                    R.css("margin-left", a + "px");
                } else {
                    R.css("margin-left", 0);
                }
            }
        };
        var a = function o(e) {
            if (typeof j.y !== "undefined" && R) {
                var a = e - j.y;
                var t = Math.abs(a);
                R.height(t);
                if (a < 0) {
                    R.css("margin-top", a + "px");
                } else {
                    R.css("margin-top", 0);
                }
            }
        };
        var t = function f(e) {
            if (!X(e)) {
                Z(e);
                return;
            }
            $(".selected").removeClass("selected");
            var a = j.y - T;
            var t = N.y - T;
            if ($(e.target).parents(".group1111").length > 0) {
                t -= _;
            }
            var n = Math.floor(a / p);
            var r = Math.floor(t / p);
            n < 0 ? n = 0 : n;
            var o = G.onlyGetDom().find(".list-item");
            var l = undefined;
            if (n < r) {
                l = o.slice(n, r + 1);
            } else if (n === r) {
                l = [ o.eq(r) ];
            } else {
                l = o.slice(r, n + 1);
            }
            if (l.length > 1) {
                $("body").addClass("drag-module");
            }
            var s = false;
            l.each(function() {
                if (this.classList.contains("file")) {
                    this.classList.add("selected");
                    s = true;
                }
            });
            i.changeDownLoadBtn(s);
        };
        $(document).on("mousedown", ".scroll-dom", function(e) {
            ia();
            K();
            var a = Q(e);
            if (a) {
                e.stopPropagation();
                return;
            }
            var t = function l() {
                if (ta()) {
                    return;
                }
                $(".selected").removeClass("selected");
                var e = i.clientX;
                var a = i.clientY + y - d;
                R = $('<div id="' + v + '" class="drag-div"></div>');
                R.css({
                    top: a + "px",
                    left: e + "px"
                });
                j = {
                    x: e,
                    y: a
                };
                s.append(R);
                x = true;
                k = false;
            };
            var i = window.event || e;
            var n = i.button;
            try {
                if (n === 0) {
                    if (ta()) {
                        return;
                    }
                    U(e);
                    var r = $(e.target);
                    var o = r.hasClass("drag-dom");
                    if (r.parents(".fold").length > 0) {
                        k = false;
                        o = false;
                    }
                    if (!r.hasClass("selected")) {
                        r = r.parents(".selected");
                    }
                    if (k || r.hasClass("selected")) {
                        if (r.hasClass("selected") && r.hasClass("file") || o) {
                            $(e.target).parents(".file").addClass("selected");
                            aa.call(this, e);
                        } else {
                            t();
                        }
                    } else {
                        t();
                    }
                } else if (n === 2) {
                    V.call(this, i);
                }
            } catch (e) {
                console.log(e);
            }
        });
        $(document).on("mousemove", ".scroll-dom", function(i) {
            try {
                var n = window.event || i;
                var r = n.button;
                if (r === 0) {
                    var o = n.clientY + y - d;
                    if (k) {
                        ea(i);
                    } else if (x) {
                        e(n.clientX);
                        a(o);
                        N = {
                            x: n.clientX,
                            y: o
                        };
                        t(i);
                    }
                } else {
                    x = false;
                }
            } catch (i) {}
        });
        $(document).on("mouseup", ".scroll-dom", function(e) {
            Z(e);
            $("body").removeClass("drag-module");
        });
        $(document).on("click", function() {
            l.addClass("hide");
        });
        $(document).bind("contextmenu", function(e) {
            return false;
        });
        s.on("scroll", function() {
            y = this.scrollTop;
        });
        var n = function c() {
            if (B <= 800) {
                $("body").removeClass("mid-width");
                $("body").removeClass("max-width");
                $("body").addClass("min-width");
            } else if (B <= 1200) {
                $("body").removeClass("mid-width");
                $("body").removeClass("min-width");
                $("body").addClass("mid-width");
            } else {
                $("body").removeClass("min-width");
                $("body").removeClass("mid-width");
                $("body").addClass("max-width");
            }
        };
        $(window).on("resize", function() {
            B = document.body.clientWidth;
            z = document.body.clientHeight;
            $(".scroll-dom").height(z - 76);
            n();
        });
        z = document.body.clientHeight;
        $(".scroll-dom").height(z - 76);
        n();
    }
    function ra(e) {
        $(".list-item").removeClass("selected");
        this.classList.add("selected");
        i.changeDownLoadBtn(this.classList.contains("file"));
    }
}, function(e, a, t) {
    "use strict";
    var i = t(144);
    var n = l(i);
    var r = t(79);
    var o = l(r);
    function l(e) {
        if (e && e.__esModule) {
            return e;
        } else {
            var a = {};
            if (e != null) {
                for (var t in e) {
                    if (Object.prototype.hasOwnProperty.call(e, t)) a[t] = e[t];
                }
            }
            a.default = e;
            return a;
        }
    }
    var s = [ t(21), t(22), t(81), t(145), t(146), t(147), t(148), t(23), t(76), t(149), t(24), t(150) ];
    var d = {
        "history.next": n.next,
        "history.pref": n.pref
    };
    var f = {
        "list.select": o.listClick
    };
    s.push(d);
    s.push(f);
    function c() {
        var e = {};
        for (var a = 0; a < s.length; a++) {
            var t = s[a];
            var i = undefined;
            for (i in t) {
                if (t.hasOwnProperty(i)) {
                    e[i] = t[i];
                }
            }
        }
        e["tips.close"] = function() {
            $("#alertTips").remove();
        };
        return e;
    }
    e.exports = {
        getHandlerTasks: c
    };
}, function(e, a, t) {
    "use strict";
    var i = $(G.handler);
    var n = $("#fileNum");
    var r = $("#fileNumMenu");
    var o = $(".file-more");
    var l = $("#fileMoreMenu");
    var s = t(151);
    var d = t(77);
    var f = null;
    var c = undefined;
    var u = $("#fileFoward");
    var p = $("#fileFowardTo");
    var v = $("#fileOpenFolder");
    var m = $("#filePreview");
    var h = $("#renameFile");
    var g = $("#foreverFile");
    var w = $("#fileDelete");
    var b = $("#fileMove");
    function y(e, a) {
        report("clkFiles");
        var t = $(".hover-border.file-num-toggle");
        if (r.is(":hidden")) {
            r.show();
            t.addClass("active");
        } else {
            r.hide();
            t.removeClass("active");
        }
    }
    function x() {
        var e = G.selectRow.path;
        var a = d.getData(e);
        if (a.icon === "pic" && a.preview) {
            m.removeClass("disable");
        } else {
            m.addClass("disable");
        }
        if (!a.isDown) {
            v.attr("title", "另存为").attr("data-action", "file.saveAs");
            v.find(".menu-item-label").text("另存为");
        } else {
            v.attr("title", "在文件夹中显示").attr("data-action", "file.openFolderInBox");
            v.find(".menu-item-label").text("在文件夹中显示");
        }
        if (a.temp && a.admin) {
            g.removeClass("disable");
        } else {
            g.addClass("disable");
        }
        if (a.admin) {
            h.removeClass("disable");
            w.removeClass("disable");
            report("showFolderMove");
        } else {
            h.addClass("disable");
            w.addClass("disable");
        }
        if (G.info.isAdmin) {
            b.removeClass("disable");
        } else {
            b.addClass("disable");
        }
        if (G.module() !== 3) {
            b.show();
        } else {
            b.hide();
        }
    }
    function k() {
        var e = G.selectRow.path;
        var a = d.getData(e);
        if (a) {
            if (a.succ) {
                l.find(".open-in-folder").removeClass("disable");
                l.find(".download-item").removeClass("disable");
            } else {
                l.find(".open-in-folder").addClass("disable");
                if (a.filenum === 0) {
                    l.find(".download-item").addClass("disable").removeAttr("data-action");
                } else {
                    l.find(".download-item").removeClass("disable").attr("data-action", "folder.download");
                    report("showDownloadBtn", G.module());
                }
            }
        }
        if (G.oldVersion) {
            l.find(".download-item").addClass("disable").removeAttr("data-action");
        }
    }
    function F(e) {
        $(".list-item").removeClass("active");
        e.addClass("active");
    }
    function T() {
        var e = this;
        var a = $(this).parents(".list-item");
        var t = a.data("path");
        var i = undefined;
        var n = undefined;
        F(a);
        report("clkShowBtn", G.module());
        n = d.getData(t);
        if (n.orcType === 2) {
            i = "fold";
            report("clkFolderMore", G.info.isAdmin ? 0 : 1);
        } else if (n.orcType == 1) {
            i = "file";
            if (n.succ) {
                report("clkUnMore");
            } else {
                report("clkMore");
            }
        }
        G.selectRow = n || {};
        G.selectRow.path = t;
        G.selectRow.type = i;
        G.selectRows = [ G.selectRow ];
        if (i === "fold") {
            if (c !== i) {
                s.renderFolder();
            }
            k();
        } else if (i === "file") {
            if (c === i) {
                x();
            } else {
                s.renderFile();
                u = $("#fileFoward");
                p = $("#fileFowardTo");
                v = $("#fileOpenFolder");
                m = $("#filePreview");
                h = $("#renameFile");
                g = $("#foreverFile");
                w = $("#fileDelete");
                b = $("#fileMove");
                var r = $("#menuPreview");
                x();
            }
        }
        c = i;
        if (e == f && l[0].style.display === "block") {
            l.css("display", "none");
        } else {
            var o = e.getBoundingClientRect();
            var y = $(e).parents(".scroll-dom")[0];
            var T = y.getBoundingClientRect();
            var _ = T.right - o.right;
            var C = document.querySelector(".scroll-dom");
            var S = C.scrollTop;
            var M = C.scrollHeight;
            var D = o.bottom + S - 52;
            l.css("display", "block");
            var R = l.get(0).offsetHeight;
            if (D + R > S + window.innerHeight) {
                D = D - R - 28;
            }
            l.css({
                right: _ + "px",
                top: D + "px"
            });
            f = e;
        }
    }
    function _(e) {
        return $(e).closest("#fileNumMenu").length == 0;
    }
    function C(e) {
        return $(e).closest("#fileMoreMenu").length == 0 && $(e).closest(".file-more").length == 0;
    }
    function S(e) {
        if (_(e)) {
            r.hide();
            var a = $(".hover-border.file-num-toggle");
            a.removeClass("active");
        }
        if (C(e)) {
            l.hide();
        }
    }
    function M() {
        if (this.nodeName === "LI") {
            reportNew("blankRightMenuClick", {
                ver1: G.customMenuLength ? 1 : 2,
                ver2: G.info.isAdmin ? 1 : 2,
                ver3: 3
            });
        }
        report("clkRefresh");
    }
    function D() {
        S();
        report("clkFeed");
    }
    i.bind("menu.hide", S);
    e.exports = {
        "menu.filenum": y,
        "menu.filemore": T,
        "menu.foldmore": T,
        "menu.hide": S,
        "menu.refresh": M,
        "menu.feedback": D
    };
}, function(e, a, t) {
    "use strict";
    var i = {
        name: {
            initWidth: "auto",
            minWidth: 80,
            fileRow: ".item-name-adjust"
        },
        update: {
            initWidth: 165,
            minWidth: 96,
            fileRow: ".item-time",
            related: "name"
        },
        size: {
            initWidth: 80,
            minWidth: 68,
            fileRow: ".item-size",
            related: "update"
        },
        "upload-user": {
            initWidth: 100,
            minWidth: 82,
            fileRow: ".item-user",
            related: "size"
        },
        source: {
            initWidth: 100,
            minWidth: 68,
            fileRow: ".item-source",
            related: "upload-user"
        }
    };
    var n = false, r = false, o = false;
    var l = {};
    var s = $("body"), d = $(".file-name-wrap"), f = $(".item-name-adjust");
    var c = $("<style></style>"), u = "", p = $("<style></style>"), v = "";
    $("head").append(c);
    $("head").append(p);
    function m(e, a) {
        if (!~u.indexOf(e)) {
            u += ".file-list .list-item " + e + " {" + a + "}";
            return c[0].innerHTML = u;
        }
        u = u.replace(new RegExp(e + "\\s{.*}", "g"), e + " {" + a + "}");
        c[0].innerHTML = u;
    }
    function h(e, a) {
        if (!~v.indexOf(e)) {
            v += ".file-list .list-item " + e + " {width: " + a + "px;}";
            return p[0].innerHTML = v;
        }
        v = v.replace(new RegExp(e + "\\s{width:\\s\\d*px;}", "g"), e + " {width: " + a + "px;}");
        p[0].innerHTML = v;
    }
    function g(e) {
        var a = $(this), t = a.data("resize-aim"), r = $("[data-resize-id=" + t + "]"), o = i[t].related, f = $("[data-resize-related-id=" + o + "]"), c = [];
        var p = e.clientX, v = e.clientY;
        var g = i[t].minWidth, w = i[o].minWidth;
        u = "";
        for (var b in i) {
            if (b === t || b === o || b === "name") {
                continue;
            }
            var y = $("[data-resize-id=" + b + "]"), G = y.width();
            h(i[b].fileRow, G);
            m(i[b].fileRow, "max-width: " + G + "px; min-width: " + G + "px;");
            y.width(G).css({
                "max-width": G,
                "min-width": G
            });
            c.push({
                $tab: y,
                aim: b
            });
        }
        var x = d.width();
        d.width(x).css("flex", "initial");
        h(".item-name-adjust", x);
        m(".item-name-adjust", "flex: initial;");
        s.addClass("ondrag");
        l = {
            x: p,
            y: v,
            aim: t,
            aimWidth: r.width(),
            related: o,
            relatedWidth: f.width(),
            aimMinWidth: g,
            relatedMinWidth: w,
            $drag: a,
            $aim: r,
            $related: f,
            aimRow: i[t].fileRow,
            $aimRow: $(i[t].fileRow),
            relatedRow: i[o].fileRow,
            $relatedRow: $(i[o].fileRow),
            dontMoveTabs: c
        };
        n = true;
    }
    function w(e) {
        if (!n || e.button !== 0) {
            return;
        }
        if (!e.clientX) {
            return;
        }
        if (r && e.clientX > l.$drag.offset().left + 5) {
            return;
        } else if (r) {
            r = false;
        }
        if (o && e.clientX < l.$drag.offset().left - 5) {
            return;
        } else if (o) {
            o = false;
        }
        var a = l.x - e.clientX, t = a + l.aimWidth, i = l.relatedWidth - a, s = a <= 0, d = undefined, f = undefined;
        if (s) {
            d = Math.max(t, l.aimMinWidth);
            f = i;
            if (d <= l.aimMinWidth) {
                f = i - (l.aimMinWidth - t);
            }
        } else {
            d = t;
            f = Math.max(i, l.relatedMinWidth);
            if (f <= l.relatedMinWidth) {
                d = t - (l.relatedMinWidth - i);
            }
        }
        l.aimWidth = d;
        l.relatedWidth = f;
        l.x = e.clientX;
        l.$aim.width(d);
        l.$related.width(f);
        h(l.aimRow, d);
        h(l.relatedRow, f);
        if (d <= l.aimMinWidth) {
            r = true;
            l.x = l.$drag.offset().left + 5;
        }
        if (f <= l.relatedMinWidth) {
            o = true;
            l.x = l.$drag.offset().left + 5;
        }
    }
    function b(e) {
        if (!n) {
            return;
        }
        console.log("release adjust tab mouse");
        n = false;
        d.css("flex", 1);
        m(".item-name-adjust", "flex: 1;");
        s.removeClass("ondrag");
        l.dontMoveTabs.forEach(function(e) {
            var a = i[e.aim].minWidth;
            e.$tab.css({
                "max-width": "none",
                "min-width": a
            });
            m("" + i[e.aim].fileRow, "max-width: none; min-width: " + a + "px;");
        });
        reportNew("adjustTab", {
            ver1: G.info.isAdmin ? G.info.isMaster ? 1 : 2 : 3
        });
    }
    function y() {
        console.log("reset Tab");
        for (var e in i) {
            var a = $("[data-resize-id=" + e + "]");
            a.css({
                width: i[e].initWidth,
                "max-width": "none",
                "min-width": "none"
            });
        }
        u = "";
        v = "";
        c[0].innerHTML = u;
        p[0].innerHTML = v;
    }
    $(document).on("mousedown", ".tab-resize", g);
    $(document).on("mousemove", w);
    $(document).on("mouseup.adjustTab", b);
    $(window).on("resize", b);
    e.exports = {
        resetTab: y
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(161).fileEvent;
    var r = t(149).groupEvent;
    var o = t(162).uploadEvent;
    var l = t(162).dropEvent;
    var s = t(152);
    var d = top;
    var f = top.external;
    window.addEventListener("message", u);
    d["PostMessage"] = d["onClientEvent"] = c;
    function c(e) {
        console.log("收到客户端通知:", e);
        var a = undefined;
        if (!e) {
            console.error("[Client] msg is not exist!");
            return;
        }
        if (typeof e === "string") {
            try {
                a = JSON.parse(e);
            } catch (t) {
                console.error("[Client|init()]msg is string, but parse to object catch e!");
            }
        }
        if ((typeof a === "undefined" ? "undefined" : i(a)) !== "object") {
            console.error("[Client|init()]after parse, got no object!");
            return;
        }
        u(a);
    }
    function u(e) {
        var a = e;
        if (a && (typeof a === "undefined" ? "undefined" : i(a)) === "object") {
            if (a.from === "Client") {
                var t = a.data;
                if (typeof t === "string") {
                    t = JSON.parse(a.data) || {};
                }
                var d = t.cmd || "";
                switch (d) {
                  case "OnFiletransporterEvent":
                    n(t.param);
                    break;

                  case "OnGroupShareTabChangedEvent":
                    r(t.param);
                    break;

                  case "OnGroupUploadFileListsEvent":
                    o(param);
                    break;

                  case "OnGroupDropInGroupFolderUpload":
                    o(param);
                    break;

                  default:
                    console.warn("warn:预期外的message.cmd:" + d);
                    break;
                }
            } else if (a.cmd && a.cmd === "OnGroupUploadFileListsEvent") {
                o(a.param);
            } else if (a.cmd && a.cmd === "OnGroupDropInGroupFolderUpload") {
                l(a.param);
            } else {
                var t = a.data;
                if (!t) {
                    return;
                }
                if (typeof t === "string") {
                    t = JSON.parse(t);
                }
                var d = t.cmd || "";
                switch (d) {
                  case "jubao_close":
                    s.hide();
                    break;

                  default:
                    console.warn("warn:预期外的message.cmd:" + d);
                    break;
                }
            }
        }
    }
    window.onClientEvent = c;
    e.exports = {};
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(92);
    var r = t(77);
    var o = {};
    e.exports = o;
    function l(e, a) {
        if (a === 0) {
            r.setAllNum(e);
        }
        r.setRole(e);
        return r.setFileList(e.list);
    }
    o.getList = function(e) {
        e = e || {};
        var a = e.folderId || "/";
        var t = e.filterUin || undefined;
        var r = 0;
        var o = 25;
        var s = e.filterCode || 0;
        var d = false;
        var f = undefined;
        var c = false;
        var u = false;
        return function(e, p, v) {
            if (u) {
                return;
            }
            u = true;
            if (d) {
                p({
                    ec: 1e3,
                    em: "no more items"
                });
                return;
            }
            var m = {
                folder_id: a,
                start_index: r,
                cnt: o,
                filter_code: s,
                filter_uin: t
            };
            var h = JSON.stringify(m) === f;
            f = JSON.stringify(m);
            if (c && h) {
                console.info("same params will be ignored");
                return;
            }
            v && v();
            var g = function w(t) {
                u = false;
                c = true;
                var i = {
                    list: t.file_list,
                    total: t.total_cnt,
                    totalSpace: t.total_space,
                    usedSpace: t.used_space,
                    userRole: t.user_role,
                    openFlag: t.open_flag
                };
                var n = r;
                G.nowFolder = a;
                if (t.file_list && t.file_list.length) {
                    r = r + t.file_list.length;
                }
                if (t.next_index === 0) {
                    d = true;
                }
                e(l(i, s));
                if (n === 0 || n === 1) {
                    G.tab.resetTab();
                }
            };
            if ((typeof nodeData === "undefined" ? "undefined" : i(nodeData)) === "object") {
                g(nodeData);
                nodeData = false;
            } else {
                n.getFileList(m).done(function(e) {
                    g(e);
                }).fail(function(e) {
                    report("getListError");
                    u = false;
                    c = false;
                    p(e);
                });
            }
        };
    };
    o.getFileList = function(e) {
        n.getFileList(e).done(function(e) {
            if (e.total_cnt === 0 && folderId === "/") {
                suc(false);
                return;
            }
            var a = {
                list: e.file_list,
                total: e.total_cnt,
                totalSpace: e.total_space,
                usedSpace: e.used_space,
                userRole: e.user_role,
                openFlag: e.open_flag
            };
            G.nowFolder = folderId;
            if (e.file_list && e.file_list.length) {
                startIndex = startIndex + e.file_list.length;
            }
            if (e.next_index === 0) {
                isEnd = true;
            }
            suc(l(a));
        }).fail(function(e) {
            if (e.fc && e.fc === 1) {
                return;
            }
        });
    };
    o.setAllSpace = function(e, a) {
        n.getSpace().done(function(a) {
            var t = {
                totalSpace: a.total_space,
                usedSpace: a.used_space
            };
            r.setAllSpace(t);
            e(a);
        }).fail(function(e) {
            console.log(e);
        });
    };
}, function(e, a, t) {
    "use strict";
    var i = {};
    var n = t(92);
    var r = t(77);
    var o = t(18);
    e.exports = i;
    G.searchFuncSingtons = {};
    i.search = function l(e) {
        var e = e || {};
        var a = e.succ;
        var t = e.fail;
        var i = e.beforeRequest;
        var r = e.isNew;
        var l = o.extend({
            key_word: "",
            search_type: 0,
            app_id: 4
        }, e.searchParams);
        if (G.mac) {
            l.app_id = 7;
        }
        var s = false;
        var d = JSON.stringify(l);
        if (r || G.searchFuncSingtons[d] == undefined) {
            G.searchFuncSingtons[d] = function() {
                var e = 25;
                var a = undefined;
                var t = 0;
                return function(o, f) {
                    if (t) {
                        console.log("no more items");
                        return;
                    }
                    if (s === true) {
                        return;
                    }
                    l["cookie"] = a;
                    l["count"] = e;
                    i && i();
                    s = true;
                    n.search(l).done(function(e) {
                        if (r) {
                            $("#searchReasult").text(e.total);
                            $(".nav").addClass("hide");
                            $("#searchNav").removeClass("hide");
                        }
                        t = e.is_end;
                        a = e.cookie;
                        o && o(e, d);
                        s = false;
                        $("#fileNum").addClass("hide");
                        $("#searchDom").css("display", "flex");
                        $("#folderName").addClass("hide");
                    }).fail(function(e) {
                        f && f(e);
                        s = false;
                        $("#searchReasult").text(0);
                        $("#searchDom").css("disolay", "none");
                        $("#folderName").addClass("hide");
                    });
                };
            }();
        }
        G.searchFuncSingtons[d](a, t);
    };
    window.search = i.search;
}, function(e, a, t) {
    "use strict";
    var i = t(153);
    var n = t(18);
    var r = $("#boxNum");
    var o = $("#boxListDom");
    var l = $(G.handler);
    var s = false;
    var d = 0;
    var f = true;
    var c = false;
    function u(e, a) {
        var t = o.find('[data-path="' + e + '"]').filter('[data-name="' + a + '"]');
        if (t.length > 0 && !t.hasClass("complete")) {
            return t;
        }
        return false;
    }
    function p(e) {
        var a = o.find('[data-id="' + e + '"]');
        if (a.length > 0 && !a.hasClass("complete")) {
            return a;
        }
        return false;
    }
    function v(e) {
        if (e.type === 1 || e.type === "upload") {
            return p(e.taskId);
        } else if (e.orcType === 2) {
            return p(e.taskId);
        } else {
            return u(e.filepath, e.filename);
        }
    }
    function m(e) {
        var a = v(e);
        if (e.status === "remove") {
            d--;
            n.removeEase(a);
            b();
            return;
        }
        var t = i({
            list: [ e ]
        });
        if (a) {
            a.replaceWith(t);
        }
        if (e.status === "uploadcomplete" || e.status === "downloadcomplete") {
            $("#boxTitle").attr("class", "box-title tri");
            d--;
            b();
        }
    }
    function h(e) {
        var a = v(e);
        c = true;
        if (a.length > 0) {
            return;
        }
        var t = i({
            list: [ e ]
        });
        s = true;
        d++;
        b();
        o.prepend(t);
        o.removeClass("empty");
    }
    function g(e) {}
    function w(e, a) {}
    function b() {
        if (d < 0) {
            d = 0;
        }
        if (d) {
            r.text(d).addClass("small");
        } else {
            r.text(d).removeClass("small");
        }
    }
    function y() {
        c = false;
    }
    function x(e, a) {
        var t = i(a);
        if (s) {
            o.append(t);
        } else {
            o.html(t);
        }
    }
    var k = function C(e) {
        var a = [];
        var t = [];
        for (var i = 0, n = e.length; i < n; i++) {
            if ($.inArray(e[i].id, a) < 0 && $.inArray(e[i].filepath, a) < 0) {
                if (e[i].id) {
                    a.push(e[i].id);
                }
                if (e[i].filepath) {
                    a.push(e[i].filepath);
                }
                t.push(e[i]);
            }
        }
        return t;
    };
    function F() {
        if (!f) {
            return;
        }
        f = false;
        var e = [];
        var a = G.cList;
        var t = G.pList;
        var i = G.compList;
        a = a.concat(t);
        var n = a.length;
        e = a;
        if (i) {
            e = a.concat(i);
        }
        e = k(e);
        d = n;
        b();
        x(null, {
            list: e
        });
        if (e.length > 0) {
            o.removeClass("empty");
        }
        if (i.length > 0) {
            $("#boxTitle").attr("class", "box-title tri");
        } else {}
    }
    function T() {
        n.removeEase(o.find(".complete"));
        if (G.mac) {
            var e = o.find(".err");
            var a = e.length;
            for (var t = 0; t < a; t++) {
                var i = e.eq(t);
                var r = i.data("id");
                l.trigger("task.removeOne", r);
                n.removeEase(i);
            }
        }
        setTimeout(function() {
            if (o.find(".file2").length === 0) {
                o.addClass("empty");
            }
        }, 500);
        $("#boxTitle").attr("class", "box-title empty");
    }
    function _(e) {
        var a = o.find('[data-path="' + e.filepath + '"]');
        a.find(".go-folder").addClass("disable");
    }
    e.exports = {
        updateBoxRow: m,
        addBoxRow: h,
        removeBoxRow: g,
        cleanBox: w,
        render: x,
        firstRender: F,
        updateBoxNum: b,
        clearComplete: T,
        removePoint: y,
        removeOpenFolder: _
    };
}, function(e, a, t) {
    "use strict";
    var i = t(154), n = t(155);
    function r(e, a) {
        var t = i(a);
        e.html(t);
    }
    function o(e) {
        var a = G.getDomPanel().find(".fold");
        var t = a.length ? a : G.getDomPanel();
        t.after(n({
            id: e
        }));
    }
    function l(e) {
        $("#searchDom").css("display", "none");
        if (e) {
            $("#fileNum").addClass("hide").attr("data-action", "menu.filenum");
            $("#box").addClass("one");
            $("#folderName").removeClass("hide");
            $("#headerFolderName").text(e.fnameEsc);
            $("#createFolder").hide();
        } else {
            $("#fileNum").removeClass("hide").attr("data-action", "menu.filenum");
            $("#box").removeClass("one");
            $("#folderName").addClass("hide");
            if (G.canCreateFolder) {
                $("#createFolder").show();
            }
        }
    }
    e.exports = {
        render: r,
        updataFolderHeader: l
    };
}, function(e, a, t) {
    "use strict";
    var i = {};
    var n = $("#groupSize");
    var r = $("#groupSizeBar");
    i.renderSpace = function o() {
        if (G.nowFolder !== "/") {
            return;
        }
        n.text(G.file.capacityused + "/" + G.file.capacitytotal);
        $("#fileNumText").text(G.file.allnum);
        $("#macFileNums").text("共" + G.file.allnum + "个文件");
        var e = parseInt(G.file.cu / G.file.ct * 100);
        r.css("width", e + "%");
        $("#fileNum").removeClass("hide");
        $(".nav").addClass("hide");
        $("#normalNav").removeClass("hide");
    };
    e.exports = i;
}, function(e, a, t) {
    "use strict";
    var i = t(142), n = t(86), r = t(25);
    function o(e, a) {
        var t = a;
        if (!i.check(t)) {
            i.add(t);
        }
        n.addBoxRow(t);
        if (t.type === "download") {
            r.updateDownloadRow(t);
        }
    }
    $(G.handler).bind("client.addTask", o);
}, function(e, a, t) {
    "use strict";
    var i = t(142), n = t(86), r = t(25);
    function o(e, a) {
        var t = a;
        n.updateBoxRow(t);
        if (t.type === "download") {
            r.updateDownloadRow(t);
        }
    }
    $(G.handler).bind("client.updateTask", o);
}, function(e, a, t) {
    "use strict";
    var i = t(140);
    var n = t(157);
    var r = t(158);
    var o = t(139);
    var l = {};
    var s = {};
    function d(e) {
        try {
            if (!e) {
                return;
            }
            if (!G.cMap) {
                G.cMap = {};
            }
            e.taskId = e.id;
            if (e.taskId) {
                G.cMap[e.taskId] = e;
            }
            if (e.filepath) {
                G.cMap[e.filepath] = e;
            }
            var a = n.getType(e.type);
            n.check(a, e.status);
            var t = n.getWord(a, e.status);
            var i = n.getClass(a, e.status);
            if (i === "scan") {
                if (e.cPercent) {
                    t += e.cPercent + "%";
                }
                e.cPercent = 0;
                i = "pre";
            } else if (i === "pre") {
                e.cPercent = 0;
            } else if (i === "pause" || i === "continue") {
                if (e.csizeStr) {
                    t += e.csizeStr;
                }
                if (e.sizeStr) {
                    t += "/" + e.sizeStr;
                }
            } else if (i === "err") {
                e.cPercent = 0;
                if (e.status.indexOf("securityfail") >= 0) {
                    t = "<i class='warn'></i>" + getErrorWording(e);
                    if (e.securityattri >= 1 && e.securityattri <= 5) {
                        t += "<i class='security'></i>";
                    }
                } else {
                    if (e.errorcode == -1e3) {
                        t = "该文件已被删除";
                    }
                    t = "<i class='warn'></i>" + t;
                }
            } else if (i === "progress") {
                if (e.speedStr) {
                    t += e.speedStr;
                }
                var r = undefined;
                if (e.speed) {
                    var s = Math.ceil((e.filesize - e.completesize) / e.speed);
                    var d = Math.floor(s / 3600);
                    var f = Math.floor(s % 3600 / 60);
                    s = Math.floor(s % 60);
                    if (d < 10) {
                        d = "0" + d;
                    }
                    if (f < 10) {
                        f = "0" + f;
                    }
                    if (s < 10) {
                        s = "0" + s;
                    }
                    r = "<span class='lefttime'>" + d + ":" + f + ":" + s + "</span>";
                } else {}
                if (l[e.filepath]) {
                    var c = new Date() - l[e.filepath];
                    if (c > 3e3 && r) {
                        t += r;
                    }
                } else if (e.filepath) {
                    l[e.filepath] = new Date();
                }
            } else if (i === "complete") {
                e.cPercent = 100;
                t += e.sizeStr;
            } else {
                e.c_percent = 0;
            }
            var u = parseInt(new Date().getTime() / 1e3, 10);
            e.ctStr = o.dayStr(u);
            e.wording = t;
            e.styleType = a;
            if (a === "continueupload") {
                e.styleType = "upload";
            }
            e.styleStatus = i;
            if (e.failedFileList && e.failedFileList.length > 0) {
                e.styles = e.styleType;
            } else {
                e.styles = e.styleType + " " + e.styleStatus;
            }
        } catch (p) {
            console.warn("parse", p, e);
        }
    }
    function f(e) {
        e.taskId = e.id;
        if (e.downloadtasktype === 1) {
            e.filepath = e.folderpath;
            e.orcType = 2;
            e.icon = "folder";
            if (G.mac) {
                e.name = e.filename;
            } else {
                e.name = i.getFolderName(e.localpath);
            }
            e.filename = e.name;
            e.filelist = [];
            if (!e.status) {
                e.status = "downloadprogress";
            }
            e.filesize = e.foldersize;
        } else {
            e.orcType = 1;
        }
        e.speedStr = "";
        e.wording = "";
        e.csizeStr = "";
        e.updateFlag = true;
        var a = e.filename;
        var t = e.filesize;
        var n = e.createtime;
        e.speedStr = i.getSize(e.speed);
        if (e.speedStr === 0) {
            e.speedStr = "";
        } else {
            e.speedStr += "/S";
        }
        if (e.size === undefined) {
            e.size = e.completesize;
        }
        e.sizeStr = i.getSize(t);
        e.csizeStr = i.getSize(e.completesize);
        var r = 0;
        if (e.completesize > 0 && e.filesize > 0) {
            r = Math.round(e.completesize * 100 / e.filesize);
        }
        e.cPercent = r;
        var o = a.lastIndexOf(".");
        if (o >= 0) {
            e.name = a.substr(0, o);
            e.suf = a.substr(o);
        } else {
            e.name = a;
            e.suf = "";
        }
        if (!e.icon) {
            e.icon = i.getIcon(e.suf);
        }
        d(e);
        return e;
    }
    function c(e) {
        var a = [];
        for (var t in e) {
            var i = e[t];
            i = f(i);
            if (i.downloadtasktype !== 2) {
                a.push(i);
            } else {
                var n = p(i.fordertaskid);
                if (n) {
                    if (!n.fileTaskList) {
                        n.fileTaskList = [];
                    }
                    n.fileTaskList.push(i.id);
                }
            }
        }
        return a;
    }
    function u(e) {
        var a = [];
        for (var t in G.cMap) {
            var i = G.cMap[t];
            if (i.foldertaskid === e || i.folderpath === e) {
                a.push(i);
            }
        }
        return a;
    }
    function p(e) {
        return G.cMap[e] || false;
    }
    e.exports = {
        get: f,
        getFolderTask: u,
        getOneTask: p,
        parse: d,
        cleanMap: c
    };
}, function(e, a, t) {
    "use strict";
    var i = t(156);
    var n = {};
    e.exports = n;
    var r = "//pan.qun.qq.com/cgi-bin/group_file/";
    var o = {
        checkVip: "//pan.qun.qq.com/cgi-bin/get_vip_id",
        checkOneFile: "//pan.qun.qq.com/cgi-bin/checkAuditFlag",
        rename: "//pan.qun.qq.com/cgi-bin/rename",
        list: "//pan.qun.qq.com/cgi-bin/filelist",
        path: "//pan.qun.qq.com/cgi-bin/thumbnail",
        del: "//pan.qun.qq.com/cgi-bin/del_bat",
        permanent: "//pan.qun.qq.com/cgi-bin/permanent"
    };
    var l = {
        getFileList: r + "get_file_list",
        renameFolder: r + "rename_folder",
        getFileInfo: r + "get_file_info",
        createFolder: r + "create_folder",
        deleteFolder: r + "delete_folder",
        renameFile: r + "rename_file",
        deleteFile: r + "delete_file",
        moveFile: r + "move_file",
        fileSearch: r + "search_file",
        getSpace: r + "get_group_space",
        previewFile: "//pan.qun.qq.com/cgi-bin/thumbnail",
        permanent: "//pan.qun.qq.com/cgi-bin/permanent",
        checkOneFile: "//pan.qun.qq.com/cgi-bin/checkAuditFlag",
        getFileAttr: r + "get_file_attr",
        checkVip: "//pan.qun.qq.com/cgi-bin/get_vip_info"
    };
    n.setPermanent = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.permanent,
            type: "POST",
            data: e
        });
    };
    n.getFileList = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.getFileList,
            type: "GET",
            data: e
        });
    };
    n.deleteFile = function(e) {
        e = e || {};
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        if (e.bus_id) {
            e.file_list = JSON.stringify({
                file_list: [ {
                    gc: G.info.gc,
                    app_id: G.appid,
                    bus_id: e.bus_id,
                    file_id: e.file_id,
                    parent_folder_id: e.parent_folder_id
                } ]
            });
        }
        return i.ajax({
            url: l.deleteFile,
            type: "POST",
            data: e
        });
    };
    n.renameFile = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.renameFile,
            type: "POST",
            data: e
        });
    };
    n.moveFile = function(e) {
        var a = {};
        a.file_list = JSON.stringify({
            file_list: e
        });
        if (!a.gc) {
            a.gc = G.info.gc;
        }
        return i.ajax({
            url: l.moveFile,
            type: "POST",
            data: a
        });
    };
    n.createFolder = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.createFolder,
            type: "POST",
            data: e
        });
    };
    n.deleteFolder = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.createFolder,
            type: "POST",
            data: e
        });
    };
    n.renameFolder = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.renameFolder,
            type: "POST",
            data: e
        });
    };
    n.deleteFolder = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.deleteFolder,
            type: "POST",
            data: e
        });
    };
    n.getPreview = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.previewFile,
            type: "POST",
            data: e
        });
    };
    n.checkOneFile = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.checkOneFile + "?_=" + new Date().getTime(),
            type: "POST",
            data: e
        });
    };
    n.search = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.fileSearch,
            type: "GET",
            data: e
        });
    };
    n.getSpace = function(e) {
        e = e || {};
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.getSpace,
            type: "GET",
            data: e
        });
    };
    n.getFileAttr = function(e) {
        if (!e.gc) {
            e.gc = G.info.gc;
        }
        return i.ajax({
            url: l.getFileAttr,
            type: "GET",
            data: e
        });
    };
    n.checkVip = function() {
        var e = {
            gc: G.info.gc
        };
        return i.ajax({
            type: "GET",
            data: e,
            url: l.checkVip + "?_=" + new Date().getTime()
        });
    };
}, function(e, a, t) {
    "use strict";
    var i = $("#qqVip");
    var n = $("#openVip");
    function r() {
        if (G.flagIsVip) {
            i.html('<i class="icons-vip"></i>极速下载特权</a>').addClass("is-vip");
        }
    }
    function o() {
        if (G.flagIsVip) {
            n.find(".tips-msg").text("尊贵的QQ超级会员，您已获得群文件极速下载特权，快去下载文件体验吧！");
            n.find(".btn-ok").remove();
        }
        n.addClass("open");
        n.find(".btn-ok").focus();
    }
    e.exports = {
        showQQVip: r,
        show: o
    };
}, function(e, a, t) {
    (function(e) {
        "use strict";
        var a = t(18);
        var i = t(159);
        var n = {
            enter: {
                monitor: 2057388,
                mac: 2162523,
                tdw: [ "home", "exp" ]
            },
            clkGroupFile: {
                monitor: 2057389,
                tdw: [ "home", "Clk_grpfiles" ]
            },
            clkFiles: {
                monitor: 2057390,
                tdw: [ "home", "Clk_files" ]
            },
            openVip: {
                monitor: 2057391,
                tdw: [ "home", "Clk_open" ]
            },
            clkFeed: {
                monitor: 2057392,
                tdw: [ "home", "Clk_feed" ]
            },
            clkRefresh: {
                monitor: 2057393,
                tdw: [ "home", "Clk_refresh" ]
            },
            forward: {
                monitor: 0,
                tdw: [ "home", "Clk_towards_mac" ]
            },
            back: {
                monitor: 0,
                tdw: [ "home", "Clk_back" ]
            },
            folder: {
                monitor: 2057394,
                tdw: [ "file", "exp" ]
            },
            propFolder: {
                monitor: 2057401,
                tdw: [ "file", "Clk_property" ]
            },
            folderBtnShow: {
                monitor: 2057396,
                tdw: [ "file", "exp_create" ]
            },
            clkCreateFolder: {
                monitor: 2057397,
                tdw: [ "file", "Clk_create" ]
            },
            createFolderSuc: {
                monitor: 2057398,
                tdw: [ "file", "create_suc" ]
            },
            renameFolder: {
                monitor: 2057400,
                tdw: [ "file", "Clk_rename" ]
            },
            clkFolderMore: {
                monitor: 2057399,
                tdw: [ "file", "Clk_more" ]
            },
            downloadFolder: {
                monitor: 2057399,
                tdw: [ "file", "Clk_down" ]
            },
            deleteFolder: {
                monitor: 2057402,
                tdw: [ "file", "Clk_delete" ]
            },
            returnHome: {
                monitor: 2057395,
                tdw: [ "file", "Clk_home" ]
            },
            folderTree: {
                monitor: 2057403,
                tdw: [ "file", "exp_select" ]
            },
            createFolderInTree: {
                monitor: 2057404,
                tdw: [ "file", "select_create" ]
            },
            createFolderInTreeSuc: {
                monitor: 2057405,
                tdw: [ "file", "select_suc" ]
            },
            memberFileShow: {
                monitor: 2057406,
                tdw: [ "mber_file", "exp" ]
            },
            memberClkFolder: {
                monitor: 2057407,
                tdw: [ "mber_file", "Clk_name" ]
            },
            memberReturnHome: {
                monitor: 2057408,
                tdw: [ "mber_file", "Clk_home" ]
            },
            uploadShow: {
                monitor: 2057409,
                tdw: [ "oper_file", "exp_button" ]
            },
            clkUpload: {
                monitor: 2057410,
                tdw: [ "oper_file", "Clk_button" ]
            },
            clkFolder: {
                monitor: 2057411,
                tdw: [ "oper_file", "Clk_category" ]
            },
            showOpenFile: {
                monitor: 2057412,
                tdw: [ "oper_file", "exp_open" ]
            },
            clkOpenFile: {
                monitor: 2057413,
                tdw: [ "oper_file", "Clk_open" ]
            },
            showDownloadBtn: {
                monitor: 2057414,
                tdw: [ "oper_file", "exp_download" ]
            },
            clkDownloadBtn: {
                monitor: 2057415,
                tdw: [ "oper_file", "Clk_download" ]
            },
            showSeeBtn: {
                monitor: 2057416,
                tdw: [ "oper_file", "exp_see" ]
            },
            clkShowBtn: {
                monitor: 2057417,
                tdw: [ "oper_file", "Clk_see" ]
            },
            clkMore: {
                monitor: 2057418,
                tdw: [ "oper_file", "Clk_more" ]
            },
            clkUnMore: {
                monitor: 2057419,
                tdw: [ "oper_file", "Clk_un_more" ]
            },
            clkSaveAs: {
                monitor: 2057420,
                tdw: [ "oper_file", "Clk_save" ]
            },
            clkRepost: {
                monitor: 2057421,
                tdw: [ "oper_file", "Clk_repost" ]
            },
            clkPhone: {
                monitor: 2057422,
                tdw: [ "oper_file", "Clk_phone" ]
            },
            clkRenameFile: {
                monitor: 2057423,
                tdw: [ "oper_file", "Clk_rename" ]
            },
            clkForever: {
                monitor: 2057424,
                tdw: [ "oper_file", "Clk_forever" ]
            },
            clkJubao: {
                monitor: 2057425,
                tdw: [ "oper_file", "Clk_report" ]
            },
            clkDeleteFile: {
                monitor: 2057426,
                tdw: [ "oper_file", "Clk_delete" ]
            },
            clkShowInFolder: {
                monitor: 2057427,
                tdw: [ "oper_file", "Clk_show" ]
            },
            showSelectAll: {
                monitor: 2057428,
                tdw: [ "all_oper", "exp_box" ]
            },
            clkSelectAll: {
                monitor: 2057429,
                tdw: [ "all_oper", "Clk_select" ]
            },
            showBatch: {
                monitor: 2057430,
                tdw: [ "all_oper", "exp_mode" ]
            },
            clkBatch: {
                monitor: 2057431,
                tdw: [ "all_oper", "Clk_all" ]
            },
            batchSaveAs: {
                monitor: 2057432,
                tdw: [ "all_oper", "Clk_save" ]
            },
            batchDownload: {
                monitor: 2057433,
                tdw: [ "all_oper", "Clk_download" ]
            },
            batchDelete: {
                monitor: 2057434,
                tdw: [ "all_oper", "Clk_delete" ]
            },
            batchDeleteSuc: {
                monitor: 2057435,
                tdw: [ "all_oper", "suc_delete" ]
            },
            batchMove: {
                monitor: 2057436,
                tdw: [ "all_oper", "Clk_move" ]
            },
            batchMoveSuc: {
                monitor: 2057437,
                tdw: [ "all_oper", "suc_move" ]
            },
            showTask: {
                monitor: 2057438,
                tdw: [ "task", "exp" ]
            },
            clkTask: {
                monitor: 2057439,
                tdw: [ "task", "Clk_task" ]
            },
            showOneTask: {
                monitor: 2057440,
                tdw: [ "task", "exp_category" ]
            },
            clkTaskName: {
                monitor: 2057441,
                tdw: [ "task", "Clk_name" ]
            },
            showTaskShow: {
                monitor: 2057442,
                tdw: [ "task", "exp_see" ]
            },
            clkTaskShow: {
                monitor: 2057443,
                tdw: [ "task", "Clk_see" ]
            },
            showTaskPause: {
                monitor: 2057444,
                tdw: [ "task", "exp_start" ]
            },
            clkTaskPause: {
                monitor: 2057445,
                tdw: [ "task", "Clk_stop" ]
            },
            showTaskDelete: {
                monitor: 2057446,
                tdw: [ "task", "exp_delete" ]
            },
            clkTaskDelete: {
                monitor: 2057447,
                tdw: [ "task", "Clk_delete" ]
            },
            taskExp: {
                monitor: 2057448,
                tdw: [ "task", "exp_tips" ]
            },
            clkTaskExp: {
                monitor: 2057449,
                tdw: [ "task", "Clk_tips" ]
            },
            showSearchBtn: {
                monitor: 2057450,
                tdw: [ "search", "exp_button" ]
            },
            clkSearchBtn: {
                monitor: 2057451,
                tdw: [ "search", "Clk_button" ]
            },
            doSearch: {
                monitor: 2057452,
                tdw: [ "search", "Clk_search" ]
            },
            showSearchRes: {
                monitor: 2057453,
                tdw: [ "search", "exp_result" ]
            },
            clkSearchRes: {
                monitor: 2057454,
                tdw: [ "search", "Clk_result" ]
            },
            clkSearchName: {
                monitor: 2057455,
                tdw: [ "search", "Clk_name" ]
            },
            showFolderMove: {
                monitor: 2057456,
                tdw: [ "oper_file", "exp_move" ]
            },
            clkFolderMove: {
                monitor: 2057457,
                tdw: [ "oper_file", "Clk_move" ]
            },
            moveFileSuc: {
                monitor: 2057458,
                tdw: [ "oper_file", "move_suc" ]
            },
            showOldVersion: {
                monitor: 2057459,
                tdw: [ "oper_file", "exp_upgradetips" ]
            },
            clkUpdateQQ: {
                monitor: 2057460,
                tdw: [ "oper_file", "Clk_upgrade" ]
            },
            clkNotRemind: {
                monitor: 2057461,
                tdw: [ "oper_file", "Clk_nomoreremind" ]
            },
            showMoveFail: {
                monitor: 2057462,
                tdw: [ "oper_file", "exp_movefail" ]
            },
            delFolderSuc: {
                monitor: 2057463,
                tdw: [ "oper_file", "delete_suc" ]
            },
            jsError: {
                monitor: 2069233
            },
            getListError: {
                monitor: 2069234
            },
            delFileError: {
                monitor: 2069235
            },
            moveFileError: {
                monitor: 2069236
            },
            renameFileError: {
                monitor: 2069237
            },
            newFolderError: {
                monitor: 2069238
            },
            renameFolderError: {
                monitor: 2069239
            },
            delFolderError: {
                monitor: 2069240
            },
            cgiTimeout: {
                monitor: 2069241
            },
            offlinePage: {
                monitor: 2069242
            },
            nodePage: {
                monitor: 2069243
            },
            folderNum: {
                tdw: [ "file", "exp_folder" ]
            },
            imgurl: {
                monitor: 2200307
            },
            expnew: {
                monitor: 2227445
            },
            newFileShow: {
                tdw: [ "file_single", "exp" ],
                monitor: 2227391
            },
            doubleClickFile: {
                tdw: [ "file_single", "Clk_open" ],
                monitor: 2227392
            },
            fileRightMenuShow: {
                tdw: [ "file_single", "exp_right" ],
                monitor: 2227393
            },
            fileRightMenuClick: {
                tdw: [ "file_single", "Clk_option" ],
                monitor: 2227394
            },
            folderShow: {
                tdw: [ "file_pack", "exp" ],
                monitor: 2227395
            },
            doubleClickFolder: {
                tdw: [ "file_pack", "Clk_open" ],
                monitor: 2227396
            },
            folderRightMenuShow: {
                tdw: [ "file_pack", "exp_right" ],
                monitor: 2227397
            },
            folderRightMenuClick: {
                tdw: [ "file_pack", "Clk_option" ],
                monitor: 2227398
            },
            blankRightMenuShow: {
                tdw: [ "blank", "exp_right" ],
                monitor: 2227399
            },
            blankRightMenuClick: {
                tdw: [ "blank", "Clk_option" ],
                monitor: 2227400
            },
            chooseRightMenuShow: {
                tdw: [ "choose", "exp_right" ],
                monitor: 2227401
            },
            chooseRightMenuClick: {
                tdw: [ "choose", "Clk_option" ],
                monitor: 2227402
            },
            chooseDrag: {
                tdw: [ "choose", "Clk_drag" ],
                monitor: 2227403
            },
            chooseDragSinge: {
                tdw: [ "drag", "Clk_drag" ],
                monitor: 2227404
            },
            wayNext: {
                tdw: [ "way", "next" ],
                monitor: 2227405
            },
            wayPrev: {
                tdw: [ "way", "previous" ],
                monitor: 2227406
            },
            wayRoot: {
                tdw: [ "way", "Clk_root" ],
                monitor: 2227407
            },
            fileDownload: {
                monitor: 2366515,
                tdw: [ "oper_file", "down_in" ]
            },
            blackExp: {
                monitor: 2370085,
                tdw: [ "black", "exp_foul" ]
            },
            blackTips: {
                monitor: 2370086,
                tdw: [ "black", "exp_tip" ]
            },
            blackDelete: {
                monitor: 2370087,
                tdw: [ "black", "delete" ]
            },
            adjustTab: {
                tdw: [ "home", "oper_title" ],
                monitor: 2227407
            }
        };
        var r = "Grp_pcfiles";
        window.badjsReport = i.createReport({
            id: 1033
        });
        function o() {
            var e = window.webkitPerformance ? window.webkitPerformance : window.performance, a = [ "navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd" ], t, i, n;
            if (e && (t = e.timing)) {
                if (!t.domContentLoadedEventStart) {
                    a.splice(15, 2, "domContentLoadedStart", "domContentLoadedEnd");
                }
                var r = [];
                for (n = 0, i = a.length; n < i; n++) {
                    r[n] = t[a[n]];
                }
                QReport.huatuo({
                    appid: 10016,
                    flag1: 1772,
                    flag2: 1,
                    flag3: 1,
                    speedTime: r
                });
            }
        }
        function l() {
            var e = /\/\/(s[\d]*\.url\.cn|[\w\.\d]*\.qq.com|report\.url\.cn)/i;
            if (window.performance && window.performance.getEntries()) {
                var a = window.performance.getEntries();
                for (var t = 0, i = a.length; t < i; t++) {
                    var n = a[t].name;
                    if (!e.test(n)) {
                        QReport.monitor(2154095);
                        badjsReport.info(JSON.stringify({
                            "被劫持": n
                        }));
                    }
                }
            }
        }
        window.addEventListener("load", function() {
            o();
            l();
        });
        window.addEventListener("error", function() {
            report("jsError");
        });
        var s = a.getParameter("gid");
        window.reportNew = function(a) {
            var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            if (n[a]) {
                var i = n[a];
                if (i.monitor) {
                    QReport.monitor(i.monitor);
                }
                if (i.mac) {
                    QReport.monitor(i.mac);
                }
                if (G.module) {
                    e = G.module();
                }
                if (i.tdw) {
                    var o = {
                        obj1: s,
                        opername: r,
                        module: i.tdw[0],
                        action: i.tdw[1]
                    };
                    if (G.mac) {
                        o.action = i.tdw[1] + "_mac";
                    }
                    o = $.extend(o, t);
                    QReport.tdw(o);
                }
            }
        };
        window.report = function(a) {
            var t = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
            var i = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
            var o = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var l = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
            var d = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
            var f = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
            var c = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
            if (n[a]) {
                var u = n[a];
                if (u.monitor) {
                    QReport.monitor(u.monitor);
                }
                if (u.mac) {
                    QReport.monitor(u.mac);
                }
                if (G.module) {
                    e = G.module();
                }
                if (u.tdw) {
                    var p = {
                        obj1: s,
                        opername: r,
                        module: u.tdw[0],
                        action: u.tdw[1]
                    };
                    if (G.mac) {
                        p.action = u.tdw[1] + "_mac";
                    }
                    if (t >= 0) {
                        p.ver1 = t;
                    }
                    if (i) {
                        p.ver2 = i;
                    }
                    QReport.tdw(p);
                }
            }
        };
    }).call(a, t(163)(e));
}, function(e, a, t) {
    "use strict";
    var i = t(140);
    var n = t(64);
    var r = $("#upload-panel");
    var o = {
        folderTree: t(137),
        showFolderTreePanel: t(67).showFolderTreePanel,
        panel: t(67)
    };
    var l = t(15);
    var s = G.folderVersion;
    var d = t(148);
    var f = t(77);
    var c = undefined;
    function u() {
        if (l.getTips()) {
            n.addUploadTask();
        } else {
            report("showOldVersion");
            $("#updateQQ").addClass("open");
            $("#updateQQTips").text("当前版本仅支持将文件上传至群文件首页，升级至QQ最新版本可上传文件至文件夹内。");
            $("#updateQQ").find("input.btn-notips").attr("data-action", "upload.cUpload");
        }
    }
    function p() {
        if (this.checked) {
            l.setTips(1);
            G.oldVersion = true;
            $("#headerBatch .store").addClass("disabled");
            report("clkNotRemind");
        } else {
            l.setTips(0);
        }
    }
    function v() {
        $("#updateQQ").removeClass("open");
        n.addUploadTask();
    }
    function m() {
        if (this.nodeName === "LI") {
            reportNew("blankRightMenuClick", {
                ver1: G.customMenuLength ? 1 : 2,
                ver2: G.info.isAdmin ? 1 : 2,
                ver3: 1
            });
        }
        if (G.info.version < s) {
            u();
        } else {
            if (G.folderMap() && Object.keys(G.folderMap()).length > 0 || G.nowFolder !== "/") {
                n.getBatchFiles();
            } else {
                report("clkUpload", G.module());
                n.addUploadTask();
            }
        }
    }
    function h(e) {
        if (!c) {
            return;
        }
        var a = undefined;
        if (typeof e === "string") {
            report("clkUpload", 1);
            a = e;
        } else {
            a = G.folderTree && G.folderTree.selected && G.folderTree.selected.id || "/";
        }
        if ($("#inputFolderNameInFolderTree").length > 0) {
            d["folderTree.create"](null, function() {
                a = G.folderTree.selected && G.folderTree.selected.id || "/";
                var e = n.batchUpload(a, JSON.stringify(c));
                c = null;
                o.panel.hideAll();
            });
        } else {
            var t = n.batchUpload(a, JSON.stringify(c));
            c = null;
            o.panel.hideAll();
        }
    }
    function g(e, a) {
        if (!a || a.length === 0) {
            return;
        }
        var t = undefined;
        t = e;
        var i = "上传到群文件？";
        if (t !== "/") {
            var r = f.getData(t);
            i = "上传到文件夹：" + r.fnameEsc + "？";
        }
        var l = n.confirm(1, "提示", i);
        if (l.errorCode === 0 && l.ret) {
            report("clkUpload", 1);
            var s = n.batchUpload(t, JSON.stringify(a));
            o.panel.hideAll();
        }
    }
    function w() {
        r.addClass("open");
    }
    function b(e) {
        var a = e[0];
        var t = e.length;
        var n = a.lastIndexOf("\\");
        var r = a.substr(n + 1);
        if (G.mac) {
            n = a.lastIndexOf("/");
            r = a.substr(n + 1);
        }
        console.log(a);
        var o = i.getFileName(r);
        if (t > 1) {
            return '<span class="name">' + o.filename_name + "</span><span>" + o.filename_suf + '</span>等<span class="blue">' + t + "</span>个文件";
        } else {
            return '<span class="name">' + o.filename_name + "</span><span>" + o.filename_suf + "</span>";
        }
    }
    function y(e) {
        c = e;
        if (G.nowFolder !== "/") {
            h(G.nowFolder);
            return;
        }
        var a = {
            title: "上传文件",
            firstFileName: b(e),
            action: "上传到：",
            destFolder: "群文件",
            okAction: "file.batchUpload"
        };
        o.showFolderTreePanel(a);
        var t = $("#containerFolderTreePanel");
        t.find("#folderTreePanel").addClass("open");
        report("folderTree", 0);
        return;
    }
    function x() {
        report("clkUpdateQQ");
    }
    e.exports = {
        batchuploadInFolder: g,
        upload: m,
        bupload: h,
        showUpload: y,
        noTips: p,
        cupload: v,
        update: x
    };
}, function(e, a, t) {
    "use strict";
    var i = t(67);
    var n = t(77);
    var r = t(25);
    var o = t(92);
    var l = t(141);
    var s = t(138);
    var d = t(64);
    var f = t(67);
    var c = $("#folderPanel");
    var u = $(G.handler);
    function p() {
        if (this.classList.contains("disable")) {
            return;
        }
        report("clkRenameFile", G.module());
        var e = G.selectRow;
        var a = G.getReportInfo(e);
        a.ver3 = 7;
        reportNew("fileRightMenuClick", a);
        i.show(c, {
            title: "重命名",
            tips: "请为文件输入新名称",
            action: "file.renameFile",
            showValue: G.selectRow.nameEsc
        });
    }
    function v() {
        var e = c.find(".new-name").val();
        var a = G.selectRow;
        var t = {
            file_id: a.fp,
            app_id: G.appid,
            new_file_name: e + a.suf,
            bus_id: a.busid,
            parent_folder_id: G.nowFolder
        };
        o.renameFile(t).done(function(t) {
            if (t.ec === 0) {
                a.name = e;
                a.nameEsc = l.decode(e);
                a.fname = e + a.suf;
                a.fnameEsc = l.decode(a.fname);
                n.updateFile(a, "rename");
                r.updateRow(a);
                u.trigger("file.thumbUpdate", a);
            }
            f.hideAll();
        }).fail(function(e) {
            s.showError(e.ec, c);
            report("renameFileError");
        });
    }
    e.exports = {
        showFileRename: p,
        renameFile: v
    };
}, function(e, a, t) {
    "use strict";
    var i = t(160);
    var n = r(i);
    function r(e) {
        if (e && e.__esModule) {
            return e;
        } else {
            var a = {};
            if (e != null) {
                for (var t in e) {
                    if (Object.prototype.hasOwnProperty.call(e, t)) a[t] = e[t];
                }
            }
            a.default = e;
            return a;
        }
    }
    function o(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var l = t(77);
    var s = t(92);
    var d = t(25);
    var f = t(64);
    var c = $(G.handler);
    var u = 5485;
    function p(e) {
        var a = document.createElement("div");
        var t = this.getBoundingClientRect();
        var i = function r() {
            var e = document.height;
            var a = G.getDomPanel();
            var t = a[0].scrollHeight;
            if (t + 52 > e) {
                return true;
            }
            return false;
        };
        a.innerHTML = '<div class="img"></div>';
        a.className = "file-animate files-" + e.icon;
        var n = window.innerWidth - t.left - 3;
        if (G.info.isAdmin && G.nowFolder === "/") {
            n += 37;
        }
        if (!i()) {
            n += 10;
        }
        if (G.mac) {
            n = 177;
        }
        a.style.right = n + "px";
        a.style.top = t.top - 20 + "px";
        document.body.appendChild(a);
        setTimeout(function() {
            document.body.removeChild(a);
        }, 1500);
    }
    function v(e, a) {
        var t = this;
        if (e) {
            var i = function() {
                var i = G.getReportInfo(e);
                if (a === 1) {
                    i.ver7 = G.module() === 3 ? 2 : 1;
                    reportNew("doubleClickFile", i);
                } else if (a === 2) {
                    i.ver3 = 1;
                    reportNew("fileRightMenuClick", i);
                }
                if (e.isDown && a !== 0) {
                    n.edit(e);
                    return {
                        v: undefined
                    };
                }
                var r = i;
                r.ver1 = G.module();
                r.ver2 = 1;
                r.ver3 = i.ver4;
                r.ver4 = i.ver5;
                r.ver5 = a;
                r.ver7 = G.info.role;
                reportNew("fileDownload", r);
                var o = e.filepath;
                var l = e.fnameEsc;
                var c = e.size;
                e.isDowning = true;
                var u = {
                    bs: e.t,
                    fp: e.fp
                };
                var p = t;
                s.checkOneFile(u).done(function(a) {
                    if (a.ec === 0) {
                        d.updateRow(e);
                        f.addDownloadTask(o, l, c, true, false);
                    } else if (a.ec === 0 && a.audit === 3) {
                        f.alert("该文件因多次被举报为色情文件，已被删除");
                    }
                }).fail(function(e) {});
            }();
            if ((typeof i === "undefined" ? "undefined" : o(i)) === "object") return i.v;
        }
    }
    function m() {
        var e = G.selectRow;
        v(e, 2);
    }
    function h() {
        var e = $(this);
        var a = e.data("path");
        var t = l.getData(a);
        if (t.safeType) {
            var i = G.getReportInfo(t);
            i.ver3 = i.ver4;
            i.ver4 = i.ver5;
            i.ver5 = t.isDown ? 2 : 1;
            reportNew("blackTips", i);
            f.alert(2, "提示", "该文件存在安全风险，无法正常使用");
        } else {
            v(t, 1);
        }
    }
    function g() {
        var e = $(this).closest(".list-item");
        var a = e.data("path");
        var t = l.getData(a);
        G.saveasList[t.filepath] = 1;
        v(t, 0);
    }
    function w() {
        var e = this;
        var a = G.selectRow;
        var t = this;
        report("clkDownloadBtn", G.module());
        if (a) {
            (function() {
                var t = a.filepath;
                var i = a.fnameEsc;
                var n = a.size;
                a.isDowning = true;
                var r = {
                    bs: a.t,
                    fp: a.fp
                };
                var o = e;
                s.checkOneFile(r).done(function(e) {
                    if (e.ec === 0) {
                        p.call(o, a);
                        d.updateRow(a);
                        f.addDownloadTask(t, i, n, true);
                    } else if (e.ec === 0 && e.audit === 3) {
                        f.alert("该文件因多次被举报为色情文件，已被删除");
                    }
                }).fail(function(e) {});
            })();
        }
    }
    function b(e) {
        var a = function r(e) {
            var a = e.filepath;
            var t = e.fnameEsc;
            var i = e.size;
            var n = {
                bs: e.t,
                fp: e.fp
            };
            s.checkOneFile(n).done(function(e) {
                if (e.ec === 0) {
                    f.addDownloadTask(a, t, i, true);
                } else if (e.ec === 0 && e.audit === 3) {
                    f.alert("该文件因多次被举报为色情文件，已被删除");
                }
            }).fail(function(e) {});
        };
        for (var t = 0, i = e.length; t < i; t++) {
            var n = e[t];
            G.saveasList[n.filepath] = 1;
            a(n);
        }
    }
    e.exports = {
        download: w,
        downloadByDom: h,
        downloadByMenu: m,
        downloadByBtn: g,
        downloadBatch: b
    };
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(64);
    var r = t(147);
    var o = $(G.handler);
    function l() {
        if (this.classList.contains("disable")) {
            return;
        }
        report("clkRepost", G.module());
        var e = G.selectRow;
        var a = G.getReportInfo(e);
        a.ver3 = 4;
        reportNew("fileRightMenuClick", a);
        if (e) {
            var t = e.filepath;
            var i = e.fnameEsc;
            var r = e.size;
            n.forwardFile(i, t, r);
            o.trigger("menu.hide");
        } else {}
    }
    function s(e) {
        if (this.classList.contains("disable")) {
            return;
        }
        report("clkPhone", G.module());
        var a = G.selectRow;
        var t = G.getReportInfo(a);
        t.ver3 = 5;
        reportNew("fileRightMenuClick", t);
        if (a) {
            var i = a.filepath;
            var r = a.fnameEsc;
            var l = a.size;
            var s = n.forwardFileToDataLine(r, i, l);
            console.log(s);
            o.trigger("menu.hide");
        } else {}
    }
    e.exports = {
        forward: l,
        toMobile: s
    };
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(92);
    var r = t(64);
    var o = t(25);
    var l = t(140);
    var s = t(25);
    var d = t(147);
    var f = 2;
    var c = t(15);
    var u = $(G.handler);
    function p() {
        u.trigger("menu.hide");
        report("clkDeleteFile", G.module());
        var e = G.selectRow;
        if (e) {
            var a = G.getReportInfo(e);
            a.ver3 = 8;
            reportNew("fileRightMenuClick", a);
            var t = r.confirm(2, "提示", "你确定要删除文件" + e.fnameEsc + "吗?");
            if (t.errorCode === 0 && t.ret) {
                var d = {
                    bus_id: parseInt(e.busid),
                    file_id: e.fp,
                    app_id: 4,
                    parent_folder_id: G.nowFolder
                };
                n.deleteFile(d).done(function(a) {
                    i.remove(e.filepath);
                    o.removeRow(e);
                    c.setClist(e, "delete");
                    i.updateAllNum({
                        files: [ e ],
                        action: "remove"
                    });
                    G.file.capacityused = l.getSize(G.file.cu);
                    s.renderSpace();
                    u.trigger("toast.show", {
                        type: "suc",
                        text: "删除成功"
                    });
                    if (e.safeType) {
                        var t = G.getReportInfo(e);
                        t.ver6 = t.ver3;
                        t.ver3 = t.ver4;
                        t.ver4 = t.ver5;
                        t.ver5 = e.size;
                        reportNew("blackDelete", t);
                    }
                }).fail(function(e) {
                    r.alert(2, "提示", "删除失败");
                    report("delFileError");
                });
            }
        }
    }
    function v(e, a) {
        u.trigger("menu.hide");
        var t = [];
        var d = {};
        var p = 1;
        var v = 0;
        var m = 0;
        var h = function y() {
            v++;
            if (v === p) {
                G.scrollHandler && G.scrollHandler();
            }
        };
        var g = function x() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            if (e.length === 0) {
                return;
            }
            var t = {};
            var d = [];
            for (var f = 0, u = e.length; f < u; f++) {
                d[f] = {
                    gc: parseInt(G.info.gc),
                    app_id: G.appid,
                    bus_id: e[f].busid,
                    file_id: e[f].fp,
                    parent_folder_id: G.nowFolder
                };
            }
            t.file_list = JSON.stringify({
                file_list: d
            });
            n.deleteFile(t).done(function(t) {
                var n = [];
                if (t.fail) {
                    n = t.fail;
                    for (var r = e.length - 1; r >= 0; r--) {
                        if ($.inArray(e[r].fp, n)) {
                            e.splice(r, 1);
                        }
                    }
                }
                report("batchDeleteSuc");
                var d = e.length;
                m += d;
                e.forEach(function(e) {
                    o.removeRow(e);
                    i.remove(e.filepath);
                    c.setClist(e, "delete");
                    if (e.safeType) {
                        var a = G.getReportInfo(e);
                        a.ver6 = a.ver3;
                        a.ver3 = a.ver4;
                        a.ver4 = a.ver5;
                        a.ver5 = e.size;
                        reportNew("blackDelete", a);
                    }
                });
                i.updateAllNum({
                    files: e,
                    action: "remove"
                });
                G.file.capacityused = l.getSize(G.file.cu);
                s.renderSpace();
                h(m);
                if (v === p) {
                    a(m);
                }
            }).fail(function(e) {
                r.alert(2, "提示", "删除失败");
                $(G.handler).trigger("panel.hideAll");
                report("delFileError");
            });
        };
        e.forEach(function(e) {
            if (e.remove) {
                t.push(e);
                d[e.fp] = e;
            }
        });
        p = Math.ceil(t.length / f);
        if (p === 1) {
            g(t);
        } else {
            for (var w = 0; w < p; w++) {
                var b = t.slice(w * f, (w + 1) * f);
                g(b);
            }
        }
        return true;
    }
    e.exports = {
        removeOne: p,
        removeBatch: v
    };
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(64);
    var r = t(143);
    var o = $(G.handler);
    var l = [ "图片" ];
    function s(e) {
        e.usedTime++;
        o.trigger("toast.hide");
        n.preview(e.previewObj.url);
    }
    function d() {
        var e = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        var a = undefined;
        var t = $(this);
        var d = undefined;
        if (e) {
            a = e;
        } else {
            var f = t.data("path");
            a = i.getFile(f);
            if (!a) {
                var c = G.selectRow.path;
                a = i.getFile(c);
            }
            if (!a) {
                var u = G.selectRow.path;
                a = i.getFile(u);
            }
        }
        if (!a) {
            return;
        }
        if (a.safeType) {
            var p = G.getReportInfo(a);
            p.ver3 = p.ver4;
            p.ver4 = p.ver5;
            p.ver5 = a.isDown ? 2 : 1;
            reportNew("blackTips", p);
            n.alert(2, "提示", "该文件存在安全风险，无法正常使用");
            return;
        }
        var v = a.filepath;
        var m = a.remotetype;
        var h = a.fnameEsc || a.fname;
        var g = a.size;
        var w = a.filetype;
        if ($.inArray(w, l) >= 0) {
            if (g > 20 * 1024 * 1024) {
                n.alert(2, "提示", "图片太大不支持预览，请直接下载");
            } else {
                a.usedTime++;
                o.trigger("toast.show", {
                    type: "wait",
                    text: "正在加载预览图…"
                });
                r.getOneThumb(a, s);
            }
        } else {
            try {
                n.previewFile(v, h);
            } catch (b) {
                console.log(b);
            }
        }
    }
    function f() {
        if (this.classList && this.classList.contains("disable")) {
            return;
        }
        o.trigger("menu.hide");
        var e = G.selectRow;
        if (e) {
            d(e);
        }
    }
    e.exports = {
        preview: d,
        menupreview: f
    };
}, function(e, a, t) {
    "use strict";
    var i = {
        folderTree: t(137),
        showFolderTreePanel: t(67).showFolderTreePanel
    };
    var n = t(92);
    var r = t(25);
    var o = t(138);
    var l = t(147);
    var s = t(148);
    var d = t(103);
    var f = t(64);
    var c = $(G.handler);
    var u = t(77);
    var p = t(139);
    var v = 10;
    function m(e) {
        if (e) {
            var a = +new Date();
            e.mt = Math.floor(a / 1e3);
            e.mtStr = p.getDateStr(e.mt);
            e.mtoStr = p.getorcDateStr(e.mt);
            r.removeFold(e);
            r.appendFold(e);
        }
        l["panel.close"]();
    }
    function h() {
        if (this.classList && this.classList.contains("disable")) {
            return;
        }
        var e = G.selectRows;
        if (!e) {
            badjsReport.info("无选择目标");
            return;
        }
        var a = e[0];
        var t = G.getReportInfo(a);
        if (e.length > 1) {
            reportNew("chooseRightMenuClick", t);
        } else {
            t.ver3 = 5;
            reportNew("fileRightMenuClick", t);
        }
        var n = G.folderMap()[G.nowFolder];
        var r = {
            title: "移动文件",
            firstFileName: e[0].fname,
            fileNum: e.length,
            action: "移动到：",
            destFolder: G.nowFolder === "/" ? "群文件" : n.fname,
            okAction: "file.move"
        };
        i.showFolderTreePanel(r);
        var o = $("#containerFolderTreePanel");
        o.find(".active .aria-hide").eq(0).focus();
        report("folderTree", 1);
        report("clkFolderMove");
    }
    function g(e, a, t) {
        var i = [];
        var s = {};
        if (e.length === 1) {
            var p = u.getData(e[0].filepath);
            if (p && p.safeType) {
                f.alert(2, "提示", "该文件存在安全风险，无法正常使用");
                return;
            }
        } else {
            for (var h = e.length; h--; ) {
                var p = u.getData(e[h].filepath);
                if (p && p.safeType) {
                    e.splice(h, 1);
                }
            }
        }
        for (var g = e.length - 1; g >= 0; g--) {
            var w = e[g];
            if (G.info.isAdmin || G.info.uin === w.uin) {
                i.push({
                    file_id: w.fp,
                    bus_id: parseInt(w.busid),
                    parent_folder_id: w.parentId,
                    dest_folder_id: a,
                    app_id: G.appid,
                    gc: G.info.gc
                });
                s[e[g].fp] = e[g];
            }
        }
        d.exit();
        if (e.length !== i.length) {
            try {
                f.alert(2, "提示", "没有管理该文件的权限，操作失败");
            } catch (b) {
                console.log(b);
            }
            return;
        }
        var y = function C() {
            T++;
            if (T >= F) {
                c.trigger("toast.hide");
            }
        };
        var x = function S() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            if (e.length === 0) {
                return;
            }
            n.moveFile(e).done(function(i) {
                y();
                var n = e;
                if (i.fail) {
                    var o = [];
                    try {
                        o = JSON.parse(i.fail).fail;
                    } catch (l) {}
                    for (var d = o.length - 1; d >= 0; d--) {
                        if (s[o[d]]) {
                            n.splice(d, 1);
                        }
                    }
                }
                if (e.length > 1) {
                    report("batchMoveSuc");
                    if (t) {
                        reportNew("chooseDrag", {
                            ver1: 1,
                            ver2: G.info.isAdmin ? 1 : 2,
                            ver5: 1
                        });
                    }
                } else {
                    report("moveFileSuc");
                    if (t) {
                        reportNew("chooseDragSinge", {
                            ver1: 1,
                            ver2: G.info.isAdmin ? 1 : 2,
                            ver5: 1
                        });
                    }
                }
                for (var d = n.length - 1; d >= 0; d--) {
                    var f = n[d];
                    var c = "/" + f.bus_id + f.file_id;
                    f = G.fileMap()[c];
                    f.parentId = a;
                    u.updateFile(f, "rename");
                    r.removeRow(f);
                }
                var p = undefined;
                if (p = G.folderMap()[a]) {
                    p.filenum += n.length;
                    $('[id="' + p.domid + '"]').find(".file-size").html(p.filenum + "个文件");
                }
                m(p);
                return;
            }).fail(function(a) {
                y();
                o.showError(a.ec);
                report("showMoveFail");
                report("moveFileError");
                if (t) {
                    if (e.length > 1) {
                        reportNew("chooseDrag", {
                            ver1: 1,
                            ver2: G.info.isAdmin ? 1 : 2,
                            ver5: 2
                        });
                    } else {
                        reportNew("chooseDragSinge", {
                            ver1: 1,
                            ver2: G.info.isAdmin ? 1 : 2,
                            ver5: 2
                        });
                    }
                }
                console.log("fail", a);
            });
        };
        var k = i.length;
        var F = Math.ceil(k / v);
        var T = 0;
        c.trigger("toast.show", {
            type: "wait",
            text: "正在移动文件",
            autoHide: false
        });
        if (F) {
            for (var h = 0; h < F; h++) {
                var _ = i.slice(h * v, (h + 1) * v);
                x(_);
            }
        } else {
            y();
            l["panel.close"]();
        }
        return true;
    }
    function w() {
        s["folderTree.create"](null, function() {
            if (!G.selectRows) {
                return;
            }
            var e = G.folderTree.selected.id;
            if (e === G.nowFolder) {
                console.log("can not move to the same folder");
                c.trigger("toast.show", {
                    type: "alert",
                    text: "文件已在目标位置"
                });
                return;
            }
            g(G.selectRows, e);
        });
    }
    function b(e, a, t) {
        g(e, a, t);
    }
    e.exports = {
        showMove: h,
        move: w,
        movelist: b
    };
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(152);
    var r = $(G.handler);
    function o() {
        var e = G.selectRow;
        report("clkJubao");
        if (e) {
            var a = G.getReportInfo(e);
            a.ver3 = 9;
            reportNew("fileRightMenuClick", a);
            var t = "http://jubao.qq.com/cn/jubao?appname=im&subapp=group_file&jubaotype=article";
            if (G.checkHttps()) {
                t = "https://proxy.qun.qq.com/tx_tls_gate=jubao.qq.com/cn/jubao?appname=im&subapp=group_file&jubaotype=article";
            }
            t += "&impeachuin=" + G.info.uin;
            t += "&uin=" + e.uin;
            t += "&fid=" + e.fp;
            t += "&fname=" + encodeURIComponent(e.fnameEsc);
            t += "&ut=" + e.ct;
            t += "&fs=" + e.size;
            t += "&dt=" + e.down;
            t += "&t=" + e.t;
            t += "&mt=" + e.mt;
            t += "&exp=" + e.exp;
            t += "&gid=" + G.info.gc;
            n.show(encodeURI(t));
        }
        r.trigger("menu.hide");
    }
    e.exports = o;
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = $("#selectFileNum");
    function r(e) {
        n.text(e);
    }
    function o(e) {
        var a = false;
        var t = false;
        for (var n = 0, r = e.length; n < r; n++) {
            var o = e[n];
            var l = o.value;
            var s = i.getData(l);
            if (s.admin) {
                a = true;
            }
            if (!s.succ) {
                t = true;
            }
        }
        if (!a) {
            $("#batchDel").addClass("disabled");
            $("#batchMove").addClass("disabled");
        } else {
            $("#batchDel").removeClass("disabled");
            $("#batchMove").removeClass("disabled");
        }
        if (t) {
            $("#batchDown").removeClass("disabled");
        } else {
            $("#batchDown").addClass("disabled");
        }
    }
    function l() {
        if (G.mac) {
            return;
        }
        var e = G.getDomPanel()[0];
        var a = e.querySelectorAll(".cbox:checked");
        if (a.length) {
            report("showSelectAll");
            report("showBatch");
            $(".nav").removeClass("hide");
            $("body").addClass("batch-mode");
            $(".file.list-item").attr("data-action", "file.select");
            o(a);
            r(a.length);
        } else {
            $("body").removeClass("batch-mode");
            $(".file.list-item").attr("data-action", "");
        }
    }
    function s() {
        $("body").removeClass("batch-mode");
        $(".cbox").prop("checked", false);
        r(0);
    }
    function d() {
        var e = G.getDomPanel()[0];
        if (this.checked) {
            report("clkSelectAll");
            report("clkBatch");
            G.getDomPanel().find(".cbox").prop("checked", true);
            var a = e.querySelectorAll(".cbox:checked");
            r(a.length);
        } else {
            s();
        }
    }
    function f() {
        var e = G.getDomPanel()[0];
        var a = $(this).find(".cbox");
        if (!a.prop("checked")) {
            a.prop("checked", true);
        } else {
            a.prop("checked", false);
        }
        var t = e.querySelectorAll(".cbox:checked");
        r(t.length);
    }
    var c = $("#downloadFile button");
    function u(e) {
        if (e) {
            c.attr("class", "icons-download-batch");
        } else {
            c.attr("class", "icons-download-batch-disabled disabled");
        }
    }
    e.exports = {
        check: l,
        exit: s,
        selectAll: d,
        select: f,
        changeDownLoadBtn: u
    };
}, function(e, a, t) {
    "use strict";
    var i = t(101);
    var n = t(97);
    var r = t(99);
    var o = t(105);
    var l = t(77);
    var s = t(67);
    var d = t(103);
    var f = $("#batchPanel");
    var c = t(15);
    var u = G.folderVersion;
    var p = 0;
    var v = 0;
    var m = 0;
    var h = 0;
    var g = [];
    function w(e) {
        if (c.getTips()) {} else {
            report("showOldVersion");
            b();
        }
    }
    function b() {
        $("#updateQQ").addClass("open");
        $("#updateQQTips").text("当前版本不支持批量另存功能，请升级QQ至最新版本后体验");
        $("#updateQQ").find("input.btn-notips").attr("data-action", "panel.close");
    }
    function y(e, a) {
        switch (e) {
          case 1:
            return '您选择了<span class="red">' + p + '</span>个文件,其中<span  class="red">' + m + '</span>个文件可以删除<br>您确定要删除这<span  class="red">' + m + "</span>个文件吗?";
            break;

          case 2:
            return "正在删除文件";
            break;

          case 3:
            return '已经成功删除<span class="red">' + a + "</span>个文件";
            break;
        }
    }
    function x() {
        p = 0;
        v = 0;
        m = 0;
        g = [];
    }
    function k() {
        x();
        var e = G.onlyGetDom().find(".selected");
        var a = [];
        p = e.length;
        e.each(function() {
            var e = $(this).data("path");
            var t = l.getData(e);
            if (t) {
                if (t.remove) {
                    m++;
                }
                if (!t.succ) {
                    h++;
                }
                a.push(t);
            }
        });
        return a;
    }
    function F() {
        if (this.classList.contains("disabled")) {
            return;
        }
        g = k();
        var e = G.getReportInfo(g[0]);
        e.ver3 = 3;
        reportNew("chooseRightMenuClick", e);
        s.showBatchPanel(f, {
            title: "批量删除",
            action: "batch.removeAction",
            text: y(1)
        });
    }
    function T() {
        report("batchDelete");
        s.showBatchPanel(f, {
            title: "批量删除",
            hideAll: true,
            text: y(2)
        });
        d.exit();
        r.removeBatch(g, function(e) {
            s.showBatchPanel(f, {
                title: "批量删除",
                action: "batch.removeAction",
                hideOk: true,
                closeText: "关闭",
                text: y(3, e)
            });
            x();
        });
    }
    function _() {
        if (this.classList.contains("disabled")) {
            return;
        }
        report("batchMove");
        g = k();
        i.showMove();
        return;
    }
    function C() {
        report("batchSaveAs");
        var e = function a() {
            k();
            var e = G.selectRows;
            d.exit();
            var a = [];
            for (var t = e.length - 1; t >= 0; t--) {
                var i = e[t];
                a.push({
                    filepath: i.filepath,
                    filename: i.fnameEsc,
                    fname: i.fname,
                    filetype: i.filetype,
                    filesize: i.size,
                    domid: i.domid,
                    orcType: i.orcType
                });
            }
            o.saveBatch(a);
        };
        if (G.info.version < u) {
            w(e);
        } else {
            e();
        }
    }
    e.exports = {
        remove: F,
        removeAction: T,
        move: _,
        save: C
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(77);
    var r = t(92);
    var o = $(G.handler);
    G.saveasList = {};
    function l(e) {
        var a = e || G.selectRow;
        report("clkSaveAs", G.module());
        try {
            var t = G.getReportInfo(a);
            var n = t;
            t.ver3 = 2;
            reportNew("fileRightMenuClick", t);
            n.ver1 = G.module();
            n.ver2 = 1;
            n.ver3 = t.ver4;
            n.ver4 = t.ver5;
            n.ver5 = 3;
            n.ver7 = G.info.role;
            reportNew("fileDownload", n);
        } catch (l) {
            console.info(l);
        }
        if (a && a.orcType === 1) {
            if (a.inDown) {} else {
                (function() {
                    var e = a.filepath;
                    var t = a.fnameEsc;
                    var n = a.size;
                    var l = {
                        bs: a.t || a.busid,
                        fp: a.fp
                    };
                    r.checkOneFile(l).done(function(a) {
                        if (a.ec === 0) {
                            var r = i.addDownloadTask(e, t, n);
                            G.saveasList[e] = 1;
                        } else if (a.ec === 0 && a.audit === 3) {
                            i.alert("该文件因多次被举报为色情文件，已被删除");
                        }
                    }).fail(function(e) {});
                    o.trigger("menu.hide");
                })();
            }
        }
    }
    function s(e) {
        var a = e[0];
        if (a) {
            var t = G.getReportInfo(a);
            t.ver3 = 1 + "";
            reportNew("chooseRightMenuClick", t);
            var n = t;
            n.ver1 = G.module();
            n.ver2 = 1;
            n.ver3 = t.ver4;
            n.ver4 = t.ver5;
            n.ver5 = 5;
            n.ver7 = G.info.role;
            console.log(a, t, n);
            reportNew("fileDownload", n);
        }
        for (var r in e) {
            var o = e[r];
            G.saveasList[o.filepath] = 1;
        }
        var l = {
            files: e,
            save2default: 0
        };
        i.addMultiDownloadTasks(JSON.stringify(l));
    }
    e.exports = {
        save: l,
        saveBatch: s
    };
}, function(e, a, t) {
    "use strict";
    var i = t(25);
    var n = {};
    n.byUin = function() {
        var e = $(this).data("uin");
        var a = this.innerHTML;
        var t = function n() {
            G.module(2);
            $("#navTopFolder").addClass("selected");
            $("#createFolder").hide();
            $("#fileNum").addClass("hide").attr("data-action", "menu.filenum");
            $("#headerLine").text(">");
            $("#box").addClass("one");
            $("#folderName").html('<div style="display: -webkit-box;"><div class="uploader-name">' + a + "</div><div>上传的文件</div></div>").removeClass("hide");
            $("#normalNav").removeClass("hide");
            if (G.mac) {
                $(".mac-file-top").addClass("user-module");
            }
        };
        G.module(2);
        i.getList({
            paramsFilter: {
                filterUin: e,
                filterCode: 3
            },
            succ: t,
            renderParams: {
                getByUinHide: true,
                uploaderHide: true
            }
        })();
    };
    e.exports = n;
}, function(e, a, t) {
    "use strict";
    var i = t(77);
    var n = t(92);
    var r = t(138);
    var o = $(G.handler);
    var l = {
        "1": "没有登陆或登陆态失效",
        "2": "系统内部错误",
        "7": "没有群权限",
        "21": "不是上传者或群主不能转永久",
        "22": "不能跨群转永久文件",
        "23": "登录态校验失败",
        "24": "群成员关系校验失败",
        "25": "容量满，可以升级",
        "26": "容量满，不能再升级",
        "27": "要转存的文件不存在",
        "28": "永久空间容量超限"
    };
    function s() {
        if (this.classList.contains("disable")) {
            return;
        }
        report("clkForever");
        var e = G.selectRow;
        if (e && e.remoteType === 2) {
            var a = e.filepath;
            var t = {
                fp: a
            };
            n.setPermanent(t).done(function(a) {
                if (a.ec === 0) {
                    var t = "/102" + a.fp;
                    e.newFilePath = t;
                    e.remoteType = 1;
                    e.fp = a.fp;
                    e.temp = false;
                    i.updateFile(e, "permanent");
                    o.trigger("file.dataUpdate", e);
                    o.trigger("toast.show", {
                        type: "suc",
                        text: "转存成功"
                    });
                }
            }).fail(function(e) {
                console.log(e);
                r.showError(e.ec);
            });
        } else {
            console.log("文件不存在或者不是临时文件");
        }
        o.trigger("menu.hide");
    }
    e.exports = s;
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(92);
    var r = t(112);
    var o = t(77);
    var l = t(18);
    G.renderOtherGroupResultFuncSingtons = {};
    var s = undefined;
    function d() {
        var e = true;
        return function(e, a) {
            var t = G.getDomPanel();
            if (!e) {
                return;
            }
            var i = [ a ];
            var n = e.file[0];
            var r = n.domid;
        };
    }
    function f(e, a) {
        e = e || {};
        var t = e.busId;
        var r = e.fileId;
        n.getFileAttr({
            bus_id: t,
            file_id: r
        }).done(function(e) {
            var t = [];
            if (i(e.file_info) === "object") {
                e.file_info.upload_size = e.file_info.size;
            } else {
                return;
            }
            var n = e.file_info;
            n.proId = n.id;
            n.id = r;
            t.push(n);
            t = o.setFileList(t);
            d()(t, a);
        }).fail(function(e) {
            console.log("fail", e);
        });
    }
    window.getFileAttr = f;
    e.exports = f;
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '	<div class="toast-overlay" id="toastDom">\r\n		<div class="toast">\r\n			<div class="icons-<%-locals.cls%> toast-icon"></div>\r\n			<div class="toast-message"><%-locals.text%></div>\r\n		</div>\r\n	</div>', f = "D:\\qun\\clt_filetab\\src\\tpl\\toast.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('	<div class="toast-overlay" id="toastDom">\r\n		<div class="toast">\r\n			<div class="icons-');
            s = 3;
            u(e.cls);
            u(' toast-icon"></div>\r\n			<div class="toast-message">');
            s = 4;
            u(e.text);
            u("</div>\r\n		</div>\r\n	</div>");
            s = 6;
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, , function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '<div class="files-empty"><div><div class="icons-empty"></div><div class="empty-desc">在这里，你可以把各种有趣的东西分享给大家</div></div></div>\n', f = "D:\\qun\\clt_filetab\\src\\tpl\\errormsg.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('<div class="files-empty"><div><div class="icons-empty"></div><div class="empty-desc">在这里，你可以把各种有趣的东西分享给大家</div></div></div>\n');
            s = 2;
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function g(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '<%\n	for(var i = 0,l=locals.list.length;i<l;i++){\n		var item = locals.list[i];\n		if(item.orcType === 2){\n%>\n	<div class="fold list-item <%if(item.succ){%>succ<%}%>" data-path="<%=item.id%>" id="<%=item.domid%>" data-dbaction="folder.open" data-action="list.select">\n		<div class="item-name item-name-adjust"  data-dbaction="folder.open"  data-path="<%=item.id%>" data-viewcntr="folder<%=item.domid%>" title="<%-item.fname%>">\n			<div class="filesmall-folder drag-dom" data-dbaction="folder.open"  data-path="<%=item.id%>" data-viewcntr="folder<%=item.domid%>"></div>\n			<span class="name drag-dom"><%- item.fname %></span>\n		</div>\n		<div class="item-time drag-dom"  title="更新时间:<%=item.mtoStr%>">\n			<span><%= item.mtStr %></span>\n		</div>\n		<div class="item-size"></div>\n		<div class="item-user"></div>\n		<div class="item-download"><button role="button" aria-label="下载文件夹" title="下载文件夹" class="icons-download-new" data-action="folder.downloadByBtn"></button></div>\n	</div>\n<%\n}else{\n%>\n	<div class="file list-item <%=item.icon%> <%if(item.remoteType===2){%>temp<%}%> <%if(item.succ){%>succ<%}%> <%if(item.safeType){%>illegal<%}%>" id="<%=item.domid%>" data-path="<%=item.filepath%>" <%if(!locals.renderParams){%>id="<%=item.domid%>"<%}%> <%if(item.otherGroupName){%> data-dbaction="openGroupFile" data-uin="<%- item.gc %>"<%}%> data-action="list.select" <%if(item.preview){%>data-dbaction="file.preview"<%}else{%>data-dbaction="file.downloadByDom"<%}%> <%if(item.safeType){%>title="该文件存在安全风险，无法正常使用"<%}%>>\n		<div class="item-name-wrap item-name-adjust">\n			<div class="item-name" <%if(!item.safeType){%>title="<%- item.name %><%-item.suf%>"<%}%>>\n				<div class="file-icons" data-path="<%=item.filepath%>" <%if(item.preview){%>data-dbaction="file.preview"<%}%>>\n					<div class="drag-dom filesmall-<%=item.icon%> <%if(item.previewObj){%>thumb<%}%>" <%if(item.previewObj){%>style="background-image:url(<%=item.previewObj.url%>);"<%}%>></div>\n					<i class="icons-check"></i>\n				</div>\n				<span class="name drag-dom">\n					<%- item.name %><%-item.suf%>\n				</span>\n			</div>\n			<% if(item.canEdit || item.remoteType === 2) { %>\n				<div class="item-tags">\n					<div class="overflow">\n						<%if(item.canEdit){%><span class="can-edit"></span><%}%>\n						<%if(item.remoteType ===2){%><span class="tmp"></span><%}%>\n					</div>\n				</div>\n			<% } %>\n		</div>\n		<div class="item-time" <%if(!item.safeType){%>title="更新时间:<%=item.mtoStr%>"<%}%>>\n			<span class="drag-dom"><%= item.mtStr %></span>\n		</div>\n		<div class="item-size" <%if(!item.safeType){%>title="文件大小:<%= item.sizeStr%>"<%}%>>\n			<span class="drag-dom"><%= item.sizeStr%></span>\n		</div>\n		<div class="item-user" <%if(!item.safeType){%>title="上传者:<%-item.nick%> (<%=item.uin%>)"<%}%>><span><%- item.nick%></span></div>\n		<div class="item-download">\n			<%if(!item.safeType){%><button role="button" aria-label="下载文件" title="下载文件" class="icons-download-new" data-action="file.downloadByBtn"></button><%}%>\n		</div>\n		<div class="aria-hide">\n			<%if((item.safeType === 0 && item.admin) || G.info.isAdmin){%>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件<%=item.fname%>" data-action="file.forward" tabindex="3">转发</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件到手机<%=item.fname%>" data-action="file.forwardMobile" tabindex="3">转发文件到手机</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="在文件夹中显示<%=item.fname%>" data-action="file.openFolderInBox" tabindex="3">在文件夹中显示</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="重命名文件<%=item.fname%>" data-action="file.showRename" data-blur="aria.fmg" tabindex="3">重命名</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="转存为永久文件<%=item.fname%>" data-action="file.permanent" tabindex="3">转存为永久文件</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="移动文件<%=item.fname%>" data-action="file.showMove" data-blur="aria.fmg" tabindex="3">移动文件</a>\n			<%}%>\n			<%if(item.safeType && item.admin || G.info.isAdmin){%>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="删除文件<%=item.fname%>" data-action="file.delete" tabindex="3">删除</a>\n			<%}%>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="举报文件<%=item.fname%>" data-action="file.jubao" tabindex="3">举报文件</a>\n		</div>\n	</div>\n<%\n	}\n}\n%>\n', f = "D:\\qun\\clt_filetab\\src\\tpl\\fileRowNew.ejs";
        try {
            var c = [], u = c.push.bind(c);
            for (var p = 0, v = e.list.length; p < v; p++) {
                var m = e.list[p];
                if (m.orcType === 2) {
                    s = 5;
                    u('\n	<div class="fold list-item ');
                    s = 6;
                    if (m.succ) {
                        u("succ");
                    }
                    u('" data-path="');
                    u(a(m.id));
                    u('" id="');
                    u(a(m.domid));
                    u('" data-dbaction="folder.open" data-action="list.select">\n		<div class="item-name item-name-adjust"  data-dbaction="folder.open"  data-path="');
                    s = 7;
                    u(a(m.id));
                    u('" data-viewcntr="folder');
                    u(a(m.domid));
                    u('" title="');
                    u(m.fname);
                    u('">\n			<div class="filesmall-folder drag-dom" data-dbaction="folder.open"  data-path="');
                    s = 8;
                    u(a(m.id));
                    u('" data-viewcntr="folder');
                    u(a(m.domid));
                    u('"></div>\n			<span class="name drag-dom">');
                    s = 9;
                    u(m.fname);
                    u('</span>\n		</div>\n		<div class="item-time drag-dom"  title="更新时间:');
                    s = 11;
                    u(a(m.mtoStr));
                    u('">\n			<span>');
                    s = 12;
                    u(a(m.mtStr));
                    u('</span>\n		</div>\n		<div class="item-size"></div>\n		<div class="item-user"></div>\n		<div class="item-download"><button role="button" aria-label="下载文件夹" title="下载文件夹" class="icons-download-new" data-action="folder.downloadByBtn"></button></div>\n	</div>\n');
                    s = 18;
                } else {
                    s = 20;
                    u('\n	<div class="file list-item ');
                    s = 21;
                    u(a(m.icon));
                    u(" ");
                    if (m.remoteType === 2) {
                        u("temp");
                    }
                    u(" ");
                    if (m.succ) {
                        u("succ");
                    }
                    u(" ");
                    if (m.safeType) {
                        u("illegal");
                    }
                    u('" id="');
                    u(a(m.domid));
                    u('" data-path="');
                    u(a(m.filepath));
                    u('" ');
                    if (!e.renderParams) {
                        u('id="');
                        u(a(m.domid));
                        u('"');
                    }
                    u(" ");
                    if (m.otherGroupName) {
                        u(' data-dbaction="openGroupFile" data-uin="');
                        u(m.gc);
                        u('"');
                    }
                    u(' data-action="list.select" ');
                    if (m.preview) {
                        u('data-dbaction="file.preview"');
                    } else {
                        u('data-dbaction="file.downloadByDom"');
                    }
                    u(" ");
                    if (m.safeType) {
                        u('title="该文件存在安全风险，无法正常使用"');
                    }
                    u('>\n		<div class="item-name-wrap item-name-adjust">\n			<div class="item-name" ');
                    s = 23;
                    if (!m.safeType) {
                        u('title="');
                        u(m.name);
                        u(m.suf);
                        u('"');
                    }
                    u('>\n				<div class="file-icons" data-path="');
                    s = 24;
                    u(a(m.filepath));
                    u('" ');
                    if (m.preview) {
                        u('data-dbaction="file.preview"');
                    }
                    u('>\n					<div class="drag-dom filesmall-');
                    s = 25;
                    u(a(m.icon));
                    u(" ");
                    if (m.previewObj) {
                        u("thumb");
                    }
                    u('" ');
                    if (m.previewObj) {
                        u('style="background-image:url(');
                        u(a(m.previewObj.url));
                        u(');"');
                    }
                    u('></div>\n					<i class="icons-check"></i>\n				</div>\n				<span class="name drag-dom">\n					');
                    s = 29;
                    u(m.name);
                    u(m.suf);
                    u("\n				</span>\n			</div>\n			");
                    s = 32;
                    if (m.canEdit || m.remoteType === 2) {
                        u('\n				<div class="item-tags">\n					<div class="overflow">\n						');
                        s = 35;
                        if (m.canEdit) {
                            u('<span class="can-edit"></span>');
                        }
                        u("\n						");
                        s = 36;
                        if (m.remoteType === 2) {
                            u('<span class="tmp"></span>');
                        }
                        u("\n					</div>\n				</div>\n			");
                        s = 39;
                    }
                    u('\n		</div>\n		<div class="item-time" ');
                    s = 41;
                    if (!m.safeType) {
                        u('title="更新时间:');
                        u(a(m.mtoStr));
                        u('"');
                    }
                    u('>\n			<span class="drag-dom">');
                    s = 42;
                    u(a(m.mtStr));
                    u('</span>\n		</div>\n		<div class="item-size" ');
                    s = 44;
                    if (!m.safeType) {
                        u('title="文件大小:');
                        u(a(m.sizeStr));
                        u('"');
                    }
                    u('>\n			<span class="drag-dom">');
                    s = 45;
                    u(a(m.sizeStr));
                    u('</span>\n		</div>\n		<div class="item-user" ');
                    s = 47;
                    if (!m.safeType) {
                        u('title="上传者:');
                        u(m.nick);
                        u(" (");
                        u(a(m.uin));
                        u(')"');
                    }
                    u("><span>");
                    u(m.nick);
                    u('</span></div>\n		<div class="item-download">\n			');
                    s = 49;
                    if (!m.safeType) {
                        u('<button role="button" aria-label="下载文件" title="下载文件" class="icons-download-new" data-action="file.downloadByBtn"></button>');
                    }
                    u('\n		</div>\n		<div class="aria-hide">\n			');
                    s = 52;
                    if (m.safeType === 0 && m.admin || G.info.isAdmin) {
                        u('\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件');
                        s = 53;
                        u(a(m.fname));
                        u('" data-action="file.forward" tabindex="3">转发</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件到手机');
                        s = 54;
                        u(a(m.fname));
                        u('" data-action="file.forwardMobile" tabindex="3">转发文件到手机</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="在文件夹中显示');
                        s = 55;
                        u(a(m.fname));
                        u('" data-action="file.openFolderInBox" tabindex="3">在文件夹中显示</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="重命名文件');
                        s = 56;
                        u(a(m.fname));
                        u('" data-action="file.showRename" data-blur="aria.fmg" tabindex="3">重命名</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="转存为永久文件');
                        s = 57;
                        u(a(m.fname));
                        u('" data-action="file.permanent" tabindex="3">转存为永久文件</a>\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="移动文件');
                        s = 58;
                        u(a(m.fname));
                        u('" data-action="file.showMove" data-blur="aria.fmg" tabindex="3">移动文件</a>\n			');
                        s = 59;
                    }
                    u("\n			");
                    s = 60;
                    if (m.safeType && m.admin || G.info.isAdmin) {
                        u('\n				<a href="javascript:void(0)" data-focus="file.aria" aria-label="删除文件');
                        s = 61;
                        u(a(m.fname));
                        u('" data-action="file.delete" tabindex="3">删除</a>\n			');
                        s = 62;
                    }
                    u('\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="举报文件');
                    s = 63;
                    u(a(m.fname));
                    u('" data-action="file.jubao" tabindex="3">举报文件</a>\n		</div>\n	</div>\n');
                    s = 66;
                }
            }
            s = 69;
            u("\n");
            s = 70;
            return c.join("");
        } catch (h) {
            n(h, d, f, s);
        }
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function w(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '<%\n		var group = locals.data;\n		if(group.first){\n%>\n	<div class="group-title" data-gc="<%=group.gc%>">\n		<% if(group.self){ %>\n			<span class="group-name">本群搜索结果</span> <span>(<%=group.total%>)</span>\n		<% }else{%>\n			<span class="group-name"><%=group.name%></span> <span>(<%=group.total%>)</span>\n		<% } %>\n	</div>\n<%}%>\n	<div class="group-result group<%=group.gc%>">\n<%\n		for(var i = 0,l = group.list.length;i<l;i++){\n			var item = group.list[i];\n%>\n	<div class="file list-item <%=item.icon%> <%if(item.remoteType===2){%>temp<%}%> <%if(item.succ){%>succ<%}%>" id="search<%=item.domid%>" data-path="<%=item.filepath%>" <%if(!locals.renderParams){%>id="<%=item.domid%>"<%}%> <%if(!group.self){%> data-dbaction="openGroupFile" data-uin="<%- item.gc %>"<%}else if(item.preview){%>data-dbaction="file.preview"<%}else{%>data-dbaction="file.downloadByDom"<%}%> data-action="list.select">\n		<div class="item-name-wrap item-name-adjust">\n			<div class="item-name">\n				<div class="file-icons" data-path="<%=item.filepath%>" <%if(item.preview){%>data-dbaction="file.preview"<%}%>>\n					<div class="filesmall-<%=item.icon%> <%if(item.previewObj){%>thumb<%}%> drag-dom" <%if(item.previewObj){%>style="background-image:url(<%=item.previewObj.url%>);"<%}%>></div>\n					<i class="icons-check"></i>\n				</div>\n				<span class="name drag-dom"><%- item.name %><%-item.suf%></span>\n			</div>\n			<% if(item.canEdit || item.remoteType === 2) { %>\n				<div class="item-tags">\n					<%if(item.canEdit){%><span class="can-edit"></span><%}%>\n					<%if(item.remoteType ===2){%><span class="tmp"></span><%}%>\n					&nbsp;\n				</div>\n			<% } %>\n		</div>\n		<div class="item-time" title="上传时间:<%=item.ctStr%>">\n			<span class="drag-dom">\n			<% if(group.self){ %>\n				<%= item.ctStr %>\n			<%}else{%>\n				<%= item.ctStr %>\n			<%}%>\n			</span>\n		</div>\n		<div class="item-size" title="文件大小:<%= item.sizeStr%>">\n			<span class="drag-dom"><%= item.sizeStr%></span>\n		</div>\n		<div class="item-user" title="上传者:<%-item.nick%> (<%=item.uin%>)"><span class="drag-dom"><%- item.nick%></span></div>\n		<div class="aria-hide">\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件<%=item.fname%>" data-action="file.forward" tabindex="3">转发</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件到手机<%=item.fname%>" data-action="file.forwardMobile" tabindex="3">转发文件到手机</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="在文件夹中显示<%=item.fname%>" data-action="file.openFolderInBox" tabindex="3">在文件夹中显示</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="重命名文件<%=item.fname%>" data-action="file.showRename" data-blur="aria.fmg" tabindex="3">重命名</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="转存为永久文件<%=item.fname%>" data-action="file.permanent" tabindex="3">转存为永久文件</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="移动文件<%=item.fname%>" data-action="file.showMove" data-blur="aria.fmg" tabindex="3">移动文件</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="举报文件<%=item.fname%>" data-action="file.jubao" tabindex="3">举报文件</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="删除文件<%=item.fname%>" data-action="file.delete" tabindex="3">删除</a>\n		</div>\n		<div class="item-source">\n			<span>\n			<% if(group.self){ %>\n				&nbsp;\n			<%}else{%>\n				<span class="group-code" data-action="openGroupInfoCard" data-uin="<%- item.gc %>"><%=item.gname%></span>\n			<%}%>\n			</span>\n		</div>\n	</div>\n<%\n	}\n%>\n	</div>\n', f = "D:\\qun\\clt_filetab\\src\\tpl\\searchRow.ejs";
        try {
            var c = [], u = c.push.bind(c);
            var p = e.data;
            if (p.first) {
                s = 4;
                u('\n	<div class="group-title" data-gc="');
                s = 5;
                u(a(p.gc));
                u('">\n		');
                s = 6;
                if (p.self) {
                    u('\n			<span class="group-name">本群搜索结果</span> <span>(');
                    s = 7;
                    u(a(p.total));
                    u(")</span>\n		");
                    s = 8;
                } else {
                    u('\n			<span class="group-name">');
                    s = 9;
                    u(a(p.name));
                    u("</span> <span>(");
                    u(a(p.total));
                    u(")</span>\n		");
                    s = 10;
                }
                u("\n	</div>\n");
                s = 12;
            }
            u('\n	<div class="group-result group');
            s = 13;
            u(a(p.gc));
            u('">\n');
            s = 14;
            for (var v = 0, m = p.list.length; v < m; v++) {
                var h = p.list[v];
                s = 17;
                u('\n	<div class="file list-item ');
                s = 18;
                u(a(h.icon));
                u(" ");
                if (h.remoteType === 2) {
                    u("temp");
                }
                u(" ");
                if (h.succ) {
                    u("succ");
                }
                u('" id="search');
                u(a(h.domid));
                u('" data-path="');
                u(a(h.filepath));
                u('" ');
                if (!e.renderParams) {
                    u('id="');
                    u(a(h.domid));
                    u('"');
                }
                u(" ");
                if (!p.self) {
                    u(' data-dbaction="openGroupFile" data-uin="');
                    u(h.gc);
                    u('"');
                } else if (h.preview) {
                    u('data-dbaction="file.preview"');
                } else {
                    u('data-dbaction="file.downloadByDom"');
                }
                u(' data-action="list.select">\n		<div class="item-name-wrap item-name-adjust">\n			<div class="item-name">\n				<div class="file-icons" data-path="');
                s = 21;
                u(a(h.filepath));
                u('" ');
                if (h.preview) {
                    u('data-dbaction="file.preview"');
                }
                u('>\n					<div class="filesmall-');
                s = 22;
                u(a(h.icon));
                u(" ");
                if (h.previewObj) {
                    u("thumb");
                }
                u(' drag-dom" ');
                if (h.previewObj) {
                    u('style="background-image:url(');
                    u(a(h.previewObj.url));
                    u(');"');
                }
                u('></div>\n					<i class="icons-check"></i>\n				</div>\n				<span class="name drag-dom">');
                s = 25;
                u(h.name);
                u(h.suf);
                u("</span>\n			</div>\n			");
                s = 27;
                if (h.canEdit || h.remoteType === 2) {
                    u('\n				<div class="item-tags">\n					');
                    s = 29;
                    if (h.canEdit) {
                        u('<span class="can-edit"></span>');
                    }
                    u("\n					");
                    s = 30;
                    if (h.remoteType === 2) {
                        u('<span class="tmp"></span>');
                    }
                    u("\n					&nbsp;\n				</div>\n			");
                    s = 33;
                }
                u('\n		</div>\n		<div class="item-time" title="上传时间:');
                s = 35;
                u(a(h.ctStr));
                u('">\n			<span class="drag-dom">\n			');
                s = 37;
                if (p.self) {
                    u("\n				");
                    s = 38;
                    u(a(h.ctStr));
                    u("\n			");
                    s = 39;
                } else {
                    u("\n				");
                    s = 40;
                    u(a(h.ctStr));
                    u("\n			");
                    s = 41;
                }
                u('\n			</span>\n		</div>\n		<div class="item-size" title="文件大小:');
                s = 44;
                u(a(h.sizeStr));
                u('">\n			<span class="drag-dom">');
                s = 45;
                u(a(h.sizeStr));
                u('</span>\n		</div>\n		<div class="item-user" title="上传者:');
                s = 47;
                u(h.nick);
                u(" (");
                u(a(h.uin));
                u(')"><span class="drag-dom">');
                u(h.nick);
                u('</span></div>\n		<div class="aria-hide">\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件');
                s = 49;
                u(a(h.fname));
                u('" data-action="file.forward" tabindex="3">转发</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="转发文件到手机');
                s = 50;
                u(a(h.fname));
                u('" data-action="file.forwardMobile" tabindex="3">转发文件到手机</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="在文件夹中显示');
                s = 51;
                u(a(h.fname));
                u('" data-action="file.openFolderInBox" tabindex="3">在文件夹中显示</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="重命名文件');
                s = 52;
                u(a(h.fname));
                u('" data-action="file.showRename" data-blur="aria.fmg" tabindex="3">重命名</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="转存为永久文件');
                s = 53;
                u(a(h.fname));
                u('" data-action="file.permanent" tabindex="3">转存为永久文件</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="移动文件');
                s = 54;
                u(a(h.fname));
                u('" data-action="file.showMove" data-blur="aria.fmg" tabindex="3">移动文件</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="举报文件');
                s = 55;
                u(a(h.fname));
                u('" data-action="file.jubao" tabindex="3">举报文件</a>\n			<a href="javascript:void(0)" data-focus="file.aria" aria-label="删除文件');
                s = 56;
                u(a(h.fname));
                u('" data-action="file.delete" tabindex="3">删除</a>\n		</div>\n		<div class="item-source">\n			<span>\n			');
                s = 60;
                if (p.self) {
                    u("\n				&nbsp;\n			");
                    s = 62;
                } else {
                    u('\n				<span class="group-code" data-action="openGroupInfoCard" data-uin="');
                    s = 63;
                    u(h.gc);
                    u('">');
                    u(a(h.gname));
                    u("</span>\n			");
                    s = 64;
                }
                u("\n			</span>\n		</div>\n	</div>\n");
                s = 68;
            }
            s = 70;
            u("\n	</div>\n");
            s = 72;
            return c.join("");
        } catch (g) {
            n(g, d, f, s);
        }
    };
}, , , , , , , , , , , , , , , , , , , , , , , , function(e, a, t) {
    "use strict";
    var i = {
        folderTree: t(185),
        newFloder: t(186)
    };
    var n = $("#containerFolderTreePanel");
    var r = t(18);
    function o(e, a) {
        G.folderTree = G.folderTree || {};
        var t = G.nowFolder === "/" ? {
            fname: "群文件",
            id: "/"
        } : G.folderMap()[G.nowFolder];
        if (G.folderTree && G.folderTree.selected) {
            G.folderTree.selected = t;
        }
        G.folderTree.container = $(e);
        var n = [];
        var o = Object.keys(G.folderMap());
        for (var s = o.length - 1; s >= 0; s--) {
            n.push(G.folderMap()[o[s]]);
        }
        n = r.quickSortByObjectAttr(n, "mt");
        $(e).html(i.folderTree({
            topFolder: G.topFolder,
            items: n
        }));
        l(t.id);
    }
    function l(e) {
        console.log("select:", e);
        e = e || $(this).data("id");
        if (!e) {
            return;
        }
        if (!G.folderTree) {
            G.folderTree = {};
        }
        n.find(".active").removeClass("active");
        var a = {};
        console.log(e);
        if (e === "/") {
            a = G.folderTree.selected = G.topFolder;
        } else if (e !== "new") {
            a = G.folderTree.selected = G.folderMap()[e];
        } else {
            a = {
                id: e
            };
            G.folderTree.selected = a;
        }
        console.log(a);
        $('.folder-list-item[data-id="' + a.id + '"]').addClass("active");
        a.fname !== undefined && n.find('[data-role="dest"]').html(a.fname);
    }
    function s() {
        var e = G.folderTree.container.find(".secondary-folder-list li");
        if (e.length) {
            e.first().before(i.newFloder());
        } else {
            G.folderTree.container.find(".secondary-folder-list").append(i.newFloder());
        }
    }
    e.exports = {
        render: o,
        newFolder: s,
        select: l
    };
}, function(e, a, t) {
    "use strict";
    var i = {
        102: "非群成员",
        103: "该文件不存在或已失效",
        106: "登录态校验失败",
        116: "没有权限",
        117: "没有权限",
        118: "没有权限",
        119: "没有权限",
        120: "没有权限",
        121: "没有权限",
        122: "没有权限",
        123: "没有权限",
        124: "没有权限",
        125: "没有权限",
        126: "没有权限",
        127: "没有权限",
        128: "没有权限",
        129: "没有权限",
        130: "没有权限",
        131: "没有权限",
        132: "文件存在安全风险",
        133: "文件安全性未知",
        134: "名称包含特殊/敏感字符，请重新输入。",
        313: "已存在同名文件夹，请重新命名",
        314: "创建文件夹失败",
        315: "删除文件夹失败",
        402: "文件数量已经超过限制",
        403: "可用空间不够",
        405: "创建失败，文件夹个数已达上限",
        25: "操作失败，空间不足."
    };
    var n = {
        deleteSuc: "删除成功",
        moveSuc: "转存成功",
        folderSuc: "新建文件夹成功",
        deleteFolderSuc: "删除文件夹成功"
    };
    var r = $(G.handler), o = t(67);
    var l = [ 134, 313, 405 ];
    function s(e, a) {
        e = Math.abs(e);
        if (i[e] && $.inArray(e, l) >= 0) {
            a.find(".error-message").text(i[e]).addClass("show");
        } else {
            var t = i[e] || "操作失败";
            r.trigger("toast.show", {
                type: "alert",
                text: t
            });
            o.hideAll();
        }
    }
    function d() {
        r.trigger("toast.show", {
            type: "alert",
            text: msg
        });
    }
    function f() {
        r.trigger("toast.show", {
            type: "alert",
            text: msg
        });
    }
    e.exports = {
        showError: s,
        showWait: d,
        showSuc: f
    };
}, function(e, a, t) {
    "use strict";
    var i = new Date();
    var n = i.getFullYear();
    function r(e) {
        var a = Math.ceil(e / 86400);
        return a;
    }
    function o(e) {
        e = G(e);
        if (e.getFullYear() != i.getFullYear()) return false;
        if (e.getMonth() != i.getMonth()) return false;
        if (e.getDate() != i.getDate()) return false;
        return true;
    }
    function l(e) {
        e = G(e);
        var a = o(e);
        var t = false;
        if (!a) {
            var n = new Date(i.getFullYear(), i.getMonth(), i.getDate()) - e;
            t = n > 0 && n < 864e5;
        }
        return t;
    }
    function s(e) {
        e = G(e);
        var a = o(e);
        var t = false;
        if (!a) {
            var n = new Date(i.getFullYear(), i.getMonth(), i.getDate()) - e;
            t = n > 0 && n < 864e5 * 2;
        }
        return t;
    }
    function d(e) {
        e = G(e);
        var a = o(e);
        var t = false;
        if (!a) {
            var n = new Date(i.getFullYear(), i.getMonth(), i.getDate()) - e;
            t = n >= 0 && n <= 864e5;
        }
        if (t) return "昨天"; else return "前天";
    }
    function f(e) {
        e = G(e);
        var a = o(e);
        var t = false;
        if (!a) {
            var n = new Date(i.getFullYear(), i.getMonth(), i.getDate()) - e;
            t = n > 0 && n < 864e5 * 2;
        }
        return t;
    }
    function c(e) {
        e = G(e);
        var a = m(i);
        if (e > a) return true;
        return false;
    }
    function u(e) {
        e = G(e);
        if (e.getYear() != i.getYear()) return false;
        return true;
    }
    function p(e) {
        if (!e) e = i.getFullYear();
        var a = new Date(e, 0, 1);
        var t = undefined;
        var n = a.getDay();
        if (n === 0) n = 7;
        var r = [ null, "一", "二", "三", "四", "五", "六", "日" ];
        var o = "周" + r[n];
        if (n != 1) a.setDate(1 + 8 - n);
        return a;
    }
    function v(e) {
        var a = new Date(e);
        var t = p(a.getFullYear());
        var i = 0;
        var n = undefined;
        if (t.getDate() > 1) i = 1;
        if (a < t) n = 1; else {
            n = Math.floor((a - t) / 7 / 864e5) + i;
        }
        return n;
    }
    function m(e) {
        var a = G(e);
        var t = a.getDay();
        if (t === 0) t = 7;
        var i = t - 1;
        var n = undefined;
        n = new Date(a.getTime() - i * 864e5);
        return n;
    }
    function h(e) {
        var a = G(e);
        var t = a.getDay();
        if (t === 0) t = 7;
        return t;
    }
    function g() {}
    function w(e) {
        if (!e) {
            return;
        }
        var a = G(e);
        var t = a.getFullYear();
        var i = a.getMonth() + 1;
        var n = a.getDate();
        var r = a.getHours();
        var o = a.getMinutes();
        if (i < 10) i = "0" + i;
        if (n < 10) n = "0" + n;
        if (o < 10) {
            o = "0" + o;
        }
        return t + "-" + i + "-" + n + " " + r + ":" + o;
    }
    function b(e) {
        if (!e) {
            return;
        }
        var a = G(e);
        var t = a.getFullYear();
        var i = a.getMonth() + 1;
        var n = a.getDate();
        var r = a.getHours();
        var o = a.getMinutes();
        if (i < 10) i = "0" + i;
        if (n < 10) n = "0" + n;
        if (o < 10) {
            o = "0" + o;
        }
        return t + "-" + i + "-" + n + " " + r + ":" + o;
    }
    function y(e) {
        var a = G(e);
        var t = new Date();
        var i = t.getTime() - a.getTime();
        var n = parseInt(i / 36e5, 10);
        if (n < 1) n = "刚刚"; else n = n + "小时前";
        return n;
    }
    function G(e) {
        var a = e;
        if (typeof e === "string") a = new Date(e);
        if (typeof e === "number") a = new Date(e * 1e3);
        return a;
    }
    function x(e) {
        if (!e) {
            return;
        }
        var a = 60, t = 3600, i = 86400, n = "";
        if (e >= i) {
            n = Math.ceil(e / i) + "天";
        } else if (e >= t) {
            n = Math.ceil(e / t) + "小时";
        } else if (e >= a) {
            n = Math.ceil(e / a) + "分钟";
        } else if (e > 0) {
            n = e + "秒";
        } else {
            n = "已过期";
        }
        return n;
    }
    function k(e) {
        var a = undefined;
        var t = undefined;
        if (typeof e == "number") {
            a = new Date(e * 1e3);
        } else if (e instanceof Date) {
            a = e;
        }
        if (o(a)) {
            t = y(a);
        } else if (s(a)) {
            t = d(a);
        } else {
            t = w(a);
        }
        return t;
    }
    function F(e) {
        var a = e.createtime;
        e.day_str = k(a);
        e.createtime_str = w(a);
        if (e.day_str === "今天") {
            e.createtime_str = y(a);
        }
        if (e.day_str === "最近三天") {
            e.createtime_str = d(a);
        }
    }
    e.exports = {
        dayStr: k,
        genTimeStr: F,
        getValidity: x,
        toDate: G,
        getHourStr: y,
        getExpriesDayNum: r,
        isToday: o,
        isYesterday: l,
        strYesterdayOrPre: d,
        isLast3days: f,
        isThisWeek: c,
        isThisYear: u,
        getMonOY: p,
        getWOY: v,
        getMOW: m,
        getDayOfWeek: h,
        getDayOfYear: g,
        getDateStr: k,
        getorcDateStr: w
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        var a = {
            fLen: 3
        };
        if (typeof e != "number") return "";
        var t;
        var i = e;
        var n = [ "B", "KB", "MB", "GB", "TB", "PB" ];
        while (i > 1024) {
            i = i / 1024;
            n.shift();
        }
        if (i >= 1e3) {
            i = i / 1024;
            n.shift();
        }
        var r = ("" + i).length;
        var o = 2;
        var l = 100;
        if (a && a.len) o = a.len;
        if (o < 0) o = 0;
        l = Math.pow(10, o);
        i = Math.floor(i * l) / l;
        if (a && a.fLen) {
            var s = i.toString().indexOf(".");
            if (i.toString().length <= a.fLen) {
                var d = parseInt(i, 10).toString().length;
                i = i.toFixed(a.fLen - d);
            } else if (a.fLen < i.toString().length) {
                i = i.toString();
                if (s > 0 && s < 3) i = i.substr(0, 4); else i = i.substr(0, 3);
            }
        }
        t = i.toString().replace(/\.0+$/, "");
        t = t + n[0];
        if (i === 0) t = 0;
        return t;
    }
    function n(e) {
        var a = {
            fLen: 3
        };
        if (typeof e != "number") return "";
        var t;
        var i = e;
        var n = [ "B", "KB", "MB", "GB", "TB", "PB" ];
        while (i > 1024) {
            i = i / 1024;
            n.shift();
        }
        if (i >= 1e3) {
            i = 1;
            n.shift();
        }
        var r = ("" + i).length;
        var o = 2;
        var l = 100;
        if (a && a.len) o = a.len;
        if (o < 0) o = 0;
        l = Math.pow(10, o);
        var s = Math.round(i * l) / l;
        if (s >= 1e3) i = Math.floor(i * l) / l; else i = s;
        if (a && a.fLen) {
            var d = i.toString().indexOf(".");
            if (i.toString().length <= a.fLen) {
                var f = parseInt(i, 10).toString().length;
                i = i.toFixed(a.fLen - f);
            } else if (a.fLen < i.toString().length) {
                i = i.toString();
                if (d > 0 && d < 3) i = i.substr(0, 4); else i = i.substr(0, 3);
            }
        }
        t = i.toString().replace(/\.0+$/, "");
        t = t + n[0];
        if (i === 0) t = 0;
        return t;
    }
    function r(e) {
        var a = "unknow";
        var t = {
            excel: /xls|xlsx/i,
            pdf: /pdf/i,
            ppt: /ppt|pptx/i,
            word: /doc|docx|wps/i,
            text: /txt/i,
            pic: /jpg|jpeg|jpgx|gif|bmp|png/i,
            music: /mp3|wma|midi|aac|ape|flac|wav|ogg/i,
            video: /mp4|rm|rmvb|mpeg|mov|avi|3gp|amv|dmv|flv|wmv|qsed|asf/i,
            zip: /rar|zip|tar|cab|uue|jar|iso|7z|ace|lzh|arj|gzip|bz2/i,
            code: /ink|torrent|url|vbs|tif|w3g|vbe|ssf|dll|mht|rcd|bat|sav|dat|cmd|ttf|xml|vob|sgs|mhw|js|html|htm|css/i,
            exe: /exe|msi/i,
            ipa: /ipa/i,
            dmg: /dmg/i,
            apk: /apk/i
        };
        for (var i in t) {
            var n = t[i];
            if (n.test(e)) {
                a = i;
                break;
            }
        }
        return a;
    }
    function o(e) {
        var a = "其他";
        var t = {
            "文档": /doc|docx|ppt|pptx|xsl|xslx|xls|xlsx|pdf|txt|wps/i,
            "图片": /jpg|jpeg|jpgx|gif|bmp|png/i,
            "音乐": /mp3|wma|midi|aac/i,
            "视频": /mp4|rm|rmvb|mpeg|mov|avi|3gp|amv|dmv|flv|wmv|qsed/i,
            "压缩包": /rar|zip|tar|cab|uue|jar|iso|7z|ace|lzh|arj|gzip|bz2/i,
            "应用": /dmg/i
        };
        for (var i in t) {
            var n = t[i];
            if (n.test(e)) {
                a = i;
                break;
            }
        }
        return a;
    }
    var l = 5485;
    function s(e, a) {
        return false;
    }
    function d(e) {
        var a = e.lastIndexOf("."), t = {};
        if (a >= 0) {
            t.filename_name = e.substr(0, a);
            t.filename_suf = e.substr(a);
        } else {
            t.filename_name = e;
            t.filename_suf = "";
        }
        return t;
    }
    function f(e) {
        var a = e.lastIndexOf("\\"), t = e.substr(a + 1);
        return t;
    }
    e.exports = {
        getSize: i,
        getIcon: r,
        getType: o,
        canEdit: s,
        getFileName: d,
        getFolderName: f
    };
}, function(e, a, t) {
    "use strict";
    var i = function() {
        var e = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
        var a = /&\w+;|&#(\d+);/g;
        var t = /(^\s*)|(\s*$)/g;
        var i = {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&",
            "&nbsp;": " ",
            "&quot;": '"',
            "&copy;": ""
        };
        var n = function o(a) {
            a = a != undefined ? a : "";
            return typeof a != "string" ? a : a.replace(e, function(e) {
                var a = e.charCodeAt(0), t = [ "&#" ];
                a = a == 32 ? 160 : a;
                t.push(a);
                t.push(";");
                return t.join("");
            });
        };
        var r = function l(e) {
            e = e != undefined ? e : "";
            var t = typeof e != "string" ? e : e.replace(a, function(e, a) {
                var t = i[e];
                if (t == undefined) {
                    if (!isNaN(a)) {
                        t = String.fromCharCode(a == 160 ? 32 : a);
                    } else {
                        t = e;
                    }
                }
                return t;
            });
            t = t.replace(/&#x2028;/g, "\u2028");
            t = t.replace(/&#x2029;/g, "\u2029");
            return t;
        };
        return {
            encodeHtml: n,
            decodeHtml: r
        };
    }();
    e.exports = {
        encode: i.encodeHtml,
        decode: i.decodeHtml
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        if (!G.cMap) {
            G.cMap = {};
        }
        var a = G.cMap[e.id];
        if (!a) {
            a = G.cMap[e.filepath];
            if (a) {
                if (a && a.type.indexOf("upload") >= 0 && e.type.indexOf("upload") >= 0 && a.status != e.status) {
                    if (e.id) {
                        plistMap[e.id] = a;
                    }
                    console.warn("new task 发现续传 id[" + a.id + "] status[" + a.status + "]");
                } else if (e.type == "download") {
                    console.log(e);
                } else {}
            }
        }
        if (!a) {
            if (e.id) {
                G.cMap[e.id] = e;
            }
            if (e.filepath) {
                G.cMap[e.filepath] = e;
            }
            return e;
        } else {}
    }
    function n(e) {
        if (G.cMap[e.id] || G.cMap[e.filepath]) {
            return true;
        } else {
            return false;
        }
    }
    function r(e) {
        if (G.cMap[e.id]) {
            delete G.cMap[e.id];
        }
        if (G.cMap[e.filepath]) {
            delete G.cMap[e.filepath];
        }
    }
    function o(e) {}
    function l() {
        for (var e in G.cMap) {
            var a = G.cMap[e];
            if (a && a.status === "uploadcomplete") {
                delete G.cMap[a.id];
                delete G.cMap[a.filepath];
            }
        }
    }
    e.exports = {
        check: n,
        add: i,
        del: r,
        update: o,
        clearComplete: l
    };
}, function(e, a, t) {
    "use strict";
    var i = t(92), n = {}, r = $(G.handler);
    e.exports = n;
    var o = 10, l = 3 * 60 * 1e3;
    function s(e) {
        var a = e.filepath;
        var t = e.remoteType;
        var i = e.fname;
        var n = e.fp;
        if (!n) {
            n = a.substr(4);
        }
        var r = t == 1 ? 0 : 1;
        var n = r + "<" + n + "<" + escape(i);
        return n;
    }
    function d(e) {
        var a = "";
        for (var t = 0; t < e.length; t++) {
            if (t > 0) {
                a += ":";
            }
            a += s(e[t]);
        }
        return a;
    }
    n.getThumb = function(e, a) {
        if (!G.flagThumb) {
            return;
        }
        var t = d(e);
        var n = {
            id: Math.floor(new Date().getTime() / 1e3),
            fp_list: t
        };
        i.getPreview(n).done(function(a) {
            if (a.ec === 0) {
                if (!a.address_list) {
                    a.address_list = [];
                }
                for (var t = 0, i = e.length; t < i; t++) {
                    var n = e[t], o = a.address_list[t];
                    o.t = new Date().getTime();
                    if (n) {
                        n.usedTime = 0;
                        G.previewCache[n.filepath] = o;
                        n.previewObj = o;
                        r.trigger("file.thumbUpdate", n);
                    }
                }
            }
        }).fail(function(e) {});
    };
    n.getOneThumb = function(e, a) {
        var t = new Date().getTime();
        try {
            if (t - e.previewObj.t < l && e.usedTime <= 3) {
                a(e);
                return;
            }
        } catch (n) {
            console.log(n);
        }
        var r = {
            id: Math.floor(new Date().getTime() / 1e3),
            fp_list: s(e)
        };
        i.getPreview(r).done(function(t) {
            if (t.ec === 0) {
                if (!t.address_list) {
                    t.address_list = [];
                }
                var i = t.address_list[0];
                i.t = new Date().getTime();
                e.usedTime = 0;
                e.previewObj = i;
                a(e);
            }
        }).fail(function(e) {});
    };
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: true
    });
    a.next = d;
    a.pref = f;
    var i = t(73);
    var n = t(23);
    var r = -1;
    var o = [];
    G.historyList = o;
    G.historyIdx = r;
    if (G.webParams) {
        o.push(G.webParams);
    }
    G.setHistory = function(e) {
        r++;
        if (o.length - r >= 1) {
            o = o.slice(0, r);
        }
        o.push(e);
        l();
    };
    var l = function c() {
        if (r > 0) {
            $(".history .left").removeClass("disable");
        } else {
            $(".history .left").addClass("disable");
        }
        if (r < o.length - 1) {
            $(".history .right").removeClass("disable");
        } else {
            $(".history .right").addClass("disable");
        }
    };
    G.isHistory = false;
    var s = function u() {
        G.isHistory = true;
        l();
        var e = o[r];
        if (e.action === "fileList") {
            i.renderFolder(e.params.folderId, e.params.fname);
        } else if (typeof e.key_word !== "undefined") {
            $("#inputSearch").val(e.key_word);
            n.search();
        }
    };
    function d() {
        if (G.isHistory) {
            return;
        }
        r++;
        if (r > o.length - 1) {
            r = o.length - 1;
            return;
        }
        s();
        reportNew("wayNext");
    }
    function f() {
        if (G.isHistory) {
            return;
        }
        r--;
        if (r < 0) {
            r = 0;
            return;
        }
        s();
        reportNew("wayPref");
    }
}, function(e, a, t) {
    "use strict";
    var i = t(187);
    var n = t(188);
    var r = t(189);
    var o = t(190);
    var l = t(191);
    var s = t(192);
    var d = t(193);
    var f = t(75);
    var c = t(194);
    var u = t(195);
    e.exports = {
        "box.toggle": i.toggle,
        "task.continue": n.continueUpload,
        "task.pause": o.pause,
        "task.remove": l.remove,
        "task.resume": s.resume,
        "task.clear": r.clear,
        "task.openFolder": f.openByBox,
        "task.openFolderIco": f.openFolderByBoxIco,
        "tips.close": u.closeTips,
        "tips.refesh": u.refeshVip,
        "tips.con": u.conVip,
        "tips.vipOk": u.vipTipsOk,
        "tips.vipCancel": u.vipTipsCancel,
        "tips.open": u.openVip,
        "task.clearHistory": r.clear,
        "task.openfail": c.toggle
    };
}, function(e, a, t) {
    "use strict";
    function i() {}
    e.exports = {
        "input.edit": i
    };
}, function(e, a, t) {
    "use strict";
    var i = t(67);
    var n = function r() {
        i.hideAll();
        if (G.activeElement) {
            G.activeElement.focus();
        }
    };
    e.exports = {
        "panel.close": n
    };
}, function(e, a, t) {
    "use strict";
    var i = {
        folderTree: t(137),
        list: t(25)
    };
    var n = {
        folder: t(165)
    };
    var r = t(76);
    var o = t(196);
    var l = t(92);
    var s = t(77);
    var d = t(137);
    var f = t(18);
    var c = false;
    var u = false;
    function p() {
        if ($('[data-keyup="folderTree.create"]').length) {
            console.log("can not try to create more than one folder at the same time");
            return;
        }
        report("createFolderInTree");
        i.folderTree.newFolder();
        i.folderTree.select("new");
        $("#inputFolderNameInFolderTree").val(f.getFolderNameDefault());
        $("#inputFolderNameInFolderTree")[0].focus();
        $("#inputFolderNameInFolderTree")[0].select();
    }
    function v(e) {
        e.keyCode = 13;
        m.call(this, e);
    }
    function m(e, a) {
        if (e && e.keyCode !== 13 && $("#inputFolderNameInFolderTree").length) {
            r["input.keyup"].call(this, e);
            return;
        }
        var t = $('[data-keyup="folderTree.create"]');
        if (!t.length) {
            a && a();
            return;
        }
        if (a) {
            u = a;
        }
        if (c) {
            return;
        }
        var o = $.trim(t.val());
        var f = r.folderName(o);
        if (!f) {
            return;
        }
        var p = {
            parent_id: "/",
            name: o
        };
        var v = this;
        c = true;
        l.createFolder(p).done(function(e) {
            var a = s.filterFolder(e.folder_info);
            s.addData(a);
            i.list.appendFold(a);
            var t = $(".folder-tree-box").find('[data-id="new"].folder-list-item');
            t.html(n.folder({
                item: a
            })).attr("data-id", a.id);
            if (G.folderTree.selected.id === "new") {
                d.select(a.id);
            }
            report("createFolderInTreeSuc");
            c = false;
            u && u();
            u = false;
        }).fail(function(e) {
            console.log("fail", e);
            c = false;
            var a = {
                134: "文件夹名称包含违禁词",
                313: "文件夹名已经存在",
                314: "创建文件夹失败",
                405: "文件夹个数已达上限",
                "default": "创建失败"
            };
            var t = Math.abs(e.ec);
            var i = $(".folder-tree-box").find(".bubble");
            i.html('<span class="bot"></span><span class="top"></span>' + (a[t] || a["default"])).show();
            setTimeout(function() {
                i.hide();
            }, 3e3);
        });
    }
    e.exports = {
        "folderTree.select": d.select,
        "folderTree.new": p,
        "folderTree.create": m,
        createInputBlur: v
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    function n(e) {
        if (e.action === "offline") {} else if (e.action === "online") {}
    }
    var r = function l() {
        var e = parseInt($(this).data("uin"));
        i.openGroupInfoCard(e);
    };
    var o = function s() {
        var e = parseInt($(this).data("uin"));
        var a = G.fileMap()[$(this).data("path")] || {};
        var t = {
            action: "search",
            params: {
                keyword: G.searchKeyword,
                files: [ {
                    fileId: a.fp,
                    busId: a.busid
                } ]
            }
        };
        localStorage.setItem("notifyOtherGroup", encodeURIComponent(JSON.stringify({
            gc: e,
            webParams: JSON.stringify(t),
            random: Math.random()
        })));
        i.openGroupFile(e, encodeURIComponent(JSON.stringify(t)));
    };
    e.exports = {
        groupEvent: n,
        openGroupFile: o,
        openGroupInfoCard: r
    };
}, function(e, a, t) {
    "use strict";
    var i = t(22);
    var n = t(21);
    var r = t(77);
    var o = function y() {
        G.activeElement = this;
    };
    var l = [ 65, 68, 0, 72, 74, 76, 77, 78, 79, 80, 82, 85, 89 ];
    var s = function x() {
        var e = $(document.activeElement).parents(".list-item");
        if (e.length === 0) {
            return false;
        }
        var a = e.data("path");
        var t = undefined;
        var i = r.getData(a);
        if (i.orcType === 2) {
            t = "fold";
        } else if (i.orcType == 1) {
            t = "file";
        }
        G.selectRow = i || {};
        G.selectRow.path = a;
        G.selectRow.type = t;
        G.selectRows = [ G.selectRow ];
        return true;
    };
    var d = function k() {
        if (s()) {
            if (G.selectRow.type === "fold") {
                n["folder.openfolder"]();
            }
        }
    };
    var f = function F() {
        if (s()) {
            if (G.selectRow.type === "file") {
                i["file.showRename"]();
            } else if (G.selectRow.type === "fold") {
                n["folder.showRenameFolder"]();
            }
        }
    };
    var c = function T() {
        if (s()) {
            if (G.selectRow.type === "file") {
                i["file.download"]();
            } else if (G.selectRow.type === "fold") {
                n["folder.download"]();
            }
        }
    };
    var u = function _() {
        if (s()) {
            if (G.selectRow.type === "fold") {
                n["folder.property"]();
            }
        }
    };
    var p = function C() {
        if (s()) {
            if (G.selectRow.type === "file") {
                i["file.showRename"]();
            } else if (G.selectRow.type === "fold") {
                n["folder.showRenameFolder"]();
            }
        }
    };
    var v = function S() {
        if (s()) {
            if (G.selectRow.type === "file") {
                i["file.preview"]();
            }
        }
    };
    var m = function M() {
        if (s()) {
            if (G.selectRow.type === "file") {
                i["file.showMove"]();
            }
        }
    };
    var h = function D() {
        var e = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        if (s()) {
            if (G.selectRow.type === "file") {
                if (e) {
                    i["file.forwardMobile"]();
                } else {
                    i["file.forward"]();
                }
            }
        }
    };
    var g = function R() {
        if (s()) {
            if (G.selectRow.type === "file") {
                i["file.jubao"]();
            }
        }
    };
    var w = function j(e) {
        switch (e) {
          case 65:
            $("#selectAllFile").click();
            break;

          case 66:
            $("#openBoxBtn").click();
            break;

          case 68:
            f();
            break;

          case 70:
            h();
            break;

          case 72:
            h(true);
            break;

          case 74:
            g();
            break;

          case 76:
            doDownLoad();
            break;

          case 77:
            m();
            break;

          case 78:
            $("#createFolder button").click();
            break;

          case 79:
            d();
            break;

          case 80:
            u();
            break;

          case 82:
            p();
            break;

          case 85:
            $(".icons-upload-1").click();
            break;

          case 88:
            $(G.handler).trigger("panel.hideAll");
            break;

          case 89:
            v();
            break;
        }
    };
    var b = function N(e) {
        if (e.altKey && e.shiftKey) {
            w.call(this, e.keyCode);
        }
    };
    e.exports = {
        "aria.fmg": o,
        "aria.quick": b
    };
}, function(e, a, t) {
    "use strict";
    var i = t(177);
    var n = t(178);
    var r = t(197);
    var o = $("#fileMoreMenu");
    function l() {
        var e = n(G.info);
        o.html(e);
    }
    function s() {
        var e = i({
            mac: G.mac
        });
        o.html(e);
    }
    function d(e, a) {
        var t = {
            data: false,
            list: false
        };
        if (typeof a !== "undefined") {
            if (a.hasOwnProperty("length")) {
                t.list = a;
            } else {
                t.data = a;
            }
        }
        var i = r(t);
        e.html(i);
    }
    e.exports = {
        renderFolder: l,
        renderFile: s,
        renderCustomMenu: d
    };
}, function(e, a, t) {
    "use strict";
    var i = t(176);
    var n = undefined;
    var r = undefined;
    function o(e) {
        if (!n) {
            var a = i();
            $("body").append(a);
            n = $("#jubaoDom");
            r = $("#jubaoIframe");
        }
        if (e) {
            n.addClass("open");
            r.attr("src", e).addClass("open");
        }
    }
    function l() {
        if (n) {
            n.removeClass("open");
            r.removeClass("open");
        }
    }
    e.exports = {
        show: o,
        hide: l
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function b(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '<%\r\n	for(var i = 0,l = locals.list.length;i<l;i++){\r\n		var item = locals.list[i];\r\n%>\r\n<div class="file2 file2-2 <%-item.styles%>" data-path="<%-item.filepath%>" data-id="<%-item.id%>" data-folder="<%-item.folderpath%>" data-name="<%-item.filename%>" <%if(item.styleStatus === \'complete\'){%>data-action="task.openFolder"<%}%>>\r\n	<div class="file-icon">\r\n		<div class="filesmall-<%-item.icon%>"></div>\r\n		<i></i>\r\n	</div>\r\n	<div class="file-info">\r\n		<div class="filename">\r\n			<div class="name"><%-item.name%></div>\r\n			<%if(item.orcType === 1){%>\r\n				<div class="suffix"><%-item.suf%></div>\r\n			<%}%>\r\n		</div>\r\n		<div class="loading">\r\n			<div class="bar" style="width:<%-item.cPercent%>%;"></div>\r\n		</div>\r\n		<%if(item.failedFileList && item.failedFileList.length > 0){%>\r\n			<div class="wording"  data-action="task.openfail">\r\n				<i class=\'warn\'></i>有<%-item.failedFileList.length%>个文件下载失败<i class="arrow"></i>\r\n					<ul class="fail-list">\r\n						<%for(var j = 0,m = item.failedFileList.length;j<m;j++){%>\r\n							<li><%=item.failedFileList[j].filename%></li>\r\n						<%}%>\r\n					</ul>\r\n			</div>\r\n		<%}else{%>\r\n			<div class="wording"><%-item.wording%></div>		\r\n		<%}%>\r\n	</div>\r\n	<div class="file-action">\r\n		<a href="javascript:void(0)" class="seat"></a>\r\n		<a href="javascript:void(0)" class="pause" data-action="task.pause" title="暂停" aria-label="暂停任务 <%=item.name%>" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="resume" data-action="task.resume" title="启动" aria-label="启动任务 <%=item.name%>" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="continue" data-action="task.continue" title="续传" aria-label="续传任务 <%=item.name%>" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="remove" data-action="task.remove" title="删除"  aria-label="删除任务 <%=item.name%>" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="ok-upload"></a>\r\n		<a href="javascript:void(0)" class="ok-download"></a>\r\n		<a href="javascript:void(0)" class="go-folder" data-action="task.openFolderIco" title="打开该文件所在的文件夹" arir-label="打开<%=item.name%>所在的文件夹" tabindex="3"></a>\r\n	</div>\r\n	<div></div>\r\n</div>\r\n<%}%> ', f = "D:\\qun\\clt_filetab\\src\\tpl\\taskNew.ejs";
        try {
            var c = [], u = c.push.bind(c);
            for (var p = 0, v = e.list.length; p < v; p++) {
                var m = e.list[p];
                s = 4;
                u('\r\n<div class="file2 file2-2 ');
                s = 5;
                u(m.styles);
                u('" data-path="');
                u(m.filepath);
                u('" data-id="');
                u(m.id);
                u('" data-folder="');
                u(m.folderpath);
                u('" data-name="');
                u(m.filename);
                u('" ');
                if (m.styleStatus === "complete") {
                    u('data-action="task.openFolder"');
                }
                u('>\r\n	<div class="file-icon">\r\n		<div class="filesmall-');
                s = 7;
                u(m.icon);
                u('"></div>\r\n		<i></i>\r\n	</div>\r\n	<div class="file-info">\r\n		<div class="filename">\r\n			<div class="name">');
                s = 12;
                u(m.name);
                u("</div>\r\n			");
                s = 13;
                if (m.orcType === 1) {
                    u('\r\n				<div class="suffix">');
                    s = 14;
                    u(m.suf);
                    u("</div>\r\n			");
                    s = 15;
                }
                u('\r\n		</div>\r\n		<div class="loading">\r\n			<div class="bar" style="width:');
                s = 18;
                u(m.cPercent);
                u('%;"></div>\r\n		</div>\r\n		');
                s = 20;
                if (m.failedFileList && m.failedFileList.length > 0) {
                    u('\r\n			<div class="wording"  data-action="task.openfail">\r\n				<i class=\'warn\'></i>有');
                    s = 22;
                    u(m.failedFileList.length);
                    u('个文件下载失败<i class="arrow"></i>\r\n					<ul class="fail-list">\r\n						');
                    s = 24;
                    for (var h = 0, g = m.failedFileList.length; h < g; h++) {
                        u("\r\n							<li>");
                        s = 25;
                        u(a(m.failedFileList[h].filename));
                        u("</li>\r\n						");
                        s = 26;
                    }
                    u("\r\n					</ul>\r\n			</div>\r\n		");
                    s = 29;
                } else {
                    u('\r\n			<div class="wording">');
                    s = 30;
                    u(m.wording);
                    u("</div>		\r\n		");
                    s = 31;
                }
                u('\r\n	</div>\r\n	<div class="file-action">\r\n		<a href="javascript:void(0)" class="seat"></a>\r\n		<a href="javascript:void(0)" class="pause" data-action="task.pause" title="暂停" aria-label="暂停任务 ');
                s = 35;
                u(a(m.name));
                u('" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="resume" data-action="task.resume" title="启动" aria-label="启动任务 ');
                s = 36;
                u(a(m.name));
                u('" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="continue" data-action="task.continue" title="续传" aria-label="续传任务 ');
                s = 37;
                u(a(m.name));
                u('" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="remove" data-action="task.remove" title="删除"  aria-label="删除任务 ');
                s = 38;
                u(a(m.name));
                u('" tabindex="3"></a>\r\n		<a href="javascript:void(0)" class="ok-upload"></a>\r\n		<a href="javascript:void(0)" class="ok-download"></a>\r\n		<a href="javascript:void(0)" class="go-folder" data-action="task.openFolderIco" title="打开该文件所在的文件夹" arir-label="打开');
                s = 41;
                u(a(m.name));
                u('所在的文件夹" tabindex="3"></a>\r\n	</div>\r\n	<div></div>\r\n</div>\r\n');
                s = 45;
            }
            u(" ");
            return c.join("");
        } catch (w) {
            n(w, d, f, s);
        }
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '		<div class="panel">\n			<div class="panel-title">\n				<i class="icons-qq"></i>\n				<span>文件夹属性</span>\n				<div class="close" data-action="panel.close"></div>\n			</div>\n			<div class="panel-body">\n				<div class="panel-content">\n					<div class="folder-property-top">\n						<div class="files-folder filesmall-folder"></div>\n						<div class="folder-title">\n							<div class="folder-name"><%-locals.fname%></div>\n							<div class="folder-size">共<%=locals.filenum%>个文件</div>\n						</div>\n					</div>\n					<div class="folder-property-bottom">\n						<div class="created-at">\n							<span class="folder-property-label">创建时间:</span>\n							<span class="folder-property-content"><%=locals.ctStr%></span>\n						</div>\n						<div class="creator">\n							<span class="folder-property-label">创&nbsp;&nbsp;建&nbsp;&nbsp;人:</span>\n							<span class="folder-property-content"><%-locals.nick%></span>\n						</div>\n						<div class="updated-at">\n							<span class="folder-property-label">最后更新时间:</span>\n							<span class="folder-property-content"><%=locals.mtStr%></span>\n						</div>\n						<div class="updater">\n							<span class="folder-property-label">最&nbsp;后&nbsp;更&nbsp;新&nbsp;人:</span>\n							<span class="folder-property-content"><%-locals.mnick%></span>\n						</div>\n					</div>\n				</div>\n			</div>\n			<a href="javascript:void(0);" class="aria-hide" tabindex="3" aria-label="文件夹<%-locals.fname%>共<%=locals.filenum%>个文件 创建时间:<%=locals.ctStr%> 创建人:<%-locals.nick%> 最后更新人:<%-locals.mnick%>"></a>\n			<a href="javascript:void(0);" class="aria-hide" data-action="panel.close" tabindex="3" aria-label="关闭文件夹属性窗口"></a>\n			<%if(G.mac){%>\n				<div class="panel-footer">\n					<input aria-label="确定" type="submit" value="确定" class="btn-ok btn-common btn-right" data-action="panel.close" tabindex="2">\n				</div>\n			<%}%>\n		</div>\n\n', f = "D:\\qun\\clt_filetab\\src\\tpl\\folderproperty.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('		<div class="panel">\n			<div class="panel-title">\n				<i class="icons-qq"></i>\n				<span>文件夹属性</span>\n				<div class="close" data-action="panel.close"></div>\n			</div>\n			<div class="panel-body">\n				<div class="panel-content">\n					<div class="folder-property-top">\n						<div class="files-folder filesmall-folder"></div>\n						<div class="folder-title">\n							<div class="folder-name">');
            s = 12;
            u(e.fname);
            u('</div>\n							<div class="folder-size">共');
            s = 13;
            u(a(e.filenum));
            u('个文件</div>\n						</div>\n					</div>\n					<div class="folder-property-bottom">\n						<div class="created-at">\n							<span class="folder-property-label">创建时间:</span>\n							<span class="folder-property-content">');
            s = 19;
            u(a(e.ctStr));
            u('</span>\n						</div>\n						<div class="creator">\n							<span class="folder-property-label">创&nbsp;&nbsp;建&nbsp;&nbsp;人:</span>\n							<span class="folder-property-content">');
            s = 23;
            u(e.nick);
            u('</span>\n						</div>\n						<div class="updated-at">\n							<span class="folder-property-label">最后更新时间:</span>\n							<span class="folder-property-content">');
            s = 27;
            u(a(e.mtStr));
            u('</span>\n						</div>\n						<div class="updater">\n							<span class="folder-property-label">最&nbsp;后&nbsp;更&nbsp;新&nbsp;人:</span>\n							<span class="folder-property-content">');
            s = 31;
            u(e.mnick);
            u('</span>\n						</div>\n					</div>\n				</div>\n			</div>\n			<a href="javascript:void(0);" class="aria-hide" tabindex="3" aria-label="文件夹');
            s = 36;
            u(e.fname);
            u("共");
            u(a(e.filenum));
            u("个文件 创建时间:");
            u(a(e.ctStr));
            u(" 创建人:");
            u(e.nick);
            u(" 最后更新人:");
            u(e.mnick);
            u('"></a>\n			<a href="javascript:void(0);" class="aria-hide" data-action="panel.close" tabindex="3" aria-label="关闭文件夹属性窗口"></a>\n			');
            s = 38;
            if (G.mac) {
                u('\n				<div class="panel-footer">\n					<input aria-label="确定" type="submit" value="确定" class="btn-ok btn-common btn-right" data-action="panel.close" tabindex="2">\n				</div>\n			');
                s = 42;
            }
            u("\n		</div>\n\n");
            s = 45;
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '<section class="file-list" id="<%-locals.id%>"></section>', f = "D:\\qun\\clt_filetab\\src\\tpl\\folderdom.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('<section class="file-list" id="');
            u(e.id);
            u('"></section>');
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, function(e, a, t) {
    "use strict";
    var i = t(18);
    var n = window.performance;
    var r = {};
    e.exports = r;
    var o = i.getParameter("gc");
    function l() {
        d = i.getCookie("skey");
        var e = 5381;
        for (var a = 0, t = d.length; a < t; ++a) {
            e += (e << 5) + d.charCodeAt(a);
        }
        var n = e & 2147483647;
        return n;
    }
    function s() {
        var e = i.getCookie("uin");
        if (!e) {
            return 0;
        }
        e += "";
        return e.replace(/^[\D0]+/g, "");
    }
    var d = i.getCookie("skey");
    var f = s();
    var c = i.getParameter("groupuin");
    var u = l();
    function p(e) {
        return false;
    }
    var v = [ "http://pan.qun.qq.com/cgi-bin/checkAuditFlag" ];
    var m = [];
    var h = [];
    var g = {
        get_vip_info: 3,
        checkAuditFlag: 4,
        get_file_lsit: 5,
        get_group_space: 6,
        move_file: 7,
        rename_file: 8,
        create_folder: 9,
        rename_folder: 10,
        delete_folder: 11,
        thumbnail: 12
    };
    function w(e) {
        var a;
        if (e < 500) {
            a = 2220106;
        } else if (e < 2e3) {
            a = 2220107;
        } else if (e < 4e3) {
            a = 2220108;
        } else if (e < 6e3) {
            a = 2220109;
        } else if (e < 8e3) {
            a = 2220110;
        } else if (e < 1e4) {
            a = 2220111;
        } else if (e < 12e3) {
            a = 2220112;
        } else if (e < 15e3) {
            a = 2220113;
        } else if (e < 2e4) {
            a = 2220114;
        } else if (e < 25e3) {
            a = 2220115;
        } else if (e < 3e4) {
            a = 2220116;
        } else if (e < 4e4) {
            a = 2220117;
        } else if (e < 5e4) {
            a = 2220118;
        } else if (e < 6e4) {
            a = 2220119;
        } else {
            a = 2220120;
        }
        QReport.monitor(a);
    }
    function b(e, a) {
        var t = {
            get_vip_info: 3,
            checkAuditFlag: 4,
            get_file_list: 5,
            get_group_space: 6,
            move_file: 7,
            rename_file: 8,
            create_folder: 9,
            rename_folder: 10,
            delete_folder: 11,
            thumbnail: 12
        };
        var i = e.split("/");
        var n = t[i[i.length - 1]];
        if (n) {
            QReport.huatuo({
                appid: 10016,
                flag1: 1772,
                flag2: 1,
                flag3: n,
                speedTime: a
            });
        }
    }
    function y(e, a) {
        if (!n) {
            return;
        }
        if (e.indexOf("//") === 0) {
            if (G.checkHttps()) {
                e = "https:" + e;
            } else {
                e = "http:" + e;
            }
        }
        var t = e.substr(0, e.indexOf("?"));
        if (e.indexOf("?") < 0) {
            t = e;
        }
        if ($.inArray(e, h) < 0) {
            var i = n.getEntriesByName(e)[0];
            if (!i) {
                return;
            }
            h.push(e);
            var r = {
                1: i.redirectEnd - i.redirectStart,
                2: i.domainLookupStart - i.fetchStart,
                3: i.domainLookupEnd - i.domainLookupStart,
                4: i.connectEnd - i.connectStart,
                5: i.responseStart - i.requestStart,
                6: i.responseEnd - i.responseStart,
                7: i.responseEnd - i.startTime,
                8: i.fetchStart,
                9: i.domainLookupStart
            };
            b(t, r);
            r.url = e;
            w(r[2]);
            if (r[2] > 5e3) {
                QReport.monitor(2220299);
                badjsReport.info(JSON.stringify({
                    "重定向": r[1],
                    appcache: r[2],
                    dns: r[3],
                    tcp: r[4],
                    "接收": r[5],
                    "完成": r[6],
                    "总时间": r[7],
                    fetchStart: i.fetchStart,
                    dnsstart: i.domainLookupStart,
                    header: a.getAllResponseHeaders && a.getAllResponseHeaders() || false,
                    status: a.status,
                    t: "0427",
                    url: e,
                    "离线包": localVersion === "isLocal" ? "离线包请求" : "非离线包请求"
                }));
            }
        }
    }
    function x(e, a) {
        var t = Date.now();
        a = a || e.responseURL;
        e.done(function(i) {
            QReport.retcode({
                url: a,
                type: 1,
                code: i.ec,
                time: Date.now() - t,
                rate: 1
            });
            setTimeout(function() {
                y(a, e);
            }, 100);
            if (i.ec == 1) console.log("1", "缺少登录态");
        }).fail(function(e, i) {
            y(a);
            var n = {
                status: e.status,
                statusText: e.statusText
            };
            if (i == "timeout") {
                n.status = 999;
                n.statusText = "timeout";
            }
            QReport.retcode({
                url: a,
                type: 2,
                code: n.status,
                time: Date.now() - t,
                rate: 1
            });
        });
    }
    r.ajax = function(e) {
        var a = {
            type: "GET",
            dataType: "json",
            data: {
                src: "qpan",
                gc: e && e.data && e.data.gc || i.getParameter("groupuin")
            },
            xhrFields: {
                withCredentials: true
            },
            success: function r(e, a, t) {}
        };
        u && (a.data.bkn = l());
        $.extend(true, a, e);
        a.headers = {
            "Cache-Control": "no-cache,no-store"
        };
        if (a.type === "GET") {
            if (a.url.indexOf("?") < 0) {
                a.url += "?" + $.param(a.data);
            } else {
                a.url += "&" + $.param(a.data);
            }
            a.url += "&_ti=" + new Date().getTime();
            delete a.data;
        }
        var t = $.ajax(a);
        x(t, a.url);
        var n = {
            done: function o(e) {
                var i = 0;
                (function n(e, t) {
                    e.done(function(e) {
                        if (e.ec == 0) t(e);
                    });
                    e.fail(function() {
                        if (i >= 1 || p(a.url)) return;
                        i++;
                        e = $.ajax(a);
                        x(e, a.url);
                        n(e, t);
                    });
                })(t, e);
                return this;
            },
            fail: function s(e) {
                var i = 0;
                (function n(e, t) {
                    e.done(function(e) {
                        if (e.ec != 0) t(e);
                    });
                    e.fail(function(r, o) {
                        if (i >= 0) {
                            if (o == "timeout") {
                                report("cgiTimeout");
                                return t({
                                    ec: 504,
                                    msg: o
                                });
                            }
                            return t({
                                ec: r.status
                            });
                        }
                        i++;
                        e = $.ajax(a);
                        x(e, a.url);
                        n(e, t);
                    });
                })(t, e);
                return this;
            },
            timeout: function d(e) {
                t.fail(function(a, t) {
                    if (t == "timeout") e({
                        ec: 504,
                        msg: t
                    });
                });
                return this;
            },
            always: function f(e) {
                t.always(e);
                return this;
            },
            then: function c() {
                t.then.apply(t, arguments);
                return this;
            }
        };
        return n;
    };
    r.bkn = u;
}, function(e, a, t) {
    "use strict";
    var i = t(158);
    function n(e) {
        var a = i.errorCfgPrefix[e.type] + "-" + e.status;
        if (a in i.errorCfg && i.errorCfg) {
            return true;
        }
        return false;
    }
    function r(e) {
        if (!e || !e.type || !e.status) {
            return "";
        }
        var a = i.errorCfgPrefix[e.type] + "-" + e.status;
        if (a in i.errorCfg) {
            if (a === "upload-uploadsecurityfail" && i.securityattriMap[e.securityattri]) {
                return i.securityattriMap[e.securityattri];
            }
            return i.errorCfg[a];
        }
        return;
    }
    function o(e, a) {
        return i.wordingMap[e][a];
    }
    function l(e, a) {
        return i.styleMap[e][a];
    }
    function s(e) {
        return i.typeMap[e];
    }
    function d(e, a) {
        if (!e) {
            return false;
        }
        if (!i.wordingMap[e]) {
            console.warn("设置wording 未知任务类型=[" + e + "]");
        }
        if (!i.wordingMap[e][a]) {
            console.warn("设置wording 未知任务状态=[" + a + "]");
        }
        if (!i.styleMap[e][a]) {
            console.warn("设置样式 未知任务状态=[" + a + "]");
        }
    }
    e.exports = {
        check: d,
        getType: s,
        getWord: o,
        getClass: l,
        ifError: n,
        getErrorWord: r
    };
}, function(e, a, t) {
    "use strict";
    var i = {
        upload: "upload",
        continueupload: "continueupload",
        download: "download"
    };
    var n = {};
    n.upload = {
        scanning: "扫描中...&nbsp;&nbsp;",
        scanfail: "扫描失败&nbsp;&nbsp;",
        scanend: "扫描完成...&nbsp;&nbsp;",
        uploadgeturl: "准备上传...&nbsp;&nbsp;",
        uploadgeturlend: "上传中...&nbsp;&nbsp;",
        uploadadminonlyfail: "无法上传，已限制成员上传文件",
        uploadgeturlfail: "申请上传地址失败",
        uploadlimit: "文件个数达到上限，无法上传",
        uploadsecurityfail: "安全扫描失败",
        cancel: "空间不足,已取消上传",
        uploadprogress: "上传中:&nbsp;&nbsp;",
        uploadfail: "上传失败",
        uploadcomplete: "上传完成&nbsp;&nbsp;",
        filenotexsit: "文件不存在",
        pause: "暂停&nbsp;&nbsp;",
        "continue": "待续传&nbsp;&nbsp;"
    };
    n.download = {
        wait: "等待下载...&nbsp;&nbsp;",
        downloadready: "准备下载...&nbsp;&nbsp;",
        downloadgeturl: "准备下载...&nbsp;&nbsp;",
        downloadgeturlfail: "获取下载地址失败",
        cancel: "已取消下载&nbsp;&nbsp;",
        downloadgeturlend: "下载中...",
        downloadprogress: "下载中:&nbsp;&nbsp;",
        downloadfail: "下载失败&nbsp;&nbsp;",
        filenotexsit: "文件不存在",
        downloadcomplete: "下载完成&nbsp;&nbsp;",
        pause: "暂停&nbsp;&nbsp;"
    };
    n.continueupload = {
        scanning: "扫描中...&nbsp;&nbsp;",
        scanfail: "扫描失败&nbsp;&nbsp;",
        scanend: "扫描完成...&nbsp;&nbsp;",
        uploadgeturl: "准备续传...&nbsp;&nbsp;",
        uploadgeturlend: "续传中...&nbsp;&nbsp;",
        uploadgeturlfail: "申请续传地址失败",
        uploadlimit: "文件个数达到上限，无法上传",
        uploadsecurityfail: "安全扫描失败",
        cancel: "空间不足,已取消续传",
        uploadprogress: "续传中:&nbsp;&nbsp;",
        uploadfail: "续传失败",
        uploadcomplete: "续传完成&nbsp;&nbsp;",
        pause: "暂停&nbsp;&nbsp;",
        filenotexsit: "文件不存在",
        "continue": "待续传&nbsp;&nbsp;"
    };
    var r = {};
    r.upload = {
        scanning: "scan",
        scanfail: "err",
        scanend: "scan",
        uploadgeturl: "pre",
        uploadgeturlend: "pre",
        uploadgeturlfail: "err",
        uploadsecurityfail: "err",
        cancel: "err",
        uploadprogress: "progress",
        uploadfail: "err",
        uploadcomplete: "complete",
        pause: "pause",
        filenotexsit: "err",
        "continue": "continue",
        remove: ""
    };
    r.download = {
        wait: "pre",
        downloadready: "pre",
        downloadgeturl: "pre",
        downloadgeturlfail: "err",
        cancel: "err",
        downloadgeturlend: "pre",
        downloadprogress: "progress",
        downloadfail: "err",
        filenotexsit: "err",
        downloadcomplete: "complete",
        pause: "pause"
    };
    r.continueupload = {
        scanning: "scan",
        scanfail: "err",
        scanend: "scan",
        uploadgeturl: "pre",
        uploadgeturlend: "pre",
        uploadgeturlfail: "err",
        uploadsecurityfail: "err",
        cancel: "err",
        uploadprogress: "progress",
        uploadfail: "err",
        uploadcomplete: "complete",
        pause: "pause",
        filenotexsit: "err",
        "continue": "continue",
        remove: ""
    };
    var o = {
        upload: "upload",
        download: "download",
        continueupload: "upload"
    };
    var l = [ "安全", "扫描到病毒，已取消上传", "扫描到未知风险", "扫描到安全风险", "扫描到安全风险", "扫描到安全风险", "文件包含敏感词" ];
    var s = {
        "download-downloadgeturlfail": "下载失败,请稍候再试",
        "download-cancel": "",
        "download-downloadfail": "下载失败",
        "upload-scanfail": "扫描失败,请稍候再试",
        "upload-uploadgeturlfail": "上传失败",
        "upload-uploadsecurityfail": "上传安全扫描失败",
        "upload-cancel": "空间不足,已取消上传",
        "upload-uploadfail": "上传失败,请稍候再试",
        folderLimit: "文件夹个数以达上限"
    };
    var d = 300;
    e.exports = {
        errorCfg: s,
        errorCfgPrefix: o,
        securityattriMap: l,
        styleMap: r,
        wordingMap: n,
        typeMap: i,
        refreshTime: d
    };
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = function(e) {
        if (e.BJ_REPORT) return e.BJ_REPORT;
        var a = [];
        var t = e.onerror;
        e.onerror = function(a, i, n, o, l) {
            var d = a;
            if (l && l.stack) {
                d = s(l);
            }
            if (r(d, "Event")) {
                d += d.type ? "--" + d.type + "--" + (d.target ? d.target.tagName + "--" + d.target.src : "") : "";
            }
            m.push({
                msg: d,
                target: i,
                rowNum: n,
                colNum: o
            });
            v();
            t && t.apply(e, arguments);
        };
        var n = {
            id: 0,
            uin: 0,
            url: "",
            combo: 1,
            ext: {},
            level: 4,
            ignore: [],
            random: 1,
            delay: 1e3,
            submit: null
        };
        var r = function h(e, a) {
            return Object.prototype.toString.call(e) === "[object " + (a || "Object") + "]";
        };
        var o = function g(e) {
            var a = typeof e === "undefined" ? "undefined" : i(e);
            return a === "object" && !!e;
        };
        var l = function w(e) {
            try {
                if (e.stack) {
                    var a = e.stack.match("http://[^\n]+");
                    a = a ? a[0] : "";
                    var t = a.match(":([0-9]+):([0-9]+)");
                    if (!t) {
                        t = [ 0, 0, 0 ];
                    }
                    var i = s(e);
                    return {
                        msg: i,
                        rowNum: t[1],
                        colNum: t[2],
                        target: a.replace(t[0], "")
                    };
                } else {
                    return e;
                }
            } catch (n) {
                return e;
            }
        };
        var s = function b(e) {
            var a = e.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 5).join("@").replace(/\?[^:]+/gi, "");
            var t = e.toString();
            if (a.indexOf(t) < 0) {
                a = t + "@" + a;
            }
            return a;
        };
        var d = function y(e, a) {
            var t = [];
            var i = [];
            var r = [];
            if (o(e)) {
                e.level = e.level || n.level;
                for (var l in e) {
                    var s = e[l] || "";
                    if (s) {
                        if (o(s)) {
                            try {
                                s = JSON.stringify(s);
                            } catch (d) {
                                s = "[BJ_REPORT detect value stringify error] " + d.toString();
                            }
                        }
                        r.push(l + ":" + s);
                        t.push(l + "=" + encodeURIComponent(s));
                        i.push(l + "[" + a + "]=" + encodeURIComponent(s));
                    }
                }
            }
            return [ i.join("&"), r.join(","), t.join("&") ];
        };
        var f = [];
        var c = function G(e) {
            if (n.submit) {
                n.submit(e);
            } else {
                var a = new Image();
                f.push(a);
                a.src = e;
            }
        };
        var u = [];
        var p = 0;
        var v = function x(e) {
            if (!n.report) return;
            while (a.length) {
                var t = false;
                var i = a.shift();
                var o = d(i, u.length);
                for (var l = 0, s = n.ignore.length; l < s; l++) {
                    var f = n.ignore[l];
                    if (r(f, "RegExp") && f.test(o[1]) || r(f, "Function") && f(i, o[1])) {
                        t = true;
                        break;
                    }
                }
                if (!t) {
                    if (n.combo) {
                        u.push(o[0]);
                    } else {
                        c(n.report + o[2] + "&_t=" + +new Date());
                    }
                    n.onReport && n.onReport(n.id, i);
                }
            }
            var v = u.length;
            if (v) {
                var m = function h() {
                    clearTimeout(p);
                    c(n.report + u.join("&") + "&count=" + v + "&_t=" + +new Date());
                    p = 0;
                    u = [];
                };
                if (e) {
                    m();
                } else if (!p) {
                    p = setTimeout(m, n.delay);
                }
            }
        };
        var m = {
            push: function k(e) {
                if (Math.random() >= n.random) {
                    return m;
                }
                a.push(o(e) ? l(e) : {
                    msg: e
                });
                v();
                return m;
            },
            report: function F(e) {
                e && m.push(e);
                v(true);
                return m;
            },
            info: function T(e) {
                if (!e) {
                    return m;
                }
                if (o(e)) {
                    e.level = 2;
                } else {
                    e = {
                        msg: e,
                        level: 2
                    };
                }
                m.push(e);
                return m;
            },
            debug: function $(e) {
                if (!e) {
                    return m;
                }
                if (o(e)) {
                    e.level = 1;
                } else {
                    e = {
                        msg: e,
                        level: 1
                    };
                }
                m.push(e);
                return m;
            },
            init: function _(e) {
                if (o(e)) {
                    for (var a in e) {
                        n[a] = e[a];
                    }
                }
                var t = parseInt(n.id, 10);
                if (t) {
                    n.report = (n.url || "//badjs2.qq.com/badjs") + "?id=" + t + "&uin=" + parseInt(n.uin || (document.cookie.match(/\buin=\D+(\d+)/) || [])[1], 10) + "&from=" + encodeURIComponent(location.href) + "&ext=" + JSON.stringify(n.ext) + "&";
                }
                return m;
            },
            __onerror__: e.onerror
        };
        return m;
    }(window);
    a.createReport = function(e) {
        e = e || {};
        var a = e.id;
        if (!a) throw new Error("id is required");
        n.init({
            id: a
        });
        return n;
    };
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: true
    });
    a.edit = f;
    var i = t(77);
    var n = t(92);
    var r = t(64);
    var o = t(25);
    var l = t(75);
    var s = $(G.handler);
    var d = 5495;
    G.editFileList = {};
    function f(e) {
        if (e) {
            if (G.version >= d && e.admin) {
                console.debug(" input and edit file:", e);
                var a = e.localpath;
                if (typeof a === "string" && a.indexOf("OSRoot") < 0) {
                    a = "OSRoot:\\" + a;
                }
                var t = window.external.isFileExist(a);
                if (t == "false" || t === false) {
                    r.alert(2, "提示", "此文件不存在，可能已被删除或被移动到其他位置");
                    l.changeOpenFolder2Download(e);
                    return false;
                }
                var i = {
                    filepath: e.filepath,
                    name: e.fnameEsc,
                    fp: e.fp,
                    md5: e.md5,
                    localpath: a
                };
                var n = r.onlineEditFile(e.parentId, JSON.stringify(i));
                console.debug("start online edit", n, " param is ", i);
                if (n == "success") {
                    G.editFileList[e.filepath] = 1;
                    return true;
                } else if (n === "file cannot open") {
                    var o = r.confirm(2, "提示", "此文件无法识别并打开，是否在文件夹中查看该文件？");
                    if (o.errorCode === 0 && o.ret) {
                        l.openByPath(e);
                    } else {
                        return false;
                    }
                }
            } else {
                l.openByPath(e);
            }
        }
    }
}, function(e, a, t) {
    "use strict";
    function i(e) {
        return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : typeof e;
    }
    var n = t(91);
    var r = {
        newtask: t(198),
        taskcomplete: t(199),
        taskpause: t(200),
        taskresume: t(201),
        taskprogress: t(202),
        taskabort: t(203)
    };
    function o(e) {
        if ((typeof e === "undefined" ? "undefined" : i(e)) !== "object") {
            console.error("onFiletransporterEvent param parse error");
            return;
        }
        var a = e.event;
        var t = e.task;
        var o = {
            newtask: "newtask",
            taskcomplete: "taskcomplete",
            taskpause: "taskpause",
            taskresume: "taskresume",
            startprogress: "taskprogress",
            taskabort: "taskabort"
        };
        if (typeof o[a] !== "undefined" && typeof r[o[a]] !== "undefined") {
            t = n.get(t);
            r[o[a]](t);
            $(G.handler).trigger("task.startRefresh");
        }
    }
    e.exports = {
        fileEvent: o
    };
}, function(e, a, t) {
    "use strict";
    var i = t(95);
    function n(e) {
        i.showUpload(e);
    }
    function r(e) {
        var a = e.fileList;
        var t = [];
        for (var n = 0, r = a.length; n < r; n++) {
            var o = a[n];
            t.push(o.filepath);
        }
        i.batchuploadInFolder(G.nowFolder, t);
    }
    e.exports = {
        uploadEvent: n,
        dropEvent: r
    };
}, function(e, a, t) {
    e.exports = function(e) {
        if (!e.webpackPolyfill) {
            e.deprecate = function() {};
            e.paths = [];
            e.children = [];
            e.webpackPolyfill = 1;
        }
        return e;
    };
}, function(e, a, t) {
    var i = t(204);
    e.exports = function n(e) {
        var a = [];
        var t = {};
        var n;
        var r = e || {};
        (function(e, t, r, o, l, s, d, f) {
            a.push('<!-- 移动文件/上传文件 公用模态框--><div id="folderTreePanel" role="panel" class="panel-overlay folder-tree-panel"><div class="panel"><div class="panel-title"><i class="icons-qq"></i><span>' + i.escape((n = f) == null ? "" : n) + '</span><div data-action="panel.close" data-dismiss="panel" aria-label="取消" class="close"></div></div><div class="panel-body"><div class="panel-content"><div class="selected-files"><span class="file-name">' + (null == (n = s) ? "" : n) + "</span>");
            if (l > 1) {
                a.push('						等 <span class="file-number">' + (null == (n = l) ? "" : n) + "</span> 个文件");
            }
            a.push('</div><div class="translateTo"><span class="translateTo-label">' + i.escape((n = t) == null ? "" : n) + '</span><span class="little-folder-icon"></span><div data-role="dest" class="selected-folder-name">' + (null == (n = o) ? "" : n) + '</div></div><div class="folder-tree-box"></div></div></div><div class="panel-footer">');
            if (r = e.info.isAdmin) {
                a.push('<input type="submit" value="新建文件夹" data-action="folderTree.new" class="btn-create btn-common"/>');
            }
            a.push('<input type="submit" value="取消" data-action="panel.close" data-dismiss="panel" tabindex="3" class="btn-no btn-common btn-right"/><input type="submit" value="确定"' + i.attr("data-action", "" + d + "", true, false) + ' tabindex="3" class="btn-ok btn-common btn-right"/></div></div></div>');
        }).call(this, "G" in r ? r.G : typeof G !== "undefined" ? G : undefined, "action" in r ? r.action : typeof action !== "undefined" ? action : undefined, "canCreatFolder" in r ? r.canCreatFolder : typeof canCreatFolder !== "undefined" ? canCreatFolder : undefined, "destFolder" in r ? r.destFolder : typeof destFolder !== "undefined" ? destFolder : undefined, "fileNum" in r ? r.fileNum : typeof fileNum !== "undefined" ? fileNum : undefined, "firstFileName" in r ? r.firstFileName : typeof firstFileName !== "undefined" ? firstFileName : undefined, "okAction" in r ? r.okAction : typeof okAction !== "undefined" ? okAction : undefined, "title" in r ? r.title : typeof title !== "undefined" ? title : undefined);
        return a.join("");
    };
}, function(e, a, t) {
    var i = t(204);
    e.exports = function n(e) {
        var a = [];
        var t = {};
        var i;
        var n = e || {};
        (function(e) {
            a.push('<!--文件夹模板--><div class="whole-row"></div><div class="folder-info"><span class="little-folder-icon"></span><span class="folder-name">' + (null == (i = e.fname) ? "" : i) + "</span></div>");
        }).call(this, "item" in n ? n.item : typeof item !== "undefined" ? item : undefined);
        return a.join("");
    };
}, , , , , , , , , , , function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '  <div class="panel-con jubao-panel" id="jubaoDom">\r\n    <iframe class="frame-jubao" id="jubaoIframe" frameborder="0" scrolling="no"></iframe>\r\n  </div>', f = "D:\\qun\\clt_filetab\\src\\tpl\\jubao.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('  <div class="panel-con jubao-panel" id="jubaoDom">\r\n    <iframe class="frame-jubao" id="jubaoIframe" frameborder="0" scrolling="no"></iframe>\r\n  </div>');
            s = 3;
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '		<li class="item with-icon-item disable" id="filePreview" data-action="file.menupreview" aria-label="预览"><span class="icons-preview"></span><span class="menu-item-label">预览</span></li>\n		<%if(!G.mac){%>\n			<li class="item" id="fileFoward" data-action="file.forward" aria-label="转发">转发</li>\n			<li class="item" id="fileFowardTo" data-action="file.forwardMobile" aria-label="转发到手机" tabindex="1">转发到手机</li>\n		<%}%>\n		<li class="item save-as open-folder with-icon-item" id="fileOpenFolder" data-action="file.openFolderInBox" aria-label="在文件夹中显示" tabindex="1"><span class="icons-menu-save-as"></span><span class="menu-item-label">在文件夹中显示</span></li>\n		<li class="gap" tabindex="1"></li>\n		<li class="item rename" id="renameFile" data-action="file.showRename" aria-label="重命名" tabindex="1">重命名</li>\n		<li class="item forever disable" id="foreverFile" data-action="file.permanent" aria-label="转存为永久文件" tabindex="-1">转存为永久文件</li>\n		<%if(G.info.isAdmin){%>\n		<li class="item " id="fileMove" data-action="file.showMove" aria-label="移动" tabindex="-1">移动</li>\n		<%}%>\n		<li class="item jubao" id="fileJubao" data-action="file.jubao" aria-label="举报" tabindex="1">举报</li>\n		<li class="gap" tabindex="1"></li>\n		<li class="item delete with-icon-item" data-action="file.delete" id="fileDelete" aria-label="删除" tabindex="1"><span class="icons-trash"></span><span class="menu-item-label">删除</span></li>\n', f = "D:\\qun\\clt_filetab\\src\\tpl\\fileMenu.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('		<li class="item with-icon-item disable" id="filePreview" data-action="file.menupreview" aria-label="预览"><span class="icons-preview"></span><span class="menu-item-label">预览</span></li>\n		');
            s = 2;
            if (!G.mac) {
                u('\n			<li class="item" id="fileFoward" data-action="file.forward" aria-label="转发">转发</li>\n			<li class="item" id="fileFowardTo" data-action="file.forwardMobile" aria-label="转发到手机" tabindex="1">转发到手机</li>\n		');
                s = 5;
            }
            u('\n		<li class="item save-as open-folder with-icon-item" id="fileOpenFolder" data-action="file.openFolderInBox" aria-label="在文件夹中显示" tabindex="1"><span class="icons-menu-save-as"></span><span class="menu-item-label">在文件夹中显示</span></li>\n		<li class="gap" tabindex="1"></li>\n		<li class="item rename" id="renameFile" data-action="file.showRename" aria-label="重命名" tabindex="1">重命名</li>\n		<li class="item forever disable" id="foreverFile" data-action="file.permanent" aria-label="转存为永久文件" tabindex="-1">转存为永久文件</li>\n		');
            s = 10;
            if (G.info.isAdmin) {
                u('\n		<li class="item " id="fileMove" data-action="file.showMove" aria-label="移动" tabindex="-1">移动</li>\n		');
                s = 12;
            }
            u('\n		<li class="item jubao" id="fileJubao" data-action="file.jubao" aria-label="举报" tabindex="1">举报</li>\n		<li class="gap" tabindex="1"></li>\n		<li class="item delete with-icon-item" data-action="file.delete" id="fileDelete" aria-label="删除" tabindex="1"><span class="icons-trash"></span><span class="menu-item-label">删除</span></li>\n');
            s = 16;
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function v(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '		<li class="download-item with-icon-item download-folder" id="folderDownloadLink" data-action="folder.download"><span class="icons-download"></span><span class="menu-item-label">下载</span></li>\n		<li class="with-icon-item open-in-folder disable" id="showInFolderLink" data-action="folder.openfolder"><span class="icons-menu-save-as"></span><span class="menu-item-label">在文件夹中显示</span></li>\n		<%if(locals.isAdmin){%>\n		<li class="rename-item" id="folderRenameLink" data-action="folder.showRenameFolder">重命名</li>\n		<%}%>\n		<li class="property-item" id="folderPropLink" data-action="folder.property">文件夹属性</li>\n		<li class="gap"></li>\n		<%if(locals.isAdmin){%>\n		<li class="delete-item with-icon-item" id="folderDeleteLink" data-action="folder.showDeleteFolder"><span class="icons-trash"></span><span class="menu-item-label">删除</span></li>\n		<%}else{%>\n		<li class="item jubao" data-action="file.jubao" id="folderJubaoLink" aria-label="举报" tabindex="1">举报</li>\n		<%}%>\n', f = "D:\\qun\\clt_filetab\\src\\tpl\\folderMenu.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u('		<li class="download-item with-icon-item download-folder" id="folderDownloadLink" data-action="folder.download"><span class="icons-download"></span><span class="menu-item-label">下载</span></li>\n		<li class="with-icon-item open-in-folder disable" id="showInFolderLink" data-action="folder.openfolder"><span class="icons-menu-save-as"></span><span class="menu-item-label">在文件夹中显示</span></li>\n		');
            s = 3;
            if (e.isAdmin) {
                u('\n		<li class="rename-item" id="folderRenameLink" data-action="folder.showRenameFolder">重命名</li>\n		');
                s = 5;
            }
            u('\n		<li class="property-item" id="folderPropLink" data-action="folder.property">文件夹属性</li>\n		<li class="gap"></li>\n		');
            s = 8;
            if (e.isAdmin) {
                u('\n		<li class="delete-item with-icon-item" id="folderDeleteLink" data-action="folder.showDeleteFolder"><span class="icons-trash"></span><span class="menu-item-label">删除</span></li>\n		');
                s = 10;
            } else {
                u('\n		<li class="item jubao" data-action="file.jubao" id="folderJubaoLink" aria-label="举报" tabindex="1">举报</li>\n		');
                s = 12;
            }
            u("\n");
            s = 13;
            return c.join("");
        } catch (p) {
            n(p, d, f, s);
        }
    };
}, , , , , , , function(e, a, t) {
    var i = t(204);
    e.exports = function n(e) {
        var a = [];
        var t = {};
        var n;
        var r = e || {};
        (function(e, t, r) {
            a.push('<!--文件夹树模板--><ul data-action="file_active" role="tree" class="primary-folder-list"><li' + i.attr("data-id", "" + t.id + "", true, false) + ' data-action="folderTree.select" class="folder-list-item"><div class="whole-row"> </div><div class="folder-info"><span class="little-folder-icon"></span><span class="folder-name">' + (null == (n = t.fname) ? "" : n) + '</span><a href="javascript:void(0)"' + i.attr("data-id", "" + t.id + "", true, false) + ' data-action="folderTree.select" role="treeitem" tabindex="3"' + i.attr("aria-label", "选择文件夹:" + t.fname + "", true, false) + ' class="aria-hide"></a></div><ul class="secondary-folder-list">');
            (function() {
                var t = e;
                if ("number" == typeof t.length) {
                    for (var r = 0, o = t.length; r < o; r++) {
                        var l = t[r];
                        a.push("<li" + i.attr("data-id", "" + (l && l.id) + "", true, false) + ' data-action="folderTree.select" class="folder-list-item"><div class="whole-row"></div><div class="folder-info"><div class="little-folder-icon"></div><div class="folder-name">' + (null == (n = l && l.fname) ? "" : n) + '</div><a href="javascript:void(0)"' + i.attr("data-id", "" + (l && l.id) + "", true, false) + ' data-action="folderTree.select" role="treeitem" tabindex="3"' + i.attr("aria-label", "选择文件夹:" + (l && l.fname) + "", true, false) + ' class="aria-hide"></a></div></li>');
                    }
                } else {
                    var o = 0;
                    for (var r in t) {
                        o++;
                        var l = t[r];
                        a.push("<li" + i.attr("data-id", "" + (l && l.id) + "", true, false) + ' data-action="folderTree.select" class="folder-list-item"><div class="whole-row"></div><div class="folder-info"><div class="little-folder-icon"></div><div class="folder-name">' + (null == (n = l && l.fname) ? "" : n) + '</div><a href="javascript:void(0)"' + i.attr("data-id", "" + (l && l.id) + "", true, false) + ' data-action="folderTree.select" role="treeitem" tabindex="3"' + i.attr("aria-label", "选择文件夹:" + (l && l.fname) + "", true, false) + ' class="aria-hide"></a></div></li>');
                    }
                }
            }).call(this);
            a.push("</ul></li></ul>");
        }).call(this, "items" in r ? r.items : typeof items !== "undefined" ? items : undefined, "topFolder" in r ? r.topFolder : typeof topFolder !== "undefined" ? topFolder : undefined, "undefined" in r ? r.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return a.join("");
    };
}, function(e, a, t) {
    var i = t(204);
    e.exports = function n(e) {
        var a = [];
        var t = {};
        var i;
        a.push('<li data-id="new" data-action="folderTree.select" class="folder-list-item"><div class="whole-row"></div><div class="folder-info"><span class="little-folder-icon"></span><input id="inputFolderNameInFolderTree" value="新建文件夹" data-blur="createInputBlur" data-keyup="folderTree.create" autofocus="true" class="folder-name"/><div class="bubble"><span class="bot"></span><span class="top"></span>文件夹名称中含有违禁词</div></div></li>');
        return a.join("");
    };
}, function(e, a, t) {
    "use strict";
    var i = t(86);
    var n = 299;
    var r = $("#box");
    var o = $(G.handler);
    var l = false;
    var s = false;
    function d() {
        report("clkTask");
        if (l) {
            c();
        } else {
            f();
            i.removePoint();
        }
    }
    function f() {
        report("showTask");
        if (!s) {
            i.firstRender();
        }
        s = true;
        l = true;
        r.addClass("open");
        $("#boxTitle a").focus();
    }
    function c() {
        l = false;
        r.removeClass("open");
        if (G.activeElement) {
            G.activeElement.focus();
        }
    }
    o.bind("box.hide", c);
    e.exports = {
        toggle: d
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(77);
    function r(e) {
        var a = $(this.parentNode.parentNode);
        var t = a.data("path");
        var r = n.getTask(t);
        t = r.filepath;
        var o = r.remoteType;
        var l = r.localpath;
        var s = r.fnameEsc || r.fname;
        console.log("调用续传接口:", r, t);
        var d = i.addContinueUploadTask(t, l, s, o);
        $("#boxTitle a").focus();
        console.log("continueUpload ret:", d);
    }
    e.exports = {
        continueUpload: r
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(86);
    var r = t(77);
    var o = t(15);
    function l() {
        var e = $(this.parentNode.parentNode);
        var a = e.data("path");
        var t = r.getFile(a);
        r.clearComplete();
        n.clearComplete();
        i.clearClist();
        o.clearClist();
    }
    e.exports = {
        clear: l
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(77);
    function r() {
        var e = $(this.parentNode.parentNode);
        var a = e.data("path");
        var t = e.data("id");
        var r = n.getTask(t, a);
        var o = i.pauseTask(t);
        $("#boxTitle a").focus();
        report("clkTaskPause", typeof r.downloadtasktype === "undefined" ? 0 : 1);
    }
    e.exports = {
        pause: r
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(18);
    var r = t(92);
    var o = t(77);
    var l = t(86);
    var s = t(25);
    var d = $(G.handler);
    var f = function p(e) {
        var a = e.type;
        var t = true;
        var n = e.filepath;
        report("clkTaskDelete");
        $("#boxTitle a").focus();
        if (e.id) {
            var l = i.removeTask(e.id);
            t = true;
        }
        if (t) {
            if (e.id) {
                o.remove(e.id);
            }
            if (e.type !== "download") {
                o.remove(e.filepath);
            }
            e.status = "remove";
            d.trigger("client.updateTask", e);
            if (a && a.indexOf("upload") >= 0) {
                if (n) {
                    var f = {
                        app_id: G.appid,
                        bus_id: e.busid,
                        file_id: e.fp,
                        parent_folder_id: G.nowFolder
                    };
                    r.deleteFile(f).done(function(a) {
                        console.log(a);
                        o.remove(e);
                    }).fail(function(e) {
                        if (e.fc && e.fc === 1) {
                            return;
                        }
                    });
                }
            } else if (a === "download") {
                i.removeTask(e.id);
                i.removeCompleteTask(e.id);
            }
            i.clearClist();
            var c = o.getData(n);
            if (c) {
                c.isDowning = false;
            }
            s.updateRow(c);
        }
    };
    function c() {
        var e = $(this.parentNode.parentNode);
        var a = e.data("id");
        var t = e.data("path");
        var i = o.getTask(a);
        if (!i) {
            i = o.getTask(t);
        }
        f(i);
    }
    function u(e, a) {
        var t = o.getTask(e);
        if (!t) {
            t = o.getTask(a);
        }
        f(t);
    }
    G.removeTaskInDownLoad = u;
    d.bind("task.removeOne", function(e, a) {
        var t = i.removeTask(a);
        console.log(t, a);
    });
    e.exports = {
        remove: c,
        removeByDownLoad: u
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(77);
    function r() {
        var e = $(this.parentNode.parentNode);
        var a = e.data("path");
        var t = n.getTask(a);
        var r = t.id;
        var o = i.resumeTask(r);
        report("clkTaskPause");
        $("#boxTitle a").focus();
    }
    e.exports = {
        resume: r
    };
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = t(158).refreshTime;
    var r = t(91);
    var o = $(G.handler);
    var l = 0;
    function s() {
        if (!l) {
            return;
        }
        clearTimeout(l);
        l = 0;
    }
    function d() {
        if (l) {
            return;
        }
        f();
    }
    function f() {
        var e = i.getTaskListAdv();
        var a = false;
        if (e.empty && e.status === "ok") {
            s();
        } else {
            var t = /progress|ready|scan|geturl/gi;
            var d = r.cleanMap(e.map);
            for (var c = 0, u = d.length; c < u; c++) {
                var p = d[c];
                o.trigger("client.updateTask", p);
                if (t.test(p.status)) {
                    a = true;
                }
            }
        }
        if (a) {
            l = setTimeout(f, n);
        } else {
            console.log("do stop refresh!");
            s();
        }
    }
    $(G.handler).bind("task.startRefresh", d);
    $(G.handler).bind("task.stopRefresh", s);
}, function(e, a, t) {
    "use strict";
    function i() {
        if (this.classList.contains("open")) {
            this.classList.remove("open");
        } else {
            report("clkTaskExp");
            this.classList.add("open");
        }
    }
    e.exports = {
        toggle: i
    };
}, function(e, a, t) {
    "use strict";
    var i = t(92), n = t(64), r = t(77), o = {};
    e.exports = o;
    o.closeTips = function() {};
    o.refeshVip = function() {
        i.checkVip().done(function(e) {
            console.log(e);
        }).fail(function(e) {});
    };
    o.conVip = function() {
        window.open("http://pay.qq.com/ipay/index.shtml?c=cjclub&aid=vip.gongneng.client.qunwenjian_openvip&ADTAG=CLIENT.QQ.GroupFile_OpenSVIP");
    };
    o.vipTipsOk = function() {
        window.open("http://pay.qq.com/ipay/index.shtml?c=cjclub&aid=vip.gongneng.client.qunwenjian_openvip&ADTAG=CLIENT.QQ.GroupFile_OpenSVIP");
    };
    o.vipTipsCancel = function() {};
    o.openVip = function() {};
}, function(e, a, t) {
    "use strict";
    var i = t(92), n = t(77), r = {};
    e.exports = r;
    r.createFolder = function(e, a) {
        i.createFolder(e).done(function(e) {
            a(e);
        }).fail(function(e) {});
    };
    r.renameFolder = function(e, a) {};
    r.deleteFolder = function(e, a) {};
}, function(e, a, t) {
    e.exports = function i(e, a, t, n) {
        n = n || function h(e, a, t, i) {
            var n = a.split("\n"), r = Math.max(i - 3, 0), o = Math.min(n.length, i + 3);
            var l = n.slice(r, o).map(function(e, a) {
                var t = a + r + 1;
                return (t == i ? " >> " : "    ") + t + "| " + e;
            }).join("\n");
            e.path = t;
            e.message = (t || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message;
            throw e;
        };
        a = a || function(e) {
            return e == undefined ? "" : String(e).replace(o, l);
        };
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        }, o = /[&<>'"]/g;
        function l(e) {
            return r[e] || e;
        }
        var s = 1, d = '<ul>\r\n<%\r\n	//todo 文件打开需要加个接口.\r\n	var data = locals.data,\r\n		list = locals.list;\r\n	if(!data && !list){\r\n%>\r\n	<li data-action="file.upload">上传</li>\r\n	<%if(G.canCreateFolder && G.nowFolder === \'/\'){%>\r\n	<li data-action="folder.create" title="新建文件夹">新建文件夹</li>\r\n	<%}%>\r\n	<li data-action="menu.refresh" onclick="window.location.reload();">刷新</li>\r\n<%}else if(data){%>\r\n	<%if(typeof data.othergroup !== \'undefined\'){%>\r\n		<li data-action="openGroupFile" data-uin="<%-data.gc%>">打开所在群</li>\r\n	<%}else{%>\r\n		<%if(data.orcType === 1){%>\r\n			<%if(data.icon !== \'pic\'){%>\r\n				<li <%if(data.safeType){%>class="disabled"<%}else{%>data-action="file.downloadByMenu"<%}%> aria-label="打开" data-path="<%=data.filepath%>">打开</li>\r\n			<%}else{%>\r\n				<li <%if(data.safeType){%>class="disabled"<%}else{%>data-action="file.menupreview"<%}%> aria-label="预览">预览</li>\r\n			<%}%>\r\n			\r\n			<li <%if(data.safeType){%>class="disabled"<%}else{%>data-action="file.saveAs"<%}%> title="另存为" tabindex="3" aria-label="下载文件">另存为</li>\r\n			<li <%if(data.safeType || !data.isDown){%>class="disabled"<%}else{%>data-action="file.openFolderInBox"<%}%> title="在文件夹中显示" tabindex="3" aria-label="在文件夹中显示">在文件夹中显示</li>\r\n			<%if(!G.mac){%>\r\n			  <li <%if(data.safeType){%>class="disabled"<%}else{%>data-action="file.forward"<%}%> aria-label="转发">转发</li>\r\n			  <li class="line <%if(data.safeType){%>disabled<%}%>" <%if(!data.safeType){%>data-action="file.forwardMobile"<%}%> aria-label="转发到手机">发送到手机</li>\r\n			<%}%>\r\n			<%if(G.info.isAdmin && typeof data.issearch === \'undefined\'){%>\r\n				<li <%if(data.safeType){%>class="disabled"<%}else{%>data-action="file.showMove"<%}%> aria-label="移动">移动到</li>\r\n			<%}%>\r\n			<%if(G.info.isAdmin && data.temp){%>\r\n				<li <%if(data.safeType){%>class="disabled"<%}else{%>data-action="file.permanent"<%}%> aria-label="转存为永久文件" tabindex="-1">转存为永久文件</li>\r\n			<%}%>\r\n			<li <%if(data.safeType || (!G.info.isAdmin && G.info.uin !== data.uin)){%>class="disabled"<%}else{%>data-action="file.showRename"<%}%> aria-label="重命名" >重命名</li>\r\n			<li <%if(!G.info.isAdmin && G.info.uin !== data.uin){%>class="disabled"<%}else{%>data-action="file.delete"<%}%> id="fileDelete" aria-label="删除">删除</li>	\r\n			<li data-action="file.jubao" aria-label="举报">举报</li>\r\n		<%}else if(data.orcType === 2){%>\r\n			<li class="line" data-action="folder.open" data-path="<%=data.id%>">打开</li>\r\n			<li <%if(!G.info.isAdmin){%>class="disabled"<%}else{%>data-action="folder.showRenameFolder"<%}%>>重命名</li>\r\n			<li class="line" data-action="folder.property">文件夹属性</li>\r\n			<li <%if(!G.info.isAdmin){%>class="disabled"<%}else{%>data-action="folder.showDeleteFolder"<%}%>>删除</li>\r\n		<%}%>\r\n	<%}%>\r\n<%}else if(list){%>\r\n	<li class="line" data-action="file.batchSaveAs">另存为</li>\r\n	<li class="line" data-action="file.batchMove">移动到</li>\r\n	<li <%if(!G.info.isAdmin && G.info.uin !== data.uin){%>class="disabled"<%}else{%>data-action="file.batchDelete"<%}%>>删除</li>\r\n<%}%>\r\n</ul>', f = "D:\\qun\\clt_filetab\\src\\tpl\\customMenu.ejs";
        try {
            var c = [], u = c.push.bind(c);
            u("<ul>\r\n");
            s = 2;
            var p = e.data, v = e.list;
            if (!p && !v) {
                s = 7;
                u('\r\n	<li data-action="file.upload">上传</li>\r\n	');
                s = 9;
                if (G.canCreateFolder && G.nowFolder === "/") {
                    u('\r\n	<li data-action="folder.create" title="新建文件夹">新建文件夹</li>\r\n	');
                    s = 11;
                }
                u('\r\n	<li data-action="menu.refresh" onclick="window.location.reload();">刷新</li>\r\n');
                s = 13;
            } else if (p) {
                u("\r\n	");
                s = 14;
                if (typeof p.othergroup !== "undefined") {
                    u('\r\n		<li data-action="openGroupFile" data-uin="');
                    s = 15;
                    u(p.gc);
                    u('">打开所在群</li>\r\n	');
                    s = 16;
                } else {
                    u("\r\n		");
                    s = 17;
                    if (p.orcType === 1) {
                        u("\r\n			");
                        s = 18;
                        if (p.icon !== "pic") {
                            u("\r\n				<li ");
                            s = 19;
                            if (p.safeType) {
                                u('class="disabled"');
                            } else {
                                u('data-action="file.downloadByMenu"');
                            }
                            u(' aria-label="打开" data-path="');
                            u(a(p.filepath));
                            u('">打开</li>\r\n			');
                            s = 20;
                        } else {
                            u("\r\n				<li ");
                            s = 21;
                            if (p.safeType) {
                                u('class="disabled"');
                            } else {
                                u('data-action="file.menupreview"');
                            }
                            u(' aria-label="预览">预览</li>\r\n			');
                            s = 22;
                        }
                        u("\r\n			\r\n			<li ");
                        s = 24;
                        if (p.safeType) {
                            u('class="disabled"');
                        } else {
                            u('data-action="file.saveAs"');
                        }
                        u(' title="另存为" tabindex="3" aria-label="下载文件">另存为</li>\r\n			<li ');
                        s = 25;
                        if (p.safeType || !p.isDown) {
                            u('class="disabled"');
                        } else {
                            u('data-action="file.openFolderInBox"');
                        }
                        u(' title="在文件夹中显示" tabindex="3" aria-label="在文件夹中显示">在文件夹中显示</li>\r\n			');
                        s = 26;
                        if (!G.mac) {
                            u("\r\n			  <li ");
                            s = 27;
                            if (p.safeType) {
                                u('class="disabled"');
                            } else {
                                u('data-action="file.forward"');
                            }
                            u(' aria-label="转发">转发</li>\r\n			  <li class="line ');
                            s = 28;
                            if (p.safeType) {
                                u("disabled");
                            }
                            u('" ');
                            if (!p.safeType) {
                                u('data-action="file.forwardMobile"');
                            }
                            u(' aria-label="转发到手机">发送到手机</li>\r\n			');
                            s = 29;
                        }
                        u("\r\n			");
                        s = 30;
                        if (G.info.isAdmin && typeof p.issearch === "undefined") {
                            u("\r\n				<li ");
                            s = 31;
                            if (p.safeType) {
                                u('class="disabled"');
                            } else {
                                u('data-action="file.showMove"');
                            }
                            u(' aria-label="移动">移动到</li>\r\n			');
                            s = 32;
                        }
                        u("\r\n			");
                        s = 33;
                        if (G.info.isAdmin && p.temp) {
                            u("\r\n				<li ");
                            s = 34;
                            if (p.safeType) {
                                u('class="disabled"');
                            } else {
                                u('data-action="file.permanent"');
                            }
                            u(' aria-label="转存为永久文件" tabindex="-1">转存为永久文件</li>\r\n			');
                            s = 35;
                        }
                        u("\r\n			<li ");
                        s = 36;
                        if (p.safeType || !G.info.isAdmin && G.info.uin !== p.uin) {
                            u('class="disabled"');
                        } else {
                            u('data-action="file.showRename"');
                        }
                        u(' aria-label="重命名" >重命名</li>\r\n			<li ');
                        s = 37;
                        if (!G.info.isAdmin && G.info.uin !== p.uin) {
                            u('class="disabled"');
                        } else {
                            u('data-action="file.delete"');
                        }
                        u(' id="fileDelete" aria-label="删除">删除</li>	\r\n			<li data-action="file.jubao" aria-label="举报">举报</li>\r\n		');
                        s = 39;
                    } else if (p.orcType === 2) {
                        u('\r\n			<li class="line" data-action="folder.open" data-path="');
                        s = 40;
                        u(a(p.id));
                        u('">打开</li>\r\n			<li ');
                        s = 41;
                        if (!G.info.isAdmin) {
                            u('class="disabled"');
                        } else {
                            u('data-action="folder.showRenameFolder"');
                        }
                        u('>重命名</li>\r\n			<li class="line" data-action="folder.property">文件夹属性</li>\r\n			<li ');
                        s = 43;
                        if (!G.info.isAdmin) {
                            u('class="disabled"');
                        } else {
                            u('data-action="folder.showDeleteFolder"');
                        }
                        u(">删除</li>\r\n		");
                        s = 44;
                    }
                    u("\r\n	");
                    s = 45;
                }
                u("\r\n");
                s = 46;
            } else if (v) {
                u('\r\n	<li class="line" data-action="file.batchSaveAs">另存为</li>\r\n	<li class="line" data-action="file.batchMove">移动到</li>\r\n	<li ');
                s = 49;
                if (!G.info.isAdmin && G.info.uin !== p.uin) {
                    u('class="disabled"');
                } else {
                    u('data-action="file.batchDelete"');
                }
                u(">删除</li>\r\n");
                s = 50;
            }
            u("\r\n</ul>");
            s = 51;
            return c.join("");
        } catch (m) {
            n(m, d, f, s);
        }
    };
}, function(e, a, t) {
    "use strict";
    var i = {
        upload: 2186487,
        continueupload: 2186489,
        download: 2186490
    };
    var n = t(91);
    var r = t(25);
    function o(e) {
        console.debug("------新任务" + e.type + "---------", e);
        e.taskStarttime = parseInt(new Date().getTime() / 1e3, 10);
        if (!(e.type === "download" && e.downloadtasktype === 2)) {
            if (e.onlineedit === 1) {
                console.debug("start edit file");
                r.fileInEditRow(e);
            } else {}
            $(G.handler).trigger("client.addTask", e);
        } else {
            var a = e.foldertaskid;
            var t = n.getOneTask(a);
            if (t) {
                if (!t.fileTaskList) {
                    t.fileTaskList = [];
                }
                t.fileTaskList.push(e.id);
            }
        }
        QReport.monitor(i[e.type]);
    }
    e.exports = o;
}, function(e, a, t) {
    "use strict";
    var i = t(160);
    var n = r(i);
    function r(e) {
        if (e && e.__esModule) {
            return e;
        } else {
            var a = {};
            if (e != null) {
                for (var t in e) {
                    if (Object.prototype.hasOwnProperty.call(e, t)) a[t] = e[t];
                }
            }
            a.default = e;
            return a;
        }
    }
    var o = t(77);
    var l = t(25);
    var s = t(15);
    var d = $(G.handler);
    var f = t(139);
    var c = t(140);
    var u = t(75);
    var p = 5485;
    function v(e) {
        var a = o.task2file(e);
        if (!G.file) {
            G.file = {};
        }
        if (G.file && typeof G.file.cu === "undefined") {
            G.file.cu = 0;
        }
        if (e.status === "downloadcomplete") {
            if (e.downloadtasktype !== 2) {
                l.updateRow(a);
                if (!G.saveasList[a.filepath]) {
                    if (G.version < p) {
                        u.openByPath(a);
                    } else {
                        n.edit(a);
                    }
                } else {
                    delete G.saveasList[a.filepath];
                }
            }
            if (a.parentId && a.parentId !== "/") {
                var t = o.getData(a.parentId);
                if (t) {
                    t.downNum++;
                    if (t.downNum === t.filenum) {
                        t.isDown = true;
                        t.succ = true;
                        l.updateRow(t);
                    }
                }
            }
        } else {
            G.file.cu += a.size;
            G.file.capacityused = c.getSize(G.file.cu);
            l.renderSpace();
            if (a.folderpath === G.nowFolder || !a.folderpath) {
                if (e.onlineedit === 1) {
                    var i = o.getData(a.oldfilepath);
                    console.debug("upload complete and update old file:", e, a, i);
                    a.md5 = a.newMd5;
                    a.localpath = i.localpath;
                    l.updateEditFileRow(a);
                } else {
                    l.appendFile(a);
                }
            } else {
                var t = o.getData(e.folderpath);
                t.filenum++;
                var r = parseInt(new Date().getTime() / 1e3, 10);
                t.mt = r;
                t.mtStr = f.dayStr(r);
                t.toFirst = true;
                l.updateRow(t);
            }
            o.updateAllNum({
                files: [ a ],
                action: "add"
            });
        }
        s.set(a);
        console.log("task complate and set local");
        report("showTaskShow");
        d.trigger("client.updateTask", e);
    }
    e.exports = v;
}, function(e, a, t) {
    "use strict";
    var i = $(G.handler);
    function n(e) {
        i.trigger("client.updateTask", e);
    }
    e.exports = n;
}, function(e, a, t) {
    "use strict";
    var i = $(G.handler);
    function n(e) {
        i.trigger("client.updateTask", e);
    }
    e.exports = n;
}, function(e, a, t) {
    "use strict";
    var i = $(G.handler);
    function n(e) {
        e.createtime = parseInt(new Date().getTime() / 1e3, 10);
        if (e.status === "uploadprogress") {
            setTimeout(function() {
                $(G.handler).trigger("box.show", e);
            }, 20);
        }
        if (e.remotetype === 1) {}
        if (e.type === "download") {}
        i.trigger("client.updateTask", e);
    }
    e.exports = n;
}, function(e, a, t) {
    "use strict";
    var i = t(64);
    var n = $(G.handler);
    var r = {
        upload: {
            cancel: 2186633,
            remove: 2186634,
            scanfail: 2186635,
            uploadsecurityfail: 2186636,
            uploadgeturlfail: 2186637,
            uploadfail: 2186491,
            _default: 2186638
        },
        continueupload: {
            cancel: 2186639,
            remove: 2186640,
            scanfail: 2186641,
            uploadsecurityfail: 2186642,
            uploadgeturlfail: 2186643,
            uploadfail: 2186491,
            _default: 2186644
        },
        download: {
            cancel: 2186645,
            remove: 2186646,
            downloadgeturlfail: 2186647,
            downloadfail: 386331,
            _default: 2186648
        }
    };
    function o(e) {
        var a = e.filepath;
        var t = e.localpath;
        var n = e.filename_esc || e.filename;
        var r = e.remotetype;
        i.addContinueUploadTask(a, t, n, r);
    }
    function l(e) {
        n.trigger("client.updateTask", e);
        if (e.onlineedit === 1) {}
        var a = r[e.type];
        var t = a[e.status];
        if (t) {
            QReport.monitor(t);
        }
        if (e.errorcode || e.securityattri) {
            var i = e.errorcode;
            if (i === 32221991) {
                o(e);
                return;
            } else if (i === 12029) {}
        }
    }
    e.exports = l;
}, function(e, a, t) {
    "use strict";
    a.merge = function r(e, a) {
        if (arguments.length === 1) {
            var t = e[0];
            for (var n = 1; n < e.length; n++) {
                t = r(t, e[n]);
            }
            return t;
        }
        var o = e["class"];
        var l = a["class"];
        if (o || l) {
            o = o || [];
            l = l || [];
            if (!Array.isArray(o)) o = [ o ];
            if (!Array.isArray(l)) l = [ l ];
            e["class"] = o.concat(l).filter(i);
        }
        for (var s in a) {
            if (s != "class") {
                e[s] = a[s];
            }
        }
        return e;
    };
    function i(e) {
        return e != null && e !== "";
    }
    a.joinClasses = n;
    function n(e) {
        return (Array.isArray(e) ? e.map(n) : e && typeof e === "object" ? Object.keys(e).filter(function(a) {
            return e[a];
        }) : [ e ]).filter(i).join(" ");
    }
    a.cls = function o(e, t) {
        var i = [];
        for (var r = 0; r < e.length; r++) {
            if (t && t[r]) {
                i.push(a.escape(n([ e[r] ])));
            } else {
                i.push(n(e[r]));
            }
        }
        var o = n(i);
        if (o.length) {
            return ' class="' + o + '"';
        } else {
            return "";
        }
    };
    a.style = function(e) {
        if (e && typeof e === "object") {
            return Object.keys(e).map(function(a) {
                return a + ":" + e[a];
            }).join(";");
        } else {
            return e;
        }
    };
    a.attr = function l(e, t, i, n) {
        if (e === "style") {
            t = a.style(t);
        }
        if ("boolean" == typeof t || null == t) {
            if (t) {
                return " " + (n ? e : e + '="' + e + '"');
            } else {
                return "";
            }
        } else if (0 == e.indexOf("data") && "string" != typeof t) {
            if (JSON.stringify(t).indexOf("&") !== -1) {
                console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes " + "will be escaped to `&amp;`");
            }
            if (t && typeof t.toISOString === "function") {
                console.warn("Jade will eliminate the double quotes around dates in " + "ISO form after 2.0.0");
            }
            return " " + e + "='" + JSON.stringify(t).replace(/'/g, "&apos;") + "'";
        } else if (i) {
            if (t && typeof t.toISOString === "function") {
                console.warn("Jade will stringify dates in ISO form after 2.0.0");
            }
            return " " + e + '="' + a.escape(t) + '"';
        } else {
            if (t && typeof t.toISOString === "function") {
                console.warn("Jade will stringify dates in ISO form after 2.0.0");
            }
            return " " + e + '="' + t + '"';
        }
    };
    a.attrs = function s(e, t) {
        var i = [];
        var r = Object.keys(e);
        if (r.length) {
            for (var o = 0; o < r.length; ++o) {
                var l = r[o], s = e[l];
                if ("class" == l) {
                    if (s = n(s)) {
                        i.push(" " + l + '="' + s + '"');
                    }
                } else {
                    i.push(a.attr(l, s, false, t));
                }
            }
        }
        return i.join("");
    };
    a.escape = function d(e) {
        var a = String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        if (a === "" + e) return e; else return a;
    };
    a.rethrow = function f(e, a, i, n) {
        if (!(e instanceof Error)) throw e;
        if ((typeof window != "undefined" || !a) && !n) {
            e.message += " on line " + i;
            throw e;
        }
        try {
            n = n || t(205).readFileSync(a, "utf8");
        } catch (r) {
            f(e, null, i);
        }
        var o = 3, l = n.split("\n"), s = Math.max(i - o, 0), d = Math.min(l.length, i + o);
        var o = l.slice(s, d).map(function(e, a) {
            var t = a + s + 1;
            return (t == i ? "  > " : "    ") + t + "| " + e;
        }).join("\n");
        e.path = a;
        e.message = (a || "Jade") + ":" + i + "\n" + o + "\n\n" + e.message;
        throw e;
    };
}, function(e, a, t) {} ]);