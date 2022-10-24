if (!String.prototype.Format) {
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
}
if (!String.prototype.Compile) {
    String.prototype.Compile = function(obj) {
        return this.replace(/\{([\w ]+)\}/g, function($1, $2) {
            return (obj != null ? obj[$2] : void 0) == undefined ? "" : obj[$2];
        });
    };
}

function eleParents(tar, selector) {
    selector = selector || "div.con-tab";
    if (selector && tar && tar.nodeName != 'HTML') {
        if (selector.indexOf('.') != -1) {
            var _sel = selector.split('.');
            if ((!_sel[0] || tar.nodeName == _sel[0].toUpperCase()) && tar.classList.contains(_sel[1])) {
                return tar;
            } else {
                return eleParents(tar.parentNode, selector);
            }
        } else if (selector.indexOf('#') != -1) {
            var _sel = selector.split('#');
            if ((!_sel[0] || tar.nodeName == _sel[0].toUpperCase()) && tar.id == _sel[1]) {
                return tar;
            } else {
                return eleParents(tar.parentNode, selector);
            }
        } else {
            var _sel = [selector];
            if (tar.nodeName == _sel[0].toUpperCase()) {
                return tar;
            } else {
                return eleParents(tar.parentNode, selector);
            }
        }
    } else {
        return null;
    }
}
(function() {
    var APIHOST = document.querySelector('meta[property="api:host"]').content + '/v/2.0';
    var v = function(a, b, t) {
        t = t || d;
        t.addEventListener ? t.addEventListener(a, b, !1) : t.attachEvent && t.attachEvent("on" + a, b)
    };
    var lfjax = function(method, url, options) {
        var xhr = new XMLHttpRequest();
        options = options || {};
        xhr.open((method || 'GET').toUpperCase(), url.indexOf('http') == 0 ? url : APIHOST + url);
        if (method == 'POST') xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.responseType = 'text';
        xhr.onload = function() {};
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if (options.fn && typeof options.fn == 'function') {
                    options.fn(xhr.responseText)
                }
            }
        };
        xhr.onerror = function() {};
        try {
            if (options.data) {
                var _data = [];
                if (!options.data.push && typeof options.data == 'object') {
                    for (var x in options.data) {
                        _data.push(encodeURIComponent(x) + '=' + encodeURIComponent(options.data[x]));
                    }
                    options.data = _data;
                }
            } else {
                options.data = [];
            }
            xhr.send(options.data.join('&'));
        } catch (e) {}
    };
    var _podcast_links = [{
        platform: 'googlePodcasts',
        title: 'Google Podcasts'
    }, {
        platform: 'shopify',
        title: 'Shopify'
    }, {
        platform: 'applePodcasts',
        title: 'Apple Podcasts'
    }, {
        platform: 'stitcher',
        title: 'Stitcher'
    }, {
        platform: 'castbox',
        title: 'Castbox'
    }, {
        platform: 'rss',
        title: 'RSS'
    }, {
        platform: 'pocketCasts',
        title: 'Pocket Casts'
    }, {
        platform: 'overcast',
        title: 'Overcast'
    }, {
        platform: 'bullhorn',
        title: 'Bullhorn'
    }, {
        platform: 'castro',
        title: 'Castro'
    }, {
        platform: 'playerFm',
        title: 'Player FM'
    }, ];
    (function(d, s) {
        function lbasejs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = e.checkLink;
                    "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
                }())
            }))
        }

        function formatDuration(duration) {
            var s = parseInt(duration, 10) / 1000;
            var m = parseInt(s / 60, 10),
                d_m = s % 60;
            var h = parseInt(m / 60, 10),
                d_h = m % 60;
            return (h > 0 ? h + ' hour' : '') + (d_h > 0 ? d_h + ' min' : '') + (d_m > 0 ? d_m + ' sec' : '');
        }

        function renderButtons(item, buttonDiv) {
            var _tmpl = d.querySelector('#btnLinkTmpl').innerHTML,
                _tmpl1 = d.querySelector('#linkTmplButton').innerHTML;
            item.buttons.forEach(function(ele, idx) {
                if (scheduleTime(ele.scheduled, ele.start, ele.end)) {
                    ele.lid = __data.bio.id;
                    ele.animation = __animate[ele.featured];
                    ele.link1 = checkLink(ele.link, ele.type, ele.subtype, ele.link2, ele.title);
                    ele.target = ele.link1.startsWith('javascript:') ? '' : 'top';
                    ele.text = encodeURIComponent(ele.text || '');
                    ele.linktext = (ele.link || '').replace(/^https?:?\/?\/?/i, '');
                    ele.link2 = encodeURIComponent(ele.link2 || '');
                    if (ele.icon && (ele.icon.indexOf('bio/links/icons/') != -1 || ele.icon.indexOf('statics/links/btn-') != -1 || ele.icon.indexOf('links/service/logo/') != -1)) {
                        var _k = getImageKey(ele.icon);
                        if (_k) {
                            ele.iconfont = 'icon-' + _k;
                        } else {
                            ele.displayImg = 'block';
                            ele.displayIcon = 'hidden';
                        }
                    } else {
                        ele.displayImg = 'block';
                        ele.displayIcon = 'hidden';
                    }
                    ele.icon = clearImage(ele.icon, 120, 120);
                    var _div = d.createElement('div');
                    if (ele.type == 10 || ele.type == 12 || (ele.type == 1 && [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(parseInt(ele.subtype, 10)))) {
                        _div.innerHTML = _tmpl1.Compile(ele);
                    } else if (ele.type == 11) {
                        _div.innerHTML = '<div class="item-header"><h3>{0}</h3></div>'.Format(ele.title);
                    } else {
                        ele.type = 1;
                        _div.innerHTML = _tmpl.Compile(ele);
                    }
                    buttonDiv.appendChild(_div);
                }
            });
        }

        function renderSocials(item, socialDiv) {
            if (item.socials) {
                var _tmpl = d.querySelector('#socialLinkTmpl').innerHTML,
                    _tmplSVG = d.querySelector('#socialLinkSVGTmpl').innerHTML;
                var socials = socialDiv.querySelector('.social_list-spirit'),
                    socialsSVG3 = socialDiv.querySelector('.social_list-svg-3'),
                    socialsSVG4 = socialDiv.querySelector('.social_list-svg-4'),
                    socialsSVG6 = socialDiv.querySelector('.social_list-svg-6');
                item.socials.forEach(function(ele, idx) {
                    ele.lid = __data.bio.id;
                    ele.link1 = checkLink(ele.link, 1);
                    ele.target = ele.link1.startsWith('javascript:') ? '' : 'top';
                    ele.image = (ele.type == 0 && ele.image) ? clearImage(ele.image, 120) : clearImage('statics/links/icons-socials/spirit/' + ele.type + '.png');
                    ele.image1 = (ele.type == 0 && ele.image) ? clearImage(ele.image, 120) : '';
                    ele.blendMode = (ele.type == 0 && ele.image) ? 'blend-mode' : '';
                    var _span = d.createElement('span'),
                        _span3 = d.createElement('span'),
                        _span4 = d.createElement('span'),
                        _span6 = d.createElement('span');
                    _span.innerHTML = _tmpl.Compile(ele);
                    ele.st = 3;
                    _span3.innerHTML = _tmplSVG.Compile(ele);
                    ele.st = 4;
                    _span4.innerHTML = _tmplSVG.Compile(ele);
                    ele.st = 6;
                    _span6.innerHTML = _tmplSVG.Compile(ele);
                    socials.appendChild(_span);
                    socialsSVG3.appendChild(_span3);
                    socialsSVG4.appendChild(_span4);
                    socialsSVG6.appendChild(_span6);
                });
            }
        }

        function renderMusic(item, musicDiv) {
            musicDiv.className = 'link-music';
            if (item.embed.indexOf('https://bandcamp.com/EmbeddedPlayer') != -1) {
                var bgcol = 'ffffff',
                    linkcol = '0687f5',
                    album = '',
                    track = '';
                if (item.title == 'bandcamp-track') {
                    album = GetPathString('album', item.embed);
                    track = GetPathString('track', item.embed);
                    bgcol = GetPathString('bgcol', item.embed) || 'ffffff';
                    linkcol = GetPathString('linkcol', item.embed) || '0687f5';
                    item.embed = 'https://bandcamp.com/EmbeddedPlayer/album={0}/size=large/bgcol={1}/linkcol={2}/tracklist=false/artwork=small/track={3}/transparent=true/'.Format(album, bgcol, linkcol, track);
                } else if (item.title == 'bandcamp-album') {
                    album = GetPathString('album', item.embed);
                    bgcol = GetPathString('bgcol', item.embed) || 'ffffff';
                    linkcol = GetPathString('linkcol', item.embed) || '0687f5';
                    item.embed = 'https://bandcamp.com/EmbeddedPlayer/album={0}/size=large/bgcol={1}/linkcol={2}/artwork=small/transparent=true/'.Format(album, bgcol, linkcol);
                }
            }
            item.embed = aff_linkfly(item.embed);
            musicDiv.innerHTML = d.querySelector('#musicItemTmpl').innerHTML.Compile({
                embed: item.embed
            });
            musicDiv.querySelector('.music-box').classList.add('embed-' + item.title);
            if (item.title == 'boomplay-album' || item.title == 'boomplay-playlist') musicDiv.querySelector('.music-box iframe').scrolling = 'yes';
        }

        function renderPodcast(item, podcastDiv) {
            podcastDiv.className = 'link-podcast';
            if (item.title.startsWith('google-') || item.link.indexOf('podcasts.google.com') != -1) {
                var _podcast = JSON.parse(item.text || '{}');
                var _podcastItemHTML = `<div class="podcast-platforms--item">
                                <a href="{url}" target="_blank"><img class="podcast-platforms--logo" src="https://fly.linkcdn.to/statics/links/btn-podcast/{logo}.png" alt="{logo}"><p class="podcast-platforms--title">{title}</p></a>
                            </div>`;
                var _podcast_linksHtml = '',
                    _podcastCnt = 0;
                _podcast_links.forEach(function(val) {
                    if (_podcast.links[val.platform]) {
                        if (_podcastCnt < 6) {
                            _podcast_linksHtml += _podcastItemHTML.Compile({
                                logo: val.platform,
                                title: val.title,
                                url: _podcast.links[val.platform].url || 'javascript:;'
                            });
                        }
                        _podcastCnt++;
                    }
                });
                var __podcast = {
                    thumbnailUrl: _podcast.image,
                    title: _podcast.title,
                    artistName: _podcast.artistName,
                    description: _podcast.description,
                    linksHtml: _podcast_linksHtml
                };
                if (_podcastCnt <= 6) __podcast.display = 'hidden';
                podcastDiv.innerHTML = d.querySelector('#podcastGoogleItemTmpl').innerHTML.Compile(__podcast);
                podcastDiv.querySelector('.podcast-box').classList.add('embed-' + item.title);
                var url = '/share/linkfly/link/{0}/itgr/google/op/podcast.recent/?link={1}'.Format(__data.bio.id, encodeURIComponent(item.link));
                lfjax('GET', url, {
                    fn: function(resp) {
                        resp = JSON.parse(resp);
                        if (resp.code == 0) {
                            var _recentItemHtml = d.querySelector('#podcastGoogleItemTmpl2').innerHTML,
                                _recentHtml = '';
                            resp.data.episodes.forEach(function(val) {
                                var _val = {
                                    url: (val.links.googlePodcasts || {}).url,
                                    thumbnailUrl: val.thumbnailUrl,
                                    title: val.title,
                                };
                                var _date = new Date();
                                _date.setFullYear(val.releaseDate.year);
                                _date.setMonth(val.releaseDate.month + 1);
                                _date.setDate(val.releaseDate.day + 1);
                                _val.date = _date.toLocaleDateString();
                                _val.duration = formatDuration(val.duration);
                                _recentHtml += _recentItemHtml.Compile(_val);
                            });
                            podcastDiv.querySelector('.podcast-recent--list').innerHTML = _recentHtml;
                        }
                    }
                })
            } else {
                item.embed = aff_linkfly(item.embed);
                podcastDiv.innerHTML = d.querySelector('#podcastItemTmpl').innerHTML.Compile({
                    embed: item.embed
                });
                podcastDiv.querySelector('.podcast-box').classList.add('embed-' + item.title);
            }
        }

        function _renderItem(item, idx, center) {
            var _div = document.createElement('div');
            center.appendChild(_div);
            _div.id = item.id;
            _div.dataset.idx = idx + '';
            _div.dataset.type = item.type;
            switch (item.type) {
                case 1:
                    _div.className = 'biolink';
                    renderButtons(item, _div);
                    break;
                case 2:
                    _div.className = 'social_list';
                    _div.innerHTML = d.querySelector('#socialListTmpl').innerHTML;
                    renderSocials(item, _div);
                    break;
                case 3:
                    _div.className = 'link-header';
                    _div.innerHTML = '<div class="item-header"><h3>{0}</h3></div>'.Format(item.title);
                    break;
                case 4:
                    _div.className = 'link-video';
                    if (item.link.indexOf('twitch.tv') != -1) item.embed += ('&parent=' + location.host);
                    _div.innerHTML = d.querySelector('#videoItemTmpl').innerHTML.Compile({
                        link: item.embed
                    });
                    if (item.link.indexOf('youtube.com') != -1 || item.link.indexOf('youtu.be') != -1) _div.querySelector('.video-box').classList.add('embed-iframe-youtube');
                    if (item.link.indexOf('tiktok.com') != -1) _div.querySelector('.video-box').classList.add('embed-iframe-tiktok');
                    if (item.link.indexOf('vimeo.com') != -1) _div.querySelector('.video-box').classList.add('embed-iframe-vimeo');
                    if (item.link.indexOf('bilibili.com') != -1) _div.querySelector('.video-box').classList.add('embed-iframe-bilibili');
                    break;
                case 5:
                    _div.className = 'link-form';
                    var _pathLink = document.querySelector('link[data-path]');
                    var _host = document.querySelector('meta[property="api:host"]').content;
                    var embed_link = (_host.indexOf('linkfly.to') != -1 ? 'https://linkfly.to' : _host) + '/embed/share-cmpt.html?path={0}&lid={1}&leuid={2}&lnk={3}'.Format(_pathLink ? _pathLink.dataset.path : '', __data.bio.id, __data.basic.uid, location.pathname.substring(1) ? location.pathname.substring(1) : location.host);
                    _div.innerHTML = '<div class="inner-embed-box"><iframe src="{0}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'.Format(embed_link);
                    _div.querySelector('iframe').onload = function() {
                        this.contentWindow.postMessage({
                            fn: 'renderContent',
                            cmpt: item,
                            type: 'embedForm',
                            theme: __theme
                        }, '*');
                    }
                    break;
                case 6:
                    renderMusic(item, _div);
                    break;
                case 7:
                    renderPodcast(item, _div);
                    break;
                case 8:
                    _div.className = 'link-ytbsub';
                    item.link = (item.link || '').trim();
                    item.lid = __data.bio.id;
                    if (item.subtype == 'extension') {
                        item.nodeName = 'button';
                    } else {
                        item.nodeName = 'a';
                        item.target = '_blank'
                        item.url = (item.link || '').indexOf('?') > 0 ? item.link + '&sub_confirmation=1&utm_medium=social&utm_source=linkfly' : item.link + '?sub_confirmation=1&utm_medium=social&utm_source=linkfly';
                    }
                    _div.innerHTML = d.querySelector('#ytbSubItemTmpl').innerHTML.Compile(item);
                    break;
                case 9:
                    _div.className = 'link-typeform';
                    if (item.embed) {
                        item.embed += '?typeform-disable-auto-focus=true&embed-disable-auto-focus=true&typeform-embed=embed-widget&typeform-source=linkfly.to&typeform-medium=embed-linkfly&typeform-medium-version=1.0.0';
                        _div.innerHTML = d.querySelector('#typeformItemTmpl').innerHTML.Compile({
                            embed: item.embed
                        });
                        _div.querySelector('.typeform-box').classList.add('embed-' + item.title);
                    }
                    break;
                default:
                    break;
            }
        }
        var renderPage = function() {
                var avatar = d.querySelector('.avatar img');
                if (__data.basic.cover) {
                    avatar.src = clearImage(__data.basic.cover);
                    d.querySelector('.avatar').classList.add('verified', 'verified-' + __data.basic.verified);
                } else {
                    d.querySelector('.avatar').style.display = 'none';
                }
                d.querySelector('.text h3').innerHTML = __data.basic.title || '';
                d.querySelector('.text .desc').innerHTML = __data.basic.desc || '';
                var center = d.querySelector('.center');
                if (__data.orders && __data.orders.length > 0) {
                    __data.orders.forEach(function(id, idx) {
                        var _item = __data.contents.find(function(item) {
                            return item.id == id;
                        });
                        if (_item) _renderItem(_item, idx, center);
                    })
                } else if (__data.contents && __data.contents.length > 0) {
                    __data.contents.forEach(function(item, idx) {
                        _renderItem(item, idx, center);
                    });
                }
                __loaded = true;
            },
            oldWinLoad = null;
        if (window.onload && (typeof window.onload == 'function')) {
            oldWinLoad = window.onload;
            window.onload = function() {
                oldWinLoad();
            }
        }
        if (__data.bio.logoshow == 1) {
            var _footer = d.createElement('div');
            _footer.className = 'footer';
            _footer.innerHTML = '<p><a href="https://linkfly.to/linkflymadewith"><span><svg viewBox="0 0 285.81 60.17"><path d="M30,6.08a24,24,0,1,1-24,24,24,24,0,0,1,24-24m0-3a27,27,0,1,0,27,27,27,27,0,0,0-27-27Z"/><path class="cls-1" d="M41.63,20.09a19.3,19.3,0,0,0-11.59,4,19.3,19.3,0,0,0-11.59-4,6.52,6.52,0,0,0,0,13c2.31,0,4.52,1.42,6.07,3.89l.09.15h0l.21.31c.08.1.15.2.23.29l.13.15a6.54,6.54,0,0,0,1.39,1.17,6.72,6.72,0,0,0,1.64.74h0l.36.09.09,0L29,40l.13,0,.29,0h1.18l.29,0,.13,0,.32-.05.08,0,.37-.09h0a6.89,6.89,0,0,0,1.64-.74,6.8,6.8,0,0,0,1.39-1.17l.13-.15c.08-.09.15-.19.23-.29l.21-.3a1.4,1.4,0,0,0,.1-.16c1.55-2.47,3.76-3.89,6.07-3.89a6.52,6.52,0,0,0,0-13Zm-17.12,10c-.09.16-.18.31-.26.47a10.46,10.46,0,0,0-5.8-1.79,2.18,2.18,0,0,1,0-4.35,14.92,14.92,0,0,1,8.34,2.63m5,7.8a2.26,2.26,0,0,1-.55.52l0,0,0,0-.19.1-.07,0-.19.07-.09,0-.18,0-.11,0-.22,0H30l-.22,0-.11,0-.18,0-.09,0-.19-.07-.07,0-.19-.1,0,0,0,0a2.09,2.09,0,0,1-.55-.52l-.07-.09a2.12,2.12,0,0,1-.32-.72,2.15,2.15,0,0,1,.28-1.64A18.22,18.22,0,0,1,30,29.94a19.09,19.09,0,0,1,1.84,2.47,2.15,2.15,0,0,1,.28,1.64,2.33,2.33,0,0,1-.32.72l0,0,0,0Zm1.52-7.8a14.92,14.92,0,0,1,8.34-2.63,2.18,2.18,0,0,1,0,4.35,10.46,10.46,0,0,0-5.8,1.79h0m-2.54-3.51a21.45,21.45,0,0,0-3.25-3m5.79,6.52c-.08-.16-.17-.31-.27-.47a22.89,22.89,0,0,0-2.27-3"/><path class="cls-1" d="M73.92,23.54V36.65H71.09V19.87h4.42l5.06,10.54,5.07-10.54H90V36.65H87.2V23.54L81.34,35.18H79.76Z"/><path class="cls-1" d="M102.2,36.65V34.94A5.47,5.47,0,0,1,98,36.84c-2.6,0-4.61-1.61-4.61-4.1,0-2.67,2.14-3.8,5.16-3.8H102v-.48c0-1.92-1.27-2.54-2.83-2.54a6.25,6.25,0,0,0-3.7,1.29l-1.2-1.68a8,8,0,0,1,5.28-1.84c2.71,0,5.11,1.22,5.11,4.72v8.24ZM102,30.81h-3c-1.56,0-2.9.41-2.9,1.83s1.15,1.92,2.57,1.92c1.87,0,3.36-1,3.36-2.67Z"/><path class="cls-1" d="M113.72,23.69a5,5,0,0,1,4.22,2.16v-7h2.69V36.65h-2.69V34.73a5.22,5.22,0,0,1-4.34,2.11c-3.08,0-6-2.52-6-6.58A6.21,6.21,0,0,1,113.72,23.69ZM118,30.36c0-2.57-1.75-4.32-3.77-4.32a4.06,4.06,0,0,0-4,4.27,4,4,0,0,0,4,4.15A3.89,3.89,0,0,0,118,30.36Z"/><path class="cls-1" d="M126.39,31.44c.14,1.94,2,3.1,4,3.1A4.64,4.64,0,0,0,134,33l1.53,1.68a7.06,7.06,0,0,1-5.37,2.14,6.29,6.29,0,0,1-6.46-6.55,6.31,6.31,0,0,1,6.41-6.6c3.36,0,6.29,2.08,6.29,5.9v1.85Zm7.32-2.11A3.22,3.22,0,0,0,130.25,26c-1.87,0-3.86,1.18-3.86,3.34Z"/><path class="cls-1" d="M148.83,36.65l-4.42-12.77h2.78l3.17,9.65,3.17-9.65h2.78l3.17,9.65,3.17-9.65h2.79L161,36.65H158l-3-8.74-3,8.74Z"/><path class="cls-1" d="M169.18,18.43a1.71,1.71,0,1,1-1.71,1.7A1.71,1.71,0,0,1,169.18,18.43Zm-1.37,18.22V23.88h2.69V36.65Z"/><path class="cls-1" d="M177.7,32.52a1.77,1.77,0,0,0,1.75,2,2.38,2.38,0,0,0,1.73-.84l1.1,1.9a4.76,4.76,0,0,1-3.17,1.27,4.1,4.1,0,0,1-4.1-4.39V26H173.4V23.88H175v-4h2.69v4h3.36V26H177.7Z"/><path class="cls-1" d="M187.11,36.65h-2.69V18.86h2.69v7.35a4.68,4.68,0,0,1,4.24-2.52c2.76,0,4.83,1.68,4.83,5.13v7.83h-2.69v-7c0-2.45-1.08-3.53-2.93-3.53a3.35,3.35,0,0,0-3.45,3.62Z"/><path class="cls-1" d="M206.88,19.87h2.83V34h7.66v2.69H206.88Z"/><path class="cls-1" d="M221.45,18.43a1.71,1.71,0,1,1-1.7,1.7A1.7,1.7,0,0,1,221.45,18.43Zm-1.37,18.22V23.88h2.69V36.65Z"/><path class="cls-1" d="M229.35,36.65h-2.69V23.88h2.69v2.33a4.79,4.79,0,0,1,4.24-2.52c2.76,0,4.83,1.68,4.83,5.13v7.83h-2.69v-7c0-2.45-1.08-3.53-2.93-3.53a3.35,3.35,0,0,0-3.45,3.62Z"/><path class="cls-1" d="M253.85,36.65h-3.26l-3.8-5.6-1.94,2v3.63h-2.69V18.84h2.69V29.3L250,23.88h3.46l-4.85,5.06Z"/><path class="cls-1" d="M259.42,23.88h3.36V26h-3.36V36.65h-2.69V26h-1.61V23.88h1.61v-1a4.11,4.11,0,0,1,4.1-4.39A4.76,4.76,0,0,1,264,19.77l-1.1,1.9a2.38,2.38,0,0,0-1.73-.84,1.77,1.77,0,0,0-1.75,2Z"/><path class="cls-1" d="M265.37,36.65V18.84h2.69V36.65Z"/><path class="cls-1" d="M277.42,39.05a4.25,4.25,0,0,1-3.87,2.69,4.72,4.72,0,0,1-3.17-1.28l1.23-2.18a2.85,2.85,0,0,0,1.87.79,2.08,2.08,0,0,0,1.9-2.06c0-.19,0-.29-5.16-13.13h2.88l3.81,9.41,3.82-9.41h2.88Z"/></svg></span></a></p>';
            d.querySelector('.body').appendChild(_footer);
        }
        lbasejs(window).then(function() {
            renderPage();
        });
        window.onmessage = function(event) {
            if (event.origin == 'https://linkfly.to') {
                if (event.data.code && event.data.fn == 'authCallback') {
                    d.querySelector('.modal-block .info').style.display = 'none';
                    d.querySelector('.modal-block .success').style.display = 'block';
                    d.querySelector('.modal-block .subs-btn').style.display = 'none';
                }
            }
            if (event.data.fn == 'resizeFrame' && event.data.type == 'embedForm') {
                if (event.data.options.id) {
                    d.querySelector('#{0} .inner-embed-box iframe'.Format(event.data.options.id)).style.height = event.data.rect.height + 'px';
                } else {
                    event.source.frameElement.style.height = event.data.rect.height + 'px';
                }
            }
            if (event.data.fn == 'resizeFrame' && event.data.type == 'popupForm') {
                var loadEle = d.querySelector('.embed-bg .embed-loading');
                if (loadEle) loadEle.remove();
                d.querySelector('.embed-bg .popup-form iframe').style.height = event.data.rect.height + 'px';
            }
            if (event.data.fn == 'resizeFrame' && event.data.type == 'popupMap') {
                var loadEle = d.querySelector('.embed-bg .embed-loading');
                if (loadEle) loadEle.remove();
                d.querySelector('.popup-map .inner-embed-box').style.paddingBottom = '75%';
            }
        }
    })(document, 'script');
    (function(d, s) {
        var MUSIC_SERVICES = {
            'spotify': 'Spotify',
            'applemusic': 'Apple Music',
            'deezer': 'Deezer',
            'googleplaymusic': 'Google Play Music',
            'iTunes': 'iTunes',
            'napster': 'Napster',
            'soundcloud': 'SoundCloud',
            'youtube': 'Youtube',
            'amazonmusic': 'Amazon Music',
            'tidal': 'Tidal',
            'yandex': 'Yandex Music',
            'pandora': 'Pandora',
            'spinrilla': 'Spinrilla',
            'anghami': 'Anghami',
            'audiomack': 'Audiomack',
            'awa': 'AWA',
            'bandcamp': 'Bandcamp',
            'beatport': 'Beatport',
            'bleep': 'Bleep',
            'boomkat': 'Boomkat',
            'emusic': 'eMusic',
            'flo': 'Flo',
            'genie': 'Genie',
            'groove': 'Groove Music',
            'hardwax': 'Hard Wax',
            'hdtracks': 'HDtracks',
            'iheartradio': 'iHeartRadio',
            'juno': 'Juno',
            'kkbox': 'KKBOX',
            'linemusic': 'Line Music',
            'melon': 'Melon',
            'mixcloud': 'Mixcloud',
            'simfyafrica': 'Simfy Africa',
            'qobuz': 'Qobuz',
            'traxsource': 'Traxsource',
            'vevo': 'Vevo',
            'vibe': 'Vibe',
            'wasabeat': 'Wasabeat',
            'whatpeopleplay': 'Whatpeopleplay',
            'wimp': 'Wimp',
            'zingmp3': 'Zing MP3',
            '7digital': '7digital',
            '8tracks': '8tracks',
            'amazonalex': 'Amazon Alex',
            'boomplay': 'Boomplay',
            'qq': 'QQ音乐',
            'qingting': '蜻蜓FM',
            'amazon': 'Amazon',
            'twitter': 'Twitter',
            'bugs': 'Bugs!',
            'clipfish': 'Clipfish',
            'gaana': 'Gaana',
            'jiosaavn': 'JioSaavn',
            'joox': 'JOOX',
            'kugou': '酷狗音乐',
            'kting': '酷听',
            'kuwo': '酷我音乐',
            'lizhi': '荔枝FM',
            'migu': '咪咕音乐',
            'mixerbox': 'MixerBox',
            'moov': 'MOOV',
            'patari': 'PATARI',
            'pulselocker': 'Pulselocker',
            'qianqian': '千千',
            'suamusica': 'SuaMúsica',
            'neteasecloudmusic': 'NeteaseCloudMusic',
            'xiami': '虾米音乐',
            'youseemusik': 'youSee MUSIK',
            'googleplay': 'Google Play',
            'eventbrite': 'eventbrite',
            'bandsintown': 'Bandsintown',
            'youtubemusic': 'YouTube Music'
        };

        function isEmail(email) {
            var regEmail = /\w+([\w.-])*@[\w-]+\.\w+[.|\w]*/;
            if (email) return !(regEmail.test(email) == false);
            return false;
        }
        window.onloadCallback = function(eleId) {
            var html_element = 'html_element';
            if (eleId) html_element += '_' + eleId;
            var opt_widget_id = grecaptcha.render(html_element, {
                'sitekey': '6LfaZcUeAAAAAA0z_1PqUUL0E_0fUZFpMOqfASt1',
                'callback': onSubmit,
            });
            d.querySelector('#' + html_element).dataset.opt_widget_id = opt_widget_id;
        };
        window.onSubmit = function(token) {};

        function ltwwjs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = e.twttr;
                    "undefined" === typeof r || "undefined" === typeof r.ready ? e.requestAnimationFrame(n) : r.ready((function(e) {
                        t(e)
                    }))
                }())
            }))
        }

        function lstripejs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = e.Stripe;
                    "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
                }())
            }))
        }

        function lpaypaljs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = e.paypal;
                    "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
                }())
            }))
        }

        function lfbjs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = e.FB;
                    "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
                }())
            }))
        }

        function lpinjs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = e.PinUtils;
                    "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
                }())
            }))
        }

        function lgrejs(e) {
            return new Promise((function(t) {
                (function n() {
                    var r = (e.grecaptcha || {}).execute;
                    "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
                }())
            }))
        }

        function endLoaded(loadEle, endfn) {
            if (loadEle instanceof Node || loadEle instanceof HTMLElement) {
                loadEle.remove();
            } else if (typeof loadEle == 'string') {
                if (d.querySelector(loadEle)) d.querySelector(loadEle).remove();
            }
            if (endfn && typeof endfn == 'function') {
                endfn();
            }
        }
        var selectSupportAmount = function(e) {
            var _fbe = e.target || e.srcElement || {};
            if (_fbe.nodeName == 'INPUT') {
                var _fbeP = null,
                    _value;
                if (_fbe.type == 'radio') {
                    _fbeP = eleParents(_fbe, '.amount-select');
                    if (_fbeP.querySelector('div .selected')) _fbeP.querySelector('div .selected').classList.remove('selected');
                    _fbe.parentElement.parentElement.querySelector('.amount-select-label').classList.add('selected');
                    _value = parseInt(_fbe.value || '0', 10) / 100.0;
                } else if (_fbe.type == 'number') {
                    _fbeP = eleParents(_fbe, '.support-amount');
                    if (_fbeP.querySelector('div .selected')) {
                        _fbeP.querySelector('div .selected').classList.remove('selected');
                        _fbeP.querySelector('input[type=radio]:checked').removeAttribute('checked');
                    }
                    _value = parseFloat(_fbe.value || '0');
                }
                if (_value < 1000.0) {
                    _fbeP = eleParents(_fbe, '.embed-support');
                    if (_fbe.value > 0) {
                        _fbeP.querySelector('.support-continue button').removeAttribute('disabled');
                    } else {
                        eleParents(_fbe, '.embed-support').querySelector('.support-continue button').setAttribute('disabled', true);
                    }
                    if (_fbeP.querySelector('.embed-support-error')) _fbeP.querySelector('.embed-support-error').remove();
                } else {
                    if (!_fbeP.querySelector('.embed-support-error')) {
                        var errP = d.createElement('p');
                        errP.innerHTML = 'This amount is too high, please set a lower amount';
                        errP.className = 'embed-support-error';
                        _fbeP.querySelector('.support-amount-custom').appendChild(errP);
                    }
                    eleParents(_fbe, '.embed-support').querySelector('.support-continue button').setAttribute('disabled', true);
                }
            }
        };
        var payContinue = function(e) {
            var _fbe = e.target || e.srcElement || {};
            var _embedBox = eleParents(_fbe, '.embed-box');
            if (_embedBox) {
                _embedBox.querySelector('.embed-support').style.display = 'none';
                _embedBox.querySelector('.embed-support-detail').style.display = 'block';
                var amount = 0;
                if (_embedBox.querySelector('.embed-support .selected')) {
                    amount = parseInt(_embedBox.querySelector('.embed-support input[name=amount]:checked').value) / 100.0;
                } else {
                    amount = parseInt(parseFloat(_embedBox.querySelector('.amount-custom-input').value) * 100, 10) / 100.0;
                }
                _embedBox.querySelector('.embed-support-detail .support-detail-amount').innerHTML = amount;
            }
        };
        var payBack = function(e) {
            var _fbe = e.target || e.srcElement || {};
            var _embedBox = eleParents(_fbe, '.embed-box');
            if (_embedBox) {
                _embedBox.querySelector('.embed-support').style.display = 'block';
                _embedBox.querySelector('.embed-support-detail').style.display = 'none';
            }
        };
        var paySupportCheckEmail = function(e) {
            var _fbe = e.target || e.srcElement || {};
            var email = _fbe.value.trim();
            if (isEmail(email)) {
                eleParents(_fbe, '.embed-support-detail').querySelector('.support-continue button').removeAttribute('disabled');
            } else {
                eleParents(_fbe, '.embed-support-detail').querySelector('.support-continue button').setAttribute('disabled', true);
            }
        };
        var paySupportStripe = function(fbe) {
            var stripe = Stripe(fbe.dataset.key);
            var elements = stripe.elements({
                locale: (navigator.language || navigator.userLanguage).substring(0, 2) || 'en'
            });
            var style = {
                base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#c2c2c2'
                    }
                },
                invalid: {
                    color: '#f15e48',
                    iconColor: '#f15e48'
                }
            };
            var card = elements.create('card', {
                style: style
            });
            card.addEventListener('change', function(event) {
                var displayError = eleParents(fbe, '.pay-element').querySelector('.pay-stripe #card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                    fbe.setAttribute('disabled', true);
                } else {
                    displayError.textContent = '';
                }
                if (event.complete) {
                    eleParents(fbe, '.pay-element').querySelector('.pay-stripe .support-continue button').removeAttribute('disabled');
                } else {
                    eleParents(fbe, '.pay-element').querySelector('.pay-stripe .support-continue button').setAttribute('disabled', true);
                }
            });
            card.mount(eleParents(fbe, '.pay-element').querySelector('.pay-stripe #card-element'));
            var form = eleParents(fbe, '.pay-element').querySelector('.pay-stripe #payment-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                function showError(message) {
                    var errorElement = eleParents(fbe, '.pay-element').querySelector('.pay-stripe #card-errors');
                    errorElement.textContent = message;
                    card.update({
                        disabled: false
                    });
                    eleParents(fbe, '.pay-stripe').querySelector('.support-continue').style.display = 'block';
                    eleParents(fbe, '.pay-stripe').querySelector('.embed-loading').style.display = 'none';
                }
                eleParents(fbe, '.pay-element').querySelector('.pay-stripe .support-continue').style.display = 'none';
                eleParents(fbe, '.pay-element').querySelector('.pay-stripe .embed-loading').style.display = 'block';
                stripe.createPaymentMethod({
                    type: 'card',
                    card: card
                }).then(function(result) {
                    var email = eleParents(fbe, '.embed-support-detail').querySelector('input[name=email]').value,
                        note = eleParents(fbe, '.embed-support-detail').querySelector('textarea').value,
                        amount = 0;
                    if (eleParents(fbe, '.embed-box').querySelector('.embed-support .selected')) {
                        amount = eleParents(fbe, '.embed-box').querySelector('.embed-support input[name=amount]:checked').value;
                    } else {
                        amount = parseInt(parseFloat(eleParents(fbe, '.embed-box').querySelector('.amount-custom-input').value) * 100, 10);
                    }
                    if (result.error) {
                        showError(result.error.message);
                    } else {
                        lfjax('POST', '/share/support/{uid}/link/{lnkid}/pm/stripe/'.Compile({
                            lnkid: __data.bio.id,
                            uid: __data.basic.uid
                        }), {
                            data: {
                                'email': email,
                                'note': note,
                                'amount': amount,
                                'pmid': result.paymentMethod.id,
                                'pk': fbe.dataset.id,
                                'kid': eleParents(fbe, '.embed-box').dataset.kid
                            },
                            fn: function(resp) {
                                swal('', eleParents(fbe, '.embed-box').querySelector('.support-detail').dataset.success || 'Thanks!', 'success');
                                eleParents(fbe, '.embed-box').remove();
                            }
                        });
                        return;
                    }
                });
            });
        };

        function paySupportPaypal(fbe) {
            var amount = 0,
                email = eleParents(fbe, '.embed-support-detail').querySelector('input[name=email]').value,
                note = eleParents(fbe, '.embed-support-detail').querySelector('textarea').value;
            if (eleParents(fbe, '.embed-box').querySelector('.embed-support .selected')) {
                amount = parseInt(eleParents(fbe, '.embed-box').querySelector('.embed-support input[name=amount]:checked').value) / 100.0;
            } else {
                amount = parseInt(parseFloat(eleParents(fbe, '.embed-box').querySelector('.amount-custom-input').value) * 100, 10) / 100.0;
            }
            try {
                paypal.Buttons({
                    createOrder: function(data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: amount + '',
                                    breakdown: {
                                        item_total: {
                                            value: amount + '',
                                            currency_code: 'USD'
                                        }
                                    },
                                },
                                description: note,
                                items: [{
                                    name: 'Linkfly: Support Me',
                                    quantity: '1',
                                    unit_amount: {
                                        currency_code: 'USD',
                                        value: amount + ''
                                    }
                                }]
                            }],
                            payer: {
                                email_address: email
                            },
                        });
                    },
                    onApprove: function(data, actions) {
                        return actions.order.capture().then(function(orderData) {
                            lfjax('POST', '/share/support/{uid}/link/{lnkid}/pm/paypal/'.Compile({
                                lnkid: __data.bio.id,
                                uid: __data.basic.uid
                            }), {
                                data: {
                                    'email': email,
                                    'note': note,
                                    'amount': (parseInt(amount * 100)),
                                    'order': orderData.id,
                                    'pk': fbe.dataset.id,
                                    'kid': eleParents(fbe, '.embed-box').dataset.kid
                                },
                                fn: function(resp) {
                                    swal('', eleParents(fbe, '.embed-box').querySelector('.support-detail').dataset.success || 'Thanks!', 'success');
                                    eleParents(fbe, '.embed-box').remove();
                                }
                            });
                        });
                    },
                    onCancel: function(data) {},
                    onError: function(err) {}
                }).render(eleParents(fbe, '.pay-element').querySelector('.pay-paypal #paypal-button-container'));
            } catch (e) {}
        }
        var paySupportAction = function(e) {
            var _fbe = e.target || e.srcElement || {};
            var payELe = eleParents(_fbe, '.pay-element');
            payELe.querySelector('.pay-action').style.display = 'none';
            if (parseInt(_fbe.dataset.type, 10) == 3) {
                payELe.querySelector('.pay-stripe').style.display = 'block';
                if (d.querySelector('#stripe-js')) {
                    paySupportStripe(_fbe);
                } else {
                    var fjs = d.getElementsByTagName(s)[0];
                    var js = d.createElement(s);
                    js.id = 'stripe-js';
                    js.async = !0;
                    js.src = 'https://js.stripe.com/v3/';
                    fjs.parentNode.insertBefore(js, fjs);
                    lstripejs(window).then(function() {
                        paySupportStripe(_fbe);
                    });
                }
            } else if (parseInt(_fbe.dataset.type, 10) == 1 || parseInt(_fbe.dataset.type, 10) == 2 || parseInt(_fbe.dataset.type, 10) == 4) {
                payELe.querySelector('.pay-paypal').style.display = 'block';
                if (d.querySelector('#paypal-js')) d.querySelector('#paypal-js').remove();
                var fjs = d.getElementsByTagName(s)[0];
                var js = d.createElement(s);
                js.id = 'paypal-js';
                js.async = !0;
                if (parseInt(_fbe.dataset.type, 10) == 4) {
                    js.src = 'https://www.paypal.com/sdk/js?client-id=AWreu1dZCirOqcXASv7yoSBZUJSioRWTAyLKUWqXAGweFSyoE7SJy88jjlTG4UJvAXuy0-MCRyxFz18F&merchant-id={0}&vault=true'.Format(_fbe.dataset.merchantid);
                } else {
                    js.src = 'https://www.paypal.com/sdk/js?client-id={0}&vault=true'.Format(_fbe.dataset.key);
                }
                fjs.parentNode.insertBefore(js, fjs);
                lpaypaljs(window).then(function() {
                    paySupportPaypal(_fbe);
                });
            }
        };
        window.musicPreviewMore = function(that) {
            if (that) {
                if (that.dataset.action == 'more') {
                    that.dataset.action = 'less';
                    that.innerText = 'Show less';
                    that.parentElement.parentElement.querySelectorAll('.music-preview .music-preview-service:nth-child(n+6)').forEach(function(ele) {
                        ele.style.display = 'flex';
                    });
                } else {
                    that.dataset.action = 'more';
                    that.innerText = 'Show more';
                    that.parentElement.parentElement.querySelectorAll('.music-preview .music-preview-service:nth-child(n+6)').forEach(function(ele) {
                        ele.style.display = 'none';
                    })
                }
            }
        };
        window.showMore = function(that) {
            if (that) {
                if (that.dataset.action == 'more') {
                    that.dataset.action = 'less';
                    that.innerText = 'Show less';
                    that.parentElement.parentElement.querySelectorAll('.embed-item:nth-child(n+6)').forEach(function(ele) {
                        ele.style.display = 'flex';
                    });
                } else {
                    that.dataset.action = 'more';
                    that.innerText = 'Show more';
                    that.parentElement.parentElement.querySelectorAll('.embed-item:nth-child(n+6)').forEach(function(ele) {
                        ele.style.display = 'none';
                    })
                }
            }
        };
        window.saveContacts = function(that) {
            var elementA = document.createElement('a');
            elementA.download = (location.pathname.substring(1) ? location.pathname.substring(1) : location.host) + ".vcf";
            elementA.targent = "_blank";
            var bP = eleParents(that, '.embed-contact');
            var txt = JSON.parse(decodeURIComponent(bP.dataset.txt) || '{}'),
                vCard = `BEGIN:VCARD\nVERSION:3.0`;
            if (txt.firstName || txt.lastName) {
                vCard += '\nN:{0}{1};'.Format(txt.lastName ? txt.lastName + ';' : '', txt.firstName);
            }
            if (txt.organization) vCard += '\nORG:' + txt.organization;
            if (txt.position) vCard += '\nTITLE:' + txt.position;
            if (txt.emailPrimary) vCard += '\nEMAIL;TYPE={0}:{1}'.Format(txt.emailPrimaryType.toLowerCase(), txt.emailPrimary);
            if (txt.emailSecondary) vCard += '\nEMAIL;TYPE={0}:{1}'.Format(txt.emailSecondaryType.toLowerCase(), txt.emailSecondary);
            if (txt.phonePrimary) vCard += '\nTEL;TYPE={0}:{1}'.Format(txt.phonePrimaryType.toLowerCase(), txt.phonePrimary);
            if (txt.phoneSecondary) vCard += '\nTEL;TYPE={0}:{1}'.Format(txt.phoneSecondaryType.toLowerCase(), txt.phoneSecondary);
            if (txt.address1 || txt.address2 || txt.city || txt.state || txt.country || txt.postcode) {
                var _tmpl0 = '';
                if (txt.address1) _tmpl0 += txt.address1 + ';';
                if (txt.address2) _tmpl0 += txt.address2 + ';';
                if (txt.city) _tmpl0 += txt.city + ';';
                if (txt.state) _tmpl0 += txt.state + ';';
                if (txt.country) _tmpl0 += txt.country + ';';
                if (txt.postcode) _tmpl0 += txt.postcode + ';';
                _tmpl0.replace(/;$/, '');
                vCard += '\nADR;:;;' + _tmpl0;
            }
            vCard += '\nURL;TYPE=Linkfly:' + location.href;
            if (txt.note) vCard += '\nNOTE:' + txt.note;
            vCard += '\nEND:VCARD';
            var blob = new Blob([vCard], {
                type: "text/vcard"
            });
            var _url = URL.createObjectURL(blob);
            elementA.href = _url;
            document.body.appendChild(elementA);
            elementA.dispatchEvent(new MouseEvent("click", {
                bubbles: !0,
                cancelable: !0,
                view: window
            }));
            document.body.removeChild(elementA);
            URL.revokeObjectURL(_url);
        };

        function showDescMore(pTar) {
            var _popup = d.querySelector('.popup');
            if (!_popup) {
                _popup = d.createElement('div');
                _popup.className = 'popup popup-mask';
                d.body.appendChild(_popup);
            }
            _popup.innerHTML = '';
            var _popupContainer = d.createElement('div');
            _popupContainer.className = 'popup-container popup-podcast animate__animated animate__fadeInPopup';
            var val = {
                title: pTar.querySelector('.podcast-text--title').innerHTML,
                artist: pTar.querySelector('.podcast-text--artist').innerHTML,
                desc: pTar.querySelector('.podcast-text--desc p').innerHTML
            };
            _popupContainer.innerHTML = d.querySelector('#popupPodcastText').innerHTML.Compile(val);
            _popup.appendChild(_popupContainer);
            d.querySelector('.popup-mask').style.display = 'block';
        }

        function scrollAction(pTar, actions, that) {
            var _pTar = pTar.querySelector(actions[2]);
            if (actions[0] == 'left') {
                _pTar.scrollBy(-parseInt(_pTar.getBoundingClientRect().width / 2, 10), 0);
                if (_pTar.scrollLeft <= parseInt(_pTar.getBoundingClientRect().width / 2, 10)) that.disabled = true;
            }
            if (actions[0] == 'right') {
                _pTar.scrollBy(parseInt(_pTar.getBoundingClientRect().width / 2, 10), 0);
                if (pTar.querySelector('.left')) pTar.querySelector('.left').disabled = false;
            }
        }

        function transformAction(pTar, actions, that) {
            var _pTar = pTar.querySelector(actions[2]);
            var _rect = _pTar.getBoundingClientRect();
            if (actions[0] == 'left') {
                var _transform = _pTar.style.transform,
                    _x = 0;
                if (_transform) {
                    var _reg_ret = /X\(([\-0-9\.]+px)\)/g.exec(_transform);
                    if (_reg_ret) _x = parseFloat(_reg_ret[1]);
                }
                _pTar.style.transform = 'translateX({0}px)'.Format(_x + _rect.width);
                if ((_x + _rect.width) > (0 - _rect.width)) that.style.display = 'none';
                that.nextElementSibling.style.display = 'inline-block';
            }
            if (actions[0] == 'right') {
                var _transform = _pTar.style.transform,
                    _x = 0;
                if (_transform) {
                    var _reg_ret = /X\(([\-0-9\.]+px)\)/g.exec(_transform);
                    if (_reg_ret) _x = parseFloat(_reg_ret[1]);
                }
                var __tar = _pTar.querySelectorAll(actions[3]);
                if (__tar.length > 0) {
                    __tar = __tar[__tar.length - 1];
                    var __rect = __tar.getBoundingClientRect();
                    if (__rect.x - _rect.width < _rect.width) that.style.display = 'none';
                }
                _pTar.style.transform = 'translateX({0}px)'.Format(_x - _rect.width);
                that.previousElementSibling.style.display = 'inline-block';
            }
        }

        function showPodcastAll(pTar) {
            var _cmpt = __data.contents.find(c => c.id == pTar.id);
            if (_cmpt && _cmpt.link) {
                var _popup = d.querySelector('.popup');
                if (!_popup) {
                    _popup = d.createElement('div');
                    _popup.className = 'popup popup-mask';
                    d.body.appendChild(_popup);
                }
                _popup.innerHTML = '';
                var _podcast = JSON.parse(_cmpt.text);
                var _podcast_linksHtml = '',
                    _podcastItemHTML = `<div class="podcast-platforms--item">
                    <a href="{url}" target="_blank">
                        <img class="podcast-platforms--logo" src="https://fly.linkcdn.to/statics/links/btn-podcast/{logo}.png" alt="{logo}">
                        <p class="podcast-platforms--title">{title}</p>
                        <svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M16 10V13.5C16 14.9 14.9 16 13.5 16H2.5C1.1 16 0 14.9 0 13.5V2.5C0 1.1 1.1 0 2.5 0H6C6.3 0 6.5 0.2 6.5 0.5C6.5 0.8 6.3 1 6 1H2.5C1.7 1 1 1.7 1 2.5V13.5C1 14.3 1.7 15 2.5 15H13.5C14.3 15 15 14.3 15 13.5V10C15 9.7 15.2 9.5 15.5 9.5C15.8 9.5 16 9.7 16 10ZM16 0.3C15.9 0.1 15.7 0 15.5 0H10C9.7 0 9.5 0.2 9.5 0.5C9.5 0.8 9.7 1 10 1H14.3L7.6 7.6C7.4 7.8 7.4 8.1 7.6 8.3C7.8 8.5 8.1 8.5 8.3 8.3L15 1.7V6C15 6.3 15.2 6.5 15.5 6.5C15.8 6.5 16 6.3 16 6V0.5C16 0.4 16 0.4 16 0.3Z" fill="#96A1AD"></path></svg>
                    </a>
                </div>`;
                _podcast_links.forEach(function(val) {
                    if (_podcast.links[val.platform]) {
                        _podcast_linksHtml += _podcastItemHTML.Compile({
                            logo: val.platform,
                            title: val.title,
                            url: _podcast.links[val.platform].url || 'javascript:;'
                        });
                    }
                });
                var _popupContainer = d.createElement('div');
                _popupContainer.className = 'popup-container popup-podcast animate__animated animate__fadeInPopup';
                _popupContainer.innerHTML = d.querySelector('#popupPodcastListenOn').innerHTML.Compile({
                    html: _podcast_linksHtml
                });
                _popup.appendChild(_popupContainer);
                d.querySelector('.popup-mask').style.display = 'block';
            }
        }

        function playAction(pTar, actions, that) {
            if (actions[2] == 'video') {
                var _pTar = pTar.querySelector(actions[2]);
                if (_pTar.paused) {
                    _pTar.play();
                    _pTar.parentElement.classList.add('playing');
                    that.innerHTML = '<svg viewBox="0 0 1024 1024" width="128" height="128"><path d="M444.096982 129.646755c0-36.365232-29.441543-65.806775-65.780169-65.806775L238.269174 63.83998c-36.338626 0-65.780169 29.441543-65.780169 65.806775l0 764.67886c0 36.391838 29.441543 65.833381 65.780169 65.833381l140.04764 0c36.338626 0 65.780169-29.441543 65.780169-65.833381L444.096982 129.646755zM389.775796 894.325615c0 6.365988-5.146207 11.512195-11.485589 11.512195L238.295779 905.83781c-6.339382 0-11.484565-5.146207-11.484565-11.512195L226.811214 129.646755c0-6.339382 5.145184-11.485589 11.484565-11.485589l139.995451 0c6.338359 0 11.485589 5.146207 11.485589 11.485589L389.776819 894.325615zM851.508949 129.646755c0-36.365232-29.441543-65.806775-65.779146-65.806775L645.682163 63.83998c-36.338626 0-65.780169 29.441543-65.780169 65.806775l0 764.67886c0 36.391838 29.441543 65.833381 65.780169 65.833381l140.04764 0c36.337603 0 65.779146-29.441543 65.779146-65.833381L851.508949 129.646755zM797.187763 894.325615c0 6.365988-5.145184 11.512195-11.485589 11.512195L645.707746 905.83781c-6.338359 0-11.485589-5.146207-11.485589-11.512195L634.222157 129.646755c0-6.339382 5.146207-11.485589 11.485589-11.485589l139.995451 0c6.339382 0 11.485589 5.146207 11.485589 11.485589L797.188786 894.325615z"></path></svg>';
                } else {
                    _pTar.pause();
                    _pTar.parentElement.classList.remove('playing');
                    that.innerHTML = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path d="M257 214l539.6 298L257 810V214m-15.9-75.2c-25.1 0-48.1 20.1-48.1 48.1v650.2c0 28 22.9 48.1 48.1 48.1 7.7 0 15.6-1.9 23.1-6.1L852.9 554c33.1-18.3 33.1-65.8 0-84L264.2 144.9c-7.5-4.2-15.4-6.1-23.1-6.1z"></path></svg>';
                }
            }
        }

        function toggleAction(toggle, action, that) {
            var _action = action.split('/'),
                pTar = null;
            if (toggle == 'more' && _action[0] == 'showDescMore') {
                pTar = ep(that, _action[1]);
                if (pTar) showDescMore(pTar);
            }
            if (toggle == 'scroll' && that.disabled == false) {
                pTar = ep(that, _action[1]);
                if (pTar && pTar.querySelector(_action[2])) scrollAction(pTar, _action, that)
            }
            if (toggle == 'showall' && _action[0] == 'podcast') {
                if (_action[1] == 'google') {
                    pTar = ep(that, _action[2]);
                    if (pTar && pTar.id) showPodcastAll(pTar);
                }
            }
            if (toggle == 'transform') {
                pTar = ep(that, _action[1]);
                if (pTar && pTar.querySelector(_action[2])) transformAction(pTar, _action, that)
            }
            if (toggle == 'play') {
                pTar = ep(that, _action[1]);
                if (pTar && pTar.querySelector(_action[2])) playAction(pTar, _action, that)
            }
            if (toggle == 'ytbsub' && _action[0] == 'subscribe') {
                d.querySelector('.modal-block').style.display = 'block';
                var _p = eleParents(that, '.ytb-channel-info');
                d.querySelector('.modal-block .subs-title').innerHTML = _p.querySelector('.ytb-channel-title').innerHTML;
                d.querySelector('.modal-block .subs-btn').dataset.kid = that.dataset.kid;
            }
        }
        var c = function(e) {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            var _fbe = e.target || e.srcElement || {},
                _fte = e.target || e.srcElement || {},
                _tmpl = null;
            if ((_fbe.href && _fbe.nodeName == 'A') || _fbe.nodeName == 'BUTTON') {} else if (_fbe.nodeName == 'IMG' || _fbe.nodeName == 'SPAN' || _fbe.nodeName == 'I' || _fbe.nodeName == 'P') {
                _fbe = _fbe.parentElement;
            } else {
                _fbe = eleParents(_fbe, 'button');
                if (!_fbe) return;
            }
            if (_fbe.dataset.type == 10) {
                if (window.fbq) fbq('track', 'formClick');
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box popup-form';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div>';
                _div.className = 'embed-popup-form';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var __form = JSON.parse(decodeURIComponent(_fbe.dataset.txt || '') || '{}');
                var _host = document.querySelector('meta[property="api:host"]').content || '';
                var embed_link = (_host.indexOf('linkfly.to') != -1 ? 'https://linkfly.to' : _host) + '/embed/share-cmpt.html?lid={0}&leuid={1}&lnk={2}'.Format(__data.bio.id, __data.basic.uid, location.pathname.substring(1) ? location.pathname.substring(1) : location.host);
                _div.innerHTML = d.querySelector('#embedLoading').innerHTML + '<div class="inner-embed-box"><iframe src="{0}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'.Format(embed_link);
                _div.querySelector('iframe').onload = function() {
                    this.contentWindow.postMessage({
                        fn: 'renderContent',
                        form: __form,
                        type: 'popupForm'
                    }, '*');
                }
                return;
            }
            if (_fbe.dataset.type == 12) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText);
                _div.className = 'embed-contact';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var txt = JSON.parse(decodeURIComponent(_fbe.dataset.txt) || '{}');
                _div.dataset.txt = _fbe.dataset.txt;
                _div.innerHTML = d.querySelector('#embed-verify').innerHTML.Format(txt.firstName + ' ' + txt.lastName) + d.querySelector('#embedLoading').innerHTML + '<p class="embed-verify-tips">Verifying your identity...</p>';
                setTimeout(function() {
                    _div.style.height = '220px';
                    setTimeout(function() {
                        _div.style.height = 'auto';
                    }, 300);
                }, 100);
                var renderContact = function() {
                    var contactHTML = '',
                        _tmpl0 = '',
                        _tmpl1 = '';
                    if (txt.emailPrimary || txt.emailSecondary) {
                        if (txt.emailPrimary) {
                            _tmpl0 = `<div class="contact-item-body-item"><p>{0}</p><a href="mailto:{1}" target="_blank">{1}</a></div>`.Format(txt.emailPrimaryType.toLowerCase(), txt.emailPrimary);
                        }
                        if (txt.emailSecondary) {
                            _tmpl1 = `<div class="contact-item-body-item"><p>{0}</p><a href="mailto:{1}" target="_blank">{1}</a></div>`.Format(txt.emailSecondaryType.toLowerCase(), txt.emailSecondary);
                        }
                        contactHTML = `<div class="contact-email contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path class="cls-1" d="M40.27,7.73H7.73A5.48,5.48,0,0,0,2.3,13.27V34.73a5.48,5.48,0,0,0,5.43,5.54H40.27a5.48,5.48,0,0,0,5.43-5.54V13.26A5.48,5.48,0,0,0,40.27,7.73ZM40.06,20.2,24.78,30.28a1.42,1.42,0,0,1-1.56,0L7.93,20.2a1.49,1.49,0,0,1-.43-2,1.42,1.42,0,0,1,2-.46l0,0L24,27.27l14.5-9.55a1.43,1.43,0,0,1,2,.41l0,0A1.49,1.49,0,0,1,40.06,20.2Z"/></svg></div><div class="contact-item-body">{0}{1}</div></div>`.Format(_tmpl0, _tmpl1);
                    }
                    if (txt.phonePrimary || txt.phoneSecondary) {
                        _tmpl0 = '';
                        _tmpl1 = '';
                        if (txt.phonePrimary) {
                            _tmpl0 = `<div class="contact-item-body-item"><p>{0}</p><a href="tel://{1}" target="_blank">{1}</a></div>`.Format(txt.phonePrimaryType.toLowerCase(), txt.phonePrimary);
                        }
                        if (txt.phoneSecondary) {
                            _tmpl1 = `<div class="contact-item-body-item"><p>{0}</p><a href="tel://{1}" target="_blank">{1}</a></div>`.Format(txt.phoneSecondaryType.toLowerCase(), txt.phoneSecondary);
                        }
                        contactHTML += '<div class="contact-phone contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path class="cls-1" d="M41.78,33.29c-3.57-2.7-7.07-4.52-9.58-1.61,0,0-2.67,3.18-10.52-4.25-9.12-8.71-5.29-11.79-5.29-11.79,3.17-3.19,1.15-5.57-1.51-9.18S9.53,1.71,5.67,4.82c-7.44,6,3.05,20,8.35,25.46h0s8.07,8.34,13.14,11.12l2.72,1.52c3.89,2,8.27,2.91,11.35,1a7.94,7.94,0,0,0,2.83-3.1C45.78,37.88,44.83,35.59,41.78,33.29Z"/></svg></div><div class="contact-item-body">{0}{1}</div></div>'.Format(_tmpl0, _tmpl1)
                    }
                    if (txt.address1 || txt.address2 || txt.city || txt.state || txt.country || txt.postcode) {
                        _tmpl0 = '';
                        if (txt.address1) _tmpl0 += txt.address1 + ', ';
                        if (txt.address2) _tmpl0 += txt.address2 + ', ';
                        if (txt.city) _tmpl0 += txt.city + ', ';
                        if (txt.state) _tmpl0 += txt.state + ', ';
                        if (txt.country) _tmpl0 += txt.country + ', ';
                        if (txt.postcode) _tmpl0 += txt.postcode + ', ';
                        _tmpl0.replace(/, $/, '');
                        contactHTML += '<div class="contact-address contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path d="M24,2.89A16.32,16.32,0,0,0,7.69,19.17a16.08,16.08,0,0,0,2.88,9.24,3.76,3.76,0,0,0,.3.47L22.78,44.55a1.61,1.61,0,0,0,1.22.56,1.68,1.68,0,0,0,1.28-.63l11.85-15.6c.11-.15.21-.32.27-.42a16.15,16.15,0,0,0,2.91-9.29A16.32,16.32,0,0,0,24,2.89ZM24,25h0a5.75,5.75,0,1,1,.16-11.49A5.74,5.74,0,1,1,24,25Z"/></svg></div><div class="contact-item-body"><p>{0}</p></div></div>'.Format(_tmpl0)
                    }
                    if (txt.note) {
                        contactHTML += '<div class="contact-note contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path d="M38,3H10A3,3,0,0,0,7,6V42a3,3,0,0,0,3,3H38a3,3,0,0,0,3-3V6A3,3,0,0,0,38,3ZM32,19.51,27.72,15a1,1,0,0,0-1.44,0L22,19.51V5H32Z"/></svg></div><div class="contact-item-body"><p>{0}</p></div></div>'.Format(txt.note);
                    }
                    contactHTML += '<div class="contact-link contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path d="M24,2.67A21.33,21.33,0,1,0,45.33,24,21.33,21.33,0,0,0,24,2.67ZM19.51,27.08a1.25,1.25,0,0,1-.85.34,1.18,1.18,0,0,1-.84-.35L13,22.22A7,7,0,0,1,12,21a6.39,6.39,0,0,1-.85-2.59,6.31,6.31,0,0,1,1.55-4.89,9,9,0,0,1,1.44-1.31,6.07,6.07,0,0,1,2.38-1,6.33,6.33,0,0,1,2.75.12,6.27,6.27,0,0,1,2.44,1.32c.31.28.61.58.9.87.12.13.25.25.37.37l3.86,3.82a1.21,1.21,0,0,1,.35.89,1.1,1.1,0,0,1-.36.83,1.23,1.23,0,0,1-1.69,0l-4.89-4.84a2.92,2.92,0,0,0-.32-.28h0v0l-.17-.12a3.87,3.87,0,0,0-1.62-.62,4.18,4.18,0,0,0-1,0,4.46,4.46,0,0,0-.95.26,4.78,4.78,0,0,0-.45.23l-.22.13-.12.09,0,0c-.18.15-.36.33-.57.53l-.21.21-.21.23-.06.07h0a5.67,5.67,0,0,0-.5.86,5.68,5.68,0,0,0-.27,1,5,5,0,0,0,0,1.09,5.23,5.23,0,0,0,.28,1,4,4,0,0,0,.31.58l.16.24.07.09.1.11.27.28,4.8,4.8a1.21,1.21,0,0,1,.35.89A1.14,1.14,0,0,1,19.51,27.08Zm8.93-.47c.23.22.47.45.7.7a1.27,1.27,0,0,1,.37,1,1.17,1.17,0,0,1-.39.89,1.33,1.33,0,0,1-.91.36,1.27,1.27,0,0,1-.9-.38l-7.75-7.74-.7-.7a1.34,1.34,0,0,1-.37-1,1.22,1.22,0,0,1,.39-.89,1.31,1.31,0,0,1,1.81,0ZM35,34.78a7.41,7.41,0,0,1-1.67,1.33,6.49,6.49,0,0,1-2.6.76l-.5,0a6.27,6.27,0,0,1-4.35-1.76l-.72-.72-4.25-4.24a1.23,1.23,0,0,1-.35-.9,1.13,1.13,0,0,1,.36-.82,1.22,1.22,0,0,1,1.69,0l4.95,4.94.29.27,0,0,0,0h0l.16.11a4.94,4.94,0,0,0,.64.35,5.56,5.56,0,0,0,1,.27,5,5,0,0,0,1.09,0,5.45,5.45,0,0,0,1-.27,5.51,5.51,0,0,0,.85-.49l.09-.08.22-.2.2-.2c.21-.21.38-.39.53-.57l0,0,.08-.12a1.64,1.64,0,0,0,.14-.22,4.78,4.78,0,0,0,.23-.45,4.37,4.37,0,0,0,.26-.94,3.74,3.74,0,0,0-.26-2,5.12,5.12,0,0,0-.3-.57c0-.06-.09-.12-.13-.19l0,0h0a.35.35,0,0,0-.08-.1c0-.06-.08-.1-.12-.15l-.28-.29-4.69-4.74a1.25,1.25,0,0,1-.35-.89,1.17,1.17,0,0,1,.36-.82,1.22,1.22,0,0,1,1.69,0L35.06,26a6.14,6.14,0,0,1,0,8.8Z"/></svg></div><div class="contact-item-body"><a href="{0}" target="_blank">{1}</a></div></div>'.Format(location.pathname, location.host + location.pathname);
                    _div.innerHTML = `<div class="embed-contact-detail"><div class="contact-name">{0}</div><div class="contact-position">{1}</div>{2}<div class="embed-button"><button onclick="saveContacts(this)">Save to Contacts</button></div></div>`.Format(txt.firstName + ' ' + txt.lastName, txt.position + ' · ' + txt.organization, contactHTML);
                    if (/iPhone OS.*CriOS/.test(navigator.userAgent)) _div.querySelector('.embed-button').style.display = 'none';
                };
                setTimeout(function() {
                    renderContact();
                }, 600)
                return;
            }
            if (_fbe.dataset.type < 10 && _fbe.dataset.st == 1) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _div.className = 'embed-iframe';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var link = decodeURIComponent(_fbe.dataset.embed || _fbe.dataset.html || '');
                if (link.indexOf('twitch.tv') != -1) link += ('&parent=' + location.host);
                if (link.indexOf('tiktok.com') != -1) _div.className += ' embed-iframe-tiktok';
                if (link.indexOf('vimeo.com') != -1) _div.className += ' embed-iframe-vimeo';
                if (link.indexOf('bilibili.com') != -1) _div.className += ' embed-iframe-bilibili';
                if (link.indexOf('facebook.com') != -1 || link.indexOf('fb.watch') != -1 || link.indexOf('fb.gg') != -1) {
                    _div.innerHTML = '<div class="fb-video" data-href="{0}" data-width="100%" data-allowfullscreen="true"></div>'.Format(link);
                    var loadFBIframe = function() {
                        if (_div.querySelector('iframe')) {
                            _div.querySelector('iframe').onload = function() {
                                endLoaded(_divBox.querySelector('.embed-loading'));
                                _div.style.height = '200px';
                                setTimeout(function() {
                                    _div.style.height = 'auto';
                                }, 390);
                            };
                        }
                    };
                    if (d.querySelector('#fb-sdk-js')) {
                        FB.XFBML.parse(_div);
                        loadFBIframe();
                    } else {
                        var fjs = d.getElementsByTagName(s)[0];
                        var js = d.createElement(s);
                        js.id = 'fb-sdk-js';
                        js.async = !0;
                        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0';
                        fjs.parentNode.insertBefore(js, fjs);
                        lfbjs(window).then(function() {
                            setTimeout(function() {
                                if (_div.querySelector('iframe')) {
                                    loadFBIframe();
                                } else {
                                    setTimeout(function() {
                                        if (_div.querySelector('iframe')) {
                                            loadFBIframe();
                                        } else {
                                            setTimeout(function() {
                                                loadFBIframe();
                                            }, 300)
                                        }
                                    }, 300)
                                }
                            }, 200);
                        })
                    }
                } else {
                    _div.innerHTML = '<iframe src="{link}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'.Compile({
                        link: link
                    });
                    _div.querySelector('iframe').onload = function() {
                        endLoaded(_divBox.querySelector('.embed-loading'));
                        if (_div.classList.contains('embed-iframe-tiktok')) {
                            _div.style.height = '735px';
                        } else if (_div.classList.contains('embed-iframe-vimeo')) {
                            _div.style.paddingBottom = '56%';
                        } else {
                            _div.style.height = '200px';
                            setTimeout(function() {
                                _div.style.height = 'auto';
                            }, 410);
                        }
                    };
                }
                return;
            }
            if (_fbe.dataset.type == 1 && (_fbe.dataset.st == 5 || _fbe.dataset.st == 6)) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div>';
                _div.className = 'embed-twitter';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var link = decodeURIComponent(_fbe.dataset.embed || _fbe.dataset.html || '');
                var twCls = 'twitter-tweet';
                if (_fbe.dataset.st == 6) {
                    link = link.replace(/(\/status\/.*)|(\/?\?.*)/i, '');
                    twCls = 'twitter-timeline'
                }
                _div.innerHTML = '<blockquote class="{2}" align="center" data-height="500"></blockquote>{1}<div class="embed-twitter-link"><a href="{0}" target="_blank"><span>View Tweet</span></a></div>'.Format(link, d.querySelector('#embedLoading').innerHTML, twCls);
                var loadTweetTimeline = function(st, lnk) {
                    if (st == 5) {
                        twttr.widgets.createTweet(lnk.split('/').pop(), _div.querySelector('blockquote'), {
                            align: 'center'
                        }).then(function() {
                            endLoaded(_div.querySelector('.embed-loading'), function() {
                                _div.querySelector('.embed-twitter-link').style.display = 'block';
                            })
                        });
                    } else {
                        twttr.widgets.createTimeline({
                            sourceType: "profile",
                            screenName: lnk.split('/').pop()
                        }, _div.querySelector('blockquote'), {
                            height: 500,
                            align: 'center'
                        }).then(function() {
                            endLoaded(_div.querySelector('.embed-loading'), function() {
                                _div.querySelector('.embed-twitter-link').style.display = 'block';
                            })
                        });
                    }
                };
                if (d.querySelector('#twitter-wjs')) {
                    loadTweetTimeline(_fbe.dataset.st, link)
                } else {
                    var fjs = d.getElementsByTagName(s)[0];
                    var js = d.createElement(s);
                    js.id = 'twitter-wjs';
                    js.async = !0;
                    js.src = 'https://platform.twitter.com/widgets.js';
                    fjs.parentNode.insertBefore(js, fjs);
                    ltwwjs(window).then(function() {
                        loadTweetTimeline(_fbe.dataset.st, link)
                    });
                }
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 3) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _div.className = 'embed-iframe';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var txt = JSON.parse(decodeURIComponent(_fbe.dataset.txt) || '{}');
                var music = txt.music || {};
                var service = ((txt.services || []).find(function(val) {
                    return val.platform == music.platform;
                }) || {});
                var link = service.url || '',
                    mtype = service.type == 2 ? 'track' : 'list';
                _div.className += ' embed-iframe-' + music.platform;
                if (link.indexOf('spotify.com') != -1) link = link.replace(/(https?\/?\/?).*\.spotify\.com/i, 'https://open.spotify.com/embed');
                else if (link.indexOf('apple.com') != -1) link = link.replace(/(https?\/?\/?).*\.apple\.com/i, 'https://embed.music.apple.com');
                else if (link.indexOf('deezer.com') != -1) {
                    link = link.replace(/(https?\/?\/?).*\.deezer\.com\/([a-z]{2,4}\/)?/i, 'https://widget.deezer.com/widget/auto/');
                    if (service.type == 3) link += '/top_tracks'
                } else if (link.indexOf('napster.com') != -1) {
                    var _uri = (service.uri || 'napster::').split(':');
                    link = 'https://us.napster.com/embedded-player/?ocode=social_user&pcode=social_user&cpath=Embed&rsrc=' + ('{0}#/{0}s/{1}'.Format(_uri[1], _uri[2]));
                } else if (link.indexOf('soundcloud.com') != -1) {
                    var _uri = (service.uri || 'soundcloud::').split(':');
                    _uri[1] = _uri[1] == 'album' ? 'playlist' : (_uri[1] == 'artist' ? 'user' : _uri[1]);
                    link = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/{0}s/{1}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'.Format(_uri[1], _uri[2])
                } else {
                    link = '';
                }
                if (link) {
                    _div.innerHTML = '<iframe mtype="{mtype}" src="{link}" width="100%" height="100%" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>'.Compile({
                        link: link,
                        mtype: mtype
                    });
                } else {
                    _div.innerHTML = '<div class="music-preview-nosample"><div class="nosample-cover"><img src="{0}"></div><p class="nosample-title">{1}</p></div>'.Format(clearImage(music.cover), music.title);
                }
                var servicesHTML = '';
                (txt.services || []).forEach(function(val, idx) {
                    servicesHTML += d.querySelector('#music-preview-service').innerHTML.Compile({
                        logo: val.platform_info && val.platform_info.platform ? clearImage((val.platform_info || {}).icon) : 'https://fly.linkcdn.to/images/links/service/logo/{0}.png'.Format(val.platform),
                        platform: (val.platform_info || {}).platform || val.platform,
                        name: MUSIC_SERVICES[val.platform] || (val.platform_info || {}).platform,
                        link: checkLink(val.url)
                    });
                });
                _div.innerHTML += '<div class="music-preview">{0}</div>'.Format(servicesHTML);
                if ((txt.services || []).length > 5) {
                    _div.innerHTML += '<div class="music-preview-more"><button data-action="more" onclick="musicPreviewMore(this)">Show more</button></div>'
                }
                if (_div.querySelector('iframe')) {
                    _div.querySelector('iframe').onload = function() {
                        endLoaded(_divBox.querySelector('.embed-loading'));
                        _div.style.height = '200px';
                        setTimeout(function() {
                            _div.style.height = 'auto';
                        }, 450);
                    };
                } else {
                    setTimeout(function() {
                        endLoaded(_divBox.querySelector('.embed-loading'));
                        _div.style.height = '200px';
                    }, 200);
                    setTimeout(function() {
                        _div.style.height = 'auto';
                    }, 450);
                }
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 8) {
                var _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box popup-map';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var txt = JSON.parse(decodeURIComponent(_fbe.dataset.txt) || '{}');
                var _host = document.querySelector('meta[property="api:host"]').content;
                var embed_link = (_host.indexOf('linkfly.to') != -1 ? 'https://linkfly.to' : _host) + '/embed/share-cmpt.html?lid={0}&leuid={1}&lnk={2}'.Format(__data.bio.id, __data.basic.uid, location.pathname.substring(1) ? location.pathname.substring(1) : location.host);
                _divBox.innerHTML += '<div class="inner-embed-box"><iframe src="{0}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'.Format(embed_link);
                _divBox.querySelector('iframe').onload = function() {
                    this.contentWindow.postMessage({
                        fn: 'renderContent',
                        map: txt,
                        type: 'popupMap'
                    }, '*');
                }
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 7) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div'),
                    _divDetail = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.dataset.kid = _fbe.dataset.kid;
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div>';
                _div.className = 'embed-support';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                _divDetail.className = 'embed-support-detail';
                _divBox.appendChild(_divDetail);
                d.querySelector('body').append(_divBg);
                var txt = JSON.parse(decodeURIComponent(_fbe.dataset.txt) || '{}');
                var amountHTML = '',
                    amountTMPL = d.querySelector('#embed-support-smount').innerHTML;
                txt.amount.forEach(function(val, idx) {
                    amountHTML += amountTMPL.Format(parseInt(Math.random() * 10000000000, 10), (val / 100.00), val)
                });
                _div.innerHTML = d.querySelector('#embed-support').innerHTML.Compile({
                    amount: amountHTML,
                    desc: txt.desc,
                    success: decodeURIComponent(txt.success),
                    customDisplay: txt.customAmount ? 'block' : 'none',
                    payType: txt.provider.type,
                    key: txt.provider.key
                });
                _divDetail.innerHTML = d.querySelector('#embed-support-detail').innerHTML.Compile({
                    success: decodeURIComponent(txt.success),
                    noteDisplay: txt.noteMessage ? 'block' : 'none',
                    link: location.pathname.slice(1),
                    payType: txt.provider.type,
                    key: txt.provider.key,
                    id: txt.provider.id,
                    merchantid: txt.provider.merchantId
                });
                v("click", selectSupportAmount, _div.querySelector('.support-amount'));
                v("keyup", selectSupportAmount, _div.querySelector('.support-amount'));
                v("click", payContinue, _div.querySelector('.support-continue button'));
                v("click", payBack, _divDetail.querySelector('.support-back button'));
                v("keyup", paySupportCheckEmail, _divDetail.querySelector('.support-detail-email input'));
                v("click", paySupportAction, _divDetail.querySelector('.support-continue button'));
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 9) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div'),
                    _divDetail = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = d.querySelector('#embedLoading').innerHTML + '<div class="embed-close"><i class="iconfont icon-close"></i></div>';
                _div.className = 'embed-shopify';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                _divDetail.className = 'embed-shopify-box';
                _div.appendChild(_divDetail);
                d.querySelector('body').append(_divBg);
                var txt = JSON.parse(decodeURIComponent(_fbe.dataset.txt) || '{}');
                if (txt.collection && txt.collection.id) {
                    lfjax('GET', '/share/{0}/link/{1}/itgr/shopify/op/collection.products/?prov_id={2}&cid={3}'.Format(__data.basic.uid, __data.bio.id, txt.provider.id, txt.collection.id), {
                        fn: function(resp) {
                            resp = JSON.parse(resp || '{}');
                            var tmpl = `<div class="embed-shopify-detail"><div class="shopify-desc"><p>{desc}</p></div><div class="shopify-products">{products}</div></div>
<div class="embed-shopify-info"><div class="embed-shopify-link"><p><a href="{link}" target="_blank">Shop Our Entire Collection</a></p></div></div>`;
                            var prodTmpl = `<div class="shopify-product"><div class="shopify-product-img"><img src="{src}"></div><div class="shopify-product-title"><p>{title}</p></div><div class="shopify-product-price">{price}</div></div>`,
                                productsHTML = '';
                            if (resp.code == 0) {
                                (resp.data.collection.products.edges || []).forEach(function(item) {
                                    var _price = item.node.priceRangeV2.minVariantPrice || item.node.priceRangeV2.maxVariantPrice;
                                    productsHTML += prodTmpl.Compile({
                                        src: item.node.featuredImage.src,
                                        title: item.node.title,
                                        price: _price.currencyCode + _price.amount
                                    })
                                });
                                var winW = window.innerWidth,
                                    pl = (resp.data.collection.products.edges || []).length;
                                _divDetail.innerHTML = tmpl.Compile({
                                    desc: txt.desc || '',
                                    link: 'https://' + txt.provider.link + '/collections/' + resp.data.collection.handle,
                                    products: productsHTML
                                });
                                _div.style.height = 150 + (txt.desc ? parseInt(txt.desc.length / 100, 10) * 20 : 0) + (winW > 767 ? (pl ? parseInt(pl / 2, 10) * 300 : 0) : 300) + 'px';
                                endLoaded(_divBox.querySelector('.embed-loading'));
                                setTimeout(function() {
                                    _div.style.height = 'auto'
                                }, 400);
                            }
                        }
                    })
                } else {
                    lfjax('GET', '/share/{0}/link/{1}/itgr/shopify/op/products/?prov_id={2}&ids={3}'.Format(__data.basic.uid, __data.bio.id, txt.provider.id, txt.products.join(',')), {
                        fn: function(resp) {
                            resp = JSON.parse(resp || '{}');
                            var tmpl = `<div class="embed-shopify-detail"><div class="shopify-desc"><p>{desc}</p></div><div class="shopify-products">{products}</div></div>
<div class="embed-shopify-info"><div class="embed-shopify-link"><p><a href="{link}" target="_blank">Shop Our Entire Shop</a></p></div></div>`;
                            var prodTmpl = `<div class="shopify-product"><div class="shopify-product-img"><img src="{src}"></div><div class="shopify-product-title"><p>{title}</p></div><div class="shopify-product-price">{price}</div></div>`,
                                productsHTML = '';
                            if (resp.code == 0) {
                                (resp.data.products.edges || []).forEach(function(item) {
                                    var _price = item.node.priceRangeV2.minVariantPrice || item.node.priceRangeV2.maxVariantPrice;
                                    productsHTML += prodTmpl.Compile({
                                        src: item.node.featuredImage.src,
                                        title: item.node.title,
                                        price: _price.currencyCode + _price.amount
                                    })
                                });
                                var winW = window.innerWidth,
                                    pl = (resp.data.products.edges || []).length;
                                _divDetail.innerHTML = tmpl.Compile({
                                    desc: txt.desc || '',
                                    link: 'https://' + txt.provider.link,
                                    products: productsHTML
                                });
                                _div.style.height = 150 + (txt.desc ? parseInt(txt.desc.length / 100, 10) * 20 : 0) + (winW > 767 ? (pl ? parseInt(pl / 2, 10) * 300 : 0) : 300) + 'px';
                                endLoaded(_divBox.querySelector('.embed-loading'));
                                setTimeout(function() {
                                    _div.style.height = 'auto'
                                }, 400);
                            }
                        }
                    })
                }
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 10) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _div.className = 'embed-pins';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var link = decodeURIComponent(_fbe.dataset.embed || _fbe.dataset.html || '').split('?')[0];
                var regPin = /^https?:\/\/(([a-z]{1,3})\.)?pinterest\.([a-z]{0,2}\.)?([a-z]{1,3})/;
                if (link && regPin.test(link)) {
                    _tmpl = '<div class="embed-pins-pin"><a href="{0}" data-pin-do="{1}" {2}></a></div><div class="embed-twitter-link"><a href="{0}?utm_medium=social&utm_source=linkfly&utm_campaign={3}" target="_blank"><span>View on Pinterest</span></a></div>';
                    var links = link.replace(/^https?:\/\//, '').split('?')[0].split('/');
                    if (links.length > 2) {
                        if (links[1] == 'pin') {
                            _div.innerHTML = _tmpl.Format(link, 'embedPin', '', _fbe.dataset.title);
                        } else if (links[2] == 'pins' || links[2] == '_saved' || links[2] == '_shop' || links[2] == '_created' || links[2] == '') {
                            _div.innerHTML = _tmpl.Format(link, 'embedUser', 'data-pin-board-width="600" data-pin-scale-height="280" data-pin-scale-width="160"', _fbe.dataset.title);
                        } else {
                            _div.innerHTML = _tmpl.Format(link, 'embedBoard', 'data-pin-board-width="600" data-pin-scale-height="280" data-pin-scale-width="160"', _fbe.dataset.title);
                        }
                    }
                    if (links.length == 2) {
                        _div.innerHTML = _tmpl.Format(link, 'embedUser', 'data-pin-board-width="600" data-pin-scale-height="280" data-pin-scale-width="160"', _fbe.dataset.title);
                    }
                    if (d.querySelector('#pin-utils-js') || window.PinUtils) {
                        lpinjs(window).then(function() {
                            PinUtils.build(d.querySelector('.embed-pins-pin'));
                            setTimeout(function() {
                                _div.style.height = '320px';
                                setTimeout(function() {
                                    _div.style.height = 'auto';
                                    d.querySelector('.embed-twitter-link').style.display = 'block';
                                }, 390);
                                endLoaded(_divBox.querySelector('.embed-loading'));
                            }, 300);
                        });
                    } else {
                        var fjs = d.getElementsByTagName(s)[0];
                        var js = d.createElement(s);
                        js.id = 'pin-utils-js';
                        js.async = !0;
                        js.src = 'https://assets.pinterest.com/js/pinit.js';
                        fjs.parentNode.insertBefore(js, fjs);
                        lpinjs(window).then(function() {
                            setTimeout(function() {
                                _div.style.height = '320px';
                                setTimeout(function() {
                                    _div.style.height = 'auto';
                                    d.querySelector('.embed-twitter-link').style.display = 'block';
                                }, 390);
                                endLoaded(_divBox.querySelector('.embed-loading'));
                            }, 300);
                        });
                    }
                }
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 11) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _div.className = 'embed-rssfeed';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var txt = JSON.parse(decodeURIComponent(_fbe.dataset.txt) || '{}');
                if (txt.link && txt.feed) {
                    lfjax('GET', '/share/{0}/link/{1}/itgr/{2}/op/rss.feed/?feed={3}&limit={4}'.Format(__data.basic.uid, __data.bio.id, txt.platform, txt.feed, txt.max), {
                        fn: function(resp) {
                            resp = JSON.parse(resp || '{}');
                            if (resp.code == 0) {
                                var servicesHTML = '';
                                (resp.data.items || []).forEach(function(val, idx) {
                                    servicesHTML += d.querySelector('#rss-feed').innerHTML.Compile({
                                        logo: val.image ? clearImage(val.image) : '',
                                        platform: txt.platform,
                                        link: val.link + (val.link.indexOf('?') > 0 ? '&' : '?') + 'utm_medium=social&utm_source=linkfly',
                                        title: val.title
                                    });
                                });
                                _div.innerHTML += '<div class="rss-feed">{0}</div>'.Format(servicesHTML);
                                if ((resp.data.items || []).length > 5) {
                                    _div.innerHTML += '<div class="rss-feed-more"><button data-action="more" onclick="showMore(this)">Show more</button></div>'
                                }
                                var pl = (resp.data.items || []).length;
                                _div.style.height = (75 + (pl ? parseInt(pl / 2, 10) * 50 : 0)) + 'px';
                                endLoaded(_divBox.querySelector('.embed-loading'));
                                setTimeout(function() {
                                    _div.style.height = 'auto'
                                }, 400);
                            }
                        }
                    })
                }
                return;
            }
            if (_fbe.dataset.type < 10 && _fbe.dataset.st == 2) {
                d.querySelector('.modal-block').style.display = 'block';
                d.querySelector('.modal-block .subs-title').innerHTML = decodeURIComponent(_fbe.dataset.embed);
                d.querySelector('.modal-block .subs-btn').dataset.kid = _fbe.dataset.kid;
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 12) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _div.className = 'embed-cameo';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var link = _fbe.dataset.html || '';
                if (link && link.indexOf('cameo.com/')) {
                    link = link.replace(/(https?:\/\/)/, '').split('?')[0]
                    lfjax('GET', 'https://www.cameo.com/api/user/show/{0}'.Format(link.split('/').splice(-1)), {
                        fn: function(resp) {
                            resp = JSON.parse(resp || '{}');
                            if (resp.user) {
                                var _user = resp.user,
                                    _orders = resp.orders;
                                var _cameo = {
                                    imageUrl: _user.imageUrl,
                                    name: _user.name,
                                    bio: _user.profession || _user.bio,
                                    rate: '{0} - {1}'.Format(_user.averageRating, _user.numOfRatings),
                                    link: link,
                                    buttonText: _fbe.dataset.title
                                }
                                var _cameoItemHTML = d.querySelector('#cameoEmbedItemTmpl').innerHTML,
                                    _cameoOrdersHTML = '';
                                _orders.forEach(function(v, i) {
                                    _cameoOrdersHTML += _cameoItemHTML.Compile({
                                        source: v.mediaUrl,
                                        poster: v.nakedThumbnailUrl
                                    });
                                });
                                _cameo.ordersHTML = _cameoOrdersHTML;
                                _div.innerHTML = d.querySelector('#cameoEmbedTmpl').innerHTML.Compile(_cameo);
                                _div.style.height = '600px';
                                endLoaded(_divBox.querySelector('.embed-loading'));
                                setTimeout(function() {
                                    _div.style.height = 'auto'
                                }, 400);
                            }
                        }
                    })
                }
                return;
            }
            if (_fbe.dataset.type == 1 && _fbe.dataset.st == 13) {
                var _div = d.createElement('div'),
                    _divBox = d.createElement('div'),
                    _divBg = d.createElement('div');
                _divBg.className = 'embed-bg';
                _divBox.className = 'embed-box';
                _divBox.innerHTML = '<div class="embed-close"><i class="iconfont icon-close"></i></div><div class="embed-box-title">{0}</div>'.Format(_fbe.querySelector('p').innerText) + d.querySelector('#embedLoading').innerHTML;
                _div.className = 'embed-bandsintown';
                _divBox.appendChild(_div);
                _divBg.appendChild(_divBox);
                d.querySelector('body').append(_divBg);
                var link = _fbe.dataset.html || '';
                if (link && link.indexOf('bandsintown.com/a/')) {
                    link = link.replace(/(https?:\/\/)/, '').split('?')[0];
                    var _artist_id = link.split('/').splice(-1)[0],
                        _artist, _events;
                    var _renderBitEvents = function() {
                        var _evtItemTpl = d.querySelector('#bandsintownEmbedItemTmpl').innerHTML,
                            _eventsHTML = '';
                        _events.forEach(function(evt, i) {
                            if (i < 6) {
                                var venue = evt.venue || {},
                                    date = new Date((evt.starts_at || evt.datetime).replace(/-/g, '/').replace('T', ' '));
                                _eventsHTML += _evtItemTpl.Compile({
                                    url: evt.url,
                                    title: evt.title,
                                    location: venue.location || (venue.city),
                                    timeH: date.Format('H'),
                                    month: date.Format('X'),
                                    day: date.Format('M')
                                });
                            }
                        })
                        var replaceNum = function(str, p1, p2) {
                            while (/(\d+)(\d{3})/g.test(p1)) {
                                p1 = p1.replace(RegExp.$2, ',' + RegExp.$2)
                            }
                            return p1 + ',' + p2;
                        }
                        if (_artist.upcoming_event_count > 6) {
                            _eventsHTML += '<div class="embed-bandsintown-events--more"><a href="https://{1}?utm_medium=social&utm_source=linkfly&utm_campaign=artist" target="_blank">+ {0} more...</a></div>'.Format(_artist.upcoming_event_count - 6, link);
                            _div.style.height = '600px';
                        } else {
                            _div.style.height = (_artist.upcoming_event_count * 86 + 100) + 'px';
                        }
                        if (_artist.upcoming_event_count == 0) {
                            _eventsHTML = '<div class="embed-bandsintown-events--null">This artist has no upcoming concerts. Follow them for future updates.</div>'
                        }
                        _div.innerHTML = d.querySelector('#bandsintownEmbedTmpl').innerHTML.Compile({
                            imageUrl: _artist.thumb_url || _artist.image_url,
                            name: _artist.name,
                            bio: '{0} Followers · {1} Concerts'.Format((_artist.tracker_count + '').replace(/(\d+)(\d{3})$/g, replaceNum), _artist.upcoming_event_count),
                            link: link,
                            linkName: _artist.upcoming_event_count > 6 ? 'See All Upcoming Concerts' : ('Follow ' + _artist.name),
                            eventsHTML: _eventsHTML
                        });
                        endLoaded(_divBox.querySelector('.embed-loading'));
                        setTimeout(function() {
                            _div.style.height = 'auto'
                        }, 400);
                    }
                    lfjax('GET', 'https://rest.bandsintown.com/artists/id_{0}?app_id=linktree-0000307871'.Format(_artist_id.split('-')[0]), {
                        fn: function(resp) {
                            _artist = JSON.parse(resp || '{}');
                            if (_artist && _events) {
                                _renderBitEvents();
                            }
                        }
                    })
                    lfjax('GET', 'https://rest.bandsintown.com/artists/id_{0}/events?app_id=linktree-0000307871&date=upcoming'.Format(_artist_id.split('-')[0]), {
                        fn: function(resp) {
                            _events = JSON.parse(resp || '{}');
                            if (_artist && _events) {
                                _renderBitEvents();
                            }
                        }
                    })
                }
            }
            if (_fbe.nodeName == 'BUTTON' && _fbe.getAttribute('toggle') && _fbe.getAttribute('action')) {
                toggleAction(_fbe.getAttribute('toggle'), _fbe.getAttribute('action'), _fbe);
                return;
            }
        };
        var c1 = function(e) {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            var _fbe = e.target || e.srcElement || {},
                _fte = e.target || e.srcElement || {},
                _tmpl = null;
            _fbe = _fbe.parentElement;
            if (_fte.nodeName == 'I' && _fte.classList.contains('icon-close') && _fbe.classList.contains('embed-close')) {
                d.querySelector('.embed-bg').remove();
                return;
            }
            if (_fte.classList.contains('embed-bg')) {
                d.querySelector('.embed-bg').remove();
                return;
            }
            if (_fte.nodeName != 'BUTTON') {
                _fbe = eleParents(_fte, 'button');
            } else {
                _fbe = _fte;
            }
            if (_fbe && _fbe.nodeName == 'BUTTON' && _fbe.getAttribute('toggle') && _fbe.getAttribute('action')) {
                toggleAction(_fbe.getAttribute('toggle'), _fbe.getAttribute('action'), _fbe);
                return;
            }
        };
        var c2 = function(e) {
            d.querySelector('.modal-block').style.display = 'none';
            d.querySelector('.modal-block .subs-title').innerHTML = '';
            d.querySelector('.modal-block .info').style.display = 'block';
            d.querySelector('.modal-block .success').style.display = 'none';
            d.querySelector('.modal-block .subs-btn').style.display = 'inline-block';
        };
        var c3 = function() {
            var w = window.innerWidth >= 700 ? 700 : window.innerWidth;
            var h = window.innerHeight >= 800 ? 800 : window.innerHeight;
            var kid = d.querySelector('.modal-block .subs-btn').dataset.kid;
            if (kid) window.open('https://api.linkfly.to/v/1.8/plat/youtube/auth/lnk/{0}/?id={1}'.Format(__data.bio.id, kid), 'YoutubeAuth' + new Date().getTime(), "resizable,scrollbars,status,width={0},height={1}".Format(w, h));
        };
        v("click", c, d.querySelector('.container'));
        v("click", c1, d.querySelector('body'));
        v("click", c2, d.querySelector('.modal-block .modal-close'));
        v("click", c3, d.querySelector('.modal-block .subs-btn'));
    }(document, 'script'));
}());