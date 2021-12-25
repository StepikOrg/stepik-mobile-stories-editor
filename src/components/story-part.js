Vue.component("story-part", {
    template: `
        <div class="story-part">
            
            <div class="story-controls">
                <div class="action-button secondary" v-on:click="$emit('move-part', part, 'up')">up</div>
                <div class="action-button secondary" v-on:click="$emit('move-part', part, 'down')">down</div>
                <div class="action-button secondary" v-on:click="$emit('remove-part', part)">Удалить</div>
            </div>
            <div class="form">
                <div class="title">
                    <h3>Часть {{ part.position }}</h3>
                </div>
                <div class="field">
                    <div class="label">Длительность (в секундах)</div>
                    <input class="input" type="number" placeholder="15" v-model="part.duration"/>
                </div>
                <div class="field">
                    <div class="label">Фоновая картинка</div>
                    <input 
                        class="input" 
                        type="text" 
                        placeholder="Картинка не выбрана"
                        v-model="part.image"/>
                    <div class="action-button inline mt8" v-on:click="chooseImage">Загрузить картинку</div>
                    <div class="status" v-if="imageUploadStatus">{{ imageUploadStatus }}</div>
                </div>
<!--              <p>{{ JSON.stringify(part) }}</p>-->
            </div>
            <div class="preview">
                <div class="device android" 
                     v-bind:style="{ 'background-image': 'url(' + part.image + ')' }"
                >
                    <div class="overlay top"></div>
                    <div class="overlay bottom"></div>
                    <div class="hint">Android</div>
                </div>
                <div class="device ios" 
                     v-bind:style="{ 'background-image': 'url(' + part.image + ')' }"
                >
                    <div class="overlay top"></div>
                    <div class="overlay bottom"></div>
                    <div class="hint">iOS</div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {imageUploadStatus: undefined}
    },
    props: ['part'],
    methods: {
        chooseImage: function () {
            this.imageUploadStatus = undefined

            this.imageUploader = uploadcare.openDialog([])
            this.imageUploader.done((filePromise) => {
                this.imageUploadStatus = 'Загрузка файла...'
                filePromise.done((file) => {
                    this.part.image = file.cdnUrl
                    this.imageUploadStatus = undefined
                    this.$forceUpdate()
                })
                filePromise.fail((err) => {
                    this.imageUploadStatus = err
                    this.$forceUpdate()
                })
            })
            this.imageUploader.fail((err) => {
                this.imageUploadStatus = err
                this.$forceUpdate()
            })
        }
    }
})