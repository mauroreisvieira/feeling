    <template>
        <aside class="rooms">
            <div class="rooms__list">
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item rooms__item--add-new tooltip tooltip--right" data-tooltip="New Channel" href="">+</a>
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
                },
                icon: {
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

