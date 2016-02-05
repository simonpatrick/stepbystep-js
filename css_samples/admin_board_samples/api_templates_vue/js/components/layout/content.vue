<template>
    <div class="content-wrapper">
        <section class="content-header">
            <h1>{{title}}</h1>
        </section>
        <section class="content">
            <router-view class="view" keep-alive transition transition-mode="out-in">

            </router-view>
        </section>
    </div>
</template>

<script>
    module.exports={
        name:'Content',
        props:{
            title:String
        }
    }
</script>