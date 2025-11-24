<template>
  <div id="app">
    <div class="login-container">
      <div class="logo-section">
        <img src="@/assets/forem.png" alt="Forem Logo" class="logo" />
        <h1>Gestion Maraîchage</h1>
        <p class="subtitle">Cultivez l'excellence</p>
      </div>

      <div class="error-message" :class="{ show: errorMessage }">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="votre@email.com" required />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" placeholder="••••••••" required />
        </div>

        <div class="remember-forgot">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            Se souvenir
          </label>
          <a href="#" class="forgot-password">Mot de passe oublié ?</a>
        </div>

        <button type="submit" class="btn-login">Se connecter</button>
      </form>

      <div class="footer-text">© 2024 Forem - Gestion Maraîchage</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      const response = await axios.post("http://localhost:3000/users/login", {
        email: this.email,
        hpassword: this.password,
      });

      if (response.data.email == this.email) {
        // Sauvegarder les infos de connexion
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", this.email);
        // localStorage.setItem("token", response.data.token);

        // Rediriger vers la page des utilisateurs avec Vue Router
        this.$router.push("/users");
      } else {
        this.errorMessage = "Email ou mot de passe incorrect";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    },
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
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.login-container {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #4caf50, #8bc34a, #4caf50);
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 180px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  color: #2d5016;
  font-size: 24px;
  margin-bottom: 5px;
}

.subtitle {
  color: #5a7744;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  color: #2d5016;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s;
  background: #fafafa;
}

input:focus {
  outline: none;
  border-color: #4caf50;
  background: white;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-login:hover {
  background: linear-gradient(135deg, #45a049, #5cb85c);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.btn-login:active {
  transform: translateY(0);
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  font-size: 13px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #666;
  cursor: pointer;
}

.remember-me input {
  width: auto;
  margin-right: 6px;
  cursor: pointer;
}

.forgot-password {
  color: #4caf50;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.footer-text {
  text-align: center;
  margin-top: 20px;
  color: #999;
  font-size: 12px;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 13px;
  opacity: 0;
  transition: opacity 0.3s;
}

.error-message.show {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  #app {
    padding: 15px;
  }

  .login-container {
    padding: 30px 25px;
    max-width: 100%;
  }

  .logo {
    width: 150px;
  }

  h1 {
    font-size: 20px;
    color: #70ba4d;
  }

  .subtitle {
    font-size: 13px;
  }

  .btn-login {
    padding: 12px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 25px 20px;
  }

  .logo {
    width: 130px;
  }

  h1 {
    font-size: 18px;
  }

  .remember-forgot {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  input {
    font-size: 16px; /* Évite le zoom sur iOS */
  }
}
</style>
