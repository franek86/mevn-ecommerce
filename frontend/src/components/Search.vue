<template>
  <div>
    <form>
      <div class="flex relative lg:justify-end">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search..."
          class="bg-transparent sm:border-solid sm:border-darkColor sm:border px-4 py-2 border-b focus:outline-none"
        />
        <div
          class="sm:border-solid sm:border-darkColor sm:border-l-0 sm:border-r sm:border-t sm:border-b px-4 py-2 bg-transparent border-b"
        >
          <img
            class=" w-6 h-6"
            src="../assets/images/search.svg"
            alt="Search icon"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
input {
  background-color: transparent;
}
</style>
