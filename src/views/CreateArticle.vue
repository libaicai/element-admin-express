<template>
  <div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="formData"
      label-width="100px"
      @submit.native.prevent="saveArtice"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="desc">
        <el-input type="textarea" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">立即创建</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: "",
        desc: "",
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        desc: [{ required: true, message: "请填写文章内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    saveArtice() {
      this.$http.post("/addArticle", this.formData).then((res) => {
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
      });
      this.$router.push("/article/list");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>