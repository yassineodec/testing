<template>
  <div class="contenedor">
    <div class="grid bg-gray-200 items-center">
      <div style="text-align: center">
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          Perfil
          <span
            class="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500"
          >
            personal
          </span>
        </h1>
      </div>
      <div class="container max-w-3xl mx-auto rounded-2xl my-10 px-4 md:w-5/4">
        <div class="space-y-6 prueba bg-white rounded-2xl">
          <!-- Error Notification -->
          <div
            v-if="!message.notiError == ''"
            class="alert alert-error shadow-lg transition ease-in duration-200"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ message.notiError }}</span>
            </div>
          </div>

          <!-- Success Notification -->
          <div
            v-else-if="!message.notiSuccess == ''"
            class="alert alert-success shadow-lg transition ease-in duration-200"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ message.notiSuccess }}</span>
            </div>
          </div>
          <div
            class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0"
          >
            <h2 class="max-w-sm mx-auto font-bold md:w-1/3">Personal info</h2>
            <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div class="relative">
                  <input
                    placeholder="Full Name"
                    v-model="name"
                    type="text"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled
                  />
                  <p class="absolute text-vs text-red-500 -bottom-0 right-2">
                    {{ message.name }}
                  </p>
                </div>
              </div>
              <div class="relative">
                <input
                  placeholder="Correo"
                  v-model="email"
                  type="text"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p class="absolute text-vs text-red-500 -bottom-0 right-2">
                  {{ message.email }}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div
            class="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0"
          >
            <h2 class="max-w-sm mx-auto font-bold md:w-4/12">
              Change password
            </h2>
            <div
              class="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex"
            >
              <div class="relative">
                <p>Reset my password.</p>
              </div>
            </div>
            <div class="text-center md:w-3/12 md:pl-6">
              <router-link to="/reset-password"
                ><button
                  type="button"
                  class="py-2 px-4 bg-indigo-700 hover:bg-indigo-800 focus:ring-orange-600 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Reset 🔑
                </button></router-link
              >
            </div>
          </div>
          <hr />
          <div class="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              @click="updateProfile"
              class="py-2 px-4 bg-orange-500 hover:bg-orange-600 focus:ring-orange-600 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: [],
      datos: [],
    };
  },
  watch: {
    name(val) {},

    email(val) {},
  },
  created() {
    const token = sessionStorage.getItem("access_token");
    const username = sessionStorage.getItem("username");
    fetch(`http://127.0.0.1:10520/api/user/userdetails?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.name = data.data.username;
        this.email = data.data.email;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  methods: {
    updateProfile() {
      const token = sessionStorage.getItem("access_token");
      const usernamerequest = sessionStorage.getItem("username");
      const username = this.username;
      const email = this.email;

      fetch(
        `http://127.0.0.1:10520/api/user/updateuser?username=${usernamerequest}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Añade el token JWT en el encabezado
          },
          body: JSON.stringify({ username, email }), // Convierte los datos a JSON
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Si el código es 0, los datos se actualizaron correctamente
          if (data.code === "0") {
            this.message.notiSuccess = "Datos actualizados correctamente";
            this.message.notiError = "";
            setTimeout(this.redirect, 1500);
          } else {
            this.message.notiError = data.message;
            this.message.notiSuccess = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    redirect() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.text-vs {
  font-size: 0.9rem;
}

.prueba {
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.contenedor {
  background-color: rgba(229, 231, 235, 255);
  height: 800px;
}
</style>
