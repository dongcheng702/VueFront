<template>
    <el-menu :default-openeds="['1']" style="min-height: 100%" background-color="rgb(48, 65, 86)" text-color="#fff"
        :collapse-transition="false" :collapse="isCollapse"
        router
        >
        <div style="height: 60px;line-height: 60px;text-align: center;font-size: 18px;">
            <img src="../assets/logo.png" alt="" style="width: 25px;position: relative;top: 8px;margin-right: 5px;">
            <b style="color: #fff" v-show="logoTextShow">社内管理系统</b>
        </div>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>
                <span slot="title">数据管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/storelist">販売店</el-menu-item>
                <el-menu-item index="/employee">社员</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'Aside',
    props: {
        isCollapse: Boolean,
        logoTextShow: Boolean
    }
}
</script>