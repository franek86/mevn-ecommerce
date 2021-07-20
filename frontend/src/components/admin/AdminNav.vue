<template>
  <div class="fixed lg:static bottom-0 w-full lg:w-52 lg:h-auto z-10">
    <nav
      class=" bg-yellowLight flex lg:flex-col lg:h-full justify-center items-center lg:px-4"
    >
      <router-link
        to="/admin/dashboard"
        class="w-full h-12 flex items-center justify-center lg:justify-start lg:my-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 opacity-50 lg:mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>

        <span class="hidden lg:block">Dashboard</span></router-link
      >
      <router-link
        to="/admin/products"
        class="w-full h-12 flex items-center justify-center lg:justify-start lg:my-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 opacity-50 lg:mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          /></svg
        ><span class="hidden lg:block">Products</span></router-link
      >
      <router-link
        to="/admin/category"
        class="w-full h-12 flex items-center justify-center lg:justify-start lg:my-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 opacity-50 lg:mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          /></svg
        ><span class="hidden lg:block">Categories</span></router-link
      >
      <router-link
        to="/admin/brands"
        class="w-full h-12 flex items-center justify-center lg:justify-start lg:my-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 opacity-50 lg:mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          /></svg
        ><span class="hidden lg:block">Brands</span></router-link
      >
      <router-link
        to="/admin/orders"
        class="w-full h-12 flex items-center justify-center lg:justify-start lg:my-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 opacity-50 lg:mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          /></svg
        ><span class="hidden lg:block">Orders</span></router-link
      >
      <router-link
        to="/admin/users"
        class="w-full h-12 flex items-center justify-center lg:justify-start lg:my-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 opacity-50 lg:mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          /></svg
        ><span class="hidden lg:block">Users</span></router-link
      >
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.router-link-exact-active,
.router-link-active {
  border-top: 2px solid #e09270;

  @media screen and (min-width: 1024px) {
    border-top: none;
    border-bottom: 2px solid #e09270;
  }

  span {
    color: #e09270;
  }

  svg {
    stroke: #e09270;
  }
}
</style>
