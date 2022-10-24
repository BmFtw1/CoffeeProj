<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        :validate-messages = "validateMessages" @finish="onFinish" @finishFailed="onFinishFailed" @submit.prevent="login">
        <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
            <a-input v-model:value="login_form.email" />
        </a-form-item>>

        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!', type: 'password'}]">
            <a-input-password v-model:value="login_form.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="secondary" html-type="register" @click="$router.push('/register')">Register</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>

import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

const login_form = ref({});
const store = useStore();

const login = () => {
    store.dispatch('login', login_form.value);
}

const validateMessages = {

    types:{
        email: '${label} is not a valid email!',
    }
}
const formState = reactive({

    remember: true,
});

const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>