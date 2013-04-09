测试 2013-4-8
=======================
file upload
------------
<form target="aa"><input type="file" onchange="selectFile(this);"/></form>
<iframe id="aa"></iframe>
<script>
function selectFile(element) {
    if(element.value){
        element.parentNode.submit();
    }
}
</script>