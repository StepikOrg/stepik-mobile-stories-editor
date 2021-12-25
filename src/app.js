(function () {
    function arrayMove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

    var app = new Vue({
        el: "#app",
        data: {
            parts: []
        },
        methods: {
            movePart: function (part, direction) {
                let index = this.parts.indexOf(part)
                if (index < 0) {
                    console.log(`Can't find part = ${part}`)
                    return
                }

                switch (direction) {
                    case "up":
                        arrayMove(this.parts, index, Math.max(0, index - 1))
                        break

                    case "down":
                        arrayMove(this.parts, index, Math.min(this.parts.length - 1, index + 1))
                        break

                    default:
                        console.log(`Unknown move part direction: ${direction}`)
                        break
                }
            },

            removePart: function (part) {

            },

            createConfig: function () {
                return JSON.stringify(this.parts, null, 4)
            },
            addPart: function () {
                this.parts.push({})
            }
        }
    })
})()