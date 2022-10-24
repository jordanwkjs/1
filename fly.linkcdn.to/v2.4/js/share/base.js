(function(d, s) {
    function loaded(e) {
        return new Promise((function(t) {
            (function n() {
                var r = e.__loaded && (__ipgeo.status || (location.host.indexOf('linkfly.to') == -1 || location.host.indexOf('fotoee.com') == -1));
                !r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    setTimeout(function() {
        if (!__ipgeo.status) __ipgeo.status = 'fail';
    }, 10000);
    var js, fjs = d.getElementsByTagName(s)[0];
    if (__data.glua) {
        js = d.createElement(s);
        js.async = !0;
        js.src = 'https://www.googletagmanager.com/gtag/js?id=' + __data.glua;
        fjs.parentNode.insertBefore(js, fjs);
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', __data.glua);
        if (__data.gstag) gtag('config', __data.gstag);
    }
    if (__data.gstag && __data.gstag.pixel) {
        var noscript = d.createElement('noscript');
        noscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + __data.gstag.pixel + '&ev=PageView&noscript=1"/>';
        fjs.parentNode.insertBefore(noscript, fjs);
        ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', __data.gstag.pixel);
        fbq('track', 'PageView');
    }
    if (__data.gstag && __data.gstag.tikpixel) {
        ! function(w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];
            ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function(t, e) {
                t[e] = function() {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                }
            };
            for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            ttq.instance = function(t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                return e
            }, ttq.load = function(e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a)
            };
            ttq.load(__data.gstag.tikpixel);
            ttq.page();
        }(window, document, 'ttq');
    }
    if (__data.gstag && __data.gstag.vkpixel) {
        var noscript = d.createElement('noscript');
        noscript.innerHTML = '<img src="https://vk.com/rtrg?p=' + __data.gstag.vkpixel + '" style="position:fixed;left:-999px;" alt=""/>';
        fjs.parentNode.insertBefore(noscript, fjs);
        ! function() {
            var t = d.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://vk.com/js/api/openapi.js?168", t.onload = function() {
                VK.Retargeting.Init(__data.gstag.vkpixel), VK.Retargeting.Hit()
            }, d.head.appendChild(t)
        }();
    }
    if (__data.gstag && __data.gstag.snappixel) {
        (function(e, t, n) {
            if (e.snaptr) return;
            var a = e.snaptr = function() {
                a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments)
            };
            a.queue = [];
            var s = 'script';
            var r = t.createElement(s);
            r.async = !0;
            r.src = n;
            var u = t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r, u);
        })(window, document, 'https://sc-static.net/scevent.min.js');
        snaptr('init', __data.gstag.snappixel, {
            'user_hashed_email': __data.basic.hashed_email || '',
        });
        snaptr('track', 'PAGE_VIEW');
    }
    var pv = 1,
        uv = 1,
        APIHOST = (document.querySelector('meta[property="api:anlhost"]') ? document.querySelector('meta[property="api:anlhost"]').content : 'https://sapi.linkfly.to') + '/v/1.2';
    var u = document,
        v = function(a, b, t) {
            t = t || u;
            t.addEventListener ? t.addEventListener(a, b, !1) : t.attachEvent && t.attachEvent("on" + a, b)
        },
        k = function(name) {
            var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2])
            } else {
                return null
            }
        },
        q = function(name, search) {
            var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
            var r = (search || window.location.search.substr(1)).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        };

    function pk() {
        var exp = new Date();
        var exp_time = exp.getTime();
        var d1 = new Date(exp.getFullYear(), exp.getMonth(), exp.getDate());
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000 - (exp - d1));
        document.cookie = '_k_puv = ' + exp_time + ';expires=' + exp.toUTCString() + ';path=/;'
    }
    if (k('_k_puv')) {
        pv = 1;
        uv = 0;
    } else {
        pk();
    }
    var f = function(m, d) {
        var xhr = new XMLHttpRequest();
        var _link = (location.pathname || '').replace('/', '__');
        if ((_link || '').length < 3) _link = '';
        xhr.open('POST', APIHOST + '/anl/adata/{0}/{1}/m/{2}/'.Format(__data.bio.id, location.host + _link, m));
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.responseType = 'text';
        xhr.onload = function() {};
        xhr.onerror = function() {};
        try {
            d.push('_uid=' + k('_u_K_id'), 'ipgeo=' + encodeURIComponent(JSON.stringify(__ipgeo)));
            xhr.send(encodeURI(d.join('&')));
        } catch (e) {}
    };
    var a = function(b) {
        if (b.nodeName == 'IMG' || b.nodeName == 'SPAN' || b.nodeName == 'I' || b.nodeName == 'P' || b.nodeName == 'SP') {
            b = b.parentElement;
        }
        if (b.dataset && ((b.dataset.html) || [10, 12, 8].includes(parseInt(b.dataset.type, 10)) || (b.dataset.type == 1 && [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(parseInt(b.dataset.st, 10))))) {
            f('service', ['referer=' + u.referrer, 't=' + (b.dataset.type || 1), 'l=' + b.dataset.html, 'n=' + b.dataset.title, 'u=' + b.dataset.id, 'i=' + b.dataset.kid])
        }
    };
    var c = function(e) {
        a(e.target || e.srcElement || {})
    };
    if (location.pathname.indexOf('page/preview') == -1) {
        loaded(window).then(function() {
            f('link', ['referer=' + u.referrer, 'pv=' + pv, 'uv=' + uv, '_k_sid=' + k('_k_puv'), 'us=' + q('utm_source'), 'um=' + q('utm_medium'), 'uc=' + q('utm_campaign')]);
        });
        v("click", c, d.querySelector('.container'));
    }
})(document, 'script');
String.prototype.Format = function() {
    var result = this;
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == null) arguments[i] = '';
            var reg = new RegExp("(\\{" + i + "\\})", "g");
            result = result.replace(reg, arguments[i]);
        }
    }
    return result;
};
String.prototype.Compile = function(obj) {
    return this.replace(/\{([\w ]+)\}/g, function($1, $2) {
        return (obj != null ? obj[$2] : void 0) == undefined ? "" : obj[$2];
    });
};
if (!String.prototype.CompileHash) {
    String.prototype.CompileHash = function(obj) {
        return this.replace(/#([\w ]+)#/g, function($1, $2) {
            return (obj != null ? obj[$2] : void 0) == undefined ? "" : obj[$2];
        });
    };
}
Date.prototype.Format = function(fmt) {
    var d = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };
    var m = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };
    var _this = this;
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substring(("" + o[k]).length)));
    if (/(W+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? ((d[_this.getDay()]).substring(0, 3)) : (d[_this.getDay()]));
    if (/(H+)/.test(fmt)) {
        var hours = _this.getHours(),
            ampm = 'am';
        if (hours > 12) {
            hours = hours % 12;
            ampm = 'pm'
        }
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (hours + ampm) : (("00" + o[k]).substring(("" + o[k]).length) + ampm))
    }
    if (/(X+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? m[_this.getMonth()].substring(0, 3) : m[_this.getMonth()]);
    return fmt;
};

function gettext(txt) {
    return txt;
}

function GetPathString(name, search) {
    if (!search || !name) return '';
    var reg = new RegExp("(^|/)" + name + "=([^/]*)(/|$)");
    var r = (search).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
window.__loaded = false;
window.__checkLinks = ['secureme-dt\\.com', 'hostwindsdns\\.com', 'dates\\.life', 'htl\\.li', 'hookuplocators1\\.com', 'bom\\.so', 'linksecurecd\\.com', 'wrightcomputing\\.com', 'dirtyflirt\\d{0,2}\\.com', 'securesmcd\\.com', 'smcdsecure\\.com', 'safedates?\\.com', 'secure-sm\\.com', 'secure-ag\\.com', 'secure-ag\\.com', '74k03y4usc\\.com|jozzpromo\\.org|1wody\\.top|massive-win\\.com|ggbetpromo\\.com|rdrct-now\\.online|vavadapartner\\.ru|psthai888\\.com|area51bet\\.iwallet\\.link|818king\\.com|918kissme\\.com|vickeylee\\.com|weareivleague\\.com|sleek\\.bio|prediksipools\\.com|chiefmediazs\\.com|fresh-tmmpgchred\\.com|jtfr-mutlukir\\.com|riopokerclube\\.com\\.br|catchthecatpromocat\\.com|luth\\.pw|fartu\\.online|catlanding\\.com|vavadamh5\\.com|3547700\\.com|mastertoto\\.org|w88c1\\.com|vavadamh5\\.com|1xslot99052\\.com|betflix828\\.com|f[li]ndmy[li]ove\\.net|ncshop\\.site|hihi001\\.cc|ar101\\.best|as101\\.work|effectivecpmgate\\.com|ipfwstudenthousing\\.com|inmotionhosting\\.com|ewweyerydsffds\\.blogspot\\.com', 'frisk\\.chat', 'wowly\\.xyz', 'dailyguides\\.com\\.ng', 'giftz\\.xyz', 'giftmaaterwiswe\\.com', 'girlssohorny\\.net', 'findlady2date\\.com', 'moreobs\\.com', 'highperformancecpm\\.com', 'naughties\\.com', 'soo\\.gd', 'thebest-datings\\.com', 'cutt\\.us', 'chl\\.li', 'bnc\\.it', 'sheissoporny\\.net', 't2pdy\\.app\\.link', 'st\\.ht', 'v\\.ht', 'bit\\.do', 'ssur\\.cc', 'atp\\.me', 'da\\.gd', 'wantsyoumuch\\.net', 'day-sweet-girls\\d\\.com', '-here\\.life', 'datedats\\d\\.com', 'ecircularplug\\.com', 'nganha\\.vip', 'dating\\d\\d\\.life', 'dating\\d\\.life', 'freem416glacier\\.com', 'bloodravencoin\\.com', 'xspin-web\\.com', 'myvnc\\.com', 'jackgaming\\.net', 'gaskenlur\\.com', 'cams-here-now\\.com', '-app\\.link', 'shr\\.lc', 'videosexx7\\.blogspot\\.com', 'kammasangam\\.com', 'smrtsecure-', 'walangsanget\\.fr', 'localsexladies\\.com', 'lovegirls\\.xyz', 'new-lady-4you1\\.com', 'adsbtrk\\.com', 'freelovehere\\.net', 'qwiklover\\.com', 'securecamsinvite\\.com', 'hiiloaded\\.net', 'dating-clubs\\.com', 'nicepartnerscc\\.com', 'my24-casual-datings\\.com', 'hyperurl\\.co', 'crazydate8\\.xyz', 'amateur\\.tv', 'freelovehere\\.net', 'loverfans\\.com', 'nfovd\\.app', 'trackbyfast\\.com', 'cheatingbbs\\.com', 'gbrcty\\.site', 'turbodigitalpro\\.com', 'regruhosting\\.ru', 'ndywmr\\.com', 'duckdns\\.org', 'hotgirlfor', 'chaturbate\\.com', 'quickdates0\\.com', 'shorturl\\.ca', 'kielce\\.pl', 'naughtygi8\\.blogspot\\.com', 'timeoffers\\.net', 'securecloud', 'cemarabet\\.info', 'adult-date\\.online', 'ug-sports\\.net', 'casinoadrenaline\\.com', '165908\\.com', 'bitstarz\\.com', 'v99win\\.net', 'flirtyho0kup\\.com', 'bestwomanlovemate\\.com', 'smsecure-dt\\.com', 'sh3w4nty0u\\.app', 'shary\\.io', 'sex-right-now1\\.com', 'securecd-smrt\\.com', 'dirtyvalentine2\\.com', 'secureconv-dt\\.com', 'fbwhores\\.net', 'snapgirls\\d\\.com', 'feelfl1rty\\.com', 'flirtyfind3r\\.com', 'instameetmatch7\\.com', 'datetofuck\\.net', 'quickdates\\d\\.com', 'dirtyflirt7\\.com', 'snapbabes\\d\\.com', 'passtechusa\\.com', 'adultdream3\\.com', '4flirtytouch\\.com', 'flirtbangg\\.com', 'flirtymeetz\\.com', 'flirtyfinderr\\.com', 'dirtyvalentine3\\.com', 'woodstockplastics\\.com', 'puredate\\.net', 'x4kiz\\.app\\.link', 'nordnet\\.dk\\.global\\.prod\\.fastly\\.net', 'crm-softwares-retail-accounting\\.qalthifit\\.xyz', 'myfreesex\\.site', 'dating-ocean\\.com', 'web\\.bill-z\\.xyz', 'app\\.geoleads\\.xyz', 'mosthoties\\.com', 'dirtyflirt1\\.com', 'f33lflirty\\.com', 'flirtydate4u\\.com', 'thebest-dating\\.com', 'oblivionoflove\\.com', 'trxme\\.xyz', 'ohhmylover\\.com', 'local-chicks-here5\\.com', 'xzxzx\\.club', 'hornyhoneylovers\\.com', 'adultdream0\\.com', 'kqevn\\.grabnfuck\\.com', 'xcxcxcxcx\\.online', 'petitepartnersfinder\\.com', 'hotladieshere\\.net', 'sluttyteens\\.net', 'urflirtyjoy\\.com', 'flirtyt0uch\\.com', 'allgo\\.xyz', 'instawhores\\.net', 'cemeng\\.fr\\.nf', 'takemehere\\.net', 'masturbation\\.surti-ple\\.live', 'inztagrum\\.live', 'modelhub\\.com', 'pornhub\\.com', 'cheat1nggirls\\.com', 'flirtyparty4u\\.com', 'facebookdates\\.net', 'local-hot-dates\\.com', 'catchthelove\\.net', 'epizy\\.com', 'shewantsyou\\.net', 'bestwomanz\\.site', 'findurlovemate\\.net', 'myniceny\\.com', 'sign-up1\\.com', 'runknown017\\.xyz', 'luvaihoo\\.com', 'sugarslutsnn\\.com', 'playtillcum\\.com', 'instateens\\.net', 'zyns\\.com', 'clinicalaermitadecartagena\\.com', 'land-flirtgirl1\\.com', 'dating-plan5\\.com', 'hornyplaymatesfinder\\.com', 'imilead\\.com', 'niceladiesnj\\.com', 'nafeesavinson\\.xyz', 'misbahwilkins\\.xyz', 'shreyaplummer\\.xyz', 'sherricornish\\.xyz', 'sofiamohamed\\.xyz', 'junkyards\\.site', 'sexplayground\\.net', 'flirtyhookupd\\.com', 'findsexeasy\\.com', 'ismygirl\\.com', 't\\.adating\\.link', 'letsdatemelove\\.online', 'instasecrets-flirt\\.com', 'my-hottest\\.com', 'resepkomplit\\.com', 'girls-sex-list\\.com', 'camsnaugtygirls\\.live', '18plusstream\\.com', 'revenuecpmnetwork\\.com', 't\\.aslnk\\.link', 'fl1rtymatch\\.com', 'regionseffective\\.com', 'cheatingbabez\\.com', 'belcampobutchery\\.xyz', 'bicshuntinshack\\.xyz', 'absolutehookups3\\.com', 'fl1rtymeet\\.com', 'findgirl1\\.com', 'shewantyou', 'dirtyvalentine1\\.com', 'flirtyme3t\\.com', 'lets-real-dating\\.com', 'feelfllirty\\.com', 'instababe\\.net', 'xxxsexfinder-here4\\.com', 'findyourlovemate\\.com', 'fuckbook\\.tv', 'coatsgroup\\.com', 'crossas\\.com', 'hoesforyou\\.net', 'tobeslut\\.com', 'edisondesign\\.link', 'misuanna\\.xyz', 'suolongarts\\.xyz', 'love2nights\\.com', 'beget\\.tech', 'havzza\\.com', 'cheatinsluts\\.com', 'nywap\\.online', 'flirrtytouch\\.com', 'dating-affairs-now\\.com', 'kandruss\\.top', 'dateworlds\\.net', 'datelocator24\\.com', 'dateszone\\.net', 'date-finder365\\.com', 'edisondesign\\.link', 'misuanna\\.xyz', 'suolongarts\\.xyz', 'facebookgirls\\.net', 'hotladieshere\\.net', 'hot-girls-here\\.com', 'girlwantsyou\\.net', 'teenisyours\\.com', 'datinglove\\.link', 'imitrk\\d\\.com', 'datedats\\d\\.com', 'dateshookp\\.com', 'alloremise\\.com', 'lc\\.chat', 'seositusjudi\\.com', 'danocton\\.com', 'okoce\\.club', 'raksasaqiu\\.com', 'v88sgp\\.club', 'livechatinc\\.com', 'txbzco\\.com', 'bolahelp\\.com', 'digitalpokerdiary\\.com', 'free-casinos\\.us', 'bktoto\\.com', 'juditim88\\.club', 'ceritaseks\\.asia', 'tokojudi\\.cc', 'etvhtkei\\.com', 'v88kartu\\.cc', 'hkslot\\.com', 'crashceme\\.club', 'bolafun\\.com', 'app\\.chaport\\.com', 'bursa777\\.info', 'webjokerbola\\.blogspot\\.com', 'jokerbola\\.win', 'agen-bola-terpercaya-deposit-murah\\.blogspot\\.com', 'jokerbola\\.blogspot\\.com', 'agen-bola-terbaik-dan-terpercaya\\.blogspot\\.com', 'agenbolaterpercayabonusbesar\\.blogspot\\.com', 'popcornez\\.com', 'thaidoccument\\.com', 't8betvip\\.com', 'v998\\.link', 'onionhydra\\.net', 'slotfufu\\.com', 'goldwinslot\\.com', 'tawk\\.to', 'gwin678id\\.net', '8b\\.io', 'rebrand\\.ly', 'togelmandiri\\d*\\.com', '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', 'dewahoki\\d+\\.com', 'betoo\\.com', 'bosswin\\d+\\.net', 'slot\\.cc', 'realhotgirlss\\.com', 'idncash\\.me', 'hbo9\\.net', 'wantoffer\\.com', 'gem\\d+\\.org', 'gem\\d+\\.xyz', 'gem\\d+\\.link'];
window._suspectLinks = ['s\\.id', 'gg\\.gg', 'tinyurl\\.com', 'blogspot\\.com', 'is\\.gd', 'mily\\.vn', 'rb\\.gy', '\\.xyz', 'www\\d{1,3}\\.', 'cutt\\.ly', 'smrturl\\.co'];

function closePopup(that) {
    document.querySelector('.popup-container').classList.remove('animate__fadeInPopup');
    document.querySelector('.popup-container').classList.add('animate__fadeOutDown');
    setTimeout(function() {
        document.querySelector('.popup-mask').style.display = 'none';
        document.querySelector('.popup-container').remove();
    }, 200);
}

function waringLeave(l) {
    var _popup = document.querySelector('.popup');
    if (!_popup) {
        _popup = document.createElement('div');
        _popup.className = 'popup popup-mask';
        document.body.appendChild(_popup);
    }
    var _popupContainer = document.createElement('div');
    _popupContainer.className = 'popup-container';
    _popupContainer.innerHTML = document.querySelector('#popup-link-alert').innerHTML.Compile({
        link: l
    });
    _popup.innerHTML = '';
    _popup.appendChild(_popupContainer);
    document.querySelector('.popup-mask').style.display = 'block';
}

function scheduleTime(st, start, end) {
    if (st) {
        var _n = new Date();
        if (start) {
            start = new Date(start.replace(/-/g, '/'))
        }
        if (end) {
            end = new Date(end.replace(/-/g, '/'))
        }
        if (start && start > _n) return false;
        if (end && end < _n) return false;
    }
    return true;
}

function clearImage(s, w, h) {
    if (!s) return '';
    if (s.indexOf('http') != 0) s = 'https://fly.linkcdn.to/' + s;
    if (s.indexOf('d351p1jxpt6hnn.cloudfront.net') != 0) s = s.replace('d351p1jxpt6hnn.cloudfront.net', 'fly.linkcdn.to');
    if (s.indexOf('.fotoee.com') != -1) {
        if (s.indexOf('?imageView2') != -1) s = s.split('?')[0];
        return s + '?imageView2/2' + (w ? '/w/' + w : '') + (h ? '/h/' + h : '');
    }
    return s;
}

function amazon_af_region(url) {
    if (url) {
        if (url.indexOf('amazon.com') != -1) return 'US';
        if (url.indexOf('amazon.co.uk') != -1) return 'GB';
        if (url.indexOf('amazon.de') != -1) return 'DE';
        if (url.indexOf('amazon.fr') != -1) return 'FR';
        if (url.indexOf('amazon.co.jp') != -1) return 'JP';
        if (url.indexOf('amazon.ca') != -1) return 'CA';
        if (url.indexOf('amazon.cn') != -1) return 'CN';
        if (url.indexOf('amazon.it') != -1) return 'IT';
        if (url.indexOf('amazon.es') != -1) return 'ES';
        if (url.indexOf('amazon.in') != -1) return 'IN';
        if (url.indexOf('amazon.com.br') != -1) return 'BR';
        if (url.indexOf('amazon.com.mx') != -1) return 'MX';
        if (url.indexOf('amazon.com.au') != -1) return 'AU';
        if (url.indexOf('amazon.ae') != -1) return 'AE';
        if (url.indexOf('amazon.sg') != -1) return 'SG';
        if (url.indexOf('amazon.nl') != -1) return 'NL';
        if (url.indexOf('amazon.sa') != -1) return 'SA';
        if (url.indexOf('amazon.se') != -1) return 'SE';
        if (url.indexOf('amazon.pl') != -1) return 'PL';
    }
    return ''
}

function _makeup_link(l) {
    if (/^tel:?\/?\/?/i.test(l)) return l.replace(/^tel:?\/?\/?/i, 'tel://');
    if (/^mailto:?\/?\/?/i.test(l) || /\w+([\w.-])*@[\w-_]+\.\w+[.|\w]*/.test(l)) return l.replace(/^(mailto:?\/?\/?)?/i, 'mailto:');
    if (!/(wa\.me)|(whatsapp\.com)/i.test(l)) l = encodeURI(l);
    return /^(https?):?\/?\/?/i.test(l) ? l.replace(/^(https?):?\/?\/?/i, RegExp.$1 + '://') : 'http://' + l;
}

function aff_linkfly(l) {
    l = l || '';
    try {
        if (l.indexOf('apple.com') != -1) {
            var apple_aff = __data.gstag.apple,
                affid = '',
                _l = '?';
            if (apple_aff && apple_aff.length > 0 && apple_aff[0].afid) {
                affid = apple_aff[0].afid;
                if (l.indexOf('?') != -1) _l = '&';
                if (l.indexOf('music.apple.com') != -1) return l + _l + 'at=' + affid + '&ls=1&app=music&ct=linkfly';
                if (l.indexOf('books.apple.com') != -1) return l + _l + 'at=' + affid + '&ls=1&ct=linkfly';
                if (l.indexOf('podcasts.apple.com') != -1) return l + _l + 'at=' + affid + '&ls=1&ct=linkfly';
                if (l.indexOf('tv.apple.com') != -1) return l + _l + 'at=' + affid + '&ct=linkfly';
            }
            return l;
        }
        if (l.indexOf('.amazon.') != -1) {
            var amazon_affs = __data.gstag.amazon,
                aff = null,
                _l = '?',
                region = '';
            if (amazon_affs && amazon_affs.length > 0) {
                region = amazon_af_region(l);
                aff = amazon_affs.find(function(a) {
                    return a.region == region;
                })
                if (region && aff) {
                    if (l.indexOf('?') != -1) _l = '&';
                    return l + _l + 'tag=' + aff.afid;
                }
            }
        }
    } catch (e) {}
    return l;
}

function checkLink(l, t, st, l2, ti) {
    t = t || 1;
    l = l || '';
    if (t == 10 || t == 11 || t == 12) return 'javascript:;';
    if (!l) return 'javascript:;';
    if (st && l2) return 'javascript:;';
    if (t == 1 && ((0 < st && st < 4) || (4 < st && st < 14))) return 'javascript:;';
    var reg = new RegExp("(" + __checkLinks.join('|') + ")", 'gi');
    if (reg.test(l.split('?')[0])) return 'https://linkfly.to/prom/404/';
    if (/^tel:?\/?\/?/i.test(l)) return l.replace(/^tel:?\/?\/?/i, 'tel://');
    if (/^mailto:?\/?\/?/i.test(l) || /\w+([\w.-])*@[\w-_]+\.\w+[.|\w]*/.test(l)) return l.replace(/^(mailto:?\/?\/?)?/i, 'mailto:');
    if (!/(wa\.me)|(whatsapp\.com)/i.test(l)) l = encodeURI(l);
    if (t == 1 && st == 4 && l.indexOf('twitter.com') != -1) l = l.replace(/\/status\/.*/i, '');
    if (__data.basic.check_state != 2) {
        var regSuspect = new RegExp("(" + _suspectLinks.join('|') + ")", 'gi');
        if (regSuspect.test(l)) return "javascript:waringLeave('{0}');".Format(_makeup_link(l));
    }
    if (__data.gstag && __data.gstag.url_builder) {
        l = /^(https?):?\/?\/?/i.test(l) ? l.replace(/^(https?):?\/?\/?/i, RegExp.$1 + '://') : 'http://' + l;
        if (__data.gstag.url_builder.indexOf('?') == 0) __data.gstag.url_builder = __data.gstag.url_builder.substring(1);
        l = l + (l.indexOf('?') > 0 ? '&' : '?') + __data.gstag.url_builder;
        if (ti) l += '&utm_campaign=' + ti;
    }
    l = aff_linkfly(l);
    return /^(https?):?\/?\/?/i.test(l) ? l.replace(/^(https?):?\/?\/?/i, RegExp.$1 + '://') : 'http://' + l;
}

function getImageKey(s) {
    if (!s) return '';
    if (/logo\/(amazon\.png|amazonalex|kting|kugou|kuwo|lizhi|migu|mixerbox|moov|neteasecloudmusic|nosample|other\.png|patari|pulselocker|qianqian|qingting|qq\.png|whatpeopleplay|wimp|xiami)/i.test(s)) return '';
    s = s.split('?')[0].split('/').pop();
    return s.replace(/\.\w+/gi, '').toLowerCase();
}

function isEmpty(v) {
    return (v === undefined || v === null || v === '');
}

function ep(tar, selector) {
    selector = selector || "div";
    if (selector && tar && tar.nodeName != 'HTML') {
        if (selector.indexOf('.') != -1) {
            var _sel = selector.split('.');
            if ((!_sel[0] || tar.nodeName == _sel[0].toUpperCase()) && tar.classList.contains(_sel[1])) {
                return tar;
            } else {
                return ep(tar.parentNode, selector);
            }
        } else if (selector.indexOf('#') != -1) {
            var _sel = selector.split('#');
            if ((!_sel[0] || tar.nodeName == _sel[0].toUpperCase()) && tar.id == _sel[1]) {
                return tar;
            } else {
                return ep(tar.parentNode, selector);
            }
        } else {
            var _sel = [selector];
            if (tar.nodeName == _sel[0].toUpperCase()) {
                return tar;
            } else {
                return ep(tar.parentNode, selector);
            }
        }
    } else {
        return null;
    }
}
(function(d, s) {
    var baseTmpl = `<script id="form-tmpl-ct" type="text/template">
    <div class="form-tmpl animate__animated animate__fadeInUp">
        <p class="form-tmpl-close"><i class="iconfont icon-close"></i></p>
    </div>
</script>
<script id="form-tmpl-1" type="text/template">
    <div class="form-subscribe">
        <div class="form-control form-title" data-param="title">
            <span>{title}</span>
        </div>
        <div class="form-control form-fullname" data-param="fullname">
            <input type="text" placeholder="{fullname}" name="fullname">
        </div>
        <div class="form-control form-email" data-param="email">
            <input type="text" placeholder="{email}" name="email">
        </div>
        <div class="form-control form-submit">
            <div class="form-button " data-param="btn_text">
                <button class="">{btn_text}</button>
            </div>
            <div class="form-thanks" data-param="thanks_text">
                <span>{thanks_text}</span>
            </div>
        </div>
    </div>
</script>
<script type="text/template" id="form-tmpl-css">
    .form-tmpl{
        {css}
    }
</script>
<script type="text/plain" id="shareLoading"><div class="loader">
    <span></span><span></span><span></span><span></span><span></span>
</div></script>
<script type="text/plain" id="btnLinkTmpl">
<div class="item item-style {animation}" style="background-color:{bcolor};border-color:{bcolor}">
<div class="ctm-style">
    <span class="btn-img {displayImg}" style="background-image: url('{icon}')"></span>
    <span class="btn-icon {displayIcon} iconfont {iconfont}"></span>
    <a href="{link1}" target="{target}" data-title="{title}" data-txt="{text}" data-embed="{link2}" data-path="{path}" data-st="{subtype}" data-html="{link}" data-id="{lid}" data-kid="{id}" data-type="{type}" class="btn link"><p>{title}</p><p class="link-text">{linktext}</p></a>
</div>
</div>
</script>
<script type="text/plain" id="linkTmplButton">
<div class="item item-style {animation}" style="background-color:{bcolor};border-color:{bcolor}">
<div class="ctm-style">
    <span class="btn-img {displayImg}" style="background-image: url('{icon}')"></span>
    <span class="btn-icon {displayIcon} iconfont {iconfont}"></span>
    <button class="btn link" data-title="{title}" data-txt="{text}" data-embed="{link2}" data-path="{path}" data-st="{subtype}" data-html="{link}" data-id="{lid}" data-kid="{id}" data-type="{type}"><p>{title}</p><p class="link-text">{linktext}</p>
    <span class="btn-status "><svg viewBox="0 0 16 16"><path d="M8.006 11c.266 0 .486-.106.695-.323l4.061-4.21A.807.807 0 0013 5.87a.855.855 0 00-.846-.87.856.856 0 00-.626.276L8.006 8.957 4.477 5.276A.87.87 0 003.852 5 .86.86 0 003 5.869c0 .235.087.428.243.599l4.062 4.215c.214.217.434.317.7.317z"></path></svg></span>
    </button>
</div>
</div>
</script>
<script type="text/plain" id="socialListTmpl">
<div class="social_list-spirit"></div>
<div class="social_list-svg-3"></div>
<div class="social_list-svg-4"></div>
<div class="social_list-svg-6"></div>
</script>
<script type="text/plain" id="socialLinkTmpl">
    <a href="{link1}" target="{target}" data-title="{title}" data-html="{link}" data-id="{lid}" data-kid="{id}" data-type="4"><sp class="{blendMode}" style="background-image:url({image}),linear-gradient(var(--link-social-color-blend), var(--link-social-color-blend));"></sp></a>
</script>
<script type="text/plain" id="socialLinkSVGTmpl">
    <a href="{link1}" target="{target}" data-title="{title}" data-html="{link}" data-id="{lid}" data-kid="{id}" data-type="4"><sp class="iconfont icon-social-{st}-{type}" style="background-image:url({image1}),linear-gradient(var(--link-social-color-blend), var(--link-social-color-blend));"></sp></a>
</script>
<script type="text/plain" id="videoItemTmpl">
<div class="item-video"><div class="ctm-style"><div class="video-box"><iframe src="{link}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></div>
</script>
<script type="text/plain" id="embedLoading">
<div class="embed-loading"><div>
<svg enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,22C6.48,22,2,17.52,2,12c0-2.65,1.05-5.2,2.93-7.07C6.8,3.05,9.35,1.99,12,2c0.55,0,1,0.45,1,1s-0.45,1-1,1c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8c0-2.12-0.84-4.16-2.34-5.66c-0.39-0.39-0.39-1.02,0-1.41s1.02-0.39,1.41,0c3.91,3.91,3.91,10.24,0,14.14C17.2,20.95,14.65,22,12,22z"></path></svg>
</div></div>
</script><script type="text/plain" id="music-preview-service">
<div class="music-preview-service">
    <div class="music-preview-service-logo"><img src="{logo}" alt="{platform}"><div class="music-preview-service-name">{name}</div></div>
    <div class="music-preview-service-share"><a href="{link}" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"><defs><clipPath id="clip-path"><rect x="5.6" y="5.52" width="116.8" height="116.96"/></clipPath></defs><g><path d="M99.28,122.32H28.64a23.07,23.07,0,0,1-23-23V28.64a23.07,23.07,0,0,1,23-23H64a4.61,4.61,0,0,1,0,9.21H28.64A13.85,13.85,0,0,0,14.81,28.64V99.29a13.85,13.85,0,0,0,13.82,13.82H99.28A13.85,13.85,0,0,0,113.1,99.29V64a4.61,4.61,0,1,1,9.21,0V99.29a23.07,23.07,0,0,1-23,23Zm0,0"/><path d="M62.42,70.11a4.64,4.64,0,0,1-3.26-1.35,4.58,4.58,0,0,1,0-6.51L114.45,7A4.61,4.61,0,0,1,121,13.47L65.68,68.75a4.64,4.64,0,0,1-3.26,1.35Zm0,0"/></g><path d="M117.71,14.82H93.14a4.61,4.61,0,0,1,0-9.21h24.57a4.61,4.61,0,1,1,0,9.21Zm0,0"/><path d="M117.71,39.39a4.61,4.61,0,0,1-4.61-4.61V10.21a4.61,4.61,0,0,1,9.21,0V34.78a4.61,4.61,0,0,1-4.61,4.61Zm0,0"/></svg></a></div>
</div>
</script>
<script type="text/text" id="embed-support">
<div class="support-desc"><span>{desc}</span></div>
<div class="support-amount">
    <div class="support-amount-select">
        <p>Select an amount (USD)</p>
        <div class="amount-select">
            {amount}
        </div>
    </div>
    <div class="support-amount-custom" style="display:{customDisplay}">
        <p>or custom amount (USD)</p>
        <div class="amount-custom"><span class="amount-custom-symbol">$</span><input class="amount-custom-input" type="number"></div>
    </div>
</div>
<div class="support-continue">
    <button disabled>Continue <p><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M11 7.994c0-.266-.106-.486-.323-.695l-4.21-4.06A.807.807 0 005.87 3a.855.855 0 00-.87.846.856.856 0 00.276.626l3.681 3.522-3.68 3.53a.87.87 0 00-.277.624.86.86 0 00.87.852.858.858 0 00.598-.243l4.215-4.062c.217-.214.317-.434.317-.7z"></path></svg></p></button>
</div>
</script>
<script type="text/text" id="embed-support-detail">
<div class="support-desc">
<div><p><span>$</span><span class="support-detail-amount">{amount}</span> (USD)</p><p class="support-desc-link">to {link}</p></div>
<div class="support-back"><button><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M 8 11.21875 C 7.644531 11.21875 7.308594 11.078125 7.058594 10.828125 L 3.285156 7.058594 C 2.765625 6.535156 2.765625 5.691406 3.285156 5.171875 C 3.808594 4.652344 4.652344 4.652344 5.171875 5.171875 L 8 8 L 10.828125 5.171875 C 11.347656 4.652344 12.191406 4.652344 12.714844 5.171875 C 13.234375 5.691406 13.234375 6.535156 12.714844 7.058594 L 8.941406 10.828125 C 8.691406 11.078125 8.355469 11.21875 8 11.21875 Z M 8 11.21875 "></path></svg></button></div>
</div>
<div class="support-detail" data-success="{success}">
    <div class="support-detail-title">Details</div>
    <div class="support-detail-email">
        <p><input name="email" placeholder="Email address" type="text"></p>
    </div>
    <div class="support-detail-note" style="display:{noteDisplay}">
        <p><textarea name="note" placeholder="Message (optional)" maxlength="200" type="text"></textarea></p>
    </div>
</div>
<div class="pay-element">
    <div class="pay-action">
        <div class="support-continue">
            <button disabled data-type="{payType}" data-key="{key}" data-id="{id}" data-merchantid="{merchantid}">Continue to pay <p><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M11 7.994c0-.266-.106-.486-.323-.695l-4.21-4.06A.807.807 0 005.87 3a.855.855 0 00-.87.846.856.856 0 00.276.626l3.681 3.522-3.68 3.53a.87.87 0 00-.277.624.86.86 0 00.87.852.858.858 0 00.598-.243l4.215-4.062c.217-.214.317-.434.317-.7z"></path></svg></p></button>
        </div>
        <div class="embed-support-service"><p>By completing this transaction, you agree to the <a href="/legal/service.html" target="_blank">T&Cs</a>. Payment will be made to {link}. Linkfly is not liable for this transaction.</p></div>
    </div>
    <div class="pay-stripe">
        <form method="post" action="#" target="_blank" id="payment-form">
        <div id="card-element">
            <!-- A Stripe Element will be inserted here. -->
        </div>
        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert"></div>
        <div class="support-continue"><button disabled>Pay</button></div>
        <div class="embed-loading"><div>
        <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,22C6.48,22,2,17.52,2,12c0-2.65,1.05-5.2,2.93-7.07C6.8,3.05,9.35,1.99,12,2c0.55,0,1,0.45,1,1s-0.45,1-1,1c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8c0-2.12-0.84-4.16-2.34-5.66c-0.39-0.39-0.39-1.02,0-1.41s1.02-0.39,1.41,0c3.91,3.91,3.91,10.24,0,14.14C17.2,20.95,14.65,22,12,22z"></path></svg>
        </div></div>
        </form>
    </div>
    <div class="pay-paypal">
        <div id="paypal-button-container"></div>
        <div class="embed-loading"><div>
        <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,22C6.48,22,2,17.52,2,12c0-2.65,1.05-5.2,2.93-7.07C6.8,3.05,9.35,1.99,12,2c0.55,0,1,0.45,1,1s-0.45,1-1,1c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8c0-2.12-0.84-4.16-2.34-5.66c-0.39-0.39-0.39-1.02,0-1.41s1.02-0.39,1.41,0c3.91,3.91,3.91,10.24,0,14.14C17.2,20.95,14.65,22,12,22z"></path></svg>
        </div></div>
    </div>
</div>
</script>
<script type="text/plain" id="embed-support-smount">
<div><p class="amount-select-label" pointer-events="none"><label for="amount{0}"><span>$</span>{1}</label></p><p class="amount-select-input"><input id="amount{0}" type="radio" name="amount" value="{2}"></p></div>
</script>
<script type="text/plain" id="formItemTmpl">
<div class="item-form"><div class="ctm-style"><div class="form-box form-tmpl">
<div class="form-control form-title" data-param="title">
    <div class="data-field"></div>
</div>
<div class="form-fields-group">
</div>
<div class="form-fields-actions">
    <div class="g-recaptcha" id="html_element_{1}" data-sitekey="6LfaZcUeAAAAAA0z_1PqUUL0E_0fUZFpMOqfASt1" data-callback="onSubmit" data-size="invisible"></div>
    <div class="form-submit-terms"><p>By submitting your contact details, you are providing your data to {0} who may contact you.</p></div>
    <div class="form-button form-submit form-control" data-param="submit">
        <button class="form-event data-field"></button>
    </div>
    <div class="form-thanks" data-param="thanks_text">
        <span></span>
    </div>
</div></div></div></div>
</script>
<script type="text/plain" id="form-field-email">
<div class="form-field" data-param="email" data-idx="{idx}">
    <div class="form-control">
        <input class="data-field" data-required="{required}" data-sync="{sync}" type="text" placeholder="{title}">
    </div>
</div>
</script>
<script type="text/plain" id="form-field-input">
<div class="form-field" data-param="input" data-idx="{idx}">
    <div class="form-control">
        <input class="data-field" data-required="{required}" type="text" placeholder="{title}">
    </div>
</div>
</script>
<script type="text/plain" id="form-field-number">
<div class="form-field" data-param="number" data-idx="{idx}">
    <div class="form-control">
        <input class="data-field" data-required="{required}" type="number" placeholder="{title}">
    </div>
</div>
</script>
<script type="text/plain" id="form-field-phone">
<div class="form-field" data-param="phone" data-idx="{idx}">
    <div class="form-control ">
        <div class="form-field-phone">
            <span class="dial-code"><span>+1</span>
            </span>
            <input class="data-field" data-required="{required}" type="tel" placeholder="{title}">
            <div class="dial-code-select">
                <ul>
                <li data-dial="+93" data-code="af" data-country="Afghanistan (افغانستان‎)">Afghanistan (افغانستان‎)<span>+93</span></li><li data-dial="+355" data-code="al" data-country="Albania (Shqipëri)">Albania (Shqipëri)<span>+355</span></li><li data-dial="+213" data-code="dz" data-country="Algeria (الجزائر‎)">Algeria (الجزائر‎)<span>+213</span></li><li data-dial="+1" data-code="as" data-country="American Samoa">American Samoa<span>+1</span></li><li data-dial="+376" data-code="ad" data-country="Andorra">Andorra<span>+376</span></li><li data-dial="+244" data-code="ao" data-country="Angola">Angola<span>+244</span></li><li data-dial="+1" data-code="ai" data-country="Anguilla">Anguilla<span>+1</span></li><li data-dial="+1" data-code="ag" data-country="Antigua and Barbuda">Antigua and Barbuda<span>+1</span></li><li data-dial="+54" data-code="ar" data-country="Argentina">Argentina<span>+54</span></li><li data-dial="+374" data-code="am" data-country="Armenia (Հայաստան)">Armenia (Հայաստան)<span>+374</span></li><li data-dial="+297" data-code="aw" data-country="Aruba">Aruba<span>+297</span></li><li data-dial="+247" data-code="ac" data-country="Ascension Island">Ascension Island<span>+247</span></li><li data-dial="+61" data-code="au" data-country="Australia">Australia<span>+61</span></li><li data-dial="+43" data-code="at" data-country="Austria (Österreich)">Austria (Österreich)<span>+43</span></li><li data-dial="+994" data-code="az" data-country="Azerbaijan (Azərbaycan)">Azerbaijan (Azərbaycan)<span>+994</span></li><li data-dial="+1" data-code="bs" data-country="Bahamas">Bahamas<span>+1</span></li><li data-dial="+973" data-code="bh" data-country="Bahrain (البحرين‎)">Bahrain (البحرين‎)<span>+973</span></li><li data-dial="+880" data-code="bd" data-country="Bangladesh (বাংলাদেশ)">Bangladesh (বাংলাদেশ)<span>+880</span></li><li data-dial="+1" data-code="bb" data-country="Barbados">Barbados<span>+1</span></li><li data-dial="+375" data-code="by" data-country="Belarus (Беларусь)">Belarus (Беларусь)<span>+375</span></li><li data-dial="+32" data-code="be" data-country="Belgium (België)">Belgium (België)<span>+32</span></li><li data-dial="+501" data-code="bz" data-country="Belize">Belize<span>+501</span></li><li data-dial="+229" data-code="bj" data-country="Benin (Bénin)">Benin (Bénin)<span>+229</span></li><li data-dial="+1" data-code="bm" data-country="Bermuda">Bermuda<span>+1</span></li><li data-dial="+975" data-code="bt" data-country="Bhutan (འབྲུག)">Bhutan (འབྲུག)<span>+975</span></li><li data-dial="+591" data-code="bo" data-country="Bolivia">Bolivia<span>+591</span></li><li data-dial="+387" data-code="ba" data-country="Bosnia and Herzegovina (Босна и Херцеговина)">Bosnia and Herzegovina (Босна и Херцеговина)<span>+387</span></li><li data-dial="+267" data-code="bw" data-country="Botswana">Botswana<span>+267</span></li><li data-dial="+55" data-code="br" data-country="Brazil (Brasil)">Brazil (Brasil)<span>+55</span></li><li data-dial="+246" data-code="io" data-country="British Indian Ocean Territory">British Indian Ocean Territory<span>+246</span></li><li data-dial="+1" data-code="vg" data-country="British Virgin Islands">British Virgin Islands<span>+1</span></li><li data-dial="+673" data-code="bn" data-country="Brunei">Brunei<span>+673</span></li><li data-dial="+359" data-code="bg" data-country="Bulgaria (България)">Bulgaria (България)<span>+359</span></li><li data-dial="+226" data-code="bf" data-country="Burkina Faso">Burkina Faso<span>+226</span></li><li data-dial="+257" data-code="bi" data-country="Burundi (Uburundi)">Burundi (Uburundi)<span>+257</span></li><li data-dial="+855" data-code="kh" data-country="Cambodia (កម្ពុជា)">Cambodia (កម្ពុជា)<span>+855</span></li><li data-dial="+237" data-code="cm" data-country="Cameroon (Cameroun)">Cameroon (Cameroun)<span>+237</span></li><li data-dial="+1" data-code="ca" data-country="Canada">Canada<span>+1</span></li><li data-dial="+238" data-code="cv" data-country="Cape Verde (Kabu Verdi)">Cape Verde (Kabu Verdi)<span>+238</span></li><li data-dial="+599" data-code="bq" data-country="Caribbean Netherlands">Caribbean Netherlands<span>+599</span></li><li data-dial="+1" data-code="ky" data-country="Cayman Islands">Cayman Islands<span>+1</span></li><li data-dial="+236" data-code="cf" data-country="Central African Republic (République centrafricaine)">Central African Republic (République centrafricaine)<span>+236</span></li><li data-dial="+235" data-code="td" data-country="Chad (Tchad)">Chad (Tchad)<span>+235</span></li><li data-dial="+56" data-code="cl" data-country="Chile">Chile<span>+56</span></li><li data-dial="+86" data-code="cn" data-country="China (中国)">China (中国)<span>+86</span></li><li data-dial="+61" data-code="cx" data-country="Christmas Island">Christmas Island<span>+61</span></li><li data-dial="+61" data-code="cc" data-country="Cocos (Keeling) Islands">Cocos (Keeling) Islands<span>+61</span></li><li data-dial="+57" data-code="co" data-country="Colombia">Colombia<span>+57</span></li><li data-dial="+269" data-code="km" data-country="Comoros (جزر القمر‎)">Comoros (جزر القمر‎)<span>+269</span></li><li data-dial="+243" data-code="cd" data-country="Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)<span>+243</span></li><li data-dial="+242" data-code="cg" data-country="Congo (Republic) (Congo-Brazzaville)">Congo (Republic) (Congo-Brazzaville)<span>+242</span></li><li data-dial="+682" data-code="ck" data-country="Cook Islands">Cook Islands<span>+682</span></li><li data-dial="+506" data-code="cr" data-country="Costa Rica">Costa Rica<span>+506</span></li><li data-dial="+225" data-code="ci" data-country="Côte d’Ivoire">Côte d’Ivoire<span>+225</span></li><li data-dial="+385" data-code="hr" data-country="Croatia (Hrvatska)">Croatia (Hrvatska)<span>+385</span></li><li data-dial="+53" data-code="cu" data-country="Cuba">Cuba<span>+53</span></li><li data-dial="+599" data-code="cw" data-country="Curaçao">Curaçao<span>+599</span></li><li data-dial="+357" data-code="cy" data-country="Cyprus (Κύπρος)">Cyprus (Κύπρος)<span>+357</span></li><li data-dial="+420" data-code="cz" data-country="Czech Republic (Česká republika)">Czech Republic (Česká republika)<span>+420</span></li><li data-dial="+45" data-code="dk" data-country="Denmark (Danmark)">Denmark (Danmark)<span>+45</span></li><li data-dial="+253" data-code="dj" data-country="Djibouti">Djibouti<span>+253</span></li><li data-dial="+1" data-code="dm" data-country="Dominica">Dominica<span>+1</span></li><li data-dial="+1" data-code="do" data-country="Dominican Republic (República Dominicana)">Dominican Republic (República Dominicana)<span>+1</span></li><li data-dial="+593" data-code="ec" data-country="Ecuador">Ecuador<span>+593</span></li><li data-dial="+20" data-code="eg" data-country="Egypt (مصر‎)">Egypt (مصر‎)<span>+20</span></li><li data-dial="+503" data-code="sv" data-country="El Salvador">El Salvador<span>+503</span></li><li data-dial="+240" data-code="gq" data-country="Equatorial Guinea (Guinea Ecuatorial)">Equatorial Guinea (Guinea Ecuatorial)<span>+240</span></li><li data-dial="+291" data-code="er" data-country="Eritrea">Eritrea<span>+291</span></li><li data-dial="+372" data-code="ee" data-country="Estonia (Eesti)">Estonia (Eesti)<span>+372</span></li><li data-dial="+268" data-code="sz" data-country="Eswatini">Eswatini<span>+268</span></li><li data-dial="+251" data-code="et" data-country="Ethiopia">Ethiopia<span>+251</span></li><li data-dial="+500" data-code="fk" data-country="Falkland Islands (Islas Malvinas)">Falkland Islands (Islas Malvinas)<span>+500</span></li><li data-dial="+298" data-code="fo" data-country="Faroe Islands (Føroyar)">Faroe Islands (Føroyar)<span>+298</span></li><li data-dial="+679" data-code="fj" data-country="Fiji">Fiji<span>+679</span></li><li data-dial="+358" data-code="fi" data-country="Finland (Suomi)">Finland (Suomi)<span>+358</span></li><li data-dial="+33" data-code="fr" data-country="France">France<span>+33</span></li><li data-dial="+594" data-code="gf" data-country="French Guiana (Guyane française)">French Guiana (Guyane française)<span>+594</span></li><li data-dial="+689" data-code="pf" data-country="French Polynesia (Polynésie française)">French Polynesia (Polynésie française)<span>+689</span></li><li data-dial="+241" data-code="ga" data-country="Gabon">Gabon<span>+241</span></li><li data-dial="+220" data-code="gm" data-country="Gambia">Gambia<span>+220</span></li><li data-dial="+995" data-code="ge" data-country="Georgia (საქართველო)">Georgia (საქართველო)<span>+995</span></li><li data-dial="+49" data-code="de" data-country="Germany (Deutschland)">Germany (Deutschland)<span>+49</span></li><li data-dial="+233" data-code="gh" data-country="Ghana (Gaana)">Ghana (Gaana)<span>+233</span></li><li data-dial="+350" data-code="gi" data-country="Gibraltar">Gibraltar<span>+350</span></li><li data-dial="+30" data-code="gr" data-country="Greece (Ελλάδα)">Greece (Ελλάδα)<span>+30</span></li><li data-dial="+299" data-code="gl" data-country="Greenland (Kalaallit Nunaat)">Greenland (Kalaallit Nunaat)<span>+299</span></li><li data-dial="+1" data-code="gd" data-country="Grenada">Grenada<span>+1</span></li><li data-dial="+590" data-code="gp" data-country="Guadeloupe">Guadeloupe<span>+590</span></li><li data-dial="+1" data-code="gu" data-country="Guam">Guam<span>+1</span></li><li data-dial="+502" data-code="gt" data-country="Guatemala">Guatemala<span>+502</span></li><li data-dial="+44" data-code="gg" data-country="Guernsey">Guernsey<span>+44</span></li><li data-dial="+224" data-code="gn" data-country="Guinea (Guinée)">Guinea (Guinée)<span>+224</span></li><li data-dial="+245" data-code="gw" data-country="Guinea-Bissau (Guiné Bissau)">Guinea-Bissau (Guiné Bissau)<span>+245</span></li><li data-dial="+592" data-code="gy" data-country="Guyana">Guyana<span>+592</span></li><li data-dial="+509" data-code="ht" data-country="Haiti">Haiti<span>+509</span></li><li data-dial="+504" data-code="hn" data-country="Honduras">Honduras<span>+504</span></li><li data-dial="+852" data-code="hk" data-country="Hong Kong (香港)">Hong Kong (香港)<span>+852</span></li><li data-dial="+36" data-code="hu" data-country="Hungary (Magyarország)">Hungary (Magyarország)<span>+36</span></li><li data-dial="+354" data-code="is" data-country="Iceland (Ísland)">Iceland (Ísland)<span>+354</span></li><li data-dial="+91" data-code="in" data-country="India (भारत)">India (भारत)<span>+91</span></li><li data-dial="+62" data-code="id" data-country="Indonesia">Indonesia<span>+62</span></li><li data-dial="+98" data-code="ir" data-country="Iran (ایران‎)">Iran (ایران‎)<span>+98</span></li><li data-dial="+964" data-code="iq" data-country="Iraq (العراق‎)">Iraq (العراق‎)<span>+964</span></li><li data-dial="+353" data-code="ie" data-country="Ireland">Ireland<span>+353</span></li><li data-dial="+44" data-code="im" data-country="Isle of Man">Isle of Man<span>+44</span></li><li data-dial="+972" data-code="il" data-country="Israel (ישראל‎)">Israel (ישראל‎)<span>+972</span></li><li data-dial="+39" data-code="it" data-country="Italy (Italia)">Italy (Italia)<span>+39</span></li><li data-dial="+1" data-code="jm" data-country="Jamaica">Jamaica<span>+1</span></li><li data-dial="+81" data-code="jp" data-country="Japan (日本)">Japan (日本)<span>+81</span></li><li data-dial="+44" data-code="je" data-country="Jersey">Jersey<span>+44</span></li><li data-dial="+962" data-code="jo" data-country="Jordan (الأردن‎)">Jordan (الأردن‎)<span>+962</span></li><li data-dial="+7" data-code="kz" data-country="Kazakhstan (Казахстан)">Kazakhstan (Казахстан)<span>+7</span></li><li data-dial="+254" data-code="ke" data-country="Kenya">Kenya<span>+254</span></li><li data-dial="+686" data-code="ki" data-country="Kiribati">Kiribati<span>+686</span></li><li data-dial="+383" data-code="xk" data-country="Kosovo">Kosovo<span>+383</span></li><li data-dial="+965" data-code="kw" data-country="Kuwait (الكويت‎)">Kuwait (الكويت‎)<span>+965</span></li><li data-dial="+996" data-code="kg" data-country="Kyrgyzstan (Кыргызстан)">Kyrgyzstan (Кыргызстан)<span>+996</span></li><li data-dial="+856" data-code="la" data-country="Laos (ລາວ)">Laos (ລາວ)<span>+856</span></li><li data-dial="+371" data-code="lv" data-country="Latvia (Latvija)">Latvia (Latvija)<span>+371</span></li><li data-dial="+961" data-code="lb" data-country="Lebanon (لبنان‎)">Lebanon (لبنان‎)<span>+961</span></li><li data-dial="+266" data-code="ls" data-country="Lesotho">Lesotho<span>+266</span></li><li data-dial="+231" data-code="lr" data-country="Liberia">Liberia<span>+231</span></li><li data-dial="+218" data-code="ly" data-country="Libya (ليبيا‎)">Libya (ليبيا‎)<span>+218</span></li><li data-dial="+423" data-code="li" data-country="Liechtenstein">Liechtenstein<span>+423</span></li><li data-dial="+370" data-code="lt" data-country="Lithuania (Lietuva)">Lithuania (Lietuva)<span>+370</span></li><li data-dial="+352" data-code="lu" data-country="Luxembourg">Luxembourg<span>+352</span></li><li data-dial="+853" data-code="mo" data-country="Macau (澳門)">Macau (澳門)<span>+853</span></li><li data-dial="+389" data-code="mk" data-country="Macedonia (FYROM) (Македонија)">Macedonia (FYROM) (Македонија)<span>+389</span></li><li data-dial="+261" data-code="mg" data-country="Madagascar (Madagasikara)">Madagascar (Madagasikara)<span>+261</span></li><li data-dial="+265" data-code="mw" data-country="Malawi">Malawi<span>+265</span></li><li data-dial="+60" data-code="my" data-country="Malaysia">Malaysia<span>+60</span></li><li data-dial="+960" data-code="mv" data-country="Maldives">Maldives<span>+960</span></li><li data-dial="+223" data-code="ml" data-country="Mali">Mali<span>+223</span></li><li data-dial="+356" data-code="mt" data-country="Malta">Malta<span>+356</span></li><li data-dial="+692" data-code="mh" data-country="Marshall Islands">Marshall Islands<span>+692</span></li><li data-dial="+596" data-code="mq" data-country="Martinique">Martinique<span>+596</span></li><li data-dial="+222" data-code="mr" data-country="Mauritania (موريتانيا‎)">Mauritania (موريتانيا‎)<span>+222</span></li><li data-dial="+230" data-code="mu" data-country="Mauritius (Moris)">Mauritius (Moris)<span>+230</span></li><li data-dial="+262" data-code="yt" data-country="Mayotte">Mayotte<span>+262</span></li><li data-dial="+52" data-code="mx" data-country="Mexico (México)">Mexico (México)<span>+52</span></li><li data-dial="+691" data-code="fm" data-country="Micronesia">Micronesia<span>+691</span></li><li data-dial="+373" data-code="md" data-country="Moldova (Republica Moldova)">Moldova (Republica Moldova)<span>+373</span></li><li data-dial="+377" data-code="mc" data-country="Monaco">Monaco<span>+377</span></li><li data-dial="+976" data-code="mn" data-country="Mongolia (Монгол)">Mongolia (Монгол)<span>+976</span></li><li data-dial="+382" data-code="me" data-country="Montenegro (Crna Gora)">Montenegro (Crna Gora)<span>+382</span></li><li data-dial="+1" data-code="ms" data-country="Montserrat">Montserrat<span>+1</span></li><li data-dial="+212" data-code="ma" data-country="Morocco (المغرب‎)">Morocco (المغرب‎)<span>+212</span></li><li data-dial="+258" data-code="mz" data-country="Mozambique (Moçambique)">Mozambique (Moçambique)<span>+258</span></li><li data-dial="+95" data-code="mm" data-country="Myanmar (Burma) (မြန်မာ)">Myanmar (Burma) (မြန်မာ)<span>+95</span></li><li data-dial="+264" data-code="na" data-country="Namibia (Namibië)">Namibia (Namibië)<span>+264</span></li><li data-dial="+674" data-code="nr" data-country="Nauru">Nauru<span>+674</span></li><li data-dial="+977" data-code="np" data-country="Nepal (नेपाल)">Nepal (नेपाल)<span>+977</span></li><li data-dial="+31" data-code="nl" data-country="Netherlands (Nederland)">Netherlands (Nederland)<span>+31</span></li><li data-dial="+687" data-code="nc" data-country="New Caledonia (Nouvelle-Calédonie)">New Caledonia (Nouvelle-Calédonie)<span>+687</span></li><li data-dial="+64" data-code="nz" data-country="New Zealand">New Zealand<span>+64</span></li><li data-dial="+505" data-code="ni" data-country="Nicaragua">Nicaragua<span>+505</span></li><li data-dial="+227" data-code="ne" data-country="Niger (Nijar)">Niger (Nijar)<span>+227</span></li><li data-dial="+234" data-code="ng" data-country="Nigeria">Nigeria<span>+234</span></li><li data-dial="+683" data-code="nu" data-country="Niue">Niue<span>+683</span></li><li data-dial="+672" data-code="nf" data-country="Norfolk Island">Norfolk Island<span>+672</span></li><li data-dial="+850" data-code="kp" data-country="North Korea (조선 민주주의 인민 공화국)">North Korea (조선 민주주의 인민 공화국)<span>+850</span></li><li data-dial="+1" data-code="mp" data-country="Northern Mariana Islands">Northern Mariana Islands<span>+1</span></li><li data-dial="+47" data-code="no" data-country="Norway (Norge)">Norway (Norge)<span>+47</span></li><li data-dial="+968" data-code="om" data-country="Oman (عُمان‎)">Oman (عُمان‎)<span>+968</span></li><li data-dial="+92" data-code="pk" data-country="Pakistan (پاکستان‎)">Pakistan (پاکستان‎)<span>+92</span></li><li data-dial="+680" data-code="pw" data-country="Palau">Palau<span>+680</span></li><li data-dial="+970" data-code="ps" data-country="Palestine (فلسطين‎)">Palestine (فلسطين‎)<span>+970</span></li><li data-dial="+507" data-code="pa" data-country="Panama (Panamá)">Panama (Panamá)<span>+507</span></li><li data-dial="+675" data-code="pg" data-country="Papua New Guinea">Papua New Guinea<span>+675</span></li><li data-dial="+595" data-code="py" data-country="Paraguay">Paraguay<span>+595</span></li><li data-dial="+51" data-code="pe" data-country="Peru (Perú)">Peru (Perú)<span>+51</span></li><li data-dial="+63" data-code="ph" data-country="Philippines">Philippines<span>+63</span></li><li data-dial="+48" data-code="pl" data-country="Poland (Polska)">Poland (Polska)<span>+48</span></li><li data-dial="+351" data-code="pt" data-country="Portugal">Portugal<span>+351</span></li><li data-dial="+1" data-code="pr" data-country="Puerto Rico">Puerto Rico<span>+1</span></li><li data-dial="+974" data-code="qa" data-country="Qatar (قطر‎)">Qatar (قطر‎)<span>+974</span></li><li data-dial="+262" data-code="re" data-country="Réunion (La Réunion)">Réunion (La Réunion)<span>+262</span></li><li data-dial="+40" data-code="ro" data-country="Romania (România)">Romania (România)<span>+40</span></li><li data-dial="+7" data-code="ru" data-country="Russia (Россия)">Russia (Россия)<span>+7</span></li><li data-dial="+250" data-code="rw" data-country="Rwanda">Rwanda<span>+250</span></li><li data-dial="+590" data-code="bl" data-country="Saint Barthélemy">Saint Barthélemy<span>+590</span></li><li data-dial="+290" data-code="sh" data-country="Saint Helena">Saint Helena<span>+290</span></li><li data-dial="+1" data-code="kn" data-country="Saint Kitts and Nevis">Saint Kitts and Nevis<span>+1</span></li><li data-dial="+1" data-code="lc" data-country="Saint Lucia">Saint Lucia<span>+1</span></li><li data-dial="+590" data-code="mf" data-country="Saint Martin (Saint-Martin (partie française))">Saint Martin (Saint-Martin (partie française))<span>+590</span></li><li data-dial="+508" data-code="pm" data-country="Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)">Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)<span>+508</span></li><li data-dial="+1" data-code="vc" data-country="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines<span>+1</span></li><li data-dial="+685" data-code="ws" data-country="Samoa">Samoa<span>+685</span></li><li data-dial="+378" data-code="sm" data-country="San Marino">San Marino<span>+378</span></li><li data-dial="+239" data-code="st" data-country="São Tomé and Príncipe (São Tomé e Príncipe)">São Tomé and Príncipe (São Tomé e Príncipe)<span>+239</span></li><li data-dial="+966" data-code="sa" data-country="Saudi Arabia (المملكة العربية السعودية‎)">Saudi Arabia (المملكة العربية السعودية‎)<span>+966</span></li><li data-dial="+221" data-code="sn" data-country="Senegal (Sénégal)">Senegal (Sénégal)<span>+221</span></li><li data-dial="+381" data-code="rs" data-country="Serbia (Србија)">Serbia (Србија)<span>+381</span></li><li data-dial="+248" data-code="sc" data-country="Seychelles">Seychelles<span>+248</span></li><li data-dial="+232" data-code="sl" data-country="Sierra Leone">Sierra Leone<span>+232</span></li><li data-dial="+65" data-code="sg" data-country="Singapore">Singapore<span>+65</span></li><li data-dial="+1" data-code="sx" data-country="Sint Maarten">Sint Maarten<span>+1</span></li><li data-dial="+421" data-code="sk" data-country="Slovakia (Slovensko)">Slovakia (Slovensko)<span>+421</span></li><li data-dial="+386" data-code="si" data-country="Slovenia (Slovenija)">Slovenia (Slovenija)<span>+386</span></li><li data-dial="+677" data-code="sb" data-country="Solomon Islands">Solomon Islands<span>+677</span></li><li data-dial="+252" data-code="so" data-country="Somalia (Soomaaliya)">Somalia (Soomaaliya)<span>+252</span></li><li data-dial="+27" data-code="za" data-country="South Africa">South Africa<span>+27</span></li><li data-dial="+82" data-code="kr" data-country="South Korea (대한민국)">South Korea (대한민국)<span>+82</span></li><li data-dial="+211" data-code="ss" data-country="South Sudan (جنوب السودان‎)">South Sudan (جنوب السودان‎)<span>+211</span></li><li data-dial="+34" data-code="es" data-country="Spain (España)">Spain (España)<span>+34</span></li><li data-dial="+94" data-code="lk" data-country="Sri Lanka (ශ්‍රී ලංකාව)">Sri Lanka (ශ්‍රී ලංකාව)<span>+94</span></li><li data-dial="+249" data-code="sd" data-country="Sudan (السودان‎)">Sudan (السودان‎)<span>+249</span></li><li data-dial="+597" data-code="sr" data-country="Suriname">Suriname<span>+597</span></li><li data-dial="+47" data-code="sj" data-country="Svalbard and Jan Mayen">Svalbard and Jan Mayen<span>+47</span></li><li data-dial="+46" data-code="se" data-country="Sweden (Sverige)">Sweden (Sverige)<span>+46</span></li><li data-dial="+41" data-code="ch" data-country="Switzerland (Schweiz)">Switzerland (Schweiz)<span>+41</span></li><li data-dial="+963" data-code="sy" data-country="Syria (سوريا‎)">Syria (سوريا‎)<span>+963</span></li><li data-dial="+886" data-code="tw" data-country="Taiwan (台灣)">Taiwan (台灣)<span>+886</span></li><li data-dial="+992" data-code="tj" data-country="Tajikistan">Tajikistan<span>+992</span></li><li data-dial="+255" data-code="tz" data-country="Tanzania">Tanzania<span>+255</span></li><li data-dial="+66" data-code="th" data-country="Thailand (ไทย)">Thailand (ไทย)<span>+66</span></li><li data-dial="+670" data-code="tl" data-country="Timor-Leste">Timor-Leste<span>+670</span></li><li data-dial="+228" data-code="tg" data-country="Togo">Togo<span>+228</span></li><li data-dial="+690" data-code="tk" data-country="Tokelau">Tokelau<span>+690</span></li><li data-dial="+676" data-code="to" data-country="Tonga">Tonga<span>+676</span></li><li data-dial="+1" data-code="tt" data-country="Trinidad and Tobago">Trinidad and Tobago<span>+1</span></li><li data-dial="+216" data-code="tn" data-country="Tunisia (تونس‎)">Tunisia (تونس‎)<span>+216</span></li><li data-dial="+90" data-code="tr" data-country="Turkey (Türkiye)">Turkey (Türkiye)<span>+90</span></li><li data-dial="+993" data-code="tm" data-country="Turkmenistan">Turkmenistan<span>+993</span></li><li data-dial="+1" data-code="tc" data-country="Turks and Caicos Islands">Turks and Caicos Islands<span>+1</span></li><li data-dial="+688" data-code="tv" data-country="Tuvalu">Tuvalu<span>+688</span></li><li data-dial="+1" data-code="vi" data-country="U.S. Virgin Islands">U.S. Virgin Islands<span>+1</span></li><li data-dial="+256" data-code="ug" data-country="Uganda">Uganda<span>+256</span></li><li data-dial="+380" data-code="ua" data-country="Ukraine (Україна)">Ukraine (Україна)<span>+380</span></li><li data-dial="+971" data-code="ae" data-country="United Arab Emirates (الإمارات العربية المتحدة‎)">United Arab Emirates (الإمارات العربية المتحدة‎)<span>+971</span></li><li data-dial="+44" data-code="gb" data-country="United Kingdom">United Kingdom<span>+44</span></li><li data-dial="+1" data-code="us" data-country="United States">United States<span>+1</span></li><li data-dial="+598" data-code="uy" data-country="Uruguay">Uruguay<span>+598</span></li><li data-dial="+998" data-code="uz" data-country="Uzbekistan (Oʻzbekiston)">Uzbekistan (Oʻzbekiston)<span>+998</span></li><li data-dial="+678" data-code="vu" data-country="Vanuatu">Vanuatu<span>+678</span></li><li data-dial="+39" data-code="va" data-country="Vatican City (Città del Vaticano)">Vatican City (Città del Vaticano)<span>+39</span></li><li data-dial="+58" data-code="ve" data-country="Venezuela">Venezuela<span>+58</span></li><li data-dial="+84" data-code="vn" data-country="Vietnam (Việt Nam)">Vietnam (Việt Nam)<span>+84</span></li><li data-dial="+681" data-code="wf" data-country="Wallis and Futuna (Wallis-et-Futuna)">Wallis and Futuna (Wallis-et-Futuna)<span>+681</span></li><li data-dial="+212" data-code="eh" data-country="Western Sahara (الصحراء الغربية‎)">Western Sahara (الصحراء الغربية‎)<span>+212</span></li><li data-dial="+967" data-code="ye" data-country="Yemen (اليمن‎)">Yemen (اليمن‎)<span>+967</span></li><li data-dial="+260" data-code="zm" data-country="Zambia">Zambia<span>+260</span></li><li data-dial="+263" data-code="zw" data-country="Zimbabwe">Zimbabwe<span>+263</span></li><li data-dial="+358" data-code="ax" data-country="Åland Islands">Åland Islands<span>+358</span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-dropdown">
<div class="form-field" data-param="dropdown" data-idx="{idx}">
    <div class="form-control">
        <div class="form-field-dropdown">
            <select class="data-field" data-required="{required}"><option value="">{title}</option>{options}</select>
            <span class=""><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M11 7.994c0-.266-.106-.486-.323-.695l-4.21-4.06A.807.807 0 005.87 3a.855.855 0 00-.87.846.856.856 0 00.276.626l3.681 3.522-3.68 3.53a.87.87 0 00-.277.624.86.86 0 00.87.852.858.858 0 00.598-.243l4.215-4.062c.217-.214.317-.434.317-.7z"></path></svg></span>
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-text">
<div class="form-field" data-param="text" data-idx="{idx}">
    <div class="form-control">
        <textarea data-required="{required}" class="data-field" placeholder="{title}"></textarea>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-regions">
<div class="form-field" data-param="regions" data-idx="{idx}">
    <div class="form-control">
        <div class="form-field-regions">
            <select class="data-field" data-required="{required}"><option value="">{title}</option>
            <option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Antigua & Deps">Antigua & Deps</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia Herzegovina">Bosnia Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina">Burkina</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Central African Rep">Central African Rep</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo (Democratic Rep)">Congo (Democratic Rep)</option><option value="Costa Rica">Costa Rica</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="East Timor">East Timor</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Greece">Greece</option><option value="Grenada">Grenada</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Honduras">Honduras</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option><option value="Ireland {Republic}">Ireland {Republic}</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Ivory Coast">Ivory Coast</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea North">Korea North</option><option value="Korea South">Korea South</option><option value="Kosovo">Kosovo</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macedonia">Macedonia</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mexico">Mexico</option><option value="Micronesia">Micronesia</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar, (Burma)">Myanmar, (Burma)</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Qatar">Qatar</option><option value="Romania">Romania</option><option value="Russian Federation">Russian Federation</option><option value="Rwanda">Rwanda</option><option value="St Kitts & Nevis">St Kitts & Nevis</option><option value="St Lucia">St Lucia</option><option value="Saint Vincent & the Grenadines">Saint Vincent & the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome & Principe">Sao Tome & Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Sudan">South Sudan</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option><option value="Tonga">Tonga</option><option value="Trinidad & Tobago">Trinidad & Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Vatican City">Vatican City</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option>
            </select>
            <span class=""><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M11 7.994c0-.266-.106-.486-.323-.695l-4.21-4.06A.807.807 0 005.87 3a.855.855 0 00-.87.846.856.856 0 00.276.626l3.681 3.522-3.68 3.53a.87.87 0 00-.277.624.86.86 0 00.87.852.858.858 0 00.598-.243l4.215-4.062c.217-.214.317-.434.317-.7z"></path></svg></span>
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-radio">
<div class="form-field" data-param="radio" data-idx="{idx}">
    <div class="form-control">
        <div class="form-field-radio data-field" data-required="{required}">
            <div class="form-field-radio-title">{title}</div>
            {options}
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-radio-option">
<div class="form-field-radio-option"><input type="radio" id="{id}" name="{name}" value="{option}"><label for="{id}">{option}</label></div>
</script>
<script type="text/plain" id="form-field-checkbox">
<div class="form-field" data-param="checkbox" data-idx="{idx}">
    <div class="form-control">
        <div class="form-field-checkbox data-field" data-required="{required}">
            <div class="form-field-checkbox-title">{title}</div>
            {options}
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-checkbox-option">
<div class="form-field-checkbox-option"><input type="checkbox" id="{id}" name="{name}" value="{option}"><label for="{id}">{option}</label></div>
</script>
<script type="text/plain" id="form-field-date">
<div class="form-field" data-param="date" data-idx="{idx}">
    <div class="form-control">
        <div class="form-field-date">
            <input readonly class="data-field" data-required="{required}" type="text" placeholder="{title}">
            <span class=""><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M11 7.994c0-.266-.106-.486-.323-.695l-4.21-4.06A.807.807 0 005.87 3a.855.855 0 00-.87.846.856.856 0 00.276.626l3.681 3.522-3.68 3.53a.87.87 0 00-.277.624.86.86 0 00.87.852.858.858 0 00.598-.243l4.215-4.062c.217-.214.317-.434.317-.7z"></path></svg></span>
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-field-time">
<div class="form-field" data-param="time" data-idx="{idx}">
    <div class="form-control">
        <div class="form-field-time">
            <input readonly class="data-field" data-required="{required}" type="text" placeholder="{title}">
            <span class=""><svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M11 7.994c0-.266-.106-.486-.323-.695l-4.21-4.06A.807.807 0 005.87 3a.855.855 0 00-.87.846.856.856 0 00.276.626l3.681 3.522-3.68 3.53a.87.87 0 00-.277.624.86.86 0 00.87.852.858.858 0 00.598-.243l4.215-4.062c.217-.214.317-.434.317-.7z"></path></svg></span>
        </div>
    </div>
</div>
</script>
<script type="text/plain" id="form-detail">
<div class="form-control form-title" data-param="title">
    <div class="data-field"></div>
</div>
<div class="form-fields-group">
</div>
<div class="form-fields-actions">
    <div class="g-recaptcha" id="html_element" data-sitekey="6LfaZcUeAAAAAA0z_1PqUUL0E_0fUZFpMOqfASt1" data-callback="onSubmit" data-size="invisible"></div>
    <div class="form-submit-terms"><p>By submitting your contact details, you are providing your data to {0} who may contact you.</p></div>
    <div class="form-button form-submit form-control" data-param="submit">
        <button class="form-event data-field"></button>
    </div>
    <div class="form-thanks" data-param="thanks_text">
        <span></span>
    </div>
</div>
</script><script type="text/plain" id="rss-feed">
<div class="rss-feed-item embed-item">
    <div class="rss-feed-item-logo"><img src="{logo}" alt="{platform}"></div>
    <div class="rss-feed-item-title">{title}</div>
    <div class="rss-feed-item-share"><a href="{link}" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"><defs><clipPath id="clip-path"><rect x="5.6" y="5.52" width="116.8" height="116.96"/></clipPath></defs><g><path d="M99.28,122.32H28.64a23.07,23.07,0,0,1-23-23V28.64a23.07,23.07,0,0,1,23-23H64a4.61,4.61,0,0,1,0,9.21H28.64A13.85,13.85,0,0,0,14.81,28.64V99.29a13.85,13.85,0,0,0,13.82,13.82H99.28A13.85,13.85,0,0,0,113.1,99.29V64a4.61,4.61,0,1,1,9.21,0V99.29a23.07,23.07,0,0,1-23,23Zm0,0"/><path d="M62.42,70.11a4.64,4.64,0,0,1-3.26-1.35,4.58,4.58,0,0,1,0-6.51L114.45,7A4.61,4.61,0,0,1,121,13.47L65.68,68.75a4.64,4.64,0,0,1-3.26,1.35Zm0,0"/></g><path d="M117.71,14.82H93.14a4.61,4.61,0,0,1,0-9.21h24.57a4.61,4.61,0,1,1,0,9.21Zm0,0"/><path d="M117.71,39.39a4.61,4.61,0,0,1-4.61-4.61V10.21a4.61,4.61,0,0,1,9.21,0V34.78a4.61,4.61,0,0,1-4.61,4.61Zm0,0"/></svg></a></div>
</div>
</script><script type="text/plain" id="embed-verify">
<div class="embed-verify"><div class="embed-verify-title">{0}</div><p>This Linkfly is protected by reCAPTCHA and the Google <a style="color:#0a0b0d;" href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a style="color:#0a0b0d;" href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.</p><div class="g-recaptcha" data-sitekey="6LfaZcUeAAAAAA0z_1PqUUL0E_0fUZFpMOqfASt1" data-callback="onSubmit" data-size="invisible"></div></div>
</script><script type="text/plain" id="musicItemTmpl">
<div class="cmpt-item item-music"><div class="ctm-style"><div class="music-box"><iframe src="{embed}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture"></iframe></div></div></div>
</script><script type="text/plain" id="podcastItemTmpl">
<div class="cmpt-item item-podcast"><div class="ctm-style"><div class="podcast-box"><iframe src="{embed}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture"></iframe></div></div></div>
</script><script type="text/plain" id="podcastGoogleItemTmpl">
<div class="cmpt-item item-podcast"><div class="ctm-style"><div class="item-box podcast-box"><div class="podcast-header">
<div class="podcast-logo"><img src="{thumbnailUrl}" alt="{title} - {artistName}"></div>
<div class="podcast-text">
    <div class="podcast-text--title">{title}</div>
    <div class="podcast-text--artist">{artistName}</div>
    <div class="podcast-text--desc">
        <p>{description}</p>
        <p><button action="showDescMore/.podcast-text" toggle="more">Show More</button></p>
    </div>
</div>
<div class="podcast-platforms">
    <div class="podcast-platforms-action">
        <div class="podcast-platforms--tips">Listen on</div>
        <div class="podcast-platforms--buttons">
            <button class="showall {display}" toggle="showall" action="podcast/google/.link-podcast">See all</button>
            <button disabled class="scroll left" toggle="scroll" action="left/.podcast-platforms/.podcast-platforms--list"><div style="transform: rotate(180deg);"><svg viewBox="0 0 6 10" enable-background="new 0 0 24 24"><path d="M6 4.99986C5.99413 4.73335 5.9002 4.51898 5.6771 4.30461L1.46771 0.2432C1.30333 0.0809751 1.10959 -0.000137329 0.868885 -0.000137329C0.387476 -0.000137329 0 0.38225 0 0.851543C0 1.08329 0.0939335 1.30345 0.27593 1.47727L3.95695 4.99407L0.27593 8.52246C0.0998043 8.69627 0 8.91064 0 9.14818C0 9.61748 0.387476 9.99986 0.868885 9.99986C1.10372 9.99986 1.30333 9.92454 1.46771 9.75653L5.6771 5.69511C5.9002 5.48074 6 5.26058 6 4.99986Z"></path></svg></div></button>
            <button class="scroll right" toggle="scroll" action="right/.podcast-platforms/.podcast-platforms--list"><div><svg viewBox="0 0 6 10" enable-background="new 0 0 24 24"><path d="M6 4.99986C5.99413 4.73335 5.9002 4.51898 5.6771 4.30461L1.46771 0.2432C1.30333 0.0809751 1.10959 -0.000137329 0.868885 -0.000137329C0.387476 -0.000137329 0 0.38225 0 0.851543C0 1.08329 0.0939335 1.30345 0.27593 1.47727L3.95695 4.99407L0.27593 8.52246C0.0998043 8.69627 0 8.91064 0 9.14818C0 9.61748 0.387476 9.99986 0.868885 9.99986C1.10372 9.99986 1.30333 9.92454 1.46771 9.75653L5.6771 5.69511C5.9002 5.48074 6 5.26058 6 4.99986Z"></path></svg></div></button>
        </div>
    </div>
    <div class="podcast-platforms--list">
        {linksHtml}
    </div>
</div>
<div class="podcast-recent">
   <div class="podcast-recent--title">Recent episodes</div>
   <div class="podcast-recent--list">
   </div>
</div>
</div></div></div></div>
</script><script type="text/plain" id="podcastGoogleItemTmpl2">
<div class="podcast-recent--item">
    <a href="{url}" target="_blank">
        <div class="recent-item--thumbnail"><img src="{thumbnailUrl}" alt="{title}"></div>
        <div class="recent-item--text">
        <p class="recent-item--title">{title}</p>
        <p class="recent-item--date">{date} • {duration}</p>
        </div>
    </a>
</div>
</script><script type="text/plain" id="popupPodcastText">
<div class="popup-podcast">
    <div class="popup-header">
        <button></button>
        <button onclick="closePopup()"><i class="iconfont icon-close"></i></button>
    </div>
    <div class="popup-ctx">
        <p class="popup-ctx-title">{title}</p>
        <p class="popup-ctx-link">{artist}</p>
        <div class="popup-ctx-desc">
            <p class="popup-desc--tips">Show description</p>
            <p class="popup-desc--txt">{desc}</p>
        </div>
    </div>
    
</div>
</script><script type="text/plain" id="popupPodcastListenOn">
<div class="popup-podcast">
    <div class="popup-header">
        <p>Listen on</p>
        <button onclick="closePopup()"><i class="iconfont icon-close"></i></button>
    </div>
    <div class="popup-ctx">
        <div class="popup-podcast-listen">
        {html}
        </div>
    </div>
</div>
</script><script type="text/plain" id="typeformItemTmpl">
<div class="cmpt-item item-typeform"><div class="ctm-style"><div class="typeform-box"><iframe src="{embed}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture"></iframe></div></div></div>
</script><script type="text/plain" id="ytbSubItemTmpl">
<div class="cmpt-item item-ytbsub">
<div class="ctm-style">
    <div class="ytbsub-box">
        <div class="ytbsub-logo"><svg viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" focusable="false"><g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet"><g><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"></path><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path></g><g><g class="youtube-paths"><path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z"></path><path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z"></path><path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z"></path><path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z"></path><path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z"></path><path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z"></path><path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536C84.4777 18.7536 83.504 18.3185 82.9466 17.446C82.3869 16.5735 82.1094 15.2259 82.1094 13.4008V11.2136C82.1094 9.33452 82.3987 7.96105 82.9772 7.09558C83.5558 6.2301 84.5459 5.79736 85.9499 5.79736C86.9165 5.79736 87.6597 5.97375 88.1771 6.32888C88.6945 6.684 89.059 7.23433 89.2707 7.98457C89.4824 8.7348 89.5882 9.76961 89.5882 11.0913V13.2362H84.8657V13.8712ZM85.2232 7.96811C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z"></path></g></g></g></svg></div>
        <div class="ytb-channel">
            <div class="ytb-channel-avatar">
                <img src="{image}" alt="">
            </div>
            <div class="ytb-channel-info">
                <div class="ytb-channel-top">
                    <div class="ytb-channel-title">{title}</div>
                    <div class="ytb-channel-sub"><{nodeName} toggle="ytbsub" action="subscribe" href="{url}" data-type="8" data-kid="{id}" data-id="{lid}" target="{target}">Subscribe</{nodeName}></div>
                </div>
                <div class="ytb-channel-desc">{desc}</div>
            </div>
        </div>
    </div>
</div></div>
</script><script type="text/plain" id="cameoEmbedTmpl">
<div class="embed-cameo-user">
    <div class="embed-cameo-user--avatar">
        <img src="{imageUrl}" alt="{name}">
    </div>
    <div class="embed-cameo-user--text">
        <div class="embed-cameo-user--name">{name}</div>
        <div class="embed-cameo-user--bio">{bio}</div>
        <div class="embed-cameo-user--rate"><svg viewBox="0 0 1024 1024" width="128" height="128"><path d="M769.097 935.636c-4.457 0-8.93-1.063-13.026-3.216L512 804.104 267.93 932.42a28 28 0 0 1-40.627-29.518l46.614-271.776L76.46 438.653a27.999 27.999 0 0 1 15.519-47.76l272.878-39.651 122.035-247.27a27.998 27.998 0 0 1 50.216 0l122.035 247.27 272.878 39.651a28.002 28.002 0 0 1 15.518 47.76L750.083 631.126l46.613 271.776a28 28 0 0 1-27.599 32.734zM512 744.47c4.476 0 8.951 1.072 13.029 3.216l206.883 108.766-39.511-230.367a27.995 27.995 0 0 1 8.053-24.784l167.37-163.146-231.301-33.61a27.998 27.998 0 0 1-21.082-15.317L512 179.632 408.559 389.227a28 28 0 0 1-21.082 15.317l-231.301 33.61L323.547 601.3a28.004 28.004 0 0 1 8.053 24.784l-39.511 230.367L498.97 747.686A27.99 27.99 0 0 1 512 744.47z" p-id="1381"></path></svg> <span>{rate}</span> <span>reviews</span></div>
    </div>
</div>
<div class="embed-cameo-orders">
    <div class="embed-cameo-orders--box">
    <div class="embed-cameo-orders--list">
    {ordersHTML}
    </div>
    <div class="embed-cameo-orders--scroll">
    <button class="scroll left" toggle="transform" action="left/.embed-cameo-orders/.embed-cameo-orders--list/.embed-cameo-orders--item"><div style="transform: rotate(180deg);"><svg viewBox="0 0 6 10" enable-background="new 0 0 24 24"><path d="M6 4.99986C5.99413 4.73335 5.9002 4.51898 5.6771 4.30461L1.46771 0.2432C1.30333 0.0809751 1.10959 -0.000137329 0.868885 -0.000137329C0.387476 -0.000137329 0 0.38225 0 0.851543C0 1.08329 0.0939335 1.30345 0.27593 1.47727L3.95695 4.99407L0.27593 8.52246C0.0998043 8.69627 0 8.91064 0 9.14818C0 9.61748 0.387476 9.99986 0.868885 9.99986C1.10372 9.99986 1.30333 9.92454 1.46771 9.75653L5.6771 5.69511C5.9002 5.48074 6 5.26058 6 4.99986Z"></path></svg></div></button>
    <button class="scroll right" toggle="transform" action="right/.embed-cameo-orders/.embed-cameo-orders--list/.embed-cameo-orders--item"><div><svg viewBox="0 0 6 10" enable-background="new 0 0 24 24"><path d="M6 4.99986C5.99413 4.73335 5.9002 4.51898 5.6771 4.30461L1.46771 0.2432C1.30333 0.0809751 1.10959 -0.000137329 0.868885 -0.000137329C0.387476 -0.000137329 0 0.38225 0 0.851543C0 1.08329 0.0939335 1.30345 0.27593 1.47727L3.95695 4.99407L0.27593 8.52246C0.0998043 8.69627 0 8.91064 0 9.14818C0 9.61748 0.387476 9.99986 0.868885 9.99986C1.10372 9.99986 1.30333 9.92454 1.46771 9.75653L5.6771 5.69511C5.9002 5.48074 6 5.26058 6 4.99986Z"></path></svg></div></button>
    </div>
    </div>
</div>
<div class="embed-twitter-link"><p><a href="https://{link}?utm_medium=social&utm_source=linkfly&utm_campaign={buttonText}" target="_blank">View Profile</a></p></div>
</script><script type="text/plain" id="cameoEmbedItemTmpl">
<div class="embed-cameo-orders--item">
    <div class="embed-cameo-orders--bg">
        <video class="embed-cameo-orders--video" poster="{poster}" preload="none"><source src="{source}" type="video/mp4"></video>
        <div class="embed-cameo-orders--action">
        <button action="play/.embed-cameo-orders--item/video" toggle="play"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path d="M257 214l539.6 298L257 810V214m-15.9-75.2c-25.1 0-48.1 20.1-48.1 48.1v650.2c0 28 22.9 48.1 48.1 48.1 7.7 0 15.6-1.9 23.1-6.1L852.9 554c33.1-18.3 33.1-65.8 0-84L264.2 144.9c-7.5-4.2-15.4-6.1-23.1-6.1z"></path></svg></button>
        </div>
    </div>
</div>
</script><script type="text/plain" id="bandsintownEmbedTmpl">
<div class="embed-bandsintown-user">
    <div class="embed-bandsintown-user--avatar">
        <img src="{imageUrl}" alt="{name}">
    </div>
    <div class="embed-bandsintown-user--text">
        <div class="embed-bandsintown-user--name">{name}</div>
        <div class="embed-bandsintown-user--bio">{bio}</div>
    </div>
</div>
<div class="embed-bandsintown-events">
    <div class="embed-bandsintown-events--box">
    <div class="embed-bandsintown-events--list">
    {eventsHTML}
    </div>
    </div>
</div>
<div class="embed-twitter-link"><p><a href="https://{link}?utm_medium=social&utm_source=linkfly&utm_campaign=artist" target="_blank">{linkName}</a></p></div>
</script><script type="text/plain" id="bandsintownEmbedItemTmpl">
<div class="embed-bandsintown-events--item">
    <a href="{url}" target="_blank">
    <div class="embed-bandsintown-events--date">
    <p class="embed-bandsintown-events--month">{month}.</p>
    <p class="embed-bandsintown-events--day">{day}</p>
    </div>
    <div class="embed-bandsintown-event">
    <p class="embed-bandsintown-event--title">{title}</p>
    <p class="embed-bandsintown-event--location">{location} · {timeH}</p>
    </div>
    <div class="embed-bandsintown-events--share">
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M94.49 64.094c-16.598 0-29.996 13.398-29.996 29.997v835.918c0 16.599 13.398 29.997 29.997 29.997s29.997-13.398 29.997-29.997V94.091c0-16.499-13.399-29.997-29.997-29.997z"></path><path d="M930.41 900.012H94.49c-16.598 0-29.996 13.399-29.996 29.997s13.398 29.997 29.997 29.997h835.918c16.599 0 29.997-13.398 29.997-29.997 0-16.498-13.398-29.997-29.997-29.997zM951.207 73.293c-11.699-11.699-30.697-11.699-42.396 0L385.562 596.442c-11.699 11.699-11.699 30.697 0 42.396s30.697 11.698 42.396 0l523.25-523.25c11.698-11.598 11.698-30.596 0-42.295z"></path><path d="M930.41 64.094H690.432c-16.599 0-29.997 13.398-29.997 29.997s13.398 29.997 29.997 29.997h239.976c16.599 0 29.997-13.399 29.997-29.997 0-16.499-13.398-29.997-29.997-29.997zM334.467 64.094H94.491c-16.599 0-29.997 13.398-29.997 29.997s13.398 29.997 29.997 29.997h239.976c16.599 0 29.997-13.399 29.997-29.997 0-16.499-13.398-29.997-29.997-29.997z"></path><path d="M930.41 64.094c-16.6 0-29.998 13.398-29.998 29.997v239.976c0 16.599 13.399 29.997 29.997 29.997s29.997-13.398 29.997-29.997V94.091c0-16.499-13.398-29.997-29.997-29.997zM930.41 660.036c-16.6 0-29.998 13.398-29.998 29.997v239.976c0 16.599 13.399 29.997 29.997 29.997s29.997-13.398 29.997-29.997V690.033c0-16.499-13.398-29.997-29.997-29.997z"></path></svg>
    </div>
    </a>
</div>
</script>`;
    var popupTmpl = `<script type="text/plain" id="popup-link-alert">
<div class="popup-header">
    <div class="popup-header-svg"><svg t="1626405559336" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2728" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path fill="#ff6541" d="M510.976694 146.304134c-201.970968 0-365.695866 163.728992-365.695866 365.695866s163.728992 365.695866 365.695866 365.695866 365.695866-163.728992 365.695866-365.695866S712.947661 146.304134 510.976694 146.304134L510.976694 146.304134zM480.489332 329.151555c0-16.82827 13.631462-30.475082 30.475082-30.475082 16.844643 0 30.472012 13.646811 30.472012 30.475082l0 216.70146c0 16.82827-13.627369 30.475082-30.472012 30.475082-16.84362 0-30.475082-13.646811-30.475082-30.475082L480.489332 329.151555 480.489332 329.151555zM510.976694 694.847421c-23.663956 0-42.846854-19.178805-42.846854-42.842761s19.182898-42.846854 42.846854-42.846854c23.663956 0 42.846854 19.182898 42.846854 42.846854C553.823548 675.664523 534.64065 694.847421 510.976694 694.847421L510.976694 694.847421zM510.976694 694.847421" p-id="2729"></path></svg></div>
    <div  class="popup-header-title">{title}</div>
</div>
<div class="popup-ctx">
    <p class="popup-ctx-title">{ctxTitle}</p>
    <p class="popup-ctx-link">{link{link}}</p>
</div>
<div class="popup-alert"><span>{alert}</span></div>
<div class="popup-footer">
    <button onclick="closePopup()">{btnCancel}</button><button onclick="window.open('{link{link}}', '_self',  'noopener,noreferrer')">{btnOpen}</button>
</div>
</script>`;
    d.head.innerHTML += baseTmpl + popupTmpl.Compile({
        title: gettext('About to leave Linkfly'),
        ctxTitle: gettext('Do you want to open this website link:'),
        alert: gettext('Security alert: This website may be unsafe. If you want to open it anyway, Linkfly assumes no responsibility.'),
        btnCancel: gettext('Cancel'),
        btnOpen: gettext('Open Anyway')
    });
}(document, 'script'));