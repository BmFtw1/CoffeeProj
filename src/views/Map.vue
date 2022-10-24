<template>
    <div class="input">

        <input placeholder="input search text" />
        <Button type="primary" @click="getGeolocation">
            <EnvironmentOutlined />
        </Button>
    </div>

    <div>
        <GoogleMap api-key="AIzaSyCky3h2oQProq4sTDUe5BIZgJg_MuvA2i0" ref="mapRef" style="width: 100%; height: 500px"
            :zoom="15">
            
            <CustomMarker :options="{ position: coord }" >
                
                <InfoWindow :options="{ position: coord, } " :opened="true">
                    
                    <img :src="imageURL" width="100" height="100" style="margin-top: 8px" />
                </InfoWindow>
                
            </CustomMarker>
        </GoogleMap>
    </div>
    <div>
        <input type="file" @change="uploadImage" class = "window"/>
    </div>
<!-- 
    <div class="clearfix">
        <a-upload v-model:file-list="fileList" list-type="picture-card" @preview="handlePreview">
            <div v-if="fileList.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
            </div>
        </a-upload>
        <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <Button type="primary" @change="uploadImage">
            <ArrowUpOutlined></ArrowUpOutlined>
        </Button>
    </div> -->
</template>

<script setup>

import { EnvironmentOutlined,  } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { GoogleMap, CustomMarker, InfoWindow } from "vue3-google-map";
import { storage } from '../Firebase/firebaseinit'
import { ref as storageReference, uploadBytes, getDownloadURL } from "firebase/storage";

const imageURL = ref(null)
const mapRef = ref(null);
const coord = ref(null);


function getGeolocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const setSessionCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                coord.value = setSessionCoords;
                if (mapRef.value?.ready) mapRef.value.map.panTo(coord.value);
            },
            error => {
                console.log(error.message);
            });

    } else {
        console.log("Not working");
    }
}

function uploadImage(e) {
    let file = e.target.files[0]
    var storageRef = storageReference(storage, file.name);

    
    uploadBytes(storageRef, file).then(() => {
        alert("image uploaded");
        getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
            imageURL.value = downloadURL
            
        })
    })
    
}


// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);

//         reader.onload = () => resolve(reader.result);

//         reader.onerror = error => reject(error);
//     });
// }


// const previewVisible = ref(false);
// const previewImage = ref('');
// const previewTitle = ref('');
// const fileList = ref([
//     {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     }, {
//         uid: '-2',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     }
// ]);

// const handleCancel = () => {
//     previewVisible.value = false;
//     previewTitle.value = '';
// };

// const handlePreview = async file => {
//     if (!file.url && !file.preview) {
//         file.preview = await getBase64(file.originFileObj);
//     }

//     previewImage.value = file.url || file.preview;
//     previewVisible.value = true;
//     previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);

// }



</script>
<style scoped>
.input {
    padding: 24px;
}
</style>