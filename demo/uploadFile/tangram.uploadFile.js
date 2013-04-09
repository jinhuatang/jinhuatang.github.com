/*!
* tangram upload file Plugin 0.1.0
*
* Copyright 2013 Jevi Tang
*/

(function (T) {
    var iframeHTML = '<iframe frameborder="no" src="javascript:void(0)" scrolling="no" style="width:0px;height:0px;position:absolute;top:0;left:0;opacity:0;filter:alpha(opacity=0);"></iframe>'
    var formHTML = '<body style="padding:0;margin:0;"><form style="padding:0;margin:0;" action="%ACTION%"><input type="file" style="cursor:pointer;padding:0;margin:0;font-size:1000px;width:1000px;" onchange="if(this.value){this.parentNode.submit();}"/></form></body>';
    var uploadFile = function (element, action, callback, type) {
        element = T.g(element);
        element.style.position = 'relative';
        T.dom.insertHTML(element, 'beforeEnd', iframeHTML);
        var $iframe = T.dom.query('iframe', element);
        var iframe = $iframe[0];
        iframe.style.width = element.offsetWidth + 'px';
        iframe.style.height = element.offsetHeight + 'px';
        var idoc = iframe.contentDocument || iframe.contentWindow.document;
        idoc.open();
        idoc.write(formHTML.replace('%ACTION%', action));
        idoc.close();
        var me = this;
        iframe.onload = function () {
            try {
                var data = (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML;
                T.dom.remove(iframe);
                if (type === 'json') {
                    if (JSON) {
                        data = JSON.parse(data); console.log(data);
                    }
                    else {
                        eval('data=' + data);
                    }
                }
                callback && callback(data);
            } catch (e) { console && console.dir(e); }
            me.uploadFile(element, action, callback, type);
        };
    }
    T.uploadFile = uploadFile;
} (baidu));