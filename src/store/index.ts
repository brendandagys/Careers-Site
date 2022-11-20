import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import actions from "@/store/actions";
import { GlobalState } from "./types";

export const key: InjectionKey<Store<GlobalState>> = Symbol();

// Generic isn't needed; good to be explicit
const store = createStore<GlobalState>({
  state,
  mutations,
  getters,
  actions,
  strict: process.env.NODE_ENV !== "production",
});

export default store;
