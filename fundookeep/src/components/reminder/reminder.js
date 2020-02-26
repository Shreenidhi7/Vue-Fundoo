export default {
  name: "reminder",
  components: {},
  props: [],
  data() {
    return {
      name: "Shri",

      website: "http://www.google.co.in",

      websiteTag: '<a href="http://www.thenetninja.co.uk">The Net Ninja</a>',

      age: 23,

      x: 0,
      y: 0,

      named: "",
      aged: "",
      //computed properties
      a: 0,
      b: 0,

      //dynamic css

      available: true,
      nearby: true,

      //conditional

      trail: [
        "AA",
        "BB",
        "CC",
        "DD",
        "EE",
        "FF",
        "GG",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "qwerty"
      ],

      ninjas: [
        { name: "25years", age: 25 },
        { name: "15years", age: 15 },
        { name: "10years", age: 10 }
      ],

      //name regarding refs
      submitName: "shri"
    };
  },
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
    },

    // updateXY(event) {
    //   console.log("on mouse over", event);
    // }

    updateXY: function(event) {
      console.log("event", event);
      this.x = event.offsetX;
      this.y = event.offsetY;
    },

    click: function() {
      alert("Clicked mee??");
    },
    // //computed properties
    // addToA: function() {
    //   console.log("addtoA");

    //   return this.a + this.age;
    // },

    // addToB: function() {
    //   console.log("addtoB");

    //   return this.b + this.age;
    // }

    //reference using refs

    readRefs: function() {
      console.log("here in readRefs");
      console.log(this.$refs);

      console.log(this.$refs.input.value);
      this.submitName = this.$refs.input.value;

      console.log(this.$refs.text.innerText);
      // this.submitName = this.$refs.text.innerText;
    }
  },
  computed: {
    //computed properties

    addToA: function() {
      console.log("addtoA");
      return this.a + this.age;
    },

    addToB: function() {
      console.log("addtoB");
      return this.b + this.age;
    },

    //dynamic css

    compClasses: function() {
      return {
        available: this.available,
        nearby: this.nearby
      };
    }
  }
};
