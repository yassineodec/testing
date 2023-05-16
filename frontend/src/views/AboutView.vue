<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-4 mx-auto mb-12">
      <div class="flex flex-wrap w-full mb-8">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900"
          >
            Statistic
          </h1>
          <div class="h-1 w-20 bg-orange-500 rounded"></div>
        </div>
      </div>
      <div class="flex flex-wrap -m-4 text-center">
        <div class="p-4 sm:w-1/4 w-1/2">
          <div class="bg-orange-500 rounded-lg p-2 xl:p-6 shadow">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
              2.7K
            </h2>
            <p class="leading-relaxed text-gray-100 font-bold">Users</p>
          </div>
        </div>
        <div class="p-4 sm:w-1/4 w-1/2">
          <div class="bg-orange-500 rounded-lg p-2 xl:p-6 shadow">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
              1.8K
            </h2>
            <p class="leading-relaxed text-gray-100 font-bold">Subscribes</p>
          </div>
        </div>
        <div class="p-4 sm:w-1/4 w-1/2">
          <div class="bg-orange-500 rounded-lg p-2 xl:p-6 shadow">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
              35
            </h2>
            <p class="leading-relaxed text-gray-100 font-bold">Downloads</p>
          </div>
        </div>
        <div class="p-4 sm:w-1/4 w-1/2">
          <div class="bg-orange-500 rounded-lg p-2 xl:p-6 shadow">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
              4
            </h2>
            <p class="leading-relaxed text-gray-100 font-bold">Products</p>
          </div>
        </div>
      </div>
    </div>
  </section>
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
