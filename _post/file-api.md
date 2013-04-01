文件API 2013-4-1
=======================
摘要
------------
此文档描述的是Web应用程序的文件对象API，包括：

* FileList
* Blob
* File
* FileReader
* URI scheme
 
FileList
------------
###IDL
```javascript
interface FileList {
      getter File? item(unsigned long index);
      readonly attribute unsigned long length;
};
```
###DEMO
```html
<form id="formId">
<input type="file" id="fileId"/>
</form> 
```

```javascript
var file = document.forms['formId']['fileId'].files.item(0);
//var file = document.forms['formId']['fileId'].files[0];
if(file)
{
    //
} 
```

Blob
-----------
###IDL
```javascript
[Constructor, 
     Constructor(sequence<(ArrayBuffer or ArrayBufferView or Blob or DOMString)> blobParts, optional BlobPropertyBag options)] 
    interface Blob {
      
      readonly attribute unsigned long long size;
      readonly attribute DOMString type;
      
      //slice Blob into byte-ranged chunks
      
      Blob slice(optional long long start,
                 optional long long end,
                 optional DOMString contentType);
      void close(); 
    
    };

    dictionary BlobPropertyBag {
      DOMString type = "";
    };
```
###DEMO
```javascript
// Create a new Blob object
var a = new Blob();

// Create a 1024-byte ArrayBuffer
// buffer could also come from reading a File
var buffer = new ArrayBuffer(1024);

// Create ArrayBufferView objects based on buffer
var shorts = new Uint16Array(buffer, 512, 128);
var bytes = new Uint8Array(buffer, shorts.byteOffset + shorts.byteLength);

var b = new Blob([toNativeLineEndings("foobarbazetcetc" + "birdiebirdieboo")], {type: "text/plain;charset=UTF-8"});

var c = new Blob([b, shorts]);

var a = new Blob([b, c, bytes]);

var d = new Blob([buffer, b, c, bytes]);
```

File
----------
###IDL
```javascript
interface File : Blob {
  readonly attribute DOMString name;
  readonly attribute Date lastModifiedDate;
};
```

FileReader
----------
###IDL
```javascript
[Constructor]
interface FileReader: EventTarget {

    // async read methods
    void readAsArrayBuffer(Blob blob);
    void readAsText(Blob blob, optional DOMString encoding);
    void readAsDataURL(Blob blob);
    
    void abort();
    
    // states
    const unsigned short EMPTY = 0;
    const unsigned short LOADING = 1;
    const unsigned short DONE = 2;
    
    
    readonly attribute unsigned short readyState;
    
    // File or Blob data
    readonly attribute (DOMString or ArrayBuffer)? result;
    
    readonly attribute DOMError error;
    
    // event handler attributes
    [TreatNonCallableAsNull] attribute Function? onloadstart;
    [TreatNonCallableAsNull] attribute Function? onprogress;
    [TreatNonCallableAsNull] attribute Function? onload;
    [TreatNonCallableAsNull] attribute Function? onabort;
    [TreatNonCallableAsNull] attribute Function? onerror;
    [TreatNonCallableAsNull] attribute Function? onloadend;
};
```