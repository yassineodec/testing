<template>
  <!-- Alerta de Tailwind CSS -->
  <div class="contenedor">
    <div class="grid h-50 bg-gray-200 items-center">
      <div style="text-align: center">
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          Crea
          <span
            class="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500"
          >
            tu anuncio
          </span>
        </h1>
      </div>
      <div>
        <div
          v-if="!showAnuncio"
          class="relative flex items-center justify-center bg-gray-200 py-5 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        >
          <div class="absolute bg-gray-200 inset-0 z-0"></div>
          <div
            class="sm:max-w-lg w-full p-10 shadow bg-white prueba rounded-xl z-10"
          >
            <div class="text-center">
              <div
                v-if="showSuccessAlert"
                class="bg-green-200 text-green-800 p-4 rounded-md mt-4"
              >
                ¡Anuncio creado con exito!
              </div>
              <div
                v-if="showNoImageAlert"
                class="bg-red-200 text-red-800 p-4 rounded-md mt-4"
              >
                Debes seleccionar entre 1 y 5 imagenes.
              </div>
              <h2 class="mt-5 text-3xl font-bold text-gray-900">
                Publica las fotos!
              </h2>
              <p class="mt-2 text-sm text-gray-400">
                Solo puedes subir 5 imagenes.
              </p>
            </div>
            <div class="grid grid-cols-1 space-y-2">
              <label class="sr-only"> Attach Document </label>
              <input
                class="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                type="file"
                ref="fileInput"
                multiple
                @change="handleFileUpload"
              />
            </div>
            <div>
              <button
                @click="uploadFiles"
                type="submit"
                class="my-5 w-full flex justify-center bg-orange-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-orange-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showAnuncio"
        class="rounded-2xl p-4 my-6 bg-gray-200 dark:bg-gray-800 m-10"
      >
        <div class="flex w-full space-x-3">
          <div
            class="w-full max-w-4xl px-5 py-10 m-auto bg-white rounded-lg prueba dark:bg-gray-800"
          >
            <div
              class="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white"
            >
              CityCar
            </div>
            <div
              v-if="showAlert"
              class="bg-red-200 text-black-800 p-4 rounded-md mt-4 text-center"
            >
              ¡Rellena todos los campos!
            </div>
            <hr />
            <br />
            <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Marca y Modelo
                  </label>
                  <input
                    type="text"
                    v-model="anuncio.nombre_producto"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Modelo y Marca"
                    required
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    v-model="anuncio.precio"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Precio"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Km
                  </label>
                  <input
                    type="number"
                    v-model="anuncio.km"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Km"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Numero Teléfono
                  </label>
                  <input
                    type="text"
                    v-model="anuncio.numero_contacto"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Numero Telefono"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha Anuncio
                  </label>
                  <input
                    type="date"
                    v-model="anuncio.fecha_publicacion"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Title"
                    readonly
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Marca
                  </label>
                  <input
                    type="text"
                    v-model="anuncio.marca"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Marca"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ubicación
                  </label>
                  <input
                    type="text"
                    v-model="anuncio.ubicacion"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Ubicacion"
                  />
                </div>
              </div>
              <div class="relative">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Año
                </label>
                <input
                  type="number"
                  v-model="anuncio.anno"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Año"
                />
              </div>
              <div class="relative">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nº Puertas
                </label>
                <input
                  type="number"
                  v-model="anuncio.puertas"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Puertas"
                />
              </div>
              <div class="color">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Color
                </label>
                <input
                  type="text"
                  v-model="anuncio.color"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Color"
                />
              </div>
              <div class="relative">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cambio
                </label>
                <select
                  v-model="anuncio.cambio"
                  class="form-select border border-gray-300 rounded-lg w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                >
                  <option value="manual">Manual</option>
                  <option value="automatico">Automático</option>
                </select>
              </div>

              <div class="col-span-2">
                <div class="relative">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripcion
                  </label>
                  <textarea
                    type="text"
                    v-model="anuncio.descripcion"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Descripcion"
                  />
                </div>
              </div>
              <div class="col-span-2 text-right">
                <button
                  @click="submitPost"
                  class="py-2 px-4 bg-orange-500 hover:bg-orange-600 focus:ring-orange-600 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Post
                </button>
              </div>
            </div>
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
      alertMessage: "",
      showNoImageAlert: false,
      showSuccessAlert: false,
      showAlert: false,
      showPopup: false,
      showAnuncio: true,
      files: [],
      anuncio: {
        id: "",
        nombre_producto: "",
        descripcion: "",
        ubicacion: "",
        precio: 0,
        km: 0,
        numero_contacto: "",
        fecha_publicacion: "",
        estado: true,
        user_id: sessionStorage.getItem("user_id"),
        marca: "",
        anno: 0,
        puertas: 0,
        color: "",
        cambio: "",
      },
    };
  },
  created() {
    this.anuncio.fecha_publicacion = this.getCurrentDate();
    // Generar una cadena aleatoria de 4 letras
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetters = Array.from(
      { length: 4 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join("");

    // Generar un número aleatorio de 4 dígitos
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    // Concatenar las letras y los números
    const code = randomLetters + randomNumber;

    this.anuncio.id = code;

    console.log(code); // Imprimir el código generado en la consola
  },
  methods: {
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    handleFileUpload() {
      this.files = Array.from(this.$refs.fileInput.files);
    },

    uploadFiles() {
      if (this.files.length === 0 || this.files.length > 5) {
        this.showNoImageAlert = true;
        return;
      }

      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append("images", file);
      });

      fetch(`http://192.168.1.70:5000/images/image/${this.anuncio.id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log(response);
          if (response.statusText == "OK") {
            console.log(this.files);
            this.showNoImageAlert = false;
            setTimeout(this.redirect, 1500);
            this.showSuccessAlert = true;
          } else {
            this.alertMessage = "Error al subir las imágenes.";
            this.showAlert = true;
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitPost() {
      for (let key in this.anuncio) {
        if (!this.anuncio[key]) {
          this.alertMessage =
            "Por favor, completa todos los campos obligatorios.";
          this.showAlert = true; // Mostrar la alerta si algún campo está vacío
          return;
        }
      }
      const token = sessionStorage.getItem("access_token");
      fetch("http://192.168.1.70:10520/api/data/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.anuncio),
      })
        .then((response) => response.text())
        .then((data) => {
          this.showAlert = false;
          this.showAnuncio = false;
          this.showPopup = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    redirect() {
      this.$router.push("/");
    },
    redirectError() {
      this.$router.push("/create-post");
    },
  },
};
</script>
<style>
.contenedor {
  background-color: rgba(229, 231, 235, 255);
  height: 800px;
}

.prueba {
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>
