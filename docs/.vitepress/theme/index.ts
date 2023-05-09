import { Theme, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import mediumZoom from "medium-zoom";
import "./styles/main.css";
import "./styles/global.css";
// import "./styles/demo.css";
import "./styles/utils.css";
import "./styles/vars.css";

const theme: Theme = {
  ...DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // Should there be a new?
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};
export default theme;
