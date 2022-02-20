---
title: generics
date: 2020-10-31 14:09:49
permalink: /pages/595304/
categories:
  - ts
tags:
  - 
---
## 泛型 (Generics)

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

## 简单的例子

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```typescript
function createArray(length: number, value: any): Array<any> {
    let result = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

let result = createArray(10, 'Allen')
console.log('result: ', result);
```

上例中，我们使用了之前提到过的 - 数组泛型，来定义返回值的类型。

这段代码编译不会报错，但一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

`Array<any>` 允许数组的每一项都为任意类型。但是我们的预期是，数组的每一项都应该是输入的 `value` 的类型。

这时候，泛型就派上了用场：

```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

let result = createArray<number>(10, 666)
console.log('result: ', result);
```

上例中，我们在函数名后添加了 `<T>`，其中 `<T>` 用来指代任意输入的类型，在后面输入 `value: T` 和输出 `Array<T>` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论，自动推断出来。

## 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

let result = swap(['Allen', 'YU']);
console.log('result: ', result); // result:  [ 'YU', 'Allen' ]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。

## 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性和方法：

```typescript
function logging<T>(arg: T): T {
    console.log(arg.length)
    return arg
}

// 类型“T”上不存在属性“length”。ts(2339)
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```typescript
interface Lengthwise {
    length: number
}

function logging<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}
```
上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengwise` 的形状，也就是必须包含 `length` 属性。

此时，如果调用 `logging` 的时候，传入的 `arg` 不包含 `length` 属性，那么在编译的时候就会报错：

```typescript
interface Lengthwise {
    length: number
}

function logging<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}

logging(7) // 类型“7”的参数不能赋给类型“Lengthwise”的参数。ts(2345)
```

多个类型参数之间也可以相互约束：

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]
    }

    return target
}

let x = { a: 1, b: 2, c: 3, d: 4 };

let result = copyFields(x, { b: 10, c: 10 })
console.log('result: ', result);
// result:  { a: 1, b: 10, c: 10, d: 4 }
```

上例中，我们使用了两个类型参数，其中要求 `T` 继承 `U`，这样就保证了 `U` 上不会出现 `T` 中不存在的字段。


## 泛型接口

之前学过，可以使用接口的方式来定义一个函数需要符合的形状：

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc

mySearch = function (source, subString) {
    return source.search(subString) !== -1
}
```

当然，也可以使用含有泛型的接口来定义函数的形状：

```typescript
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc

createArray = function <T>(length, value): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}
```

进一步，我们可以把泛型参数提前到接口名上：

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc<any>

createArray = function <T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。

## 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```typescript
class GenericsNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let myGenericsNumber = new GenericsNumber<number>()

myGenericsNumber.zeroValue = 5
myGenericsNumber.add = (x: number, y: number): number => x + y
```

## 泛型参数的默认类型

在 `TypeScript` 2.3 以后，我们可以为泛型中的类型参数，指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推断时，这个默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}
```

## 参考

-   [TypeScript 入门教程 - 泛型](https://ts.xcatliu.com/advanced/generics.html)