jive.tile.onOpen((config, options) => {
    config.data = config.data || {};

    var app = new Vue({
        el: '#config',
        template: `<div>
            <label for="hashtag" style="width: 60px; display: inline-block;">Hashtag:</label>
            <input type="text" id="hashtag" v-model="hashtag">
            </br>
            </br>
            <label for="hashtag" style="width: 60px; display: inline-block;">Height:</label>
            <input type="text" id="height" v-model="height">
            </br>
            </br>
            <button v-on:click="save">save</button>
        </div>
        `,
        data: {
            hashtag: config.data.hashtag,
            height: config.data.height
        },
        methods: {
            save: function () {
                jive.tile.close({
                    data: {
                        hashtag: this.hashtag,
                        height: this.height
                    }
                });
            }
        }
    });

    gadgets.window.adjustHeight();
});
