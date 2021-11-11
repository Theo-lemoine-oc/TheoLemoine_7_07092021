<template>
    <div class="w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 flex justify-center items-center z-10">
        <div class="create-message bg-white rounded-2xl shadow-lg p-4">
            <div class="w-full h-1/2">
                <div class="flex justify-between">
                    <h3 class="font-bold mb-4 text-lg">Modifier votre mot de passe</h3>
                    <IconCross />
                </div>
                <input type="password" v-model="password" placeholder="Mot de passe actuel" class="text-sm bg-gray-200 rounded-3xl w-full h-full px-6 py-2 outline-none mb-4">
                <input type="password" v-model="password" placeholder="Nouveau mot de passe" class="text-sm bg-gray-200 rounded-3xl w-full h-full px-6 py-2 outline-none mb-4">
                <input type="password" v-model="password" placeholder="Confirmer votre nouveau mot de passe" class="text-sm bg-gray-200 rounded-3xl w-full h-full px-6 py-2 outline-none">
                <div class="text-center mt-4 text-white">
                    <button @click.prevent="changePassword" type="submit" class="submit uppercase font-bold tracking-wider h-full py-2 px-8 rounded-full">Changer le mot de passe</button>
                    <span id="feedBackMsg">{{ feedBackAPI }}</span>
                </div>
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
        password: String
    },
    data() {
        return {
            feedBackAPI: "",
            changePwd: {
                newPassword: "",
                repeatNewPassword: ""
            }
        };
    },
    methods: {
        changePassword() {
            if (this.changePwd.newPassword == this.changePwd.RepeatNewPassword && this.changePwd.newPassword != "" && this.changePwd.RepeatNewPassword != "") {
                axios.put("/:id/changepassword",{newPassword: this.changePwd.newPassword}, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
                .then(response => {
                    this.feedBackAPI = response.data.confirmation;
                    setTimeout(() => {
                    this.feedBackAPI = "";
                    window.location.reload();
                    }, 2000);
                })
                .catch(err => {
                    this.feedBackAPI = "Vérifiez les informations que vous avez saisies";
                });
            } else {
                this.feedBackAPI = "Les mots de passes ne correspondent pas !";
            }
        },
        newPass() {
            const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            let newPwd = document.getElementById('newPassword');

            newPwd.addEventListener('input', function(e) {
            let value = e.target.value;
            let testValue = PASSWORD_REGEX.test(value);
            if(testValue) {
                newPwd.style.backgroundColor = "#4CAF50";
            } else {
                newPwd.style.backgroundColor = "#f44336";
            }
        });
    },
        repeatNewPass() {
            const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            let repeatNewPwd = document.getElementById('repeatNewPassword');

            repeatNewPwd.addEventListener('input', function() {
                if(repeatNewPwd.value == newPwd.value && PASSWORD_REGEX.test(repeatNewPwd.value)) {
                    repeatNewPwd.style.text = "#4CAF50";
                } else {
                    repeatNewPwd.style.backgroundColor = "#f44336";
                }
            });
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