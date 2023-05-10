<template>
  <div style="text-align: center">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Información de
      <span
        class="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500"
      >
        CityCar
      </span>
    </h1>
  </div>
  <br />
  <div class="grid h-screen px-95 p-10 mx-auto bg-gray-200 no-top-padding">
    <div class="my-div">
      <div class="flex justify-center">
        <div
          class="w-full max-w-md p-4 bg-white border rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <h5
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Ultimas Valoraciones
            </h5>
          </div>
          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li
                class="py-3 sm:py-4"
                v-for="(customer, index) in customers"
                :key="index"
              >
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ customer.username }}
                    </p>
                    <p
                      class="text-sm text-gray-500 truncate dark:text-gray-400"
                    >
                      {{ customer.email }}
                    </p>
                  </div>
                  <div
                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                  >
                    {{ customer.valoracion }} / 100
                  </div>
                </div>
              </li>
            </ul>
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
      customers: [], // array de productos
    };
  },
  methods: {},
  created() {
    fetch("http://127.0.0.1:10520/api/data/valoraciones")
      .then((response) => response.json())
      .then((data) => {
        this.customers = data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style>
.container {
  background-color: rgba(229, 231, 235, 255);
}
.no-top-padding {
  padding-top: 0;
}
.my-div {
}
</style>
