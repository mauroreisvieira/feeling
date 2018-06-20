    <template>
        <aside class="rooms">
            <div class="rooms__header">
                <h2 class="rooms__heading">Rooms</h2>
            </div>
            <div class="rooms__list">
                <a href="">#{{name}} </a>
            </div>
        </aside>
    </template>

    <script>
        export default {
            name: 'rooms',
            props: {
                name: {
                    type: String,
                    required: true
                }
            },
            data() {
                return {}
            },
            methods: {},
            mounted() {}
        }
    </script>

