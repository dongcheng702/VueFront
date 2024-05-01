<template>
    <div style="text-align: left;font-size: 12px;line-height: 60px; display: flex">
        <div style="flex: 1;font-size: 18px;">
            <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
            <el-breadcrumb class="ml_10" separator="/" style="display: inline-block;">
                <el-breadcrumb-item v-if="$route.path !== '/home'" :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/"></a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown style="width: 50px;cursor:pointer">
            <span style="font-size: 18px;">蔡</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-on:click.native="selectStore">查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>


<script>
export default {
    name: 'Header',
    props: {
        collapseBtnClass: String,
        collapse: Function,
        selectStore: Function
    },
}
</script>