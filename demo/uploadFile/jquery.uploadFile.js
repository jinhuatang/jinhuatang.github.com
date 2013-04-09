/*!
 * jQuery upload file Plugin 0.1.0
 *
 * Copyright 2013 Jevi Tang
 */

(function ($) {
    var iframeHTML = '<iframe frameborder="no" src="javascript:void(0)" scrolling="no" style="width:0px;height:0px;position:absolute;top:0;left:0;opacity:0;filter:alpha(opacity=0);"></iframe>'
    var formHTML = '<body style="padding:0;margin:0;"><form style="padding:0;margin:0;" action="%ACTION%"><input type="file" style="cursor:pointer;padding:0;margin:0;font-size:1000px;width:1000px;" onchange="if(this.value){this.parentNode.submit();}"/></form></body>';
    var uploadFile = function (action, callback, type) {
        this.css('position', 'relative');
        var $iframe = $(iframeHTML);
        $iframe.width(this.width());
        $iframe.height(this.height());
        this.append($iframe);
        var iframe = $iframe[0];
        var idoc = iframe.contentDocument || iframe.contentWindow.document;
        idoc.open();
        idoc.write(formHTML.replace('%ACTION%', action));
        idoc.close();
        var me = this;
        $iframe.bind('load', function () {
            var data = (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML;
            $iframe.remove();
            me.uploadFile(callback);
            if (type === 'json') {
                if (JSON) {
                    data = JSON.parse(data);
                }
                else {
                    eval('data=' + data);
                }
            }
            callback && callback(data);
        });
    }
    $.fn.uploadFile = uploadFile;
} (jQuery));