<template>
    <div>
        <p class="px-4 pb-2">{{ content }}</p>
        <div v-if="attachment">
            <img :src="require(`${attachment}`)" alt="Contenu de la publication">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: String,
        attachment: String
    }
}
</script>