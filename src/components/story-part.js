Vue.component("story-part", {
    template: `
        <div class="story-part">
            <div class="story-controls">
                <div class="action-button secondary" v-on:click="$emit('move-part', part, 'up')">up</div>
                <div class="action-button secondary" v-on:click="$emit('move-part', part, 'down')">down</div>
            </div>
            <div class="form">
                <div class="field">
                    <div class="label">Длительность (в секундах)</div>
                    <input class="input" type="number" placeholder="15" v-model=\"part.duration\"/>
                </div>
              <p>{{ JSON.stringify(part) }}</p>
            </div>
            <div class="preview">
                
            </div>
        </div>
    `,
    props: ['part']
})