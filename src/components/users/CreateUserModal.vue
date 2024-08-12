<template>
    <v-dialog
        v-model="showDialog"
        width="500px"
        max-width="500px"
    >
        <v-card
            class="pa-2"
        >
            <v-card-title class="justify-center mb-0">
                {{ title }}
                {{ name }}
                {{ email }}
            </v-card-title>
            <v-card-text class="ma-0">
                <v-text-field
                    v-model="name"
                    name="name"
                    class="mt-9"
                    label="Nombre"
                    density="compact"
                    outlined
                />
                <v-text-field
                    v-model="email"
                    name="email"
                    class="mt-9"
                    label="Email"
                    density="compact"
                    outlined
                />
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
                    :disabled="!areValidSimpleValidation"
                    :loading="loading"
                >
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { _owned_API } from '@/plugins/axios'
  export default {
    name: 'CreateUserModal',
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
      return {
        dialog: false,
        loading: false,
        email: null,
        name: null,
        referItem: {}
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
        type: {
            type: String,
            required: true,
            default: 'create'  // 'create' or 'edit'
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
                    this.resetForm()
                    this.$emit('close')
                }
                this.dialog = val
            },
        },
        areValidSimpleValidation () {
            if (this.email && this.name) return true
            return false
        },
    },
  
    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        setReferItem(item) {
            this.referItem = item
            this.name = item.name
            this.email = item.email
        },
        submitForm() {},
        resetForm() {
            this.name = null
            this.email = null
        },
        accept() {
            this.loading = true;
            if (this.type === 'create') {
                this.create();
            } else if (this.type === 'edit') {
                this.update();
            }
        },
        create() {
            const payload = {
                email: this.email,
                name: this.name
            }

            _owned_API.post(`users`, payload)
                .then(response => {
                    console.log(response.data)
                    this.loading = false
                    this.showDialog = false
                    this.resetForm()
                    this.$emit('updateList')
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        update() {
            const payload = {
                email: this.email,
                name: this.name,
            };
            _owned_API.put(`users/${this.referItem.id}`, payload)
                .then(response => {
                    this.loading = false;
                    this.showDialog = false;
                    this.resetForm();
                    this.$emit('updateList');
                })
                .catch(e => {
                    console.error(e);
                    this.loading = false;
                });
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