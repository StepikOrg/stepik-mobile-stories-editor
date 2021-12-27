(function () {
    function arrayMove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

    function invalidatePositions(parts) {
        for (var i = 0; i < parts.length; i++) {
            parts[i]['position'] = i + 1
        }
    }

    var app = new Vue({
        el: "#app",
        data: {
            parts: [],
            storyPreview: undefined,
            storyPreviewIndex: undefined
        },
        methods: {
            createConfig: function () {
                return JSON.stringify(this.parts, null, 4)
            },
            copyConfig: function () {
                let config = JSON.stringify(this.parts)
                navigator.clipboard.writeText(config)
            },
            importConfig: function () {
                let configJson = prompt("Введите конфигурацию истории (поле PARTS в админке)", "")
                if (configJson.length > 0) {
                    try {
                        this.parts = JSON.parse(configJson)
                    } catch (e) {
                        console.log("Неверная конфигурация")
                    }
                }
            },

            addPart: function () {
                this.parts.push({
                    duration: 15,
                    image: undefined,
                    type: undefined,
                    text: undefined,
                    button: undefined,
                    feedback: undefined
                })
                invalidatePositions(this.parts)
            },
            removePart: function (part) {
                if (!confirm("Вы уверены, что хотите удалить часть " + part.position)) {
                    return;
                }
                let index = this.parts.indexOf(part)
                if (index < 0) {
                    console.log(`Can't find part = ${part}`)
                    return
                }
                this.parts.splice(index, 1)
                invalidatePositions(this.parts)
            },
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
                invalidatePositions(this.parts)
            },


            startStoryPreview: function () {
                this.storyPreview = {
                    index: 0
                }
            },
            stopStoryPreview: function () {
                this.storyPreview = undefined
            },
            nextStoryPreview: function () {
                this.storyPreview.index = (this.storyPreview.index + 1) % this.parts.length
            },
            prevStoryPreview: function () {
                this.storyPreview.index = (this.storyPreview.index - 1 + this.parts.length) % this.parts.length
            }
        }
    })
})()