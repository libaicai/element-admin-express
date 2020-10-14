const express = require("express");

const app = express();

app.use(require("cors")());
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/element-admin-express", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: { type: String },
    desc: { type: String },
  })
);

// 文章列表
app.get("/api/articleList", async (req, res) => {
  const result = await Article.find();
  res.send(result);
});

// 添加文章
app.post("/api/addArticle", async (req, res) => {
  const result = await Article.create(req.body);
  if (result) {
    res.send({
      code: "01",
      message: "添加成功",
    });
  } else {
    res.send({
      code: "02",
      message: "添加失败",
    });
  }
});

// 删除文章
app.delete("/api/deleteArticle", async (req, res) => {
  const result = await Article.deleteOne(req.body.id);
  if (result) {
    res.send({
      code: "01",
      message: "删除成功",
    });
  } else {
    res.send({
      code: "02",
      message: "删除失败",
    });
  }
});

// 文章详情
app.get("/api/articleById/:id", async (req, res) => {
  const result = await Article.findById(req.params.id);
  res.send(result);
});

// 更改文章
app.put("/api/articleUpdate/:id", async (req, res) => {
  const result = await Article.findByIdAndUpdate(req.params.id, req.body);
  if (result) {
    res.send({
      code: "01",
      message: "更改成功",
    });
  } else {
    res.send({
      code: "02",
      message: "更改失败",
    });
  }
});

app.listen(3005, () => {
  console.log("http://localhost:3005");
});
