<template>
  <div style="text-align: center">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Mis
      <span
        class="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500"
      >
        Anuncios
      </span>
    </h1>
    <div class="flex flex-wrap m-2 tarjeta-coche">
      <div
        class="p-4 md:w-1/3"
        v-for="producto in productos"
        :key="producto.id"
      >
        <div
          class="bg-white border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
        >
          <img
            class="lg:h-48 md:h-36 w-full object-cover object-center"
            :src="'http://192.168.1.70:5000/images/' + producto.imagen"
            alt="blog"
          />
          <div class="p-6">
            <h2
              class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
            >
              {{
                new Date(producto.fecha_publicacion).toLocaleDateString(
                  "es-ES",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )
              }}
            </h2>
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
              {{ producto.nombre_producto }}
            </h1>
            <div class="flex justify-center">
              <button
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                @click="editarProducto(producto)"
              >
                Editar
              </button>
              <button
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                @click="mostrarModal = true"
              >
                Borrar
              </button>
              <!-- Mostrar modal -->
              <div
                v-if="mostrarModal"
                class="fixed z-10 inset-0 overflow-y-auto"
              >
                <div class="flex items-center justify-center min-h-screen px-4">
                  <div
                    class="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <div
                    class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                  >
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div class="sm:flex sm:items-start">
                        <div
                          class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="red"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-alert-circle"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </div>
                        <div
                          class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                        >
                          <h3
                            class="text-lg leading-6 font-medium text-gray-900"
                          >
                            ¿Estás seguro de que deseas borrar este producto?
                          </h3>
                          <!-- Agrega aquí cualquier mensaje adicional que desees mostrar -->
                        </div>
                      </div>
                    </div>
                    <div
                      class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                      <button
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="borrarProducto(producto.id)"
                      >
                        Borrar
                      </button>
                      <button
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="mostrarModal = false"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                @click="
                  $router.push({
                    name: 'vista solitaria',
                    params: { id: producto.id },
                  })
                "
              >
                Visitar
              </button>
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
      mostrarModal: false,
      productos: [], // Lista de productos
      imagenes: [],
    };
  },
  mounted() {
    this.obtenerProductos();
  },
  created() {
    fetch("http://192.168.1.70:5000/images/anuncios")
      .then((response) => response.json())
      .then((data) => {
        this.imagenes = data;
      });
  },
  methods: {
    async borrarProducto(producto) {
      const token = sessionStorage.getItem("access_token");
      const productId = producto;

      try {
        const response = await fetch(
          `http://192.168.1.70:10520/api/data/productos/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza "yourToken" con el valor real del token
            },
          }
        );

        if (response.ok) {
          // El producto se eliminó correctamente
          console.log("Producto eliminado");
          this.productos = this.productos.filter((p) => p.id !== productId);
          this.mostrarModal = false;
        } else {
          console.error("Error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación", error);
      }
    },
    obtenerProductos() {
      const token = sessionStorage.getItem("access_token");
      const id = sessionStorage.getItem("user_id");
      fetch(`http://192.168.1.70:10520/api/data/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Ruta de la API para obtener los productos
        .then((response) => response.json())
        .then((data) => {
          this.productos = data;
          for (let i = 0; i < this.productos.length; i++) {
            const a = this.imagenes.filter((image) => {
              if (image.productos_id == this.productos[i].id) {
                return image.name;
              }
            });
            this.productos[i].imagen =
              a && a.length > 0 ? a[0].name : "null.png";
          }
        })
        .catch((error) => {
          console.error("Error al obtener los productos:", error);
        });
    },
  },
};
</script>
<style>
.tarjeta-coche {
  justify-content: center;
  margin: 0 100px;
}
</style>
