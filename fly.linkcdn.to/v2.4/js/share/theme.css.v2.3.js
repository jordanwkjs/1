(function(d) {
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

    function isEmpty(v) {
        return (v === undefined || v === null || v === '');
    }
    var _IMAGE_DOMAIN = 'https://fly.linkcdn.to/';

    function _int(num) {
        num = parseInt(num, 10);
        if (isNaN(num)) return 0;
        return num;
    }

    function _parse_style(style, m) {
        var _HIDE_RE_COMPILE = /\.hide(-(\w+))+/ig,
            _HIDE_RE_COMPILE_MATCH = /-(\w+)/ig;
        style = (typeof style !== 'undefined') ? style : '';
        m = (typeof m !== 'undefined') ? m : 'hide';
        if (m == 'hide' && style.indexOf('.hide-') != -1) {
            if (_HIDE_RE_COMPILE.test(style)) return _HIDE_RE_COMPILE_MATCH.exec(style);
        }
        return [];
    }

    function _hex2rgb(color, opacity, style) {
        opacity = (typeof opacity !== 'undefined') ? opacity : null;
        style = (typeof style !== 'undefined') ? style : '';
        if (color) {
            color = color.replace('#', '');
            opacity = (opacity === null || opacity === '') ? 1 : _int(opacity) / 100;
            if (style) {
                if (_parse_style(style).includes('opacity')) opacity = 1;
            }
            if (opacity <= 0) return 'rgba(0,0,0,0)';
            if (color.length == 3) {
                return 'rgba({r},{g},{b},{a})'.Compile({
                    r: color[0],
                    g: color[1],
                    b: color[2],
                    a: opacity.toFixed(3)
                })
            }
            if (color.length == 4) {
                return 'rgba({r},{g},{b},{a})'.Compile({
                    r: color[0],
                    g: color[1],
                    b: color[2],
                    a: (parseInt(color[3] + color[3], 16) / 255).toFixed(3)
                })
            }
            if (color.length == 6) {
                return 'rgba({r},{g},{b},{a})'.Compile({
                    r: parseInt(color.substr(0, 2), 16),
                    g: parseInt(color.substr(2, 2), 16),
                    b: parseInt(color.substr(4, 2), 16),
                    a: opacity.toFixed(3)
                })
            }
            if (color.length == 8) {
                return 'rgba({r},{g},{b},{a})'.Compile({
                    r: parseInt(color.substr(0, 2), 16),
                    g: parseInt(color.substr(2, 2), 16),
                    b: parseInt(color.substr(4, 2), 16),
                    a: (parseInt(color.substr(4, 2), 16) / 255).toFixed(3)
                })
            }
        }
        return 'rgba(0,0,0,0)';
    }

    function _format_color(color) {
        if (color) {
            if (typeof color == 'number') color = color + '';
            if (color.startsWith('rgba(')) {
                var _color_val = color.replace('rgba(', '');
                if (_color_val.endsWith(')')) _color_val = _color_val.slice(0, -1);
                _color_val = _color_val.split(',');
                if (_color_val.length == 3) return 'rgba({0}, {1}, {2}, 1)'.Format(_color_val[0], _color_val[1], _color_val[2]);
                if (_color_val.length == 4) return 'rgba({0}, {1}, {2}, {3})'.Format(_color_val[0], _color_val[1], _color_val[2], _color_val[3]);
                return color;
            }
            if (color.startsWith('rgb(')) {
                _color_val = color.replace('rgb(', '');
                if (_color_val.endsWith(')')) _color_val = _color_val.slice(0, -1);
                _color_val = _color_val.split(',');
                if (_color_val.length == 3) return 'rgb({0}, {1}, {2})'.Format(_color_val[0], _color_val[1], _color_val[2]);
                if (_color_val.length == 4) return 'rgba({0}, {1}, {2}, {3})'.Format(_color_val[0], _color_val[1], _color_val[2], _color_val[3]);
                return color
            }
            if (!color.startsWith('#')) return '#' + color;
            return color
        }
        return ''
    }

    function _check_image(link, w, h) {
        if (!link) return '';
        if (link.indexOf('http') != 0) link = _IMAGE_DOMAIN + link;
        if (link.indexOf('d351p1jxpt6hnn.cloudfront.net') != 0) link = link.replace('d351p1jxpt6hnn.cloudfront.net', 'fly.linkcdn.to');
        if (link.indexOf('.fotoee.com') != -1) {
            if (link.indexOf('?imageView2') != -1) link = link.split('?')[0];
            return link + '?imageView2/2' + (w ? '/w/' + w : '') + (h ? '/h/' + h : '');
        }
        return link;
    }
    var Lfy_Theme_2_CSS_Text = {
        'font': 'body,body .center{font-family:{0};--link-font:{0};}',
        'titleColor': '.text h3{color:{0}!important;}body{--link-title-color:{0};}',
        'descColor': '.desc{color:{0}!important;}',
        'header_color': '.item-header{color:{0}!important;}',
        'textColor': 'body{--link-title-color:{0};--link-desc-color:{0};}.text h3,.desc{color:{0}!important;}',
    };
    var Lfy_Theme_2_CSS_Layout = {
        'block': {
            'background': `.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;}
.item{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;box-shadow:none}
.item-style:hover{background-color:rgba(0,0,0,0)!important;box-shadow:none;transform:none}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-border-color)!important}
.item-style:hover .iconfont{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.cmpt-item--style::before,.cmpt-item--stylem::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.cmpt-item--style .ctm-style{border:0!important;background-color:transparent;}
.cmpt-item--style{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;box-shadow:none}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form .ctm-style{border:0!important;background-color:transparent;}
.item-form{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;box-shadow:none}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form{padding:0}`,
            'style1': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important;margin:0;background-color:transparent;border-radius:0;margin-bottom:-1px}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important;margin:0;background-color:transparent;border-radius:0;margin-bottom:-1px}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;box-shadow:none}
.cmpt-item--style .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important;margin:0;background-color:transparent;border-radius:0;margin-bottom:-1px}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;box-shadow:none}
.item-form .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0;}
.item-form .form-button button{border-radius:0}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.biolink,.link-form,.edit-form{padding:0}`,
            'style2': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style .ctm-style{margin:4px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important}
.item-style:hover .ctm-style{background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-border-color)!important}
.item-style:hover .iconfont{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;box-shadow:none}
.cmpt-item--style .ctm-style{margin:3px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;box-shadow:none}
.item-form .ctm-style{margin:3px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form{padding:0}`,
            'style3': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important}
.item-style::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important}
.item-style .ctm-style{margin:5px;background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;box-shadow:none}
.cmpt-item--style::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important;mask-image:none;-webkit-mask-image:none;}
.cmpt-item--style::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important;left:initial;mask-image:none;-webkit-mask-image:none;}
.cmpt-item--style .ctm-style{margin:5px;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;box-shadow:none}
.item-form::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important;mask-image:none;-webkit-mask-image:none;}
.item-form::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important;left:initial;mask-image:none;-webkit-mask-image:none;}
.item-form .ctm-style{margin:5px;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.biolink,.link-form,.edit-form{padding:0}`,
            'style4': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important;margin:0;background-color:transparent}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style .ctm-style{margin:0;border:0}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important;margin:0;background-color:transparent}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;box-shadow:none}
.cmpt-item--style .ctm-style{margin:0;border:0}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important;margin:0;background-color:transparent}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;box-shadow:none}
.item-form .ctm-style{margin:0;border:0}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form{padding:0}`,
            'style5': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style::after{position:absolute;bottom:-8px;right:8px;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style .ctm-style{margin:0;background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-style .ctm-style:before{position:absolute;top:-2px;left:-10px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.item-style .ctm-style:after{position:absolute;bottom:-10px;right:-2px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0!important;box-shadow:none}
.cmpt-item--style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.cmpt-item--style::after{position:absolute;bottom:-8px;right:8px;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.cmpt-item--style .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.cmpt-item--style .ctm-style:before{position:absolute;top:0px;left:-8px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.cmpt-item--style .ctm-style:after{position:absolute;bottom:-8px;right:0px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0!important;box-shadow:none}
.item-form::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form::after{position:absolute;bottom:-8px;right:8px;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .ctm-style:before{position:absolute;top:0px;left:-8px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.item-form .ctm-style:after{position:absolute;bottom:-8px;right:0px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.biolink,.link-form,.edit-form{padding:0}`,
            'style6': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style::after{position:absolute;bottom:-7px;right:8px;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style .ctm-style{margin:0;background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-style .ctm-style:before{position:absolute;top:1px;left:-10px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.item-style .ctm-style:after{position:absolute;bottom:-6px;right:-2px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0px solid transparent!important;box-shadow:none}
.cmpt-item--style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.cmpt-item--style::after{position:absolute;bottom:-7px;right:8px;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.cmpt-item--style .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.cmpt-item--style .ctm-style:before{position:absolute;top:3px;left:-8px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.cmpt-item--style .ctm-style:after{position:absolute;bottom:-4px;right:0px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0px solid transparent!important;box-shadow:none}
.item-form::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form::after{position:absolute;bottom:-7px;right:8px;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .ctm-style:before{position:absolute;top:3px;left:-8px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.item-form .ctm-style:after{position:absolute;bottom:-4px;right:0px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.biolink,.link-form,.edit-form{padding:0}`,
            'border.shadow': `.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;}
.item{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-color) 12px 12px 0px 0px;margin-bottom:20px}
.item-style:hover{background-color:var(--link-block-bg-color)!important;transform:translate(4px, 4px);box-shadow:var(--link-block-shadow-color) 8px 8px 0px 0px;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.cmpt-item--style::before,.cmpt-item--style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.cmpt-item--style .ctm-style{border:0!important;background-color:transparent;}
.cmpt-item--style{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-color) 12px 12px 0px 0px;margin-bottom:20px}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form .ctm-style{border:0!important;background-color:transparent;}
.item-form{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-color) 12px 12px 0px 0px;margin-bottom:20px}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form{padding:0 12px 0 0;}`,
            'border.double': `.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-style:hover .ctm-style{margin:4px;}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before,.cmpt-item--style::after,.cmpt-item--style::before{display:none;background:0 0;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important}
.cmpt-item--style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;box-shadow:none}
.cmpt-item--style .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form .ctm-style{border:0!important}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;box-shadow:none}
.item-form .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.biolink,.link-form,.edit-form{padding:0}`,
            'border.wave': `.item-style .ctm-style::after,.item-style .ctm-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important;background-color:transparent}
.item{border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none;background-color:var(--link-block-bg-color)!important}
.item-style:hover .btn,.item-style:hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:hover .iconfont{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style::after,.item-style::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.item-style:before{top:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.item-style:after{bottom:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item-style:hover:before{animation-play-state:running;-webkit-animation-play-state:running}
.item-style:hover:after{animation-name:buttonWaveBottom;-webkit-animation-name:buttonWaveBottom;animation-play-state:running;-webkit-animation-play-state:running}
.cmpt-item--style .ctm-style::after,.cmpt-item--style .ctm-style::before{display:none;background:initial;transform:none;border:0}
.cmpt-item--style .ctm-style{border:0!important;background-color:transparent}
.cmpt-item--style{border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;box-shadow:none}
.cmpt-item--style::after,.cmpt-item--style::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;width:initial;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.cmpt-item--style:before{top:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.cmpt-item--style:after{bottom:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item-form .ctm-style::after,.item-form .ctm-style::before{display:none;background:initial;transform:none;border:0}
.item-form .ctm-style{border:0!important;background-color:transparent}
.item-form{border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;box-shadow:none}
.item-form::after,.item-form::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;width:initial;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.item-form:before{top:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.item-form:after{bottom:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.cmpt-item .item-box,.cmpt-item .item-box iframe,.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.biolink,.link-form,.edit-form{padding:0}`,
            'corner': '--link-block-corner:{0}px;',
            'border': '--link-block-border:{0}px;',
        },
        'colors': {
            background: `--link-block-bg-color:{0};`,
            text: `--link-block-font-color:{0};`,
            shadow: `--link-block-shadow-color:{0};`,
            border: `--link-block-border-color:{0};`,
        },
        'thumbnail': {
            'style': {
                'origin': `.item .btn-img{display:inline-block;}
                .item .btn-icon{display:none;}`,
                'borderColor': `.item .btn-img{display:none;}
                .item .btn-icon{display:inline-block;}`
            },
            'corner': `--link-thumbnail-radius:{0}%;`,
            'radius': {
                'radius0': '--link-thumbnail-radius:0%;',
                'radius': '--link-thumbnail-radius:8px;',
                'radius12': '--link-thumbnail-radius:8px;',
                'radius50': '--link-thumbnail-radius:50%;'
            },
            'color': `--link-thumbnail-color:{0};`,
        },
        'button': {
            backgroundColor: `--link-button-bg-color:{0};`,
            textColor: `--link-button-font-color:{0};`,
        },
    };
    var Lfy_Theme_2_CSS_Background = {
        'color': '.bg{background-image:initial;background-color:{0};}.bg video{display:none}',
        'gradient': {
            'gradient.style.flat': '--link-background-gradient-style:to right;',
            'gradient.style.up': '--link-background-gradient-style:to bottom;',
            'gradient.style.down': '--link-background-gradient-style:to top;',
            'flat': '--link-background-gradient-style:to right;',
            'up': '--link-background-gradient-style:to bottom;',
            'down': '--link-background-gradient-style:to top;',
            'inOut': '',
            'outIn': '',
            'gradient.color.default': '',
            'gradient.color.color1': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #EF629F, #EECDA3)}.bg video{display:none}`,
            'gradient.color.color2': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #F64F59, #C471ED, #12C2E9)}.bg video{display:none}`,
            'gradient.color.color3': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #FDBB2D, #22C1C3)}.bg video{display:none}`,
            'gradient.color.color4': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #1D2671, #C33764)}.bg video{display:none}`,
            'gradient.color.color5': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #2C3E50, #BDC3C7)}.bg video{display:none}`,
            'gradient.color.color6': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #B91D73, #F953C6)}.bg video{display:none}`,
            'gradient.color.color7': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #C6FFDD, #FBD786, #F7797D)}.bg video{display:none}`,
            'gradient.color.color8': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #0083B0, #00B4DB)}.bg video{display:none}`,
            'gradient.color.color9': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #185A9D, #43CEA2)}.bg video{display:none}`,
            'gradient.color.color10': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #870000, #190A05 35%)}.bg video{display:none}`,
            'gradient.color.color11': `.bg{background-image:linear-gradient(var(--link-background-gradient-style), #EEF2F3, #8E9EAB)}.bg video{display:none}`,
        },
        'image': {
            'style': {
                'default': '.css-null{background-image:url("")}.bg video{display:none}',
                'gallery': `body{background:rgba(0,0,0,0);}
.bg-container{width:110%;height:110vh;top:-5%;left:-5%;}
.bg{
    background-image: linear-gradient(rgba(0, 0, 0, var(--link-background-image-opacity)),rgba(0, 0, 0, var(--link-background-image-opacity))), url({0});
    -webkit-filter: blur(var(--link-background-image-blur));
    -moz-filter: blur(var(--link-background-image-blur));
    -ms-filter: blur(var(--link-background-image-blur));
    filter: blur(var(--link-background-image-blur));
    background-size: cover;
    background-position: center;
}.bg video{display:none}`,
                'upload': `body{background:rgba(0,0,0,0);}
.bg-container{width:110%;height:110vh;top:-5%;left:-5%;}
.bg{
    background-image: linear-gradient(rgba(0, 0, 0, var(--link-background-image-opacity)),rgba(0, 0, 0, var(--link-background-image-opacity))), url({0});
    -webkit-filter: blur(var(--link-background-image-blur));
    -moz-filter: blur(var(--link-background-image-blur));
    -ms-filter: blur(var(--link-background-image-blur));
    filter: blur(var(--link-background-image-blur));
    background-size: cover;
    background-position: center;
}.bg video{display:none}`,
            },
            'blur': '--link-background-image-blur:{0}px;',
            'opacity': '--link-background-image-opacity:{0};',
        },
        'video': {
            'coverr': `body{background:rgba(0,0,0,0);}
        .bg{
            background-image: linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0)), url({0});
            -webkit-filter: blur(0);
            -moz-filter: blur(0);
            -ms-filter: blur(0);
            filter: blur(0);
            background-size: cover;
            background-position: center;
        }
        .bg video{display:inline-block}`,
        },
    };
    var Lfy_Theme_2_CSS_Other = {
        'profile': {
            'style': {
                'default': `.layout-basic{display:block;text-align:center;}.layout-basic .avatar{margin-left:auto;margin-right:auto}`,
                'verticalLeft': `.layout-basic{display:block;text-align:left;}.layout-basic .avatar{margin-left:0;margin-right:auto}`,
                'horizontalLeft': `.layout-basic{display:flex;flex-direction:row;text-align:left;}.layout-basic .avatar{margin:0 0 16px 0;}.layout-basic .text{padding-left:16px;}`,
                'horizontalRight': `.layout-basic{display:flex;flex-direction:row-reverse;text-align:right;}.layout-basic .avatar{margin:0 0 16px 0;}.layout-basic .text{padding-right:16px;}`,
            },
            'size': `.center .avatar{width:{0}px;height:{0}px;min-width:{0}px;}`,
            'corner': `.layout-basic{--link-profile-corner:{0}%}`,
            'border': `.center .avatar img{border-width:{0}px}`,
        },
        'social': {
            'default': '.social-top{display:none;}.social-bottom{display:block;}',
            'socialButton': `.social-top{display:block;}.social-bottom{display:none;}`,
            'style': {
                'style1.image.hide-color': `.social_list-spirit{display:flex;}
                .social_list-svg-3{display:none;}
                .social_list-svg-4{display:none;}
                .social_list-svg-6{display:none;}
                .social_list a sp{
                 background-position-x: 0;
                 background-blend-mode:initial;
                }`,
                'style2.color': `.social_list-spirit{display:flex;}
                .social_list-svg-3{display:none;}
                .social_list-svg-4{display:none;}
                .social_list-svg-6{display:none;}
                .social_list a sp{
                 background-position-x: -30px;
                 background-blend-mode: lighten;
                }`,
                'style3.color': `.social_list-spirit{display:none;}
                .social_list-svg-3{display:flex;}
                .social_list-svg-4{display:none;}
                .social_list-svg-6{display:none;}
                .social_list a sp{color:var(--link-social-color-shadow)}
                `,
                'style4.color': `.social_list-spirit{display:none;}
                .social_list-svg-3{display:none;}
                .social_list-svg-4{display:flex;}
                .social_list-svg-6{display:none;}
                .social_list a sp{color:var(--link-social-color-shadow)}
                `,
                'style5.image.hide-color': `.social_list-spirit{display:flex;}
                .social_list-svg-3{display:none;}
                .social_list-svg-4{display:none;}
                .social_list-svg-6{display:none;}
                .social_list a sp{
                 background-position-x:30px;
                 background-blend-mode:initial;
                }`,
                'style6.color': `.social_list-spirit{display:none;}
                .social_list-svg-3{display:none;}
                .social_list-svg-4{display:none;}
                .social_list-svg-6{display:flex;}
                .social_list a sp{color:var(--link-social-color-shadow)}`
            },
            'align': {
                'center': `.social_list [class^=social_list-svg],.social_list .social_list-spirit{justify-content:center;}`,
                'left': `.social_list [class^=social_list-svg],.social_list .social_list-spirit{justify-content:start;justify-content:flex-start;}`,
                'right': `.social_list [class^=social_list-svg],.social_list .social_list-spirit{justify-content:end;justify-content:flex-end;}`,
            },
            'color': `--link-social-color-shadow:{0};--link-social-color-blend:{1};`,
        },
    };
    var ThemeConfigTheme = function(data) {
        data = data || {};
        this.font = data.font;
        this.textColor = data.textColor;
        this.titleColor = data.titleColor;
        this.descColor = data.descColor;
        this._fields = ['font', 'textColor', 'titleColor', 'descColor'];
    };
    ThemeConfigTheme.prototype = {
        as_css: function() {
            var _text = Lfy_Theme_2_CSS_Text,
                _this = this;
            var _css_list = [];
            try {
                var x = 'font';
                if (!isEmpty(_this[x])) _css_list.push(_text[x].Format(_this[x]));
                x = 'textColor';
                if (!isEmpty(_this[x])) {
                    _css_list.push(_text[x].Format(_format_color(_this[x])));
                } else {
                    x = 'titleColor';
                    if (!isEmpty(_this[x])) _css_list.push(_text[x].Format(_format_color(_this[x])));
                    x = 'descColor';
                    if (!isEmpty(_this[x])) _css_list.push(_text[x].Format(_format_color(_this[x])));
                }
            } catch (e) {}
            return [_css_list, []]
        },
    };
    var ThemeConfigOther = function(data) {
        var _value = data || {};
        this.profile = _value.profile || {};
        this.social = _value.social || {};
        this._fields = ['profile', 'social'];
    };
    ThemeConfigOther.prototype = {
        as_css: function() {
            var _other = Lfy_Theme_2_CSS_Other,
                _this = this;
            var _css_list = [],
                _css_var_list = [];
            try {
                var x = 'profile',
                    _x_dict;
                if (_this.profile && _other[x]) {
                    _x_dict = _other[x];
                    if (!isEmpty(_this.profile.style)) _css_list.push(_x_dict.style[_this.profile.style]);
                    if (!isEmpty(_this.profile.size)) _css_list.push(_x_dict.size.Format(_this.profile.size));
                    if (!isEmpty(_this.profile.border)) _css_list.push(_x_dict.border.Format(_this.profile.border));
                    if (!isEmpty(_this.profile.corner)) _css_list.push(_x_dict.corner.Format(_this.profile.corner));
                }
                x = 'social';
                if (_this.social && _other[x]) {
                    _x_dict = _other[x];
                    if (!isEmpty(_this.social.style)) _css_list.push(_x_dict.style[_this.social.style]);
                    if (!isEmpty(_this.social.align)) _css_list.push(_x_dict.align[_this.social.align]);
                    if (!isEmpty(_this.social.color)) {
                        var social_style = _this.social.style;
                        if (social_style) {
                            if (social_style && (social_style.startsWith('style1.') || social_style.startsWith('style5.'))) {}
                            if (social_style && social_style.startsWith('style2.')) {
                                _css_var_list.push(_x_dict.color.Format(_hex2rgb(_this.social.color, 0), _hex2rgb(_this.social.color)));
                            }
                            if (social_style && (social_style.startsWith('style3.') || social_style.startsWith('style4.') || social_style.startsWith('style6.'))) {
                                _css_var_list.push(_x_dict.color.Format(_hex2rgb(_this.social.color), _hex2rgb(_this.social.color, 0)));
                            }
                        } else {
                            _css_var_list.push(_x_dict.color.Format(_format_color(_this.social.color), _format_color(_this.social.color)));
                        }
                    }
                }
            } catch (e) {}
            return [_css_list, _css_var_list];
        },
    };
    var ThemeConfigCSS = function(data) {
        if (data) {
            if (data.theme) this.theme = new ThemeConfigTheme(data.theme);
            if (data.background) this.background = new ThemeConfigBackground(data.background);
            if (data.layout) this.layout = new ThemeConfigLayout(data.layout);
            if (data.other) this.other = new ThemeConfigOther(data.other);
        }
        this._fields = ['background', 'theme', 'layout', 'other'];
    };
    ThemeConfigCSS.prototype = {
        as_css: function() {
            var _css_list = [],
                _css_var_list = ['body{'],
                _this = this;
            _this._fields.forEach(function(x, idx) {
                if (_this[x]) {
                    var x_ret = _this[x].as_css();
                    _css_list = _css_list.concat(x_ret[0]);
                    _css_var_list = _css_var_list.concat(x_ret[1]);
                }
            });
            _css_var_list.push('}');
            return _css_var_list.join('\n') + _css_list.join('\n');
        },
    };
    var ThemeConfigBackground = function(data) {
        var _value = data || {};
        this.key = _value.key;
        this.color = _value.color;
        this.color1 = _value.color1;
        this.color2 = _value.color2;
        this.color3 = _value.color3;
        this.style = _value.style;
        this.direction = _value.direction;
        this.image = _value.image;
        this.link = _value.link;
        this.blur = _value.blur;
        this.opacity = _value.opacity;
        this._fields = ['color', 'color1', 'style', 'direction', 'image', 'video', 'link', 'image', 'blur', 'opacity'];
    };
    ThemeConfigBackground.prototype = {
        as_css: function() {
            if (this.key == 'color') {
                return this.color_css();
            } else if (this.key == 'gradient') {
                return this.gradient_css();
            } else if (this.key == 'image') {
                return this.image_css();
            } else if (this.key == 'video') {
                return this.video_css();
            }
            return [
                [],
                []
            ];
        },
        color_css: function() {
            var _background = Lfy_Theme_2_CSS_Background,
                _this = this;
            var _css_list = [],
                _css_var_list = [];
            try {
                if (_this.color) _css_list.push(_background.color.Format(_format_color(_this.color)));
            } catch (e) {}
            return [_css_list, _css_var_list];
        },
        gradient_css: function() {
            var _background = Lfy_Theme_2_CSS_Background,
                _this = this;
            var _css_list = [],
                _css_var_list = [];
            try {
                if (!isEmpty(_this.direction) && !isEmpty(_this.color1) && !isEmpty(_this.color2)) {
                    var _css = '.bg{background-image:linear-gradient(var(--link-background-gradient-style), {0}, {1}{2})}.bg video{display:none}';
                    if (isNaN(_this.direction)) {
                        if (_background.gradient[_this.direction]) {
                            _css_var_list.push(_background.gradient[_this.direction] || '');
                            _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ''))
                        } else {
                            if (_this.direction == 'outIn') {
                                _css = '.bg{background-image:radial-gradient({3}{2}{1}, {0})}.bg video{display:none}';
                                _css_list.push(_css.Format(_format_color(_this.color1) + (_this.color3 ? '' : ' 80%'), _format_color(_this.color2), _this.color3 ? _format_color(_this.color3) + ',' : '', _this.color3 ? 'circle,' : ''))
                            } else {
                                _css = '.bg{background-image:radial-gradient({3}{0}, {1}{2})}.bg video{display:none}';
                                _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ' 80%', _this.color3 ? 'circle,' : ''))
                            }
                        }
                    } else {
                        _css_var_list.push('--link-background-gradient-style:{0}deg;'.Format(_this.direction));
                        _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ''))
                    }
                } else {
                    if (_this.style) _css_list.push(_background.gradient[_this.style] || '');
                }
            } catch (e) {}
            return [_css_list, _css_var_list];
        },
        image_css: function() {
            var _background = Lfy_Theme_2_CSS_Background,
                _this = this;
            var _css_list = [],
                _css_var_list = [];
            try {
                if (_this.image) _css_list.push(_background.image.style[_this.style || 'default'].Format(_check_image(_this.image)));
                _css_var_list.push(_background.image.blur.Format(_int(_this.blur)));
                _css_var_list.push(_background.image.opacity.Format(_int(_this.opacity) / 100))
            } catch (e) {}
            return [_css_list, _css_var_list];
        },
        video_css: function() {
            var _background = Lfy_Theme_2_CSS_Background,
                _this = this;
            var _css_list = [],
                _css_var_list = [];
            try {
                if (_this.image) _css_list.push(_background.video.coverr.Format(_check_image(_this.image)));
                if (_this.link) {
                    d.querySelector('.bg-container .bg').innerHTML = '<video autoplay="" playsinline="" loop="" muted="" poster="{0}" src="{1}"><source src="{1}" type="video/map4"></video>'.Format(_this.image, _this.link)
                }
            } catch (e) {}
            return [_css_list, _css_var_list];
        }
    };
    var ThemeConfigLayout = function(data) {
        var _value = data || {};
        this.block = _value.block || {};
        this.colors = _value.colors || {};
        this.thumbnail = _value.thumbnail || {};
        this.button = _value.button || {};
        this._fields = ['block', 'colors', 'thumbnail', 'button'];
    };
    ThemeConfigLayout.prototype = {
        as_css: function() {
            var _layout = Lfy_Theme_2_CSS_Layout,
                _this = this;
            var _css_list = [],
                _css_var_list = [];
            try {
                var x = 'block',
                    _x_dict;
                if (_this.block && _layout[x]) {
                    _x_dict = _layout[x];
                    if (!isEmpty(_this.block.style)) _css_list.push(_x_dict[_this.block.style]);
                    if (!isEmpty(_this.block.corner)) _css_var_list.push(_x_dict.corner.Format(_this.block.corner));
                    if (!isEmpty(_this.block.border)) _css_var_list.push(_x_dict.border.Format(_this.block.border));
                }
                x = 'colors';
                if (_this.colors && _layout[x]) {
                    _x_dict = _layout[x];
                    if (!isEmpty(_this.colors.background)) _css_var_list.push(_x_dict.background.Format(_hex2rgb(_this.colors.background, _this.colors.opacity)));
                    if (!isEmpty(_this.colors.text)) {
                        _css_var_list.push(_x_dict.text.Format(_format_color(_this.colors.text)));
                        _css_list.push('.item .btn{color:var(--link-block-font-color)!important;}'.Format(_format_color(_this.colors.text)));
                    }
                    if (!isEmpty(_this.colors.shadow)) _css_var_list.push(_x_dict.shadow.Format(_format_color(_this.colors.shadow)));
                    if (!isEmpty(_this.colors.border)) _css_var_list.push(_x_dict.border.Format(_format_color(_this.colors.border)));
                }
                x = 'thumbnail';
                if (_this.thumbnail && _layout[x]) {
                    _x_dict = _layout[x];
                    if (!isEmpty(_this.thumbnail.style)) _css_list.push(_x_dict.style[_this.thumbnail.style]);
                    if (!isEmpty(_this.thumbnail.radius)) _css_var_list.push(_x_dict.radius[_this.thumbnail.radius]);
                    if (!isEmpty(_this.thumbnail.color)) _css_var_list.push(_x_dict.color.Format(_format_color(_this.thumbnail.color)));
                }
                x = 'button';
                if (_this.button && _layout[x]) {
                    _x_dict = _layout[x];
                    if (!isEmpty(_this.button.backgroundColor)) _css_var_list.push(_x_dict.backgroundColor.Format(_format_color(_this.button.backgroundColor)));
                    if (!isEmpty(_this.button.textColor)) _css_var_list.push(_x_dict.textColor.Format(_format_color(_this.button.textColor)));
                }
            } catch (e) {}
            return [_css_list, _css_var_list];
        },
    };
    try {
        var _theme_config = new ThemeConfigCSS(__theme || {});
        var _style = d.createElement('style');
        _style.type = 'text/css';
        d.querySelector('head').appendChild(_style);
        _style.innerHTML = _theme_config.as_css();
    } catch (e) {}
    var _pathLink = document.querySelector('link[data-path]');
    var _path = _pathLink ? _pathLink.dataset.path : '';
    if (_path.indexOf('animate_') == 0) {
        var js, fjs = d.getElementsByTagName('script')[0];
        js = d.createElement('script');
        js.async = !0;
        js.src = 'https://fly.linkcdn.to/v2.3/theme/js/' + _path + '.js?t=1';
        fjs.parentNode.insertBefore(js, fjs);
    }
    _pathLink.media = 'all';
}(document));