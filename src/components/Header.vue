<template>
    <div style="text-align: left;font-size: 12px;line-height: 60px; display: flex">
        <div style="flex: 1;font-size: 18px;">
            <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
            <el-breadcrumb class="ml_10" separator="/" style="display: inline-block;">
                <el-breadcrumb-item v-if="$route.path !== '/home'" :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/"></a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown style="width: 50px;cursor:pointer">
            <span style="font-size: 18px;">{{ user.name }}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item v-on:click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>


<script>
export default {
    name: 'Header',
    data() {
        return {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
        }
    },
    props: {
        collapseBtnClass: String,
        collapse: Function,
        selectStore: Function,
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('login')
            this.$message({
                showClose: true,
                type: 'success',
                message: '退出成功'
            })
        }
    }
}
</script>