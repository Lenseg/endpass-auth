<template>
  <v-frame>
    <message
      v-if="!hasLoginChallenge"
      :error="true"
      data-test="error-message"
    >
      You should provide login_challenge param in url, add it and try again!
    </message>
    <sign-password
      v-else
      :is-loading="isLoading"
      :error="error"
      @submit="handlePasswordSubmit"
    />
  </v-frame>
</template>

<script>
import { mapActions } from 'vuex';
import VFrame from '@/components/common/VFrame';
import Message from '@/components/common/Message';
import SignPassword from '@/components/forms/SignPassword';

export default {
  name: 'LoginProvider',

  props: {
    loginChallenge: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    error: null,
    isLoading: false,
  }),

  computed: {
    hasLoginChallenge() {
      return !!this.loginChallenge;
    },
  },

  methods: {
    ...mapActions(['authWithOauth']),

    async handlePasswordSubmit(password) {
      try {
        this.isLoading = true;
        const { redirect } = await this.authWithOauth({
          challengeId: this.loginChallenge,
          password,
        });
        window.location.href = redirect;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },

  components: {
    SignPassword,
    Message,
    VFrame,
  },
};
</script>
