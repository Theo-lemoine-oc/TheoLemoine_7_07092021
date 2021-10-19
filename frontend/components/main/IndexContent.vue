<template>
    <div class="max-w-2xl w-full">
        <CreatePost />
        <Post />
    </div>
</template>

<script>
    import CreatePost from '~/components/main/CreatePost.vue';
    import Post from '~/components/main/Post.vue';

    export default {
        components: {
            CreatePost,
            Post
        }
    }
</script>