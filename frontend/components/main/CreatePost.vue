<template>
    <section>
        <div class="bg-white shadow-md mt-8 p-4 rounded-lg">
            <button v-on:click="openCreateMessage = true" class="bg-gray-200 text-gray-500 rounded-full py-2 px-4 text-lg w-full flex justify-left items-center">
                Quoi de neuf, {{ firstName }} ? <span v-if='this.isAdmin == true' class="text-xs ml-2 italic">(Vous êtes administrateur)</span>
            </button>
        </div>
        <CreateMessage @close-createMessage="closeCreateMessage" v-if="openCreateMessage" :firstName="firstName" :lastName="lastName" />
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
        isAdmin: Boolean
    },
    data() {
        return {
            openCreateMessage: false
        };
    },
    methods: {

        closeCreateMessage() {
            this.openCreateMessage = false;
        }
    }
}
</script>