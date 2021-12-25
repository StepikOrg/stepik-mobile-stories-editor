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
                    <input class="input" type="number" placeholder="15" v-model=\"part.duration\"/>
                </div>
                <div class="field">
                    <div class="label">Фоновая картинка</div>
                    <input type="hidden" role="uploadcare-uploader" data-images-only />
                </div>
<!--              <p>{{ JSON.stringify(part) }}</p>-->
            </div>
            <div class="preview">
                <div class="device android">
                  <div class="overlay top"></div>
                  <div class="overlay bottom"></div>
                  <div class="hint">Android</div>
                </div>
                <div class="device ios">iOS</div>
            </div>
        </div>
    `,
    props: ['part']
})