module.exports = {
  index: (req,res) => {
    
    res.render("post/index")
  },
  create: (req,res) => {
  	res.view('post/create')
  }
}