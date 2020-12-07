let sitesDefault = [ {
    logo: "Y",
    href: "https://www.yuque.com",
    note: "语雀，云端知识库"
}, {
        logo: "G",
        href: "https://github.com/",
        note: "Github，代码托管平台"
    },   {
        logo: "D",
        href: "https://devdocs.io/offline",
        note: "Devtools，技术文档查询"
    },
    {
        logo: "M",
        href: "https://developer.mozilla.org/zh-CN/docs/Web/HTML",
        note: "MDN，开发者文档社区"
    },{
        logo: "V",
        href: "https://v3.vuejs.org/guide/introduction.html",
        note: "Vue3，官方文档"
    },{
        logo: "R",
        href: "https://react.docschina.org/",
        note: "React，官方文档"
    },{
        logo: "N",
        href: "http://nodejs.cn/api/",
        note: "Node.js，官方API文档"
    },{
        logo: "P",
        href: "https://codepen.io/",
        note: "CODEPEN，前端作品分享"
    },    {
        logo: "T",
        href: "https://trends.builtwith.com/javascript/jQuery",
        note: "Trnds，技术趋势查询"
    },{
        logo: "C",
        href: "https://blog.csdn.net",
        note: "CSDN博客平台"
    },{
        logo: "S",
        href: "https://sockboom.art/auth/login",
        note: "SockBoom，付费科学上网"
    },]

let blogsDefault = [{
    href: "https://www.yuque.com/damingzhangwuji/ugpugz/batwya",
    title: "你不知道的JavaScript—上卷",
    info: "两章，一：作用域和闭包，二：this和对象原型。"
},{
    href: "https://blog.csdn.net/qq_40029828/article/details/108920762",
    title: "#再读JS# （6）jQuery设计思想",
    info: "jQuery的基本设计思想和主要用法，就是&quot选择某个网页元素，然后对其进行某种操作&quot。"
}, {
    href: "https://blog.csdn.net/qq_40029828/article/details/108858868",
    title: "#再读JS# （5）JS世界",
    info: "__proto__用于存放共有属性的对象的地址，等同于其构造函数的prototype的地址"
}, {
    href: "https://blog.csdn.net/qq_40029828/article/details/109143844",
    title: "Webpack 打怪升级",
    info: "学习webpack的经验总结，对配置及插件的理解"
},{
    href: "https://juejin.cn/post/6844903704437456909",
    title: "阅读源码后，来讲讲React Hooks是怎么实现的",
    info: "React Hooks实现"
},{
    href: "https://www.ituring.com.cn/article/66566",
    title: "【翻译】Promises/A+规范",
    info: "一个开放、健全且通用的 JavaScript Promise 标准。由开发者制定，供开发者参考。"
},{
    href: "https://juejin.cn/post/6844903704437456909",
    title: "前端MVC变形记",
    info: "前端架构设计模式演变"
},{
    href: "https://segmentfault.com/a/1190000004114594",
    title: "为什么说DOM操作很慢",
    info: "浏览器渲染引擎过程"
},{
    href: "https://www.zhihu.com/question/330112288/answer/744362539",
    title: "哈希表",
    info: "哈希表复杂度和解决冲突的办法"
},{
    href: "https://bonsaiden.github.io/JavaScript-Garden/zh/",
    title: "JS秘密花园",
    info: "主要关心JavaScript 一些古怪用法的文档"
},{
    href: "https://juejin.cn/post/6844903582538399752",
    title: "Event Loop、计时器、nextTick",
    info: "Node.js事件循环"
}]
let listUl = $(".siteLists")
let listBlogs = $(".blogList")
let addLi = $(".addSite")
let addLiBlog = $(".addBlog")
let siteList
let blogList
let simplifyHref = (href) => {
    return href.replace("http://www.", "")
        .replace("https://www.", "")
        .replace('http://', '')
        .replace("https://", "")
}
let getSites = () => {
    siteList = JSON.parse(localStorage.getItem("sites"))
    return siteList
}
let getBlogs = () => {
    blogList = JSON.parse(localStorage.getItem("blogs"))
    return blogList
}
let saveSites = () => {
    localStorage.setItem("sites", JSON.stringify(siteList))
}
let saveBlogs = () => {
    localStorage.setItem("blogs", JSON.stringify(blogList))
}
siteList = getSites() || sitesDefault
blogList = getBlogs() || blogsDefault
//用flag来标记现在应该展示sites还是blogs，true为sites，false为blogs
let flag = true
let display = () => {
    if (flag) {
        //判断site是不是选中了，没有就加上selected，判断下面是不是被hidden了，是就移除
        $("#lovedSites").hasClass("selected") ? null : $("#lovedSites").addClass("selected")
        $("#sites").hasClass("hidden") ? $("#sites").removeClass("hidden") : null
        $("#lovedBlogs").hasClass("selected") ? $("#lovedBlogs").removeClass("selected") : null
        $("#blogs").hasClass("hidden") ? null : $("#blogs").addClass("hidden")
    } else {
        $("#lovedSites").hasClass("selected") ? $("#lovedSites").removeClass("selected") : null
        $("#sites").hasClass("hidden") ? null : $("#sites").addClass("hidden")
        $("#lovedBlogs").hasClass("selected") ? null : $("#lovedBlogs").addClass("selected")
        $("#blogs").hasClass("hidden") ? $("#blogs").removeClass("hidden") : null
    }
}
let render = () => {
    display()
    $(".siteLists .site").remove()
    $(".blogList .blog").remove()
    siteList.forEach((item, index) => {
        let li = $(`
        <li class="site"  data-id=${index}>
        <span class="delete" data-id=${index}>
        <svg class="icon" aria-hidden="true">
        <use href="#icon-del"></use>
        </svg>
        </span>
        <a href="${ item.href}">
        <div div class= "logo" > ${item.logo}</div>
        <p>${simplifyHref(item.href)}</p>
        <p>${item.note}</p>
        </a >
        </li > `)
        //把删除函数写在每个小li遍历的时候，才能拿到index，高级
        $(li).insertBefore(addLi).on('click', '.delete', (e) => {
            siteList.splice(index, 1)
            saveSites()
            render()
        })
    })
    blogList.forEach((item, index) => {
        let blogLi = $(
            ` <li class="blog">
          <span class="delete" data-id=${index}>
          <svg class="icon" aria-hidden="true">
            <use href="#icon-del"></use>
          </svg>
        </span>
        <a href="${item.href}">
                <h5>${item.title}</h5>
                <p>${item.info}</p>
            </a>
            </li>`
        )
        $(blogLi).insertBefore(addLiBlog)
            .on('click', '.delete', (e) => {
                blogList.splice(index, 1)
                saveBlogs()
                render()
            })

    })
}
render()
//判断用户是否点击了取消，点击确认则即使空值也保存下来
addLi.on("click", () => {
    let newSite = {}
    newSite["href"] = window.prompt("输入你喜欢的网址：")
    if (newSite["href"] !== null) {
        newSite["note"] = window.prompt("备注喜欢的原因：")
        if (newSite["note"] !== null) {
            newSite["logo"] = simplifyHref(newSite["href"])[0].toUpperCase()
            siteList.push(newSite)
            saveSites()
            render()
        }
    }
})
addLiBlog.on("click", () => {
    let newBlog = {}
    newBlog["href"] = window.prompt("输入博客地址：")
    if (newBlog["href"] !== null) {
        newBlog["title"] = window.prompt("博客标题是：")
        if (newBlog["title"] !== null) {
            newBlog["info"] = window.prompt("博客简介是：")
            if (newBlog["info"] !== null) {
                blogList.push(newBlog)
                saveBlogs()
                render()
            }
        }
    }
})
$(window).on("unload", function () {
    saveSites()
    saveBlogs()
})
$("#lovedSites").on("click", () => {
    flag = flag ? flag : (!flag)
    display()
})
$("#lovedBlogs").on("click", () => {
    flag = flag ? (!flag) : flag
    display()
})
//添加键盘事件，鼠标按下已有网站的logo的键时，直接跳转对应网站
$(document).keypress((e) => {
    siteList.forEach((item, index) => {
        if (item.logo === e.key.toUpperCase()) {
            window.open(item.href, "_blank")
        }
    }
    )
})
//因为input也在页面中，会冒泡触发上述键盘事件，需要取消冒泡
$(".searchHead input").keypress((e) => {
    e.stopPropagation()
})