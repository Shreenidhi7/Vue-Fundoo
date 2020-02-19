export default {
  name: "reminder",
  components: {},
  props: [],
  data() {
    return {
      name: "Shri",

      website: "http://www.google.co.in",

      websiteTag: '<a href="http://www.thenetninja.co.uk">The Net Ninja</a>',

      age: 23
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // addAYear() {
    //   this.age = this.age + 1;
    // },
    // subtractAYear() {
    //   this.age = this.age - 1;
    // }

    // add: function(inc) {
    //   this.age += inc;
    // },

    //the below one is the shorthand version
    subtract: function(dec) {
      this.age -= dec;
    },
    //the below one is expanded version
    add(value) {
      this.age = this.age + value;
    }
  }
};
