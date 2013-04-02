javascript2013-4-2
===================
forEach如何终止
-------------------
数组的forEach方法是无法终止的，除非抛出异常让其终止。  
如果想在forEach满足某种条件终止循环，可以采用传统的for方式，或者可以采用数组的some方法，当满足条件也会终止。
```javascript
[1,2,3].some(function(item){
    if(item > 2){
        return true;
    }
});
```