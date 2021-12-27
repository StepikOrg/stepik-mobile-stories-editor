Vue.component("device-ios", {
    template: `
        <div class="device ios"
           v-bind:style="{ 'background-image': 'url(' + part.image + ')' }"
        >
            <div class="overlay top"></div>
            <div class="overlay bottom"></div>
            <div class="hint">iOS</div>
        </div>
    `,
    props: ['part']
})