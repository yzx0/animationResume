!function () {
  let css1 = `/*面试官你好，我是xxx
  *我将以动画的形式介绍自己
  *
  *只用文字介绍太单调了
  *下面我将以代码来介绍
  *
  *首先准备一些样式
  */
  html{
    background-color:#eee;
  }
  .Wrapper{ 
    position:fixed;
    width:50%;
    height:100%;
    left:0;
    padding: 16px;
  }
  .Wrapper > .code{
    width:100%;
    height:100%;
    padding: 16px;
    overflow:hidden;
    background-color:#eee;
    box-shadow: 0px 0px 4px #ccc;
  }
  /*
  *下面我需要一张白纸来介绍自己
  */
  .paper{
    position:fixed;
    width:50%;
    height: 100%;
    right:0;
    padding: 16px;
    background-color:#fff;
    box-shadow: 0px 0px 4px #ccc;
  }
  .paper>.content{
    width:100%;
    height:100%;
    padding:16px;
    overflow:auto;
    outline:10px solid #666;
  }
  `
  let css2 = `
  /*
  *接着使用marked.js库来变成markdown格式
  *谢谢观看
  */
  `
  function writeCss(prefix,css,fn) {
    let n = 0
    let id = setInterval(function run() {
      n += 1
      let styleTag = document.getElementById('styleTag')
      let code = document.getElementById('code')
      styleTag.innerHTML = prefix + css.slice(0, n)
      code.innerHTML = prefix + css.slice(0, n)
      code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css')
      if (n >= css.length) {
        window.clearInterval(id)
        fn.call()
      }
    }, 0)
  }

  function createPaper(fn) {
    let paper = document.createElement('div')
    paper.id = 'paper'
    paper.className = 'paper'
    document.body.appendChild(paper)

    let content = document.createElement('pre')
    content.classList.add('content')
    paper.appendChild(content)
    fn.call()
  }
  let str = `
  # 自我介绍
  我叫xxx
  x年x月出生
  xxxx学校毕业
  xxx专业
  自学前端半年
  准备应聘前端开发岗位
  # 技能介绍
  熟悉HTML CSS JS
  # 项目介绍
  1.xxx轮播
  2.-xxx画板
  3.-xxx简历
  # 联系方式
  - QQ：xxxxx
  - Email：xxxxx
  - 手机：xxxxxxx
  `
  function transformMarkdown(fn){
    let content = document.querySelector('.paper>.content')
    content.innerHTML = marked(str)
    content.classList.add('markdown-body')
    fn.call()
  }
  function writePaper(fn){
    let n = 0
    let content = document.querySelector('.paper>.content')
    let id = setInterval(() => { 
      n += 1
      content.innerHTML = str.slice(0,n)
      if(n>=str.length){
        window.clearInterval(id)
        fn.call()
      }
    }, 0)

  }
  writeCss.call(undefined,'',css1,()=>{
    createPaper.call(undefined,()=>{
      writePaper.call(undefined,()=>{
        writeCss.call(undefined,css1,css2,()=>{
          transformMarkdown.call(undefined,()=>{
            console.log('success')
          })
        })
      })
    })
  })
}.call()
