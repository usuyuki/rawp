(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[81],{1561:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/description",function(){return s(2833)}])},9475:function(e,t,s){"use strict";var n=s(5893);let r=e=>{let{heading:t}=e;return(0,n.jsxs)("div",{className:"my-8 flex items-center justify-center",children:[(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"relative mr-8 h-12 w-12 rounded-xl bg-primary",children:(0,n.jsx)("div",{className:"absolute -top-4 -right-4 h-8 w-8 rounded-md bg-secondary"})})}),(0,n.jsx)("h1",{className:"pb-2 text-4xl drop-shadow md:text-4xl",children:t})]})};t.Z=r},4066:function(e,t,s){"use strict";s.d(t,{Z:function(){return p}});var n=s(5893),r=s(9008),i=s.n(r),a=s(4298),c=s.n(a);let l=()=>(0,n.jsx)("footer",{children:(0,n.jsx)("p",{className:"text-center text-xl",children:"copyright usuyuki"})});var x=s(1664),d=s.n(x);let o=()=>(0,n.jsxs)("header",{className:"sticky top-0 z-10 flex flex-wrap justify-around",children:[(0,n.jsx)(d(),{href:"/",children:(0,n.jsx)("p",{className:"text-primary",children:"トップ"})}),(0,n.jsx)(d(),{href:"/run",children:(0,n.jsx)("p",{className:"text-primary",children:"実行"})}),(0,n.jsx)(d(),{href:"/description",children:(0,n.jsx)("p",{className:"text-primary",children:"仕組み"})}),(0,n.jsx)(d(),{href:"/aboutThisSite",children:(0,n.jsx)("p",{className:"text-primary",children:"このサイトについて"})})]});var h=s(5675),m=s.n(h);let j=()=>(0,n.jsx)("div",{className:"side-share-element",children:(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,n.jsx)("p",{children:"share"}),(0,n.jsx)("div",{className:"h-16 w-1 bg-black"}),(0,n.jsx)("a",{href:"http://twitter.com/share?url=rawp.usuyuki.net&text=複数回のグループ分けをいい感じにするツール「RAWP」&related=@usuyuki26",target:"_blank",rel:"noreferrer noopener",children:(0,n.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-full bg-black",children:(0,n.jsx)(m(),{src:"/img/icon/TwitterLogoWhite.svg",alt:"Twitter",width:"0",height:"0",sizes:"100%",className:"h-auto w-1/2"})})})]})}),u=e=>{let{children:t,title:s,description:r}=e,a=s?"".concat(s," | RAWP"):"RAWP",x=null!=r?r:"RAWPは重複のない複数回グループ分けを素早く導き出すサービスです";return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("meta",{httpEquiv:"content-language",content:"ja"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,n.jsx)("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"}),(0,n.jsx)("meta",{name:"description",content:x}),(0,n.jsx)("title",{children:a}),(0,n.jsx)("meta",{property:"og:title",content:a}),(0,n.jsx)("meta",{property:"og:description",content:x}),(0,n.jsx)("meta",{property:"og:type",content:"website"}),(0,n.jsx)("meta",{property:"og:url",content:"https://rawp.usuyuki.net/"}),(0,n.jsx)("meta",{property:"og:image",content:"https://rawp.usuyuki.net/img/ogp/ogp.jpg"}),(0,n.jsx)("meta",{name:"twitter:card",content:"summary"}),(0,n.jsx)("meta",{name:"twitter:site",content:"@usuyuki26"}),(0,n.jsx)("meta",{name:"twitter:creator",content:"@usuyuki26"}),(0,n.jsx)("link",{rel:"apple-touch-icon",type:"image/png",href:"/img/favicon/apple-touch-icon-180x180.png"}),(0,n.jsx)("link",{rel:"icon",type:"image/png",href:"/img/favicon/icon-192x192.png"}),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c(),{id:"gaRemoteScript",async:!0,src:"https://www.googletagmanager.com/gtag/js?id=G-J7JHJXHKX3"}),(0,n.jsx)(c(),{id:"gaInlineScript",dangerouslySetInnerHTML:{__html:"\n                                window.dataLayer = window.dataLayer || [];\n                                function gtag(){dataLayer.push(arguments);}\n                                gtag('js', new Date());\n                                gtag('config', 'G-J7JHJXHKX3', {\n                                    page_path: window.location.pathname,\n                                });\n                                "}})]})]}),(0,n.jsx)("div",{className:"fixed inset-y-0 right-4 ",children:(0,n.jsx)(j,{})}),(0,n.jsx)(o,{}),(0,n.jsx)("main",{children:t}),(0,n.jsx)(l,{})]})};var p=u},2833:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return l}});var n=s(5893),r=s(9475);let i=e=>{let{heading:t,sub:s}=e;return(0,n.jsxs)("div",{className:"mt-16 flex flex-col items-center justify-center",children:[(0,n.jsx)("h2",{className:"border-b-2 border-primary pb-2 text-3xl drop-shadow md:text-4xl",children:t}),null===s?"":(0,n.jsx)("p",{className:"mt-2 text-sm ",children:s})]})};var a=s(4066);let c=()=>(0,n.jsxs)(a.Z,{title:"仕組み",children:[(0,n.jsx)(r.Z,{heading:"仕組み"}),(0,n.jsx)(i,{heading:"NP困難"}),(0,n.jsxs)("p",{className:"flex justify-center",children:["複数回のグループ分けで重複を減らしながら行うのはNP困難と呼ばれます。",(0,n.jsx)("br",{}),"複数地点を最適に結ぶ経路を考えるセールスマン巡回問題と同じ最適化問題の一種です。",(0,n.jsx)("br",{}),"多くの組み合わせがある中で、そのすべてを検証するのはコンピュータでも天文学的な時間を要することが知られています。",(0,n.jsx)("br",{}),"そこですべてを検証して厳密でベストな結果を求めるのではなく、ある程度良いベターな結果を求めるのが一般的な手法です。"]}),(0,n.jsx)(i,{heading:"焼きなまし法"}),(0,n.jsxs)("p",{className:"flex justify-center",children:["RAWPでは焼きなまし法を用いることで、複数回の重複の少ないグループ分けを実現します。",(0,n.jsx)("br",{}),"焼きなましとは金属材料を熱した後で徐々に冷やし、結晶を成長させてその欠陥を減らす作業のことで、これをアルゴリズムとして再現したのが焼きなまし法になります。"]}),(0,n.jsx)(i,{heading:"WebAssembly"}),(0,n.jsxs)("p",{className:"flex justify-center",children:["WebAssemblyはモダンブラウザで動くパフォーマンスの高い言語です。",(0,n.jsx)("br",{}),"RAWPではJavaScriptと組み合わせてWebAssemblyを用いることで高いパフォーマンスを実現しています。",(0,n.jsx)("br",{}),"お使いのデバイスで演算を行うため、入力した情報をサーバー側に送信することなく処理が行なえます。"]})]});var l=c}},function(e){e.O(0,[316,774,888,179],function(){return e(e.s=1561)}),_N_E=e.O()}]);