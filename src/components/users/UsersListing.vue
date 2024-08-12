<template>
  <v-container>
    <div
      v-show="!showReports"
    >
      <v-card
        title="Administrar Usuarios"
        :subtitle="cardFilterSubtitle"
        variant="tonal"
        height="100%"
      >
        <template v-slot:text>
          <v-btn
            variant="tonal"
            class="ml-2"
            density="compact"
            color="primary"
            @click="createUser"
          >
            CREAR USUARIO
          </v-btn>
        </template>
        <!-- <v-card-actions class="pt-0"></v-card-actions> -->
      </v-card>
      <v-card
        class="mt-2"
      >
        <v-table
          v-if="!loadingUsers"
        >
          <thead>
            <tr>
              <th class="text-left">
                id
              </th>
              <th class="text-left">
                nombre
              </th>
              <th class="text-center">
                email
              </th>
              <th class="text-center">
                creado
              </th>
              <th class="text-center">
                actualizado
              </th>
              <th class="text-center">
                acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.createdAt }}</td>
              <td>{{ user.updatedAt }}</td>
              <td>
                <v-btn
                  density="compact"
                  class="pl-0 pr-0"
                  color="red"
                  variant="tonal"
                  @click="deleteUser(user)"
                >
                  X
                </v-btn>
                <v-btn
                  density="compact"
                  class="pl-0 pr-0"
                  color="blue"
                  variant="tonal"
                  @click="editUser(user)"
                >
                  ✎
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
      <DeleteUserModal
        :show="showDeleteModal"
        @close="showDeleteModal = false"
        title="Eliminando usuario"
        text="Desea eliminar el usuario"
        @userSelection = "handleDeleteModalDecision"
        ref="deleteConfirmationModal"
      />
      <CreateUserModal
        :show="showCreateModal"
        @close="showCreateModal = false"
        title="Creando usuario"
        type="create"
        @updateList="fetchUsers"
      />
      <CreateUserModal
        :show="showEditModal"
        @close="showEditModal = false"
        title="Editando usuario"
        type="edit"
        @updateList="fetchUsers"
        ref="editModal"
      />
    </div>
  </v-container>
</template>

<script>
import { _owned_API } from '@/plugins/axios'
import DeleteUserModal from './DeleteUserModal.vue'
import CreateUserModal from './CreateUserModal.vue'

export default {
  name: 'UsersListing',
  components: {
    DeleteUserModal,
    CreateUserModal,
  },


  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      showDeleteModal: false,
      showCreateModal: false,
      showEditModal: false,
      loadingUsers: true,
      users: []
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    testSelectChange() {
      console.log('testing change select')
    },
    editUser(item) {
      this.showEditModal = true
      this.$refs.editModal.setReferItem(item)
    },
    createUser() {
      this.showCreateModal = true
    },
    deleteUser(item) {
      this.showDeleteModal = true
      this.$refs.deleteConfirmationModal.setReferItem(item)
    },
    handleDeleteModalDecision(decision, item) {
      _owned_API.delete(`users/${item.id}`)
        .then(response => {
          console.log(response)
          this.$refs.deleteConfirmationModal.closeModalFromParent();
          this.fetchUsers()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    fetchUsers() {
      _owned_API.get(`users`)
        .then(response => {
          this.users = response.data.data
          this.loadingUsers = false
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  // computed properties
  computed: {
    cardFilterSubtitle() {
      return 'Mostrando todos los usuarios'
    }
  },

  // watched properties
  watch: {},


  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  async mounted() {
    console.log(`The initial count is ${this.count}.`)
    await this.fetchUsers()
  }
}
</script>