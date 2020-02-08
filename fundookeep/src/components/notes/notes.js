import takeNote from "../../components/takeNote";

import noteDisplay from "../../components/noteDisplay";
import { getNotes } from "../../services/userServices";
import noteServices from "../../services/noteServices";

export default {
  name: "notes",
  components: { takeNote, noteDisplay },
  props: [],
  data() {
    return {
      cards: [],
      parentmessage: "",
      Unpinnedcards: []
    };
  },
  computed: {},
  mounted() {
    getNotes().then(res => {
      console.log("res in notes", res);
      this.cards = [];
      this.Unpinnedcards = [];

      for (let index = 0; index < res.data.length; index++) {
        if (
          !res.data[index].archive &&
          !res.data[index].trash &&
          res.data[index].pinned
        ) {
          this.cards.push(res.data[index]);
        } else if (
          !res.data[index].archive &&
          !res.data[index].trash &&
          !res.data[index].pinned
        ) {
          this.Unpinnedcards.push(res.data[index]);
        }
      }
      this.cards = this.cards.slice().reverse();
      this.Unpinnedcards = this.Unpinnedcards.slice().reverse();
      console.log(this.cards);
      console.log(this.Unpinnedcards, "unpinned cards");
    });
    console.log(this.cards);
  },

  created() {
    this.subscription = noteServices.getMessage().subscribe(message => {
      console.log("MESSAGE", message);

      if (message) {
        getNotes()
          .then(res => {
            this.cards = [];
            this.Unpinnedcards = [];

            for (let index = 0; index < res.data.length; index++) {
              if (
                !res.data[index].archive &&
                !res.data[index].trash &&
                res.data[index].pinned
              ) {
                this.cards.push(res.data[index]);
              } else if (
                !res.data[index].archive &&
                !res.data[index].trash &&
                !res.data[index].pinned
              ) {
                this.Unpinnedcards.push(res.data[index]);
              }
            }
            this.cards = this.cards.slice().reverse();
            this.Unpinnedcards = this.Unpinnedcards.slice().reverse();
          })
          .catch(error => {
            console.log("error while getting notes", error);
          });
      }
    });
  },

  beforeDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  },

  methods: {
    receivedPinned($event) {
      // console.log("in $",$event);
      let ind = this.cards.indexOf($event);
      this.Unpinnedcards.splice(0, 0, $event);
      this.cards.splice(ind, 1);
    },

    receiveUnPinned($event) {
      let ind = this.Unpinnedcards.indexOf($event);
      this.Unpinnedcards.splice(ind, 1);
      this.cards.splice(0, 0, $event);
    }
  }
};
