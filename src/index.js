let sitesDefault = [{
    logo: "C",
    href: "https://blog.csdn.net",
    note: "CSDN博客平台"
}, {
    logo: "Y",
    href: "https://www.yuque.com",
    note: "语雀，专业的云端知识库，为知识创作而生"
}]
let blogsDefault = [{
    href: "https://blog.csdn.net/qq_40029828/article/details/108920762",
    title: "#再读JS# （6）jQuery设计思想",
    info: "jQuery的基本设计思想和主要用法，就是&quot选择某个网页元素，然后对其进行某种操作&quot。"
}, {
    href: "https://blog.csdn.net/qq_40029828/article/details/108858868",
    title: "#再读JS# （5）JS世界",
    info: "__proto__用于存放共有属性的对象的地址，等同于其构造函数的prototype的地址"
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
    console.log(e.key.toUpperCase())
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