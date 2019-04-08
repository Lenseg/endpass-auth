<template>
  <div class="widget">
    <div @click="toggleWidgetCollapse" class="widget-block balance-block">
      <div class="row justify-between">
        <h4 class="balance-block_header">Balance</h4>
        <span class="balance-block_state">show more</span>
      </div>
      <div class="row align-baseline">
        <p class="balance-block_balance">{{ balance }}</p>
        <span class="balance-block_currency">ETH</span>
      </div>
    </div>
    <div
      class="widget-block widget-block-collapse"
      :class="{ 'widget-block-collapse_collapsed': isCollapsed }"
    >
      <div class="widget-block">
        <button @click="logout" class="widget-button">
          Change account
        </button>
      </div>
      <div class="widget-block">
        <button @click="logout" class="widget-button">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  name: 'Widget',
  data: () => {
    return {
      isCollapsed: true,
      ...mapGetters(['availableAccounts']),
    };
  },
  computed: {
    ...mapState({ balance: state => state.accounts.balance }),
  },
  methods: {
    ...mapActions(['logout', 'getBalance', 'defineSettings']),
    toggleWidgetCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
  async created() {
    await this.defineSettings();
    setInterval(() => {
      console.log('kek1');
      this.getBalance();
    }, 700);
  },
};
</script>

<style lang="postcss" scoped>
.widget {
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 274px;
  cursor: pointer;
}

.row {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.align-baseline {
  align-items: baseline;
}

.balance-block {
  padding: 12px 20px;
  background: #4b016f;
  &_header {
    font-size: 12px;
    line-height: normal;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #ffffff;
    float: left;
    margin-bottom: 8px;
  }
  &_state {
    font-size: 12px;
    line-height: normal;
    text-align: right;
    color: #ffffff;
    opacity: 0.65;
  }
  &_balance {
    font-size: 32px;
    line-height: normal;
    color: #ffffff;
    float: left;
    margin-right: 4px;
  }
  &_currency {
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0.06em;
    color: #ffffff;
    opacity: 0.65;
    margin-left: 4px;
  }
}
.widget-block-collapse {
  max-height: 300px;
  transition: 300ms ease-in;
}
.widget-block-collapse_collapsed {
  max-height: 0px;
}
.widget-button {
  font-size: 16px;
  line-height: normal;
  color: #13171a;
  padding: 20px 24px;
  width: 100%;
  text-align: left;
  background: FFF;
  border: none;
  cursor: pointer;
  &:hover {
    background: #f2f4f7;
  }
}
</style>
