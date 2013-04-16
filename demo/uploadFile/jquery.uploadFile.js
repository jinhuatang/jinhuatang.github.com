/*
* jQuery upload file Plugin 0.1.0
*
* Copyright 2013 Jevi Tang
*/

(function ($) {
    var iframeHTML = '<iframe frameborder="no" src="javascript:void(0)" scrolling="no" style="width:0px;height:0px;position:absolute;top:0;left:0;opacity:0;filter:alpha(opacity=0);"></iframe>'
    var formHTML = '<body style="padding:0;margin:0;"><form style="padding:0;margin:0;" enctype="multipart/form-data" method="POST" action="%ACTION%"><input type="file" name="file" style="cursor:pointer;padding:0;margin:0;font-size:1000px;width:1000px;" onchange="if(this.value){window.startUpload(window.abort);this.parentNode.submit();}"/></form></body>';
    var uploadFile = function (action, callback, type) {
        this.css('position', 'relative');
        var $iframe = $(iframeHTML);
        $iframe.width(this.width());
        $iframe.height(this.height());
        this.append($iframe);
        var iframe = $iframe[0];
        // for hidden element
        var cloneElement = element.cloneNode(true);
        cloneElement.style.position = 'absolute';
        cloneElement.style.display = '';
        cloneElement.style.top = '-1000px';
        document.body.appendChild(cloneElement);
        iframe.style.width = cloneElement.offsetWidth + 'px';
        iframe.style.height = cloneElement.offsetHeight + 'px';
        document.body.removeChild(cloneElement);
        var idoc = iframe.contentDocument || iframe.contentWindow.document;
        idoc.write(formHTML.replace('%ACTION%', action));
        var me = this;
        $iframe.bind('load', function () {
            try {
                var data = (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML;
                $iframe.remove();
                if (type === 'json') {
                    if (window.JSON) {
                        data = JSON.parse(data);
                    }
                    else {
                        eval('data=' + data);
                    }
                }
            } catch (e) {
                window.console && console.dir(e);
                if (type === 'json') {
                    data = { status: 1, msg: "����ֵ����" };
                } else {
                    data = "����ֵ����";
                }
            }
            endCallback && endCallback(data);
            me.uploadFile(action, startCallback, endCallback, type);
        });
        if (startCallback) {
            iframe.contentWindow.startUpload = startCallback;
        }

        iframe.contentWindow.abort = function () {
            T.dom.remove(iframe);
            me.uploadFile(action, startCallback, endCallback, type);
        }
    }
    $.fn.uploadFile = uploadFile;
} (jQuery));