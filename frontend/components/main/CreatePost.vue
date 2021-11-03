<template>
    <section>
        <div class="bg-white shadow-md mt-8 p-4 rounded-lg">
            <button class="bg-gray-200 text-gray-500 rounded-full py-2 px-4 text-lg w-full flex justify-left">
                Quoi de neuf, Théo ?
            </button>
        </div>
        <CreateMessage class="hidden" />
    </section>
</template>

<script>
import CreateMessage from '~/components/modales/CreateMessage.vue';

export default {
    components: {
        CreateMessage
    }
}
</script>