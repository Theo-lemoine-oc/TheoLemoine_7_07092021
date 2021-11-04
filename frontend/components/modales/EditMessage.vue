<template>
    <div class="bg-white ">
        <div class="edit-message flex flex-col rounded-2xl shadow-lg py-4">
            <button v-on:click="report" id="report" class="text-left text-red-500 mb-3 px-4 hover:bg-gray-100 duration-200 ease-in flex items-center">
                <IconFlag /> Signaler le message
            </button>
            <button class="text-left mb-3 px-4 hover:bg-gray-100 duration-200 ease-in flex items-center">
                <IconEdit /> Modifier le message
            </button>
            <button class="text-left px-4 hover:bg-gray-100 duration-200 ease-in flex items-center">
                <IconTrash /> Supprimer le message
            </button>
        </div>
    </div>
</template>

<script>
import IconFlag from '~/components/utils/icons/IconFlag.vue';
import IconEdit from '~/components/utils/icons/IconEdit.vue';
import IconTrash from '~/components/utils/icons/IconTrash.vue';
 
export default {
    components: {
        IconFlag,
        IconEdit,
        IconTrash
    },
    methods: {
        //report message alert
        report() {
            alert("Vous avez bien signalé ce message, merci !");
        }
    }
}
</script>

<style scoped>
    .edit-message {
        width: 108%
    }
</style>