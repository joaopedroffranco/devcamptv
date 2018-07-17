/* eslint-disable */
"use strict";

function EventDispatcher() {
    this.dict = {}
}
var XD = function(e) {
        var t, a, i, s = 1,
            n = e;
        return {
            postMessage: function(e, t, a) {
                t && (a = a || parent, n.postMessage ? a.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : t && (a.location = t.replace(/#.*$/, "") + "#" + +new Date + s++ + "&" + e))
            },
            receiveMessage: function(e, s) {
                n.postMessage ? (e && (i = function(t) {
                    if ("string" == typeof s && s.indexOf(t.origin) < 0 || "[object Function]" === Object.prototype.toString.call(s) && !1 === s(t.origin)) return !1;
                    e(t)
                }), n.addEventListener ? n[e ? "addEventListener" : "removeEventListener"]("message", i, !1) : n[e ? "attachEvent" : "detachEvent"]("onmessage", i)) : (t && clearInterval(t), t = null, e && (t = setInterval(function() {
                    var t = document.location.hash,
                        i = /^#?\d+&/;
                    t !== a && i.test(t) && (a = t, e({
                        data: t.replace(i, "")
                    }))
                }, 100)))
            }
        }
    }(window),
    SambaPlayerUtils = {
        URL_BASE: function() {
            var e = this.getAllElementsWithAttribute("samba.player.api.js", "script")[0].src;
            return e.substring(0, e.lastIndexOf("/")) + "/sambalabs/"
        },
        getAllElementsWithAttribute: function(e, t) {
            for (var a = [], i = document.querySelectorAll(t), s = 0; s < i.length; s++) i[s].src.indexOf(e) > -1 && a.push(i[s]);
            return a
        },
        createAndAppendScript: function(e, t, a) {
            var i = document.createElement("script");
            i.type = "text/javascript", i.src = this.URL_BASE() + e;
            for (var s in t) i[s] = t[s];
            if (a) {
                var n = !1;
                i.onload = i.onreadystatechange = function() {
                    n || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (n = !0, a())
                }
            }
            document.getElementsByTagName("html")[0].appendChild(i)
        },
        toQueryString: function(e) {
            var t = [];
            for (var a in e)
                if (!1 !== e.hasOwnProperty(a)) {
                    var i = e[a];
                    "ad_program" === a && (/^(\[|%5B)\w{3,5}/.test(i) && (i = i.replace(/^(\[|%5B)|(\]|%5D)$/g, "")), /^\w{3,5}\:\/\//.test(i) && (i = "[" + encodeURIComponent(i) + "]")), t.push(a + "=" + i)
                }
            return t.join("&")
        },
        getQueryParams: function() {
            var e = {},
                t = this.getAllElementsWithAttribute("samba.player.api.js", "script")[0].src;
            if (t)
                for (var a = t.slice(t.indexOf("?") + 1).split("&"), i = 0; i < a.length; i++) {
                    var s = a[i].split("=");
                    e[s[0]] = unescape(s[1]).replace(/\[|\]/g, "")
                }
            return e
        },
        createAndAppendIframe: function(e, t, a, i) {
            var s, n, r, o = a.playerParams ? this.toQueryString(a.playerParams) : "",
                l = this.getIframeAddress() + a.ph,
                p = "jsApi=true&" + o + "&parentURL=#" + document.location.href;
            try {
                n = document.createElement("iframe"), n.setAttribute("allowfullscreen", !0), n.setAttribute("webkitallowfullscreen", !0), n.setAttribute("mozallowfullscreen", !0), n.setAttribute("msallowfullscreen", !0), n.setAttribute("allow", "geolocation; microphone; camera; encrypted-media; midi")
            } catch (e) {
                n = document.createElement("iframe")
            }
            if (r = a.m && !a.live ? l + "/" + a.m + "?" + p : a.live ? l + "/live/" + a.live + "?" + p : a.playlistId ? l + "/playlist/" + a.playlistId + (a.mock ? "/mock" : "") + "?" + p : l + "?frameId=" + t + "&" + p, n.src = encodeURI(r), n.name = t, n.width = a.width || "100%", n.height = a.height || "100%", n.frameBorder = 0, n.scrolling = "no", a.responsive) {
                var m = this.addFluid(n);
                e.appendChild(m)
            } else e.appendChild(n);
            n.attachEvent ? n.attachEvent("onload", function() {
                s = {
                    src: n.src,
                    document: frames[n.name]
                }, i(n, s)
            }) : n.onload = function() {
                s = {
                    src: n.src,
                    document: frames[n.name]
                }, i(n, s)
            }
        },
        getIframeAddress: function() {
            var e = this.getQueryParams().protocol || this.URL_BASE().match(/(https?:)?/)[0] || window.location.protocol,
                t = {
                    "web1-13000": e + "//web1.qa.sambatech.com:13000/embed/",
                    "localhost-8080": e + "//localhost:8080/player-api/embed/",
                    staging: e + "//staging-player-api.sambavideos.sambatech.com/v3/embed/",
                    prod: e + "//fast.player.liquidplatform.com/pApiv2/embed/"
                };
            return t[this.getQueryParams().iframeURL] ? t[this.getQueryParams().iframeURL] : t.prod
        },
        addEvent: function(e, t, a) {
            t.addEventListener ? t.addEventListener(e, a, !1) : t.attachEvent ? t.attachEvent("on" + e, a) : t[e] = a
        },
        updateQueryStringParameter: function(e, t, a) {
            var i = e.split("#"),
                s = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                n = -1 !== e.indexOf("?") ? "&" : "?";
            return e.match(s) ? e.replace(s, "$1" + t + "=" + a + "$2") + "#" + i[1] : i[0] + n + t + "=" + a + "#" + i[1]
        },
        inherit: function(e, t) {
            var a = function() {};
            a.prototype = t.prototype, e.prototype = new a, e.prototype.constructor = e
        },
        addFluid: function(e) {
            var t = document.createElement("div");
            return e.className += (e.className ? " " : "") + "fluidsambaplayer-item", t.className += "fluidsambaplayer", t.style.paddingTop = function(e, t) {
                    return parseInt(e, 10) / parseInt(t, 10) * 100 + "%"
                }(e.height, e.width), t.appendChild(e),
                function() {
                    var e = [".fluidsambaplayer {", "width: 100%; max-width: 100%; position: relative;", "}", ".fluidsambaplayer-item {", "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;", "}"].join(""),
                        t = document.head || document.getElementsByTagName("head")[0],
                        a = document.createElement("style");
                    a.type = "text/css", a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e)), t.appendChild(a)
                }(), t
        }
    };
EventDispatcher.prototype.dict = null, EventDispatcher.prototype.addEventListener = function(e, t) {
    null == this.dict[e] && (this.dict[e] = []), this.dict[e].push(t)
}, EventDispatcher.prototype.removeEventListener = function(e, t) {
    var a = this.dict[e],
        i = -1;
    if (null != a) {
        for (i = 0; i < a.length && t !== a[i]; ++i);
        i > -1 && i < a.length && a.splice(i, 1)
    }
}, EventDispatcher.prototype.dispatchEvent = function(e) {
    var t, a, i = this.dict[e.type];
    if (null != i) {
        for (var s = i.concat(), n = 0; n < s.length; ++n) a = s[n].call(this, e), !1 !== t && (t = a);
        return t
    }
};
var SambaPlayerApiMessage = function() {
    this.embedURL = SambaPlayerUtils.getIframeAddress(), this.players = {}, this.onLoadMedia = {}, this.init()
};
SambaPlayerApiMessage.prototype.init = function() {
    var self = this;
    self.returnCallback = function() {}, self.hasLoaded = !1;
    var a = document.createElement("a");
    a.href = self.embedURL;
    var messageDomain = a.protocol + "//" + a.host;
    XD.receiveMessage(function(message) {
        try {
            var data = eval("(" + message.data + ")");
            "getStatus" == data.event ? self.returnCallback(data) : self.events(data)
        } catch (e) {}
    }, messageDomain)
}, SambaPlayerApiMessage.prototype.sendMessage = function(e, t) {
    XD.postMessage(e, t.src, t.document)
}, SambaPlayerApiMessage.prototype.events = function(e, t) {
    try {
        "function" == typeof this.players[e.id][e.event] ? this.players[e.id][e.event](e) : "string" == typeof this.players[e.id][e.event] && window[this.players[e.id][e.event]](e), this.players[e.id]["*"] && ("function" == typeof this.players[e.id]["*"] ? this.players[e.id]["*"](e) : "string" == typeof this.players[e.id]["*"] && window[this.players[e.id]["*"]](e))
    } catch (e) {}
}, SambaPlayerApiMessage.prototype.doAction = function(e, t, a) {
    var i = e;
    null != t && (i += ":" + ("object" == typeof t ? encodeURIComponent(JSON.stringify(t)) : t)), this.sendMessage(i, a)
}, SambaPlayerApiMessage.prototype.getInfo = function(e, t, a) {
    this.returnCallback = t, this.sendMessage(e + ":getStatus", a)
}, SambaPlayerApiMessage.prototype.getQueryParams = function() {
    var e = {},
        t = SambaPlayerUtils.getAllElementsWithAttribute("samba-player-api")[0].src;
    if (t)
        for (var a = t.slice(t.indexOf("?") + 1).split("&"), i = 0; i < a.length; i++) {
            var s = a[i].split("=");
            e[s[0]] = unescape(s[1]).replace(/\[|\]/g, "")
        }
    return e
};
var sambaPlayerApiMessage = sambaPlayerApiMessage || new SambaPlayerApiMessage,
    SambaPlayer = function(e, t) {
        EventDispatcher.call(this);
        var a = this;
        return t.playlist ? a.initPlaylist(e, t) : a.initSingle(e, t), this
    };
SambaPlayerUtils.inherit(SambaPlayer, EventDispatcher), SambaPlayer.prototype.initSingle = function(e, t) {
    var a = this;
    a.MEDIA_ID = t.m || t.live || t.playlistId || "player-" + Math.floor(1e3 * Math.random());
    var i = "string" == typeof e ? document.getElementById(e) : e;
    sambaPlayerApiMessage.players[a.MEDIA_ID] = t.events || {};
    SambaPlayerUtils.createAndAppendIframe(i, a.MEDIA_ID, t, function(e, t) {
        a.iframe = e, a.frame = t, sambaPlayerApiMessage.players[a.MEDIA_ID].event = "onLoad", sambaPlayerApiMessage.players[a.MEDIA_ID].id = a.MEDIA_ID, sambaPlayerApiMessage.events(sambaPlayerApiMessage.players[a.MEDIA_ID])
    })
}, SambaPlayer.prototype.initPlaylist = function(e, t) {
    var a = this;
    a.playlist = t.playlist.medias, a.currentPlaylist = 0, a.loop = t.playlist.loop || !1, a.timeout = t.playlist.timeout || 5, a.autoplay = t.playlist.autoplay || !1, t.ph = t.playlist.ph, t.m = "string" == typeof a.playlist[a.currentPlaylist] ? a.playlist[a.currentPlaylist] : a.playlist[a.currentPlaylist].id, t.events = t.events || {}, t.events.onFinish = function() {
        a.currentPlaylist = a.currentPlaylist + 1 == a.playlist.length ? 0 : a.currentPlaylist + 1, (0 != a.currentPlaylist || a.loop) && sambaPlayerApiMessage.doAction("showPlaylist", encodeURIComponent(JSON.stringify({
            title: a.playlist[a.currentPlaylist].title,
            timeout: a.timeout
        })), a.frame)
    }, t.events.onPlaylistClick = function() {
        for (var e = document.getElementsByClassName("samba-playlist-trigger"), t = e.length; t--;)(e[t].getAttribute("data-mediaid") == a.playlist[a.currentPlaylist] || a.playlist[a.currentPlaylist].id && e[t].getAttribute("data-mediaid") === a.playlist[a.currentPlaylist].id) && e[t].click()
    }, t.events.onCancelPlaylist = function() {
        a.currentPlaylist = 0 === a.currentPlaylist ? a.currentPlaylist.length - 1 : a.currentPlaylist - 1
    }, this.initSingle(e, t), this.bindPlaylist(t.playlist.onClick)
}, SambaPlayer.prototype.changeVideo = function(e, t) {
    var a = this,
        i = a.iframe.src;
    sambaPlayerApiMessage.players[e] = sambaPlayerApiMessage.players[a.MEDIA_ID];
    for (var s = 0; s < a.playlist.length; s++) a.playlist[s] == e && (a.currentPlaylist = s);
    i = a.autoplay && !t && 0 != a.currentPlaylist ? SambaPlayerUtils.updateQueryStringParameter(a.iframe.src, "autoStart", !0) : SambaPlayerUtils.updateQueryStringParameter(a.iframe.src, "autoStart", !1), a.iframe.src = i.replace(a.MEDIA_ID, e), a.MEDIA_ID = e
}, SambaPlayer.prototype.bindPlaylist = function(e) {
    for (var t = this, a = document.querySelectorAll(".samba-playlist-trigger"), i = a.length, s = i; s--;) SambaPlayerUtils.addEvent("click", a[s], function(a) {
        var i = a.target || a.srcElement,
            s = i.getAttribute("data-mediaid");
        t.changeVideo(s, a.isTrusted), "function" == typeof e ? e(s) : "string" == typeof e && window[e](s, a), a.preventDefault()
    }, !1)
}, SambaPlayer.prototype.on = function(e, t) {
    sambaPlayerApiMessage.players[this.MEDIA_ID][e] = t
}, SambaPlayer.prototype.play = function() {
    sambaPlayerApiMessage.doAction("play", null, this.frame)
}, SambaPlayer.prototype.pause = function() {
    sambaPlayerApiMessage.doAction("pause", null, this.frame)
}, SambaPlayer.prototype.mute = function() {
    sambaPlayerApiMessage.doAction("mute", null, this.frame)
}, SambaPlayer.prototype.unmute = function() {
    sambaPlayerApiMessage.doAction("unmute", null, this.frame)
}, SambaPlayer.prototype.getStatus = function(e) {
    sambaPlayerApiMessage.getInfo("getStatus", function(t) {
        e(t)
    }, this.frame)
}, SambaPlayer.prototype.seek = function(e) {
    sambaPlayerApiMessage.doAction("seek", e, this.frame)
}, SambaPlayer.prototype.setDRM = function(e) {
    sambaPlayerApiMessage.doAction("setDRM", e, this.frame)
}, SambaPlayer.prototype.changeSubtitle = function(e) {
    sambaPlayerApiMessage.doAction("changeSubtitle", e, this.frame)
}, SambaPlayer.prototype.voiceScreen = function(e) {
    sambaPlayerApiMessage.doAction("voiceScreen", e, this.frame)
}, SambaPlayer.prototype.setVolume = function(e) {
    sambaPlayerApiMessage.doAction("setVolume", e, this.frame)
}, SambaPlayer.prototype.changeSpeed = function(e) {
    sambaPlayerApiMessage.doAction("changeSpeed", e, this.frame)
}, SambaPlayer.prototype.syncSlideshow = function(e) {
    function t(e) {
        a.slidePlayer.jumpTo(e)
    }
    var a = this;
    switch (a.slidePlayer, e.provider.toLowerCase()) {
        case "slideshare":
            var i = {
                    allowScriptAccess: "always"
                },
                s = {
                    id: e.container
                },
                n = {
                    id: e.id,
                    doc: e.doc,
                    startSlide: 1,
                    rel: 0
                };
            try {
                swfobject.embedSWF("http://static.slideshare.net/swf/ssplayer2.swf", e.container, e.width, e.height, "8", null, n, i, s, function() {
                    a.slidePlayer = document.getElementById(e.container)
                })
            } catch (e) {
                console && console.info("Swfobject nÃ£o encontrado!")
            }
    }
    sambaPlayerApiMessage.players[a.MEDIA_ID].onListen = function(a) {
        var i = a.eventParam ? Math.floor(a.eventParam) : "";
        e.map[i] && t(e.map[i])
    }, sambaPlayerApiMessage.players[a.MEDIA_ID].onFinish = function(e) {
        t(1)
    }
}, SambaPlayer.prototype.dimLights = function(e) {
    var t = this;
    if (!t.dimDiv) {
        t.iframe.style.zIndex = 1040, t.iframe.style.position = "relative", t.dimDiv = document.createElement("div");
        var a = ".sambaplayer-dim-off{display:none;} .sambaplayer-dim-on{opacity: 0.5; width: 100%; height:100%; background-color: #000; bottom: 0; left: 0; position: fixed; right: 0; top: 0; z-index: 1000;}",
            i = document.head || document.getElementsByTagName("head")[0],
            s = document.createElement("style");
        s.type = "text/css", s.styleSheet ? s.styleSheet.cssText = a : s.appendChild(document.createTextNode(a)), i.appendChild(s), document.getElementsByTagName("body")[0].appendChild(t.dimDiv)
    }
    t.dimDiv.className = e ? "sambaplayer-dim-on" : "sambaplayer-dim-off"
}, SambaPlayer.prototype.addAnnotations = function(e, t, a) {
    var i, s, n = this,
        r = {},
        o = 0;
    t && (sambaPlayerApiMessage.players[this.MEDIA_ID].onAnnotationClick = function(e) {
        var a = e.eventParam.index;
        delete e.eventParam.index, t(e.eventParam, a)
    }), sambaPlayerApiMessage.players[this.MEDIA_ID].onListen = function(t) {
        if (i = t.eventParam ? Math.floor(t.eventParam) : "", o != i) {
            o = i;
            for (var a = e.length; a--;) s = i < e[a].time || e[a].delay && i >= e[a].time + e[a].delay, r[a] ? s && (r[a] = !1, n.destroyAnnotations(a)) : s || (r[a] = !0, e[a].index = a, sambaPlayerApiMessage.doAction("showAnnotation", e[a], n.frame))
        }
    }, sambaPlayerApiMessage.players[this.MEDIA_ID].onFinish = function(e) {
        r = {}, n.destroyAnnotations()
    }
}, SambaPlayer.prototype.addMidrollLinks = function(e, t, a) {
    this.addAnnotations(e, t, a)
}, SambaPlayer.prototype.destroyAnnotations = function(e) {
    sambaPlayerApiMessage.doAction("destroyAnnotations", e, this.frame)
}, SambaPlayer.prototype.destroyMidrollLinks = function(e) {
    this.destroyAnnotations(e)
}, SambaPlayer.prototype.initComments = function(e, t) {
    function a() {
        sambaPlayerApiMessage.doAction("initComments", e, i.frame), t && i.addComments(t)
    }
    var i = this,
        s = e.timeInterval > 0 ? e.timeInterval : 5,
        n = -1;
    t && (t = this.treatCommentData(t)), this.frame ? a() : sambaPlayerApiMessage.players[this.MEDIA_ID].onStart = a, sambaPlayerApiMessage.players[this.MEDIA_ID].onCommentAdded = function(e) {
        i.dispatchEvent({
            type: "commentAdded",
            data: e.eventParam
        }), null == t.cm[e.eventParam.time] && (t.cm[e.eventParam.time] = [], t.points.push(e.eventParam.time)), t.cm[e.eventParam.time].push(e.eventParam)
    }, sambaPlayerApiMessage.players[this.MEDIA_ID].onCommentCuepoint = function(e) {
        var a = +e.eventParam.time;
        if (e.eventParam.dontGroup) sambaPlayerApiMessage.doAction("showComment", t.cm[a], i.frame);
        else {
            var r = [],
                o = s;
            if (-1 === n || a - n > s) {
                for (n = a; o--;) t.cm.hasOwnProperty(a + o) && (r = r.concat(t.cm[a + o]));
                sambaPlayerApiMessage.doAction("showComment", r, i.frame)
            }
        }
    }, sambaPlayerApiMessage.players[this.MEDIA_ID].onPause = sambaPlayerApiMessage.players[this.MEDIA_ID].onSeek = sambaPlayerApiMessage.players[this.MEDIA_ID].onFinish = function(e) {
        n = -1
    }
}, SambaPlayer.prototype.addComments = function(e) {
    null == e.points && (e = this.treatCommentData(e)), sambaPlayerApiMessage.doAction("addComments", e.points, this.frame)
}, SambaPlayer.prototype.treatCommentData = function(e) {
    var t = [],
        a = {};
    for (var i in e)
        if (e.hasOwnProperty(i)) {
            var s = e[i].time;
            t.push(s), a.hasOwnProperty(s) ? a[s].push(e[i]) : a[s] = [e[i]]
        }
    return {
        points: t,
        cm: a
    }
};
//# sourceMappingURL=samba.player.api.js.map