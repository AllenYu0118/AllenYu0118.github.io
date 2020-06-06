## 数组类型 (Type Of Array)

在 `TypeScript` 中，数组类型有多种定义方式，比较灵活。

## 「类型 + 方括号」 表示法

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5, 8, 12]
```

上面代码表示，变量 `fibonacci` 是一个数组，且数组元素都是 `number`。

把其中一个元素修改成字符串，将会报错：

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5, 8, 12, '20']

// 不能将类型“string”分配给类型“number”。ts(2322)
```

使用数组方法时，参数也需要满足数组的定义

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5, 8, 12]
fibonacci.push('20')

// 类型“"20"”的参数不能赋给类型“number”的参数。ts(2345)
```

## 数组泛型

我们也可以使用数组泛型（Array Generic）`Array<number>` 来表示数组：

```typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5, 8, 12]
```

## 用接口表示数组

```typescript
interface NumberArray {
    [index: number]: number
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5, 8, 12]
```

`NumberArray` 表示：索引和值的类型都是数字

一般不会使用接口作为数组的类型描述，只有使用类数组时才会使用接口的方式进行描述。

## 类数组 (Array Like Object)

类数组不是数组类型，比如 `arguments`

```typescript
function sum() {
    let args: any[] = arguments
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.ts(2740)
```

上面的例子中，`arguments` 是一个类数组对象，不能用普通的数组进行描述，而应该使用接口。

```typescript
interface args {
    [index: number]: number
    length: number
    callee: Function
}

function sumFun(a: number, b: number): number {
    let args: args = arguments

    return args[0] + args[1]
}
sumFun(1, 2)
```

在上面这个例子中，我们除了约束当索引的类型是数字外，也约束了它还有 `length` 和 `callee` 两个属性。

事实上，常用的类数组都有自己的接口定义，`TypeScript` 已经为我们提供了例如：`IArguments`、`NodeList`、`HTMLCollection` 等等。

上面的例子就可以修改成下面的代码

```typescript
function sumFun(a: number, b: number): number {
    let args: IArguments = arguments
    return args[0] + args[1]
}
sumFun(1, 2)
```

`NodeList` 使用

```typescript
function getNodeList(className: string): NodeList {
    return document.querySelectorAll(className)
}

getNodeList('.node').forEach(item => {
    console.log(item)
})
```

一个比较常见的做法是，用 `any` 表示数组中任意出现的类型

```typescript
let dataList: any = [1, '2', ['Allen'], { name: 'Allen Yu', age: 18 }]
```

## 参考

-   [TypeScript 入门教程 - 数组的类型](https://ts.xcatliu.com/basics/type-of-array)