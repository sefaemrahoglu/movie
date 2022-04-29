export default {
  data() {
    return {
      browserWidth: 0,
      browserHeight: 0,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.browserWidth = window.innerWidth;
      this.browserHeight = window.innerHeight;
    },
  },
};
