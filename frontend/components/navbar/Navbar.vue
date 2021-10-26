<template>
    <header>
            <!-- navbar content --> 
            <nav class="bg-transparent shadow-md px-8">
                <div class="mx-auto py-4">
                    <div class="flex justify-between items-center">

                        <!-- search bar -->
                        <div class="w-1/5">
                            <SearchBar />
                        </div>

                        <!-- logo -->
                        <div class="w-1/5 flex justify-center">
                            <Logo />
                        </div>

                        <!-- nav -->
                        <div class="w-1/5">
                            <NavContent />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
</template>

<script>
    import SearchBar from '~/components/navbar/SearchBar.vue';
    import Logo from '~/components/navbar/Logo.vue';
    import NavContent from '~/components/navbar/NavContent.vue';

    export default {
        components: {
            SearchBar,
            Logo,
            NavContent
        }
    }
</script>

<style scoped>
    nav {
        background: linear-gradient(209deg, rgba(234,23,23,1) 10%, rgba(116,0,0,1) 100%);
    } 
</style>