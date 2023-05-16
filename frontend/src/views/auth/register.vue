<template>
  <div style="text-align: center">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Resitrate
      <span
        class="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500"
      >
        Gratis
      </span>
    </h1>
  </div>
  <br />
  <div class="contenedor">
    <div class="grid w-full bg-gray-200 items-center">
      <div
        class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-72 m-auto"
      >
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

        <div class="w-full h-full text-center">
          <div class="flex h-full flex-col justify-between">
            <p
              class="text-gray-800 dark:text-gray-200 text-4xl font-bold mt-4 mb-4"
            >
              Register .
            </p>

            <!-- This is the Name Field -->
            <div class="relative">
              <input
                v-model="name"
                type="text"
                class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Full Name"
              />
              <p class="absolute text-vs text-red-500 -bottom-0 right-2">
                {{ message.name }}
              </p>
            </div>

            <!-- This is the Email Field -->
            <div class="relative mt-4">
              <input
                v-model="email"
                type="email"
                class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your email"
              />
              <p class="absolute text-vs text-red-500 -bottom-0 right-2">
                {{ message.email }}
              </p>
            </div>

            <!-- This is the Password Field -->
            <div class="relative mt-4">
              <input
                v-model="password"
                type="password"
                class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>

            <div class="flex items-center justify-between gap-4 w-full mt-14">
              <button
                type="submit"
                @click="submitRegister"
                class="py-2 px-4 bg-orange-500 hover:bg-orange-600 focus:ring-orange-600 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Register
              </button>
              <router-link to="/login"
                ><button
                  type="button"
                  class="py-2 px-4 bg-white border-2 border-orange-500 text-orange-500 hover:text-gray-600 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                >
                  Login
                </button></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: [],
    };
  },
  watch: {
    name(val) {
      if (val.length >= 1) {
        if (val.match(/^[A-Z a-z]+$/)) {
          this.name = val;
          this.message["name"] = "";
        } else {
          this.message["name"] = "* name is not valid";
        }
      } else if (val.length < 1) {
        this.message["name"] = "";
      }
    },

    email(val) {},

    password(val) {},
  },
  methods: {
    submitRegister() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !this.name == "" &&
        !this.email == "" &&
        re.test(this.email) &&
        this.password.length >= 4
      ) {
        // console.log(`Name : ${this.name}, Email : ${this.email}, Password : ${this.password}`)

        this.axios
          .post("http://192.168.1.70:10520/api/user/add", {
            username: this.name,
            email: this.email,
            password: md5(this.password),
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.message == "register succeed") {
              this.message.notiError = "";
              this.message.notiSuccess = "Registro Completado";
              setTimeout(this.redirect, 1500);
            }
            if (res.data.message == "username occupied") {
              this.message.notiError = "El nombre de usuario ya existe";
              this.message.notiSuccess = "";
            } else {
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      } else {
        this.message.notiError = "Error! Invalid Forum 😢";
        this.message.notiSuccess = "";
      }
    },
    redirect() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.text-vs {
  font-size: 0.7rem;
}

.contenedor {
  background-color: rgba(229, 231, 235, 255);
  height: 600px;
}
</style>
