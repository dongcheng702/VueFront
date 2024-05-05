<template>
    <div>
        <el-form style="width: 400px; margin-left: 20px;" :model="storeForm" status-icon :rules="rules" ref="storeForm"
            label-width="130px" class="demo-ruleForm">
            <el-form-item label="販売店ID:" prop="storeId">
                <el-input type="text" v-model="storeForm.storeId" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="店名:" prop="storeName">
                <el-input type="text" v-model="storeForm.storeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="住所:" prop="address">
                <el-input type="text" v-model="storeForm.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="電話:" prop="phone">
                <el-input type="text" v-model="storeForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="営業開始年月日:" prop="startDay">
                <el-date-picker style="width: 270px" v-model="storeForm.startDay" type="date" placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="営業終了年月日:" prop="finishDay">
                <el-date-picker style="width: 270px" v-model="storeForm.finishDay" type="date" placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
export default {
    name: 'Edit',
    data() {
        return {
            storeForm: {
                storeId: "",
                storeName: "",
                address: "",
                phone: "",
                startDay: "",
                finishDay: ""
            },
            rules: {
                storeName: [{ required: true, message: '店名不能为空', trigger: 'blur' }],
                address: [{ required: true, message: '住所不能为空', trigger: 'blur' }],
                phone: [
                    { required: true, message: '电话不能为空', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                startDay: [{ required: true, message: '开始日期不能为空', trigger: 'blur' }],
                finishDay: [{ required: true, message: '结束日期不能为空', trigger: 'blur' }]
            }
        };
    },
    props: {
        item: Object,
        id: String
    },
    created() {
        if (this.id && this.item) {
            this.storeForm.storeId = this.id;
            this.storeForm.storeName = this.item.storeName;
            this.storeForm.address = this.item.address;
            this.storeForm.phone = this.item.phone;
            this.storeForm.startDay = this.item.startDay;
            this.storeForm.finishDay = this.item.finishDay;
        }
    },
    methods: {
        submitForm() {
            this.$refs.storeForm.validate((valid) => {
                if (valid) {
                    this.request.post("http://localhost:9090/store/updata", this.storeForm).then(res => {
                        if (res.data == 1) {
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '更新成功'
                            })
                            // 使用 Vue Router 导航到 SuccessPage 组件
                            this.$router.push({ name: 'StoreList' });
                        }
                    })
                } else {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '提交失败,请检查表单数据是否正确。'
                    })
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.storeForm.resetFields(); // 重置表单验证状态
        }
    }
}
</script>
