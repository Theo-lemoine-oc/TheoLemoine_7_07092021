<template>
    <div class="w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 flex justify-center items-center z-10">
        <div class="create-message bg-white rounded-2xl shadow-lg p-4">
            <div class="w-full h-1/2">
                <h3 class="font-bold mb-4 text-lg">Quoi de neuf, Théo ?</h3>
                <textarea placeholder="Écrivez votre message" class="text-sm bg-gray-200 rounded-3xl w-full h-full px-6 py-2 outline-none resize-none"></textarea>
                <button class="w-full text-center text-red-500">
                    Ajouter une image
                </button>
                <div class="text-center mt-4 text-white">
                    <button type="submit" class="submit uppercase font-bold tracking-wider h-full py-2 px-8 rounded-full">Envoyer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconCross from '~/components/utils/icons/IconCross.vue';
import IconImage from '~/components/utils/icons/IconImage.vue';

export default {
    IconCross,
    IconImage
}
</script>

<style scoped>
    .create-message {
        max-width: 512px;
        width: 100%;
        height: auto;
    }

    .submit {
        background: linear-gradient(209deg, rgba(234,23,23,1) 10%, rgba(116,0,0,1) 100%);
        transition: all .3s ease-in-out;
    }
    .submit:hover {
        filter: brightness(90%);
    }
</style>