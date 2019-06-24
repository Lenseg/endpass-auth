<template>
  <div>
    <div v-if="!isShowSeed">
      <form
        data-test="define-pwd-form"
        @submit.prevent="onCreateWallet"
      >
        <form-field :label="$t('components.createWallet.choosePass')">
          <v-input
            v-model="password"
            v-validate="'required|min:8'"
            data-vv-as="password"
            data-vv-name="password"
            label=""
            :error="errors.first('password')"
            :autofocus="true"
            required
            type="password"
            :placeholder="$t('components.createWallet.enterPass')"
          />
        </form-field>
        <form-field>
          <v-input
            v-model="passwordConfirm"
            v-validate="'required|min:8'"
            label=""
            data-vv-as="password confirm"
            data-vv-name="passwordConfirm"
            :error="errors.first('passwordConfirm')"
            required
            :autofocus="true"
            type="password"
            :placeholder="$t('components.createWallet.confirmPass')"
          />
        </form-field>
        <message
          v-if="error"
          :error="true"
          data-test="create-wallet-error"
        >
          {{ error }}
        </message>
        <form-controls>
          <v-button
            :disabled="!canSubmit"
            :submit="true"
            type="primary"
            data-test="submit-button"
          >
            {{ primaryButtonLabel }}
          </v-button>
        </form-controls>
      </form>
    </div>
    <div v-else>
      <div class="box">
        <p>{{ $t('components.createWallet.recoveryPhrase') }}</p>
        <br>
        <p
          class="code"
          data-test="seed-phrase"
        >
          {{ seedKey }}
        </p>
      </div>
      <v-button @click="onContinue">
        {{ $t('global.continue') }}
      </v-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import VButton from '@/components/common/VButton.vue';
import Message from '@/components/common/Message.vue';
import FormControls from '@/components/common/FormControls.vue';
import VInput from '@endpass/ui/components/VInput';
import FormField from '@/components/common/FormField.vue';
import i18n from '@/locales/i18n';

export default {
  name: 'CreateWalletForm',

  data: () => ({
    email: '',
    error: '',
    passwordConfirm: '',
    password: '',
    seedKey: null,
    isShowSeed: false,
    isLoading: false,
  }),

  computed: {
    canSubmit() {
      return this.isPasswordEqual && !this.isLoading && this.isFormValid;
    },
    isPasswordEqual() {
      return this.password && this.password === this.passwordConfirm;
    },
    primaryButtonLabel() {
      return this.isLoading
        ? i18n.t('global.loading')
        : i18n.t('global.confirm');
    },
  },

  methods: {
    ...mapActions(['createWallet', 'setWalletCreated']),
    async onCreateWallet() {
      if (this.isPasswordEqual) {
        this.isLoading = true;
        try {
          this.error = '';
          this.seedKey = await this.createWallet({ password: this.password });
        } catch (e) {
          console.error(e);
          this.error = i18n.t('components.createWallet.error');
        }
        this.isLoading = false;
        this.setWalletCreated();
      }

      this.isLoading = true;
      try {
        this.error = '';
        this.seedKey = await this.createWallet({ password: this.password });
        this.isShowSeed = true;
      } catch (e) {
        console.error(e);
        this.error = i18n.t('components.createWallet.error');
      }
      this.isLoading = false;
    },
    onContinue() {
      this.setWalletCreated();
    },
  },

  mixins: [],

  components: {
    FormField,
    VInput,
    VButton,
    Message,
    FormControls,
  },
};
</script>
