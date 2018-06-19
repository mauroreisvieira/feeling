    <template>
        <aside class="rooms">
            <h1>Rooms</h1>
            <div>
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

