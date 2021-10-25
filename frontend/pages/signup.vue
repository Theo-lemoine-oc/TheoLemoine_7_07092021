<template>
    <div>
        <Registration />
    </div>
</template>

<script>
    import Registration from '~/components/userManage/Registration.vue';

    export default {
        head: {
            title: 'Groupomania | Inscription'
        },

        components: {
            Registration
        },
        methods: {
            signup() {
                this.$axios.$post("/auth/signup").then((res) => {
                    
                })
            }
        },
        created () {
            this.signup();
        }
    }
</script>
