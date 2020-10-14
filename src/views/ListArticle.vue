<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="文章标题" width="260">
      </el-table-column>
      <el-table-column prop="desc" label="文章内容" width="400">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="handleRemove(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.$http.get("/articleList").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    handleView(row) {
      this.$router.push({
        path: `/article/edit/${row._id}`,
        query: {
          flag: true,
        },
      });
    },
    handleEdit(row) {
      this.$router.push(`/article/edit/${row._id}`);
    },
    handleRemove(row) {
      this.$http.delete("/deleteArticle", row.id).then((res) => {
        if (res.data.code === "01") {
          this.$message({
            message: res.data.message,
            type: "success",
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
        this.getArticleList();
      });
    },
  },
};
</script>