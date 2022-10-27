<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        :validate-messages="validateMessages" @finish="onFinish" @finishFailed="onFinishFailed"
        @submit.prevent="register">
        <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
            <a-input v-model:value="register_form.email" />
        </a-form-item>>

        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!', type: 'password' }]">
            <a-input-password v-model:value="register_form.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="secondary" html-type="register">Register</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>

import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const register_form = ref({});

const register = () => {
    store.dispatch('register', register_form.value);
}
const validateMessages = {

    types: {
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