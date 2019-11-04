module.exports = app => {
  const mongosee = require('mongoose')
  mongosee.connect('mongodb://127.0.0.1:27017/nodevuemoba',{
    useNewUrlParser: true
  },err=>{
    if(!err){
      console.log('ok')
    }
  })
}