<template>
    <v-dialog
        v-model="showDialog"
        width="auto"
        max-width="500px"
    >
        <v-card
            class="pa-2"
        >
            <v-card-text>
                <h1 class="mb-7">{{ title }}</h1>
                <h3 class="mb-3"> {{ text }} <b> {{ referItem.nombre }} </b> ?</h3>
            </v-card-text>
            <v-card-actions class="confirmation-title">
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    variant="tonal"
                    text
                    @click="showDialog = false"
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="primary"
                    text
                    variant="tonal"
                    @click="accept"
                    :loading="loading"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'DeleteUserModal',
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
      return {
        dialog: false,
        referItem: {},
        loading: false,
      }
    },

    // props are custom attributes that you can register on any component
    props: {
        show: {
            required: true,
            type: Boolean,
        },
        title: {
            required: true,
            type: String,
        },
        text: {
            required: true,
            type: String,
        },
    },

    //
    computed: {
        showDialog: {
            get() {
                return this.show || this.dialog
            },
            set(val) {
                if (val === false) {
                    this.$emit('close')
                }
                this.dialog = val
            },
        },
    },
  
    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        setReferItem(item) {
            this.referItem = item
        },
        accept() {
            this.loading = true
            this.$emit('userSelection', true, this.referItem)
        },
        closeModalFromParent() {
            this.$emit('close')
            this.loading = false
        },
    },
  
  
    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      console.log(import.meta.env.VITE_OWN_API_URL)
      console.log(import.meta.env)
    }
  }
  </script>