<template>
  <div class="testing">
    <div class="grid w-full items-center">
      <div style="text-align: center">
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          Bienvenido a
          <span
            class="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500"
          >
            CityCar
          </span>
        </h1>
      </div>

      <section class="text-gray-600 body-font">
        <div class="container px-65 p-10 mx-auto">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <input
                type="text"
                class="w-full px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Buscar por nombre de producto"
                v-model="busqueda"
                @keydown.enter="buscarProductos()"
              />
              <div class="flex items-center">
                <button
                  class="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                  @click="buscarProductos"
                >
                  Buscar
                </button>
                <button
                  class="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 ml-2"
                  @click="mostrarFiltros = !mostrarFiltros"
                >
                  Filtros
                </button>
              </div>
            </div>
            <div
              v-if="mostrarFiltros"
              class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
            >
              <div class="bg-white rounded-lg shadow-lg p-5 m-10 w-1/1">
                <!-- Aquí van los filtros -->
                <div class="mb-4">
                  <h3 class="text-gray-700 font-medium mb-2">Precio</h3>
                  <div class="flex items-center">
                    <div class="absolute top-0 right-0 p-2">
                      <svg
                        class="w-6 h-6 text-red-700 cursor-pointer hover:text-red-900"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        @click="mostrarFiltros = false"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      class="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Precio mínimo"
                      v-model.number="filtroPrecioMin"
                    />
                    <input
                      type="number"
                      class="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Precio máximo"
                      v-model.number="filtroPrecioMax"
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <h3 class="text-gray-700 font-medium mb-2">Km</h3>
                  <div class="flex items-center">
                    <input
                      type="number"
                      class="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Km mínimo"
                      v-model.number="filtroKmMin"
                    />
                    <input
                      type="number"
                      class="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Km máximo"
                      v-model.number="filtroKmMax"
                    />
                  </div>
                </div>
                <!-- Botón para cerrar el popup de filtros -->
                <div>
                  <div class="mt-4 flex flex-col">
                    <button
                      class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 mb-2"
                      @click="aplicarFiltros"
                    >
                      Aplicar filtros
                    </button>
                    <button
                      class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      @click="resetFiltros"
                    >
                      Resetear filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -m-4">
            <div
              class="p-4 md:w-1/3"
              v-for="producto in productos"
              :key="producto.id"
            >
              <div
                class="bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
              >
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  :src="'http://localhost:5000/images/' + producto.imagen"
                  alt="blog"
                />
                <div class="p-6">
                  <h2
                    class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                  >
                    {{
                      new Date(producto.fecha_publicacion).toLocaleDateString(
                        "es-ES",
                        { day: "numeric", month: "long", year: "numeric" }
                      )
                    }}
                  </h2>

                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    {{ producto.nombre_producto }}
                  </h1>
                  <p class="leading-relaxed mb-3">
                    {{ producto.descripcion }}
                  </p>
                  <div class="flex items-center flex-wrap">
                    <a
                      class="text-black-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href="javascript:void(0);"
                    >
                      {{ producto.precio }} €
                    </a>
                    <span
                      class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"
                    >
                      {{ producto.km }} km
                    </span>
                    <div class="flex justify-start">
                      <button
                        :class="
                          producto.estado
                            ? 'bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded'
                            : 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        "
                        class="ml-auto"
                      >
                        {{ producto.estado ? "Visitar" : "Vendido" }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <br /><br />
  <footerBar></footerBar>
</template>

<script>
import footerBar from "../components/footerBar.vue";
export default {
  name: "HomeView",
  components: {
    footerBar,
  },
  data() {
    return {
      todosProductos: [],
      imagenes: [],
      productos: [], // array de productos
      productosOriginales: [], // array de productos originales sin filtro
      busqueda: "", // string para el término de búsqueda
      mostrarFiltros: false, // muestra u oculta los filtros
      filtroPrecioMin: null,
      filtroPrecioMax: null,
      filtroKmMin: null,
      filtroKmMax: null,
    };
  },
  methods: {
    // función para buscar productos por nombre
    buscarProductos() {
      if (this.busqueda) {
        // si hay un término de búsqueda, filtrar productos por nombre
        this.productos = this.productosOriginales.filter((producto) =>
          producto.nombre_producto
            .toLowerCase()
            .includes(this.busqueda.toLowerCase())
        );
      } else {
        // si no hay un término de búsqueda, mostrar todos los productos
        this.productos = this.productosOriginales;
      }
    },
    aplicarFiltros() {
      this.productos = this.productosOriginales.filter((producto) => {
        // Filtrar por precio
        if (
          (this.filtroPrecioMin && producto.precio < this.filtroPrecioMin) ||
          (this.filtroPrecioMax && producto.precio > this.filtroPrecioMax)
        ) {
          return false;
        }
        // Filtrar por km
        if (
          (this.filtroKmMin && producto.km < this.filtroKmMin) ||
          (this.filtroKmMax && producto.km > this.filtroKmMax)
        ) {
          return false;
        }
        return true;
      });
    },
    resetFiltros() {
      this.filtroPrecioMin = null;
      this.filtroPrecioMax = null;
      this.filtroKmMin = null;
      this.filtroKmMax = null;
      this.mostrarFiltros = !this.mostrarFiltros;
      this.productos = this.productosOriginales;
    },
  },
  created() {
    fetch("http://127.0.0.1:10520/api/data/productos")
      .then((response) => response.json())
      .then((data) => {
        this.productos = data;
        this.productosOriginales = data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    fetch("http://localhost:5000/images/anuncios")
      .then((response) => response.json())
      .then((data) => {
        this.imagenes = data;
        for (let i = 0; i < this.productos.length; i++) {
          const a = this.imagenes.filter((image) => {
            if (image.productos_id == this.productos[i].id) {
              return image.name;
            }
          });
          this.productos[i].imagen = a && a.length > 0 ? a[0].name : "null.png";
        }
        this.productos = this.productosOriginales;
      });
  },
};
</script>
<style>
.testing {
  background-color: rgba(229, 231, 235, 255);
}
.border-2 {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border: 1px solid #ccc;
  /*desplazamiento horizontal, vertical, radio de desenfoque, color y opacidad*/
}
</style>
