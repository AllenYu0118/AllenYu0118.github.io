---
title: declaration-merging
date: 2020-10-31 14:09:49
permalink: /pages/2be0b9/
categories:
  - ts
tags:
  - 
---
## 声明合并 (Declaration Merging)

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型。

## 函数的合并

之前学习过，我们可以使用函数重载定义多个类型：

```typescript
function reverse(x: number): number
function reverse(x: string): number
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}
```

## 接口的合并

接口中的属性，在合并时会简单的合并到一个接口中：

```typescript
interface Alarm {
    price: number
}
interface Alarm {
    weight: number
}
```

相当于

```typescript
interface Alarm {
    price: number
    weight: number
}
```

注意,**合并的属性的类型必须是唯一的：**

```typescript
interface Alarm {
    price: number
}
interface Alarm {
    price: number
    weight: number
}
```

上例中，虽然属性 `price` 属性重复了，但因为类型都是 `number`，所以不会报错。

```typescript
interface Alarm {
    price: number
}
interface Alarm {
    price: string
    weight: number
}
// 后续属性声明必须属于同一类型。属性“price”的类型必须为“number”，但此处却为类型“string”。ts(2717)
```

上例中，属性 `price` 重复了，且两次类型不一致，导致报错了。

接口中方法的合并，与函数的合并一样。

```typescript
interface Alarm {
    price: number
    alert(s: string): string
}
interface Alarm {
    price: number
    weight: number
    alert(s: string, n: number): string
}
```

上面的代码合并后，相当于：

```typescript
interface Alarm {
    price: number
    weight: number
    alert(s: string): string
    alert(s: string, n: number): string
}
```

## 类的合并

类的合并，和接口合并的规则一致。



## 参考

-   [TypeScript 入门教程 - 声明合并](https://ts.xcatliu.com/advanced/declaration-merging.html)