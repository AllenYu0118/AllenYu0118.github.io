## 函数类型 (Type Of Function)

函数是 `JavaScript` 应用程序的基础。它帮助我们实现抽象层，模拟类，信息隐藏和模块。在 `TypeScript` 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。

## 函数声明

在 `JavaScript` 中，有两种常见的定义函数的方式 - 函数声明（Function Declaration）和函数表达式（Function Expression）

```javascript
// 函数声明
function sum(x, y) {
    return x + y
}

// 函数表达式
let sum = (x, y) => x + y
```

在 `TypeScript` 中如何进行函数声明

```typescript
function sum(x: number, y: number): number {
    return x + y
}

sum(1, 2)
```

当多输入一个参数的时候就会报错，当然，少输入一个也会报错

```typescript
sum(28, 70, 175)
//  应有 2 个参数，但获得 3 个。

sum(28)
// 应有 2 个参数，但获得 1 个。ts(2554)
// xxx.ts(1, 25): An argument for 'y' was not provided.
```

## 函数表达式

```typescript
let sum = function(x: number, y: number): number {
    return x + y
}
```

以上的代码其实是有问题的，因为定义的返回值类型，是定义在匿名函数上的，变量 `sum` 的类型是通过类型推论得出的类型。

如果需要给 `sum` 添加类型，则应该是这样：

```typescript
let sum: (x: number, y: number) => number = function(x, y) {
    return x + y
}
```

注意不要混淆 `TypeScript` 中的 `=>` 和 ES6 中的 `=>` 。

在 `TypeScript` 中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

## 用接口定义函数的形状

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```typescript
interface SumFunc {
    (x: number, y: number): number
}

let sum: SumFunc = function(x, y) {
    return x + y
}
```

> 原文中，左侧函数名使用了接口类型，右侧的函数参数也有定义类型，但是我感觉有些冗余，接口已经定义了函数的参数类型以及返回值类型，那么函数本身就应该不用再次定义了，我在自己的 demo 中，使用上面的例子是没有问题的。

## 可选参数

前面提到，输入多余的（或者少于要求的）参数，都是不允许的。那么如何定义可选参数呢？

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```typescript
let sum: (x: number, y?: number) => number = function(x, y) {
    if (y) {
        return x + y
    } else {
        return x
    }
}
```

**可选参数都是在必需参数后面的**

## 参数默认值

在 `ES6` 中，允许给函数的参数添加默认值，`TypeScript` 会将添加了默认值的参数识别为可选参数

```typescript
function sum(x: number, y: number = 5): number {
    return x + y
}

sum(1) // 6
```

此时就不受 「可选参数必须接在必需参数后面」的限制了。

```typescript
function sum(x: number = 3, y: number = 5): number {
    return x + y
}

sum(undefined, 7) // 10
```

## 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```javascript
function sum(param1, param2, ...items) {
    let resetSum = items.reduce((total, item) => {
        return total + item
    })
    return param1 + param2 + resetSum
}

sum(1, 2, 3, 5, 8, 13, 21, 34, 55) // 142
```

上面代码中的 `items` 是一个数组，所以我们可用数组的类型来定义它：

```typescript
function sum(param1: number, param2: number, ...items: number[]): number {
    let resetSum = items.reduce((total, item) => {
        return total + item
    })
    return param1 + param2 + resetSum
}

sum(1, 2, 3, 5, 8, 13, 21, 34, 55) // 142
```

## 重载

重载指的的是：允许一个函数接受不同数量或类型的参数时，做出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `Allen` 的时候，输出反转的字符串 `nellA` 。

利用联合类型，我们可以这么实现

```typescript
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(
            x
                .toString()
                .split('')
                .reverse()
                .join('')
        )
    } else {
        return x
            .split('')
            .reverse()
            .join('')
    }
}

reverse(1234567) // 7654321
reverse('Allen') // nellA
```

以上方案存在一定的缺陷，就是不能够精确的表达，输入数字的时候，返回的也是数字，输入的是字符串，返回的也是字符串。

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```typescript
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(
            x
                .toString()
                .split('')
                .reverse()
                .join('')
        )
    } else {
        return x
            .split('')
            .reverse()
            .join('')
    }
}
```

上面的代码中，我们重复定义了多次 `reverse` 函数，前两次都是函数结构定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，`TypeScript` 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 参考

-   [TypeScript 入门教程 - 函数的类型](https://ts.xcatliu.com/basics/type-of-function)