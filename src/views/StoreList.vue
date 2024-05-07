<template>
    <div>
        <div class="pd_10" style="text-align: left">
            <div>
                <el-autocomplete style="width: 200px;" placeholder="请输入贩卖店ID" prefix-icon="el-icon-search"
                    v-model="form.storeId" :fetch-suggestions="querySearch">
                </el-autocomplete>
                <el-input class="ml_10" style="width: 200px;" placeholder="请输入贩卖店名称" prefix-icon="el-icon-search"
                    v-model="form.storeName"></el-input>
                <el-button class="ml_10" type="primary" @click="selectStore" icon="el-icon-search">搜索</el-button>
            </div>

            <div style="margin-top: 20px ; display: flex; align-items: center;">
                <el-button type="primary" @click="addStore">新增<i class="el-icon-circle-plus"
                        style="margin-left: 5px;"></i></el-button>
                <el-popconfirm title="确定删除吗？" @confirm="deleteStores">
                    <el-button class="ml_10" slot="reference" type="danger">批量删除<i class="el-icon-remove-outline
" style="margin-left: 5px;"></i></el-button>
                </el-popconfirm>
                <div v-if="uploadShow">
                    <el-upload class="upload-demo" ref="upload" action="http://1.15.242.164:9090/store/upfile" multiple
                        :limit="1" :auto-upload="false" :accept="'.xls,.xlsx,.csv'" :on-success="upfile"
                        :headers="{ token: token }" style="margin-left: 10px;">
                        <el-button type="primary">导入<i class="el-icon-upload2" style="margin-left: 5px;"></i></el-button>
                    </el-upload>
                </div>
                <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
                <template>
                    <el-popconfirm title="确认导出吗？" @confirm="handleExport">
                        <el-button type="primary" slot="reference" style="margin-left: 10px;">导出<i class="el-icon-download"
                                style="margin-left: 5px;"></i></el-button>
                    </el-popconfirm>
                </template>
            </div>
        </div>
        <div style="height: 700px;">
            <el-table :data="item" border stripe :header-cell-style="{ background: '#eee' }"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="storeId" label="販売店ID" :min-width="'12%'">
                </el-table-column>
                <el-table-column prop="storeName" label="店名" :min-width="'12%'">
                </el-table-column>
                <el-table-column prop="address" label="住所" :min-width="'12%'">
                </el-table-column>
                <el-table-column prop="phone" label="電話" :min-width="'12%'">
                </el-table-column>
                <el-table-column prop="startDay" label="営業開始年月日" :min-width="'12%'">
                </el-table-column>
                <el-table-column prop="finishDay" label="営業終了年月日" :min-width="'12%'">
                </el-table-column>
                <el-table-column id="control" fixed="right" label="操作" :min-width="'12%'">
                    <template slot-scope="scope">
                        <router-link :to="{ name: 'Edit', params: { item: scope.row, id: scope.row.storeId } }">
                            <el-button type="success" icon="el-icon-edit" @click="logdata(scope.row)">编辑</el-button>
                        </router-link>
                        <el-popconfirm title="确定删除吗？" @confirm="deleteStore(scope.row)">
                            <el-button class="ml_5" slot="reference" type="danger" icon="el-icon-delete">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top: 10px;">
            <el-pagination background layout="prev, pager, next" :total=this.idToPage @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>


<script>
// 定义请求的基础 URL
const baseURL = "http://1.15.242.164:9090/store/";
export default {
    name: 'StoreList',
    data() {
        return {
            restaurants: [],
            item: [],
            multipleSelection: [],
            form: {
                storeId: null,
                storeName: null,
                page: null
            },
            id: "",
            idToPage: 0,
            uploadShow: true,
            token: ""
        }
    },
    created() {
        this.form.page = 1
        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        this.token = user.token
        this.selectStore()
        this.showALLStore()
        this.getDataCount()
    },
    methods: {
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            var storeIds = results.map(restaurant => ({ value: restaurant.storeId }));
            // 将转换后的结果传递给回调函数
            cb(storeIds);
        },
        createFilter(queryString) {
            return (restaurant) => {
                // 使用 storeId 进行筛选
                return restaurant.storeId.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },
        showALLStore() {
            this.request.get(baseURL).then(res => {
                this.restaurants = res.data;
                //console.log(this.item);
            }).catch(error => {
                // 异常处理代码
                console.error('请求出错:', error);
            });
        },
        selectStore() {
            if (this.form.storeId != null && this.form.storeId != "" || this.form.storeName != null && this.form.storeName != "") {
                this.form.page = 1
                this.idToPage = this.item.length;
            } else {
                this.getDataCount()
            }
            this.request.post(baseURL + "select", this.form)
                .then(res => {
                    this.item = res.data;
                    console.log(this.item.length, 1);
                })
                .catch(error => {
                    // 异常处理代码
                    console.error('请求出错:', error);
                });
        },
        deleteStore(row) {
            this.request.post(baseURL + "delete", row).then(res => {
                //console.log(res);
                if (res.data == 1) {
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '删除成功'
                    })
                }
                this.selectStore()
            }).catch(error => {
                // 异常处理代码
                console.error('请求出错:', error);
            });

        },
        deleteStores() {
            if (this.multipleSelection != null && this.multipleSelection.length > 0) {
                let ids = this.multipleSelection.map(v => v.storeId);
                this.request.post(baseURL + "deletes", ids).then(res => {
                    if (res.data > 0) {
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '删除成功'
                        })
                    }
                    this.selectStore()
                }).catch(error => {
                    // 异常处理代码
                    console.error('请求出错:', error);
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择要删除的店铺',
                    type: 'warning'
                })
            }
        },
        addStore() {
            this.request.get(baseURL + "selectIdMax").then(res => {
                this.id = res.data;
                console.log(this.id);
                this.$router.push({ name: 'AddStore', params: { id: this.id } });
            }).catch(error => {
                // 异常处理代码
                console.error('请求出错:', error);
            });
        },
        logdata(id) {
            console.log(id);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleExport() {
            if (this.multipleSelection != null && this.multipleSelection.length > 0) {
                let ids = this.multipleSelection.map(v => v.storeId);
                this.request.post(baseURL + "export", ids, { responseType: 'blob' }).then(response => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'test.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    // 清除创建的 URL 对象
                    window.URL.revokeObjectURL(url);
                }).catch(error => {
                    // 异常处理代码
                    console.error('请求出错:', error);
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择导出的店铺',
                    type: 'warning'
                })
            }
        },
        currentChange(page) {
            console.log('当前页数:', page);
            this.form.page = page
            this.selectStore()
        },
        getDataCount() {
            this.request.get(baseURL + "selectCount").then(res => {
                this.idToPage = res.data;
            }).catch(error => {
                // 异常处理代码
                console.error('请求出错:', error);
            });
        },
        //上传文件
        submitUpload() {
            console.log(this.token);
            this.$refs.upload.submit();
        },
        upfile(val) {
            console.log(val);
            if (val.code === '200') {
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: '上传成功,成功导入:' + val.data + '条'
                })
                this.selectStore()
            } else {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: val.msg
                })
            }
            this.$refs.upload.clearFiles();
        }
    }
}
</script>

