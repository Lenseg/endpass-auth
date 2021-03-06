<template>
  <screen @close="handleWindowClose">
    <v-frame
      :loading="!isInited"
      :closable="isDialog"
      @close="handleCancel"
    >
      <account-form
        :loading="loading"
        :closable="isDialog"
        :accounts="accountsOptions"
        :networks="networksOptions"
        :form-data="formData"
        :can-logout="!isDemoMode"
        :error="error"
        :message="message"
        @donate-request="handleDonateRequest"
        @donate-success="handleDonateSuccess"
        @donate-error="handleDonateError"
        @submit="handleAccountFormSubmit"
        @cancel="handleCancel"
        @logout="handleLogout"
      />
    </v-frame>
  </screen>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Network from '@endpass/class/Network';
import Screen from '@/components/common/Screen';
import VFrame from '@/components/common/VFrame';
import AccountForm from '@/components/forms/Account';

export default {
  name: 'User',

  data: () => ({
    formData: {
      activeAccount: null,
      activeNet: null,
    },
    error: null,
    message: null,
  }),

  computed: {
    ...mapState({
      isInited: state => state.core.isInited,
      loading: state => state.core.loading,
      settings: state => state.accounts.settings,
      isDemoMode: state => !!state.accounts.demoData,
      accounts: state => state.accounts.accounts,
    }),
    ...mapGetters(['isDialog']),

    networksOptions() {
      return Object.values(Network.DEFAULT_NETWORKS).map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },

    accountsOptions() {
      if (!this.accounts) return [];

      return this.accounts.map(({ address }) => ({
        value: address,
        label: address,
      }));
    },
  },

  watch: {
    formData: {
      handler() {
        if (this.message) {
          this.message = null;
        }

        if (this.error) {
          this.error = null;
        }
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations(['changeLoadingStatus']),
    ...mapActions(['logout', 'closeAccount', 'updateSettings', 'dialogClose']),

    async handleAccountFormSubmit() {
      const { activeAccount, activeNet } = this.formData;

      try {
        this.error = null;

        await this.updateSettings({
          lastActiveAccount: activeAccount,
          net: activeNet,
        });
      } catch (err) {
        console.error(err);

        this.error = err.message;
      }
    },

    async handleLogout() {
      this.logout();
    },

    handleCancel() {
      this.closeAccount();
      this.dialogClose();
    },

    handleDonateRequest() {
      this.changeLoadingStatus(true);
    },

    handleDonateSuccess() {
      this.message =
        'Donation request successfully sent. In the most cases it can takes a few time before you will receive funds.';
      this.changeLoadingStatus(false);
    },

    handleDonateError(e) {
      this.error = e;
      this.changeLoadingStatus(false);
    },

    handleWindowClose() {
      this.closeAccount();
      this.dialogClose();
    },
  },

  async created() {
    const { settings } = this;
    this.formData.activeAccount = settings.lastActiveAccount;
    this.formData.activeNet = settings.net;
  },

  components: {
    Screen,
    VFrame,
    AccountForm,
  },
};
</script>
