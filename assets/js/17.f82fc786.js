(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{236:function(t,s,a){t.exports=a.p+"assets/img/typescript-tip-record.796bfe01.jpeg"},256:function(t,s,a){"use strict";a.r(s);var e=a(2),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"今日句子"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#今日句子"}},[t._v("#")]),t._v(" 今日句子")]),t._v(" "),e("p",[e("img",{attrs:{src:a(236),alt:"今日Twitter"}})]),t._v(" "),e("h2",{attrs:{id:"原文"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#原文"}},[t._v("#")]),t._v(" 原文")]),t._v(" "),e("blockquote",[e("p",[t._v("TypeScript Tip 💡"),e("br"),e("br"),t._v("\nUse the utility type 'Record' to make an object indexable, instead of typing it out manually."),e("br"),t._v("\nIt's cleaner and becomes handy if you want to map the properties of one type to another."),e("br"),t._v(" > "),e("a",{attrs:{href:"https://twitter.com/SimonHoiberg/status/1501522105216684033",target:"_blank",rel:"noopener noreferrer"}},[t._v("查看原文"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"翻译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#翻译"}},[t._v("#")]),t._v(" 翻译")]),t._v(" "),e("blockquote",[e("p",[t._v("TypeScript 技巧提示 💡"),e("br"),e("br"),t._v("\n使用工具类型 "),e("code",[t._v("Record")]),t._v(" 标记对象的索引，而不是手动输入。"),e("br"),t._v("\n如果你想将一个属性映射到另一个属性上，那将变得更简洁且方便。 "),e("a",{attrs:{href:"https://twitter.com/SimonHoiberg/status/1501522105216684033",target:"_blank",rel:"noopener noreferrer"}},[t._v("查看原文"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"单词"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单词"}},[t._v("#")]),t._v(" 单词")]),t._v(" "),e("ul",[e("li",[t._v("indexable:adj.可变址的；可加索引的；")]),t._v(" "),e("li",[t._v("manually:adv.手动的；用手")]),t._v(" "),e("li",[t._v("handy:adj.有用的，方便的，便于使用的；手巧的，有手艺的；手边的；附近的")])]),t._v(" "),e("h2",{attrs:{id:"技术-record"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#技术-record"}},[t._v("#")]),t._v(" 技术 - Record")]),t._v(" "),e("blockquote",[e("p",[t._v("Record<K, T> 构造具有给定类型 T 的一组属性是 K 的类型。在将一个类型的属性映射到另一个类型的属性时，Record 非常方便")])]),t._v(" "),e("div",{staticClass:"language-typescript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-typescript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// bad")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" users"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" User "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// good")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" users"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Record"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" user"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);