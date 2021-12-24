Vue.component("story-part", {
    template: `
        <div>
            <p>{{ JSON.stringify(part) }}</p>
            <input v-model=\"part.title\">
        </div>
    `,
    props: ['part']
})