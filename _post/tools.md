工具 2013-4-8
=======================
json to php
------------
<textarea style="width:80%;height:200px;" placeholder="粘贴json" onblur="javascript:this.value=this.value.replace(/\[/g,'array(').replace(/\]/g,')').replace(/:/g,'=>').replace(/{/g,'array(').replace(/}/g,')')"></textarea>