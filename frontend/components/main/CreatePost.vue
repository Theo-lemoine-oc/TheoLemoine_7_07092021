<template>
    <section>
        <div class="bg-white shadow-md mt-8 p-4 rounded-lg">
            <button v-on:click="createMessage()" class="bg-gray-200 text-gray-500 rounded-full py-2 px-4 text-lg w-full flex justify-left">
                Quoi de neuf, {{ firstName }} ?
            </button>
        </div>
        <CreateMessage id="createMessage" class="hidden" :firstName="firstName" :lastName="lastName" />
    </section>
</template>

<script>
import CreateMessage from '~/components/modales/CreateMessage.vue';

export default {
    components: {
        CreateMessage
    },
    props: {
        firstName: String,
        lastName: String,
    },
    methods: {
        createMessage() {
            const createMessage = document.getElementById('createMessage');
            createMessage.classList.remove('hidden');
        }
    }
}
</script>