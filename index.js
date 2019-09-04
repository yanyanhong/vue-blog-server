const express = require('express')
const app = express()

// const Vue = require('vue')
// Vue.component('test',{
//   template:'<div>hello-world</div>'
// })
// const appvue = new Vue({
//   template: `<div>Hello World--aaa<test></test></div>`
// })
//
// // 第 2 步：创建一个 renderer
// const renderer = require('vue-server-renderer').createRenderer()
//
// app.get('/aaa', (req, res) => {
//
//
//   // 第 3 步：将 Vue 实例渲染为 HTML
//   renderer.renderToString(appvue, (err, html) => {
//     if (err) throw err
//     console.log(html)
//     // => <div data-server-rendered="true">Hello World</div>
//     res.end(`
//       <!DOCTYPE html>
//       <html lang="en">
//         <head><title>Hello</title></head>
//         <body>${html}</body>
//       </html>
//     `)
//   })
// })



app.use(express.static('static'))

app.use(function(req, res, next) {
  //console.log("req:",req,"res",res);
  let origin = req.headers.origin
  if(origin){
    // if (whitList.includes(origin)) {
      // 设置哪个源可以访问我
      res.setHeader('Access-Control-Allow-Origin', origin)
      // 允许携带哪个头访问我
      res.setHeader('Access-Control-Allow-Headers', 'name')
      // 允许哪个方法访问我
      res.setHeader('Access-Control-Allow-Methods', 'PUT')
      // 允许携带cookie
      res.setHeader('Access-Control-Allow-Credentials', true)
      // 预检的存活时间
      res.setHeader('Access-Control-Max-Age', 6)
      // 允许返回的头
      res.setHeader('Access-Control-Expose-Headers', 'name')
      if (req.method === 'OPTIONS') {
        res.end() // OPTIONS请求不做任何处理
      }
    // }
  }

  next()
})



app.get('/detail', (req, res) => {

  let query = req.query;
  res.json({
    id:query.id,
    title:'新闻标题'+query.id,
    detail:"新闻内容科技开了房间大深刻理解风口浪尖副科级非得说"+query.id
  })
})

app.get('/list',(req, res) => {
  let arr = [];
  for(let i = 0;i<100;i++){
    let imgName = i % 2;
    arr.push({
      id:i+'',
      thumb:'http://192.168.0.15:3000/'+ imgName +'.png',
      title:"新闻标题--"+i,
      desc:"新闻描述"
    });
  }
  res.json(arr);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
