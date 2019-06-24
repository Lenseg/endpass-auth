<template>
  <form
    data-test="sign-form"
    @submit.prevent="emitSubmit"
  >
    <form-field v-if="requesterUrl">
      {{ $t('components.passwordForm.applyConnectTo') }}
      <a
        :href="requesterUrl"
        data-test="requester-url"
      >{{ requesterUrl }}</a>
    </form-field>
    <form-field v-if="message">
      <message>
        {{ message }}
      </message>
    </form-field>
    <form-field v-if="error">
      <message
        :error="true"
        data-test="error-message"
      >
        {{ error }}
      </message>
    </form-field>
    <form-field :label="$t('components.passwordForm.walletPassword')">
      <v-input
        v-model="password"
        :autofocus="true"
        :required="true"
        type="password"
        name="password"
        :placeholder="'components.passwordForm.enterWalletPassword'"
      />
    </form-field>
    <form-controls>
      <v-button
        :disabled="isLoading || !isFormValid"
        :submit="true"
        type="primary"
        data-test="submit-button"
      >
        {{ primaryButtonLabel }}
      </v-button>
      <v-button
        v-if="withLogoutBtn"
        :disabled="isLoading"
        type="danger"
        data-test="logout-button"
        @click="emitLogout"
      >
        {{ $t('global.logout') }}
      </v-button>
      <v-button
        :disabled="!closable || isLoading"
        data-test="cancel-button"
        @click="emitCancel"
      >
        {{ $t('global.close') }}
      </v-button>
    </form-controls>
  </form>
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import Message from '@/components/common/Message.vue';
import FormField from '@/components/common/FormField.vue';
import FormControls from '@/components/common/FormControls.vue';
import i18n from '@/locales/i18n';

export default {
  name: 'PasswordForm',

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      default: null,
    },

    message: {
      type: String,
      default: '',
    },

    error: {
      type: String,
      default: null,
    },

    closable: {
      type: Boolean,
      default: true,
    },

    withLogoutBtn: {
      type: Boolean,
      default: false,
    },

    requesterUrl: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    password: '',
  }),

  computed: {
    primaryButtonLabel() {
      return !this.isLoading
        ? i18n.t('global.confirm')
        : i18n.t('global.loading');
    },

    passwordInputLabel() {
      if (this.email) {
        return `Password for ${this.email}:`;
      }

      return 'Your wallet account password:';
    },

    isFormValid() {
      return !!this.password;
    },
  },

  methods: {
    emitSubmit() {
      if (!this.isFormValid) return;

      this.$emit('submit', this.password);
    },

    emitCancel() {
      this.$emit('cancel');
    },

    emitLogout() {
      this.$emit('logout');
    },
  },

  components: {
    VButton,
    VInput,
    Message,
    FormField,
    FormControls,
  },
};
</script>
