## 类型断言 (Type Assertion)

类型断言可以手动指定一个值的类型。

## 语法

```typescript
// 值 as 类型
value as type
```

或

```typescript
// <类型>值
<type>value
```

在 `tsx` 语法（`React` 的 `jsx` 语法的 `ts` 版）中必须使用前者，即 `值 as 类型` 。

形如 `<Foo>` 的语法在 `tsx` 中表示的是一个 `ReacNode`，在 `ts` 中除了表示类型断言外，也可能是表示一个泛型。

故建议大家在使用类型断言时，统一使用 `值 as 类型` 这样的语法！

## 类型断言的用途

类型断言的常见用途有以下几种：

### 将一个联合类型断言为其中一个类型

当 `TypeScript` 不确定一个联合类型的变量到底是哪个类型时，只能访问联合类型所有类型中的共有的属性和方法。

```typescript
interface Cat {
    name: string
    run(): void
}

interface Fish {
    name: string
    swim(): void
}

function getName(animal: Cat | Fish) {
    return animal.name
}
```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性和方法，比如：

```typescript
interface Cat {
    name: string
    run(): void
}

interface Fish {
    name: string
    swim(): void
}

function getName(animal: Cat | Fish) {
    if (typeof animal.swim === 'function') {
        return true
    }
    return false
}

// 类型“Cat | Fish”上不存在属性“swim”。
// 类型“Cat”上不存在属性“swim”。ts(2339)
```

上面的例子中，获取 `animal.swim` 就会报错，因为 `swim` 不是联合类型 `Cat | Fish` 公共属性或者方法。

此时，可以使用类型断言，将 `animal` 断言为 `Fish`：

```typescript
interface Cat {
    name: string
    run(): void
}

interface Fish {
    name: string
    swim(): void
}

function getName(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true
    }
    return false
}
```

这样就可以解决访问 `animal.swim` 报错的问题了。

需要注意的是，类型断言只能欺骗 `TypeScript` 编译器，无法避免运行时的错误，滥用类型断言可能会导致运行时错误：

```typescript
interface Cat {
    name: string
    run(): void
}

interface Fish {
    name: string
    swim(): void
}

function getName(animal: Cat | Fish) {
    ;(animal as Fish).swim()
}

getName({
    name: 'mimi',
    run: () => {
        console.log('mimi')
    }
})
// animal.swim is not a function
```

上面的例子编译时不会报错，但在运行时会报错：

```javascript
Uncaught TypeError: animal.swim is not a function
```

原因是 `(animal as Fish).swim()` 这段代码隐藏了 `animal` 可能是 `Cat` 的情况，将 `animal` 直接断言为 `Fish` 类型了，而 `TypeScript` 信任了我们的断言，故在调用 `swim()` 没有编译错误。

可是 `getName` 函数接受的是 `Cat | Fish`，一旦传入的参数是 `Cat` 类型变量，由于 `Cat` 上没有 `swim` 方法，就会导致运行时错误。

总之，使用类型断言时要格外小心，尽量避免断言后调用方法或者引用深层属性，减少不必要的运行时错误。

### 将一个父类断言为更加具体的子类

```typescript
// 原文中的示例，因为 Error 原因，运行时抛出错误
class ApiObject extends Object {
    code: number = 0
}

class HttpObject extends Object {
    statusCode: number = 200
}

function isApiObject(object: Object) {
    if (typeof (object as ApiObject).code === 'number') {
        return true
    }
    return false
}
```

上面的例子中，我们声明了函数 `isApiError`，用来判断传入的参数是不是 `ApiError` 类型，那函数的参数类型需要是父类 `Error`，这样函数就能接收 `Error` 或者它的子类作为参数了。

但是父类 `Error` 中没有 `code` 属性，故直接获取 `error.code` 会报错，需要使用类型断言获取 `(error as ApiError).code`。

使用 `intanceof` 进行判断

```typescript
class ApiObject extends Object {
    code: number = 0
}

class HttpObject extends Object {
    statusCode: number = 200
}

function isApiObject(object: Object) {
    if (object instanceof ApiObject) {
        return true
    }
    return false
}
```

上面的例子中，确实使用 `instanceof` 更加合适，因为 `ApiObject` 是一个 `JavaScript` 的类，能够通过 `instanceof` 来判断 `object` 是否是它的实例。

但是有些情况下，`ApiObject` 和 `HttpObject` 并不是一个类，而只是 `TypeScript` 的接口，接口只是一个类型，它在编译结果中会被删除，当然就无法使用 `instanceof` 进行运行时判断了。

这时候只能用类型断言，通过判断是否存在 `code` 属性，来判断传入的参数是不是 `ApiObject` 类型：

```typescript
interface ApiObject extends Object {
    code: number
}

interface HttpObject extends Object {
    statusCode: number
}

function isApiObject(object: Object) {
    if (typeof (object as ApiObject).code === 'number') {
        return true
    }
    return false
}

isApiObject({ code: 200 }) // true
isApiObject({ status: 404 }) // false
```

### 将任何类型断言为 `any`

理想状态下，`TypeScript` 类型系统运行良好，每个值的类型都具体而精确。

当我们引入一个在此类型上，不存在的属性或者方法时，就会报错：

```typescript
const myAge: number = 18
const len: number = myAge.length

// 类型“number”上不存在属性“length”。ts(2339)
```

上面的例子中，数字类型的变量 `myAge` 上是没有 `length` 属性的，故 `TypeScript` 给出了错误提示。

这种错误提示显然是非常有用的。

但有的时候，我们也非常确定有些代码是不会出错的，例如：

```typescript
window.myAge = 18

// 属性“myAge”在类型“Window & typeof globalThis”上不存在。你是否指的是“Image”?ts(2551)
```

上面的例子中，我们在 `window` 对象上添加了一个属性 `myAge`， 但 `TypeScript` 编译会报错，提示我们 `window` 上不存在 `myAge` 属性。

此时，我们可以使用 `as any` 将 `window` 对象断言为 `any` 类型：

```typescript
;(window as any).myAge = 18
```

在 `any` 类型的变量上，访问任何属性都是允许的。

::: warning 注意
将一个变量类型断言为 `any` ，可以说是解决 `TypeScript` 中类型问题的最后一个手段。
:::

**它极有可能掩盖真正的类型错误，所以如果不是非常确定，就不要使用 `as any`。**

总之，**一方面不能滥用 `as any`，另一方面也不能完全否定它的作用，我们需要在类型的严格和开发的便利性之间掌握平衡**（这也是 [TypeScript 的设计理念](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)之一），才能发挥出 `TypeScript` 最大的价值。

### 将 any 断言为一个具体的类型

遇到 `any` 时，我们可以选择无视它，任由它滋生更多的 `any`。

我们也可以选择改进它，通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

举例来说，历史遗留的代码中有个 `getCacheData`，它的返回值是 `any`。

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}
```

那么我们在使用它时，最好能够将调用了它的返回值断言为一个精确的类型，这样就方便了后续的操作。

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}

interface Cat {
    name: string
    run(): void
}

const tom = getCacheData('tom') as Cat
tom.run()
```

上面的例子中，我们调用完 `getCacheData` 后，立即将它的返回值断言为 `Cat`，这样就明确了 `tom` 的类型，后续对 `tom` 的操作就有了代码补全，提高了代码的可维护性。

## 类型断言的限制

从上面的例子中，我们可以总结出：

-   联合类型可以被断言为其中一个类型
-   父类可以被断言为子类
-   任何类型都可以被断言为 `any`
-   `any` 可以被断言为任何类型

那么类型断言有没有什么限制呢？是不是任何一个类型都可以被断言为任何另一个类型呢？

```typescript
interface Animal {
    name: string
}

interface Cat {
    name: string
    run(): void
}

let tom: Cat = {
    name: 'tom',
    run () => {
        console.log(this.name)
    }
}

let animal: Animal = tom
```

我们知道，`TypeScript` 是结构类型系统，类型之间的对比只会比较他们最终的结构，而会忽略他们定义时的关系。

在上面的例子中，`Cat` 包含了 `Animal` 中的所有属性，除此之外，它还有一个额外的方法 `run`。

`TypeScript` 并不关心 `Cat` 和 `Animal` 之间定义时是什么关系，而只会看它们最终的结构有什么关系 -- 所以它和 `Cat extends Animal` 是等价的。

```typescript
interface Animal {
    name: string
}

interface Cat extends Animal {
    run(): void
}
```

那么也不难理解为什么 `Cat` 类型的 `tom` 可以赋值给 `Animal` 类型的 `animal` 了 -- 就像面向对象编程中，我们可以将子类的实例赋值给类型为父类的变量。

我们把它换成 `TypeScript` 中更专业的说法，即：`Animal` 兼容 `Cat`。

当 `Animal` 兼容 `Cat` 时，它们就可以相互进行类型断言了：

```typescript
interface Animal {
    name: string
}

interface Cat {
    name: string
    run(): void
}
function testAnimal(animal: Animal) {
    return animal as Cat
}

function testCat(cat: Cat) {
    return cat as Animal
}
```

这样的设计其实很容易就能理解：

-   允许 `Animal as Cat` 是因为 「父类可以被断言为子类」。
-   允许 `Cat as Animal` 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

综上所述：

-   联合类型可以被断言为其中一个类型
-   父类可以被断言为子类
-   任何类型都可以被断言为 `any`
-   `any` 可以被断言为任何类型
-   要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B`， 或者 `B` 兼容 `A`

## 双重断言

既然：

-   任何类型都可以被断言为 `any`
-   `any` 可以被断言为任何类型

那么我们是不是可以使用双重断言 `as any as Foo` 来将任何一个类型断言为任何另一个类型呢？

```typescript
interface Cat {
    run(): void
}

interface Fish {
    swim(): void
}

function testCat(cat: Cat) {
    return (cat as any) as Fish
}
```

上面的例子中，若直接使用 `cat as Fish` 肯定会报错，因为 `Cat` 和 `Fish` 相互都不兼容。

但使用 `as any as Fish` 就不会报错了，但使用这种双重断言，十有八九是非常错误的，它很可能会导致运行时错误。

**除非迫不得以，千万别用双重断言**

## 类型断言 VS 类型转换

类型断言只会影响 `TypeScript` 编译时的类型，类型断言语句在编译结果中会被删除：

```typescript
function toBoolean(something: any): boolean {
    return something as boolean
}

toBoolean(1) // 返回值还是 1
```

上面的例子中，将 `something` 断言为 `boolean` 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

```javascript
function toBoolean(something) {
    return something
}

toBoolean(1)
```

所以类型断言不是类型转换，它不会真的影响到变量的类型。

若要进行类型转换，需要直接调用类型转换的方法：

```typescript
function toBoolean(something: any): boolean {
    return Boolean(something)

toBoolean(1) // 返回值 true
```

## 类型断言 VS 类型声明

在下面的例子中：

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}

interface Cat {
    name: string
    run(): void
}

const tom = getCacheData('tom') as Cat

tom.run()
```

我们使用 `as Cat` 将 `getCacheData` 函数返回的 `any` 类型，断言为 `Cat`。

但实际上还有其他方案可以解决同样的问题：

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}

interface Cat {
    name: string
    run(): void
}

const tom: Cat = getCacheData('tom')

tom.run()
```

上面的例子中，我们通过类型声明的方式，将 `tom` 变量声明为 `Cat` 类型，然后再将 `any` 类型的 `getCacheData` 函数返回值，赋值给 `Cat` 类型的 `tom`。

它们的区别，可以通过下面的例子理解：

```typescript
interface Animal {
    name: string
}

interface Cat {
    name: string
    run(): void
}

const animal: Animal = {
    name: 'tom'
}

let tom = animal as Cat
```

在上面的例子中，由于 `Animal` 兼容 `Cat`，故可以将 `Animal` 断言为 `Cat`，并赋值给 `tom`。

但若是直接声明 `tom` 为 `Cat` 类型：

```typescript
interface Animal {
    name: string
}

interface Cat {
    name: string
    run(): void
}

const animal: Animal = {
    name: 'tom'
}

let tom: Cat = animal

// Property 'run' is missing in type 'Animal' but required in type 'Cat'.ts(2741)
// demo.ts(7, 3): 'run' is declared here.
```

则会报错，不允许将 `animal` 赋值给 `Cat` 类型的 `tom`。

简单理解，`animal` 可以看做是 `Cat` 的父类，当然不能将父类的实例，赋值给，类型为子类的变量。

深入理解，它们的核心区别在于：

-   `animal` 断言为 `Cat`， 只需要满足 `Animal` 兼容 `Cat`，或者 `Cat` 兼容 `Animal`即可
-   `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行，但这里的例子中，`Cat` 并不兼容 `Animal`

知道了它们的核心区别，就知道了类型声明比类型断言更严格。

所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加的优雅。

## 类型断言 VS 泛型

还是这个例子

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}

interface Cat {
    name: string
    run(): void
}

const tom = getCacheData('tom') as Cat

tom.run()
```

我们还有第三种，可以解决这个问题，那就是泛型：

```typescript
function getCacheData<T>(key: string): T {
    return (window as any).cache[key]
}

interface Cat {
    name: string
    run(): void
}

const tom = getCacheData<Cat>('tom')

tom.run()
```

通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中 `any`，是最优的一个解决方案。

## 问答

-   类型声明和类型断言哪个更严格，为什么？

## 参考

-   [TypeScript 入门教程 - 任意值](https://ts.xcatliu.com/basics/type-assertion)