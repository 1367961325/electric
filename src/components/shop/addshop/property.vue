<template>
    <div>
        <el-form>
            <el-form-item v-for="(i,index) in Pro" :key='index' :label='i.attr_name'>
                <el-input v-model='i.attr_vals'></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {

    },
    computed:{
        Pro(){
            return this.$store.state.attrs_pro;
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">

</style>
