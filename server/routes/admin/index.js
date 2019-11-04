module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../moduls/AdminUser')
  const router = express.Router()
  //  添加分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //  修改分类名称
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //  删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  //  获取分类 限制10条
  router.get('/', async (req, res) => {
    const queryOptions = {}
    let items = null
    if (req.Model.name) {
      queryOptions.populate = "parent"
    }
    switch (req.query.type) {
      case "hero":
        items = await req.Model.find({ "class": req.query.class, "parent": "5dba9ab55920e50a608fa782" }).setOptions(queryOptions).limit(20)
        break;
      case "article":
        items = await req.Model.find({ "class": req.query.class, "parent": "5db960e895174c0ba44b9a8c" }).setOptions(queryOptions).limit(20)
        break;
      default:
        items = await req.Model.find().setOptions(queryOptions).limit(20)
        break;
    }

    res.send(items)
  })
  //  查找分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //  登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(), router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //  查找用户  因为在定义Schema表时给password添加了select所以在获取时加上select('+password')才取得到密码
    const user = await AdminUser.findOne({ username }).select('+password')
    //  用户不存在返回422状态码，提示用户不存在
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    //  验证密码
    const isValId = require('bcrypt').compareSync(password, user.password)
    assert(isValId, 422, '密码错误')
    //  返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  //  错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || '500').send({
      message: err.message
    })
  })
}