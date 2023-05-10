<template>
  <div
    v-if="!token"
    id="bottom-banner"
    tabindex="-1"
    class="fixed bottom-0 left-0 z-50 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    v-show="showBanner"
  >
    <div class="flex items-center mx-auto">
      <p
        class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400"
      >
        <span
          class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 2 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            ></path>
          </svg>
          <span class="sr-only">Discount coupon</span>
        </span>
        <span
          >Publica tu anuncio
          <a
            href="/register"
            class="flex items-center ml-0 text-sm font-medium text-orange-500 md:ml-1 md:inline-flex dark:text-blue-500 hover:underline"
            >Registrate aquí
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-1 text-orange-600 dark:text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillrule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                cliprule="evenodd"
              ></path></svg></a
        ></span>
      </p>
    </div>
    <div class="flex items-center">
      <button
        type="button"
        class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        @click="showBanner = false"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close banner</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      token: sessionStorage.getItem("access_token"),
      showBanner: true,
    };
  },
};
</script>
<style></style>
