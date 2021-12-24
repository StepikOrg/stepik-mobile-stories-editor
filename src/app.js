var app = new Vue({
    el: "#app",
    data: {
        parts: []
    },
    methods: {
        createConfig: function () {
            return JSON.stringify(this.parts)
        },
        addPart: function () {
            this.parts.push({})
        }
    }
})