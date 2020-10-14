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
        <el-input :readonly="readonly" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="desc">
        <el-input
          type="textarea"
          :readonly="readonly"
          v-model="formData.desc"
        ></el-input>
      </el-form-item>
      <el-form-item v-show="!readonly">
        <el-button type="primary" native-type="submit">保存</el-button>
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
      readonly: false,
    };
  },
  props: ["flag"],
  created() {
    if (this.$route.query.flag) {
      this.readonly = true;
      this.rules = {}
    }
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$http.get(`/articleById/${this.$route.params.id}`).then((res) => {
        this.formData = res.data;
      });
    },
    saveArtice() {
      this.$http
        .put(`/articleUpdate/${this.$route.params.id}`, this.formData)
        .then((res) => {
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