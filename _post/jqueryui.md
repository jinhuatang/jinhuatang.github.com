jqueryui 2012-3-15
==============================
Widget Factory（翻译）
---------------------
###描述
为所有jQuery UI widget提供一致的抽象来创建有状态的jQuery插件.  
`jQuery.widget( name [, base ], prototype )`  
####name
类型: `String`  
创建此名称的widget,包括其命名空间.
####base
类型: `Function()`  
继承的widget基类. 这必须是个构造函数并且可以用new来实例化. 默认值为 jQuery.Widget.
####prototype
类型: `PlainObject`  
这个对象将作为此widget的prototype.

你可以继承$.Widget对象来从零创建一个新widget,或者直接继承已有的jQuery UI或者第三方widget.可以定于与继承的widget相同的名称,或者用扩展来替代.

jQuery UI包含了很多widget来维护状态,因此将于典型的jQuery插件使用模式有明显差异.所有jQuery UI的widget使用相同的模式, 用widget factory来定义. 因此你只要学会使用一个widget,那么就能知道使用所有的widget.

*注: 这个文档示例使用progressbar widget 不过这个语法和其他每个widget都一样.*

###初始化

为了跟踪widget的状态,我们必须介绍下widget的整个生命周期.当widget初始化后,生命周期即开始.初始化一个widget,我们可以简单的在一个或多个元素上调用插件.

`$( "#elem" ).progressbar();`  
这将初始化jQuery对象里的每个元素,我们用id为'elem'的元素来举例.因为我们调用了progressbar方法没有传任何参数,这个widget将使用默认选项进行初始化.在初始化的时候,我们可以传一个选项集合来覆盖默认的选项.

`$( "#elem" ).progressbar({ value: 20 });`  
初始化时我们可以根据需要传任意个选项.任何没有传的选项都将使用默认值.

选项是widget状态的一部分,因此我们可以在初始化后继续设置选项.我们将在后面的option方法中看到.

###方法

现在widget已经初始化了,我们可以查询它的状态或者执行操作.所有的操作在初始化后都采用一种方式调用.我们只需要传方法的名称给相应的jQuery插件就可以调用其方法.例如,调用一个progressbar这个widget的value()方法,我们可以这样做:

`$( "#elem" ).progressbar( "value" );`

如果方法需要接受参数,我们可以在方法名后传递.例如,给方法value()传个参数40,我们可以这样做:

`$( "#elem" ).progressbar( "value", 40 );`

就像其他jQuery方法一样,大多数widget方法为了链式调用返回的是一个jQuery对象.

```javascript
$( "#elem" )
  .progressbar( "value", 90 )
  .addClass( "almost-done" );
```
每个widget基于自身的功能需要将提供一套方法.但是,这里也有一些方法所有的widget都会有,下面将有详细的描述.

###事件

所有的widget都有与事件相关的一系列行为来通知状态的变化.对于大多数widget而言,事件名称前加widget名称前缀的将被触发.例如,我们可以绑定progressbar的change事件,这样任何时候值发生改变都会被触发.
```javascript
$( "#elem" ).bind( "progressbarchange", function() {
  alert( "The value has changed!" );
});
```
每个事件都有一个对应的回调函数作为选项暴露.我们可以不需要绑定progressbarchange事件来截获progressbar的change回调.
```javascript
$( "#elem" ).progressbar({
  change: function() {
    alert( "The value has changed!" );
  }
});
```
所有的widget实例化后都会触发create事件.

###实例

widget的实例都是以widget全名作为key用jQuery.data()存储.因此,你可以使用下面的方法从元素获取progressbar这个widget实例.

`$( "#elem" ).data( "ui-progressbar" );`

判断一个元素是否与一个已有的widget绑定可以使用:data选择器.
```javascript
$( "#elem" ).is( ":data( 'ui-progressbar' )" ); // true
$( "#elem" ).is( ":data( 'ui-draggable' )" ); //false
```
你也可以用:data来获取所有实例化了某个widget的元素.

`$( ":data( 'ui-progressbar' )" );`

###属性

所有的widget都有如下属性集合:

>* document: document是widget内置的. 如果与iframe交互将很有用.
* element: 一个jQuery对象,包含了用来实例化widget的元素.如果你选择多个元素并且调用.myWidget(),将会为每个元素创建单独的widget实例.因此这个属性通常只包含一个元素.
* namespace: widget原型存储在jQuery全局对象上的位置.例如一个ui的namespace表面这个widget的原型存放在$.ui上.
* options: 包含被当前widget所使用选项的对象.在实例化是,任何用户提供的选项将自动与$.myNamespace.myWidget.prototype.options上的默认值合并.用户提供的选项覆盖默认值.
* uuid: 这个widget的唯一整型标识.
* version: widget的字符串版本.对于jQueryUI这个将设置为jQueryUI的widget使用.widget开发者必须显示的在自己的原型上标明.
* widgetEventPrefix: 这个前缀加在事件名称前面将被widget触发. 例如  draggable 的 widgetEventPrefix 是"drag", 因此当 draggable 被创建后, "dragcreate"这个名字的事件将被触发. 默认 widgetEventPrefix 就是widget自身的名字. 注: 这个属性已过期,将在后期版本中删除.事件名字将被换成widgetName:eventName 如: "draggable:create".
* widgetFullName: widget的完整名称,包括命名空间在内.例如,$.widget( "myNamespace.myWidget", {} ), widgetFullName 为 "myNamespace-myWidget".
* widgetName: widget名称. 例如, $.widget( "myNamespace.myWidget", {} ), widgetName 为 "myWidget".
* window: window是widget元素内置的. 如果与iframe交互将很有用.

###Widget基类

描述: widget 工厂使用的Widget基类.

快速导航

####选项
* disabled
* hide
* show
####方法
* _create
* _delay
* _destroy
* _focusable
* _getCreateEventData
* _getCreateOptions
* _hide
* _hoverable
* _init
* _off
* _on
* _setOption
* _setOptions
* _show
* _super
* _superApply
* _trigger
* destroy
* disable
* enable
* option
* widget
####事件
* create

####选项
#####disabled
类型: Boolean  
默认值: false  
设置 true 使widget不可用.  
代码示例:  
用disabled初始化widget实例:

`$( ".selector" ).widget({ disabled: true });`

初始化后获取或设置disabled选项:
```javascript
// getter
var disabled = $( ".selector" ).widget( "option", "disabled" );
// setter
$( ".selector" ).widget( "option", "disabled", true );
```
#####hide

类型: Boolean or Number or String or Object  
默认值: null  
是否或者如何动态隐藏元素.
        
多类型支持:
>* Boolean: 当设置成 false, 没有动态效果,元素立即隐藏.	 当设置为true, 元素将在默认的时间与缓动效果中隐藏 .
* Number:元素将在定义的时间与默认的缓动效果中隐藏.
* String: 元素将使用特定的效果隐藏.值可以是任何内置的jQuery动画方法名,如"slideUp", 或者是jQuery UI效果,如"fold".	 两者都是用默认的时间和默认的缓动效果.
* Object: 如果是一个对象, 那么 effect, delay, duration, 和 easing 属性都可以设置. 如果 effect 属性包含一个jQuery方法名, 那么这个方法将被使用; 否则就假设是个jQuery UI效果. 当使用jQuery UI效果并支持额外的设置, 你可以把这些设置包含在一个对象中传给这个效果. 如 duration 或 easing 被忽略, 那么将使用默认的. 如果 effect 被忽略, 那么将使用 "fadeOut". 如果 delay 被忽略, 将不会延迟.

代码示例:  
用hide初始化widget:

`$( ".selector" ).widget({ hide: { effect: "explode", duration: 1000 } });`

初始化后,获取或设置hide选项:
```javascript
// getter
var hide = $( ".selector" ).widget( "option", "hide" );
// setter
$( ".selector" ).widget( "option", "hide", { effect: "explode", duration: 1000 } );
```
#####show
类型: Boolean or Number or String or Object

默认值: null  
是否或者如何显示元素.  

多类型支持:
>* Boolean: 当设置为false, 将没有动画效果,元素会立即显示.当设置为true, 元素将用默认的时间与缓动效果来渐显.
* Number: 元素将用指定的时间与默认的缓动效果渐显.
* String: 元素将用指定的效果显示. 这个值可以是jQuery内置的动画方法名,如"slideDown", 或者是 jQuery UI 特效名, 如 "fold". 这两种情况下,都将使用默认的时间与缓动效果.
* Object: 如果值是一个对象, 那么 effect, delay, duration, 与 easing 属性都可以提供. 如果 effect 属性包含了 jQuery 方法名, 那么将使用这个方法; 否则将认为这是 jQuery UI 特效. 在使用 jQuery UI 特效时也支持其他设置,你可以将这些设置包含在一个对象中传给传给相应的特效. 如果 duration 或者 easing 被忽略, 将使用默认值. 如过 effect 被忽略, 那么将使用 "fadeIn". 如果 delay 被忽略, 那么将不会延迟.

代码示例:

用show选项来初始化widget:
`$( ".selector" ).widget({ show: { effect: "blind", duration: 800 } });`

初始化后用获取或者设置show选项:
```javascript
// getter
var show = $( ".selector" ).widget( "option", "show" );
// setter
$( ".selector" ).widget( "option", "show", { effect: "blind", duration: 800 } );
```
###方法
_create()

_create() 是widget的构造函数.	 没有参数,不过这时this.element 与 this.options 已经被设置了.
这个方法不接受任何参数.

_delay( fn [, delay ] )

返回值: Number

在指定的延时后执行提供的方法.保持了this上下文的正确性. 本质上就是 setTimeout().
同clearTimeout()一样返回一个id.

fn

类型: Function() or String
调用的方法.可以是widget的方法名.

delay
类型: Number
在执行方法前需要等待多少毫秒.默认为0.

_destroy()

公共方法 destroy() 用来清理所有的公共数据,事件等等. and then delegates out to _destroy() for custom, widget-specific, cleanup.
这个方法不接受任何参数.

_focusable( element )

设置当聚焦 element 的时候是否应用 ui-state-focus 样式.
这个时间将在销毁的时候自动清理.

element

类型: jQuery
应用focusable行为的元素.
_getCreateEventData()

返回值: Object

所有的widget都会触发 create 事件. 默认情况下,这个事件不提供任何数据,但是这个方法可以返回一个create事件的数据对象.
此方法不接受任何参数.
_getCreateOptions()

返回值: Object

这个方法允许widget定义一个自定义方法在实例化过程中来定义选项.通过此方法返回的用户选项会同初始化时的选项共同覆盖默认选项.
此方法不接受任何参数.
_hide( element, option [, callback ] )

用内置的动画方法或者自定义效果立即隐藏一个元素.	 可以参考 hide 选项的相关值.
element
类型: jQuery
将隐藏的元素.
option
类型: Object
定义如何隐藏元素.
callback
类型: Function()
当元素完全隐藏后调用.
_hoverable( element )

在鼠标hover的时候设置元素的class为ui-state-hover.
在销毁的时候,事件将会被自动清理掉.

element
类型: jQuery
被添加hoverable行为的元素.
_init()

widget初始化与创建的概念是有区别的.任何时候,插件调用的时候没有参数或者只传一个hash对象,就表明是初始化widget.包括widget创建.
注: 初始化只会在widget有此逻辑操作时调用.

此方法不接受任何参数.

_off( element, eventName )

从元素中撤销事件绑定.
element
类型: jQuery
撤销绑定的元素.不同于 _on() 方法,  _off()方法必须要提供元素.
eventName
类型: String
一个或者多个以空格分隔的事件类型.

_on( [suppressDisabledCheck ] [, element ], handlers )

给元素绑定事件.事件名中通过使用选择器可以支持事件委托.如,"click .foo".  _on() 方法比直接的事件绑定提供更多的收益:
在处理程序中保持this上下文.
自动处理不可以的widget: 如果widget被置为不可用,或者事件发生在一个有ui-state-disabled样式的元素上, 事件处理函数将不被触发. 可以用suppressDisabledCheck参数来覆盖.
事件处理自动进行命名空间管理,并在widget销毁后自动清理.

suppressDisabledCheck (default: false)

类型: Boolean
是否绕过不可用状态检查.
element
类型: jQuery
什么元素将被绑定事件.如果不提供此参数将用this.element.
handlers
类型: Object
一个键值对,string的键名表示事件类型,并可用选择器来做委托, 值表示将被该事件调用的处理函数.
_setOption( key, value )

从 _setOptions() 方法遍历每个独立的选项调用此方法. widget的状态将根据变化而更新.
key
类型: String
设置选项的名称.
value
类型: Object
设置选项的值.
_setOptions( options )

每当调用 option() 方法时就会调用, 不管以任何形式调用 option() 方法.
如果你想推迟多选项密集计算形变化,你可以重写这个方法.

options
类型: Object
键值对.
_show( element, option [, callback ] )

立即显示元素, 使用内置的动画方法或者自定义效果. option的值参见 show 选项.
element
类型: jQuery
要显示的元素.
option
类型: Object
这个设置定义如何显示元素.
callback
类型: Function()
完全显示后调用.
_super()

触发父widget具有相同名称的方法, 可以使用任何参数. 本质上就是 .call().
不接受任何参数.
_superApply( arguments )

用array方式的参数触发父widget具有相同名称的方法. 本质上就是 .apply().
arguments
类型: Array
数组参数将传给父方法.
_trigger( type [, event ] [, data ] )

触发一个事件和其关联的回调.
选项的名称等于触发回调的类型.

事件名称为widget名称 + type.

注: 当提供数据,你必须提供所有的三个参数.如果没有event参数,则传个null.

type
类型: String
这个type必须和回调匹配. 完整事件类型将自动生成.
event
类型: Event
触发此事件的原始事件; 对提供侦听的上下文比较有用.
data
类型: Object
和事件相关的数据.
destroy()

完全移除widget所有功能.这个将返回元素的初始状态.
不接受任何参数.
disable()

使widget失效.
不接受任何参数.
enable()

使widget有效.
不接受任何参数.
option( optionName )

返回值: Object

获取optionName对应的选项值.
optionName
类型: String
选项名称.
示例代码:
调用方法:


var isDisabled = $( ".selector" ).widget( "option", "disabled" );
option()

返回值: PlainObject

获取当前widget所使用的选项.
不接受任何参数.
示例代码:
调用方法:


var options = $( ".selector" ).widget( "option" );
option( optionName, value )

设置与特定optionName相关的widget值.
optionName
类型: String
设置的选项名称.
value
Type: Object
设置的选项值.
示例代码:
调用方法:

$( ".selector" ).widget( "option", "disabled", true );
option( options )

设置一个或多个widget选项.
options
类型: Object
一个键值对集合.
示例代码:
调用方法:


$( ".selector" ).widget( "option", { disabled: true } );
widget()

返回: jQuery

返回一个jQuery对象包括了初始的元素和其他相关生成的元素.
这个方法不接受任何参数.
事件

create( event, ui )

类型: widgetcreate

当widget创建后触发.
event
类型: Event
ui
类型: Object
代码示例:
用create回调初始化对象:




$( ".selector" ).widget({
  create: function( event, ui ) {}
});
绑定回调侦听widgetcreate事件:


$( ".selector" ).on( "widgetcreate", function( event, ui ) {} );
