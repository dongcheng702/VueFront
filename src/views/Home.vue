<template>
    <div class="hello">
        <h1>主页</h1>
    </div>
</template>

<script>
export default {
    name: 'Home',
    created() {
        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        if (!user.userId) {
            this.$router.push('/login')
        }
    }
}
</script>