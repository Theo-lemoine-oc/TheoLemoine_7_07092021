<template>
    <div class="max-w-2xl w-full">
        <CreatePost v-bind:key="user.id" :firstName="user.firstName" :lastName="user.lastName" />
        <Post v-for="message in messages" :key="message.id" :content="message.content" :attachment="message.attachment" :createdAt="message.createdAt" :firstName="getInfos('firstName', message)" :lastName="getInfos('lastName', message)"/>
    </div>
</template>

<script>
    import CreatePost from '~/components/main/CreatePost.vue';
    import Post from '~/components/main/Post.vue';

    export default {
        components: {
            CreatePost,
            Post
        },
        data() {
            return {
                message: {
                    id: "",
                    content: "",
                    attachment: "",
                },
                messages: [],
                user: {
                    id: "",
                    firstName: "",
                    lastName: ""
                }
            };
        },
        methods: {
            setInfos(payload) {
                this.post = payload.post
            },
            getInfos(type, message) {
                const user = message.User
                if(type == 'firstName') return user.firstName
                if(type == 'lastName') return user.lastName;
                else return 'unknow'
            }
        },
        mounted() {
            const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            connection.$get("/message").then((res) => {
            this.messages = res
            })
            .catch(error => {
                console.log(error)
            }),
            connection.$get("/auth/me").then((res) => {
            this.user = res
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
</script>