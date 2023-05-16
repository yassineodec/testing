<template>
  <div class="slideshow">
    <transition-group name="slide" tag="div">
      <div
        v-for="(image, index) in images"
        :key="index"
        v-show="index === activeIndex"
      >
        <img
          :src="'http://192.168.1.70:5000/images/' + image"
          alt="Slide"
          class="slide-image"
        />
      </div>
    </transition-group>
    <div class="slide-controls">
      <button class="slide-control slide-control-prev" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="slide-control slide-control-next" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center h-[100vh]">
    <div
      v-for="producto in productos"
      :key="producto.id"
      class="shadow-lg relative flex flex-col items-center rounded-[20px] w-[550px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3"
    >
      <div class="mt-3 mr-2 mb-8 w-full">
        <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
          {{ producto.nombre_producto }}
        </h4>
        <p class="mt-2 px-2 text-base text-gray-600">
          {{ producto.descripcion }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 px-2 w-full">
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-road text-orange-500 mr-2"></i>Km
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.km }}
          </p>
        </div>

        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-money-bill text-orange-500 mr-2"></i>Precio
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.precio }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-car text-orange-500 mr-2"></i>Puertas
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.puertas }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-clock text-orange-500 mr-2"></i>Fecha Publicacion
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{
              new Date(producto.fecha_publicacion).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}
          </p>
        </div>

        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-map-marker-alt text-orange-500 mr-2"></i>Ubicación
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.ubicacion }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-calendar-alt text-orange-500 mr-2"></i>Año
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.anno }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-paint-brush text-orange-500 mr-2"></i>Color
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.color }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-cogs text-orange-500 mr-2"></i>Cambio
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.cambio }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-user text-orange-500 mr-2"></i>Publicado por :
          </p>

          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ usuario.username }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-phone-alt text-orange-500 mr-2"></i>Numero de
            Contacto
          </p>
          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ producto.numero_contacto }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <p class="text-sm text-gray-600">
            <i class="fas fa-envelope text-orange-500 mr-2"></i>Email
          </p>

          <p class="text-base font-medium text-navy-700 dark:text-white">
            {{ usuario.email }}
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <button
            class="py-1 px-4 bg-transparent text-orange-500 font-semibold border border-orange-500 rounded hover:bg-orange-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
          >
            Contactar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      productos: [],
      usuario: [],
      activeIndex: 0,
    };
  },
  mounted() {
    this.obtenerProductos();
    this.fetchImages();
  },

  methods: {
    obtenerProductos() {
      const token = sessionStorage.getItem("access_token");
      fetch(
        `http://192.168.1.70:10520/api/data/productos/solitario/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.productos = data;
          if (this.productos.length > 0) {
            const id = this.productos[0].user_id;
            this.fetchUsuario(id);
            // Realizar las operaciones deseadas con el user_id
          }
        })
        .catch((error) => {
          console.error("Error al obtener los productos:", error);
        });
    },
    fetchImages() {
      const anuncioId = this.$route.params.id; // ID del anuncio

      fetch(`http://127.0.0.1:5000/images/anuncio/${anuncioId}`)
        .then((response) => response.json())
        .then((data) => {
          this.images = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchUsuario(id) {
      const token = sessionStorage.getItem("access_token");
      fetch(`http://192.168.1.70:10520/api/user/userdetailsid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.usuario = data.data;
          console.log(this.usuario);
        })
        .catch((error) => {});
    },
    prevSlide() {
      this.activeIndex =
        (this.activeIndex - 1 + this.images.length) % this.images.length;
    },
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    },
  },
};
</script>
<style>
.tarjeta {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.slideshow {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
}

.slide-image {
  width: 100%; /* Ancho fijo de 500px */
  height: 500px; /* Altura fija de 300px */
  object-fit: cover;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slide-control {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  margin-right: 20px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
}

.slide-control-prev {
  margin-right: auto;
}

.slide-control-next {
  margin-left: auto;
}

.slide-control-icon {
  display: inline-block;
}

/* Opcional: Añade estilos adicionales para adaptar el slideshow a tus necesidades */
</style>
