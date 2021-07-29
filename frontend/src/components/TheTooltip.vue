<template>
  <div class="tooltip">
    <slot></slot>
    <div class="tooltip__box">
      <div class="tooltip__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inherit;

  &:hover {
    .tooltip__box {
      opacity: 1;
    }
  }

  &__box {
    color: #ffffff;
    text-align: center;
    padding: 5px 0;
    border-radius: 2px;

    width: 100px;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;

    opacity: 0;
    transition: opacity 1s;

    position: absolute;
    z-index: 1;

    background: #f1ccbb;
  }

  &__text {
    text-transform: uppercase;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: bold;
    :after {
      content: " ";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #a782e8 transparent transparent transparent;
    }
  }
}
</style>
