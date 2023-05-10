<template>
  <div class="navbar bg-gray-200 relative">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="1" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="1"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <router-link to="/">
            <li><a>Home</a></li>
          </router-link>
          <router-link to="/about">
            <li><a>About</a></li>
          </router-link>
        </ul>
      </div>
      <router-link to="/"
        ><a class="btn btn-ghost normal-case text-xl">CityCar</a></router-link
      >
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <router-link to="/">
          <li><a>Homes</a></li>
        </router-link>
        <router-link to="/about">
          <li><a>About</a></li>
        </router-link>
        <!-- <router-link to="/create-post">
                <li v-if="justShowit"><a>Create Post</a></li>
            </router-link> -->
      </ul>
    </div>
    <div v-if="!justShowit" class="navbar-end">
      <router-link to="/login"
        ><a
          class="font-bold btn bg-orange-500 border-none hover:bg-orange-600 px-6"
          >Login</a
        ></router-link
      >
    </div>
    <div v-else-if="justShowit" class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-9 rounded-full">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40"
        >
          <li>
            <router-link to="/profile"
              ><a class="justify-between"> Profile </a></router-link
            >
          </li>
          <li>
            <router-link to="/create-post"
              ><a class="justify-between"> Crear Anuncio </a></router-link
            >
          </li>
          <li @click="$store.dispatch('logOut')"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    justShowit() {
      if (this.$store.state.hasToken == true) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
