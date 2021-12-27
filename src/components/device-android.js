Vue.component("device-android", {
    template: `
        <div class="device android"
             v-bind:style="{ 'background-image': 'url(' + part.image + ')' }"
        >
            <div class="overlay top"></div>
            <div class="overlay bottom"></div>
            <div class="hint">Android</div>
    
            <div class="storyTitle" v-if="part.text" v-bind:style="{ color: '#' + part.text.text_color }">
                {{ part.text.title }}
            </div>
    
            <div class="storyBottom" v-if="part.text">
                <div class="storyText"
                     v-if="part.text.text"
                     v-bind:style="{ color: '#' + part.text.text_color }">{{ part.text.text }}</div>
                <div class="storyButtonContainer">
                    <a class="storyButton"
                        v-if="part.button"
                        v-bind:href="part.button.url"
                        target="_blank"
                        v-bind:style="{ color: '#' + part.button.text_color, 'background-color': '#' + part.button.background_color }"
                    >
                        {{ part.button.title }}
                    </a>
                </div>
            </div>
        </div>
    `,
    props: ['part']
})