## 编译运转配置

`TypeScript` 是无法直接运行的，需要通过编译为 `JavaScript` 文件才能执行，`tsconfig.json` 就是控制编译配置的文件。

```json
{
    // 编译的文件配置，如果不设置，编译对象是目录内所有的 .ts 文件
    "include": ["./backend/index.ts"],

    // 编译项目内所有的内容，但是不编译 exclude 内的文件
    "exclude": ["./backend/demo.ts"],

    "compilerOptions": {
        /* 基础选项 */
        "incremental": true,                      /* 增量编译 */
        "target": "es5", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
        "module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
        "lib": [],                                /* 指定要包含在编译中的库文件 */
        "allowJs": true,                          /* 允许编译 javascript 文件. */
        "checkJs": true,                          /* 在 .js 文件中显示错误信息. */
        "declaration": true,                      /* 生成相应的 '.d.ts' 文件. */
        "declarationMap": true,                   /* 为每一个相应的 '.d.ts' 文件生成一个 sourcemap. */
        "sourceMap": true,                        /* 生成相应的 '.map' 文件. */
        "outDir": "./build",                      /* 配置编译后文件目录. */
        "rootDir": "./src",                       /* 指定的输入文件目录. */

        "removeComments": true,                   /* 移除注释. */

        /* 严格的类型参数检查 */
        "strict": true,                           /* 严格的类型参数检查. */
        "noImplicitAny": true,                    /* 不明确的指定参数类型. */
        "strictNullChecks": true,                 /* 强制效验 null. */

        /* 额外的检查 */
        "noUnusedLocals": true,                   /* 未使用的变量显示错误. */
        "noUnusedParameters": true,               /* 未使用的参数显示错误. */
    }
}
```

## 编译为 JavaScript

在 `package.json` 中配置

```json
{
    "script": {
        "build": "tsc"
    }
}
```

配置完成后，执行 `npm run build`, 可以编译项目中所有的 `.ts` 文件

## 自动编译

只需要添加 `-w`，执行 `npm run build` 后，只要 `.ts` 文件有改变，就会自动编译为 `.js` 文件

## 自动执行

安装 `nodemon` 包，[nodemon npm](https://www.npmjs.com/package/nodemon)

```shell
npm install --save-dev nodemon
```

在 `package.json` 中配置命令

```json
{
    "script": {
        "start": "nodemon .build/index.js"
    }
}
```

简单的 `nodemon` 配置，在 `package.json` 中

```json
"nodemonConfig": {
    // 配置忽略监听的目录或文件
    "ignore": ["test/*", "docs/*"],

    // 延迟多少 ms 执行
    "delay": "2500"
}
```

启动

```shell
npm run start
```

通过以上配置，我们执行两个命令，即可完成 `TypeScript` 编译生成 `JavaScript`，执行 `JavaScript` 的过程。

```shell
npm run watch
npm run start
```

## 合并命令

每次都要执行两个命令，还挺麻烦的，可以通过 `concurrently` 包解决

安装 `concurrently` 包，[concurrently npm](https://www.npmjs.com/package/concurrently)

```shell
npm install concurrently -D
```

修改 `package.json` 中的配置如下

```json
{
    "script": {
        "dev:build": "tsc -w",
        "dev:start": "nodemon .build/index.js",
        "dev": "concurrently npm:dev:*"
    }
}
```

执行下面的命令

```shell
npm run dev
```

上面的代码中，相当于执行了 `npm run dev:build` 和 `npm run dev:start` 两个命令

## 参考

-   [TypeScript 中文网 - 项目配置 - tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

