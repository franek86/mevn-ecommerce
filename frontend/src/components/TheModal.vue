<template>
  <div
    class="absolute inset-0 flex justify-center items-center bg-darkColor bg-opacity-50"
  >
    <div class="py-8 px-8 border border-solid w-1/3 bg-whiteColor shadow-lg">
      <section>
        <slot name="content"></slot>
      </section>

      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
