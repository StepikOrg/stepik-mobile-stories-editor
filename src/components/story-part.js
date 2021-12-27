Vue.component("story-part", {
    template: `
        <div class="story-part">
            
            <div class="story-controls">
                <div class="action-button secondary" v-on:click="$emit('move-part', part, 'up')">⬆</div>
                <div class="action-button secondary" v-on:click="$emit('move-part', part, 'down')">⬇</div>
                <div class="action-button secondary" v-on:click="$emit('remove-part', part)">Удалить</div>
            </div>
            <div class="form">
                <div class="title">
                    <h3>Часть {{ part.position }}</h3>
                </div>
                <div class="field">
                    <div class="label">Длительность (в секундах) *</div>
                    <input class="input" type="number" placeholder="15" required v-model="part.duration"/>
                </div>
                <div class="field">
                    <div class="label">Фоновая картинка *</div>
                    <input 
                        class="input" 
                        type="text" 
                        placeholder="Картинка не выбрана"
                        required
                        v-model="part.image"/>
                    <div class="action-button inline mt8" v-on:click="chooseImage">Загрузить картинку</div>
                    <div class="status" v-if="imageUploadStatus">{{ imageUploadStatus }}</div>
                </div>
                <div class="field">
                    <div class="label">Тип *</div>
                    <select v-model="part.type" v-on:change="updateType">
                        <option disabled value="">Выберите один из вариантов</option>
                        <option value="text">Текст (+ кнопка опционально)</option>
                        <option disabled value="feedback">Форма с обратной связью (пока не поддерживается)</option>
                    </select>
                </div>
                <div v-if="part.text">
                    <div class="field">
                        <div class="label">Заголовок</div>
                        <input class="input" type="text" placeholder="Запускайте код" v-model="part.text.title"/>
                    </div>
                    <div class="field">
                        <div class="label">Текст</div>
                        <textarea class="input" placeholder="Теперь можно запустить и проверить свой код перед отправкой решения" v-model="part.text.text"/>
                    </div>
                    <div class="field">
                        <div class="label">Цвет текста (в hex формате без #)</div>
                        <input class="input" type="text" placeholder="FFFFFF" v-model="part.text.text_color"/>
                    </div>
                    <div class="field">
                        <div class="label">Кнопка?</div>
                        <input class="input" type="checkbox" v-model="withButton" v-on:change="updateButtonState"/>
                    </div>
                </div>
                <div v-if="part.button">
                    <div class="field">
                        <div class="label">Текст на кнопке</div>
                        <input class="input" type="text" placeholder="Запускайте код" v-model="part.button.title"/>
                    </div>
                    <div class="field">
                        <div class="label">Ссылка кнопки</div>
                        <input class="input" type="text" placeholder="https://stepik.org/course/6315" v-model="part.button.url"/>
                    </div>
                    <div class="field">
                        <div class="label">Цвет фона кнопки (в hex формате без #)</div>
                        <input class="input" type="text" placeholder="6C7BDF" v-model="part.button.background_color"/>
                    </div>
                    <div class="field">
                        <div class="label">Цвет текста кнопки (в hex формате без #)</div>
                        <input class="input" type="text" placeholder="FFFFFF" v-model="part.button.text_color"/>
                    </div>
                </div>
<!--              <p>{{ JSON.stringify(part) }}</p>-->
            </div>
            <div class="preview">
                <device-android v-bind:part="part"></device-android>
                <device-ios v-bind:part="part"></device-ios>
            </div>
        </div>
    `,
    data: function () {
        return {
            imageUploadStatus: undefined,
            withButton: this.part.button !== undefined
        }
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
        },
        updateType: function () {
            switch (this.part.type) {
                case 'text':
                    this.part.text = { text_color: 'FFFFFF' }
                    this.part.button = undefined
                    this.part.feedback = undefined
                    break;
                case 'feedback':
                    this.part.text = { text_color: 'FFFFFF' }
                    this.part.button = {}
                    this.part.feedback = {}
                    break;
                default:
                    this.part.text = undefined
                    this.part.button = undefined
                    this.part.feedback = undefined
                    break;
            }
        },
        updateButtonState: function () {
            if (this.part.type === 'text') {
                if (this.withButton) {
                    this.part.button = {
                        text_color: 'FFFFFF',
                        background_color: '6C7BDF'
                    }
                } else {
                    this.part.button = undefined
                }
            }
        }
    }
})