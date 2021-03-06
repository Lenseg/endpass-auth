<template>
  <div class="frame">
    <header class="frame__header">
      <img
        class="frame__logo"
        src="../../assets/logo.png"
        alt="Endpass"
      >
      {{ title }}
      <span class="frame__close-btn">
        <v-button
          v-if="closable"
          data-test="close-button"
          @click="emitClose"
        >
          <v-svg-icon
            name="x"
            fill="white"
          />
        </v-button>
      </span>
    </header>
    <div class="frame__body">
      <loading-screen :is-loading="loading">
        <slot />
      </loading-screen>
    </div>
  </div>
</template>

<script>
import LoadingScreen from '@/components/common/LoadingScreen.vue';
import VButton from '@/components/common/VButton';
import VSvgIcon from '@/components/common/VSvgIcon.vue';

export default {
  name: 'VFrame',

  props: {
    title: {
      type: String,
      default: 'Connect',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    emitClose() {
      this.$emit('close');
    },
  },

  components: {
    LoadingScreen,
    VButton,
    VSvgIcon,
  },
};
</script>

<style lang="postcss">
@keyframes slideIn {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
}

.frame {
  overflow: hidden;
  max-width: 360px;
  margin: 50px auto;
  border-radius: 4px;
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  animation: slideIn 0.75s;
}

.frame__close-btn {
  margin-left: auto;
  path {
    fill: #fff;
  }
}

.frame__header {
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 1.5em;
  background-color: #4b0472;
  color: #fff;
}

.frame__logo {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  margin-right: 12.5px;
}

.frame__body {
  position: relative;
  padding: 30px 15px 15px;
  min-height: 100px;
  font-size: 1em;
}

@media (max-width: 768px) {
  .frame {
    max-width: initial;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    animation: none;
  }
}
</style>
