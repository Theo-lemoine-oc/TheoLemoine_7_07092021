<template>
    <div>
        <h3 class="px-4 mb-2 font-bold">{{ title }}</h3>
        <p class="px-4 pb-2">{{ content }}</p>
        <div v-if="attachment">
            <img :src="require(`${attachment}`)" alt="Contenu de la publication">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        content: String,
        attachment: String
    }
}
</script>