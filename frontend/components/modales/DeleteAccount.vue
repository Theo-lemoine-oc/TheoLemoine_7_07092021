<template>
    <div class="w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 flex justify-center items-center z-10">
        <div class="create-message bg-white rounded-2xl shadow-lg p-4">
            <div class="w-full h-1/2">
                <div class="flex justify-between">
                    <h3 class="font-bold mb-4 text-lg">Supprimer mon compte</h3>
                    <IconCross @click.native="closeModale()" />
                </div>
                <form method="put">
                    <span v-if="this.isAdmin == true" class="text-sm text-red-800">Attention, vous êtes administrateur, cette action est définitive !</span>
                    <span v-else class="text-sm text-red-800">Attention, cette action est définitive !</span>
                    <div class="text-center mt-4 text-white flex justify-around">
                        <button type="button" @click="deleteAccount" class="text-red-500 hover:underline cursor-pointer max-w-max">Supprimer mon compte</button>
                        <button @click.native="closeModale()" class="submit uppercase font-bold tracking-wider h-full py-2 px-8 rounded-full">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import IconCross from '~/components/utils/icons/IconCross.vue';

export default {
    components: {
        IconCross
    },
    props: {
        userId: Number,
        firstName: String,
        lastName: String,
        isAdmin: Boolean
    },
    data() {
        return {
            feedBackAPI: "",
            newPassword: "",
            repeatNewPassword: ""
        };
    },
    methods: {
        deleteAccount() {
            const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            connection.$delete(`/auth/${this.userId}`).then((res) => {
            localStorage.clear();
            location.replace(location.origin + "/signup");
            })
            .catch(error => {
                console.log(error)
            })  
        },
        closeModale() {
            this.$emit('close-deleteAccount');
        }
    }
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

    .fit-content {
        width: fit-content;
    }
</style>