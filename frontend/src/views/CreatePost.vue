<template>
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
      <div v-if="showPopup">
        <div
          class="relative min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        >
          <div class="absolute bg-gray-200 inset-0 z-0"></div>
          <div class="sm:max-w-lg w-full p-10 shadow bg-white rounded-xl z-10">
            <div class="text-center">
              <h2 class="mt-5 text-3xl font-bold text-gray-900">
                Publica las fotos!
              </h2>
              <p class="mt-2 text-sm text-gray-400">
                Solo puedes subir 5 imagenes.
              </p>
            </div>
            <form class="mt-8 space-y-3">
              <div class="grid grid-cols-1 space-y-2">
                <label class="text-sm font-bold text-black-500 tracking-wide"
                  >Attach Document</label
                >
                <input
                  type="file"
                  ref="fileInput"
                  multiple
                  @change="handleFileUpload"
                />
              </div>
              <p class="text-sm text-black-300">
                <span>File type: jpg,png</span>
              </p>
              <div>
                <button
                  @click="uploadFiles"
                  type="submit"
                  class="my-5 w-full flex justify-center bg-orange-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-orange-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        v-if="showAnuncio"
        class="shadow-lg rounded-2xl p-4 my-6 bg-white dark:bg-gray-800 m-auto"
      >
        <div class="flex w-full max-w-lg space-x-3">
          <div
            class="w-full max-w-4xl px-5 py-10 m-auto bg-white rounded-lg shadow dark:bg-gray-800"
          >
            <div
              class="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white"
            >
              Create new Post
            </div>
            <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <input
                    type="text"
                    v-model="anuncio.nombre_producto"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Modelo y Marca"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
                  <input
                    type="text"
                    v-model="anuncio.descripcion"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Descripcion"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
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
                  <input
                    type="date"
                    v-model="anuncio.fecha_publicacion"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1">
                <div class="relative">
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
                  <input
                    type="text"
                    v-model="anuncio.ubicacion"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Ubicacion"
                  />
                </div>
              </div>
              <div class="relative">
                <input
                  type="number"
                  v-model="anuncio.anno"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Año"
                />
              </div>
              <div class="relative">
                <input
                  type="number"
                  v-model="anuncio.puertas"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Puertas"
                />
              </div>
              <div class="color">
                <input
                  type="text"
                  v-model="anuncio.color"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Color"
                />
              </div>
              <div class="relative">
                <input
                  type="text"
                  v-model="anuncio.cambio"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Cambio"
                />
              </div>
              <div class="col-span-2"></div>
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
    handleFileUpload() {
      this.files = Array.from(this.$refs.fileInput.files);
    },
    async uploadFiles() {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/images/image/${this.anuncio.id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("Anuncio creado");
        } else {
          alert("Error al subir las imágenes");
        }
      } catch (error) {
        console.error(error);
      }
    },
    submitPost() {
      fetch("http://127.0.0.1:10520/api/data/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.anuncio),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
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

.popup {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 999;
}
</style>
