<template>
    <div class="max-w-2xl w-full">
        <CreatePost />
        <Post v-for="message in messages" v-bind:key="message.id" :content="message.content" :attachment="message.attachment" />
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
                messages: ""
            }
        },
        methods: {
            getMessages() {
                this.$axios.$get("/message").then((res) => {
                    this.messages = res;
                })
            }
        },
        created () {
            this.getMessages();
        }
    }
</script>