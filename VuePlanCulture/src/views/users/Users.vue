<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-brand">
        <button class="menu-toggle" @click="toggleSidebar">☰</button>
        <img src="@/assets/forem.png" alt="Forem" class="navbar-logo" />
        <span>Gestion Maraîchage</span>
      </div>
      <div class="navbar-user">
        <div class="user-info">
          <div class="user-avatar">{{ userInitials }}</div>
          <span>{{ userEmail }}</span>
        </div>
        <button class="btn-logout" @click="logout">Déconnexion</button>
      </div>
    </nav>

    <!-- Layout -->
    <div class="sidebar-overlay" :class="{ show: sidebarOpen }" @click="toggleSidebar"></div>
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ show: sidebarOpen }">
        <div class="menu-item active" @click="sidebarOpen = false">
          <span class="menu-icon">👥</span>
          <span>Utilisateurs</span>
        </div>
        <div class="menu-item" @click="sidebarOpen = false">
          <span class="menu-icon">🌱</span>
          <span>Cultures</span>
        </div>
        <div class="menu-section">Gestion</div>
        <div class="menu-item" @click="sidebarOpen = false">
          <span class="menu-icon">💰</span>
          <span>Finances</span>
        </div>
        <div class="menu-item" @click="sidebarOpen = false">
          <span class="menu-icon">📈</span>
          <span>Rapports</span>
        </div>

        <div class="menu-section">Paramètres</div>
        <div class="menu-item" @click="sidebarOpen = false">
          <span class="menu-icon">⚙️</span>
          <span>Configuration</span>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <div class="page-header">
          <h1 class="page-title">Gestion des Utilisateurs</h1>
          <button class="btn-add" @click="openModal('add')">
            <span>➕</span>
            <span>Nouvel utilisateur</span>
          </button>
        </div>

        <div class="users-card">
          <div class="search-bar">
            <input
              type="text"
              class="search-input"
              placeholder="🔍 Rechercher un utilisateur..."
              v-model="searchQuery"
            />
          </div>

          <table class="users-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id_utilisateur">
                <td data-label="Nom">
                  <div class="user-name">
                    <div class="user-avatar-small">
                      {{ getInitials(user.nom + " " + user.prenom) }}
                    </div>
                    <span>{{ user.nom.charAt(0).toUpperCase() + user.nom.slice(1) }}</span>
                  </div>
                </td>
                <td data-label="Prenom">
                  <div class="user-name">
                    <span>{{ user.prenom.charAt(0).toUpperCase() + user.prenom.slice(1) }}</span>
                  </div>
                </td>
                <td data-label="Email">{{ user.email }}</td>
                <td data-label="Rôle">
                  <span
                    class="badge"
                    :class="
                      user.id_role == 1
                        ? 'admin'
                        : user.id_role == 2
                        ? 'formateur'
                        : user.id_role == 3
                        ? 'stagiaire'
                        : user.id_role == 4
                        ? 'roi'
                        : ''
                    "
                  >
                    {{ getRoleLabel(user.id_role) }}
                  </span>
                </td>
                <td data-label="Téléphone">{{ user.telephone }}</td>
                <td data-label="Actions">
                  <div class="action-buttons">
                    <button
                      class="btn-icon btn-edit"
                      @click="openModal('edit', user)"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      class="btn-icon btn-delete"
                      @click="openDeleteModal(user)"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <img src="@/assets/forem.png" alt="Forem" class="footer-logo" />
      <p>© 2024 Forem - Gestion Maraîchage. Tous droits réservés.</p>
    </footer>

    <!-- Modal Ajout/Édition -->
    <div class="modal" :class="{ show: showModal }">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            {{ modalMode === "add" ? "Nouvel utilisateur" : "Modifier utilisateur" }}
          </h2>
          <button class="btn-close" @click="closeModal">×</button>
        </div>

        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label class="form-label">Nom</label>
            <input
              type="text"
              class="form-input"
              v-model="currentUser.nom"
              placeholder="Dupont"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Prénom</label>
            <input
              type="text"
              class="form-input"
              v-model="currentUser.prenom"
              placeholder="Jean"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-input"
              v-model="currentUser.email"
              placeholder="jean.dupont@email.com"
              required
            />
          </div>
          <!-- <p style="color: red;" :v-if="already == 'already'" > emal deja utilsé</p> -->

          <div class="form-group">
            <label class="form-label">Téléphone</label>
            <input
              type="tel"
              class="form-input"
              v-model="currentUser.telephone"
              placeholder="+32 488 12 13 14"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <input
              type="password"
              class="form-input"
              v-model="currentUser.hpassword"
              placeholder="**********"
              required
            />
          </div>
          <!-- <div class="form-group">
            <label class="form-label">Confirmer le mot de passe</label>
            <input type="password" class="form-input" placeholder="**********" required />
          </div> -->

          <div class="form-group">
            <label class="form-label">Rôle</label>
            <select class="form-select" v-model="currentUser.id_role" required>
              <option value="1">Administrateur</option>
              <option value="2">Formateur</option>
              <option value="3">Stagiaire</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Active ?</label>
            <input type="checkbox" class="form-input" v-model="currentUser.isActive" />
          </div>

          <div class="upload-container">
            <label class="upload-label" for="photoInput"> 📸 Choisir une photo </label>

            <input
              id="photoInput"
              type="file"
              accept="image/*"
              @change="onFileChange"
              class="upload-input"
            />

            <div v-if="preview" class="preview">
              <img :src="preview" alt="Prévisualisation" />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">Annuler</button>
            <button type="submit" class="btn-save">
              {{ modalMode === "add" ? "Créer" : "Sauvegarder" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Confirmation de Suppression -->
    <div class="modal modal-delete" :class="{ show: showDeleteModal }">
      <div class="modal-content modal-delete-content">
        <div class="modal-delete-icon">
          <span>⚠️</span>
        </div>

        <div class="modal-header">
          <h2 class="modal-title">Confirmer la suppression</h2>
        </div>

        <div class="modal-body">
          <p class="delete-message">
            Êtes-vous sûr de vouloir supprimer l'utilisateur
            <strong>{{ userToDelete?.nom }}</strong> ?
          </p>
          <p class="delete-warning">
            Cette action est irréversible et supprimera toutes les données associées à cet
            utilisateur.
          </p>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-cancel" @click="closeDeleteModal">Annuler</button>
          <button type="button" class="btn-delete-confirm" @click="confirmDelete">
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Users",
  data() {
    return {
      userEmail: "",
      searchQuery: "",
      showModal: false,
      showDeleteModal: false,
      modalMode: "add",
      sidebarOpen: false,
      userToDelete: null,
      confirmPass: "",
      already : "",
      currentUser: {
        // id_utilisateur: null,
        nom: "",
        prenom: "",
        hpassword: "",
        telephone: "",
        id_role: 0,
        photo: "",
        isActive: 0,
      },

      users: [],
      preview: null,
    };
  },
  computed: {
    userInitials() {
      if (!this.userEmail) return "U";
      return this.userEmail.charAt(0).toUpperCase();
    },
    filteredUsers() {
      if (!this.searchQuery) return this.users;
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(
        (user) =>
          user.nom.toLowerCase().includes(query) ||
          user.prenom.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        // user.telephone?.includes(this.searchPhone ?? "")
      );
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    logout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    getInitials(name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    },
    getRoleLabel(role) {
      const labels = {
        1: "Administrateur",
        2: "Formateur",
        3: "Stagiaire",
        4: "Sa Majesté",
      };
      return labels[role];
    },
    openModal(mode, user = null) {
      this.modalMode = mode;
      if (mode === "edit" && user) {
        this.currentUser = { ...user };
      } else {
        this.currentUser = {
          id_utilisateur: null,
          nom: "",
          prenom: "",
          email: "",
          hpassword: "",
          telephone: "",
          id_role: 1,
          photo: "",
        };
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.preview = null;
    },
    openDeleteModal(user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.userToDelete = null;
    },
    async confirmDelete() {
      if (this.userToDelete) {
        await axios.delete("http://localhost:3000/users/" + this.userToDelete.id_utilisateur); // Je ne pas supprimer un utilisateur utilisé ex: commande_fournisseur_id_utilisateur_fkey
        this.users = await axios.get("http://localhost:3000/users").then((x) => x.data);
        this.closeDeleteModal();
      }
    },
    async saveUser() {
      if (this.modalMode === "add") {
        try {
          const res = await axios.post("http://localhost:3000/users/register", {
            ...this.currentUser,
          }).then(x => this.already = x.data.msg);

          this.users = await axios.get("http://localhost:3000/users").then((x) => x.data);
        } catch (error) {
          console.log("Error Add User", error);
        }
      } else {
        const response = await axios.put("http://localhost:3000/users", { ...this.currentUser });
        console.log(response);
        this.users = await axios.get("http://localhost:3000/users").then((x) => x.data);
      }

      this.closeModal();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.preview = URL.createObjectURL(file);
      this.$emit("file-selected", file);
    },
  },
  async mounted() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      this.$router.push("/login");
      return;
    }
    this.userEmail = localStorage.getItem("userEmail") || "utilisateur@email.com";

    try {
      const response = await axios.get("http://localhost:3000/users");
      this.users = response.data;
    } catch (error) {
      console.log("Error Get All users");
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7f6;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #2d5016, #4caf50);
  color: white;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}

.navbar-logo {
  height: 35px;
  width: auto;
  margin-right: 12px;
  filter: brightness(0) invert(1);
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 35px;
  height: 35px;
  background: white;
  color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid white;
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.btn-logout:hover {
  background: white;
  color: #4caf50;
}

/* Layout */
.layout {
  display: flex;
  flex: 1;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  padding: 20px 0;
}

.menu-item {
  padding: 12px 25px;
  color: #555;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-item:hover {
  background: #f0f7f0;
  color: #4caf50;
}

.menu-item.active {
  background: #e8f5e9;
  color: #4caf50;
  border-left: 4px solid #4caf50;
  font-weight: 600;
}

.menu-icon {
  font-size: 20px;
}

.menu-section {
  margin-top: 20px;
  padding: 10px 25px;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  font-weight: 600;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 30px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 28px;
  color: #2d5016;
  font-weight: 600;
}

.btn-add {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

/* Users Table */
.users-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.search-bar {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  background: #f8f9fa;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2d5016;
  font-size: 14px;
}

.users-table td {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.users-table tbody tr:hover {
  background: #f8fdf8;
}

.user-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.admin {
  background: #e8f5e9;
  color: #4caf50;
}

.badge.stagiaire {
  background: #e3f2fd;
  color: #2196f3;
}

.badge.formateur {
  background: #fff3e0;
  color: #ff9800;
}

.badge.roi {
  background: #dac3c3;
  color: #d60711;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-edit {
  background: #e3f2fd;
}

.btn-edit:hover {
  background: #2196f3;
  color: white;
}

.btn-delete {
  background: #ffebee;
}

.btn-delete:hover {
  background: #f44336;
  color: white;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal.show {
  display: flex;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 22px;
  color: #2d5016;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.btn-close:hover {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  color: #2d5016;
  font-weight: 600;
  font-size: 14px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #4caf50;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-save {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-save:hover {
  background: linear-gradient(135deg, #45a049, #5cb85c);
}

/* Modal Delete Confirmation */
.modal-delete-content {
  max-width: 450px;
  text-align: center;
}

.modal-delete-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.modal-delete .modal-header {
  justify-content: center;
  margin-bottom: 15px;
}

.modal-body {
  margin-bottom: 25px;
}

.delete-message {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.5;
}

.delete-message strong {
  color: #f44336;
  font-weight: 600;
}

.delete-warning {
  font-size: 13px;
  color: #999;
  line-height: 1.4;
}

.btn-delete-confirm {
  background: linear-gradient(135deg, #f44336, #e53935);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-delete-confirm:hover {
  background: linear-gradient(135deg, #d32f2f, #c62828);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
}

/* Footer */
.footer {
  background: white;
  padding: 20px 25px;
  text-align: center;
  color: #999;
  font-size: 14px;
  border-top: 1px solid #e0e0e0;
}

.footer-logo {
  height: 25px;
  width: auto;
  margin-bottom: 10px;
  opacity: 0.6;
}

/* Menu Hamburger */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
}

/* Overlay pour mobile */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 98;
}

.sidebar-overlay.show {
  display: block;
}

/* Upload Image */
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: 10px;
}

.upload-label {
  background: #4caf50;
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.upload-label:hover {
  background: #45a049;
}

.upload-input {
  display: none;
}

.preview {
  width: 100%;
}

.preview img {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  border: solid 2px #ddd;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    padding: 20px;
  }

  .page-title {
    font-size: 24px;
  }

  .sidebar {
    width: 200px;
  }

  .menu-item {
    padding: 10px 15px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .navbar-brand span {
    font-size: 16px;
  }

  .navbar-logo {
    height: 30px;
  }

  .user-info span {
    display: none;
  }

  .sidebar {
    position: fixed;
    left: -250px;
    top: 60px;
    height: calc(100vh - 60px);
    transition: left 0.3s;
    z-index: 99;
    width: 250px;
  }

  .sidebar.show {
    left: 0;
  }

  .layout {
    flex-direction: column;
  }

  .main-content {
    padding: 15px;
    width: 100%;
  }

  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .btn-add {
    width: 100%;
    justify-content: center;
  }

  .search-bar {
    padding: 15px;
  }

  .search-input {
    max-width: 100%;
  }

  .users-table {
    display: block;
    overflow-x: auto;
  }

  .users-table thead {
    display: none;
  }

  .users-table tbody {
    display: block;
  }

  .users-table tr {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    background: white;
  }

  .users-table td {
    display: block;
    padding: 8px 0;
    border: none;
    text-align: left;
  }

  .users-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #2d5016;
    display: block;
    margin-bottom: 5px;
    font-size: 12px;
  }

  .user-name {
    margin-bottom: 5px;
  }

  .action-buttons {
    margin-top: 10px;
  }

  .footer {
    padding: 15px;
  }

  .modal-content {
    width: 95%;
    padding: 20px;
  }

  .modal-title {
    font-size: 18px;
  }

  .modal-delete-icon {
    width: 60px;
    height: 60px;
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 12px 15px;
  }

  .navbar-logo {
    height: 25px;
  }

  .btn-logout {
    padding: 6px 12px;
    font-size: 12px;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }

  .page-title {
    font-size: 20px;
  }

  .btn-add {
    padding: 10px 20px;
    font-size: 13px;
  }

  .modal-content {
    padding: 15px;
  }

  .form-input,
  .form-select {
    font-size: 16px; /* Évite le zoom sur iOS */
  }
}

@media (min-width: 769px) {
  .sidebar-overlay {
    display: none !important;
  }
}
</style>
